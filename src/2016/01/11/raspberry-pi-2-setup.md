# Raspberry Pi 2 setup
## from micro SD card to JDK installation.
raspberry pi, setup, java, c4rpi

### Prepare Micro SD card
This set up was done on `Ubuntu 14.04`, should work fine on most Linux systems.

1. **Micro SD Card**  
Insert the Micro SD Card into the computer.
Find the micro SD card device name and unmount it.

		df -h
		# Output line corresponding to micro SD card shown as below.
		# /dev/mmcblk0p1   31G   32K   31G   1% /media/sakthipriyan/STRONTIUM
		umount /dev/mmcblk0p1

2. **Raspbian Image**  
Now download and unpack the Raspbian Lite latest Image

		wget https://downloads.raspberrypi.org/raspbian_lite_latest
		unzip 2015-11-21-raspbian-jessie-lite.zip

3. **Lets roll it**  
Put the Raspbian image on the micro SD card.

		sudo dd bs=4M if=2015-11-21-raspbian-jessie-lite.img of=/dev/mmcblk0
		347+1 records in
		347+1 records out
		1458569216 bytes (1.5 GB) copied, 200.461 s, 7.3 MB/s
It took me `3m 20s`, please be patient.

### Boot up the Raspberry Pi
1. Insert the Micro SD card into the Raspberry Pi.
2. Connect
	* USB Keyboard
	* HDMI cable from the Monitor
	* LAN cable
3. Now connect the power supply via Micro USB cable.

### Login, configuration and Java installation.
* Use, username `pi` and password `raspberry` to login to Raspberry Pi.
* Run, `sudo raspi-config` to config the system settings like timezone, disk partitions, etc.,
* Update/upgrade the system and install Java 8

		sudo apt-get update && sudo apt-get upgrade
		sudo apt-get install oracle-java8-jdk

* By default, ssh server is enabled. Find the IP using `ifconfig` and login from any computer into this device using `ssh`.

### Running Java.
Apparently, Java 1.8.0 is available in Raspbian repository, but not the latest updates.

	# Create a Test.java file with content shown in `cat Test.java`.
	cat Test.java
	public class Test {
		public static void main(String[] args){
			System.out.println("Hello World from c4rpi");
		}
	}

	# Compile it using Java Compiler (javac)
	javac Test.java

	# Run the Test class to see the output printed to the screen.
	java Test
	Hello World from c4rpi

Once the `Hello World` program is done, you can go ahead and do some serious stuff.

### Permanent set up.
I generally use Raspberry Pi as low cost, low power 24x7 computer running in my house.  
Only following two things are connected to Raspberry Pi,

1. **Power Supply**, use quality power adapter with good quality USB cable.
2. **Network Cable**, use quality RJ45 cable to connect it to a router.

Login to Raspberry Pi via ssh from other computer and set up things to run as required.

### C4Rpi
`C4Rpi` is a simple 4 node Raspberry Pi 2 cluster, based out of [this](http://makezine.com/projects/build-a-compact-4-node-raspberry-pi-cluster/) post. Coming soon.
