---
title: Setup Elasticsearch cluster on AWS
date: '2015-07-15'
draft: false
type: blogs
systems_tags:
- aws
- elasticsearch
- setup
author: Sakthi Priyan H
summary: EC2 instances.
aliases:
- /2015/07/15/setup-elasticsearch-cluster-on-aws.html
---

Elasticsearch cluster can be set up on AWS ec2 instance as shown below.

### Setup
The following configuration details are for Ubuntu distro.

1. [Install](www.webupd8.org/2012/01/install-oracle-java-jdk-7-in-ubuntu-via.html) Java.

        sudo add-apt-repository ppa:webupd8team/java
        sudo apt-get update
        sudo apt-get install oracle-java7-installer

2. Install [Elasticsearch](https://www.elastic.co/products/elasticsearch)

        wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
        echo "deb http://packages.elastic.co/elasticsearch/1.6/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-1.6.list
        sudo apt-get update
        sudo apt-get install elasticsearch

3. Setup EBS.

        # Mounting EBS to /mnt  
        sudo mkfs.ext4 /dev/xvdf
        sudo mkdir /mnt
        sudo mount /dev/xvdf /mnt

        # Configure fstab
        # Add following line in /etc/fstab document
        # /dev/xvdf       /mnt    auto    defaults,nobootwait,comment=cloudconfig 0       2
        echo "/dev/xvdf       /mnt    auto    defaults,nobootwait,comment=cloudconfig 0       2" | sudo tee -a /etc/fstab

4. Create folder for Elasticsearch in EBS.

        # create a folder "data" in /mnt
        sudo mkdir -p /mnt/data
        # change the ownership to elasticsearch user
        sudo chown elasticsearch:elasticsearch /mnt/data

5. Configure Elasticsearch.

        # Edit Elasticsearch config file /etc/elasticsearch/elasticsearch.yml
        # Cluster name should be same across all nodes.
        cluster.name: es-cluster
        # Set data path to correct folder in attached drive.
        path.data: /mnt/data
        # Disable Multicast Discovery. Amazon doesn't allow multicast. So, we discover cluster with Unicast
        discovery.zen.ping.multicast.enabled: false
        # Config at least two IP in all machines. These two machines will be pinged by other machines in the cluster for discovery
        discovery.zen.ping.unicast.hosts: ["machine1", "machine2"]  

        # Automatically start during bootup
        sudo update-rc.d elasticsearch defaults 95 10

6. Optionally setup Head Plugin to view status of Elasticsearch.

        # Install Elastic-Head Plugin
        sudo /usr/share/elasticsearch/bin/plugin -install mobz/elasticsearch-head
Now, open `http://instance-ip:9200/_plugin/head/` to view the Elasticsearch status

Repeat same procedure in all nodes to manually set up Elasticsearch cluster.

### Notes
* Create EC2 instances for each node required in the cluster, in the same availability zone.
* Let all the nodes be of same EC2 instance type.
* Better to create all instances within same security group.
* Security Group of the machines must allow ICMP packets between the machines.
* SSD EBS storage is attached for better performance.
* Http REST API access is relatively faster than native Java based client.
* Better to do round robin access to nodes to avoid overloading a single node for all queries from clients.