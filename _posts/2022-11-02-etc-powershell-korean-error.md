---
layout: post
date: 2022-11-02 09:05:00 +0900
title: '[etc] 파워쉘 한글 깨짐현상 해결'
categories:
  - etc
tags:
  - powrshell
  - utf-8
---

* Kramdown table of contents
{:toc .toc}

## 참고

[파워쉘 한글깨짐 개선](https://holjjack.tistory.com/144)


## 파워쉘 한글 깨짐현상 해결

```
PS C:\> [System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```