---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] intersect and minus'
categories:
  - oracle
tags:
  - intersect
  - minus
---

## 교집합

```sql
WITH TAB1 AS (SELECT '10' AS FALG FROM DUAL
              UNION ALL
              SELECT '20' AS FALG FROM DUAL)
, TAB2 AS (SELECT '10' AS FALG FROM DUAL
           UNION ALL
           SELECT '30' AS FALG FROM DUAL)
SELECT FALG FROM TAB1
INTERSECT
SELECT FALG FROM TAB2
;
```

<br>

## 차집합
TAB1 - TAB2 이므로 TAB1기준으로 공통된 부분을 제외하고 남은 행을 리턴

```sql
WITH TAB1 AS (SELECT '10' AS FALG FROM DUAL
              UNION ALL
              SELECT '20' AS FALG  FROM DUAL)
, TAB2 AS (SELECT '10' AS FALG FROM DUAL
           UNION ALL
           SELECT '30' AS FALG FROM DUAL)
SELECT FALG FROM TAB1
MINUS
SELECT FALG FROM TAB2
;
```
