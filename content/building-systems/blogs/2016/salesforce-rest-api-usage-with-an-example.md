---
title: Salesforce Rest API usage with an example
date: '2016-02-07'
draft: false
type: blogs
systems_tags:
- salesforce
- integration
- code
author: Sakthi Priyan H
summary: to show how to upsert records
aliases:
- /2016/02/07/salesforce-rest-api-usage-with-an-example.html
---

### Goal
To upsert records in to salesforce [objects](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_concepts.htm) using the REST API.  

### Get ready with
I would recommend you to use a [developer account](https://developer.salesforce.com/signup) to experiment.  
Get ready with following things.

1. User credentials
    * **Username** of salesforce account. Let me use `user@domain.com`.
    * **Password** corresponding to the username.
    * **Security Token** of the user is required.  
    You can generate your security token as follows.
        1. Go to user settings
        2. Search `security` and click `Reset My Security Token`
        3. Click  `Reset Security Token` button.
        4. You will get it in the email.
    * Let me use `user@domain.com`, `password`, `securitytoken` for above 3.
2. Connected App
    * **Consumer Key** of the Connected App.
    * **Consumer Secret** of the Connected App.
    * In case, you don't have a Connected App. Follow below steps to set up one.
        1. Go to `Setup`
        2. Search `apps` and click on Create `apps` in the Build section.
        3. In `Connected Apps` section click `new` button.
        4. In Basic Information, fill in *Connected App Name*, *API Name*, *Contact Email*
        5. In `API (Enable OAuth Settings)`,
            * Check Enable OAuth Settings.
            * Callback URL, fill in some dummy url.
            * In, Selected OAuth Scopes, Add relevant `Access and manage your data (api)`.
        6. Save the Connected App.
        7. Then, `Continue` to next page.
        8. You can get Consumer Key and Consumer Secret from this page.
    * Let me use `consumerkey` and `consumersecret` for examples.

### Rest API

* HTTP Request
    * For simplicity, I have shown the HTTP request.  
    * It should be fairly easy to translate it in to any language.
    * Also, I have manually added line breaks into request body for readability.
    * `X-PrettyPrint` header is used to get formatted `JSON` response from salesforce.
    * `https` is used for URLs.
* HTTP Response
    * Only response body is shown in the response section.
    * Also, response code is shown in case of upsert api.

### Access Token

First step is to login and get the access token.

**Request**

    POST /services/oauth2/token HTTP/1.1
    Host: login.salesforce.com
    X-PrettyPrint: 1
    Content-Type: application/x-www-form-urlencoded

    grant_type=password&
    client_id=consumerkey&
    client_secret=consumersecret&
    username=user%40domain.com&
    password=passwordsecuritytoken

**Response**

    {
      "access_token" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "instance_url" : "https://ap2.salesforce.com",
      "id" : "https://login.salesforce.com/id/XXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXX",
      "token_type" : "Bearer",
      "issued_at" : "1454735969118",
      "signature" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX="
    }


* We have to use `access_token` in `Authorization` Header as `Authorization: Bearer access_token`
* We have to use the instance_url returned for accessing all resources.
* `id` contains more information of the user
* For further requests, I am going to use `access_token` for access_token.

### Get an object
Here, I am retrieving a custom object, Mutual Fund.

**Request**

    GET /services/data/v35.0/sobjects/Mutual_Fund__c HTTP/1.1
    Host: ap2.salesforce.com
    Authorization: Bearer access_token
    X-PrettyPrint: 1

**Response**

    {
      "objectDescribe": {
        "activateable": false,
        "createable": true,
        "custom": true,
        "customSetting": false,
        "deletable": true,
        "deprecatedAndHidden": false,
        "feedEnabled": true,
        "keyPrefix": "a00",
        "label": "Mutual Fund",
        "labelPlural": "Mutual Funds",
        "layoutable": true,
        "mergeable": false,
        "name": "Mutual_Fund__c",
        "queryable": true,
        "replicateable": true,
        "retrieveable": true,
        "searchable": true,
        "triggerable": true,
        "undeletable": true,
        "updateable": true,
        "urls": {
          "compactLayouts": "/services/data/v35.0/sobjects/Mutual_Fund__c/describe/compactLayouts",
          "rowTemplate": "/services/data/v35.0/sobjects/Mutual_Fund__c/{ID}",
          "approvalLayouts": "/services/data/v35.0/sobjects/Mutual_Fund__c/describe/approvalLayouts",
          "describe": "/services/data/v35.0/sobjects/Mutual_Fund__c/describe",
          "quickActions": "/services/data/v35.0/sobjects/Mutual_Fund__c/quickActions",
          "layouts": "/services/data/v35.0/sobjects/Mutual_Fund__c/describe/layouts",
          "sobject": "/services/data/v35.0/sobjects/Mutual_Fund__c"
        }
      },
      "recentItems": [
        {
          "attributes": {
            "type": "Mutual_Fund__c",
            "url": "/services/data/v35.0/sobjects/Mutual_Fund__c/a002800000P9WeyAAF"
          },
          "Id": "a002800000P9WeyAAF",
          "Name": "Motilal Focused Midcap 30 - DP G"
        }
      ]
    }


### Get a record
Here, I am getting a specific record from the Mutual Funds object.

**Request**

    GET /services/data/v35.0/sobjects/Mutual_Fund__c/a002800000P9WeyAAF HTTP/1.1
    Host: ap2.salesforce.com
    Authorization: Bearer access_token
    X-PrettyPrint: 1

**Response**

    {
      "attributes": {
        "type": "Mutual_Fund__c",
        "url": "/services/data/v35.0/sobjects/Mutual_Fund__c/a002800000P9WeyAAF"
      },
      "Id": "a002800000P9WeyAAF",
      "OwnerId": "00528000002A6JaAAK",
      "IsDeleted": false,
      "Name": "Motilal Focused Midcap 30 - DP G",
      "CreatedDate": "2016-02-05T09:50:59.000+0000",
      "CreatedById": "00528000002A6JaAAK",
      "LastModifiedDate": "2016-02-05T10:46:48.000+0000",
      "LastModifiedById": "00528000002A6JaAAK",
      "SystemModstamp": "2016-02-05T10:46:48.000+0000",
      "LastViewedDate": "2016-02-05T10:32:24.000+0000",
      "LastReferencedDate": "2016-02-05T10:32:24.000+0000",
      "checked__c": false,
      "External_ID__c": 104
    }

### Upsert a record

* `Upsert` operation will update the existing record or create a new record, if is not available.
* Request format is same for both update and insert operation done via upsert operation.
* An `External ID` field is required to perform this operation,
* Here, `External_ID__c` is the custom numeric field which is checked as `External ID`.
* `External ID` and its `value` should be specified in the url.  
Example: /services/data/v35.0/sobjects/Mutual_Fund__c/`External_ID__c`/`104`
* Different response for update and insert operation as shown below.

#### Updating an existing record.

**Request**

    PATCH /services/data/v35.0/sobjects/Mutual_Fund__c/External_ID__c/104 HTTP/1.1
    Host: ap2.salesforce.com
    Authorization: Bearer access_token
    X-PrettyPrint: 1
    Content-Type: application/json

    {
        "Name": "Motilal Focused Midcap 30 - DP (G)"
    }

**Response**

    204 No Content

Response code `204` is returned in case of update operation.

#### Inserting a new record.

**Request**

    PATCH /services/data/v35.0/sobjects/Mutual_Fund__c/External_ID__c/111 HTTP/1.1
    Host: ap2.salesforce.com
    Authorization: Bearer access_token
    X-PrettyPrint: 1
    Content-Type: application/json

    {
        "Name": "SBI Blue Chip Fund - Direct (G)"
    }

**Response**

    201 Created

    {
        "id": "a002800000PA0AzAAL",
        "success": true,
        "errors": []
    }

Response code `201` is returned in case of insert operation.

### Footnotes
* It should be fairly simple to `upsert` records using the Upsert REST API.
* Other operations such as `insert`, `update`, `delete` are similar to `upsert` using relevant http verb.
* [Rest API](https://developer.salesforce.com/docs/atlas.en-us.200.0.api_rest.meta/api_rest/intro_what_is_rest_api.htm) approach is right one when number of records involved is low and if it has to be real time.
* [Bulk API](https://developer.salesforce.com/docs/atlas.en-us.198.0.api_asynch.meta/api_asynch/asynch_api_intro.htm) should be used, if you are dealing with 1000s of records and batch mode.

### Related
* [Salesforce Bulk API usage with an example](salesforce-bulk-api-usage-with-an-example.html)