#Git Configuration
##Alias for generally used Git commands
git, config, version control, .gitconfig, setup

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
