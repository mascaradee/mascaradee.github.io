
---
layout: post
date: 2020-10-28 20:00:00 +0900
title: '[git] checkout'
categories:
- git
tags:
- checkout
---

## checkout

브랜치를 변경하는 명령어로 변경할 브랜치의 head로 변경된다.  
참고로 head는 현재 커밋을 가리키고 마지막 커밋과 꼭 동일하지 않다.  

`git checkout [브랜치명]`


```git
$ git status
On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean

$ git checkout testbranch
```
