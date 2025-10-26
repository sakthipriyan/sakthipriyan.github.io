---
title: Raspberry Pi 2 benchmarking
date: '2016-01-11'
draft: false
type: blogs
se_tags:
- raspberry-pi
- benchmark
- java
- sysbench
- code
- fibonacci
author: Sakthi Priyan H
summary: using sysbench and Java
aliases:
- /2016/01/11/raspberry-pi-2-benchmarking.html
---

### Benchmarking
Benchmarking is done on three computers using `sysbench` and `Fibonacci sequence` program in `Java`.

1. **Raspberry Pi**  
Single core 700MHz, 512MB RAM
2. **Raspberry Pi 2**  
Quad core 900MHz, 1GB RAM
3. **Laptop running Ubuntu 14.04**  
Quad core 2.50GHz, 16GB RAM

### Benchmarking using sysbench
Install sysbench using `sudo apt-get install sysbench`

#### Single threaded benchmark

1. **Raspberry Pi**

		$ sysbench --test=cpu --cpu-max-prime=2000 run --num-threads=1

		sysbench 0.4.12:  multi-threaded system evaluation benchmark

		Running the test with following options:
		Number of threads: 1

		Doing CPU performance benchmark

		Threads started!
		Done.

		Maximum prime number checked in CPU test: 2000


		Test execution summary:
		    total time:                          64.2297s
		    total number of events:              10000
		    total time taken by event execution: 64.1675
		    per-request statistics:
		         min:                                  5.34ms
		         avg:                                  6.42ms
		         max:                                 30.93ms
		         approx.  95 percentile:              15.46ms

		Threads fairness:
		    events (avg/stddev):           10000.0000/0.00
		    execution time (avg/stddev):   64.1675/0.00

2. **Raspberry Pi 2**

		$ sysbench --test=cpu --cpu-max-prime=2000 run --num-threads=1

		sysbench 0.4.12:  multi-threaded system evaluation benchmark

		Running the test with following options:
		Number of threads: 1

		Doing CPU performance benchmark

		Threads started!
		Done.

		Maximum prime number checked in CPU test: 2000


		Test execution summary:
		    total time:                          31.0586s
		    total number of events:              10000
		    total time taken by event execution: 31.0443
		    per-request statistics:
		         min:                                  3.08ms
		         avg:                                  3.10ms
		         max:                                  4.94ms
		         approx.  95 percentile:               3.11ms

		Threads fairness:
		    events (avg/stddev):           10000.0000/0.00
		    execution time (avg/stddev):   31.0443/0.00

3. **Laptop running Ubuntu 14.04**

		$ sysbench --test=cpu --cpu-max-prime=2000 run --num-threads=1

		sysbench 0.4.12:  multi-threaded system evaluation benchmark

		Running the test with following options:
		Number of threads: 1

		Doing CPU performance benchmark

		Threads started!

		Done.

		Maximum prime number checked in CPU test: 2000


		Test execution summary:
		    total time:                          1.1415s
		    total number of events:              10000
		    total time taken by event execution: 1.1407
		    per-request statistics:
		         min:                                  0.11ms
		         avg:                                  0.11ms
		         max:                                  0.49ms
		         approx.  95 percentile:               0.12ms

		Threads fairness:
		    events (avg/stddev):           10000.0000/0.00
		    execution time (avg/stddev):   1.1407/0.00

#### Multi-threaded benchmark

1. **Raspberry Pi**  
	Oh No!, it has only one CPU.  
	No use in running with more threads.  

2. **Raspberry Pi 2**  

		$ sysbench --test=cpu --cpu-max-prime=20000 run --num-threads=4

		sysbench 0.4.12:  multi-threaded system evaluation benchmark

		Running the test with following options:
		Number of threads: 4

		Doing CPU performance benchmark

		Threads started!
		Done.

		Maximum prime number checked in CPU test: 20000


		Test execution summary:
		    total time:                          190.8656s
		    total number of events:              10000
		    total time taken by event execution: 763.3344
		    per-request statistics:
		         min:                                 75.89ms
		         avg:                                 76.33ms
		         max:                                 92.81ms
		         approx.  95 percentile:              76.91ms

		Threads fairness:
		    events (avg/stddev):           2500.0000/13.00
		    execution time (avg/stddev):   190.8336/0.02


3. **Laptop running Ubuntu 14.04**  

		$ sysbench --test=cpu --cpu-max-prime=20000 run --num-threads=4

		sysbench 0.4.12:  multi-threaded system evaluation benchmark

		Running the test with following options:
		Number of threads: 4

		Doing CPU performance benchmark

		Threads started!
		Done.

		Maximum prime number checked in CPU test: 20000


		Test execution summary:
		    total time:                          8.4443s
		    total number of events:              10000
		    total time taken by event execution: 33.7718
		    per-request statistics:
		         min:                                  2.90ms
		         avg:                                  3.38ms
		         max:                                 11.35ms
		         approx.  95 percentile:               3.40ms

		Threads fairness:
		    events (avg/stddev):           2500.0000/13.75
		    execution time (avg/stddev):   8.4429/0.00

### Benchmarking using Java
*Note:* See [Raspberry Pi 2 setup](raspberry-pi-2-setup.html) to install `Java`.  
Fibonacci Class shown below is used to benchmark.

	public class Fibonacci {
		public static void main(String[] args){
			Fibonacci fib = new Fibonacci();
			Long out = fib.fib(Long.parseLong(args[0]));
			System.out.println(out);
		}

		public long fib(long n){
			if(n==0L){
				return 0L;
			} else if(n==1L){
				return 1L;
			} else {
				return fib(n-1) + fib(n-2);
			}
		}
	}


1. **Raspberry Pi**  

		$ time java Fibonacci 10
		55

		real	0m1.644s
		user	0m1.350s
		sys	0m0.200s

		$ time java Fibonacci 20
		6765

		real	0m2.118s
		user	0m1.460s
		sys	0m0.110s

		$ time java Fibonacci 30
		832040

		real	0m1.945s
		user	0m1.580s
		sys	0m0.120s

		$ time java Fibonacci 40
		102334155

		real	0m20.991s
		user	0m18.160s
		sys	0m0.200s


2. **Raspberry Pi 2**  

		$ time java Fibonacci 10
		55

		real	0m0.535s
		user	0m0.560s
		sys	0m0.040s

		$ time java Fibonacci 20
		6765

		real	0m0.529s
		user	0m0.500s
		sys	0m0.100s

		$ time java Fibonacci 30
		832040

		real	0m0.575s
		user	0m0.570s
		sys	0m0.070s

		$ time java Fibonacci 40
		102334155

		real	0m10.035s
		user	0m10.030s
		sys	0m0.070s

3. **Laptop running Ubuntu 14.04**  

		$ time java Fibonacci 10
		55

		real	0m0.077s
		user	0m0.074s
		sys	0m0.012s

		$ time java Fibonacci 20
		6765

		real	0m0.123s
		user	0m0.073s
		sys	0m0.025s

		$ time java Fibonacci 30
		832040

		real	0m0.091s
		user	0m0.078s
		sys	0m0.023s

		$ time java Fibonacci 40
		102334155

		real	0m0.890s
		user	0m0.898s
		sys	0m0.004s

### Conclusion
In one line, Raspberry Pi 2 is much faster than the Raspberry Pi, still it is many folds slower than the traditional laptop/desktop processors.  
I think, If you are looking for 24x7 low cost computer, this is the one.  
Beside, you can do lot of experiments with it, that cannot be done with laptop/desktop easily.