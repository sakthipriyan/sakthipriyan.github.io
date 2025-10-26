---
title: Building a scalable distributed web crawler
date: '2015-04-18'
draft: false
type: blogs
se_tags:
- web-crawler
- scala
- akka
- kafka
- couchbase
- jsoup
- big-data
- design
- distributed
- proxy
author: Sakthi Priyan H
summary: which can perform both crawling and data extraction
aliases:
- /2015/04/18/building-a-distributed-web-crawler.html
---

### Crawling Website(s)
There are lot of tools like [nutch](http://nutch.apache.org/), [crawler4j](https://github.com/yasserg/crawler4j) available for web crawling and data extraction. The problem lies in the scalability and usability of the tools. Following design  trying to address these issues.

### Goals
* Ability to scale horizontally by adding more machines.
* Crawl specified sites and pages.
* Simple API interface to develop extractors.
* Re-extraction of data in case, if few more fields are required.

### Tech stack
* *[scala](http://www.scala-lang.org/)* much cleaner functional-object programming language in JVM. Core project can be developed using Scala.
* *[akka](http://akka.io/)* actors are used to crawl and extract data. It provided the higher level abstraction over primitive threads. It has clean DSLs for scala than java due java's language limitations.
* *[kafka](http://kafka.apache.org/)* is a disk based efficient pub-sub system. Used as queue in this system. Between, Kafka is written in scala.
* *[couchbase](http://www.couchbase.com/)* is a RAM based fast JSON document store. Is is used for url cache as well as generated json.
* *[jsoup](http://jsoup.org/)* apparently best available dom parser in java.
* *Proxy Servers* - Various proxy servers viz., [HAProxy](http://www.haproxy.org/), [Squid](http://www.squid-cache.org/), [Polipo](http://www.pps.univ-paris-diderot.fr/~jch/software/polipo/), [Privoxy](http://www.privoxy.org/), [Tor](https://www.torproject.org/) etc., can be used.

### Design
JSON is the *flexible* data format that can be used for data extraction out of any web documents. Also, JSON can be used for queue items and url cache.

Seed the url(s) for a specified website into *queue* (kafka topic).
Run the Crawler/Extractor in as many instances as required.

Crawler will dequeue the url json from queue and checks if the url already cached in couchbase *url bucket* or has to be reextracted. If it is not available, page is fetched via the proxy servers.

Once a page is available, raw page is stored in [AWS S3](http://aws.amazon.com/s3/) and an entry is made into *url bucket*.
Then, extractor will extract two things, one set of documents and next set of url(s).
Data is stored in couchbase *data bucket* and next set of url(s) are checked if it has to be crawled.
Next set url(s) can also contain, required headers and also can carry data map to next level.
Then, they are added to the same queue.

In case if the url has to be re extracted, the page is retrieved from s3 and used.

###Extractor
For each website, developer has to create single Java or Scala class.

It will contain number of methods, each for different type of pages. Each method will accept a Response object and return a Extract object.

Response object consists of, Request object which corresponds to queue json, Response Headers and Response Body. From response object developer can access html dom or even use raw response and handle it as xml or json.

Extract object consists of set of JSON documents and set of Request objects.
Here, JSON documents and Request objects are created from response.

In short, for each site, developer has to focus on two things, one document extraction and two deciding navigation. For each page, she has to create a method. Framework will manage the rest of the things.

### Infra
* *Couchbase clusters*: one for url cache and another one for extracted data. Each cluster has 2 or more nodes.
* *Kafka cluster*: odd number of Kafka broker instances. One topic per website.
* *Crawler Extractor*: **n** number of nodes each running the scala code.
* *Proxy Servers* : It depends on how proxy servers are configured. It is explained below.
* *AWS S3* : It can be used to store the crawled webpage for future reuse.

### Proxy Servers
Proxy servers can be used in two different configurations.
Both in effect uses more number of IPs, to minimize the risk of getting banned by any website.

1. **Anonymous Proxy**

	Tor network can be helpful for crawling a very large site anonymously. But, question on *morality* and *legality* arises.
	This set up requires HAProxy, Privoyx/Polipo & Tor.

	HAProxy will be accessed from all crawlers. HAProxy in turn connects to multiple Tor via Polipo/Privoxy.
	Here, Polipo/Privoxy converts the http request into socks request which Tor can understand.

	HAProxy will be running multiple ports and each will be allocated for different sites.
	So, each website request is done round robin on Tor clients independently.
	Moreover, each Tor client will run with Exit nodes at different countries and changes IP every 10 minutes.

2. **Distributed Proxy**

	This will be helpful when we have large pool of dynamic IPs. Say we can create numerous micro instances in AWS.
	This set up requires HAProxy and Squid.

	HAProxy runs on relatively larger instance. Each micro instances runs a Squid, which simply forwards the connection to the internet.
	HAProxy does a round robin to Squid which in turn connects to internet using the instance IPs.
	As said above, one port for each website in HAProxy.

	If we are doing dynamic allocation and deallocation of instances for Squid, then we are actually using more number of IPs to crawl the website.

### Keep in mind
* Don't go big bang on small sites and make it appear as [DDoS](http://en.wikipedia.org/wiki/Denial-of-service_attack).
* Better declare as bot and link to a page, which explains why.
* It is always trade off between speed and being nice. Be nice.
* Last but not least, respect the robots.txt and website policies.

### Footnote
This post is based on the experience of developing a scalable distributed web crawler.
It has explained things at a higher level of abstractions.
Hoping that in future, I will be able to contribute the relevant code for larger community benefits.
Between, this was my *real scala project* and I enjoyed it. You can appreciate Scala better when you come from Java world.

### Edits
#### Appended on *Dec 12, 2015*
Hurray! Read this, [Crawlpod - open source scalable web crawler](/2015/12/12/crawlpod-open-source-scalable-web-crawler.html)