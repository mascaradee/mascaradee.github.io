---
layout: post
date: 2020-12-22 16:13:00 +0900
title: '[java] jstl - function'
categories:
  - java
tags:
  - Java
  - jstl
  - function
---

* Kramdown table of contents
{:toc .toc}


## 참고

[jstl tag reference document](https://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/c/tld-summary.html)  

## function

function 태그는 자주 사용하는 유틸 함수의 기능을 제공한다.

```java
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
```

| Display Name | 	JSTL fmt |
|---|---|
| Version |	1.1 |
| Short Name | fn |
| URI |	http://java.sun.com/jsp/jstl/functions |


### fn:contains()

특정한 문자열의 포함여부를 확인하여 `true/false`를 반환한다. 대소문자 구분한다.  

`${fn:contains("문자열", "포함된 문자열")}`

```html
<c:set var="name" value="가 나다라 1234abcd" />
<p>contains result : ${fn:contains(name, "가나")};</p> <%-- false --%>
<p>contains result : ${fn:contains(name, "가 나")};</p> <%-- true --%>
```

### fn:containsIgnoreCase()

특정한 문자열의 포함여부를 확인하여 `true/false`를 반환한다. 대소문자 구분을 하지 않는다.  

`${fn:containsIgnoreCase("문자열", "포함된 문자열")}`

```html
<c:set var="name" value="BaNAnA" />
<p>containsIgnoreCase result : ${fn:containsIgnoreCase(name, "a")};</p> <%-- true --%>
<p>contains result : ${fn:containsIgnoreCase(name, "A")};</p> <%-- true --%>
```

### fn:startsWith()
문자열이 지정한 접두사로 시작하는지 확인하여 `true/false`를 반환한다.  

`${fn:startsWith("문자열", "접두사")}`

```html
<p>startsWith result : ${fn:startsWith('상품명]땡땡상품', '상품')};</p> <%-- true --%>
```

### fn:endsWith()

문자열이 지정한 접미사로 끝나는지 확인하여 `true/false`를 반환한다.  

`${fn:endsWith("문자열", "접미사")}`

```html
<c:set var="name" value="jstl-function-test.jsp" />
<p>endsWith result : ${fn:containsIgnoreCase(name, ".jsp")};</p> <%-- true --%>
```

### fn:escapeXml()

XML과 HTML에서 특수문자(<,>,&,',")를 이스케이프하여 XML과 HTML이 해석할 수 있는 xml 엔티티코드로 바꾼후 문자열로 반환한다.  

`${fn:escapeXml("문자열")}`

```html
<p>escapeXml result :  &ltbr/&gt</p>
<p>escapeXml result : ${fn:escapeXml("<br/>")};</p>  
<!-- 실제 html은 오른쪽과 같이 변환하여 해석한다.  <p>escapeXml result : &lt;br/&gt;;</p>   -->

```

### fn:indexOf()

지정한 문자열이 있는지를 찾아 처음 나온 곳의 인덱스를 반환한다.  

` ${fn:indexOf("문자열", "찾을 문자열")}`

```html
<p>indexOf result : ${fn:indexOf("안녕! 난, 김씨라고 해~~!!", "!")};</p>   <!-- indexOf result : 2 -->
```

### fn:length()

주어진 콜렉션 혹은 문자열의 개수를 반환한다.  

`${fn:length("콜렉션 혹은 문자열")}`

```html
<p>length result : ${fn:length("일이삼사오")};</p>  <!--length result : 5;-->
```

### fn:replace()

주어진 문자열에서 특정 문자를 모두 찾아 주어진 또 다른 문자로 변경하고 그 결과를 반환한다.  

`${fn:replace("문자열", "찾을 문자(이전 문자)", "변경 할 문자")}`

```html
<p>replace result : ${fn:replace("일이삼일사오일", "일", "1")};</p>  
<!-- replace result : 1이삼1사오1; -->
```

### fn:split()

특정한 구분자로 문자열을 나누어 **배열**로 반환한다.  

`${fn:split("문자열", "구분자")}`

```html
<c:set var="texts" value="${fn:split('뷔,슈가,제이홉,정국,진,지민,RM', ',')}"/>
<c:out value="${fn:join(texts, '-')}" />
```

### fn:join()

주어진 배열의 모든 요소를 구분자를 이용해 하나로 연결해서 **문자열**로 반환한다.  

`${fn:join(배열, "구분자")}`

```html
<br/>
<%
int[] iArr = new int[]{1, 2, 3};
%>
<c:set var="iArr" value="<%=iArr%>"/>
<p>join result : ${fn:join(iArr, "%")};</p>  
<br/>
```

### fn:substring()

주어진 문자열을 시작인덱스부터 종료인덱스 전(미포함)까지 문자열을 잘라 반환한다. 공백도 한 문자로 인식한다.  

`${fn:substring("문자열", 시작인덱스, 종료인덱스)}`

```html
<p>substring result : ${fn:substring('상품명] 맛있는 땡땡상품이 있습니다.', 5, 10)};</p>
<%-- substring result : 맛있는 땡; --%>
```

### fn:substringAfter()

주어진 문자열에서 구분자를 찾아, 처음으로 나온 이후부터 새로운 문자열로 생성하여 반환한다.  

`${fn:substringAfter("문자열", "구분자")}`

```html
<p>substringAfter result : ${fn:substringAfter('사과-바나나-귤-포도-블루베리', '-')};</p>
<%-- substringAfter result : 바나나-귤-포도-블루베리; --%>
```

### fn:substringBefore()

주어진 문자열에서 구분자를 찾아 처음으로 구분자가 나온 곳까지 새로운 문자열로 생성하여 반환한다.  

`${fn:substringBefore("문자열", "구분자")}`

```html
<p>substringBefore result : ${fn:substringBefore('사과-바나나-귤-포도-블루베리', '-')};</p>
<%-- substringBefore result : 사과; --%>
```

### fn:toLowerCase()

문자열을 모두 소문자로 변환하여 반환한다.  

`${fn.toLowerCase("문자열")}`

```html
<p>toLowerCase result : ${fn:toLowerCase('The Little Prince')};
</p> <%-- toLowerCase result : the little prince; --%>
```

### fn:toUpperCase()

문자열을 모두 대문자로 변환하여 반환한다.  

`${fn.toUpperCase("문자열")}`

```html
<p>toUpperCase result : ${fn:toUpperCase('The Little Prince')};</p>
<%-- toUpperCase result : THE LITTLE PRINCE;--%>
```

### fn:trim()

문자열의 처음과 끝의 공백만 제거한 후 반환한다.  

`${fn.trim("문자열")}`

```html
<p>trim result : ${fn:trim(' The Little Prince ')};</p>
<%-- trim result : The Little Prince;--%>
```
