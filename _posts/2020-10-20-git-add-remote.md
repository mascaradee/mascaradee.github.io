---
layout: post
date: 2020-10-20 19:00:00 +0900
title: '[git] add remote'
categories:
- git
tags:
- add
- remote
---

## add remote

로컬저장소, remote, origin remote로 나뉠 수 있다.
fetch 명령어로 origin remote의 변경내역을 remote로 내려받을 수 있다.

mas-labs을 fork한 nori-labs 레파지토리가 있다.
nori-labs에 추가로 remote를 하나 더 추가하고 mas-labs의 origin remote를 연결할 수 있다.


## 참고
- 보고 정리할것
[https://git-scm.com/book/ko/v2](https://git-scm.com/book/ko/v2)


## 업스트림 연결 upstream

로컬에서 생성한 브랜치인 경우 아래 명령어로 remote 브랜치와 따로 연결을 해 줘야 한다.
한 번만 연결해 놓으면 `push` 나 `pull`을 받을 때 브랜치명을 넣을 필요가 없다.

`git push --set-upstream origin [브랜치명]`

```
 git push --set-upstream origin feature/event/0610/3583947-lava
```
