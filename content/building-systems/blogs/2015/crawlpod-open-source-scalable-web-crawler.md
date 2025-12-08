---
title: Crawlpod - open source scalable web crawler
date: '2015-12-12'
draft: false
type: blogs
systems_tags:
- crawlpod
- web-crawler
- scala
- akka
- mongodb
- design
- open-source
author: Sakthi Priyan H
summary: built on top of Scala and Akka framework.
aliases:
- /2015/12/12/crawlpod-open-source-scalable-web-crawler.html
---

### Intro
Earlier I wrote about [Building a scalable distributed web crawler](/2015/04/18/building-a-distributed-web-crawler.html).
Recently I built an open source one based on it.

### Code
Interested in reading code rather than this blog post. [Here](https://github.com/sakthipriyan/crawlpod) it is for you.

### New Goals
* Self contained, should be able to run in a single node.
* Fully asynchronous, no blocking call anywhere.
* Easy to plug in different providers for underlying storage, say cache, queue, etc.,

### Tech Stack
* Entire framework is written in [Scala](http://www.scala-lang.org/). Apparently, now Scala is my default JVM language.
* Everything is a [Akka](http://akka.io/) actor and so clear separation of responsibilities.
* [Mongodb](http://mongodb.org) used for various sub systems and mongodb [scala driver](http://mongodb.github.io/mongo-scala-driver) is used.
* [Dispatch](http://dispatch.databinder.net/Dispatch.html) for http requests and [jsoup](http://jsoup.org/) as dom parser.
* [Scalatest](http://www.scalatest.org/) for testing and [Logback](http://logback.qos.ch/) for logging.
* [Json4s](http://json4s.org/) for handling JSON and [Scala xml](https://github.com/scala/scala-xml) for XML.

### Design
Let me explain the design in terms of Storage systems and Actors involved.

#### Storage systems
Following four storage systems are required. They can be implemented on top various providers based on the use case and scale. Currently all four are implemented using Mongodb.

* **Queue** is used to queue http requests.
* **Request Store** is used to determine if a given request is already processed or not.
* **Raw Store** is used to cache the entire response from the http request.
* **Json Store** is used to store the extracted JSON from the response.

In its earlier avatar, Kafka was used for Queue, Couchbase was used for Request Store and Json Store and S3 was used for Raw Store.

#### Actors involved
Now comes the interesting part, Actors.  
> All the world's a stage, and all the men and women merely players.  
> \- **William Shakespeare**,  *[As You Like It](http://shakespeare.mit.edu/asyoulikeit/full.html)*.

We have following actors with specific responsibility.

* **Controller Actor** is the lead actor which controls the flow and not yet mature.
* **Http Actor** is a brave actor which sends HTTP request. Once HTTP response is received, it sends it to *Extract Actor* and *Raw Store Actor*.
* **Extract Actor** is a soft hardworking actor, which gets HTTP response and process it. It sends extracted new requests to *Queue Actor* and extracted json to *Json Store Actor*. Once job done, it reports to *Controller Actor* and also tell *Request Store Actor* that particular request is processed.
* **Queue Actor** is the friend of *Controller Actor* which is responsible for enqueue and  dequeue of HTTP requests to the queue. When dequeued it sends the request to *Request Store Actor* to see if it has to be processed.
* **Raw Store Actor** is the local cache actor which caches HTTP response. If it doesn't have response for specific request, it sends that to its brave friend *Http Actor*. In case, it already has the response, it send that to hardworking *Extract Actor*.
* **Json Store Actor** is an easy actor, which just writes down all extracted JSON. It is the most underrated actor in the play which does its job very well.
* **Request Store Actor** is the tough one in this lot, which do the heavy lifting of tracking all requests and also, implements mechanism to re extract the data.

Better read the code,  [`CoreActors.scala`](https://github.com/sakthipriyan/crawlpod/blob/master/src/main/scala/net/crawlpod/core/CoreActors.scala). Also look at,  [`ControllerActor.scala`](https://github.com/sakthipriyan/crawlpod/blob/master/src/main/scala/net/crawlpod/core/ControllerActor.scala) which is not yet mature.

#### Http
Currently `dispatch` is used as http client. May be moving to akka http later.
Http client is used in the *Http Actor*

#### Core models
Look at the [`Models`](https://github.com/sakthipriyan/crawlpod/blob/master/src/main/scala/net/crawlpod/core/Models.scala) file.
Important two classes are explained here.

1. **CrawlRequest** - Contains all data required to send HTTP request.

        case class CrawlRequest (
            url: String, // URL of request, with query params.
            extractor: String, // package.classname.methodname of extractor.
            method: String = "GET", // Http method.
            headers: Option[Map[String, String]] = None, // Optional Header.
            // Optional data that can be passed around.
            passData: Option[Map[String, String]] = None,
            requestBody: Option[String] = None, //Post request body
            cache: Boolean = true )

2. **CrawlResponse** - represents the http response with additional data.

        case class CrawlResponse(
            request: CrawlRequest, // Original crawl request object
            status: Int, // http status. Say 200, 404, etc.,
            headers: Map[String, List[String]], // Response headers
            body: String, // response body
            created: Long = System.currentTimeMillis,
            timeTaken: Int = -1) // Time taken to get this response.


### Now lets Crawl.
Following is an illustrative one, it won't work as such.  
Assumed that mongodb is running somewhere and configured `mongodb.url` in `application.conf`
#### Steps 1, 2, 3.
1. Create a extractor code which returns `Extract` object.

        package net.crawlpod.extract

        class Example {
          def init(response: CrawlResponse): Extract = {
            val dom = response.toDom
            // Heavy lifting next two lines,
            // Custom implementation for various pages of interest.
            val docs = extractDocsFromDom(dom) // Extract json docs.
            val requests = extractRequestsFromDom(dom) // Extract next set of urls.
            new Extract(docs,requests)
          }
        }

2. Add an entry to the queue. Since Mongodb is used, we have to add an Json object into `queue` collection.

        {
            "url" : "http://example.com",
            "extractor" : "net.crawlpod.extract.Example.init",
            "method" : "GET",
            "passData" : {
                "date1" : "01-Apr-2014",
                "date2" : "31-Mar-2015"
            },
            "cache" : true,
            "used" : false
        }

3. Now run the application by launching `net.crawlpod.core.CrawlPod`

#### Output
* We can more find more data added to following collections in Mongodb.
    * queue
    * request
    * raw
    * json
* Just export the data from json collection. We are done!

### Just into second gear.
* I hope this is just a start, not yet ready for general use.
* Lot of ideas yet to be implemented to make it easier to use.
* Need to document `Crawlpod` in its own [site](http://crawlpod.net) as it grows.

Kudos! you read till this point, just go ahead and share it. Thanks!