---
title: Responsive exponential backoff in Go
date: '2022-11-13'
draft: false
type: blogs
systems_tags:
- go
- exponential-backoff
- sleep
- code
- cloud
- dynamodb
summary: using exponentially scaling up and down the sleep time
aliases:
- /2022/11/13/responsive-exponential-back-off-in-go.html
---

### Rate Limiting
- Often when we use various cloud services we end up seeing throttling or rate limiting from the service
- Various cloud services are often shared across multiple tenants and rate limiting mechanisms are used to prevent one tenant consuming much more resources than allocated/provisioned limits

### Client side throttling
- In order to handle the service throttling, client needs to add a delay between subsequent calls
- This can achieved via a linear back off or an exponential back off

### Linear back off
- Simplest approach is to start with a base sleep time and add sleep time for each failure
- Say 1 secs as base sleep time. For every request that is failed due to rate limiting, we add another 1 seconds
- So, it will go like this `1s, 2s, 3s, 4s, 5s, ...` and stops growing once request is successful

#### Code
    // for each failure we add interval to current delay
    func sleepTime(currentDelay, interval, maxInterval int64) int64 {
        currentDelay += interval
        if currentDelay > maxInterval {
            currentDelay = maxInterval
        }
        return currentDelay
    }


### Exponential back off
- In this case, instead of increasing the sleep time by a constant time, it is multiplied by a factor
- If this multiplication factor is 2 and initial sleep is 1 second
- Then, it will grow exponentially as `1s, 2s, 4s, 8s, 16s, ...`
- This will be the better than linear back off as it can get successful delay with less iterations

#### Code
    // for each failure we multiple the current delay by a multiplication factor
    func sleepTime(currentDelay, initialDelay, maxInterval int64, multiplier float64) int64 {
        if currentDelay == 0 {
           return initialDelay
        }
        currentDelay = int64(float64(currentDelay) * multiplier)
        if currentDelay > maxInterval {
            return maxInterval
        }
        return currentDelay
    }

