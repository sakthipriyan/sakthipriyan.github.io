---
title: Distributed forward proxy servers
date: '2015-07-20'
draft: false
type: blogs
se_tags:
- squid
- haproxy
- proxy
- http
- setup
- distributed
author: Sakthi Priyan H
summary: to crawl Internet via multiple cloud instances.
aliases:
- /2015/07/20/distributed-forward-proxy-servers.html
---

Setting up a distributed forward proxy servers can be done as follows.

* Squid as forward proxy to Internet.
* Use HAproxy as a load balancer.
* Send all request to Internet via HAProxy as proxy server.

### Squid

#### Install
    # change to root user
    sudo su
    apt-get update
    # install squid
    apt-get install squid -y

#### Back up default config for reference
    # backup current config
    mv /etc/squid3/squid.conf /etc/squid3/squid.conf.original
    # make backup copy as readonly
    chmod a-w /etc/squid3/squid.conf.original

#### Configure
    nano /etc/squid3/squid.conf

    ### Add squid config shown below ###

    http_port 8001

    # visible_hostname should be the aws instance hostname.
    visible_hostname ip-10-XXX-XXX-149

    # IP address of the haproxy should be used.
    # Also, 127.0.0.1 can be removed if we don't need access from localhost.
    acl haproxy src 10.XXX.XXX.172 127.0.0.1

    http_access allow haproxy
    cache deny all

#### Reload with new config
    # reload the new config
    service squid3 reload
    # To check if squid runs at port 8001
    netstat -tlnp | grep 8001

Repeat the same steps across instances where squid has to be set up.

### HAProxy

#### Install
    # change to root user
    sudo su
    apt-get update
    # install haproxy
    apt-get install haproxy -y

#### Back up default config for reference
    # backup current config
    mv /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg.original  
    # make backup copy as readonly
    chmod a-w /etc/haproxy/haproxy.cfg.original

#### Enable HAProxy
    nano /etc/default/haproxy #Enable the haproxy
    ENABLED=1

#### Configure

    nano /etc/haproxy/haproxy.cfg
    ### Add haproxy config as shown below. ###

    /etc/haproxy/haproxy.cfg
    global
     daemon
     maxconn 256
    defaults
     mode http
     timeout connect 5000ms
     timeout client 50000ms
     timeout server 50000ms
    frontend squid_frontend
     bind *:8000
     default_backend squid_backend
     option http_proxy
    backend squid_backend
     option http_proxy
     server squid0 10.XXX.XXX.172:8001
     server squid1 10.XXX.XXX.248:8001
     server squid2 10.XXX.XXX.149:8001
     # Add more IPs here as required
     balance roundrobin

#### Reload with new config
    # Reload the new config
    service haproxy reload
    # To check if haproxy runs at port 8000
    netstat -tlnp | grep 8000


### Test
How to test the distributed proxy cluster?

####  Squid
    curl -x localhost:8001 http://google.com
    # If you get the html as below, then it is working fine.

Console output

    <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
    <TITLE>302 Moved</TITLE></HEAD><BODY>
    <H1>302 Moved</H1>
    The document has moved
    <A HREF="http://www.google.com">here</A>.
    </BODY>
    </HTML>

#### Haproxy
In haproxy server execute the following command,

    for i in {1..6}; do  curl -x localhost:8000  https://check.torproject.org 2>/dev/null | grep IP; done

If IPs are changed in round robin then, the distributed proxy is working fine as expected.  
Following output is shown in the console with IPs in roundrobin.  
Set upper bound in for loop to twice the number of squid servers to test.


    <p>Your IP address appears to be:  <strong>XXX.XXX.XXX.125</strong></p>
    <p>Your IP address appears to be:  <strong>XXX.XXX.XXX.132</strong></p>
    <p>Your IP address appears to be:  <strong>XXX.XXX.XXX.162</strong></p>
    <p>Your IP address appears to be:  <strong>XXX.XXX.XXX.125</strong></p>
    <p>Your IP address appears to be:  <strong>XXX.XXX.XXX.132</strong></p>
    <p>Your IP address appears to be:  <strong>XXX.XXX.XXX.162</strong></p>


#### Notes
* We can add as many squid proxy servers as required to distribute the load across IPs.
* At an advanced level, we can automatically, add Squid nodes, update HAProxy config and reload it.