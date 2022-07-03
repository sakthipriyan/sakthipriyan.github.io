# Creating REST API Specification
## using Swagger Specification
api, swagger, documentation, design, cricscore api

### Intro

[Swagger](http://swagger.io/) specification is used to document RESTful API. It is immensely useful for defining, developing, testing and consuming the REST API. First release of the Swagger Specification was done on 4+ years ago. It has evolved a lot over these years.

> Swagger™ is a project used to describe and document RESTful APIs.  
> ~ [http://swagger.io/specification/](http://swagger.io/specification/)

Recently [Open API Initiative (OAI)](https://openapis.org) was created which uses Swagger specification as baseline.
> The OAI is focused on creating, evolving and promoting a vendor neutral API Description Format based on the Swagger Specififcation.  
> ~ [https://openapis.org/](https://openapis.org/)

Focus of this post is to create Swagger specification for a simple use case.

### Why Swagger?
* It is much easier to document REST APIs using Swagger Specification
* Manual Documentation is done using simple [YAML](https://en.wikipedia.org/wiki/YAML) format.
* Now we can create server code and client code across languages and frameworks.  
* Also, we can create the Swagger Specification from the server code automatically using Java `@annotation`.
* Easier to communicate across teams and organizations with an industry standard specification.
* Code generated Swagger Spec is always up to date.

### Creating Swagger Spec for Cricscore API
Earlier I had built a cricket score API known as [Cricscore API](http://cricscore-api.appspot.com/).
Following documentation is equivalent to as is state of the Cricscore API.

In short, Swagger specification contains 3 sections,

* **info & endpoint** - Contains general information and endpoint details.
	* info
	* host
	* basePath
	* schemes
	* produces and etc.,
* **paths** - All Input and Output details of each specific API.
* **definitions** - Definitions of data models used across different APIs.

#### Swagger version
First Let us specify which version of the swagger we are using.
Required field. Currently Value is '2.0'

	swagger: '2.0'

#### API info
`info` is required root of the spec. Within `info`, `title` and `version` are required properties.  
Other properties such as `termsOfService`, `contact`, `license` are optional, but I would suggest we add them as well.

	info:
	  title: Cricscore API
	  version: '1.0'
	  description: Simple REST API to get cricket scores.
	  termsOfService: YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF THE SERVICE AND THE CONTENT IS AT YOUR SOLE RISK AND THAT THE SERVICE AND THE CONTENT ARE PROVIDED 'AS IS' AND 'AS AVAILABLE'.
	  contact:
	    name: Sakthi Priyan H
	    url: 'http://sakthipriyan.com'
	    email: email@example.com
	  license:
	    name: Attribution 4.0 International (CC BY 4.0)
	    url: 'http://creativecommons.org/licenses/by/4.0/'

Refer the [info](http://swagger.io/specification/#infoObject) section in the spec for more details.

#### Host name
The host (name or ip) serving the API.

	host: cricscore-api.appspot.com

#### Base path
Base path of the API. For, Cricscore API, currently there is no base path. So, using the `/`.

	basePath: /

In case, if you are using say `https://example.com/api/v1/` as basePath, then it should be

	basePath: /api/v1/

#### Schemes
Schemes supported in the API.

	schemes:
		- http
		- https

#### Produces
List of content types produced by the API. Currently Cricscore API produce only JSON.

	produces:
		- application/json

Similarly, there is a `consumes` property as well in the Swagger spec.

#### Definitions
Let do definitions before getting into paths.
We have two different JSON objects that are returned from the Cricscore API.

**Match**

	{"id":631136,"t2":"Kenya","t1":"Scotland"}

In Swagger Spec, it becomes.

	definitions:
		Match:
			type: object
			properties:
			id:
				type: integer
				description: Match Id.
			t1:
				type: string
				description: Name of the Team One
			t2:
				type: string
				description: Name of the Team Two

**Score**

	{
		"id":597924,
		"si":"West Indies 25/1 * v India 229/7",
		"de":"WI 25/2 (3.1 ov, J Charles 12*, UT Yadav 2/7)"
	}

In Swagger Spec, it becomes.

	definitions:
		Score:
			type: object
			properties:
			id:
				type: integer
				description: Match Id.
			de:
				type: string
				description: detailed description of the match.
			si:
				type: string
				description: simple description of the match.

With this we have defined over json format that is returned from the service.

#### Paths

In Cricscore API, only one path is available and it is simple get [operation](http://swagger.io/specification/#operationObject) on `/csa`

Swagger Spec operation object contains following fields.

* summary - Summary of the operation.
* parameters -  List of parameters accepted across url path, query parameter, header and body.
* responses - All kind of http response returned by the API.

Following spec should be fairly self explanatory.  
Refer the original [documentation](http://cricscore-api.appspot.com/) of the Cricscore API done earlier using HTTP request/response.

	/csa:
		get:
			summary: Get currently playing matches or get scores of specific matches.
			parameters:
			- name: id
				in: query
				required: false
				description: Match Ids separated by + sign.
				type: string
			- name: If-Modified-Since
				in: header
				required: false
				description: Timestamp of the last response.
				type: string
			responses:
				default:
					description: 200 Ok response which contains list of currently playing matches when query parameter `id` is absent.
					schema:
					type: array
					items:
						$ref: '#/definitions/Match'
				200:
					description: Array of Score for requested Match Ids for which score has changed based on the If-Modified-Since header.
					headers:
					Last-Modified:
						type: string
						description: Should be used for subsequent requests as If-Modified-Since request header.
					schema:
						type: array
						items:
							$ref: '#/definitions/Score'
				500:
					description: Unexpected server error.


#### Full Swagger Spec for Cricscore API

	swagger: '2.0'
	info:
	  title: Cricscore API
	  version: '1.0'
	  description: Simple REST API to get cricket scores.
	  termsOfService: YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF THE SERVICE AND THE CONTENT IS AT YOUR SOLE RISK AND THAT THE SERVICE AND THE CONTENT ARE PROVIDED 'AS IS' AND 'AS AVAILABLE'.
	  contact:
	    name: Sakthi Priyan H
	    url: 'http://sakthipriyan.com'
	    email: email@example.com
	  license:
	    name: Attribution 4.0 International (CC BY 4.0)
	    url: 'http://creativecommons.org/licenses/by/4.0/'
	host: cricscore-api.appspot.com
	basePath: /
	schemes:
	  - http
	  - https
	produces:
	  - application/json

	paths:
	  /csa:
	    get:
	      summary: Get currently playing matches.
	      parameters:
	        - name: id
	          in: query
	          required: false
	          description: Match Ids separated by + sign.
	          type: string
	        - name: If-Modified-Since
	          in: header
	          required: false
	          description: Timestamp of the last response.
	          type: string
	      responses:
	        default:
	          description: 200 Ok response which contains list of currently playing matches when query parameter `id` is absent.
	          schema:
	            type: array
	            items:
	              $ref: '#/definitions/Match'
	        200:
	          description: Array of Score for requested Match Ids for which score has changed based on the If-Modified-Since header.
	          headers:
	            Last-Modified:
	              type: string
	              description: Should be used for subsequent requests as If-Modified-Since request header.
	          schema:
	            type: array
	            items:
	              $ref: '#/definitions/Score'
	        500:
	          description: Unexpected server error.

	definitions:
	  Match:
	    type: object
	    properties:
	      id:
	        type: integer
	        description: Match Id.
	      t1:
	        type: string
	        description: Name of the Team One
	      t2:
	        type: string
	        description: Name of the Team Two
	  Score:
	    type: object
	    properties:
	      id:
	        type: integer
	        description: Match Id.
	      de:
	        type: string
	        description: detailed description of the match.
	      si:
	        type: string
	        description: simple description of the match.

### Let's try it out online.
There is fantastic online swagger editor is available at [http://editor.swagger.io/](http://editor.swagger.io/).  
Also, [Swagger Specification documentation](http://swagger.io/specification/) is pretty good.  
You can play around it.

### Later
I will blog later on how to integrate Swagger into a Java project and auto generate the Swagger specification and additional documentation in html/pdf for offline distribution.
