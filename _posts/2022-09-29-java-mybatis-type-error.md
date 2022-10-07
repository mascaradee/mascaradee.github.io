---
layout: post
date: 2022-09-29 09:05:00 +0900
title: '[java] mybatis type error '
categories:
  - java
tags:
  - mybatis
  - typeError
---

* Kramdown table of contents
{:toc .toc}

## 참고
https://kkulbung.tistory.com/entry/Springboot-%EB%AA%87-%EA%B0%80%EC%A7%80-mybatis-%EC%98%A4%EB%A5%98

## 오류해결

### 현상

잘되던 목록조회가 아래와 같은 에러로 조회되지 않고 있다. 


```

2022-09-29 08:35:36.055 ERROR 20444 --- [nio-8888-exec-2] jdbc.sqltiming                           : 1. ResultSet.getInt(interest_keyword_nm_ko)

Caused by: com.mysql.cj.exceptions.DataConversionException: Cannot determine value type from string '전자/가전'
  at com.mysql.cj.result.AbstractNumericValueFactory.createFromBytes(AbstractNumericValueFactory.java:66)
  at com.mysql.cj.protocol.a.MysqlTextValueDecoder.decodeByteArray(MysqlTextValueDecoder.java:134)
  at com.mysql.cj.protocol.result.AbstractResultsetRow.decodeAndCreateReturnValue(AbstractResultsetRow.java:133)
  at com.mysql.cj.protocol.result.AbstractResultsetRow.getValueFromBytes(AbstractResultsetRow.java:241)
  at com.mysql.cj.protocol.a.result.ByteArrayRow.getValue(ByteArrayRow.java:91)
  at com.mysql.cj.jdbc.result.ResultSetImpl.getObject(ResultSetImpl.java:1296)
  ... 172 common frames omitted
```


### 원인

VO에 builer 어노테이션을 선언했기 때문에 ?
```
@Builder
```



### 해결

아래 어노테이션도 추가로 한다. 

```
@AllArgsConstructor
@NoArgsConstructor
```

## mybatis에서 등록 후 자동부여되는 순번을 돌려받고 싶으면 아래 속성을 추가한다. 

useGeneratedKeys="true" keyProperty="interestKeywordAutoSn"

```
<insert id="insertInterestCategory" useGeneratedKeys="true" keyProperty="interestKeywordAutoSn">
```