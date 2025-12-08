---
title: Raspberry Pi Benchmarking File IO
date: '2016-01-31'
draft: false
type: blogs
systems_tags:
- raspberry-pi
- ntfs
- fat
- ext
- hard-disk
- sd-card
- benchmark
author: Sakthi Priyan H
summary: using sysbench, sd card and attached external hard disk
aliases:
- /2016/01/31/raspberry-pi-benchmarking-file-io.html
---

### Set up sysbench

* Earlier I used it to benchmark the `cpu` [here](../11/raspberry-pi-2-benchmarking.html).  
* So, I used `sysbench` to benchmark the file system.  
* `sysbench` can be installed using `apt-get`

        sudo apt-get update
        sudo apt-get install sysbench

### Benchmarking cases

1. HDD - FAT32 mounted at `/mnt/storage/`
2. HDD - NTFS mounted at `/mnt/transfers/`
3. SD CARD - EXT4 mounted at `/`

### Benchmarking Preparation

1. Create directory `benchmark` in all three locations

        mkdir /mnt/storage/benchmark
        mkdir /mnt/transfers/benchmark
        mkdir ~/benchmark

2. Create required test files

        $ cd /mnt/storage/benchmark
        $ sysbench --test=fileio --file-total-size=5G prepare
        sysbench 0.4.12:  multi-threaded system evaluation benchmark

        128 files, 40960Kb each, 5120Mb total
        Creating files for the test...

3. Copy the files to other 2 locations

        cp * /mnt/transfers/benchmark/
        cp * ~/benchmark/

### Benchmark

* Change to required directory.
* Run the benchmark.
* Do this for all 3 cases.

#### Output for all cases shown below.

1. HDD - FAT32

        $ cd /mnt/storage/benchmark
        $ sysbench --test=fileio --file-total-size=5G \
        --file-test-mode=rndrw --init-rng=on \
        --max-time=300 --max-requests=0 run

        sysbench 0.4.12:  multi-threaded system evaluation benchmark

        Running the test with following options:
        Number of threads: 1
        Initializing random number generator from timer.


        Extra file open flags: 0
        128 files, 40Mb each
        5Gb total file size
        Block size 16Kb
        Number of random requests for random IO: 0
        Read/Write ratio for combined random IO test: 1.50
        Periodic FSYNC enabled, calling fsync() each 100 requests.
        Calling fsync() at the end of test, Enabled.
        Using synchronous I/O mode
        Doing random r/w test
        Threads started!
        Time limit exceeded, exiting...
        Done.

        Operations performed:  27810 Read, 18540 Write, 59264 Other = 105614 Total
        Read 434.53Mb  Written 289.69Mb  Total transferred 724.22Mb  (2.414Mb/sec)
          154.49 Requests/sec executed

        Test execution summary:
            total time:                          300.0140s
            total number of events:              46350
            total time taken by event execution: 226.9894
            per-request statistics:
                 min:                                  0.08ms
                 avg:                                  4.90ms
                 max:                                 28.78ms
                 approx.  95 percentile:              11.81ms

        Threads fairness:
            events (avg/stddev):           46350.0000/0.00
            execution time (avg/stddev):   226.9894/0.00


2. HDD - NTFS

        $ cd /mnt/transfers/benchmark
        $ sysbench --test=fileio --file-total-size=5G \
                 --file-test-mode=rndrw --init-rng=on \
                 --max-time=300 --max-requests=0 run
        sysbench 0.4.12:  multi-threaded system evaluation benchmark

        Running the test with following options:
        Number of threads: 1
        Initializing random number generator from timer.


        Extra file open flags: 0
        128 files, 40Mb each
        5Gb total file size
        Block size 16Kb
        Number of random requests for random IO: 0
        Read/Write ratio for combined random IO test: 1.50
        Periodic FSYNC enabled, calling fsync() each 100 requests.
        Calling fsync() at the end of test, Enabled.
        Using synchronous I/O mode
        Doing random r/w test
        Threads started!
        Time limit exceeded, exiting...
        Done.

        Operations performed:  20629 Read, 13752 Write, 43904 Other = 78285 Total
        Read 322.33Mb  Written 214.88Mb  Total transferred 537.2Mb  (1.7906Mb/sec)
          114.60 Requests/sec executed

        Test execution summary:
            total time:                          300.0108s
            total number of events:              34381
            total time taken by event execution: 241.7225
            per-request statistics:
                 min:                                  0.09ms
                 avg:                                  7.03ms
                 max:                                 70.43ms
                 approx.  95 percentile:              12.80ms

        Threads fairness:
            events (avg/stddev):           34381.0000/0.00
            execution time (avg/stddev):   241.7225/0.00


3. SD CARD - EXT4

        $ cd ~/benchmark
        $ sysbench --test=fileio --file-total-size=5G \
        --file-test-mode=rndrw --init-rng=on \
        --max-time=300 --max-requests=0 run
        sysbench 0.4.12:  multi-threaded system evaluation benchmark

        Running the test with following options:
        Number of threads: 1
        Initializing random number generator from timer.


        Extra file open flags: 0
        128 files, 40Mb each
        5Gb total file size
        Block size 16Kb
        Number of random requests for random IO: 0
        Read/Write ratio for combined random IO test: 1.50
        Periodic FSYNC enabled, calling fsync() each 100 requests.
        Calling fsync() at the end of test, Enabled.
        Using synchronous I/O mode
        Doing random r/w test
        Threads started!
        Time limit exceeded, exiting...
        Done.

        Operations performed:  1020 Read, 680 Write, 2122 Other = 3822 Total
        Read 15.938Mb  Written 10.625Mb  Total transferred 26.562Mb  (90.526Kb/sec)
        5.66 Requests/sec executed

        Test execution summary:
        total time:                          300.4667s
        total number of events:              1700
        total time taken by event execution: 8.3414
        per-request statistics:
             min:                                  0.10ms
             avg:                                  4.91ms
             max:                                821.14ms
             approx.  95 percentile:               2.32ms

        Threads fairness:
        events (avg/stddev):           1700.0000/0.00
        execution time (avg/stddev):   8.3414/0.00

#### Observation and notes

* HDD - FAT32(2.414Mb/sec) > HDD - NTFS(1.7906Mb/sec) >>>>> SD CARD - EXT4(90.526Kb/sec).
* So, in speed comparison,
    * HDD - FAT32 = 1.35 x HDD - NTFS
    * HDD - FAT32 = 26.67 x SD CARD - EXT4
    * HDD - NTFS = 19.77 x SD CARD - EXT4
* In short, HDD is like 20x faster than SD card.
* As in any benchmark, take this with a pinch of salt.
* I repeated each case couple of times and didn't see much deviation in the overall speed.

### Clean up

* Remove the `benchmark` folders.
* Or may be if you want empty `benchmark` folders, then run `sysbench --test=fileio cleanup` in each folder.

### Hardware and OS

* I was using [Raspberry Pi 1 Model B](https://www.raspberrypi.org/products/model-b/) for this setup.  
* It is running [Raspbian](https://www.raspbian.org/) GNU/Linux 8 (jessie)
* Internal HDD - Seagate Barracuda 7200.12, 1TB - connected via USB enclosure.
* SD Card - Transcend 16 GB SDHC Class 10