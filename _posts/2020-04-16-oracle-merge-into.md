---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] merge into'
categories:
  - oracle
tags:
  - merge into
---

## MERGE INTO

```sql
MERGE INTO 수정될 테이블
USING (
업데이트 혹은 인서트 될 데이터 : 서브쿼리
)
ON (수정될 테이블과 수정될 데이터를 연결하기 위한 조건식 )
WHEN MATCHED THEN
UPDATE SET 컬럼 1 = 값1
WHEN NOT MATCHED THEN
INSERT INTO (컬럼1, 컬럼2 ...)
VALUES (값1, 값2 ...)
```
