# Building machine learning models
## using scala spark
spark, scala, sbt, bigdata, code, machine learning

### Intro
This is continuation with the previous posts,

* [Learning Scala Spark basics](../../../2018/11/24/learning-scala-spark-basics.html)
* [Feature engineering for machine learning models](../../../2018/12/06/feature-engineering-for-machine-learning-models-using-scala-spark.html) 

> You need to complete [Feature engineering for machine learning models](../../../2018/12/06/feature-engineering-for-machine-learning-models-using-scala-spark.html) before proceeding.

### HandsOn2.scala
This is the file used in previous post, where, at the end we had single feature engineered DataFrame.

At the end we will add storeDF method

    def storeDF(dataFrame: DataFrame, path: String) = {
      dataFrame.write.option("header", "true").csv(path)
    }

In the main method, we will store the moviesFeaturedDF at the end.

    val moviesFeaturedFile = "../../../Downloads/ml-latest-small/movies-featured.csv"
    storeDF(moviesFeaturedDF.repartition(1), moviesFeaturedFile)

We are repartitioning it so that it is stored as a single file. We shouldn't do this in most of the cases.

### Let's inspect the output

    $ ls -lh ../../../Downloads/ml-latest-small/movies-featured.csv
    total 600
    -rw-r--r--  1 sakthipriyan  staff     0B Dec 25 12:19 _SUCCESS
    -rw-r--r--  1 sakthipriyan  staff   298K Dec 25 12:19 part-00000-538b57a1-58c0-4801-9258-fbd806151d80-c000.csv

    $ head ../../../Downloads/ml-latest-small/movies-featured.csv/part-00000-538b57a1-58c0-4801-9258-fbd806151d80-c000.csv
    movieId,title,label,gCount,tCount,Drama,Comedy,Romance,Thriller,Action,Adventure,Crime,Sci-Fi,Mystery,Fantasy,Children,Horror,Animation,Musical,War,Documentary,Film-Noir,IMAX,Western,In Netflix queue,atmospheric,superhero,Disney,religion,funny,quirky,surreal,psychology,thought-provoking,tCrime,suspense,politics,visually appealing,tSci-fi,dark comedy,twist ending,dark,mental illness,tComedy
    1,Toy Story (1995),0.0,5,2,0.0,1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    2,Jumanji (1995),0.0,3,4,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    3,Grumpier Old Men (1995),1.0,2,2,0.0,1.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    5,Father of the Bride Part II (1995),1.0,1,2,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    7,Sabrina (1995),1.0,2,1,0.0,1.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    11,"American President, The (1995)",0.0,3,2,1.0,1.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    14,Nixon (1995),0.0,1,2,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    16,Casino (1995),0.0,2,1,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
    17,Sense and Sensibility (1995),0.0,2,1,1.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0

As you can see, the `moviesFeaturedFile` is written as CSV file in the output.  
Without repartition, it might have been multiple files as output.

### HandsOn3.scala

Let's move on to the building the machine learning models now.

Following is the scala source code for `HandsOn3.scala`.  
We will be writing all the new steps into the `def main(args: Array[String])` 

    import org.apache.spark.sql.{DataFrame, SparkSession}
    import org.apache.spark.sql.functions._

    object HandsOn3 {
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

      def main(args: Array[String]) {
        // Get Spark
        val spark = getSpark()
        val moviesFeaturedFile = "../../../Downloads/ml-latest-small/movies-featured.csv"
        val moviesFeaturedDF = loadDF(spark,moviesFeaturedFile)

        // More code goes here.
      }
    }

### Train and Test DataFrames

#### moviesFeaturedDF
Which will be used for training and testing the model.

