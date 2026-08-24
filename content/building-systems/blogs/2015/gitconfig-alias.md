---
title: Git Configuration
date: '2015-04-01'
draft: false
type: blogs
systems_tags:
- Git
- Config
- Version Control
- .gitconfig
- Setup
author: Sakthi Priyan H
summary: Alias for generally used Git commands
aliases:
- /2015/04/01/gitconfig-alias.html
---

Following configuration can be used to speed up git usage.

### Edit Content

```bash
nano ~/.gitconfig
```

### Config Content

```ini
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
```