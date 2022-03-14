---
layout: post
date: 2020-12-09 22:00:00 +0900
title: '[jQuery] ajax'
categories:
  - jQuery
tags:
  - ajax
---

* Kramdown table of contents
{:toc .toc}


## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- ajax      
[https://api.jquery.com/category/ajax/](https://api.jquery.com/category/ajax/)

# ajax  

## pure javascript로 AJAX를 구현하는 방법(참고)

```js
function loadDoc() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('demo').innerHTML = xhr.responseText;
		}
	};
	xhr.open('GET', 'test2.html');
	xhr.send();
}
```

## jQuery.get()

HTTP get 방식으로 데이터를 서버에서 받아오는 메서드.  

### 첫 번째 사용방법

간단하게 한줄로 쭉 나열해서 보낸다.  

`jQuery.get( url [, data ] [, success ] [, dataType ] )`
- `url` :  요청을 보낼 주소
- `[, data]` : (옵션) 요청과 함께 서버로 보내지는 객체 혹은 문자열  
- `[, success]` : (옵션) 요청이 성공하면 서버에서 호출할 콜백함수, 데이터타입이 있으면 필수
- `[, dataType]` : (옵션) 서버로부터 받은 데이터의 타입.

```html
<div>
  <p>jQuery.get()</p>
  <button type="button" onclick="getSimpleString()">getSimpleString()</button><br>
  <button type="button" onclick="getSimpleJSON()">getSimpleJSON()</button><br>
  <button type="button" onclick="getLittleTinyHtml()">getLittleTinyHtml()</button><br>
  <br>
</div>
```
```js
// 텍스트 받아오기
function getSimpleString() {
	$.get('/ajaxtest/getSimpleString.do', function(resp) {
		console.log(resp);
	}, 'text'); // 'text' 부분은 서버로부터 받은 결과의 dataType을 명시하는 위치이며, 생략할 경우 response의 MIME type에 의존하여 jQuery가 알아서 처리한다.
}
/*
[결과] hello mother forker
*/

// JSON 받아오기
function getSimpleJSON() {
  // $.get('/ajaxtest/getSimpleJSON.do', 'a=1&b=2', function(resp) {
  //  object형식으로 세팅해도 서버에는 쿼리스트링형식으로 넘어간다.
  $.get('/ajaxtest/getSimpleJSON.do', { name: 'John', time: '2pm' }, function(resp) {
		console.log(resp);
	});
}
/*
[결과] {name: "park", age: 22, receivedData: "name=[John], time=[2pm]", success: true}
*/

// html 받아오기
function getLittleTinyHtml() {
	$.get('/ajaxtest/getLittleTinyHtml.do', function(resp) {
		console.log(resp);
		$('#result').html(resp);
	});
}
/*
[결과] <p>안녕 나는 작은 머더forker야</p>
*/
```
```java
@Controller
public class AjaxTestController {

	private void doResponse(HttpServletResponse resp, String contentType, String value) throws IOException {
		resp.setStatus(200);
		resp.setContentType(contentType);
		PrintWriter out = resp.getWriter();
    out.print(value);
	}

	@GetMapping(path = "/ajaxtest/getSimpleString.do")
	public void getSimpleString(HttpServletResponse resp) throws IOException {
		doResponse(resp, "text/html;charset=UTF-8", "hello mother forker?");
	}

	@GetMapping(path = "/ajaxtest/getSimpleJSON.do")
	public void getSimpleJSON(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String receivedData = RequestUtil.getRequestParameter(req).toString();
		logger.debug(receivedData);

		JsonObject object = new JsonObject();
		object.addProperty("name", "park");
		object.addProperty("age", 22);
		object.addProperty("receivedData", receivedData);
		object.addProperty("success", true);

		doResponse(resp, "application/json;charset=UTF-8", new Gson().toJson(object));
	}

	@GetMapping(path = "/ajaxtest/getLittleTinyHtml.do")
	public ModelAndView getLittleTinyHtml(ModelAndView mv) {
		mv.setViewName("/ajaxtest/littleTinyHtml"); // 별도 jsp 파일 있음
		return mv; // 리턴이 ModelAndView이면 스프링 세팅으로 자동으로 넘어감
	}
}
```
```jsp
// ajaxtest/littleTinyHtml.jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<p>안녕 나는 작은 머더forker야</p>
```

### 두 번째 사용방법

파라미터를 객체로 만들어서 요청한다.  

`jQuery.get( [settings ] )`
- `[settings ]` : 객체 안에 요청 관련 프로퍼티를 담는다. `url`을 제외하곤 모두 옵션이다.  

```html
<div>
  <button type="button" onclick="getSimpleString2()">getSimpleString2()</button><br>
  <button type="button" onclick="getSimpleJSON2()">getSimpleJSON2()</button><br>
  <button type="button" onclick="getLittleTinyHtml2()">getLittleTinyHtml2()</button><br>
</div>
```
```js
function getSimpleString2() {
	var settings = {
		url: '/ajaxtest/getSimpleString.do',
		success: function(resp) {
			console.log(resp); // hello mother forker?
		}
	};
	$.get(settings);
}
function getSimpleJSON2() {
	$.get({
		url: '/ajaxtest/getSimpleJSON.do',
		data: 'a=1&b=2',
		success: function(resp) {
			console.log(resp); // {name: "park", age: 22, receivedData: "a=[1], b=[2]", success: true}
		}
	});
}
function getLittleTinyHtml2() {
	$.get({
		url: '/ajaxtest/getLittleTinyHtml.do',
		success: function(resp) {
			console.log(resp); // <p>안녕 나는 작은 머더forker야</p>
			$('#result').html(resp);
		}
	});
}
```

## jQuery.post()

기본적인 사용방법은 `jQuery.get()`과 거의 같으나, `data`부분은 `querystring`이 아니라 `formdata`로 전송된다.   

`jQuery.post( url [, data ] [, success ] [, dataType ] )`
- `url` :  요청을 보낼 주소
- `[, data]` : (옵션) 요청과 함께 서버로 보내지는 객체 혹은 문자열  
- `[, success]` : (옵션) 요청이 성공하면 서버에서 호출할 콜백함수, 데이터타입이 있으면 필수
- `[, dataType]` : (옵션) 서버로부터 받은 데이터의 타입.

`jQuery.post( [settings ] )`
- `[settings ]` : (옵션) 객체 안에 요청 관련 프로퍼티를 담는다. `url`을 제외하곤 모두 옵션이다.  

```js
function getSimpleJSONWithPost() {
  // 한 줄로 쭉 나열
  /*
  $.post('/ajaxtest/getSimpleJSONWithPost.do', 'a=1&b=2', function(resp) {
    console.log(resp);
  });
  */

  // 파람미터를 객체로
	$.post({
		url: '/ajaxtest/getSimpleJSONWithPost.do',
		data: { name: 'John', time: '2pm' }, // data: {자바스크립트 객체} 혹은 data: 'a=1&c=3' (쿼리스트링) 으로 크게 2가지 형식을 쓴다. 파일을 보내는 형식은 찾아볼것!!
		dataType: 'json', // dataType은 모든 ajax API에 있는 옵션으로 응답 받은 데이터를 어떤 데이터 타입으로 파싱 혹은 핸들링 할 것인지를 의미한다. (xml/json/script/text/html)
		success: function(resp) {
			console.log(resp); // {name: "park", age: 22, receivedData: "name=[John], time=[2pm]", success: true}
		}
	});
}
```

## jQuery.ajax()

jQuery AJAX API의 가장 핵심인 메서드로 `method`에 따라 `get, post` 모두 허용한다.

`jQuery.ajax( url [, settings ] )`
- `url` : 요청을 보낼 주소
- `[settings]` : (옵션) 객체 안에 요청 관련 프로퍼티를 담는다. 모두 옵션이다.  

`jQuery.ajax( [ settings ] )`
- `[settings]` : (옵션) 객체 안에 요청 관련 프로퍼티를 담는다. 모두 옵션이다. 여기서  `url`은 현재페이지를 기본값으로 가진다.   

```js
function getSimpleString3() {
	$.ajax({
		url: '/ajaxtest/getSimpleString.do',
		method: 'get',
		data: 'a=1&b=2',
		success: function(resp) {
			console.log(resp);
		}
	});
}
function getSimpleJSONWithPost2() {
	$.ajax({
		url: '/ajaxtest/getSimpleJSONWithPost.do',
		method: 'post',
		data: { name: 'John', time: '2pm' },
		success: function(resp) {
			console.log(resp);
		}
	});
}
```

### 쓰면 안되는 예시#1

```js
function getSimpleStringSync() {
	$.ajax({
		url: '/ajaxtest/getSimpleString.do',
		method: 'get',
		async: false, // <-- 얘를 false로 하면 이 통신이 끝나기 전까지 스크립트와 화면 작동이 멈추게 됨. => 동기를 하겠다는 의미
		success: function(resp) {
			let max = 5000000000;
			for (let i = 0; i < max; i++) {}
			console.log(resp);
		}
	});
}
// getSimpleStringSync();
```

## ajax 옵션

```js
function getSome() {
	$.ajax({
		url: '/ajaxtest/getSimpleString.do',
		method: 'get', // type이라는 설정이 있으며 기능은 완전히 같다.
		async: true, // 비동기 여부, 생략할 경우 true
		beforeSend: function(jqXHR, settings) { // 통신을 보내기 전 실행함.
			console.log('before send');
			// console.log(jqXHR); // XHR를 jQuery가 가공한 jqXHR 객체
			console.log('jqXHR.status:', jqXHR.status);
			console.log('jqXHR.statusText:', jqXHR.statusText);
			console.log('jqXHR.readyState:', jqXHR.readyState);
			console.log('settings:', settings); // $.ajax()를 호출할 때 넘긴 settings 객체
		},
		cache: true, // false로 하면 브라우저에 의한 캐시를 무시한다.
		complete: function(jqXHR, textStatus) { // 통신 후 무조건 실행함. 요청이 완료된 후 success나 error 콜백 이후 실행된다.
			console.log('complete');
			console.log('jqXHR:', jqXHR);
			console.log('textStatus:', textStatus);
		},
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // request의 MIME type과 charset 설정. dataType의 반대격
		data: 'd=4&b=2',
		dataType: 'text', // 서버에서 받아온 데이터의 타입을 설정한다.  
		global: false, // default: true, 전역 AJAX 이벤트 핸들러를 트리거할 지 말지를 결정하는 설정.
		headers: { // HTTP Request 헤더를 설정하는 설정.
			abc: 'abcd',
			qwer: 'asdf',
			'X-Requested-With': 'got-you-beach'
		},
		statusCode: { // 통신 후 응답코드에 따라 실행한다.
			200: function() { console.log('유후!'); }
		},
		success: function(resp) { // 통신 후 결과가 성공이면 실행함.
			// let max = 5000000000;
			// for (let i = 0; i < max; i++) {}
			console.log('success');
			console.log('resp:', resp);
		},
		error: function(jqXHR, textStatus, errorThrown) { // 통신 후 결과가 실패면 실행함.
			console.log('fail');
			console.log('jqXHR:', jqXHR);
			console.log('textStatus:', textStatus);
			console.log('errorThrown:', errorThrown);
		}
	});
}

//[콘솔결과]
/*
before send
jqXHR.status: undefined
jqXHR.statusText: undefined
jqXHR.readyState: 0
settings: {url: "/ajaxtest/getSimpleString.do?d=4&b=2", type: "GET", isLocal: false, global: false, processData: true, …}accepts: {*: "*\/*", text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript", …}async: truebeforeSend: ƒ (jqXHR, settings)cache: truecomplete: ƒ (jqXHR, textStatus)contentType: "application/x-www-form-urlencoded; charset=UTF-8"contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/, script: /\b(?:java|ecma)script\b/}converters: {text html: true, * text: ƒ, text json: ƒ, text xml: ƒ, text script: ƒ}crossDomain: falsedataType: "text"dataTypes: ["text"]error: ƒ (jqXHR, textStatus, errorThrown)flatOptions: {url: true, context: true}global: falsehasContent: falseheaders: {abc: "abcd", qwer: "asdf", X-Requested-With: "got-you-beach"}isLocal: falsejsonp: "callback"jsonpCallback: ƒ ()method: "get"processData: trueresponseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}statusCode: {200: ƒ}success: ƒ (resp)type: "GET"url: "/ajaxtest/getSimpleString.do?d=4&b=2"xhr: ƒ ()__proto__: Object
-----> 아직 통신이 시작되기 전

success
resp: hello mother forker?
-----> 통신 성공 응답

유후!
----->응답코드에 따른 설정 실행

complete
jqXHR: {readyState: 4, getResponseHeader: ƒ, getAllResponseHeaders: ƒ, setRequestHeader: ƒ, overrideMimeType: ƒ, …}
textStatus: success
-----> 요청이 완료된 후 success나 error 콜백 이후 실행된다.
*/
```

| no | settins option  | explain                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | data type                                                        | default                                                                                                      | etc                                                                                                                                                                                      |
|----|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1  | accepts         | 서버가 응답할때 쓸 데이터 타입을 지정해 준다.         이것만 받다준다 뭐 이런 뉘앙스?  아니면 이걸 기대하니 응답할때   이 형식으로 달라 요청하는 느낌                                                                                                                                                                                                                                                                                                                                                | PlainObject                                                      | MIME type                                                                                                    |                                                                                                                                                                                          |
| 2  | async           | 동기/비동기 설정. 기본은 당연 비동기                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Boolean                                                          | true                                                                                                         | jQuery 1.8부터 jqXHR($.Deferred)과   함께 async: false 사용은 더 이상 사용되지 않습니다. jqXHR.done()과 같은 jqXHR 객체의 해당 메소드 대신   성공/오류/완료 콜백 옵션을 사용해야 합니다. |
| 3  | beforeSend      | 요청이 서버로 가기전에 수행할 일을 정의하는 함수?                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Function( jqXHR jqXHR,   PlainObject settings )                  |                                                                                                              |                                                                                                                                                                                          |
| 4  | cache           | 브라우저캐시 사용 여부                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Boolean                                                          | true, false for dataType   'script' and 'jsonp'                                                              |                                                                                                                                                                                          |
| 5  | complete        | 요청이 끝난 후, success나 error 콜백으로   응답을 받은 이후 수행되는 함수      매개변수로 jqXHR 오브젝트와 요청상태값인 문자열로 받는다.       요청상태값: "success", "notmodified", "nocontent",   "error", "timeout", "abort", or   "parsererror"                                                                                                                                                                                                                                                  | Function( jqXHR jqXHR, String textStatus   )                     |                                                                                                              |                                                                                                                                                                                          |
| 6  | contents        | 커스텀 데이터타입을 매핑할 때 사용                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | PlainObject                                                      |                                                                                                              |                                                                                                                                                                                          |
| 7  | **contentType** | 서버쪽에 어떤 타입의 요청 데이터를 보내는지 알려주는   프로퍼티      종류:       application/x-www-form-urlencoded      multipart/form-data(파일 혹은 대량의 데이터)      text/plain (텍스트)      application/json (json)                                                                                                                                                                                                                                                                           | Boolean or String                                                | application/x-www-form-urlencoded;   charset=UTF-8                                                           | [HTTP MIME 타입   참고](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)                                                                                        |
| 8  | context         | 호출에 사용된 Ajax 설정을 나타내는 객체, 호출시   만들어지는 설정?                                                                                                                                                                                                                                                                                                                                                                                                                                   | PlainObject                                                      |                                                                                                              |                                                                                                                                                                                          |
| 9  | converters      | 응답값을 지정한 데이터타입으로 변환해서 반환한다.                                                                                                                                                                                                                                                                                                                                                                                                                                                    | PlainObject                                                      | {"* text":   window.String, "text html": true, "text json":   jQuery.parseJSON, "text xml": jQuery.parseXML} |                                                                                                                                                                                          |
| 10 | crossDomain     | 크로스 도메인 여부                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Boolean                                                          | false for same-domain requests,   true for cross-domain requests                                             |                                                                                                                                                                                          |
| 11 | **data**        | 서버로 보내는 데이터       HTTP method가 GET이고 전송데이터가 {a: "bc", d: "e,f"}와 같이   오브젝트이면 URL에    "a=bc&d=e%2Cf"로 문자열이 덧붙여서 넘어간다. 단, processData=true(기본)일   경우로 이 값이 false일경우는 쿼리스트링이 만들어 지지 않고 주로 파일 전송할때 사용한다.       전송데이터의 값이 { a: [1,2] }와 같이 배열이면 URL에 a=1&a=2 로 같은 키를 이용해 넘어간다. 단,   traditional: false 일때      데이터를 문자열로 전달할때는 contentType에 맞는 인코딩을 한 상태여야 한다.  | PlainObject or String or Array                                   |                                                                                                              |                                                                                                                                                                                          |
| 12 | dataFilter      | 응답 데이터를 필터링하는 기능인듯                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Function( String data, String   type ) => Anything               |                                                                                                              |                                                                                                                                                                                          |
| 13 | **dataType**    | 서버쪽으로부터 어떤 타입의 응답 데이터를 받을 것인지   알려주는 프로퍼티, 생략했을 경우 jQuery가 MIME타입을 보면서 자동 결정한다. 공백을 두고 여러 타입을 지정할 수도 있다.         종류: xml, html, script, json, jsonp, text                                                                                                                                                                                                                                                                       | String                                                           | Intelligent Guess (xml, json,   script, or html)                                                             |                                                                                                                                                                                          |
| 14 | **error**       | 콜백함수로 요청이 실패할때 호출된다. JqXHR 오브젝트,   에러상태값, 에러내용      JqXHR 오브젝트: http 응답코드 등       에러상태값: null, timeout, error, abort, parsererror      에러내용: Not Found, Internal Server Error, 'SyntaxError: Unexpected token <   in JSON at position 4                                                                                                                                                                                                               | Function( jqXHR jqXHR, String textStatus, String errorThrown   ) |                                                                                                              |                                                                                                                                                                                          |
| 15 | global          | 전역 Ajax 이벤트 핸들러를 자동으로 실행할지   여부                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Boolean                                                          | true                                                                                                         |                                                                                                                                                                                          |
| 16 | headers         | XMLHttpRequest 전송을 사용하여 요청과 함께   보낼 추가 헤더 키/값 쌍의 객체로 추가,수정 가능한다.                                                                                                                                                                                                                                                                                                                                                                                                    | PlainObject                                                      | {}                                                                                                           |                                                                                                                                                                                          |
| 17 | ifModified      | 마지막 요청으로부터 응답이 변경이 된경우에만 성공응답을   받는다.                                                                                                                                                                                                                                                                                                                                                                                                                                    | Boolean                                                          | false                                                                                                        |                                                                                                                                                                                          |
| 18 | isLocal         | 현재 환경을 로컬로 인식하게 만든다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Boolean                                                          | depends on current location   protocol                                                                       |                                                                                                                                                                                          |
| 19 | jsonp           | 클라이언트가 아닌 다른 도메인에 상주하는 서버로부터   데이터를 요청하기 위해 사용된다. 페이지의 출처 밖에서 가져온 미디어DOM요소나 XHR데이터를 읽기 위해 자바스크립트를 실행하는 것을   허용하지 않는 동일-출처 정책을 우회하여 데이터 공유를 가능하게 해 준다.       쿼리스트링으로 자바스크립트 콜백함수를 넣어 서버의 데이터를 콜백함수를 통해 가져올수 있다.       { jsonp: false, jsonpCallback: "callbackName" }                                                                               | String or Boolean                                                |                                                                                                              | [JSONP참고](https://ko.wikipedia.org/wiki/JSONP)                                                                                                                                         |
| 20 | jsonpCallback   | jsonp가 설정되면 필수설정.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | String or Function()                                             |                                                                                                              |                                                                                                                                                                                          |
| 21 | **method**      | HTTP method      종류: "POST", "GET", "PUT"                                                                                                                                                                                                                                                                                                                                                                                                                                                          | String                                                           | 'GET'                                                                                                        |                                                                                                                                                                                          |
| 22 | mimeType        | MIME type을 재정의 할 때 사용                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | String                                                           |                                                                                                              |                                                                                                                                                                                          |
| 23 | password        | HTTP 액세스 인증 요청에 대한 응답으로   XMLHttpRequest와 함께 사용할 비밀번호                                                                                                                                                                                                                                                                                                                                                                                                                        | String                                                           |                                                                                                              |                                                                                                                                                                                          |
| 24 | processData     | 문자열이 아닌 모든데이터타입은   "application/x-www-form-urlencoded"에 맞게 처리되고 쿼리스트링으로 변환되는데 이 설정을   false 옵션을 하면 DOM객체나 기타 처리되지 않는 데이터를 보낼 수 있다?                                                                                                                                                                                                                                                                                                     | Boolean                                                          | true                                                                                                         |                                                                                                                                                                                          |
| 25 | scriptAttrs     | 스크립트 혹은 jsonp 속성을 추가해서 요청할수   있다.                                                                                                                                                                                                                                                                                                                                                                                                                                                 | PlainObject                                                      |                                                                                                              |                                                                                                                                                                                          |
| 26 | scriptCharset   | 스크립트를 전송할 때 charset 속성을 지정할 수   있다.                                                                                                                                                                                                                                                                                                                                                                                                                                                | String                                                           |                                                                                                              |                                                                                                                                                                                          |
| 27 | statusCode      | 설정한 HTTP 응답코드 받았을때 처리하는 콜백함수를 정의   할 수 있다.                                                                                                                                                                                                                                                                                                                                                                                                                                 | PlainObject                                                      | {}                                                                                                           |                                                                                                                                                                                          |
| 28 | **success**     | 요청이 성공했을 경우 콜백되는 함수로 3개의 인수를   받는다.      1) dataType에 맞춘 데이터      2) 상태값      3) jqXHR                                                                                                                                                                                                                                                                                                                                                                              | Function( Anything data, String   textStatus, jqXHR jqXHR )      |                                                                                                              |                                                                                                                                                                                          |
| 29 | timeout         | 요청에 대한 제한시간 설정으로 0이면 미설정이다. 다른   타임아웃 설정보다 우선시 된다.                                                                                                                                                                                                                                                                                                                                                                                                                | Number                                                           |                                                                                                              |                                                                                                                                                                                          |
| 30 | traditional     | 파라미터를 옛날방식으로 직렬화?하여 전송한다.       { a: [ 2, 3, 4 ] } 는 아래처럼   전송된다.      "a=2&a=3&a=4"                                                                                                                                                                                                                                                                                                                                                                                    | Boolean                                                          |                                                                                                              |                                                                                                                                                                                          |
| 31 | type            | method의 옛날 버넌 1.9 이하 버전이면 이것을   사용해야함.                                                                                                                                                                                                                                                                                                                                                                                                                                            | String                                                           | 'GET'                                                                                                        |                                                                                                                                                                                          |
| 32 | **url**         | 요청을 보낼 곳의 url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | String                                                           | The current page                                                                                             |                                                                                                                                                                                          |
| 33 | username        | HTTP접속인증요청에 대한 응답에서 사용한다.                                                                                                                                                                                                                                                                                                                                                                                                                                                           | String                                                           |                                                                                                              |                                                                                                                                                                                          |
| 34 | xhr             | XMLHttpRequest 객체 생성을 위한 콜백?                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Function()                                                       | ActiveXObject when available   (IE), the XMLHttpRequest otherwise                                            |                                                                                                                                                                                          |
| 35 | xhrFields       | 기본   XHR 개체에 설정할 fieldName-fieldValue 쌍의 개체. 예를 들어 필요한 경우 도메인 간 요청에 대해   withCredentials를 true로 설정하는 데 사용할 수 있다.                                                                                                                                                                                                                                                                                                                                          | PlainObject                                                      |                                                                                                              |                                                                                                                                                                                          |


