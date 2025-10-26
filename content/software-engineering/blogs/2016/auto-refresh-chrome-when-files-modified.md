---
title: Auto refresh Chrome when files modified
date: '2016-02-15'
draft: false
type: blogs
se_tags:
- chrome
- python
- webgen
- code
author: Sakthi Priyan H
summary: Using python pyinotify and chrome debugging
aliases:
- /2016/02/15/auto-refresh-chrome-when-files-modified.html
---

### Why?
I am using [webgen](https://github.com/sakthipriyan/webgen) to generate static pages for [sakthipriyan.com](http://sakthipriyan.com).  
It is a 3 step process to see the latest website from markdown source code.

1. In text editor, say [Atom](https://atom.io/) or [Sublime](https://www.sublimetext.com/) save the markdown file using `Ctrl + S`.
2. Kill the shell script using `Ctrl + C` and then rerun it by hitting `UP` and `ENTER` keys.
3. Then go back to chrome browser and refresh it using `F5` or `Ctrl + R`.

I really preferred to proof read the blog post on browser.  
So, I had to repeat above steps for each edit.  
I thought, it should be automated to save time and key stokes.  

### Goal
Just save the markdown source for the blog post and then see the browser.  
Everything should be done automatically under the hood.

### How?
1. Monitor a given markdown source code folder using python `pyinotify` library.
2. Once, changes are detected, trigger the static website generation.
3. Then, refresh the Google Chrome using the remote debugging.

### Environment
* Ubuntu 14.04 (It will work for any Linux distro)
* Atom or Sublime editor (Any text editor should be fine)
* Google Chrome (Code works only for Chrome Browser)

### Code
Let's get into the code now.

#### monitor.py
* `monitor.py` will monitor a given directory for file deletion or change in content.  
* `pyinotify` uses kernel level mechanism to get notified when there is a change in given directory.
* In this example, `AsyncNotifier` is used to detect changes in a given directory.
* `EventHandler` is used to process specific monitored events.
* `mask` is used to monitor specific events. Here,
    * `pyinotify.IN_DELETE` event occurs when file or directory is deleted.
    * `pyinotify.IN_CLOSE_WRITE` event occurs when a file is modified and closed.  
    This event will cover both new file creation and modification of existing files.
* `monitor(directory, callback)` method can be imported and called.
    * directory - string - absolute directory path to monitor.
    * callback - method - which will be called, when file changes.

More comments inline.

    import asyncore, pyinotify

    # Look for only these two events.
    mask =  pyinotify.IN_DELETE | pyinotify.IN_CLOSE_WRITE

    # Custom class to process the Event.
    class EventHandler(pyinotify.ProcessEvent):
        def __init__(self, fn, *args, **kwargs):
            super(EventHandler, self).__init__(*args, **kwargs)
            self.function = fn

        def process_IN_DELETE(self, event):
            self.function()

        def process_IN_CLOSE_WRITE(self, event):
            self.function()

    # this method will monitor the given directory
    # it calls the callback() when the monitored event occurs.
    def monitor(directory, callback):
        wm = pyinotify.WatchManager()
        # rec=True, to monitor all sub directories recursively.
        # auto_add=True, to monitor added new sub directories.
        wm.add_watch(directory,mask,rec=True,auto_add=True)
        # specify the event handler to process the events.
        pyinotify.AsyncNotifier(wm,EventHandler(callback))
        # start the asyncore loop to monitor and process events.
        asyncore.loop()


#### browser.py

* First step is to launch chrome with remote debugging enabled. Example as follows,

        google-chrome \
        --remote-debugging-port=9222 \
        --user-data-dir=/home/sakthipriyan/.chrome-remote-profile \
        http://localhost:8000

* Following response is received for `http` GET request `http://localhost:9222/json`.

        [{
           "description": "",
           "devtoolsFrontendUrl": "/devtools/inspector.html?ws=localhost:9222/devtools/page/D02BE82A-7833-4408-93EB-E30644BF3378",
           "faviconUrl": "http://localhost:8000/img/favicon.png",
           "id": "D02BE82A-7833-4408-93EB-E30644BF3378",
           "title": "Auto refresh Chrome when files modified - Sakthi Priyan H",
           "type": "page",
           "url": "http://localhost:8000/2016/02/15/auto-refresh-chrome-when-files-modified.html",
           "webSocketDebuggerUrl": "ws://localhost:9222/devtools/page/D02BE82A-7833-4408-93EB-E30644BF3378"
        }]

* To refresh any tab, we have to send following json via websocket connection.

        {"params": {"ignoreCache": true}, "id": 0, "method": "Page.reload"}

Python implementation with comments below.

    import os, subprocess, threading
    import requests, json
    from websocket import create_connection

    chrome_port = 9222
    chrome_json_url = 'http://localhost:%s/json' % (chrome_port)
    refresh_json = json.dumps({
        "id": 0,
        "method": "Page.reload",
        "params": { "ignoreCache": True }
     })

    def open_browser(url):
        # directory is used by Google Chrome to store profile for this remote user.
        directory = os.path.expanduser('~/.chrome-remote-profile')
        command = 'google-chrome --remote-debugging-port=%d --user-data-dir=%s %s' % \
        (chrome_port,directory,url)
        subprocess.call(command, shell=True)

    def refresh_browser():
        # get response for the GET request.
        response = requests.get(chrome_json_url)
        # Process each item in the response.
        for page in response.json():
            # only if it is a page and interested urls.
            if  page['type'] == 'page' and 'localhost:8000' in page['url']:
                # Open websocket connection, send json and close it.
                # This will refresh this specific tab.
                ws = create_connection(page['webSocketDebuggerUrl'])
                ws.send(refresh_json)
                ws.close()

    def start_browser():
        # Browser is launched via a daemon thread.
        # It will terminate the browser when you close the python script.
        thread = threading.Thread(target = open_browser, kwargs={'url':'http://localhost:8000'})
        thread.daemon=True
        thread.start()

### How to use these files?

1. Generate the website or do whatever you want to do before launching the browser.
2. Launch the browser.
3. Monitor a given folder, with specified callback.
4. Callback does two jobs,
    1. Say, generate the website or do what ever you want to do when files changed.
    2. Refresh the browser once previous step is complete.

#### main.py

    from monitor import monitor
    from browser import start_browser, refresh_browser

    # Import imagine function from a imagine file.
    from imagine import imagine

    # Callback does two things, as promised.
    def cb():
        imagine() # Step 4.1
        refresh_browser()  # Step 4.2

    my_directory = '/home/sakthipriyan/workspace/blog/sakthipriyan.com'
    # Set up for first time.
    imagine() # Step 1
    start_browser() # Step 2
    monitor(my_directory, cb) # Step 3

### It works!
When everything done correctly, it just works very well. Just loving it!

1. Edit the page and save it.
2. See the latest website in the browser.

Between, this is the first post I had written using this auto refresh when file changed mechanism.

### Next
Currently `webgen` does a dumb job of creating the whole website.  
Next goal is to generate delta of website rather than the whole.