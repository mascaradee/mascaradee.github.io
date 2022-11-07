---
layout: post
date: 2022-11-07 09:05:00 +0900
title: '[java] mybatis VO 내 멀티리스트를 등록해야 하는 경우'
categories:
  - javascript
tags:
  - java
  - mybatis
  - multiList
  - foreach
  - parameter-maker
  - string-substitution
---

* Kramdown table of contents
{:toc .toc}

## 참고

[마이바티스 리스트 요소 매핑](https://stackoverflow.com/questions/59352991/accessing-list-element-by-index-in-mybatis-mapping)

## VO안에 item으로 list가 여러개 있는 경우 등록을 한번에 처리 하고 싶을 때 


```java
// vo.java
@Data
public class MemberInfo implements Serializable {
  private static final long serialVersionUID = -354716836560895249L;

  private String id;
  private List<String> accountNameList;
  private List<String> bankList;
```

여기서 주의점은 List를 생성할 때 list.of 등의 메소드를 사용하면 

```java
// service.java

BankInfo newBankInfo = new BankInfo();

List<String> accountNameList = new ArrayList<>();
accountNameList.add("김가나");
accountNameList.add("이다라");

List<String> bankList = new ArrayList<>();
bankList.add("기업은행");
bankList.add("국민은행");


newBankInfo.setAccountNameList(accountNameList);
newBankInfo.setBankList(bankList);
newBankInfo.setId("100001");

mapper.insertTest(newBankInfo);
```


```java
// mapper.java
void insertTest(BankInfo BankInfo);     
```

마이바티스 영역은 자바영역이므로 자바문법을 그래로 적용하면 된다. 
그런데 `list.get(index)`는 적용되지 않으므로 `list[index]` 형태를 사용해야 한다.  왜인지는 TBD


```xml
<!-- xml -->
<insert id="insertTest">
    insert into bank_info
    (
        id,
        accnt_owner_nm,
        bank_nm
    )
    values
    <foreach collection="accountNameList" item="account" index="index" separator=",">
    (
        #{id},
        #{account}, -- accountNameList
        #{bankList[${index}]} -- bankList 
    )
    </foreach>
</insert>
```



`JDBC prepared statement`상에서 파라미터 메이커(parameter maker), `#{}`는 사용되는 곳이 제한되어 있다. 우리 보통 사용하는 값 바인딩 자리에 주로 사용된다. 
`${}`는 문자열대체(string substitution)다. 

아래 예시를 보자.

```java
Map<String, Object> parms = new HashMap<String, Object>();
parms.put("table", "foo");
parms.put("criteria", 37);
List<Object> rows = mapper.generalSelect(parms);
```

테이블명에는 `#{...}`(파라미터 메이커)가 아닌  `${...}`(문자열대체)를 사용할 수 밖에 없다. 

```sql
<select id="generalSelect" parameterType="map">
  select * from ${table} where col1 = #{criteria}
</select>
```

마이바티스틑 아래와 같이 해석하게 된다. 

```sql
select * from foo where col1 = ?
```


하지만 `${}` SQL 주입 시 문제가 발생할 가능성과 `dates`타과 같은 복합타입을 사용할 때 문제가 발생할 수 있어 `#{}`을 사용하는 것이 권장된다. 

