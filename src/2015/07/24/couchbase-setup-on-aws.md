# Couchbase setup on AWS
## EC2 instances
couchbase, setup, aws

[Couchbase](http://couchbase.com) cluster can be set up on AWS EC2 instance as shown below.

### Setup
The following configuration details are for Ubuntu distro.


1. Setup EBS (EBS is recommended for better performance).

        # Mounting EBS to /mnt
        sudo mkfs.ext4 /dev/xvdf
        sudo mkdir /mnt
        sudo mount /dev/xvdf /mnt

        # Configure fstab
        # Add following line in /etc/fstab document
        # /dev/xvdf       /mnt    auto    defaults,nobootwait,comment=cloudconfig 0       2
        echo "/dev/xvdf       /mnt    auto    defaults,nobootwait,comment=cloudconfig 0       2" | sudo tee -a /etc/fstab

2. Download Couchbase

        # Download the deb file from couchbase website
        wget http://packages.couchbase.com/releases/3.0.1/couchbase-server-enterprise_3.0.1-ubuntu12.04_amd64.deb

        # Copy the downloaded file into all nodes. Replace the IP XXX.XXX.XXX.XXX with actual IP.
        scp  couchbase-server-enterprise_3.0.1-ubuntu12.04_amd64.deb ubuntu@XXX.XXX.XXX.XXX:couchbase-server-enterprise_3.0.1-ubuntu12.04_amd64.deb

3. Install and configure Couchbase on each node.

        # Install Couchbase & setup folder
        sudo dpkg -i couchbase-server-enterprise_3.0.1-ubuntu12.04_amd64.deb
        sudo mkdir /mnt/cb
        sudo chown couchbase:couchbase /mnt/cb

        # Configure all the Couchbase installations.
        /opt/couchbase/bin/couchbase-cli node-init -c 127.0.0.1:8091 \
                -u admin -p PASSWORD \
                --node-init-data-path=/mnt/cb/data \
                --node-init-index-path=/mnt/cb/index
         # PASSWORD replace with actual password (use a lengthy random string).

4. Initialize the cluster in one of the nodes.
Here, RAM is set as 15GB per node. Can be changed as required.

        /opt/couchbase/bin/couchbase-cli cluster-init -c 127.0.0.1:8091 \
                -u admin -p PASSWORD \
                --cluster-init-ramsize=15360

5. Add all other nodes.
Change the server-add IP address for all remaining nodes and execute.

        /opt/couchbase/bin/couchbase-cli rebalance -c 127.0.0.1:8091 -u admin -p PASSWORD \
                --server-add=XXX.XXX.XXX.XXX:8091 \
                --server-add-username=admin \
                --server-add-password=PASSWORD

6. Now, create a Bucket. Finally..

        # Create a bucket `bucket-one` with quota 10GB per node.
        /opt/couchbase/bin/couchbase-cli bucket-create -c 127.0.0.1:8091 -u admin -p PASSWORD \
                --bucket=bucket-one \
                --bucket-type=couchbase \
                --bucket-password=BPASSWORD \
                --bucket-ramsize=10240 \
                --bucket-replica=1 \
                --wait
        # Replace BPASSWORD with password for the bucket.

Now, we can start using the bucket and so the Couchbase cluster.
