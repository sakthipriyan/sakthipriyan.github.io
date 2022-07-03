# Setting up a 4 node Raspberry Pi 2 Cluster
## Setting up the right hardware.
raspberry pi, c4rpi, hardware, setup

### Intro
Earlier I [talked](/2016/01/11/raspberry-pi-2-setup.html) about, how I set up a single node Raspberry Pi.  
This is post is about setting up, a 4 node Raspberry Pi 2 cluster *aka* `C4Rpi` based on this external [post](http://makezine.com/projects/build-a-compact-4-node-raspberry-pi-cluster/).

<img class="ui fluid image"  src="/img/posts/rpi2/pic0.jpg">  

### Components
Cluster set up can be split into 3 different functionalities.

1. Each **node** consist of a Raspberry Pi with Micro SD card and enclosed in a case.  
In this cluster, we have 4 individual nodes.
2. **Network switch** to connect 4 nodes together and to provide an external link.  
Chosen network switch has 5 slots in it.
3. **Power supply** to power individual nodes as well as the network.  
Chosen power supply has 5 USB ports, 4 for powering 4 nodes and remaining 1 to power the Network switch.

This cluster has two connections to outside world.

* Power supply cable, that can be connected to the mains power supply.
* Network cable, that can be connected to LAN.

### Pictures speak more
#### 4 Raspberry Pi nodes + 1 Power Supply + 1 Network Switch
<img class="ui fluid image"  src="/img/posts/rpi2/pic1.jpg">

#### With required cables
<img class="ui fluid image"  src="/img/posts/rpi2/pic2.jpg">  
*Note*: Black wire and USB cable has to be linked.

#### Full set up with everything connected
<img class="ui fluid image"  src="/img/posts/rpi2/pic3.jpg">  

### Bill of Materials

#### Core Components
* 4 x [Raspberry Pi 2 - MODB - 1GB - Quad core](https://www.amazon.in/gp/product/B00T7EE3D0) - ₹ 2889.00
* 4 x [Strontium Nitro 32GB 70MB/s UHS-1 Class 10 microsdhc Memory card](https://www.amazon.in/gp/product/B00VMYK3DM) - ₹ 579.00
* 4 x [Raspberry pi 2 Model B/B+ ABS Glossy White Modular case](https://www.amazon.in/gp/product/B0110J9VOA) - ₹ 439.00
* **Total** = ₹ 4 x (2889.00 + 579.00 + 439.00) = ₹ 15628.00

#### Network
* 1 x [TP-Link TL-SF1005D 5-Port 10/100Mbps Desktop Switch](https://www.amazon.in/gp/product/B000FNFSPY) - ₹ 515.00
* 1 x [CNCT White 1m (3.25ft) Cat 6 Network Patch Cord](http://www.amazon.in/gp/product/B00UTRMNOK) - ₹ 114.95
* 4 x [CNCT White 1ft Cat 6 Network Patch Cord (0.3M)](https://www.amazon.in/gp/product/B00UP4SRHY) - ₹ 109.95
* **Total** = ₹ 515.00 + 114.95 + 4 x 109.95 = ₹ 1069.75

#### Power Supply
* 1 x [Anker 40W 5V / 8A 5-Port Family-Sized Desktop USB Charger](https://www.amazon.in/gp/product/B00JZHEYBK) - ₹ 2530.00
* 5 x [SToK Micro USB Charging Cable for All Android Phone- 25cm](https://www.amazon.in/gp/product/B016I5WHZG) - ₹ 72.00
* 1 x Cable to hack, a USB to barrel jack DC power supply converter - ₹ 30.00 - Bought it offline.
* **Total** = ₹ 2530.00 + 5 x 72.00 + 30.00 = ₹ 2920.00

#### Overall Cost
So, overall cost is ₹ 15628.00 + 1069.75 + 2920.00 = ₹ 19617.75 (or $ 289.63 (at $1 = ₹67.64)).  
This cost list is specific to Indian Market and based on [Amazon.in](http://amazon.in) prices as on Jan 18, 2016.  
If you are ready, for approx ₹ 20k you can set up a 4 node Raspberry Pi 2 cluster.  

###  Aesthetics
* I had chosen all components to have same colour.
* This includes, RJ45 network cable, USB cable, Raspberry Pi 2 case, Network switch and Power supply.
* But, Jack barrel pin cable that powers the network switch is still black. No alternatives found in Indian Market.
* In short, `White` everywhere, except one little piece.

### Footnote
I will write about how to set up the required software and use this cluster.

### Update on Jan 19, 2016
* Added new pictures of the setup.
* Minor edit in footnote.
