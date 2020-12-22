---
layout: post
date: 2020-12-22 16:13:00 +0900
title: '[java] jstl - fmt'
categories:
  - java
tags:
  - Java
  - jstl
  - fmt
---

* Kramdown table of contents
{:toc .toc}


## 참고

[jstl tag reference document](https://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/c/tld-summary.html)  
[JSTL-fmt by 놀이터 흙이 제맛](https://noritersand.github.io/jsp/jsp-jstl-fmt/#heading-bundle)  
[JSP JSTL(JSP Standard Tag Library) - 국제화 태그(포맷팅) by 갱짱.study](https://gangzzang.tistory.com/entry/JSP-JSTLJSP-Standard-Tag-Library-%EA%B5%AD%EC%A0%9C%ED%99%94-%ED%83%9C%EA%B7%B8%ED%8F%AC%EB%A7%B7%ED%8C%85)  
[STL의 이해 및 활용 by gurubee](http://wiki.gurubee.net/pages/viewpage.action?pageId=26740270)  

## fmt

포맷팅 라이브러리, 숫자, 날짜, 시간을 포맷팅하는 기능과 국제화, 다국어 지원기능을 제공한다.

```java
<%@ taglib prefix="fmt" uri="http://java.sun.com/html/jstl/fmt" %>
```

| Display Name | 	JSTL fmt |
|---|---|
| Version |	1.1 |
| Short Name | fmt |
| URI |	http://java.sun.com/jsp/jstl/fmt |


### fmt:requestEncoding

요청 파라미터의 캐릭터 인코딩을 설정한다. `request.setCharacterEncoding()`와 같음.  

`<fmt:requestEncoding [value="charsetName"] />`

```html
<fmt:requestEncoding value="UTF-8" />`
```

### fmt:setLocale

다국어 지원 페이지를 만들 때 각 국가별 `Locale`을 지정한다. `Locale`은 언어코드(ISO-639 코드, 한국어 = ko, 필수)와 국가코드(ISO-3166 코드, 한국 = KR)로 구성되어 있는데 2개를 모두 사용할 경우 하이픈이나 언더바를 이용해 구분한다.  

`<fmt:setLocale value="locale" [variant="variant"][scope="page|request|session|application"] />`

```html
<%=response.getLocale()%> <!-- ko_KR  별도 지정을 하지 않으면 톰캣 서버의 기본 밧으로 설정됨-->

<fmt:setLocale value="ko"/>
<%=response.getLocale()%> <!-- ko -->

<fmt:setLocale value="ja"/>
<%=response.getLocale()%> <!-- ja -->

<fmt:setLocale value="en"/>
<%=response.getLocale()%> <!-- en -->
```

### fmt:timeZone, fmt:setTimeZone

특정 시간대를 설정한다. `America/Los_Angeles` 혹은 `GMT-8`로 시간대를 설정한다.

`<fmt:timeZone value="시간대"></fmt:timeZone>`  
`<fmt:setTimeZone value="시간대" [var="시간대 변수명"][scope="page|request|session|application"] />`

```html
<fmt:setLocale value="ko_KR"/>
<jsp:useBean id="now" class="java.util.Date"/>

<c:out value="${now}"/>
<!-- Tue Dec 22 11:02:36 KST 2020 -->

Seoul KST: <fmt:formatDate value="${now}" type="both" dateStyle="full" timeStyle="full"/>
<!-- Seoul KST: 2020년 12월 22일 화요일 오전 11시 02분 36초 KST -->

<fmt:timeZone value="GMT">
London GMT: <fmt:formatDate value="${now}" type="both" dateStyle="full" timeStyle="full"/>
</fmt:timeZone>
<!-- London GMT: 2020년 12월 22일 화요일 오전 2시 02분 36초 GMT -->

<fmt:timeZone value="GMT-8">
NewYork GMT-8: <fmt:formatDate value="${now}" type="both" dateStyle="full" timeStyle="full"/>
</fmt:timeZone>
<!-- NewYork GMT-8: 2020년 12월 21일 월요일 오후 6시 02분 36초 GMT-08:00 -->
```

### fmt:bundle, fmt:setBundle, fmt:message, fmt:param

- `fmt:bundle`: `properties` 확장자를 사용하는 자원 파일을 읽어오는 역할을 한다.  
- `fmt:message` : 지정한 리소스 번들로부터 메시지를 읽어와 Locale에 맞춰 메시지를 매핑하여 출력한다.   
- `fmt:setBundle` : 지정한 리소스 번들을 변수에 담아 유효범위 내에서 사용한다.  
```
<fmt:bundle basename="리소스번들명" [prefix="문자열"]>
  <fmt:message [key="조회할 메시지 매핑키"]
               [bundle="<fmt:setBundle>태그를 사용해서 로딩한 번들로부터 메시지를 읽어올 때 사용"]
               [var="메시지를 저장할 변수명"]
               [scope="page|request|session|application"]>
  </fmt:message>
</fmt:bundle>
```
`<fmt:setBundle basename="리소스번들명" [var="변수명"] [scope="page|request|session|application"]></fmt:setBundle>`

```html
<%-- <fmt:setLocale value="en" />  영어로 보고싶을때 주석풀기--%>
<fmt:bundle basename="bundle.TestBundle">
	<fmt:message key="TITLE" var="title"/>
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<title>${title}</title>
		</head>
		<body>
			<fmt:message key="COUNTRY"/><br>
      <fmt:message key="WELCOME">
   			<fmt:param value="${param.id}"/> <%--왜 안나오눈지 몰겠다 --%>
  		</fmt:message>
  		<br/>로그: <c:out value="${param.id}"></c:out>
		</body>
	</html>
</fmt:bundle>
```

예제로 `\WEB-INF\classes\bundle` 경로에 다음의 `properties` 파일 두 개를 작성하고 테스트 해 본다.  

`TestBundle_ko.properties`  

프로퍼티 파일은 유니코드(한글)를 지원하지 않아 아래와 같이 유니코드 이스케이프 시퀀스로 변경이 되어 저장된다.

```
TITLE=\uACF5\uBD80\uD558\uB294 \uB9E5\uC2A4 // 공부하는 맥스
COUNTRY=\uD55C\uAD6D // 한국
WELCOME=\uD658\uC601\uD569\uB2C8\uB2E4 {0} // 환영합니다.
```

`TestBundle.properties`

```
TITLE=studying macs
COUNTRY=Korea
WELCOME=Welcome {0}
```

### fmt:formatNumber

숫자형식을 숫자, 통화, 백분율 중 하나로 포맷팅한다. `(Number -> String)`

```
<fmt:formatNumber
      [value="포맷을 변경할 값"]
      [type="숫자|통화|퍼센트"]
      [pattern="커스텀 포맷"]
      [currencyCode="ISO 4217 통화코드. 통화타입일때만 적용"]
      [currencySymbol="통화기호, 통화타입일때만 적용"]
      [groupingUsed="구룹핑 구분자 포함여부"]
      [maxIntegerDigits="정수결과 최대 자리수"]
      [minIntegerDigits="정수 결과 최소 자리수"]
      [maxFractionDigits="소수 결과 최대 자리수"]
      [minFractionDigits="소수 결과 최소 자리수"]
      [var="포맷팅된 변수명"]
      [scope="page|request|session|application"] >
</fmt:formatNumber>
```

```html
<p>number  : <fmt:formatNumber value="1234567.89" type="number"/></p>
<p>currency : <fmt:formatNumber value="1234567.89" type="currency" currencySymbol="￦" /> </p>
<p>percent : <fmt:formatNumber type="percent">0.159</fmt:formatNumber></p>
<p>pattern=".000"    :<fmt:formatNumber value="1234567.1" pattern=".000" /></p>
<p>pattern="#,#00.0#":<fmt:formatNumber value="1234567.891" pattern="#,#00.0#"/></p>

<!-- 결과
number : 1,234,567.89
currency : $1,234,568
percent : 16%
pattern=".000" :1234567.100
pattern="#,#00.0#":1,234,567.89
-->
```

### fmt:parseNumber

`formatNumber`와 반대로 숫자, 통화 또는 백분율의 문자열 표현을 숫자로 변환한다. `(String → Number)`  

```
<fmt:parseNumber
    [value="숫자로 변환할 문자열"]
    [type="숫자|통화|퍼센트"]
    [pattern="커스텀 포맷"]
    [parseLocale="파싱할 때 사용할 로케일"]
    [integerOnly="정수 부분만 변환할지 여부"]
    [var="변환된 변수명"]
    [scope="page|request|session|application"] >
>
</fmt:parseNumber>
```

```html
<p>number  : <fmt:parseNumber value="1,234,567.89" type="number"/></p>
<p>currency : <fmt:parseNumber value="12345.1234abcdef" integerOnly="false" type="number" /></p>

<!--
number : 1234567.89
currency : 12345.1234 // 숫자만 변환이 되고 integerOnly="false"로 정수,소수 상관없이 모두 숫자로 변환
-->
```

### fmt:formatDate

제공된 스타일과 패턴을 사용하여 날짜 또는 시간 형식을 포맷팅한다.  

```
<fmt:formatDate
  value="포맷팅할 날짜나 시간"
  [type="time|date|both"]
  [dateStyle="default|short|medium|long|full - 미리 정의된 날짜형식(java.text.DateFormat) 날짜, 시간+날짜 타입일때만 적용"]
  [timeStyle="default|short|medium|long|full - 미리 정의된 시간형식(java.text.DateFormat) 시간, 시간+날짜 타입일때만 적용"]
  [pattern="커스텀 포맷"]
  [timeZone="타임존"]
  [var="변수명"]
  [scope="page|request|session|application"]
>
</fmt:formatDate>
```

```html
<c:set var="now" value="<%= new java.util.Date() %>" />
<p> date full : <fmt:formatDate value="${now}" type="date" dateStyle="full" /></p>
<p> date short : <fmt:formatDate value="${now}" type="date" dateStyle="short" /></p>
<p> time : <fmt:formatDate value="${now}" type="time" /></p>
<p> both full : <fmt:formatDate value="${now}" type="both" dateStyle="full" timeStyle="full" /></p>
<p> pattern 1 : <fmt:formatDate value="${now}" pattern="yyyy-MM-dd aa hh:mm:ss" /></p>
<p> pattern 2 : <fmt:formatDate value="${now}" pattern="yyyy-MM-dd  hh:mm:ss" /></p>
<!--
date full : 2020년 12월 22일 화요일
date short : 20. 12. 22
time : 오후 4:54:09
both full : 2020년 12월 22일 화요일 오후 4시 54분 09초 KST
pattern 1 : 2020-12-22 오후 04:54:09
pattern 2 : 2020-12-22 04:54:09
-->
```

### fmt:parseDate

날짜 및 / 또는 시간의 문자열 표현을 Date 객체로 변환한다.  

```
<fmt:parseDate
  [value="날짜객체로 변환될 문자열"]
  [type="time|date|both"]
  [dateStyle="default|short|medium|long|full"]
  [timeStyle="default|short|medium|long|full"]
  [pattern="커스텀 포맷"]
  [timeZone="시간대를 변경하고 싶을 때"]
  [parseLocale="파싱할 때 사용할 로케일"]
  [var="변수명"]
  [scope="page|request|session|application"]
></fmt:parseDate>
```

```html
<fmt:parseDate value="2020-12-22 17:02:23" pattern="yyyy-MM-dd HH:mm:ss" var="date" /> ${ date }
<!-- Tue Dec 22 17:02:23 KST 2020 -->
```
