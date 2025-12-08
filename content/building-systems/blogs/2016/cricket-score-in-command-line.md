---
title: Cricket score in command line
date: '2016-01-28'
draft: false
type: blogs
systems_tags:
- cricket
- code
- cricscore-api
- python
author: Sakthi Priyan H
summary: using python and open cricscore api
aliases:
- /2016/01/28/cricket-score-in-command-line.html
---

### Intro
Earlier I developed a simple cricket score api known as [cricscore-api](http://cricscore-api.appspot.com/) which gets data from [cricinfo](http://cricinfo.com) website.  
It was developed to support a simple Android App back then.  
Later it was open [sourced](https://github.com/sakthipriyan/CricScoreGAE) for everyone.

### API
Cricscore API has 2 simple APIs.

1. List all matches  
As shown below, it returns list of matches, along with match `id`.

        $ curl "http://cricscore-api.appspot.com/csa"
        # line breaks added to the output for readability.
        [
            {"id":895819,"t2":"India","t1":"Australia"},
            {"id":959389,"t2":"Pakistan A","t1":"England Lions"}
        ]

2. Get detail for specific match.  
Take the id of the match of interest and use it as query parameter to same end point.

        $ curl "http://cricscore-api.appspot.com/csa?id=895819"
        # line breaks added to the output for readability.
        [
            {
                "de":"2nd T20I: Australia v India at Melbourne, Jan 29, 2016",
                "id":895819,
                "si":"Australia v India"
            }
        ]

### Goals
1. Show the score of a particular match in the console.  
2. Output new score detail, whenever it changes.

### Code
Self explanatory for python people.  
In line comments (starting with `#`) for everyone else.

    import urllib2, json, time

    # Score set to empty initially.
    score = ''

    # Run forever
    while True:
        # Fetch the url for the specific match.
    	response = urllib2.urlopen('http://cricscore-api.appspot.com/csa?id=656493')

        # Get the score details `de` from the response json.
    	data = json.load(response)
    	new_score = data[0]['de']

        # Whenever score changes, print to console.
    	if(new_score != score):
    		print new_score
    		score = new_score

        # Give a break, hit API after 2 seconds.
    	time.sleep(2)

### Run it
1. Store the above code in file `score.py` with required match id.
2. Run `python score.py`
3. `Ctrl` + `C` to exit the script.

### Further
This code can be further developed, to select the match in the command line itself.  
You are free to do so, I may not find time.

### Later
Later, I will add output for a live match in Run it section.