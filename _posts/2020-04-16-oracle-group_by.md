---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] group by'
categories:
  - oracle
tags:
  - group by
  - max
---

## 세로데이터를 가로로

#### 쿼리

```sql
WITH WITH0 AS(
SELECT '1234567890' COL1 FROM DUAL
UNION ALL
SELECT '1234567891' COL1 FROM DUAL
)
, WITH1 AS(
SELECT '1234567890' COL2 FROM DUAL
UNION ALL
SELECT '1234567892' COL2 FROM DUAL
)

SELECT COL1, MAX(FLAG1) AS FLAG1, MAX(FLAG2) AS FLAG2
FROM (
    SELECT COL1, DECODE(FLAG,'1',FLAG, NULL) AS FLAG1 , DECODE(FLAG,'2',FLAG, NULL) AS FLAG2
    FROM
    (
        SELECT COL1, '1' FLAG
        FROM WITH0
        UNION ALL
        SELECT COL2, '2' FLAG
        FROM WITH1
    )
)
GROUP BY COL1
;
```

#### 결과

| COL1 | FLAG1 | FLAG2 |
| --- | --- | --- |
| 1234567890 | 1 | 2 |
| 1234567891 | 1 |	 |
| 1234567892 |	 | 2 |
