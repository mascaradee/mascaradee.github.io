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
최신버전에서는 `--track`은 생략 가능하다.

`git checkout [브랜치명]`

```
git checkout -b [로컬브랜치명] --track [origin/브랜치명]
```


## 브랜치 이름 변경

내 브랜치 이름 바꾸기. 다른 브랜치로 바꿨다가 변경할 필요 없이 바로 변경 가능

`git branch -m [NAME_FROM] [NAME_TO]`

```
 git branch -m hotfix/qwe hotfix/3574306-lavax
```
