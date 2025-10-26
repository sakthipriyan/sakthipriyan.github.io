---
title: Salesforce Bulk API usage with an example
date: '2016-02-07'
draft: false
type: blogs
se_tags:
- salesforce
- integration
- code
author: Sakthi Priyan H
summary: to show how to upsert records in batches.
aliases:
- /2016/02/07/salesforce-bulk-api-usage-with-an-example.html
---

### Get ready with
Get ready with `username`, `password` and `security token`. Refer [here](salesforce-rest-api-usage-with-an-example.html) for more details.  
I would recommend you to use a [developer account](https://developer.salesforce.com/signup) to experiment.  

### Bulk API
Salesforce Bulk API can be used to do parallel batch operations.  
Before getting into code, let us understand few terms used in context of Bulk API.  

We need to create a `Job` to do bulk processing.  
For bulk processing, up to 10000 records can be submitted in a `Batch`.  
Multiple batches can be submitted to the same Job.  
However, you cannot submit a Batch to a Job older than 24 hours.

In Short,

1. Create a Job.
2. Submit as many batches as required.
3. Then, close the Job.
4. Check batch status.
5. Also, look into batch results.

### Sign In
First we need to sign in using soap request to obtain the `sessionId`.  
`<n1:username>` should have `username`. For example, `user@domain.com`.  
`<n1:password>` should have `password` and `secrettoken` concatenated.

**Request**

    POST /services/Soap/u/35.0 HTTP/1.1
    Host: login.salesforce.com
    Content-Type: text/xml
    SOAPAction: login

    <?xml version="1.0" encoding="utf-8" ?>
    <env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
      <env:Body>
        <n1:login xmlns:n1="urn:partner.soap.sforce.com">
          <n1:username>user@domain.com</n1:username>
          <n1:password>passwordsecrettoken</n1:password>
        </n1:login>
      </env:Body>
    </env:Envelope>

**Response**

    <?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="urn:partner.soap.sforce.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <soapenv:Body>
            <loginResponse>
                <result>
                    <metadataServerUrl>https://ap2.salesforce.com/services/Soap/m/35.0/XXXXXXXXXXXXXXX</metadataServerUrl>
                    <passwordExpired>false</passwordExpired>
                    <sandbox>false</sandbox>
                    <serverUrl>https://ap2.salesforce.com/services/Soap/u/35.0/XXXXXXXXXXXXXX</serverUrl>
                    <sessionId>sessionId</sessionId>
                    <userId>userId</userId>
                </result>
            </loginResponse>
        </soapenv:Body>
    </soapenv:Envelope>

* `<userInfo>` tag isn't shown in the response above.
* We have to parse this XML and read `<sessionId>`
* Then,`sessionId` is used in further requests as `X-SFDC-Session` header.

### Create a Job
Here, a `upsert` Job is created on `Mutual_Fund__c` object based on
the external Id field `External_ID__c`.  
It will accept only `CSV` file.

**Request**

    POST /services/async/35.0/job HTTP/1.1
    Host: ap2.salesforce.com
    Content-Type: application/xml
    X-SFDC-Session: sessionId

    <?xml version="1.0" encoding="UTF-8"?>
    <jobInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
        <operation>upsert</operation>
        <object>Mutual_Fund__c</object>
        <externalIdFieldName>External_ID__c</externalIdFieldName>
        <contentType>CSV</contentType>
    </jobInfo>

**Response**

    <?xml version="1.0" encoding="UTF-8"?>
    <jobInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
        <id>750280000018ch2AAA</id>
        <operation>upsert</operation>
        <object>Mutual_Fund__c</object>
        <createdById>XXXXXXXXXXXXXXXXXX</createdById>
        <createdDate>2016-02-07T08:58:10.000Z</createdDate>
        <systemModstamp>2016-02-07T08:58:10.000Z</systemModstamp>
        <state>Open</state>
        <externalIdFieldName>External_ID__c</externalIdFieldName>
        <concurrencyMode>Parallel</concurrencyMode>
        <contentType>CSV</contentType>
        <numberBatchesQueued>0</numberBatchesQueued>
        <numberBatchesInProgress>0</numberBatchesInProgress>
        <numberBatchesCompleted>0</numberBatchesCompleted>
        <numberBatchesFailed>0</numberBatchesFailed>
        <numberBatchesTotal>0</numberBatchesTotal>
        <numberRecordsProcessed>0</numberRecordsProcessed>
        <numberRetries>0</numberRetries>
        <apiVersion>35.0</apiVersion>
        <numberRecordsFailed>0</numberRecordsFailed>
        <totalProcessingTime>0</totalProcessingTime>
        <apiActiveProcessingTime>0</apiActiveProcessingTime>
        <apexProcessingTime>0</apexProcessingTime>
    </jobInfo>

* We have to use the `id` as `job id` for subsequent calls.

### Submit Batch

**Request**  
Here, `job id` is used as part of the URL.  
Content of the CSV file is sent via POST request.  

    POST /services/async/35.0/job/750280000018ch2AAA/batch HTTP/1.1
    Host: ap2.salesforce.com
    Content-Type: text/csv; charset=UTF-8
    X-SFDC-Session: sessionId

    "Name","External_ID__c"
    "SBI Small & Midcap Fund -Direct (G)",100
    "SBI Midcap Fund - Direct (G)",101
    "Sundaram Select Micro Cap-Sr 5-DP-G",102
    "DSP-BR Micro Cap Fund - Direct (G)",103
    "Motilal Focused Midcap 30 - DP (G)",104
    "SBI Magnum Midcap Fund (G)",105
    "SBI Small & Midcap Fund (G)",106
    "DSP-BR Micro Cap Fund - RP (G)",107
    "Motilal Focused Midcap 30 - RP (G)",108
    "Sundaram Select Micro Cap-Sr 5-RP-G",109

**Response**  
In response, `id` corresponds to the `batch id`.

    <?xml version="1.0" encoding="UTF-8"?>
    <batchInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
        <id>75128000001RukcAAC</id>
        <jobId>750280000018ch2AAA</jobId>
        <state>Queued</state>
        <createdDate>2016-02-07T09:02:14.000Z</createdDate>
        <systemModstamp>2016-02-07T09:02:14.000Z</systemModstamp>
        <numberRecordsProcessed>0</numberRecordsProcessed>
        <numberRecordsFailed>0</numberRecordsFailed>
        <totalProcessingTime>0</totalProcessingTime>
        <apiActiveProcessingTime>0</apiActiveProcessingTime>
        <apexProcessingTime>0</apexProcessingTime>
    </batchInfo>


### Close Job

**Request**  
Here, `job id` is used in the URL.

    POST /services/async/35.0/job/750280000018ch2AAA HTTP/1.1
    Host: ap2.salesforce.com
    Content-Type: application/xml
    X-SFDC-Session: sessionId

    <?xml version="1.0" encoding="UTF-8"?>
    <jobInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
      <state>Closed</state>
    </jobInfo>

**Response**

    <?xml version="1.0" encoding="UTF-8"?>
    <jobInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
        <id>750280000018ch2AAA</id>
        <operation>upsert</operation>
        <object>Mutual_Fund__c</object>
        <createdById>XXXXXXXXXXXXXXXXXX</createdById>
        <createdDate>2016-02-07T08:58:10.000Z</createdDate>
        <systemModstamp>2016-02-07T08:58:10.000Z</systemModstamp>
        <state>Closed</state>
        <externalIdFieldName>External_ID__c</externalIdFieldName>
        <concurrencyMode>Parallel</concurrencyMode>
        <contentType>CSV</contentType>
        <numberBatchesQueued>0</numberBatchesQueued>
        <numberBatchesInProgress>0</numberBatchesInProgress>
        <numberBatchesCompleted>1</numberBatchesCompleted>
        <numberBatchesFailed>0</numberBatchesFailed>
        <numberBatchesTotal>1</numberBatchesTotal>
        <numberRecordsProcessed>10</numberRecordsProcessed>
        <numberRetries>0</numberRetries>
        <apiVersion>35.0</apiVersion>
        <numberRecordsFailed>0</numberRecordsFailed>
        <totalProcessingTime>137</totalProcessingTime>
        <apiActiveProcessingTime>65</apiActiveProcessingTime>
        <apexProcessingTime>0</apexProcessingTime>
    </jobInfo>

### Batch Status

**Request**  
Here, `job id` and `batch id` is used in the URL.

    GET /services/async/35.0/job/750280000018ch2AAA/batch/75128000001RukcAAC HTTP/1.1
    Host: ap2.salesforce.com
    X-SFDC-Session: sessionId

**Response**

    <?xml version="1.0" encoding="UTF-8"?>
    <batchInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
        <id>75128000001RukcAAC</id>
        <jobId>750280000018ch2AAA</jobId>
        <state>Completed</state>
        <createdDate>2016-02-07T09:02:14.000Z</createdDate>
        <systemModstamp>2016-02-07T09:02:17.000Z</systemModstamp>
        <numberRecordsProcessed>10</numberRecordsProcessed>
        <numberRecordsFailed>0</numberRecordsFailed>
        <totalProcessingTime>137</totalProcessingTime>
        <apiActiveProcessingTime>65</apiActiveProcessingTime>
        <apexProcessingTime>0</apexProcessingTime>
    </batchInfo>

### Batch Result

**Request**  
Here, `job id` and `batch id` is used in the URL.

    GET /services/async/35.0/job/750280000018ch2AAA/batch/75128000001RukcAAC/result HTTP/1.1
    Host: ap2.salesforce.com
    X-SFDC-Session: sessionId

**Response**  
We get the status of each record submitted as part of the batch in CSV format.

    "Id","Success","Created","Error"
    "a002800000P9WeuAAF","true","false",""
    "a002800000P9WevAAF","true","false",""
    "a002800000P9WewAAF","true","false",""
    "a002800000P9WexAAF","true","false",""
    "a002800000P9WeyAAF","true","false",""
    "a002800000P9WezAAF","true","false",""
    "a002800000P9Wf0AAF","true","false",""
    "a002800000P9Wf1AAF","true","false",""
    "a002800000P9Wf2AAF","true","false",""
    "a002800000P9Wf3AAF","true","false",""

### Are we done?
1. If the batch is completed successfully and `numberRecordsFailed` is `0`, then we are done.
2. In case, if a batch failed, it will be due to header name mismatch between CSV file and SDFC object.
3. In case, if a batch is completed, but, individual record(s) failed, likely due to invalid field value in the record.

For last two cases, we may have to fix the data/code and redo the entire process (Say, step 1-5 mentioned earlier).

### Related
* Use [Rest API](salesforce-rest-api-usage-with-an-example.html) to process individual records if few records has to be updated realtime.