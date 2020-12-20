---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] ascii'
categories:
  - oracle
tags:
  - ascii
  - chr
---

* Kramdown table of contents
{:toc .toc}

## ASCII(문자 혹은 숫자)

```sql
SELECT ASCII('A') FROM DUAL;
-- 65
SELECT ASCII('a') FROM DUAL;
-- 97
SELECT ASCII('ㄱ') FROM DUAL;
-- 14910641
```

<br>

## CHR(숫자)
숫자(아스키코드값) -> 문자

```sql
SELECT CHR(65) FROM DUAL;
-- A
SELECT CHR(97) FROM DUAL;
-- a
SELECT CHR(14910641) FROM DUAL;
-- ㄱ
```
