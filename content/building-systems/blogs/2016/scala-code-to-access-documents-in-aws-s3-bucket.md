---
title: Scala code to access documents in AWS S3 bucket
date: '2016-02-17'
draft: false
type: blogs
systems_tags:
- scala
- aws
- s3
- http
- code
- dispatch
author: Sakthi Priyan H
summary: via http get and put requests
aliases:
- /2016/02/17/scala-code-to-access-documents-in-aws-s3-bucket.html
---

### Intro
AWS S3 documents in a specific bucket can be via Rest APIs.  
`http` GET to retrieve documents and `http` PUT to store documents.

### Why Rest API?
* Rest is simple and straight forward.
* We can use any preferred http client library.
* No need to include additional Java dependencies into the project by adding AWS SDK.
* We can use http client library that is already present in the project dependencies.

### Let's go Async
* Though we can use any java/scala http client, Let's use an async http client.
* I had used Scala Dispatch library to send requests.

### Scala Code

In line comments for more explanations.

    package com.sakthipriyan.aws

    import java.text.SimpleDateFormat
    import java.util.{ TimeZone, Date }
    import com.typesafe.config.ConfigFactory
    import javax.crypto.spec.SecretKeySpec

    // case class to represent the AWS S3 http request
    case class AwsS3Request(
        url:String, // Request url
        headers:Map[String,String], // Request Headers
        requestBody:Option[String]) // Optional request body

    object AwsS3 {

      // AWS configuration
      private val awsConfig = ConfigFactory.load("aws.conf")
      private val s3Uri = awsConfig.getString("s3.uri")
      private val s3bucket = awsConfig.getString("s3.bucket")
      private val s3Key = awsConfig.getString("s3.key")
      private val s3Secret = awsConfig.getString("s3.secret")

      // Config used for signing the request
      private val utf8 = "UTF-8"
      private val hmacsha1 = "HMACSHA1"
      private val sdf = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z")
      sdf.setTimeZone(TimeZone.getTimeZone("UTC"))

      // Create signingKey from s3Secret
      private val signingKey = new SecretKeySpec(s3Secret.getBytes(utf8), hmacsha1)

      // Creates required authorization header for http requests.
      // Sign the input string using s3secret key.
      private def auth(str2sign: String) = {
        import javax.crypto.Mac
        import org.apache.commons.codec.binary.Base64

        val mac = Mac.getInstance(hmacsha1)
        mac.init(signingKey)
        val dataBytes = str2sign.getBytes(utf8)
        val signature = mac.doFinal(dataBytes)
        val sign = Base64.encodeBase64String(signature)

        // Following string is used in the Authorization header.
        s"AWS $s3Key:$sign"
      }

      // Creates AwsS3Request for retrieving document for the given path.
      def get(path:String) = {
        val date = sdf.format(new Date())
        val authorization = auth(s"GET\n\n\n$date\n/$s3bucket/$path")
        AwsS3Request(
            s"$s3Uri/$path",
            Map("Date" -> date, "Authorization" -> authorization),
            None)
      }

      // Creates AwsS3Request for storing given path and content
      def put(path:String. content: String) = {
        val date = sdf.format(new Date())
        val authorization = auth(s"PUT\n\ntext/html\n$date\n/$s3bucket/$path")
        AwsS3Request(
            s"$s3Uri/$path",
            Map("Date" -> date,
              "Authorization" -> authorization,
              "Content-Type" -> "text/html",
              "Content-Length" -> content.length.toString),
            Some(content))
      }

    }


### Sample AWS configuration
Typesafe config is used for configuring the application.  
Contents of the AWS config file `aws.conf` is shown below.  

    s3 {
      key : "9X8M6YC85BRUOXGJI1HE"
      secret : "dGhlIHNlY3JldCB0aGF0IHlvdSBkb25gdCBrbm93IA=="
      bucket : "bucket-name-here"
      uri : "https://s3-ap-southeast-1.amazonaws.com/"${s3.bucket}
    }

Make sure aws key and secret has only access to specified bucket.  
It is a good practice to give only required permissions for aws access keys.

### Async Http client

Following code snippets generates Dispatch Request for AwsS3Request object.
    package com.sakthipriyan.aws

    import dispatch._, Defaults._
    class AsyncHttpClient {
      def getDispatchReq(request:AwsS3Request) = {
        request.requestBody match {
          case Some(content) => {
              val req = url(request.url) <:< request.headers << content
              req.PUT
          }
          case None => {
            val req = url(request.url) <:< request.headers
            req.GET
          }
        }
      }
    }

Refer [Dispatch Documentation](http://dispatch.databinder.net/Dispatch.html) to know more
about processing http request/response in Dispatch.  
It should be fairly easy to use `AwsS3Request` object and send http request using any http library.

### Example Usage

Usage example shown below.  
Processing the http request/response is not shown.

    import com.sakthipriyan.aws.{AwsS3, AsyncHttpClient}

    val path = "path/to/store/the/content"
    val content = "<html><body><h1>Hello HTML World!</h1></body></html>"

    //Store an document into the given path.
    val putRequest = AsyncHttpClient.getDispatchReq(AwsS3.put(path, content))
    // TODO - send the http put request and process the response using Dispatch.

    //Retrieve the document for the specified path.
    val getRequest = AsyncHttpClient.getDispatchReq(AwsS3.get(path))
    // TODO - send the http get request and process the response using Dispatch.

### Notes
* While processing http response, please make sure to handle non `200 OK` response.
* It will be wiser to use AWS SDK if you are using it already.
* Based on usage, you can use synchronous or asynchronous http client libraries.
* Still, It would be better to use async http client library to store or retrieve documents from s3 bucket.