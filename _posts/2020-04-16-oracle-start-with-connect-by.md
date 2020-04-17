---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] start with connect by'
categories:
  - oracle
tags:
  - start with connect by
  - level
  - connect by root
  - connect by isleaf
  - sys connect by path
---

## 참고
[https://ahrang.tistory.com/14](https://ahrang.tistory.com/14)


## 문법
```sql
SELECT 컬럼명
       , LEVEL /*[의사컬럼] 루프데이터 = 1 그 하위는 리프(leaf, 마지막레벨)데이터까지 1씩 증가*/
       , CONNECT_BY_ROOT 컬럼명 /*[예약어] 루트 데이터*/
       , CONNECT_BY_ISLEAF /*[예약어] 전개 과정에서 해당 데이터가 리프 데이터이면 1, 그렇지 않으면 0 */
       , SYS_CONNECT_BY_PATH(컬럼, 경로분리자) /*[예약어] 루트 데이터 ~ 현재 데이터까지 경로*/
FROM   테이블명
WHERE  조건식
START WITH 조건식 AND 조건식 /* 계층 구조의 데이터를 읽어나가는데 있어 시작점. 서브쿼리 가능 */
CONNECT BY PRIOR 컬렴명1 = 컬럼명2 AND 조건식 /* 다음에 읽을 자식 데이터를 지정, PRIOR가 붙은 컬럼명1의 값을 읽어 컬럼명2에 대입, 즉  PRIOR '1234' = 컬럼명2 요런식. 서브쿼리 불가*/
[ORDER SIBLINGS BY 컬럼명, ......]
```

### CONNECT BY의 실행순서
1. START WITH 절
2. CONNECT BY 절
3. WHERE 절- 단순 필터조건이고 처리범위를 줄이지는 못한다.


### 예시

| ORDER_NO | ORDER_DETAIL_NO | JBF_ORDER_DETAIL_NO | ORDER_CLASSIFICATION_CODE |
|---|---|---|---|
| 20190718A12345 | **784134856** |0	|10|
| 20190718A12345 | 784712020 | 784134856 | 14 |
| 20190718A12345 | 784712019 | 784134856 | 16 |
| 20190718A12345 | 784774036 | 784712020 | 15 |
| 20190718A12345 | 784774035 | 784712019 | 17 |
| 20190718A12345 | 784939376 | 784134856 | 12 |
| 20190718A12345 | 785233821 | 784939376 | 13 |
| 20190718A12345 | 785241212 | 784134856 | 16 |
| 20190718A12345 | _**785241213**_ | **784134856** | 14 |
| 20190718A12345 | 785512877 | 785241212 | 17 |
| 20190718A12345 | **785512878** | _**785241213**_ | 15 |

### 쿼리
```sql
SELECT     ORDER_NO, ORDER_DETAIL_NO, JBF_ORDER_DETAIL_NO, ORDER_CLASSIFICATION_CODE
         , LEVEL
         , CONNECT_BY_ROOT ORDER_DETAIL_NO AS ROOT
         , CONNECT_BY_ISLEAF
         , SYS_CONNECT_BY_PATH(ORDER_DETAIL_NO, '/')
FROM       MY_ORDER_DETAIL
WHERE      1=1--CONNECT_BY_ISLEAF = 1 /*최하위 ROW = 1*/
START WITH ORDER_NO = '20190718A12345' AND ORDER_DETAIL_NO =  785512878 /* 반품할대상 */
CONNECT BY PRIOR JBF_ORDER_DETAIL_NO =  ORDER_DETAIL_NO  AND PRIOR ORDER_NO = ORDER_NO
;
-- JBF_ORDER_DETAIL_NO : 상위(어디에서부터 왔는가?)
-- ORDER_DETAIL_NO  : 하위?
```

#### 결과

| ORDER_NO | ORDER_DETAIL_NO | JBF_ORDER_DETAIL_NO | ORDER_CLASSIFICATION_CODE | LEVEL | ROOT | CONNECT_BY_ISLEAF | SYS_CONNECT_BY_PATH(ORDER_DETAIL_NO,'/')  |
|---|---|---|---|---|---|---|---|
| 20190718A12345 | 785512878 | 785241213 | 15 | 1 | 785512878 | 0 | /785512878	                    
| 20190718A12345 | 785241213 | 784134856 | 14 | 2 | 785512878 | 0 | /785512878/785241213	          
| 20190718A12345 | 784134856 | 	         | 10 | 3 | 785512878 | 1 | /785512878/785241213/784134856
