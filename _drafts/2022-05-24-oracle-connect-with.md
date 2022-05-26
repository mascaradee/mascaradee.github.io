---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[] '
categories:
  -
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

## CONNECT WITH LEVEL로 연속되는 날짜 만들기

```SQL
SELECT TO_CHAR(SYSDATE - 7 + (LEVEL - 1), 'YYYYMMDD') AS DT
FROM DUAL
CONNECT BY LEVEL <= (SYSDATE - 1) - (SYSDATE - 7) + 1 /* 어제부터 7일 */
```
