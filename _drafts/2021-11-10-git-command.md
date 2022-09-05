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


## upstream

마스터 혹은 다른 브랜치에서 개별 브랜치를 따왔을때 upstream은 그대로 마스터 혹은 그 브랜치일 때 업스트림을 바꿔줄때 사용한다.

`git push --set-upstream origin [로컬브랜치명]`

```git
git push --set-upstream origin feature/event/12345
```

## config

git 설정으로 명령어에 따라 `--list` 전체 설정, `--local` 현재 저장소 설정을, `--global` 현재 로그인한 사용자의 설정으로 저장소별 별도 설정이 없으며 모두 이 설정을 따른다.

```git
git config --list
git config -l --local
git config -l --global
```

사용자의 이름, 이메일 설정 

```git
git config --global user.name "이름"
git config --global user.email "이메일"
```