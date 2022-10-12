---
layout: post
date: 2022-10-11 09:05:00 +0900
title: '[mybatis] NumberFormatException'
categories:
  - mybatis
tags:
  - NumberFormatException
---

* Kramdown table of contents
{:toc .toc}

## 마이바티 NumberFormatException 해결방안


### 문제 

```
nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: java.lang.NumberFormatException: For input string: "Y"
### Cause: java.lang.NumberFormatException: For input string: "Y"
```

```xml
<if test="confirmYn != null and confirmYn == 'Y'">
    and confirmYn is not null
</if>
```


### 해결


해결은 아래처럼, 자바 문자열 비교와 같이 해결하면 된다. `""(쌍따옴표)`는 문자열, `''(홑따옴표)`는 `char`를 의미한다.

```xml
 <if test='confirmYn != null and confirmYn.equals("Y")'>
    and confirmYn is not null
</if>
```

아래처럼 홑따옴표, 쌍따옴표의 위치가 바뀌면 에러가 나니 주의

```xml
 <if test="confirmYn != null and confirmYn.equals('Y')">
    and confirmYn is not null
</if>
```
