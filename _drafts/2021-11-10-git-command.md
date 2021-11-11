---
layout: post
date: 2021-11-10 16:48:00 +0900
title: '[git] 자주 사용하는 명령'
categories:
  - git
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

## checkout

다른 브랜치로 변경하거나 새 브랜치를 생성할 때 사용한다.

`git checkout [옵션] [로컬브랜치명] [리모트브랜치명]`

```git
git checkout -b feature/event/12345 origin/feature/event/12345
```