## 전역 AJAX 이벤트 핸들러

`global` 프로퍼티가 `true`일때 실행  

### .ajaxComplete()

통신이 끝났을 때 실행하는 전역 핸들러 등록  

```js
$(document).ajaxComplete(function(event, jqXHR, ajaxOptions) {
	console.log("%cglobal ajax event handler: complete", "color: black; font-weight: bold; background-color: #eee; padding: 2px;");
});
```

### .ajaxStop()

통신이 끝났을 때 실행하는 전역 핸들러 등록. `.ajaxComplete()`는 각각의 `ajax` 통신이 끝날 때마다 실행되나, `.ajaxStop()`은 아직 작동중인 `ajax`가 있으면 기다렸다가 모두 종료되었을 때 실행한다.  

```js
$(document).ajaxStop(function(event, jqXHR, ajaxOptions) {
	console.log("%cglobal ajax event handler: stop", "color: black; font-weight: bold; background-color: #eee; padding: 2px;");
});
```

이외에 아래의 메서드들이 있다.
- `.ajaxError()`: 통신이 실패했을때 실행하는 전역 핸들러 등록
- `.ajaxSend()`: 통신을 시작하기 전에 실행하는 전역 핸들러 등록
- `.ajaxStart()`: 통신을 시작한 후에 실행하는 전역 핸들러 등록
- `.ajaxSuccess()`: 통신이 성공했을 때 실행하는 전역 핸들러 등록

