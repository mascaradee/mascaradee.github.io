---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] initcap'
categories:
  - oracle
tags:
  - initcap
---

## 첫 글자를 대문자로

```sql
SELECT INITCAP('abc') FROM DUAL;
--Abc

SELECT INITCAP('abc de') FROM DUAL;
--Abc De

SELECT INITCAP('abc_de') FROM DUAL;
--Abc_De
```
