---
title: Git Configuration
date: '2015-04-01'
draft: false
type: blogs
systems_tags:
- git
- config
- version-control
- .gitconfig
- setup
author: Sakthi Priyan H
summary: Alias for generally used Git commands
aliases:
- /2015/04/01/gitconfig-alias.html
---

Following configuration can be used to speed up git usage.

### Edit Content

	nano ~/.gitconfig

### Config Content

	[user]
	name = Sakthi Priyan H
	email = **************

	[alias]
	br = branch
	cm = commit -m
	ca = commit -a -m
	co = checkout
	pr = pull --rebase
	pu = push
	re = rebase
	st = status
	tp = push --tags