**Schema**

    moviesFeaturedDF.printSchema()
    root
    |-- movieId: integer (nullable = true)
    |-- title: string (nullable = true)
    |-- label: double (nullable = true)
    |-- gCount: integer (nullable = true)
    |-- tCount: integer (nullable = true)
    |-- Drama: double (nullable = true)
    |-- Comedy: double (nullable = true)
    |-- Romance: double (nullable = true)
    |-- Thriller: double (nullable = true)
    |-- Action: double (nullable = true)
    |-- Adventure: double (nullable = true)
    |-- Crime: double (nullable = true)
    |-- Sci-Fi: double (nullable = true)
    |-- Mystery: double (nullable = true)
    |-- Fantasy: double (nullable = true)
    |-- Children: double (nullable = true)
    |-- Horror: double (nullable = true)
    |-- Animation: double (nullable = true)
    |-- Musical: double (nullable = true)
    |-- War: double (nullable = true)
    |-- Documentary: double (nullable = true)
    |-- Film-Noir: double (nullable = true)
    |-- IMAX: double (nullable = true)
    |-- Western: double (nullable = true)
    |-- In Netflix queue: double (nullable = true)
    |-- atmospheric: double (nullable = true)
    |-- superhero: double (nullable = true)
    |-- Disney: double (nullable = true)
    |-- religion: double (nullable = true)
    |-- funny: double (nullable = true)
    |-- quirky: double (nullable = true)
    |-- surreal: double (nullable = true)
    |-- psychology: double (nullable = true)
    |-- thought-provoking: double (nullable = true)
    |-- tCrime: double (nullable = true)
    |-- suspense: double (nullable = true)
    |-- politics: double (nullable = true)
    |-- visually appealing: double (nullable = true)
    |-- tSci-fi: double (nullable = true)
    |-- dark comedy: double (nullable = true)
    |-- twist ending: double (nullable = true)
    |-- dark: double (nullable = true)
    |-- mental illness: double (nullable = true)
    |-- tComedy: double (nullable = true)

**Sample Data**

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

#### Let's create train and test

    def trainAndTest(df:DataFrame, features: Array[String]): (DataFrame,DataFrame) = {
    
      // Data Transformation
      val assembler = new VectorAssembler().setInputCols(features).setOutputCol("features")

      // Only movieId, features, label selected here.
      val data = assembler.transform(df).select("movieId","features","label")

      // Split the data into train and test
      val splits = data.randomSplit(Array(0.8, 0.2), seed = 1234L)
      val train = splits(0)
      val test = splits(1)

      // Return train and test as Tuple
      (train,test)
    }

