---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] extract'
categories:
  - oracle
tags:
  - extract
---

* Kramdown table of contents
{:toc .toc}

## EXTRACT( A FROM DATE (OR DATETIME))

```sql

SELECT EXTRACT(YEAR FROM SYSDATE) YEAR
     , EXTRACT(MONTH FROM SYSDATE) MONTH
     , EXTRACT(DAY FROM SYSDATE) DAY
     , EXTRACT (TIMEZONE_HOUR FROM SYSTIMESTAMP) TIMEZONE_HOUR -- TIMEZONE 시간 (대한민국은 +09:00)
     , EXTRACT(HOUR FROM SYSTIMESTAMP) HOUR -- UTC 기준으로 리턴
     , EXTRACT(HOUR FROM SYSTIMESTAMP) + 9 HOUR2 -- LOCAL HOUR
     , EXTRACT(MINUTE FROM SYSTIMESTAMP) MINUTE
     , EXTRACT(SECOND FROM SYSTIMESTAMP) SECOND
     , SYSTIMESTAMP
FROM DUAL;
```

<br>

| YEAR | MONTH | DAY | TIMEZONE_HOUR | HOUR |	HOUR2 |	MINUTE | SECOND	   | SYSTIMESTAMP
| --- | --- | --- | --- | --- |	--- |	--- | ---	   | ---
| 2019 | 9     | 17	 | 9             | 6	  | 15    | 3	     | 16.996047 | 2019-09-17 오후 3:03:16.996047 +09:00

<br>

## UTC
**협정 세계시**(協定世界時, [프랑스어](https://ko.wikipedia.org/wiki/%ED%94%84%EB%9E%91%EC%8A%A4%EC%96%B4): Temps Universel Coordonné, [영어](https://ko.wikipedia.org/wiki/%EC%98%81%EC%96%B4): Coordinated Universal Time) 또는 **UTC**(협정 세계표준시)는 [1972년](https://ko.wikipedia.org/wiki/1972%EB%85%84) [1월 1일](https://ko.wikipedia.org/wiki/1%EC%9B%94_1%EC%9D%BC)부터 시행된 국제 표준시이다. UTC는 [국제원자시](https://ko.wikipedia.org/wiki/%EA%B5%AD%EC%A0%9C%EC%9B%90%EC%9E%90%EC%8B%9C)와 [윤초](https://ko.wikipedia.org/wiki/%EC%9C%A4%EC%B4%88) 보정을 기반으로 표준화되었다. UTC는 [그리니치 평균시](https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%A6%AC%EB%8B%88%EC%B9%98_%ED%8F%89%EA%B7%A0%EC%8B%9C)(GMT)에 기반하므로 GMT로도 불리기도 하는데, UTC와 GMT는 초의 소숫점 단위에서만 차이가 나기 때문에 일상에서는 혼용되어 사용된다. 기술적인 표기에서는 UTC가 사용된다. 대한민국 표준시로  UTC +09:00
