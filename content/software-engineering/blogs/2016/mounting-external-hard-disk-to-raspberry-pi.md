---
title: Mounting external hard disk to Raspberry Pi
date: '2016-01-31'
draft: false
type: blogs
se_tags:
- raspberry-pi
- ntfs
- fat
- setup
- hard-disk
author: Sakthi Priyan H
summary: which contains NTFS and FAT file systems.
aliases:
- /2016/01/31/mounting-external-hard-disk-to-raspberry-pi.html
---

### Why?
I had to access the contents of an internal hard disk (1TB, 3.5 inch) of an old inoperational computer.  
This post explains how I turned this hard disk to into a [Network Attached Storage (NAS)](https://en.wikipedia.org/wiki/Network-attached_storage) using Raspberry Pi.

### External HDD
I used [this](http://www.amazon.in/gp/product/B00GAML7OK) external hard drive enclosure.  
Now, External hard disk drive is ready which is powered by its own power supply.  
Raspberry can turn the external hard disk into a network attached storage system.

### Mounting the hard disk
1. Power up the external hard disk and connect its USB cable to Raspberry Pi.

2. Check if the device is listed using `sudo blkid`.  
Also, we can use `fdisk -l` to see more details.

        $ sudo blkid
        /dev/mmcblk0: PTUUID="b3c5e39a" PTTYPE="dos"
        /dev/mmcblk0p1: SEC_TYPE="msdos" LABEL="boot" UUID="7771-B0BB" TYPE="vfat" PARTUUID="b3c5e39a-01"
        /dev/mmcblk0p2: UUID="c7f58a52-6b71-4cea-9338-65f3b8af27bf" TYPE="ext4" PARTUUID="b3c5e39a-02"
        /dev/sda1: LABEL="STORAGE" UUID="7769-6306" TYPE="vfat" PARTUUID="00087f73-01"
        /dev/sda2: LABEL="MOVIES VOL1" UUID="7B43-35C9" TYPE="vfat" PARTUUID="00087f73-02"
        /dev/sda3: LABEL="MOVIES VOL2" UUID="7F56-80F3" TYPE="vfat" PARTUUID="00087f73-03"
        /dev/sda5: LABEL="MOVIES VOL3" UUID="A0B49E2DB49E05C6" TYPE="ntfs" PARTUUID="00087f73-05"
        /dev/sda6: LABEL="MY WORKS" UUID="C44CB9B74CB9A518" TYPE="ntfs" PARTUUID="00087f73-06"
        /dev/sda7: LABEL="TRANSFERS" UUID="867CE49C7CE4886F" TYPE="ntfs" PARTUUID="00087f73-07"

3. Create required directory structure in `/mnt` for all partitions.

        cd /mnt
        sudo mkdir storage
        sudo mkdir -p movies/vol1
        sudo mkdir movies/vol2
        sudo mkdir movies/vol3
        sudo mkdir myworks
        sudo mkdir transfers

4. Add `read write` support of `NTFS` using `ntfs-3g`.  
By default, NTFS `read only` is supported.

        sudo apt-get update
        sudo apt-get install ntfs-3g

5. Find gid, uid of Raspberry Pi `user` you are using to access the system.  
I am using user id `sakthipriyan` in this case.

        $ cat /etc/passwd | grep sakthipriyan
        sakthipriyan:x:1001:1001::/home/sakthipriyan:/bin/bash

6. Mount each partition to its folder.

        sudo mount -o gid=1001,uid=1001 /dev/sda1 /mnt/storage
        sudo mount -o gid=1001,uid=1001 /dev/sda2 /mnt/movies/vol1
        sudo mount -o gid=1001,uid=1001 /dev/sda3 /mnt/movies/vol2
        sudo mount -o gid=1001,uid=1001,fmask=0022,dmask=0022 /dev/sda5 /mnt/movies/vol3
        sudo mount -o gid=1001,uid=1001,fmask=0022,dmask=0022 /dev/sda6 /mnt/myworks
        sudo mount -o gid=1001,uid=1001,fmask=0022,dmask=0022 /dev/sda7 /mnt/transfers

    * All files and folders in FAT32 and NTFS can be owned only at the mount time.
    * gid, uid found in step 5 is used.
    * In case of `NTFS` partition, by default all files and folders are given permission `777`.
    * In order to restrict write access, `fmask=0022` and `dmask=0022` is used.


7. Check the mounted partitions stats using `df -h`

        $ df -h
        Filesystem      Size  Used Avail Use% Mounted on
        /dev/root        15G  2.0G   13G  14% /
        devtmpfs        214M     0  214M   0% /dev
        tmpfs           218M     0  218M   0% /dev/shm
        tmpfs           218M  4.4M  213M   3% /run
        tmpfs           5.0M  4.0K  5.0M   1% /run/lock
        tmpfs           218M     0  218M   0% /sys/fs/cgroup
        /dev/mmcblk0p1   60M   20M   41M  34% /boot
        /dev/sda1       200G   53G  148G  27% /mnt/storage
        /dev/sda2       200G  195G  5.2G  98% /mnt/movies/vol1
        /dev/sda3       200G  134G   67G  67% /mnt/movies/vol2
        /dev/sda5       200G   55G  146G  28% /mnt/movies/vol3
        /dev/sda6       100G   35G   66G  35% /mnt/myworks
        /dev/sda7        32G   29G  2.7G  92% /mnt/transfers
Or open it from your local machine using `nautilus` file browser.

        # Replace the IP with actual IP of your Raspberry Pi.
        $ nautilus sftp://192.168.0.10/mnt/
Or access it via any software which supports `sftp` from any device.  

8. Once all work is done with the hard disk, we can unmount the partitions.

        sudo umount /mnt/storage
        sudo umount /mnt/movies/vol1
        sudo umount /mnt/movies/vol2
        sudo umount /mnt/movies/vol3
        sudo umount /mnt/myworks
        sudo umount /mnt/transfers

9. Unplug the USB cable from the Raspberry Pi and Power down the external hard disk setup.

### Hardware and OS
I was using [Raspberry Pi 1 Model B](https://www.raspberrypi.org/products/model-b/) for this setup.  
It is running Raspbian GNU/Linux 8 (jessie)

### Related
After this set up was done, I benchmarked the file IO performance, [here](raspberry-pi-benchmarking-file-io.html).