---
title: Testing Spring Application using JUnit
date: '2015-06-03'
draft: false
type: blogs
systems_tags:
- junit
- java
- spring
- testing
- code
author: Sakthi Priyan H
summary: How to test a Spring Application using JUnit? Explained with example test
  class.
aliases:
- /2015/06/03/testing-spring-application-using-junit.html
---

### Unit Testing
[JUnit](http://junit.org/) is a widely used unit testing framework in Java. [TestNG](http://testng.org/) is another popular testing framework in Java.

### Problem
It easy to do a unit testing of simple Java application where object life cycle is manually managed. In case of Spring applications, object life cycle is primarily managed by itself. We have to manually initiate Spring Application Context to test it properly. This blog post explains how to test a spring application easily using `@RunWith` annotation.

### Maven Dependencies
To start with, we need following dependencies added to the `pom.xml` file. Or add these dependencies into `build.gradle` or `build.sbt`, if you are using `gradle` or `sbt` respectively.

    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>4.0.3.RELEASE</version>
      <scope>test</scope>
    </dependency>

### Example Code
Following example code shows how to easily do JUnit testing of Spring application.

    package com.sakthipriyan.example.junit;

    import static org.junit.Assert.assertEquals;

    import org.junit.Test;
    import org.junit.runner.RunWith;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.test.context.ContextConfiguration;
    import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

    // Specify how to run this test class.
    @RunWith(SpringJUnit4ClassRunner.class)
    // Provide the spring configuration file in the classpath.
    @ContextConfiguration("classpath:spring.xml")
    public class ExampleServiceImplTest {

        // Autowire the Class that has to be tested.
        @Autowired
        private ExampleService exampleService;

        // Here test a sum method in the ExampleService.
        @Test
        public void testSum() {
            int sum = exampleService.sum(12,13);
            assertEquals(25, sum);
        }

    }

### Explanation
* Using `@RunWith(SpringJUnit4ClassRunner.class)` annotation modifies how the test class is run.
* [@RunWith](http://junit.sourceforge.net/javadoc/org/junit/runner/RunWith.html) will run test with given class rather than the default JUnit implementation.
* [SpringJUnit4ClassRunner](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/test/context/junit4/SpringJUnit4ClassRunner.html) class extends JUnit's BlockJUnit4ClassRunner to provide Spring TestContext Framework.
* `@ContextConfiguration("classpath:spring.xml")` specifies how to configure the Spring Application Context. In this example `spring.xml` is the spring config file at the root of the application classpath.
* It is better to use the application's spring config, rather than say a separate `spring-test.xml`.
* But in practice, most of time people end up using different config files for testing.
* Once required configurations are done, yeah just add two `@annotation`, we are ready to test the Spring dependency injected application, using JUnit.
* Here, we have tested a very complex problem of adding two number. Just kidding.