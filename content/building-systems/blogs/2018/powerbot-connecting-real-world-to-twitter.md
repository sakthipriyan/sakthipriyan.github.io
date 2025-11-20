---
title: Powerbot connecting real world to twitter
date: '2018-05-06'
draft: false
type: blogs
systems_tags:
- hardware
- iot
- python
- code
- circuit
- raspberry-pi
- twitter
author: Sakthi Priyan H
summary: via Raspberry Pi using GPIO pins
aliases:
- /2018/05/06/powerbot-connecting-real-world-to-twitter.html
---

### Intro
This post is long overdue. Recently, had a chance to present what I did with Raspberry Pi some years back. Powerbot is a fun experiment publishing the status of electricity availability in my home town back when we faced an electricity crisis.

### Why and What

* Back in 2012, we were facing serious load shedding.
* Trying to figure out the time and duration of the load shedding.
* Heard about Raspberry Pi and was looking for an actual use case to buy it.
* That is when I imagined using Raspberry Pi to automatically collect electricity availability and publish it to the world via Twitter!

> “Imagination is more important than knowledge.” - Albert Einstein.

### System Layout
<img class="ui fluid image"  src="/img/posts/powerbot/system-layout.png">


### GPIO pins
GPIO - General Purpose Input Output pins. We can read/write state. State can be either 1 or 0, purely binary based on the voltage level. 
### Sensor Unit
<img class="ui fluid image"  src="/img/posts/powerbot/circuit.png">

* This is a simple circuit that changes the state of the GPIO_IN_4 using LDR.
LDR - Light Dependent Resistor.
* LED light powered using mains line is placed in front of the LDR.
* 3 wires are connected to Pi. 
* 2 for powering the circuit and one for detecting the state.
	* 3.3 V line.
	* Ground line.
	* GPIO 4.

### Software
* Built using Python. Simple Program would check the status of the electricity every second.
* If there is a change in status, it will trigger generating twitter message.
* Message will be buffered in local as well just in case internet connection goes down.
* I had used Twython client library to connect with Twitter. Even built a wrapper around this to overcome the unstable Internet connection.
* Additionally, the software would publish the stats of the electricity over last day, week, month, quarter etc.,
* Entire source code available at [https://github.com/sakthipriyan/powerbot](https://github.com/sakthipriyan/powerbot)

Following code is used to set up and detect the status.

	import RPi.GPIO as GPIO
	
	def init_sensor():
	    GPIO.setmode(GPIO.BCM)
	    GPIO.setup(4, GPIO.IN)
	
	def get_status():
	    return not GPIO.input(4)


### Twitter
Let’s revisit what happened on the Feb 26, 2013.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">As summer is approaching, we can expect more load shedding  ~ 05:49 OFF</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306200586523668480?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Adding more green power plants, will certainly help us!!  ~ 06:05 ON</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306200843663851520?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">It is new normal that current goes off with no fixed schedule  ~ 12:01 OFF</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306290415080980480?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">It is new normal that current comes back with no fixed schedule  ~ 13:57 ON</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306319518421110784?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This electricity problem is affecting the SMEs. Increases operating cost  ~ 16:14 OFF</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306354051493265408?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Electricity is vital to development &amp; betterment of live  ~ 16:56 ON</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306364642769391616?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Inefficieny &amp; no long term planning &amp; execution lead us to this situation  ~ 17:03 OFF</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306366332465729537?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">With efficient planning &amp; execution we could have avoid the situation  ~ 18:03 ON</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306381383885000704?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">As long as we have government enterprises ruining the country, we have no options  ~ 20:08 OFF</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306414343224979456?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Open market, regulated private power plants would have met the demand way back  ~ 20:51 ON</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306423717758644225?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Daily Report:Feb 26, 2013. OFF TIME: 4:36:31. Availability: 80.80%. Change: +5.03%.</p>&mdash; Powerbot (@powerbot_tn) <a href="https://twitter.com/powerbot_tn/status/306476119434076160?ref_src=twsrc%5Etfw">February 26, 2013</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Apparently, latest tweets in the account has some issues probably due to hardware malfunctions.

### In retrospect
* I truly enjoyed it!
	* Doing electrical wiring, taking out the electrical wiring out of the switch box.
	* Identifying the electronic components and soldering it to the board.
	* Writing the software to read the GPIO pins.
	* Tweet it out to the whole world the status of electricity in my hometown.
* I still missed the original goal of predicting the load shedding. :( 
* It would have been real fun if powerbot tweeted the ON/OFF time before it happened.
* At least one of my friend from other part of the town started following this twitter handle to check if I had electricity in my home. :)
* I did powerbot, before the IoT became famous. It happened in early 2013. Loooooong time back.