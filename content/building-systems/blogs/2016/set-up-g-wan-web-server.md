---
title: Set up G-WAN web server
date: '2016-02-23'
draft: false
type: blogs
systems_tags:
- web-server
- g-wan
- setup
author: Sakthi Priyan H
summary: to serve static website
aliases:
- /2016/02/23/set-up-g-wan-web-server.html
---

### What is G-WAN web server?

From G-WAN [website](http://gwan.ch/),

    G-WAN runs C, C# or Java with less CPU and
    less RAM while handling more requests than other
    servers. Other languages (Go, PHP, Python, Ruby, JS...)
    benefit from G-WAN's multicore architecture.

G-WAN can be used for serving both static and dynamic contents.

#### Languages supported for dynamic content generation.
* C
* C++
* C#
* Go
* Java
* Javascript
* Lua
* Objective-C
* Perl
* PHP
* Python
* Ruby
* Scala

This post explains how to set up static website.

### Set up
Just download and unpack the server.

    wget "http://gwan.com/archives/gwan_linux64-bit.tar.bz2"
    tar -xjf gwan_linux64-bit.tar.bz2
    cd gwan_linux64-bit
    ./gwan -h

Following output is shown,

      _________________________________________________________________
      |                                                               |
      | G-WAN Web App. Server v7.12.6   64-bit (Feb  8 2016 16:33:28) |
      |_______________________________________________________________|
      |                                                               |
      | Usage: gwan [-b -d -g -t -w | -k | -r | -v] [argument]        |
      |        (grouped options like '-bd' are ignored, use '-b -d')  |
      |_______________________________________________________________|
      |                                                               |
      |   -b | use the TCP_DEFER_ACCEPT TCP option                    |
      |      | (not for frontends: it disables the DoS shield)        |
      |                                                               |
      |   -d | daemon mode (default is '-d:www-data:www-data',        |
      |      | use -d:group:user or just -d:account if user=group)    |
      |                                                               |
      |   -g | do not limit worker threads to physical CPU Cores      |
      |      | (may be needed to bypass a faulty CPU detection but    |
      |      | don't set more workers than you have physical Cores)   |
      |                                                               |
      |   -k | (gracefully) kill local gwan processes using the       |
      |      | *.pid files found in the ./gwan directory              |
      |                                                               |
      |   -r | run the specified C script and exit (-r hello.c)       |
      |      | (general-purpose source code here, not servlets)       |
      |                                                               |
      |   -t | store client requests in the 'gwan/trace' file         |
      |                                                               |
      |   -v | show the version number and build date, and exit       |
      |                                                               |
      |   -w | define the number of worker threads (ie: -g -w 1)      |
      |_______________________________________________________________|

    G-WAN can listen on 3 local IP addresses:
     127.0.0.1 192.168.42.101 172.17.42.1

List of IPs which can be listened by G-WAN is shown above.

### Starting and stopping the server
    # Start the server in the background
    $ ./gwan &

    # Stop the server
    $ ./gwan -k

### Directory Layout for static website

For serving static website following folder structure is needed.
All, other folders comes with the downloaded archive are not required for serving static content.

* gwan_linux64-bit
    * 127.0.0.1:8080 -> 1
        * \#127.0.0.1 -> 2
            * gzip -> 3
                * index.html
            * logs -> 4
                * access_2016-02-22.log
                * access.log
                * error_2016-02-22.log
                * error.log
            * www -> 5
                * index.html
    * gwan -> 6
    * logs -> 7
        * gwan_2016-02-22.log
        * gwan.log
    * trace -> 8

Numbers 1-8 marked above is explained as follows.

1. `127.0.0.1:8080` IP Address and Port to which this G-WAN web server will listen.
2. `#127.0.0.1` Prefix '#' used for "root" HOST (the default host) and
prefix '$' for "virtual" HOSTS (identified by the "Host: xxx" HTTP header).
3. `gzip` content is automatically produced by the G-WAN to serve compressed files.
4. `logs` folder contains access and error logs.
5. Place static html, js, css and other static files in `www` folder.  
This is the root directory for the web server.
6. Executable file `gwan` contains the server code.
7. Server log files are stored in `logs` folder.
8. `trace` file contains the server start and stop timings.

### Zero configuration files.
* Yep! you read it right, G WAN uses directory structure to set up virtual hosts.
* You can override the defaults, by editing the `init.c_` and `main.c_` samples given in the tar.
* Virtual hosts can be added by adding folders into top level `127.0.0.1:8080`.
    * 127.0.0.1:8080
        * \#127.0.0.1
        * $hostname1
            * www
* We can access contents of the `hostname1` by accessing the url `http://hostname1:8080`.
* Don't create the `logs` folder inside virtual host folder `$hostname1` to avoid creating logs.

### Good things about G-WAN
* No need to install any package/dependency for setting up the server.
* Easy to configure and deploy in linux servers.
* Since, `gwan` file is only `229KB`, can be embedded and checked into the repository (Say 'git')
* Gives comparable performance to `nginx` or more. Depends on the content served.

### Low market share
* G-WAN is relatively younger one in the web server market.
* Market share is much lower compared to [Nginx](https://www.nginx.com/) or oldie [Apache web server](https://httpd.apache.org/)
* So, the availability of online resources apart from [G-WAN website](http://gwan.ch/).

### Notes
I had tested `G-WAN v7.12.6` in `Ubuntu 14.04` and `Cent OS 7.1`.  
Seems to be working well without any issues.