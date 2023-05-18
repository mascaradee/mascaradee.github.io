---
layout: post
date: 2022-11-03 09:05:00 +0900
title: '[etc] mysql merge into, on duplicate key'
categories:
  - etc
tags:
  - duplicate
---

* Kramdown table of contents
{:toc .toc}


## on duplicate key 사용법 

mysql에서 오라클의 merge into 구문을 사용하려면 아래와 같이 `on duplicate key` 구문을 이용하면 된다. 

```sql
insert into 테이블(PK, co1, co2) values(PK값, 값1, 값2)
on duplicate key
update col1 = 값1, col2 = 값2
```

여기서 주의 할 점은 insert문에 꼭 PK가 존재해야만 그것을 key로 중복을 구분할 수 있다. 

만약 PK auto_increment로 지정이 되어 있어 insert문에 사용할 수 없다면 insert쿼리와 update 쿼리를 별도로 사용하는 방법밖에는 없는듯 하다....