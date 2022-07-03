# Learning Scala Spark basics
## using spark shell in local
spark, scala, shell, learning, bigdata, code

### Apache Spark
[Apache Spark™](https://spark.apache.org/) is a unified analytics engine for large-scale data processing. It can be used for variety of things like, big data processing, machine learning, stream processing and etc.,

### Environment
I had tested it in Mac OS and Ubuntu. May or may not work on Windows.

#### Prerequisites
Java 8 installed and available as `java` in command line. 

### Set up
#### Download
1. [Download](https://archive.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz) the Spark package from Apache Spark [Website](https://spark.apache.org/downloads.html). Download links points to Spark 2.2.0 which i had used. You can choose latest from the website.
2. [Download](http://files.grouplens.org/datasets/movielens/ml-latest-small.zip) movies data set from [GroupLens](https://grouplens.org/datasets/movielens/). Download links point to small dataset. You can choose larger one if you have infra.

#### Unpack
Move both files to same directory.

	unzip ml-lastest-small.zip  
	tar -xvzf spark-2.2.0-bin-hadoop2.7.tgz

#### Spark Shell
Move into the spark extracted directory.

	cd spark-2.2.0-bin-hadoop2.7
	./bin/spark-shell

It will take some seconds to boot up, be patient.
Once it is up, you will be able to see,

	Spark context Web UI available at http://172.16.3.139:4040
	Spark context available as 'sc' (master = local[*], app id = local-1543057723300).
	Spark session available as 'spark'.
	Welcome to	
	  ____              __	
	 / __/__  ___ _____/ /__
	 _\ \/ _ \/ _ `/ __/  '_/
	/___/ .__/\_,_/_/ /_/\_\   version 2.2.0
	   /_/
	  
	Using Scala version 2.11.8 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_161)
	Type in expressions to have them evaluated.
	Type :help for more information.
	scala> 

You can see the `scala>` prompt. We will be entering commands in this prompt.

### Define data loading function

	def loadDF(filepath:String) : org.apache.spark.sql.DataFrame 
	= spark.read.format("com.databricks.spark.csv").option("header", "true").option("inferSchema", "true").load(filepath)

You will see following console output

	loadDF: (filepath: String)org.apache.spark.sql.DataFrame

### Load Data into Dataframe
Dataframe is similar to table in SQL world. 

	val moviesFile = "../ml-latest-small/movies.csv"
	val ratingsFile = "../ml-latest-small/ratings.csv"
	val tagsFile = "../ml-latest-small/tags.csv"

	val moviesDF = loadDF(moviesFile)

	// You can load other files into dataframe as well.

### Let's start the journey
Now we have `moviesDF` which loaded the data from `movies.csv` which we had downloaded earlier.

Refer [this](https://spark.apache.org/docs/2.2.0/api/scala/index.html#org.apache.spark.sql.Dataset) documentation for various functions available in the dataframe. 

#### Number of records
So simple, just call method `count`. As with Scala, single parentheses is optional for methods.

	moviesDF.count

It will show the number of records as follows

	res1: Long = 9742

#### Schema of the Dataframe

	moviesDF.printSchema

Output will show field names and data types.

	root
	|-- movieId: integer (nullable = true)
	|-- title: string (nullable = true)
	|-- genres: string (nullable = true)

Dataframes can support complex data types such as map, array and struct. So, it can be nested as well.

#### Show records from the data frame

	moviesDF.show

By default, it shows top 20 records in the dataframe.

	+-------+--------------------+--------------------+
	|movieId|               title|              genres|
	+-------+--------------------+--------------------+
	|      1|    Toy Story (1995)|Adventure|Animati...|
	|      2|      Jumanji (1995)|Adventure|Childre...|
	|      3|Grumpier Old Men ...|      Comedy|Romance|
	|      4|Waiting to Exhale...|Comedy|Drama|Romance|
	|      5|Father of the Bri...|              Comedy|
	|      6|         Heat (1995)|Action|Crime|Thri...|
	|      7|      Sabrina (1995)|      Comedy|Romance|
	|      8| Tom and Huck (1995)|  Adventure|Children|
	|      9| Sudden Death (1995)|              Action|
	|     10|    GoldenEye (1995)|Action|Adventure|...|
	|     11|American Presiden...|Comedy|Drama|Romance|
	|     12|Dracula: Dead and...|       Comedy|Horror|
	|     13|        Balto (1995)|Adventure|Animati...|
	|     14|        Nixon (1995)|               Drama|
	|     15|Cutthroat Island ...|Action|Adventure|...|
	|     16|       Casino (1995)|         Crime|Drama|
	|     17|Sense and Sensibi...|       Drama|Romance|
	|     18|   Four Rooms (1995)|              Comedy|
	|     19|Ace Ventura: When...|              Comedy|
	|     20|  Money Train (1995)|Action|Comedy|Cri...|
	+-------+--------------------+--------------------+
	only showing top 20 rows

Also, we can specify number of records as well.

	moviesDF.show(4)

#### Creating new dataframes
Operations such as `select` we do on dataframe creates another dataframe.

	val movieTitlesDF = moviesDF.select($"title")

$"title" means `column` title. `select` also supports `"title"` as well. But, it cannot be mix of `column` and `string`. 

Console output,

	movieTitlesDF: org.apache.spark.sql.DataFrame = [title: string]

Now we have created a new dataframe called 	`movieTitlesDF` from the `moviesDF`

	movieTitlesDF.show(3)
	+--------------------+
	|               title|
	+--------------------+
	|    Toy Story (1995)|
	|      Jumanji (1995)|
	|Grumpier Old Men ...|
	+--------------------+
	only showing top 3 rows

#### Creating new fields.
In machine learning applications, for feature engineering, we would be deriving new fields.

Creating new new Dataframe with length of movie title.

	val titleDF = movieTitlesDF.select($"title", length($"title").alias("length"))

	titleDF.show(2)
	+----------------+------+
	|           title|length|
	+----------------+------+
	|Toy Story (1995)|    16|
	|  Jumanji (1995)|    14|
	+----------------+------+
	only showing top 2 rows

#### Let us find the movie name with the longest name,

	titleDF.sort($"length".desc).head

	res2: org.apache.spark.sql.Row = [Dragon Ball Z the Movie: The World's Strongest (a.k.a. Dragon Ball Z: The Strongest Guy in The World) (Doragon bôru Z: Kono yo de ichiban tsuyoi yatsu) (1990),158]

So the movie name is `Dragon Ball Z the Movie: The World's Strongest (a.k.a. Dragon Ball Z: The Strongest Guy in The World) (Doragon bôru Z: Kono yo de ichiban tsuyoi yatsu) (1990)` which has `158` characters.

We have used `sort` and sorted the rows in dataframe using `length` in `desc` order.

#### Let's do pattern matching.
Find movies which has `(year)` in the name.

	titleDF.where($"title".rlike("[0-9]{4}")).count
	res3: Long = 9730

So, in total we have 12 movies without year in it.

#### Let's work with Array
If you have seen the `moviesDF.show` closely, `genres` is `|` separated multiple values.

First we will split the `genres` column by `|` and make it as `array<string>`

	val genresDF = moviesDF.select(split($"genres","\\|").alias("genres"))
	genresDF: org.apache.spark.sql.DataFrame = [genres: array<string>]

	genresDF.show(2)
	+--------------------+
	|              genres|
	+--------------------+
	|[Adventure, Anima...|
	|[Adventure, Child...|
	+--------------------+
	only showing top 2 rows

As you can see, genres is an array now.

#### Find out top 3 genres in our records
Next, we will explode the array and find the count of each genre.

	genresDF.select(explode($"genres").alias("genre")).groupBy($"genre").count().show(3)

	+--------+-----+
	|   genre|count|
	+--------+-----+
	|   Crime| 1199|
	| Romance| 1596|
	|Thriller| 1894|
	+--------+-----+
	only showing top 3 rows

#### Let's find top 3 movies with most tags

	val tagsDF = loadDF(tagsFile)
	tagsDF.groupBy($"movieId").count.sort($"count".desc).limit(3).
	join(moviesDF, "movieId").select("title","count").show()
	+--------------------+-----+
	|               title|count|
	+--------------------+-----+
	| Pulp Fiction (1994)|  181|
	|   Fight Club (1999)|   54|
	|2001: A Space Ody...|   41|
	+--------------------+-----+

#### That is not all
We have gone through some basic functions available in dataframes.  

* count
* printSchema
* show
* select
* length
* alias
* desc
* sort, desc
* split
* rlike
* where
* head
* groupBy

Spark dataframe supports more number of operations and functions.

### Enjoy learning Spark
Expore more and play with the dataframe. You can use `ratings.csv` as well. 

### References
1. [https://spark.apache.org/docs/2.2.0/sql-programming-guide.html](https://spark.apache.org/docs/2.2.0/sql-programming-guide.html)
2. [https://spark.apache.org/docs/2.2.0/api/scala/index.html#org.apache.spark.sql.Dataset](https://spark.apache.org/docs/2.2.0/api/scala/index.html#org.apache.spark.sql.Dataset)
