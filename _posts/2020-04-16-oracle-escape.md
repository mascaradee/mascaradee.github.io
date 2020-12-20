---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] escape'
categories:
  - oracle
tags:
  - like
  - escape
---

## ESCAPE
- LIKE 검색 시 약속어로써인 `%`나 `_(언더바)`가 아닌 특수문자인 `%`나 `_`를 포함한 데이터를 검색할때 사용.
- ESCATPE될 특수문자는 아무것이나 가능

```sql
WITH TAB AS ( SELECT 'SEOUL' AS CITY FROM DUAL
           UNION ALL
           SELECT 'GWANG_JU' AS CITY FROM DUAL
           UNION ALL
           SELECT 'BUSAN' AS CITY FROM DUAL
         )
--SELECT CITY FROM TAB WHERE CITY LIKE '%_%';
--CITY
----------
--SEOUL
--GWANG-JU
--BUSAN

--SELECT CITY FROM TAB WHERE CITY LIKE '%%';
--CITY
----------
--SEOUL
--GWANG-JU
--BUSAN

SELECT CITY FROM TAB WHERE CITY LIKE '%*_%' ESCAPE '*';
--CITY
----------
--GWANG_JU


WITH TAB AS ( SELECT 'SEOUL' AS CITY FROM DUAL
           UNION ALL
           SELECT 'GWANG%JU' AS CITY FROM DUAL
           UNION ALL
           SELECT 'BUSAN' AS CITY FROM DUAL
         )

--SELECT CITY FROM TAB WHERE CITY LIKE '%%%';
--CITY
----------
--SEOUL
--GWANG%JU
--BUSAN

SELECT CITY FROM TAB WHERE CITY LIKE '%@%%' ESCAPE '@';
--CITY
----------
--GWANG%JU
```
