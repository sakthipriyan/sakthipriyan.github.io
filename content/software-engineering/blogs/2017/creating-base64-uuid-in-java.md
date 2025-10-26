---
title: Creating Base64 UUID in Java
date: '2017-04-02'
draft: false
type: blogs
se_tags:
- uuid
- java
- code
- base64
author: Sakthi Priyan H
summary: Alphanumeric unique id using base64 charset
aliases:
- /2017/04/02/creating-base64-uuid-in-java.html
---

### Intro
In the era of APIs, each resource is identified by unique id. [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) can be used to generate unique id in distributed systems. This article explains how to create base64 unique id based on random UUID.

### Generating base64 unique id.
1. First generate `UUID` using `java.util.UUID.randomUUID()`
2. Internally uuid is represented as two long integers (2 long = 128 bits) which can be accessed by `uuid.getMostSignificantBits()`(MSB) and `uuid.getLeastSignificantBits()` (LSB).
3. Using `ByteBuffer` create `byte[]` from MSB and LSB.
4. Using `UrlEncoder` of `Base64` convert `byte[]` to base64 `String`.
5. Using `substring` remove the trailing padding `==`.
6. Now, we have base64 string which represents the UUID generated in Step 1.

### Code
Following Java code written as spring component. It should be straight forward to use it in other places as well. `java.util.Base64` requires `Java 8`.

	package com.sakthipriyan.example;

	import java.nio.ByteBuffer;
	import java.util.Base64;
	import java.util.Base64.Encoder;
	import java.util.UUID;

	import org.springframework.stereotype.Component;

	@Component
	public class Uuid {

	    private final Encoder encoder;

	    public Uuid() {
	        this.encoder = Base64.getUrlEncoder();
	    }

	    public String randomId() {

	        // Create random UUID
	        UUID uuid = UUID.randomUUID();

	        // Create byte[] for base64 from uuid
	        byte[] src = ByteBuffer.wrap(new byte[16])
	        		.putLong(uuid.getMostSignificantBits())
	                .putLong(uuid.getLeastSignificantBits())
	                .array();

	        // Encode to Base64 and remove trailing ==
	        return encoder.encodeToString(src).substring(0, 22);
	    }

	}


### Usage

	package com.sakthipriyan.example;

	@Service
	public class ExampleService {

		@Autowired
		private Uuid uuid;

		public void doSomething(){
			String uniqueId = uuid.randomId();
			// Do whatever you want to do.
		}
	}


### Generated IDs
Base64 IDs generating using `uuid.randomId()`

`Ah2_xI48RWSGwGDcNfbcGQ`  
`eLQuFAB1QRyWY_DHYxUX4Q`  
`oUSCSgEEQCqw1wlGT_kiSw`  
`R_0tJRgqQDGGVT4kXFli_A`  
`SqrVhuCsQlmoiiIn5Pgpiw`  
`FMiXuPLFQwu7yINCqBt-yQ`  
`UQk9E_8ZSaufMhe33Yh6CA`  
`Uj8RweXQRh-Lj5J0CrI5Vw`  
`d8bkw3SeStW-nS7SFMUV4A`  
`-1b351PDTyqaVQ8OhsrAyQ`  


### 40% size reduced.
* Hexadecimal uuid `f487fbcf-3606-4f35-a23d-5ac3af6de754` generated using `UUID.randomUUID().toString()` has 36 bytes including the `-`.  
* Base64 uuid `9If7zzYGTzWiPVrDr23nVA` generated using `uuid.randomId()` has only 22 bytes.  
* By using this we can save around 40% of network bytes and storage bytes for unique id.