## jQuery XHR 객체의 리턴을 이용한 메서드 체이닝

`$.ajax()`의 `shorthand` 버전인 `$.get() $.post()` 등도 `jqXHR`을 리턴한다.
- `jqXHR.done(fn)`: 통신 성공 시 실행
- `jqXHR.fail(fn)`: 통신 실패 시 실행
- `jqXHR.always(fn)`: 통신 후 성공/실패 여부 관계없이 실행. 성공했을 때와 실패했을 때의 실제 전달인자가 다르다. 더 이상 사용하지 않는 `complete()`를 대체한다.
- `jqXHR.then(fn1, fn2)`: `.done()`과 `.fail()`의 기능을 합친 메서드. `always()`랑 비슷해보이지만, 이 메서드는 성공과 실패 시 실행할 함수를 각각 별도로 할당해야 한다.

```js
function methodChaining() {
	$.ajax({
		url: '/ajaxtest/getSimpleString.do',
		method: 'get'
	})
  .then(function(data, textStatus, jqXHR) { // 성공 시
		console.log('then { data:', data, '}');
		console.log('then { textStatus:', textStatus, '}');
		console.log('then { jqXHR:', jqXHR, '}');
	}, function(jqXHR, textStatus, errorThrown) { // 실패 시
		console.log('then2 { jqXHR:', jqXHR, '}');
		console.log('then2 { textStatus:', textStatus, '}');
		console.log('then2 { errorThrown:', errorThrown, '}');
	})
  .always(function(any, textStatus, any2) {
		console.log('always { any:', any, '}');
		console.log('always { textStatus:', textStatus, '}');
		console.log('always { any2:', any2, '}');
	})
  .fail(function(jqXHR, textStatus, errorThrown) {
		console.log('fail { jqXHR:', jqXHR, '}');
		console.log('fail { textStatus:', textStatus, '}');
		console.log('fail { errorThrown:', errorThrown, '}');
	})
  .done(function(data, textStatus, jqXHR) {
		console.log('done { data:', data, '}');
		console.log('done { textStatus:', textStatus, '}');
		console.log('done { jqXHR:', jqXHR, '}');
	});
}
/*
then { data: hello mother forker? }
then { textStatus: success }
then { jqXHR: {readyState: 4, getResponseHeader: ƒ, getAllResponseHeaders: ƒ, setRequestHeader: ƒ, overrideMimeType: ƒ, …} }
always { any: undefined }
always { textStatus: undefined }
always { any2: undefined }
done { data: undefined }
done { textStatus: undefined }
done { jqXHR: undefined }
*/
```
