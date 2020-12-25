---
layout: post
date: 2020-12-22 16:13:00 +0900
title: '[JSP] JSTL - core'
categories:
  - jsp
tags:
  - java
  - jstl
  - core
  - jsp
---

* Kramdown table of contents
{:toc .toc}


## 참고

[jstl tag reference document](https://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/c/tld-summary.html)  
[jstl의 이해 및 실습 by 구루비](http://wiki.gurubee.net/pages/viewpage.action?pageId=26740270)

## jstl 이란?

- `JSTL`이란 `JSP 표준라이브러리(JSP Standard Tag Library)` 이다.  
- `JSP`에서 사주 사용하는 기능(반복과 조건, 데이타 관리 포맷, XML 조작, 데이타베이스 액세스)을 구현하는 커스텀 태그 라이브러리 모음이다.  
- 시간, 날짜, 숫자의 포맷이나 문자열 가공등의 처리에서 비즈니스로직과 프리젠테이션 로직을 분리할 수 있게 해준다.  
- `JSTL`은 `EL(Expression Language)`를 사용하여 표현한다.  

## jstl 사용

`jstl`을 쓰기위해서는 아래와 같이 태그 라이브러리 선언을 해야 한다.   

`<%@ taglib prefix="접두사(Short Name)" uri="URI" %>`

```java
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

## core

가장 많이 사용하는 태그로 변수선언, 조건/제어/반복문 등의 기능을 제공한다.

| Tag | Library Information |
|---  |---|
| Display | Name	JSTL core |
| Version |	1.1 |
| Short Name | 	c |
| URI |	http://java.sun.com/jsp/jstl/core |


### c:catch

`Body`에서 실행되는 코드의 예외 처리를 하는 태그이다.  

`<c:catch var="예외를 담을 변수명"/></c:catch>`

```html  
<c:catch var="myException">
  <%= 1/0 %>
</c:catch> <br/>

Error Msg: ${myException} <br/> <%-- java.lang.ArithmeticException: / by zero --%>
```

### c:choose / c:when / c:otherwise

자바의 `Switch` 문과 비슷하다.  
`<c:when>`는 `case:`, `<c:otherwise>`는 `default:` 부분과 같다고 볼 수 있다.

```
<c:choose>
  <c:when test="조건식">결과</c:when>
  <c:when test="조건식">결과</c:when>
  <c:when test="조건식">결과</c:when>
  <c:otherwise>결과</c:otherwise>
</c:choose>
```

```html
<c:set var="month" value="${12}"/>
<c:choose>
  <c:when test="${month == 1}"> 이번달은 ${month}월 입니다. </c:when>
  <c:when test="${month == 12}"> 이번달은 ${month}월 입니다. </c:when> <%-- 이 부분의 조건식에 맞아 여기 부분이 출력이 된다. %>
  <c:otherwise> 잘못 넣은듯 </c:otherwise>
</c:choose>
```

### c:if

조건문 `if`와 동일하다.  

`<c:if test="조건식" [var="조건식 결과를 담을 변수명"] [scope="조건식 결과 변수의 유효 범위"]></c:if>`

```html
<c:set var="applePrice" value="10000"/>
<c:if test="${applePrice > 5000}" var="apple" scope="page"> 사과는 비싸네 </c:if> <%-- scope의 기본값은 'page'이므로 굳이 명시할 필요는...%>
<br/>
사과는 비싸나?
<c:if test="${apple}">응 겁나 비싸</c:if>
```

### c:import

명시된 url의 자원을 불러온다. url에는 절대적 경로 혹은 상대적 경로 모두 사용 가능하다.  

 `<c:import url="불러올 자원의 URL" [var="변수명"] [scope="유효범위"][varReader="변수명(Reader타입)"][context="컨텍스트명"] [charEncording="캐릭터셋"]`

```html
<!-- 절대경로 -->
<c:import url="https://www.daum.net"></c:import> --%>

<!-- 상대경로 -->
<c:import url="../html/jstl-core-import-test.html"></c:import>
```

### c:forEach

기본적인 반복문을 실행하는 태그로 다양한 컬렉션 타입을 허용한다.

```
<c:forEach
  [var="현재 아이템의 변수명, items 중 현재 값"]
  [items="반복할 데이터 모음, 콜렉션명"]
  [begin="시작값 인덱스"]
  [end="종료값 인덱스"]
  [step="증가값"]
  [varStatus="반복 상태값을 지닌 변수"] >
</c:forEach>
```

#### varStatus 속성

- current : 현재 아이템
- index : 0부터의 인덱스
- count : 1부터의 인덱스
- first : 현재 루프가 처음인지 확인
- last : 현재 루프가 마지막인지 확인
- begin : forEach문의 시작 값
- end : forEach문의 끝 값
- step : forEach문의 증가 값
[status 참고](https://noritersand.github.io/html/html-jstl-core/#heading-foreach)

```html  
<%
java.util.List list = new java.util.ArrayList();
java.util.Map map = new java.util.HashMap();
map.put("name","apple");
list.add(map);
map = new java.util.HashMap();
map.put("name","banana");
list.add(map);
map = new java.util.HashMap();
map.put("name","orange");
list.add(map);
request.setAttribute("fruits", list);
%>
<c:forEach var="fruit" items="${fruits}" varStatus="status">
	<p>${status.count}번 째 과일은  ${fruit.name} 이다.</p>
	<p>현재 아이템: ${status.current}</p>
	<p>현재 인덱스: ${status.index}
	<p>첫번째 아이템인지? ${status.first}</p>
	<p>마지막번째 아이템인지? ${status.last}</p>
  <p>---</p>
</c:forEach>

<!--
1번 째 과일은 apple 이다.
현재 아이템: {name=apple}
현재 인덱스: 0
첫번째 아이템인지? true
마지막번째 아이템인지? false
---
2번 째 과일은 banana 이다.
현재 아이템: {name=banana}
현재 인덱스: 1
첫번째 아이템인지? false
마지막번째 아이템인지? false
---
3번 째 과일은 orange 이다.
현재 아이템: {name=orange}
현재 인덱스: 2
첫번째 아이템인지? false
마지막번째 아이템인지? true
-->

<c:forEach var="i" begin="1" end="10" step="2" varStatus="status">
	<p>시작인덱스: ${status.begin}</p>
	<p>종료인덱스: ${status.end}</p>
	<p>증가값: ${status.step}</p>
	<p>1부터 10까지 숫자 중 ${status.count}번 째 홀수는 무엇? ${i}</p>
  <p>---</p>
</c:forEach>

<!--
시작인덱스: 1
종료인덱스: 10
증가값: 2
1부터 10까지 숫자 중 1번째 홀수는 무엇? 1
---
시작인덱스: 1
종료인덱스: 10
증가값: 2
1부터 10까지 숫자 중 2번째 홀수는 무엇? 3
---
시작인덱스: 1
종료인덱스: 10
증가값: 2
1부터 10까지 숫자 중 3번째 홀수는 무엇? 5
---
시작인덱스: 1
종료인덱스: 10
증가값: 2
1부터 10까지 숫자 중 4번째 홀수는 무엇? 7
---
시작인덱스: 1
종료인덱스: 10
증가값: 2
1부터 10까지 숫자 중 5번째 홀수는 무엇? 9
---
-->
```

### c:forTokens

지정한 구분자로 문자열을 쪼개준다. `java.util.StringTokenizer`와 동일히다.

```
<c:forTokens
items="반복할 토큰 문자열"
delims="구분자, 여러 개 가능"
[begin="시작값 인덱스, 기본값 0"]
[end="종료값 인덱스"]
[step="증가값"]
[var="현재 아이템의 변수명, items 중 현재 값"]
[varStatus="반복 상태값을 지닌 변수"] >
</c:forTokens>
```

```html
<c:forTokens items="도*레*미*파*솔!라!시" delims="*!" varStatus="status">
<p>${status.current}</p>
</c:forTokens>

<!--
도
레
미
파
솔
라
시
-->
```

### c:out

`<%= %>` 대체

`<c:out value="값" [default="기본값, value가 null일 경우 사용"][escapeXml="true/false 이스케이프여부로 기본값은 true"]></c:out>`

```html
<c:out value="${value}" default="값 없음"/><br/>
<!-- 값 없음 -->

<c:set var="outValue" value="Hello, World"></c:set>
<c:out value="${outValue}" default="값 없음"/><br/>
<!-- Hello, World -->

<c:out value="&lt; &gt;" escapeXml="true"/><br/> <!-- &amp;lt;&amp;gt; -->
<c:out value="&lt; &gt;" escapeXml="false"/><br/> <!-- &lt;&gt; -->
<!--
&lt; &gt;
< >
-->
```

### c:param

`import` 태그 `url`에 파라미터를 추가한다.  

`<c:param name="쿼리스트링 파라미터명" [value="파라미터 값"]></c:param>`

```html
<c:import url="../html/jstl-core-import-test.html">
	<c:param name="name" value="macs"></c:param>
	<c:param name="age" value="5"></c:param>
</c:import>
```

```html
<!-- jstl-core-import-test.html -->
<body>
jstl core impret test로 추가된 페이지<br/>
이름: ${param.name}<br/>  <%-- 이름: macs --%>
나이: ${param.age}<br/>  <%-- 나이: 5 --%>
</body>
```

### c:redirect

새 `url`로 리디렉션한다. `response.sendRedirect()`를 대체한다.  

`<c:redirect [url="이동할 URL"][context=""]></c:redirect>`

```html
<c:redirect url="../html/jstl-core-import-test.html"/>
```

### c:set / c:remove

`set`은 `JSP`의 `setAttribute()`와 같은 역할을 한다. 변수를 세팅하고 유효범위로는 `page(기본), request, session, application`를 사용한다.  
`remove`는 `JSP`의 `removeAttribute()`와 같은 역할을 한다. `page, request, session, application `범위의 변수를 제거한다.  

`<c:set [var="세팅할 변수명"][value="할당된 값"][target="target"][property="프로퍼티명"][scope="변수의 유효범위"]></c:set>`
`<c:remove var="제거할 변수명" [scope="제거할 범위"]></c:remove>`

`var` 속성과 `target` 속성은 동시에 사용할 수 없다.

```html   
<c:set var="country" value="Korea" />
set :
<c:out value="${country}"/>
<br/>
<c:remove var="country" />
remove :  
<c:out value="${country}"/>
<br/>

<!--
set : Korea
remove :
-->
```

`target` 속성은 `html`에서 객체 생성 후 사용하거나 기존 객체의 `getter/setter`를 이용하는 방식이다.   

```html
<html:useBean id="map1" class="java.util.HashMap"/>
<c:set target="${map1}" property="hi" value="hello world!"/> //> // map.put("hi", "hello world!")
<c:out value="${map1.hi}"/>  // map.get("hi")

<!--
hello world!
-->
```

### c:url

쿼리 파라미터를 이용해 `url`을 만든다.  

`<c:url [var="변수명"][scope="유효범위"][value="URL"][context="상대경로를 정할때 사용하는 컨텍스트명"]></c:url>`

```html
<a href="<c:url value='../html/jstl-core-import-test.html' />">
   View Test
</a>
```
