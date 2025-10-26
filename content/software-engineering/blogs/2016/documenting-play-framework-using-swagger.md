---
title: Documenting Play Framework using Swagger
date: '2016-07-20'
draft: false
type: blogs
se_tags:
- api
- swagger
- play-framework
- documentation
- design
author: Sakthi Priyan H
summary: Setting up live documentation for API
aliases:
- /2016/07/20/documenting-play-framework-using-swagger.html
---

### Swagger Spec
Earlier I had explained the [Swagger](http://swagger.io/) spec in this post, [Creating REST API Specification.](http://sakthipriyan.com/2016/03/30/creating-rest-api-specification.html)  

### Swagger Module
Over this post let us automate Swagger spec generation in [Play Framework](https://playframework.com/) using [swagger-play2](https://github.com/swagger-api/swagger-play) module.

### Swagger UI
[Swagger.io](http://swagger.io) provides a [Swagger UI](http://swagger.io/swagger-ui/) which consumes Swagger spec `json`.  
It provides a dynamic web interface to learn, experiment and understand the API.

### Configure Play
Now, let us start integrating the swagger module. Following is tested for Play Framework `2.4.6`

1. Add plugin as dependency in build file `build.sbt`

		libraryDependencies += "io.swagger" %% "swagger-play2" % "1.5.2"


2. Enable the Swagger Module in `conf/application.conf`

		play.modules.enabled += "play.modules.swagger.SwaggerModule"

		api.version = "v1" // Specify the api version.
 [More config](https://github.com/swagger-api/swagger-play/tree/master/play-2.4/swagger-play2#applicationconf---config-options) can be added to `conf/application.conf` to auto generate additional fields in Swagger Spec.

### Document API
* Swagger annotations are available in package `io.swagger.annotations`
* Swagger annotations are used to document API in Controller classes.  

Sample code can be found below.
Add following code to the controller class.

	@Api(value = "Example Controller", produces = "application/json")

For each method we need to add documentation, we have to specify the following annotation.  
Standard response class is provided. Here, we have `Response.class`

	@ApiOperation(value = "Get API", notes = "Get list of id & values.", response = Response.class)


For each additional response, that API may return can be added using the following annotation.

	@ApiResponses({
		@ApiResponse(code = 403, message = "Invalid Authorization", response = ErrorStatus.class),
		@ApiResponse(code = 500, message = "Internal Server Error", response = ErrorStatus.class) })


Arguments in controller methods can be added using,

	@ApiOperation(value = "Get User", response = User.class)
	public Promise<Result> getUser(
		@ApiParam(value = "User Id", name = "userId") String userId){
			User user = getUser(userId);
			return ok(user);
		}



### Routes
We can access the auto generated Swagger spec by adding a route to it in `conf/routes`

	GET		/docs/swagger.json				controllers.ApiHelpController.getResources

Now. we can access Swagger Spec from `/docs/swagger.json`

### Add Swagger UI to Play Framework
Since Swagger UI is just dynamic frontend with HTML/JS, it can be served directly in [Nginx](https://www.nginx.com/) or [httpd](https://httpd.apache.org/).  
Alternatively, we can serve Swagger UI in play framework as well.  
This also, solves any CORS issues that might arise when API and Swagger UI on different domains.  
Copy [dist](https://github.com/swagger-api/swagger-ui/tree/master/dist) of Swagger UI to `/public/swagger-ui` in Play Project.

	GET		/docs/				controllers.Assets.at(path="/public/swagger-ui",file="index.html")
	GET		/docs/swagger.json	controllers.ApiHelpController.getResources
	GET		/docs/*file			controllers.Assets.at(path="/public/swagger-ui",file)

Edit `index.html` to change the Swagger Spec url.

**From**

	var url = window.location.search.match(/url=([^&]+)/);
	if (url && url.length > 1) {
		url = decodeURIComponent(url[1]);
	} else {
		url = "http://petstore.swagger.io/v2/swagger.json";
	}

**To**

	var url = window.location.search.match(/url=([^&]+)/);
	if (url && url.length > 1) {
		url = decodeURIComponent(url[1]);
	} else {
		url = "swagger.json";
	}

### Explore APIs
Once, sbt compiles and run the playframework, go to `http://localhost:9000/docs/` to see the live working Swagger UI.

### Good
* Using Swagger Spec, made it very easy to effectively communicate what API does to anyone who is going to use the API.
* Automated client code generation from Swagger spec made API Consumption and Testing a breeze.

### Not good Yet
There are few glitches in Swagger UI.

* Some times you have to reload the page to make it work again.
* If there is no connection to the API service, UI doesn't explicitly says it.
* API url prefix path is not currently handled in the Swagger UI.
* Swagger Spec generation involving security configuration is not done correctly.
* You may have to use prior major version of Play Framework as there is a delay in support for latest version.

### Overall
Overall Swagger Spec/UI is very good to have when we are exposing any API to be consumed.  
Over time, I expect it to evolve to be a better shape and help people who are building and consuming REST APIs.