* We will use [VectorAssembler](https://spark.apache.org/docs/2.2.0/ml-features.html#vectorassembler) to transform the input as required by most Machine Learning models in Spark.
* We will use `data.randomSplit` to split input dataFrame into train and test.

#### In main method

    val features = Array("gCount","tCount", "Drama")
    val (train,test) = trainAndTest(moviesFeaturedDF, features)

* List of features used for training the model.
* In this case, I had picked `gCount`, `tCount` and `Drama`


### Machine Learning Model
We will go through [Multilayer perceptron classifier](https://spark.apache.org/docs/2.2.0/ml-classification-regression.html#multilayer-perceptron-classifier) machine learning models as part of this post.

#### Multilayer perceptron classifier (MLPC)
Multilayer perceptron classifier (MLPC) is a classifier based on the [feedforward artificial neural network](https://en.wikipedia.org/wiki/Feedforward_neural_network).

#### Train MLPC model using given features and train DataFrame

    def trainMLPC(train:DataFrame, features: Array[String]) : MultilayerPerceptronClassificationModel = {

      // Setting up Hyper Parameters. Specify layers for the neural network:
      // Input layer of size (features.length), 
      // Two intermediate layers of size (features.length + 2) and (features.length + 1)
      // Output of size 4 (classes)
      val layers = Array[Int](features.length, features.length + 2, features.length + 1, 4)

      // create the trainer and set its parameters
      val trainer = new MultilayerPerceptronClassifier()
        .setLabelCol("label")
        .setFeaturesCol("features")
        .setLayers(layers)
        .setBlockSize(128)
        .setSeed(1234L)
        .setMaxIter(100)
        
      // This would train the MultilayerPerceptronClassifier for the given data and hyper parameters.
      trainer.fit(train)
    }

* In the `layers` we can change the intermediate hidden layers
* Next we have to invoke this one in main.

#### Train MLPC using train dataset and selected features 

In the main, add following.

    val mlpcModel =  trainMLPC(train,features)

#### Let's test the model for accuracy.

    // Here, we apply the MLPC model built using train data on the test dataset.
    val resultMLPC = mlpcModel.transform(test)

    // This method detailed below will print the accuracy of the model on the test data.
    printAccuracy(resultMLPC)

Following is the `printAccuracy` that will print the accuracy of the model by comparing the actual vs predicted class.

    def printAccuracy(dataFrame: DataFrame, features: Array[String]): Unit = {
      val predictionAndLabels = dataFrame.select("prediction", "label")
      val evaluator = new MulticlassClassificationEvaluator().setMetricName("accuracy")
      println("Accuracy = " +
        s"${(100 * evaluator.evaluate(predictionAndLabels)).formatted("%.2f")}%" +
        s" Features: ${features.mkString(", ")}. ")
    }

#### Full main method

    def main(args: Array[String]): Unit = {
      
      // Init spark and load dataframe
      val spark = getSpark()
      val moviesFeaturedFile = "../../../Downloads/ml-latest-small/movies-featured.csv"
      val moviesFeaturedDF = loadDF(spark,moviesFeaturedFile)

      // Select features and create train and test dataFrames
      val features = Array("gCount","tCount", "Drama")
      val (train,test) = trainAndTest(moviesFeaturedDF, features)

      // Train Model using train data for the selected features.
      val mlpcModel =  trainMLPC(train,features)

      // Apply trained model on the test and predict the class.
      val resultMLPC = mlpcModel.transform(test)
      
      // Print the accuracy of the model.
      printAccuracy(resultMLPC, features)
    }

#### Automated run using various combinations of the features

In this function, all subset of the given features are derived and empty set is filtered out.

    def getFeatures(features: Array[String]): List[Array[String]] = {
      features.toSet.subsets().toList.filter(set => set.size > 0).map(set => set.toArray)
    }

Updated main method with iterations.

    def main(args: Array[String]): Unit = {
      // Init spark and load dataFrame
      val spark = getSpark()
      val moviesFeaturedFile = "../../../Downloads/ml-latest-small/movies-featured.csv"
      val moviesFeaturedDF = loadDF(spark,moviesFeaturedFile)

      // Select set of features
      val featuresArray = Array("gCount", "tCount", "Drama", "Comedy", "Romance", "Thriller", "Action")

      for (features <- getFeatures(featuresArray)) {

        val (train,test) = trainAndTest(moviesFeaturedDF, features)

        // Train Model using train data for the selected features.
        val mlpcModel =  trainMLPC(train,features)

        // Apply trained model on the test and predict the class.
        val resultMLPC = mlpcModel.transform(test)

        // Print the accuracy of the model.
        printAccuracy(resultMLPC, features)
      }
    }

#### Iterations
Output of the above program with given set of features.

    Accuracy = 38.46% Features: Thriller. 
    Accuracy = 45.79% Features: tCount. 
    Accuracy = 40.29% Features: Comedy. 
    Accuracy = 47.25% Features: Romance. 
    Accuracy = 47.25% Features: Drama. 
    Accuracy = 47.25% Features: gCount. 
    Accuracy = 40.29% Features: Action. 
    Accuracy = 45.79% Features: Thriller, tCount. 
    Accuracy = 39.56% Features: Thriller, Comedy. 
    Accuracy = 41.39% Features: Thriller, Romance. 
    Accuracy = 43.22% Features: Thriller, Drama. 
    Accuracy = 49.08% Features: Thriller, gCount. 
    Accuracy = 42.12% Features: Thriller, Action. 
    Accuracy = 48.72% Features: tCount, Comedy. 
    Accuracy = 46.15% Features: tCount, Romance. 
    Accuracy = 43.96% Features: tCount, Drama. 
    Accuracy = 53.85% Features: tCount, gCount. 
    Accuracy = 50.92% Features: tCount, Action. 
    Accuracy = 42.12% Features: Comedy, Romance. 
    Accuracy = 42.49% Features: Comedy, Drama. 
    Accuracy = 51.28% Features: Comedy, gCount. 
    Accuracy = 46.52% Features: Comedy, Action. 
    Accuracy = 41.76% Features: Romance, Drama. 
    Accuracy = 45.79% Features: Romance, gCount. 
    Accuracy = 40.29% Features: Romance, Action. 
    Accuracy = 49.45% Features: Drama, gCount. 
    Accuracy = 41.76% Features: Drama, Action. 
    Accuracy = 46.15% Features: gCount, Action. 
    Accuracy = 50.92% Features: Thriller, tCount, Comedy. 
    Accuracy = 43.96% Features: Thriller, tCount, Romance. 
    Accuracy = 46.52% Features: Thriller, tCount, Drama. 
    Accuracy = 54.58% Features: Thriller, tCount, gCount. 
    Accuracy = 51.28% Features: Thriller, tCount, Action. 
    Accuracy = 40.29% Features: Thriller, Comedy, Romance. 
    Accuracy = 39.19% Features: Thriller, Comedy, Drama. 
    Accuracy = 50.92% Features: Thriller, Comedy, gCount. 
    Accuracy = 48.35% Features: Thriller, Comedy, Action. 
    Accuracy = 41.39% Features: Thriller, Romance, Drama. 
    Accuracy = 49.82% Features: Thriller, Romance, gCount. 
    Accuracy = 42.12% Features: Thriller, Romance, Action. 
    Accuracy = 50.18% Features: Thriller, Drama, gCount. 
    Accuracy = 40.29% Features: Thriller, Drama, Action. 
    Accuracy = 50.55% Features: Thriller, gCount, Action. 
    Accuracy = 48.72% Features: tCount, Comedy, Romance. 
    Accuracy = 46.52% Features: tCount, Comedy, Drama. 
    Accuracy = 56.78% Features: tCount, Comedy, gCount. 
    Accuracy = 52.38% Features: tCount, Comedy, Action. 
    Accuracy = 45.42% Features: tCount, Romance, Drama. 
    Accuracy = 51.65% Features: tCount, Romance, gCount. 
    Accuracy = 49.45% Features: tCount, Romance, Action. 
    Accuracy = 53.85% Features: tCount, Drama, gCount. 
    Accuracy = 48.72% Features: tCount, Drama, Action. 
    Accuracy = 58.24% Features: tCount, gCount, Action. 
    Accuracy = 42.86% Features: Comedy, Romance, Drama. 
    Accuracy = 52.01% Features: Comedy, Romance, gCount. 
    Accuracy = 46.15% Features: Comedy, Romance, Action. 
    Accuracy = 50.92% Features: Comedy, Drama, gCount. 
    Accuracy = 43.22% Features: Comedy, Drama, Action. 
    Accuracy = 51.28% Features: Comedy, gCount, Action. 
    Accuracy = 49.82% Features: Romance, Drama, gCount. 
    Accuracy = 41.76% Features: Romance, Drama, Action. 
    Accuracy = 50.55% Features: Romance, gCount, Action. 
    Accuracy = 50.55% Features: Drama, gCount, Action. 
    Accuracy = 50.92% Features: Thriller, tCount, Comedy, Romance. 
    Accuracy = 52.01% Features: Thriller, tCount, Comedy, Drama. 
    Accuracy = 51.65% Features: Thriller, tCount, Comedy, gCount. 
    Accuracy = 54.95% Features: Thriller, tCount, Comedy, Action. 
    Accuracy = 45.42% Features: Thriller, tCount, Romance, Drama. 
    Accuracy = 52.01% Features: Thriller, tCount, Romance, gCount. 
    Accuracy = 49.82% Features: Thriller, tCount, Romance, Action. 
    Accuracy = 57.14% Features: Thriller, tCount, Drama, gCount. 
    Accuracy = 49.45% Features: Thriller, tCount, Drama, Action. 
    Accuracy = 54.21% Features: Thriller, tCount, gCount, Action. 
    Accuracy = 39.56% Features: Thriller, Comedy, Romance, Drama. 
    Accuracy = 51.65% Features: Thriller, Comedy, Romance, gCount. 
    Accuracy = 48.35% Features: Thriller, Comedy, Romance, Action. 
    Accuracy = 51.28% Features: Thriller, Comedy, Drama, gCount. 
    Accuracy = 48.72% Features: Thriller, Comedy, Drama, Action. 
    Accuracy = 51.65% Features: Thriller, Comedy, gCount, Action. 
    Accuracy = 51.28% Features: Thriller, Romance, Drama, gCount. 
    Accuracy = 42.49% Features: Thriller, Romance, Drama, Action. 
    Accuracy = 50.55% Features: Thriller, Romance, gCount, Action. 
    Accuracy = 50.92% Features: Thriller, Drama, gCount, Action. 
    Accuracy = 49.08% Features: tCount, Comedy, Romance, Drama. 
    Accuracy = 52.75% Features: tCount, Comedy, Romance, gCount. 
    Accuracy = 54.21% Features: tCount, Comedy, Romance, Action. 
    Accuracy = 57.14% Features: tCount, Comedy, Drama, gCount. 
    Accuracy = 50.92% Features: tCount, Comedy, Drama, Action. 
    Accuracy = 57.51% Features: tCount, Comedy, gCount, Action. 
    Accuracy = 54.58% Features: tCount, Romance, Drama, gCount. 
    Accuracy = 47.99% Features: tCount, Romance, Drama, Action. 
    Accuracy = 54.21% Features: tCount, Romance, gCount, Action. 
    Accuracy = 56.78% Features: tCount, Drama, gCount, Action. 
    Accuracy = 52.01% Features: Comedy, Romance, Drama, gCount. 
    Accuracy = 43.96% Features: Comedy, Romance, Drama, Action. 
    Accuracy = 52.38% Features: Comedy, Romance, gCount, Action. 
    Accuracy = 52.01% Features: Comedy, Drama, gCount, Action. 
    Accuracy = 49.82% Features: Romance, Drama, gCount, Action. 
    Accuracy = 50.55% Features: Thriller, tCount, Comedy, Romance, Drama. 
    Accuracy = 53.11% Features: Thriller, tCount, Comedy, Romance, gCount. 
    Accuracy = 55.31% Features: Thriller, tCount, Comedy, Romance, Action. 
    Accuracy = 55.68% Features: Thriller, tCount, Comedy, Drama, gCount. 
    Accuracy = 54.95% Features: Thriller, tCount, Comedy, Drama, Action. 
    Accuracy = 56.41% Features: Thriller, tCount, Comedy, gCount, Action. 
    Accuracy = 54.95% Features: Thriller, tCount, Romance, Drama, gCount. 
    Accuracy = 48.35% Features: Thriller, tCount, Romance, Drama, Action. 
    Accuracy = 51.65% Features: Thriller, tCount, Romance, gCount, Action. 
    Accuracy = 57.14% Features: Thriller, tCount, Drama, gCount, Action. 
    Accuracy = 51.65% Features: Thriller, Comedy, Romance, Drama, gCount. 
    Accuracy = 48.72% Features: Thriller, Comedy, Romance, Drama, Action. 
    Accuracy = 52.01% Features: Thriller, Comedy, Romance, gCount, Action. 
    Accuracy = 51.65% Features: Thriller, Comedy, Drama, gCount, Action. 
    Accuracy = 51.65% Features: Thriller, Romance, Drama, gCount, Action. 
    Accuracy = 54.58% Features: tCount, Comedy, Romance, Drama, gCount. 
    Accuracy = 48.72% Features: tCount, Comedy, Romance, Drama, Action. 
    Accuracy = 57.51% Features: tCount, Comedy, Romance, gCount, Action. 
    Accuracy = 55.68% Features: tCount, Comedy, Drama, gCount, Action. 
    Accuracy = 56.04% Features: tCount, Romance, Drama, gCount, Action. 
    Accuracy = 52.75% Features: Comedy, Romance, Drama, gCount, Action. 
    Accuracy = 54.58% Features: Thriller, tCount, Comedy, Romance, Drama, gCount. 
    Accuracy = 53.48% Features: Thriller, tCount, Comedy, Romance, Drama, Action. 
    Accuracy = 56.78% Features: Thriller, tCount, Comedy, Romance, gCount, Action. 
    Accuracy = 57.88% Features: Thriller, tCount, Comedy, Drama, gCount, Action. 
    Accuracy = 53.85% Features: Thriller, tCount, Romance, Drama, gCount, Action. 
    Accuracy = 52.75% Features: Thriller, Comedy, Romance, Drama, gCount, Action. 
    Accuracy = 54.58% Features: tCount, Comedy, Romance, Drama, gCount, Action. 
    Accuracy = 57.88% Features: Thriller, tCount, Comedy, Romance, Drama, gCount, Action. 

**Accuracy = 58.24% Features: tCount, gCount, Action.**
As you can see, this one has given most accuracy so for.

### Next
In next post, we can simplify this problem to binary classification instead of multi class classification. We will be using both [Random forest classifier](https://spark.apache.org/docs/2.2.0/ml-classification-regression.html#random-forest-classifier) and [Multilayer perceptron classifier](https://spark.apache.org/docs/2.2.0/ml-classification-regression.html#multilayer-perceptron-classifier) machine learning models to compare against each other.

### Code Download
* [https://github.com/sakthipriyan/learning-spark](https://github.com/sakthipriyan/learning-spark) has full source code.

### References
1. [https://spark.apache.org/docs/2.2.0/sql-programming-guide.html](https://spark.apache.org/docs/2.2.0/sql-programming-guide.html)
2. [https://spark.apache.org/docs/2.2.0/api/scala/index.html#org.apache.spark.sql.Dataset](https://spark.apache.org/docs/2.2.0/api/scala/index.html#org.apache.spark.sql.Dataset)
3. [https://spark.apache.org/docs/2.2.0/ml-classification-regression.html](https://spark.apache.org/docs/2.2.0/ml-classification-regression.html)
4. [https://spark.apache.org/docs/2.2.0/ml-features.html](https://spark.apache.org/docs/2.2.0/ml-features.html)
