---
title: Sbt-run-support-210sbt-run-support-210_2.10;0.1-SNAPSHOT
date: '2015-04-24'
draft: false
type: blogs
se_tags:
- playframework
- sbt
- debug
- nexus
author: Sakthi Priyan H
summary: Fixing unresolved dependency in playframework.
aliases:
- /2015/04/24/sbt-run-support-210-not-found.html
---

### Unresolved dependency

I started working on one of the play framework projects in my [current company](http://crayondata.com). I faced the following issue in local.

	sakthipriyan@Sakthi-Lap:api$ sbt
	[info] Loading project definition from /home/sakthipriyan/workspace/java/api/project
	[info] Updating {file:/home/sakthipriyan/workspace/java/api/project/}api-build...
	[info] Resolving sbt-run-support-210#sbt-run-support-210_2.10;0.1-SNAPSHOT ...
	[warn] 	module not found: sbt-run-support-210#sbt-run-support-210_2.10;0.1-SNAPSHOT
	[warn] ==== typesafe-ivy-releases: tried
	[warn]   http://repo.typesafe.com/typesafe/ivy-releases/sbt-run-support-210/sbt-run-support-210_2.10/0.1-SNAPSHOT/ivys/ivy.xml
	[warn] ==== sbt-plugin-releases: tried
	[warn]   http://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/sbt-run-support-210/sbt-run-support-210_2.10/0.1-SNAPSHOT/ivys/ivy.xml
	[warn] ==== local: tried
	[warn]   /home/sakthipriyan/.ivy2/local/sbt-run-support-210/sbt-run-support-210_2.10/0.1-SNAPSHOT/ivys/ivy.xml
	[warn] ==== public: tried
	[warn]   http://repo1.maven.org/maven2/sbt-run-support-210/sbt-run-support-210_2.10/0.1-SNAPSHOT/sbt-run-support-210_2.10-0.1-SNAPSHOT.pom
	[warn] ==== Typesafe repository: tried
	[warn]   http://repo.typesafe.com/typesafe/releases/sbt-run-support-210/sbt-run-support-210_2.10/0.1-SNAPSHOT/sbt-run-support-210_2.10-0.1-SNAPSHOT.pom
	[info] Resolving org.fusesource.jansi#jansi;1.4 ...
	[warn] 	::::::::::::::::::::::::::::::::::::::::::::::
	[warn] 	::          UNRESOLVED DEPENDENCIES         ::
	[warn] 	::::::::::::::::::::::::::::::::::::::::::::::
	[warn] 	:: sbt-run-support-210#sbt-run-support-210_2.10;0.1-SNAPSHOT: not found
	[warn] 	::::::::::::::::::::::::::::::::::::::::::::::
	sbt.ResolveException: unresolved dependency: sbt-run-support-210#sbt-run-support-210_2.10;0.1-SNAPSHOT: not found
		at sbt.IvyActions$.sbt$IvyActions$$resolve(IvyActions.scala:217)
		at sbt.IvyActions$$anonfun$update$1.apply(IvyActions.scala:126)
		at sbt.IvyActions$$anonfun$update$1.apply(IvyActions.scala:125)
		at sbt.IvySbt$Module$$anonfun$withModule$1.apply(Ivy.scala:115)
		at sbt.IvySbt$Module$$anonfun$withModule$1.apply(Ivy.scala:115)
		at sbt.IvySbt$$anonfun$withIvy$1.apply(Ivy.scala:103)
		at sbt.IvySbt.sbt$IvySbt$$action$1(Ivy.scala:48)
		at sbt.IvySbt$$anon$3.call(Ivy.scala:57)
		.....
		at java.util.concurrent.FutureTask.run(FutureTask.java:166)
		at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
		at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
		at java.lang.Thread.run(Thread.java:724)
	[error] (*:update) sbt.ResolveException: unresolved dependency: sbt-run-support-210#sbt-run-support-210_2.10;0.1-SNAPSHOT: not found
	Project loading failed: (r)etry, (q)uit, (l)ast, or (i)gnore?

### Solution
Though it didn't work in local, sbt build worked seemlessly in Jenkins CI server.
So, I determined that issue is due to non availability of dependency jar.
I tried to upgrade the minor version to next one, ie., from ```2.3.5``` to ```2.3.6```, it fixed the issue and it built successfully.

### Update project/plugins.sbt
To upgrade the playframework version, update the project/plugins.sbt file.

#### Original plugins file

	sakthipriyan@Sakthi-Lap:api$ head -n4 project/plugins.sbt
	resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

	// The Play plugin
	addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.3.5")

#### Updated plugins file

	sakthipriyan@Sakthi-Lap:api$ head -n4 project/plugins.sbt
	resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

	// The Play plugin
	addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.3.6")

### Actual Issue
It seems that SNAPSHOT jar was erroneously published into public releases repository.
```Play framework 2.3.5``` had dependency of this erroneously published jar file.
Apparently people in typesafe deleted the wrongly published denpendency jar later.
This is why it worked in systems which cached deleted artifact in local.

### Better solution
Always use a [Sonatype Nexus](http://www.sonatype.org/nexus/) proxy repository between your projects and actual repositories.
This will save your build system against,

* Downtime of remote third party repo servers.
* Deletion of artifacts from remote third party repo servers.