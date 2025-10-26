---
title: Listing S3 Top level folders
date: '2015-12-09'
draft: false
type: blogs
se_tags:
- aws
- s3
- export
- code
- boto
- python
author: Sakthi Priyan H
summary: using simple Python code.
aliases:
- /2015/12/09/listing-s3-top-level-folders.html
---

Some time back I had to export list of top level folders in a S3 bucket.  
I used [python](https://www.python.org/) and [boto](https://github.com/boto/boto3) to do this task.  
I think following code is self explanatory.  

	from boto.s3.connection import S3Connection

	# Following 3/4 lines need to be changed to make this work.
	aws_key = 'SET AWS KEY here'
	aws_secret = 'SET AWS SECRET here'
	bucket_name = 'SET BUCKET name'
	output_file = 'folders.txt'

	conn = S3Connection(aws_key, aws_secret)
	bucket  = conn.get_bucket(bucket_name)
	folders = bucket.list("","/")
	count = 0
	with open(output_file, 'w') as outfile:
		for folder in folders:
			count += 1
			outfile.write(folder.name[:-1] + '\n')
			print '.',
	
	print('\n\n Completed. Total folders: ' + count)

Above program does two things,

* Prints `...` on system output to show progress and at the end prints count of folders in the given `bucket_name`.
* Write folder names to the `output_file` separated by `\n`.

Apparently this is an icebreaking post for me to start blogging again.  
Just started with simple one, more to follow.