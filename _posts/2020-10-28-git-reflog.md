---
layout: post
date: 2020-10-28 20:00:00 +0900
title: '[git] reflog'
categories:
- git
tags:
- reflog
---

## reflog

head(현재 커밋점)의 변경이력을 볼수 있는 명령어  
커밋아이디와 어떻게 head가 변경되었는지를 알수 있다.  

```git
$ git reflog
b8e83e2 (HEAD -> master, origin/master) HEAD@{0}: pull: Fast-forward
d0e12c8 HEAD@{1}: pull: Fast-forward
5b799a9 HEAD@{2}: commit: update
6dca34e HEAD@{3}: merge branch 'master' of https://github.com/mascaradee/labs.git: Fast-forward
bbfd861 HEAD@{4}: commit (initial): initialize
```
