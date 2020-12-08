---
layout: post
date: 2020-10-26 17:00:00 +0900
title: '[git] fast forward'
categories:
- git
tags:
- fast forward
- upstream branch
---

## fast forward

현재 브랜치(target)가 가져올 브랜치(혹은 커밋 그 자체, source)의 부모 브랜치이면  
충돌이 발생하지 않고 현재 브랜치를 단순히 앞으로 이동한다하여 fast-forward(FF) 머지라고 한다.    

```git
$ git branch master
$ git commit
$ git branch sourceB
$ git commit
$ git checkout master
$ git commit
$ git merge sourceB // merge commit 생성 : master에 sourceB를 머지한다.
$ git checkout sourceB
$ git merge master // FF 생성 : sourceB에 master를 머지한다.
```

`git merge [가져올 대상]`

위 명령어에는 머지가 될 대상은 생략되어 있지만 그것은 미리 checkout으로 머지가 될 대상으로 이동한 상태이기 떄문이다.  



## upstream branch
`push, fetch, pull` 명령은 원래 대상이 필요하나,  
업스트림 브랜치 (대상을 생략했을때 자동으로 지정되는 리모트 브랜치)가 있으면 생략이 가능하다.
로컬브랜치에는 1개의 업스트림 브랜치만이 존재한다.  
또한 업스트림 브랜치는 변경이 가능한다.

```git
$ git push // git push origin/master
```
