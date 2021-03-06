---
layout: post
date: 2020-05-12 00:00:00 +0900
title: '[oracle] table name search'
categories:
  - oracle
tags:
  - table_name
  - column_name
  - procedure
  - function
---

```sql

/******************************************************************************/
/*테이블찾기 */
/******************************************************************************/
SELECT *
FROM   ALL_TABLES
WHERE  TABLE_NAME LIKE '%PRC%'
;

/******************************************************************************/
/*컬럼찾기 */
/******************************************************************************/
SELECT   *
FROM     ALL_TAB_COLUMNS
WHERE    COLUMN_NAME LIKE '%RFD_POT%'
ORDER BY COLUMN_NAME
;

/******************************************************************************/
/*프로시저 TEXT검색*/
/******************************************************************************/
SELECT   *
FROM     USER_SOURCE
WHERE    1 = 1
AND      TYPE = 'PROCEDURE' --패키지나 다른 부분을 검색 하고 싶다면 대문자로 입력
AND      TEXT LIKE  '%USM_LINK_STAT_CD%' --여기에 찾고 싶은 텍스트 입력
ORDER BY NAME, LINE
;

/******************************************************************************/
/*FUNCTION TEXT검색*/
/******************************************************************************/
SELECT   *
FROM     USER_SOURCE
WHERE    1 = 1
AND      TYPE = 'FUNCTION'
AND      TEXT LIKE  '%REG%'
ORDER BY NAME, LINE
;

/******************************************************************************/
/*오라클 버전 확인 */
/******************************************************************************/
SELECT banner FROM  V$VERSION;

```
