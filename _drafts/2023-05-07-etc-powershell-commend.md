---
layout: post
date: 2023-05-07 09:05:00 +0900
title: '[etc] powershell commend'
categories:
  - etc
tags:
  - powershell
  - commend
---

* Kramdown table of contents
{:toc .toc}

## 6374 포트 사용하는 프로세스 조회 

```
PS C:\> netstat -nao | findstr 6374
  프로토콜  로컬 주소              외부 주소              상태            PID
  TCP    127.0.0.1:6374         0.0.0.0:0              LISTENING       6136
  TCP    127.0.0.1:6374         127.0.0.1:7164         ESTABLISHED     6136
  TCP    127.0.0.1:6374         127.0.0.1:7165         ESTABLISHED     6136
  TCP    127.0.0.1:7164         127.0.0.1:6374         ESTABLISHED     12764
  TCP    127.0.0.1:7165         127.0.0.1:6374         ESTABLISHED     12764
```

## 강제 종료

활성화 된 프로세스의 PID로 강제 종료한다. 참고로 `kill` 명령어는 파워쉘에서만 사용가능

```
 kill -Id 6136
```