---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] next_day'
categories:
  - oracle
tags:
  - next_day
---

## 현재 기준으로 지정된 요일이 다음에 몇일인지 리턴

```sql
/* 현재 */
SELECT SYSDATE FROM DUAL; -- 2019-09-17 오후 2:24:53 (화요일)

/* 1:일요일, 2:월요일, 3:화요일, 4:수요일, 5:목요일, 6:금요일, 7:토요일 */
SELECT NEXT_DAY(SYSDATE, 1) FROM DUAL; -- 2019/09/22 오후 2:24:53  (일요일)
SELECT NEXT_DAY(SYSDATE, 5) FROM DUAL; -- 2019/09/19 오후 2:27:47  (목요일)
```
