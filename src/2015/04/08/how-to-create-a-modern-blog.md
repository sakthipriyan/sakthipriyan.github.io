#How to create a modern blog?
##using markdown and python
blog software, webgen, design, python, markdown

Over past few years I had tried various blogging platforms, say Live journal, wordpress (self hosted as well), tumblr, microsoft sharepoint etc., Everyone of these had only browser based editors. I was looking for simple text file based blogging software. I came across [Jekyll](http://jekyllrb.com/). But, instead of learning it, I wondered why don't I create simple one.

###Primary Goals

1. Write blog using [Markdown](http://daringfireball.net/projects/markdown/).
2. Code highlighting.
3. Responsive UI.
4. Tagging posts.
5. List blogs by date.
6. Share link over social media.

##[webgen](https://github.com/sakthipriyan/webgen)

Initially, I started working with [scala](http://www.scala-lang.org/) [play framework](https://www.playframework.com). I tried various storage systems from file system to couchbase server. Every option had different pros and cons.

###Storage
1. *File system* : It is lowest level you can getting in to. It can be easily be part of a git repo.
2. *MySQL* : Most of the blogging software including wordpress use this one. Nothing new or special. Required some sort of ORM.
3. *Elastic search* : json document store with extensive search capabilities.
4. *Couchbase* : Fast RAM cached json document store. Json documents make easy for iterative devlopment.

###Solution
I was concerned about the server cost and i wanted to reduce the compute time for serving the blog files. So, decided to go for simple file based solution. Here, both source blog markdown as well as generated websites will be set of files. So, webgen has to generate set of html files from set of markdown files.

###Tech stack
1. *[Markdown](http://daringfireball.net/projects/markdown/)* format is the core of this static **web**site **gen**erator. Easier to create clean html from simple text styles.
2. *HTML5 + CSS3 + Javascript*: Browser can understand only these 3, No escaping right.
3. *Twitter [bootstrap](http://getbootstrap.com/) + [jQuery](https://jquery.com/)*: Bootstrap is one of the awesome reponsive UI library available out there and jQuery is required for few of its functionalities.
4. *[Font-Awesome](http://fortawesome.github.io/Font-Awesome/)* : Just love the font awesome icons over default one that comes along with bootstrap.
5. *[highlight.js](https://highlightjs.org)* : Easily customizable javascript library available for code highlighting.
6. *[Python](https://www.python.org/)* : Moved over to python from jvm langauges, so that i can learn more by using it.
7. *[Jinja2](http://jinja.pocoo.org)* : Really handy html templating library for python. Comparable to one that comes along with django
8. *Python [Markdown](https://pypi.python.org/pypi/Markdown)* package is available in python which generates html out of the markdown text.

Now, all the components are in place.

###Repo
1. **[webgen](https://github.com/sakthipriyan/webgen)** : It contained all python code required to generate the website.
2. **[sakthipriyan.com](https://github.com/sakthipriyan/sakthipriyan.com)** : It contains 3 components,
	1. Website template - used by the jinja2 and required css/js files.
	2. Markdown - all blog files in markdown.
	3. Config - config files used for generating the website.

###Website Generation
Following set files are generated, when webgen is run.

1. Home page
2. Blog pages
3. Tagcloud page
4. Tags page
5. Calendar pages

###Deployment
Generate the website using the following command.

	#python webgen.py [location of the config file]
	python webgen.py ../sakthipriyan.com/conf/local.json

Once the blog is generated it can be easily deployed over any static webserver like [nginx](http://nginx.org/) or [apache webserver](http://httpd.apache.org/). I prefer nginx for being thread less web server.

###Conclusion
Though webgen is able to generate website from markdown, it is far from perfect. Lot of things has to be done over coming months, so that it can smartly generate the website.