### Rate Limiting in DynamoDB
- [DynamoDB](https://aws.amazon.com/dynamodb/) is a Fast, flexible NoSQL database service from [AWS](https://aws.amazon.com/)
- DynamoDB provides two capacity modes for each table: on-demand and provisioned.
- Irrespective of the capacity mode, DynamoDB will reject incoming write requests when it exceeds WCUs (Write Capacity Units)
- I built this `responsive exponential back off` to handle this rate limiting
- But, same can be used for handling rate limiting from any service
- As part of a job, multiple workers are writing to the DynamoDB in parallel

### Responsive Exponential back off
- In addition to exponential back off, this one is responsive in nature
- As we see more and more requests succeeding it will start decreasing the delay time
- Down multiplier factor is used once down multiplier threshold is met. When we see N successful requests, down multiplier is applied
- Additionally a RandomizationFactor is applied while scaling up and down. 
- Say `RandomizationFactor=0.2`, `current delay is 1s` and `up multiplier 2`, on next failure it can become `(1 x 2) +/- 0.2 * (1 x 2) = 1.6 to 2.4`
- RandomizationFactor aids in getting slightly different new interval when applying multipliers

#### AutoSleeper
Following configurations are used for the sleeper.

    type AutoSleeper struct {
      InitialInterval         time.Duration  // Used for sleeping first time
      MaxInterval             time.Duration  // Max interval for sleeping
      MaxRandomization        time.Duration  // Max randomization interval
      UpMultiplier            float64        // Multiplied for increasing the sleep time
      DownMultiplier          float64        // Multiplied for decreasing the sleep time
      RandomizationFactor     float64        // Randomize the new sleep value 
      DownMultiplierThreshold int            // Threshold for triggering sleep time reduction
    }


### Go Code
#### Source
> [https://github.com/sakthipriyan/go-utils/blob/main/sleeper.go](https://github.com/sakthipriyan/go-utils/blob/main/sleeper.go)

    package main

    import (
      "math/rand"
      "time"
    )

    const (
      DefaultMaxInterval             = 15 * time.Minute
      DefaultInitialInterval         = 500 * time.Millisecond
      DefaultRandomizationFactor     = 0.3
      DefaultMaxRandomization        = 2 * time.Minute
      DefaultUpMultiplier            = 1.5
      DefaultDownMultiplier          = 0.9
      DefaultDownMultiplierThreshold = 10
    )

    func NewAutoSleeper() *AutoSleeper {
      return &AutoSleeper{
        MaxInterval:             DefaultMaxInterval,
        InitialInterval:         DefaultInitialInterval,
        RandomizationFactor:     DefaultRandomizationFactor,
        MaxRandomization:        DefaultMaxRandomization,
        UpMultiplier:            DefaultUpMultiplier,
        DownMultiplier:          DefaultDownMultiplier,
        DownMultiplierThreshold: DefaultDownMultiplierThreshold,
      }
    }

    type AutoSleeperMetrics struct {
      TotalInvocation int
      TotalWentUp     int
      TotalWentDown   int
      TotalSlept      int
      TotalSleepTime  time.Duration
    }

    type AutoSleeper struct {
      InitialInterval         time.Duration
      MaxInterval             time.Duration
      MaxRandomization        time.Duration
      UpMultiplier            float64
      DownMultiplier          float64
      RandomizationFactor     float64
      DownMultiplierThreshold int

      metrics         AutoSleeperMetrics
      currentInterval time.Duration
      currentSuccess  int
    }

    func (s *AutoSleeper) GetMetrics() AutoSleeperMetrics {
      return s.metrics
    }

    func (s *AutoSleeper) SleepOnFailure() {
      s.metrics.TotalInvocation += 1
      s.goUp()
      s.sleep()
    }

    func (s *AutoSleeper) SleepOnSuccess() {
      s.metrics.TotalInvocation += 1
      if s.currentInterval == 0 {
        return
      }
      s.currentSuccess += 1
      if s.currentSuccess == s.DownMultiplierThreshold {
        s.goDown()
        s.currentSuccess = 0
      }
      s.sleep()
    }

    func (s *AutoSleeper) sleep() {
      s.metrics.TotalSleepTime += s.currentInterval
      s.metrics.TotalSlept += 1
      time.Sleep(s.currentInterval)
    }

    func (s *AutoSleeper) goDown() {
      s.metrics.TotalWentDown += 1
      interval := float64(s.currentInterval) * s.DownMultiplier
      random := getNextRandomInterval(interval, s.RandomizationFactor, float64(s.MaxRandomization))
      if random < float64(s.InitialInterval) {
        s.currentInterval = 0
        return
      }
      s.currentInterval = time.Duration(random)
    }

    func (s *AutoSleeper) goUp() {
      s.metrics.TotalWentUp += 1
      if s.currentInterval == 0 {
        s.currentInterval = s.InitialInterval
        return
      }
      interval := float64(s.currentInterval) * s.UpMultiplier
      random := getNextRandomInterval(interval, s.RandomizationFactor, float64(s.MaxRandomization))
      if random > float64(s.MaxInterval) {
        s.currentInterval = s.MaxInterval
        return
      }
      s.currentInterval = time.Duration(random)
    }

    func getNextRandomInterval(currentInterval, randomizationFactor, maxRandomization float64) float64 {
      if randomizationFactor == 0 {
        return currentInterval
      }
      delta := randomizationFactor * currentInterval
      if delta > maxRandomization {
        delta = maxRandomization
      }
      randomization := 2 * delta * rand.Float64()
      minInterval := currentInterval - delta
      return minInterval + randomization
    }

#### Usage
    
    s := NewAutoSleeper()
    s.SleepOnFailure() // Uses up multiplier
    s.SleepOnSuccess() // Uses down multiplier on N threshold
    

### Graph of delay generated
For the following configuration,
    
    InitialInterval = 1 millisecond
    MaxInterval = 15 minutes
    MaxRandomization = 2 minutes
    UpMultiplier = 1.5
    DownMultiplier = 0.6
    RandomizationFactor = 0.0
    DownMultiplierThreshold = 5

<img class="ui fluid image"  src="/img/posts/sleeper/failed_and_succeeded.png">  

- Y axis represents the delay time generated for each request
- Responses succeeded are shown as blue and failed ones are shown in red
- Initially, requests were failing till it reached `291.9 ms`
- Later point, delay of greater than `60 ms` were succeeding
- As shown in the graph, responsive exponential back off quickly generates suitable delay
- It goes up and down as the requests were failing and suceeding respectively
- Setting an appropriate value for `DownMultiplierThreshold` controls how frequently we want to reduce the delay
- Setting an appropriate value for `DownMultiplier` controls how fast we want to reduce the delay
- Setting an appropriate values for `RandomizationFactor` and `MaxRandomization` controls the noise introduced while scaling up/down

### Usage of Responsive Exponential back off
- In Auto scaling DynamoDB use case, DynamoDB will increase the capacity as it sees more load, but this will take time, not instantaneous
- Each job is run by multiple workers. Workers count increase as the job started and decrease when individual tasks are completed
- So this back off, initially increases the delay and tries to succeed
- Once requests are succeeding, it will try to reduce the delay
- This will be auto balancing as with the increase/decrease of workers as well as DynamoDB WCUs