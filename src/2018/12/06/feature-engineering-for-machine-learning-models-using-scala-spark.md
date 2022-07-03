# Feature engineering for machine learning models
## using scala spark
spark, scala, sbt, bigdata, code, machine learning

### Intro
In this post we will explore how to do feature engineering using scala spark on movielens dataset.

### Environment
Code tested using IntelliJ IDEA on Ubuntu/Mac/Windows.

#### Prerequisites
* Java 8 installed and available as `java` in command line.
* IntelliJ IDEA for editing and running the program.
* [Download](http://files.grouplens.org/datasets/movielens/ml-latest-small.zip) movies data set from [GroupLens](https://grouplens.org/datasets/movielens/).
* Git installed and available as `git` in command line. Required if you want to clone the repo from github.

### HandsOn2.scala

Following is the scala source code for `HandsOn2.scala`.
We will be writing all the new steps into the `def main(args: Array[String])` 

  import org.apache.spark.sql.{DataFrame, SparkSession}
	import org.apache.spark.sql.functions._

	object HandsOn2 {
		def main(args: Array[String]) {
			// Get Spark
			val spark = getSpark()
			import spark.implicits._

			val moviesFile = "../../../Downloads/ml-latest-small/movies.csv"
			val tagsFile = "../../../Downloads/ml-latest-small/tags.csv"
			val ratingsFile = "../../../Downloads/ml-latest-small/ratings.csv"
			val moviesDF = loadDF(spark, moviesFile)
			val tagsDF = loadDF(spark, tagsFile)
			val ratingsDF = loadDF(spark, ratingsFile)
	
			// More code goes here.
		}

		// Method to load data from csv to dataframes 
		def loadDF(spark: SparkSession, path: String): DataFrame = {
			spark.read.format("com.databricks.spark.csv")
				.option("header", "true")
				.option("inferSchema", "true")
				.load(path)
		}

		// Method to create Spark Session.
		def getSpark() = {
			val spark = SparkSession.builder
				.appName("Simple Application")
				.master("local[*]")
				.getOrCreate()
			spark.sparkContext.setLogLevel("WARN")
			spark
		}
	}

If you right click this file in IDE and run it, you can see something like this if you are able to run.

	/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/bin/java "-javaagent:/Applications/IntelliJ IDEA CE.app/Contents/lib/idea_rt.jar=59643:/Applications/IntelliJ IDEA CE.app/Contents/bin" -Dfile.encoding=UTF-8 -classpath /Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/charsets.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/deploy.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/cldrdata.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/dnsns.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/jaccess.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/jfxrt.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/localedata.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/nashorn.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/sunec.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/sunjce_provider.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/sunpkcs11.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/ext/zipfs.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/javaws.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/jce.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/jfr.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/jfxswt.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/jsse.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/management-agent.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/plugin.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/resources.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/jre/lib/rt.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/lib/ant-javafx.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/lib/dt.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/lib/javafx-mx.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/lib/jconsole.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/lib/packager.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/lib/sa-jdi.jar:/Library/Java/JavaVirtualMachines/jdk1.8.0_161.jdk/Contents/Home/lib/tools.jar:/Users/sakthipriyan/Workspace/projects/learning-spark/target/scala-2.11/classes:/Users/sakthipriyan/.ivy2/cache/aopalliance/aopalliance/jars/aopalliance-1.0.jar:/Users/sakthipriyan/.ivy2/cache/xmlenc/xmlenc/jars/xmlenc-0.52.jar:/Users/sakthipriyan/.ivy2/cache/xml-apis/xml-apis/jars/xml-apis-1.3.04.jar:/Users/sakthipriyan/.ivy2/cache/xerces/xercesImpl/jars/xercesImpl-2.9.1.jar:/Users/sakthipriyan/.ivy2/cache/oro/oro/jars/oro-2.0.8.jar:/Users/sakthipriyan/.ivy2/cache/org.xerial.snappy/snappy-java/jars/snappy-java-1.1.7.1.jar:/Users/sakthipriyan/.ivy2/cache/org.tukaani/xz/jars/xz-1.5.jar:/Users/sakthipriyan/.ivy2/cache/org.spark-project.spark/unused/jars/unused-1.0.0.jar:/Users/sakthipriyan/.ivy2/cache/org.sonatype.sisu.inject/cglib/jars/cglib-2.2.1-v20090111.jar:/Users/sakthipriyan/.ivy2/cache/org.slf4j/slf4j-log4j12/jars/slf4j-log4j12-1.7.16.jar:/Users/sakthipriyan/.ivy2/cache/org.slf4j/slf4j-api/jars/slf4j-api-1.7.25.jar:/Users/sakthipriyan/.ivy2/cache/org.slf4j/jul-to-slf4j/jars/jul-to-slf4j-1.7.16.jar:/Users/sakthipriyan/.ivy2/cache/org.slf4j/jcl-over-slf4j/jars/jcl-over-slf4j-1.7.16.jar:/Users/sakthipriyan/.ivy2/cache/org.scala-lang.modules/scala-xml_2.11/bundles/scala-xml_2.11-1.0.6.jar:/Users/sakthipriyan/.ivy2/cache/org.scala-lang.modules/scala-parser-combinators_2.11/bundles/scala-parser-combinators_2.11-1.1.0.jar:/Users/sakthipriyan/.ivy2/cache/org.scala-lang/scala-reflect/jars/scala-reflect-2.11.12.jar:/Users/sakthipriyan/.ivy2/cache/org.scala-lang/scala-library/jars/scala-library-2.11.12.jar:/Users/sakthipriyan/.ivy2/cache/org.roaringbitmap/RoaringBitmap/bundles/RoaringBitmap-0.5.11.jar:/Users/sakthipriyan/.ivy2/cache/org.objenesis/objenesis/jars/objenesis-2.5.1.jar:/Users/sakthipriyan/.ivy2/cache/org.mortbay.jetty/jetty-util/jars/jetty-util-6.1.26.jar:/Users/sakthipriyan/.ivy2/cache/org.lz4/lz4-java/jars/lz4-java-1.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.json4s/json4s-scalap_2.11/jars/json4s-scalap_2.11-3.5.3.jar:/Users/sakthipriyan/.ivy2/cache/org.json4s/json4s-jackson_2.11/jars/json4s-jackson_2.11-3.5.3.jar:/Users/sakthipriyan/.ivy2/cache/org.json4s/json4s-core_2.11/jars/json4s-core_2.11-3.5.3.jar:/Users/sakthipriyan/.ivy2/cache/org.json4s/json4s-ast_2.11/jars/json4s-ast_2.11-3.5.3.jar:/Users/sakthipriyan/.ivy2/cache/org.javassist/javassist/bundles/javassist-3.18.1-GA.jar:/Users/sakthipriyan/.ivy2/cache/org.htrace/htrace-core/jars/htrace-core-3.0.4.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.jersey.media/jersey-media-jaxb/jars/jersey-media-jaxb-2.22.2.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.jersey.core/jersey-server/jars/jersey-server-2.22.2.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.jersey.core/jersey-common/jars/jersey-common-2.22.2.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.jersey.core/jersey-client/jars/jersey-client-2.22.2.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.jersey.containers/jersey-container-servlet-core/jars/jersey-container-servlet-core-2.22.2.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.jersey.containers/jersey-container-servlet/jars/jersey-container-servlet-2.22.2.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.jersey.bundles.repackaged/jersey-guava/bundles/jersey-guava-2.22.2.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.hk2.external/javax.inject/jars/javax.inject-2.4.0-b34.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.hk2.external/aopalliance-repackaged/jars/aopalliance-repackaged-2.4.0-b34.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.hk2/osgi-resource-locator/jars/osgi-resource-locator-1.0.1.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.hk2/hk2-utils/jars/hk2-utils-2.4.0-b34.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.hk2/hk2-locator/jars/hk2-locator-2.4.0-b34.jar:/Users/sakthipriyan/.ivy2/cache/org.glassfish.hk2/hk2-api/jars/hk2-api-2.4.0-b34.jar:/Users/sakthipriyan/.ivy2/cache/org.fusesource.leveldbjni/leveldbjni-all/bundles/leveldbjni-all-1.8.jar:/Users/sakthipriyan/.ivy2/cache/org.codehaus.jettison/jettison/bundles/jettison-1.1.jar:/Users/sakthipriyan/.ivy2/cache/org.codehaus.janino/janino/jars/janino-3.0.9.jar:/Users/sakthipriyan/.ivy2/cache/org.codehaus.janino/commons-compiler/jars/commons-compiler-3.0.9.jar:/Users/sakthipriyan/.ivy2/cache/org.codehaus.jackson/jackson-xc/jars/jackson-xc-1.9.13.jar:/Users/sakthipriyan/.ivy2/cache/org.codehaus.jackson/jackson-mapper-asl/jars/jackson-mapper-asl-1.9.13.jar:/Users/sakthipriyan/.ivy2/cache/org.codehaus.jackson/jackson-jaxrs/jars/jackson-jaxrs-1.9.13.jar:/Users/sakthipriyan/.ivy2/cache/org.codehaus.jackson/jackson-core-asl/jars/jackson-core-asl-1.9.13.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.zookeeper/zookeeper/jars/zookeeper-3.4.6.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.xbean/xbean-asm6-shaded/bundles/xbean-asm6-shaded-4.8.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-unsafe_2.11/jars/spark-unsafe_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-tags_2.11/jars/spark-tags_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-sql_2.11/jars/spark-sql_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-sketch_2.11/jars/spark-sketch_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-network-shuffle_2.11/jars/spark-network-shuffle_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-network-common_2.11/jars/spark-network-common_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-launcher_2.11/jars/spark-launcher_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-kvstore_2.11/jars/spark-kvstore_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-core_2.11/jars/spark-core_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-catalyst_2.11/jars/spark-catalyst_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.parquet/parquet-jackson/jars/parquet-jackson-1.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.parquet/parquet-hadoop/jars/parquet-hadoop-1.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.parquet/parquet-format/jars/parquet-format-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.parquet/parquet-encoding/jars/parquet-encoding-1.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.parquet/parquet-common/jars/parquet-common-1.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.parquet/parquet-column/jars/parquet-column-1.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.orc/orc-shims/jars/orc-shims-1.5.2.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.orc/orc-mapreduce/jars/orc-mapreduce-1.5.2-nohive.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.orc/orc-core/jars/orc-core-1.5.2-nohive.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.ivy/ivy/jars/ivy-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.httpcomponents/httpcore/jars/httpcore-4.2.4.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.httpcomponents/httpclient/jars/httpclient-4.2.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-yarn-server-common/jars/hadoop-yarn-server-common-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-yarn-common/jars/hadoop-yarn-common-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-yarn-client/jars/hadoop-yarn-client-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-yarn-api/jars/hadoop-yarn-api-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-mapreduce-client-shuffle/jars/hadoop-mapreduce-client-shuffle-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-mapreduce-client-jobclient/jars/hadoop-mapreduce-client-jobclient-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-mapreduce-client-core/jars/hadoop-mapreduce-client-core-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-mapreduce-client-common/jars/hadoop-mapreduce-client-common-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-mapreduce-client-app/jars/hadoop-mapreduce-client-app-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-hdfs/jars/hadoop-hdfs-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-common/jars/hadoop-common-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-client/jars/hadoop-client-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-auth/jars/hadoop-auth-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.hadoop/hadoop-annotations/jars/hadoop-annotations-2.6.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.directory.server/apacheds-kerberos-codec/bundles/apacheds-kerberos-codec-2.0.0-M15.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.directory.server/apacheds-i18n/bundles/apacheds-i18n-2.0.0-M15.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.directory.api/api-util/bundles/api-util-1.0.0-M20.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.directory.api/api-asn1-api/bundles/api-asn1-api-1.0.0-M20.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.curator/curator-recipes/bundles/curator-recipes-2.6.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.curator/curator-framework/bundles/curator-framework-2.6.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.curator/curator-client/bundles/curator-client-2.6.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.commons/commons-math3/jars/commons-math3-3.4.1.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.commons/commons-lang3/jars/commons-lang3-3.5.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.commons/commons-crypto/jars/commons-crypto-1.0.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.commons/commons-compress/jars/commons-compress-1.8.1.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.avro/avro-mapred/jars/avro-mapred-1.8.2-hadoop2.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.avro/avro-ipc/jars/avro-ipc-1.8.2.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.avro/avro/jars/avro-1.8.2.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.arrow/arrow-vector/jars/arrow-vector-0.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.arrow/arrow-memory/jars/arrow-memory-0.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.arrow/arrow-format/jars/arrow-format-0.10.0.jar:/Users/sakthipriyan/.ivy2/cache/org.antlr/antlr4-runtime/jars/antlr4-runtime-4.7.jar:/Users/sakthipriyan/.ivy2/cache/net.sf.py4j/py4j/jars/py4j-0.10.7.jar:/Users/sakthipriyan/.ivy2/cache/net.razorvine/pyrolite/jars/pyrolite-4.13.jar:/Users/sakthipriyan/.ivy2/cache/log4j/log4j/bundles/log4j-1.2.17.jar:/Users/sakthipriyan/.ivy2/cache/junit/junit/jars/junit-3.8.1.jar:/Users/sakthipriyan/.ivy2/cache/joda-time/joda-time/jars/joda-time-2.9.9.jar:/Users/sakthipriyan/.ivy2/cache/jline/jline/jars/jline-0.9.94.jar:/Users/sakthipriyan/.ivy2/cache/javax.xml.stream/stax-api/jars/stax-api-1.0-2.jar:/Users/sakthipriyan/.ivy2/cache/javax.xml.bind/jaxb-api/jars/jaxb-api-2.2.2.jar:/Users/sakthipriyan/.ivy2/cache/javax.ws.rs/javax.ws.rs-api/jars/javax.ws.rs-api-2.0.1.jar:/Users/sakthipriyan/.ivy2/cache/javax.validation/validation-api/jars/validation-api-1.1.0.Final.jar:/Users/sakthipriyan/.ivy2/cache/javax.servlet/javax.servlet-api/jars/javax.servlet-api-3.1.0.jar:/Users/sakthipriyan/.ivy2/cache/javax.inject/javax.inject/jars/javax.inject-1.jar:/Users/sakthipriyan/.ivy2/cache/javax.annotation/javax.annotation-api/jars/javax.annotation-api-1.2.jar:/Users/sakthipriyan/.ivy2/cache/javax.activation/activation/jars/activation-1.1.1.jar:/Users/sakthipriyan/.ivy2/cache/io.netty/netty-all/jars/netty-all-4.1.17.Final.jar:/Users/sakthipriyan/.ivy2/cache/io.netty/netty/bundles/netty-3.9.9.Final.jar:/Users/sakthipriyan/.ivy2/cache/io.dropwizard.metrics/metrics-jvm/bundles/metrics-jvm-3.1.5.jar:/Users/sakthipriyan/.ivy2/cache/io.dropwizard.metrics/metrics-json/bundles/metrics-json-3.1.5.jar:/Users/sakthipriyan/.ivy2/cache/io.dropwizard.metrics/metrics-graphite/bundles/metrics-graphite-3.1.5.jar:/Users/sakthipriyan/.ivy2/cache/io.dropwizard.metrics/metrics-core/bundles/metrics-core-3.1.5.jar:/Users/sakthipriyan/.ivy2/cache/io.airlift/aircompressor/jars/aircompressor-0.10.jar:/Users/sakthipriyan/.ivy2/cache/commons-net/commons-net/jars/commons-net-3.1.jar:/Users/sakthipriyan/.ivy2/cache/commons-lang/commons-lang/jars/commons-lang-2.6.jar:/Users/sakthipriyan/.ivy2/cache/commons-io/commons-io/jars/commons-io-2.4.jar:/Users/sakthipriyan/.ivy2/cache/commons-httpclient/commons-httpclient/jars/commons-httpclient-3.1.jar:/Users/sakthipriyan/.ivy2/cache/commons-digester/commons-digester/jars/commons-digester-1.8.jar:/Users/sakthipriyan/.ivy2/cache/commons-configuration/commons-configuration/jars/commons-configuration-1.6.jar:/Users/sakthipriyan/.ivy2/cache/commons-collections/commons-collections/jars/commons-collections-3.2.2.jar:/Users/sakthipriyan/.ivy2/cache/commons-codec/commons-codec/jars/commons-codec-1.10.jar:/Users/sakthipriyan/.ivy2/cache/commons-cli/commons-cli/jars/commons-cli-1.2.jar:/Users/sakthipriyan/.ivy2/cache/commons-beanutils/commons-beanutils-core/jars/commons-beanutils-core-1.8.0.jar:/Users/sakthipriyan/.ivy2/cache/commons-beanutils/commons-beanutils/jars/commons-beanutils-1.7.0.jar:/Users/sakthipriyan/.ivy2/cache/com.vlkan/flatbuffers/jars/flatbuffers-1.2.0-3f79e055.jar:/Users/sakthipriyan/.ivy2/cache/com.univocity/univocity-parsers/jars/univocity-parsers-2.7.3.jar:/Users/sakthipriyan/.ivy2/cache/com.twitter/chill_2.11/jars/chill_2.11-0.9.3.jar:/Users/sakthipriyan/.ivy2/cache/com.twitter/chill-java/jars/chill-java-0.9.3.jar:/Users/sakthipriyan/.ivy2/cache/com.thoughtworks.paranamer/paranamer/bundles/paranamer-2.8.jar:/Users/sakthipriyan/.ivy2/cache/com.ning/compress-lzf/bundles/compress-lzf-1.0.3.jar:/Users/sakthipriyan/.ivy2/cache/com.google.protobuf/protobuf-java/bundles/protobuf-java-2.5.0.jar:/Users/sakthipriyan/.ivy2/cache/com.google.inject/guice/jars/guice-3.0.jar:/Users/sakthipriyan/.ivy2/cache/com.google.guava/guava/jars/guava-11.0.2.jar:/Users/sakthipriyan/.ivy2/cache/com.google.code.gson/gson/jars/gson-2.2.4.jar:/Users/sakthipriyan/.ivy2/cache/com.google.code.findbugs/jsr305/jars/jsr305-3.0.2.jar:/Users/sakthipriyan/.ivy2/cache/com.github.luben/zstd-jni/bundles/zstd-jni-1.3.2-2.jar:/Users/sakthipriyan/.ivy2/cache/com.fasterxml.jackson.module/jackson-module-scala_2.11/bundles/jackson-module-scala_2.11-2.6.7.1.jar:/Users/sakthipriyan/.ivy2/cache/com.fasterxml.jackson.module/jackson-module-paranamer/bundles/jackson-module-paranamer-2.7.9.jar:/Users/sakthipriyan/.ivy2/cache/com.fasterxml.jackson.core/jackson-databind/bundles/jackson-databind-2.6.7.1.jar:/Users/sakthipriyan/.ivy2/cache/com.fasterxml.jackson.core/jackson-core/bundles/jackson-core-2.7.9.jar:/Users/sakthipriyan/.ivy2/cache/com.fasterxml.jackson.core/jackson-annotations/bundles/jackson-annotations-2.6.7.jar:/Users/sakthipriyan/.ivy2/cache/com.esotericsoftware/minlog/bundles/minlog-1.3.0.jar:/Users/sakthipriyan/.ivy2/cache/com.esotericsoftware/kryo-shaded/bundles/kryo-shaded-4.0.2.jar:/Users/sakthipriyan/.ivy2/cache/com.clearspring.analytics/stream/jars/stream-2.7.0.jar:/Users/sakthipriyan/.ivy2/cache/com.carrotsearch/hppc/bundles/hppc-0.7.2.jar:/Users/sakthipriyan/.ivy2/cache/com.chuusai/shapeless_2.11/bundles/shapeless_2.11-2.3.2.jar:/Users/sakthipriyan/.ivy2/cache/com.github.fommil.netlib/core/jars/core-1.1.2.jar:/Users/sakthipriyan/.ivy2/cache/com.github.rwl/jtransforms/jars/jtransforms-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/net.sf.opencsv/opencsv/jars/opencsv-2.3.jar:/Users/sakthipriyan/.ivy2/cache/net.sourceforge.f2j/arpack_combined_all/jars/arpack_combined_all-0.1.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-graphx_2.11/jars/spark-graphx_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-mllib-local_2.11/jars/spark-mllib-local_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-mllib_2.11/jars/spark-mllib_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.apache.spark/spark-streaming_2.11/jars/spark-streaming_2.11-2.4.0.jar:/Users/sakthipriyan/.ivy2/cache/org.scalanlp/breeze-macros_2.11/jars/breeze-macros_2.11-0.13.2.jar:/Users/sakthipriyan/.ivy2/cache/org.scalanlp/breeze_2.11/jars/breeze_2.11-0.13.2.jar:/Users/sakthipriyan/.ivy2/cache/org.spire-math/spire-macros_2.11/jars/spire-macros_2.11-0.13.0.jar:/Users/sakthipriyan/.ivy2/cache/org.spire-math/spire_2.11/jars/spire_2.11-0.13.0.jar:/Users/sakthipriyan/.ivy2/cache/org.typelevel/machinist_2.11/jars/machinist_2.11-0.6.1.jar:/Users/sakthipriyan/.ivy2/cache/org.typelevel/macro-compat_2.11/jars/macro-compat_2.11-1.1.1.jar HandsOn2
	Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
	18/12/06 22:45:10 INFO SparkContext: Running Spark version 2.4.0
	18/12/06 22:45:10 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
	18/12/06 22:45:11 INFO SparkContext: Submitted application: Simple Application
	18/12/06 22:45:11 INFO SecurityManager: Changing view acls to: sakthipriyan
	18/12/06 22:45:11 INFO SecurityManager: Changing modify acls to: sakthipriyan
	18/12/06 22:45:11 INFO SecurityManager: Changing view acls groups to: 
	18/12/06 22:45:11 INFO SecurityManager: Changing modify acls groups to: 
	18/12/06 22:45:11 INFO SecurityManager: SecurityManager: authentication disabled; ui acls disabled; users  with view permissions: Set(sakthipriyan); groups with view permissions: Set(); users  with modify permissions: Set(sakthipriyan); groups with modify permissions: Set()
	18/12/06 22:45:11 INFO Utils: Successfully started service 'sparkDriver' on port 59646.
	18/12/06 22:45:11 INFO SparkEnv: Registering MapOutputTracker
	18/12/06 22:45:11 INFO SparkEnv: Registering BlockManagerMaster
	18/12/06 22:45:11 INFO BlockManagerMasterEndpoint: Using org.apache.spark.storage.DefaultTopologyMapper for getting topology information
	18/12/06 22:45:11 INFO BlockManagerMasterEndpoint: BlockManagerMasterEndpoint up
	18/12/06 22:45:11 INFO DiskBlockManager: Created local directory at /private/var/folders/cv/vnk7qg3n4lj1gwby6rcfk16r0000gn/T/blockmgr-b7be2feb-6fe2-4a1d-ad0d-0fb1af483b28
	18/12/06 22:45:11 INFO MemoryStore: MemoryStore started with capacity 912.3 MB
	18/12/06 22:45:11 INFO SparkEnv: Registering OutputCommitCoordinator
	18/12/06 22:45:12 INFO Utils: Successfully started service 'SparkUI' on port 4040.
	18/12/06 22:45:12 INFO SparkUI: Bound SparkUI to 0.0.0.0, and started at http://sakthis-mbp:4040
	18/12/06 22:45:12 INFO Executor: Starting executor ID driver on host localhost
	18/12/06 22:45:12 INFO Utils: Successfully started service 'org.apache.spark.network.netty.NettyBlockTransferService' on port 59647.
	18/12/06 22:45:12 INFO NettyBlockTransferService: Server created on sakthis-mbp:59647
	18/12/06 22:45:12 INFO BlockManager: Using org.apache.spark.storage.RandomBlockReplicationPolicy for block replication policy
	18/12/06 22:45:12 INFO BlockManagerMaster: Registering BlockManager BlockManagerId(driver, sakthis-mbp, 59647, None)
	18/12/06 22:45:12 INFO BlockManagerMasterEndpoint: Registering block manager sakthis-mbp:59647 with 912.3 MB RAM, BlockManagerId(driver, sakthis-mbp, 59647, None)
	18/12/06 22:45:12 INFO BlockManagerMaster: Registered BlockManager BlockManagerId(driver, sakthis-mbp, 59647, None)
	18/12/06 22:45:12 INFO BlockManager: Initialized BlockManager: BlockManagerId(driver, sakthis-mbp, 59647, None)

	Process finished with exit code 0

You can see that Process finished with `exit code 0`

### Processing Movies Dataframe

#### As is after loading into dataframe

	moviesDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- title: string (nullable = true)
	|-- genres: string (nullable = true)

	moviesDF.show(5)	
	+-------+--------------------+--------------------+
	|movieId|               title|              genres|
	+-------+--------------------+--------------------+
	|      1|    Toy Story (1995)|Adventure|Animati...|
	|      2|      Jumanji (1995)|Adventure|Childre...|
	|      3|Grumpier Old Men ...|      Comedy|Romance|
	|      4|Waiting to Exhale...|Comedy|Drama|Romance|
	|      5|Father of the Bri...|              Comedy|
	+-------+--------------------+--------------------+
	only showing top 5 rows

#### Let's fix the genres data type and derive count of genres in a movie

1. Genres is represented as string with pipe separator in source dataframe above. We had used `split` function to create `Array[String]` from String.
2. We had used `size` function to count no of genres we have for each movie.

`withColumn` will add additional columns into the dataframe.

	val moviesProcessedDF = moviesDF
		.withColumn("genres", split($"genres", "\\|"))
		.withColumn("genresCount", size($"genres"))
	
	moviesProcessedDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- title: string (nullable = true)
	|-- genres: array (nullable = true)
	|    |-- element: string (containsNull = true)
	|-- genresCount: integer (nullable = false)

	moviesProcessedDF.show(5)
	+-------+--------------------+--------------------+-----------+
	|movieId|               title|              genres|genresCount|
	+-------+--------------------+--------------------+-----------+
	|      1|    Toy Story (1995)|[Adventure, Anima...|          5|
	|      2|      Jumanji (1995)|[Adventure, Child...|          3|
	|      3|Grumpier Old Men ...|   [Comedy, Romance]|          2|
	|      4|Waiting to Exhale...|[Comedy, Drama, R...|          3|
	|      5|Father of the Bri...|            [Comedy]|          1|
	+-------+--------------------+--------------------+-----------+
	only showing top 5 rows


### Processing Tags Dataframe

#### As is after loading into dataframe
	tagsDF.printSchema()
	root
	|-- userId: integer (nullable = true)
	|-- movieId: integer (nullable = true)
	|-- tag: string (nullable = true)
	|-- timestamp: integer (nullable = true)

	tagsDF.show(5)
	+------+-------+---------------+----------+
	|userId|movieId|            tag| timestamp|
	+------+-------+---------------+----------+
	|     2|  60756|          funny|1445714994|
	|     2|  60756|Highly quotable|1445714996|
	|     2|  60756|   will ferrell|1445714992|
	|     2|  89774|   Boxing story|1445715207|
	|     2|  89774|            MMA|1445715200|
	+------+-------+---------------+----------+
	only showing top 5 rows
	
#### Let's create tags array per movie and count of tags.
1. We will group records by `movieId`, aggregate and `collect_set` of `tag`. 
2. We will just do `size` on array as we did earlier. 

We can use aggregate functions such as `avg`, `min`, `max`, `sum`, `collect_list`, `collect_set` and etc., after calling `groupBy` directly or within `agg`.

	val tagsProcessedDF = tagsDF
		.groupBy("movieId").agg(collect_set("tag").as("tags"))
		.withColumn("tagCount", size($"tags"))

	tagsProcessedDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- tags: array (nullable = true)
	|    |-- element: string (containsNull = true)
	|-- tagCount: integer (nullable = false)

	tagsProcessedDF.show(5)
	+-------+------------------+--------+
	|movieId|              tags|tagCount|
	+-------+------------------+--------+
	|    471|       [hula hoop]|       1|
	|   1088|    [music, dance]|       2|
	|   1580|          [aliens]|       1|
	|   1645|         [lawyers]|       1|
	|   1959|[adultery, Africa]|       2|
	+-------+------------------+--------+
	only showing top 5 rows

### Processing Ratings Dataframe

#### As is after loading into dataframe
	ratingsDF.printSchema()
	root
	|-- userId: integer (nullable = true)
	|-- movieId: integer (nullable = true)
	|-- rating: double (nullable = true)
	|-- timestamp: integer (nullable = true)

	ratingsDF.show(5)
	+------+-------+------+---------+
	|userId|movieId|rating|timestamp|
	+------+-------+------+---------+
	|     1|      1|   4.0|964982703|
	|     1|      3|   4.0|964981247|
	|     1|      6|   4.0|964982224|
	|     1|     47|   5.0|964983815|
	|     1|     50|   5.0|964982931|
	+------+-------+------+---------+
	only showing top 5 rows

#### Let's find average rating and number of rating for a movie
1. All we have to do is to `groupBy` `movieId`, use aggregate `agg`
2. Average `avg` on `rating` field and `count` the `rating` field. 

See the code below!

	val ratingsProcessedDF = ratingsDF
		.groupBy($"movieId")
		.agg(avg("rating").as("ratingAvg"),
			count("rating").as("ratingCount"))

	ratingsProcessedDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- ratingAvg: double (nullable = true)
	|-- ratingCount: long (nullable = false)

	ratingsProcessedDF.show(5)
	+-------+-----------------+-----------+
	|movieId|        ratingAvg|ratingCount|
	+-------+-----------------+-----------+
	|   1580|3.487878787878788|        165|
	|   2366|             3.64|         25|
	|   3175|             3.58|         75|
	|   1088|3.369047619047619|         42|
	|  32460|             4.25|          4|
	+-------+-----------------+-----------+
	only showing top 5 rows

#### Let's find average ratingAvg and ratingCount

	val row = ratingsProcessedDF.agg(avg($"ratingAvg"), avg($"ratingCount")).first
	val avgRating = row.getDouble(0)
	val avgCount = row.getDouble(1)

	println(avgRating)
	3.262448274810963

	println(avgCount)
	10.369806663924312

#### Let's classify the movies into 4 classes
Based on values of values of `avgRating` and `avgCount`, let's label/classify movies into 4 classes.

0. ratingAvg >= `avgRating` && ratingCount >= `avgCount`
1. ratingAvg >= `avgRating` && ratingCount < `avgCount`
2. ratingAvg < `avgRating` && ratingCount >= `avgCount`
3. ratingAvg <> `avgRating` && ratingCount >= `avgCount`

We will be using this label to train supervised machine learning model later on.

Used `when` cases here to create `label` as shown below.

	val moviesLabelDF = ratingsProcessedDF.select($"movieId",
		when($"ratingCount" >= avgCount && $"ratingAvg" >= avgRating, 0.0)
			.when($"ratingCount" >= avgCount && $"ratingAvg" < avgRating, 1.0)
			.when($"ratingCount" < avgCount && $"ratingAvg" >= avgRating, 2.0)
			.otherwise(3.0).as("label"))

	moviesLabelDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- label: double (nullable = false)

	moviesLabelDF.show(5)
	+-------+-----+
	|movieId|label|
	+-------+-----+
	|   1580|  0.0|
	|   2366|  0.0|
	|   3175|  0.0|
	|   1088|  0.0|
	|  32460|  2.0|
	+-------+-----+
	only showing top 5 rows

### Time to join moviesProcessedDF, tagsProcessedDF and moviesLabelDF datafarmes.
We have preprocessed 3 datasets. Let's join them.
Here we are joining all dataframes using `movieId` field.
Join is as simple as that! 

	val moviesConsolidatedDF = moviesProcessedDF
		.join(tagsProcessedDF, "movieId")
		.join(moviesLabelDF, "movieId")
  
	moviesConsolidatedDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- title: string (nullable = true)
	|-- genres: array (nullable = true)
	|    |-- element: string (containsNull = true)
	|-- genresCount: integer (nullable = false)
	|-- tags: array (nullable = true)
	|    |-- element: string (containsNull = true)
	|-- tagCount: integer (nullable = false)
	|-- label: double (nullable = false)

 	moviesConsolidatedDF.show(5)
	+-------+--------------------+--------------------+-----------+--------------------+--------+-----+
	|movieId|               title|              genres|genresCount|                tags|tagCount|label|
	+-------+--------------------+--------------------+-----------+--------------------+--------+-----+
	|      1|    Toy Story (1995)|[Adventure, Anima...|          5|        [pixar, fun]|       2|  0.0|
	|      2|      Jumanji (1995)|[Adventure, Child...|          3|[fantasy, game, m...|       4|  0.0|
	|      3|Grumpier Old Men ...|   [Comedy, Romance]|          2|        [old, moldy]|       2|  1.0|
	|      5|Father of the Bri...|            [Comedy]|          1| [pregnancy, remake]|       2|  1.0|
	|      7|      Sabrina (1995)|   [Comedy, Romance]|          2|            [remake]|       1|  1.0|
	+-------+--------------------+--------------------+-----------+--------------------+--------+-----+
	only showing top 5 rows

### Let's remove the array and make the table flat.

#### Covert Array[String] into Map[String, Double]
We will be using this `user defined function` (`udf`) to covert it.
Once we convert this into map we will be able to easily select it!

	// Create UDF converting Array[String] to Map[String, Double]
	val arrayToMap = udf[Map[String, Double], Seq[String]] {
		element => element.map { case key: String => (key, 1.0) }.toMap
	}

	// Actual usage of the udf
	val moviesMergedDF = moviesConsolidatedDF
		.withColumn("genres", arrayToMap($"genres"))
		.withColumn("tags", arrayToMap($"tags"))

	moviesMergedDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- title: string (nullable = true)
	|-- genres: map (nullable = true)
	|    |-- key: string
	|    |-- value: double (valueContainsNull = false)
	|-- genresCount: integer (nullable = false)
	|-- tags: map (nullable = true)
	|    |-- key: string
	|    |-- value: double (valueContainsNull = false)
	|-- tagCount: integer (nullable = false)
	|-- label: double (nullable = false)

	moviesMergedDF.show(5)
	+-------+--------------------+--------------------+-----------+--------------------+--------+-----+
	|movieId|               title|              genres|genresCount|                tags|tagCount|label|
	+-------+--------------------+--------------------+-----------+--------------------+--------+-----+
	|      1|    Toy Story (1995)|[Animation -> 1.0...|          5|[pixar -> 1.0, fu...|       2|  0.0|
	|      2|      Jumanji (1995)|[Adventure -> 1.0...|          3|[fantasy -> 1.0, ...|       4|  0.0|
	|      3|Grumpier Old Men ...|[Comedy -> 1.0, R...|          2|[old -> 1.0, mold...|       2|  1.0|
	|      5|Father of the Bri...|     [Comedy -> 1.0]|          1|[pregnancy -> 1.0...|       2|  1.0|
	|      7|      Sabrina (1995)|[Comedy -> 1.0, R...|          2|     [remake -> 1.0]|       1|  1.0|
	+-------+--------------------+--------------------+-----------+--------------------+--------+-----+
	only showing top 5 rows

As you can see now, we have map created from array using udf functions.

#### Create dataframe without any nesting.

	val moviesFeaturedDF = moviesMergedDF.select(
		$"movieId",
		$"title",
		$"label",
		$"genresCount".as("gCount"),
		$"tagCount".as("tCount"),
		$"genres.Drama",
		$"genres.Comedy",
		$"genres.Romance",
		$"genres.Thriller",
		$"genres.Action",
		$"genres.Adventure",
		$"genres.Crime",
		$"genres.Sci-Fi",
		$"genres.Mystery",
		$"genres.Fantasy",
		$"genres.Children",
		$"genres.Horror",
		$"genres.Animation",
		$"genres.Musical",
		$"genres.War",
		$"genres.Documentary",
		$"genres.Film-Noir",
		$"genres.IMAX",
		$"genres.Western",
		$"tags.In Netflix queue",
		$"tags.atmospheric",
		$"tags.superhero",
		$"tags.Disney",
		$"tags.religion",
		$"tags.funny",
		$"tags.quirky",
		$"tags.surreal",
		$"tags.psychology",
		$"tags.thought-provoking",
		$"tags.crime".as("tCrime"),
		$"tags.suspense",
		$"tags.politics",
		$"tags.visually appealing",
		$"tags.sci-fi".as("tSci-fi"),
		$"tags.dark comedy",
		$"tags.twist ending",
		$"tags.dark",
		$"tags.mental illness",
		$"tags.comedy".as("tComedy")
	).na.fill(0.0)

As you can see, I had used dataframe function `na.fill(0.0)` to fill zero in place of missing values.

	moviesFeaturedDF.printSchema()
	root
	|-- movieId: integer (nullable = true)
	|-- title: string (nullable = true)
	|-- label: double (nullable = false)
	|-- gCount: integer (nullable = false)
	|-- tCount: integer (nullable = false)
	|-- Drama: double (nullable = false)
	|-- Comedy: double (nullable = false)
	|-- Romance: double (nullable = false)
	|-- Thriller: double (nullable = false)
	|-- Action: double (nullable = false)
	|-- Adventure: double (nullable = false)
	|-- Crime: double (nullable = false)
	|-- Sci-Fi: double (nullable = false)
	|-- Mystery: double (nullable = false)
	|-- Fantasy: double (nullable = false)
	|-- Children: double (nullable = false)
	|-- Horror: double (nullable = false)
	|-- Animation: double (nullable = false)
	|-- Musical: double (nullable = false)
	|-- War: double (nullable = false)
	|-- Documentary: double (nullable = false)
	|-- Film-Noir: double (nullable = false)
	|-- IMAX: double (nullable = false)
	|-- Western: double (nullable = false)
	|-- In Netflix queue: double (nullable = false)
	|-- atmospheric: double (nullable = false)
	|-- superhero: double (nullable = false)
	|-- Disney: double (nullable = false)
	|-- religion: double (nullable = false)
	|-- funny: double (nullable = false)
	|-- quirky: double (nullable = false)
	|-- surreal: double (nullable = false)
	|-- psychology: double (nullable = false)
	|-- thought-provoking: double (nullable = false)
	|-- tCrime: double (nullable = false)
	|-- suspense: double (nullable = false)
	|-- politics: double (nullable = false)
	|-- visually appealing: double (nullable = false)
	|-- tSci-fi: double (nullable = false)
	|-- dark comedy: double (nullable = false)
	|-- twist ending: double (nullable = false)
	|-- dark: double (nullable = false)
	|-- mental illness: double (nullable = false)
	|-- tComedy: double (nullable = false)
	
	moviesFeaturedDF.show(5)
	+-------+--------------------+-----+------+------+-----+------+-------+--------+------+---------+-----+------+-------+-------+--------+------+---------+-------+---+-----------+---------+----+-------+----------------+-----------+---------+------+--------+-----+------+-------+----------+-----------------+------+--------+--------+------------------+-------+-----------+------------+----+--------------+-------+
	|movieId|               title|label|gCount|tCount|Drama|Comedy|Romance|Thriller|Action|Adventure|Crime|Sci-Fi|Mystery|Fantasy|Children|Horror|Animation|Musical|War|Documentary|Film-Noir|IMAX|Western|In Netflix queue|atmospheric|superhero|Disney|religion|funny|quirky|surreal|psychology|thought-provoking|tCrime|suspense|politics|visually appealing|tSci-fi|dark comedy|twist ending|dark|mental illness|tComedy|
	+-------+--------------------+-----+------+------+-----+------+-------+--------+------+---------+-----+------+-------+-------+--------+------+---------+-------+---+-----------+---------+----+-------+----------------+-----------+---------+------+--------+-----+------+-------+----------+-----------------+------+--------+--------+------------------+-------+-----------+------------+----+--------------+-------+
	|      1|    Toy Story (1995)|  0.0|     5|     2|  0.0|   1.0|    0.0|     0.0|   0.0|      1.0|  0.0|   0.0|    0.0|    1.0|     1.0|   0.0|      1.0|    0.0|0.0|        0.0|      0.0| 0.0|    0.0|             0.0|        0.0|      0.0|   0.0|     0.0|  0.0|   0.0|    0.0|       0.0|              0.0|   0.0|     0.0|     0.0|               0.0|    0.0|        0.0|         0.0| 0.0|           0.0|    0.0|
	|      2|      Jumanji (1995)|  0.0|     3|     4|  0.0|   0.0|    0.0|     0.0|   0.0|      1.0|  0.0|   0.0|    0.0|    1.0|     1.0|   0.0|      0.0|    0.0|0.0|        0.0|      0.0| 0.0|    0.0|             0.0|        0.0|      0.0|   0.0|     0.0|  0.0|   0.0|    0.0|       0.0|              0.0|   0.0|     0.0|     0.0|               0.0|    0.0|        0.0|         0.0| 0.0|           0.0|    0.0|
	|      3|Grumpier Old Men ...|  1.0|     2|     2|  0.0|   1.0|    1.0|     0.0|   0.0|      0.0|  0.0|   0.0|    0.0|    0.0|     0.0|   0.0|      0.0|    0.0|0.0|        0.0|      0.0| 0.0|    0.0|             0.0|        0.0|      0.0|   0.0|     0.0|  0.0|   0.0|    0.0|       0.0|              0.0|   0.0|     0.0|     0.0|               0.0|    0.0|        0.0|         0.0| 0.0|           0.0|    0.0|
	|      5|Father of the Bri...|  1.0|     1|     2|  0.0|   1.0|    0.0|     0.0|   0.0|      0.0|  0.0|   0.0|    0.0|    0.0|     0.0|   0.0|      0.0|    0.0|0.0|        0.0|      0.0| 0.0|    0.0|             0.0|        0.0|      0.0|   0.0|     0.0|  0.0|   0.0|    0.0|       0.0|              0.0|   0.0|     0.0|     0.0|               0.0|    0.0|        0.0|         0.0| 0.0|           0.0|    0.0|
	|      7|      Sabrina (1995)|  1.0|     2|     1|  0.0|   1.0|    1.0|     0.0|   0.0|      0.0|  0.0|   0.0|    0.0|    0.0|     0.0|   0.0|      0.0|    0.0|0.0|        0.0|      0.0| 0.0|    0.0|             0.0|        0.0|      0.0|   0.0|     0.0|  0.0|   0.0|    0.0|       0.0|              0.0|   0.0|     0.0|     0.0|               0.0|    0.0|        0.0|         0.0| 0.0|           0.0|    0.0|
	+-------+--------------------+-----+------+------+-----+------+-------+--------+------+---------+-----+------+-------+-------+--------+------+---------+-------+---+-----------+---------+----+-------+----------------+-----------+---------+------+--------+-----+------+-------+----------+-----------------+------+--------+--------+------------------+-------+-----------+------------+----+--------------+-------+
	only showing top 5 rows

### Feature Engineered dataframe ready
* We started with data in different format.
* We had standardized the input fields.
* We had derived values.
* We had merged muliple sources.
* We had created flat table.
* We had handled null values.

> Finally we have a dataframe with no nesting and all data filled up.  
> Ready to be consumed by ML models.

### Next: Machine Learning
We will be using `MultilayerPerceptronClassifier` to train on this dataset. More details to follow. Where we will be selecting features and tuning hyper parameters.

#### Updated on Dec 25, 2018
Refer [Building machine learning models using scala spark](../../../2018/12/25/building-machine-learning-models-using-scala-spark.html) for Multilayer Perceptron Classifier implementation.

### Previous: Scala Spark Basics
If you want to start on Spark, read this one, 
[https://sakthipriyan.com/2018/11/24/learning-scala-spark-basics.html](https://sakthipriyan.com/2018/11/24/learning-scala-spark-basics.html)

### Code Download
* [https://github.com/sakthipriyan/learning-spark](https://github.com/sakthipriyan/learning-spark) has full source code.

### References
1. [https://spark.apache.org/docs/2.2.0/sql-programming-guide.html](https://spark.apache.org/docs/2.2.0/sql-programming-guide.html)
2. [https://spark.apache.org/docs/2.2.0/api/scala/index.html#org.apache.spark.sql.Dataset](https://spark.apache.org/docs/2.2.0/api/scala/index.html#org.apache.spark.sql.Dataset)
