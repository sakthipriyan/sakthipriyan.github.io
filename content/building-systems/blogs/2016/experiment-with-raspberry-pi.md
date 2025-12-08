---
title: Experiment with Raspberry Pi
date: '2016-01-05'
draft: false
type: blogs
systems_tags:
- raspberry-pi
- tweetbot
- kuralbot
- powerbot
- downloader
- youtube
- torrent
- python
author: Sakthi Priyan H
summary: How I turned it to a electricity monitor, tweetbot and downloader.
aliases:
- /2016/01/05/experiment-with-raspberry-pi.html
---

### Beginning
I read about Raspberry Pi first in early Q4, 2012.
At that time, I didn't find a real need to use it.
Few weeks later I was totally fed up with the power cuts in my hometown.
Worse, I couldn't figure out if the situation is improving or not.
So, I needed a mechanism to systematically record the power ON/OFF data, so that it can be analysed.
I decided to use Raspberry Pi for this and so began my journey with Raspberry Pi.  
This post is primarily on various **usage of Raspberry Pi** after buying it.

### Set up
In *Cost Analysis* section below, I had listed all components used to set up the Raspberry Pi.  
In addition to that, a HDMI monitor and a HDMI cable was required to boot it up first time and to set up ssh server.
I had connected Raspberry Pi power supply to an UPS which was connected to an inverter, to run without any power interruption.

### Tweetbot
I used [Python](https://www.python.org/) and [Twython](https://twython.readthedocs.org/en/latest/) to turn the Raspberry Pi into a Tweetbot.

#### Powerbot

Primary goal of Powerbot project is to record power cuts, analyse it and publish it online.  
To be fair, [Powerbot](https://twitter.com/powerbot_tn) requires a long detailed blog post.

In short,

* It started from Electrical wiring,
    * Used direct power supply line to read the status.
    * Back up power supply line to run the Raspberry Pi without power interruption.
* I had assembled a small Electronic board,
    * Which uses a LDR to read the LED light which is powered by direct power supply.
    * It is connected to GPIO pins of Raspberry Pi.
* And a little bit software,
    * I had designed and created a Python script to read the GPIO pin status.
    * It will publish the power change status to twitter.
    * Also, it calculated average ON time over different time periods. Say, last week, month, etc.,

Once the power situation improved, I ignored the Powerbot. It is running erratically past few months.  

#### Kuralbot
The [Tirukkural](https://en.wikipedia.org/wiki/Tirukku%E1%B9%9Ba%E1%B8%B7) is a classic [Tamil](https://en.wikipedia.org/wiki/Tamil_language) [sangam literature](https://en.wikipedia.org/wiki/Sangam_literature) consisting of 1330 couplets or [Kurals](https://en.wikipedia.org/wiki/Kural).  
Initially, I planned to build an Android Widget. But, decided to make a tweetbot.  
I wrote an [Tirukkural Tweetbot](https://github.com/sakthipriyan/tirukkural) in Python, which tweeted from the Raspberry Pi.  
Due to Internet connectivity issue, I had migrated this one to a cloud instance few months back.  
See the Twitter time line of [Tirukkural Tamil](https://twitter.com/kural_ta) or [Tirukkural English](https://twitter.com/kural_en) and follow it.

### Downloader
Since, my Raspberry Pi is running 24 x 7, without any power interruption, it  became my low cost downloader box.

#### Torrent downloader
Torrent is the most popular distributed download mechanism available. [Transmission](http://www.transmissionbt.com/) bit torrent client can be set up on Raspberry Pi. Three steps to set up and use Transmission BT,

1. Install Transmission bt on Raspberry Pi.
2. Configure the username/password and IP restrictions.
3. Access the Transmission bt web console from your laptop/desktop/mobile/tablet or even another Raspberry Pi on the same network.

For me it is at `http://192.168.0.2:9091/transmission/web/`

#### Youtube downloader
[youtube-dl](https://rg3.github.io/youtube-dl/) is a command line utility to download videos from variety of video platforms like Youtube.

    # download the video as mp4
    youtube-dl 'https://www.youtube.com/watch?v=Zc54gFhdpLA'

Above command will store the video in the given link to `Zc54gFhdpLA.mp4` file.  
Really helpful, if you are planning to have offline access to specific videos.  
Before downloading any video content, please verify the terms and conditions of the video publisher and the video platform.

#### Wget downloader
[wget](https://www.gnu.org/software/wget/) is a simple utility to download specific URLs.

    # download the page and store it
    wget 'http://sakthipriyan.com' -qO index.html

Above command will download the given URL and store it in a `index.html` file.  
Useful, if you are downloading a large file with slower download speed.

### Cost Analysis
Let me break the cost part into Capital cost and Operating cost.

#### Capital cost
I had bought these components by end of Dec 2012.

Component                               | Cost  
:-------------------------------------- | ---------:  
Raspberry Pi - Model B - 512 MB Ram     | ₹ 3699.00  
Raspberry Pi Case                       | ₹  274.00  
Samsung ATADU10IBECINU Battery Charger  | ₹  270.00  
USB Flexible Foldable Keyboard          | ₹  275.00  
**Total**                               | ₹ 4518.00  

#### Components Notes
* I used a 16GB class 10 SD card and a RJ45 cable which I had as spare.
* Since I was using PS2 Keyboard back then, had to buy an USB one.

#### Operating cost
* I am using a 5v, 700mA Samsung charger to power the Raspberry Pi.
* It consumes about 5Wh of Power. It consumes 1 unit (1000Wh) over 200 hours.
* Last electricity bill, we were charged ₹ 2.52 per unit.
* Say, approx 720 hours per month. So, running cost is ₹ 9.07 per month.

#### Overall cost
* Running cost for past 3 years is ₹ 9.07 * 36 = ₹ 326.52 or $4.91 (at $1 = ₹66.53).
* Overall cost for past 3 years is ₹ 4518 + ₹ 326.52 = ₹ 4844.52
* Overall cost per month over 3 years is ₹ 4844.52 / 36 = ₹ 134.57 ($2.02)
* Overall cost will come down as long as Raspberry Pi continues to work.
* If it works for five years without failure, overall cost per month will be ₹ 84.37 ($1.27)

### Footnote
Overall awesome experience with Raspberry Pi, especially cost and reliability part.  
Currently I am building a 4 node Raspberry Pi 2 cluster, in short I am calling it `C4Rpi`.

### Next
I will be writing about `C4Rpi` once it is done.