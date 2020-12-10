---
layout: post
date: 2020-12-09 22:00:00 +0900
title: '[jQuery] ajax'
categories:
  - jQuery
tags:
  - ajax
---

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- ajax      
[https://api.jquery.com/category/ajax/](https://api.jquery.com/category/ajax/)

# ajax  

## pure javascript로 AJAX를 구현하는 방법  

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
// JSON 받아오기
function getSimpleJSON() {
  // $.get('/ajaxtest/getSimpleJSON.do', 'a=1&b=2', function(resp) {
  //  object형식으로 세팅해도 서버에는 쿼리스트링형식으로 넘어간다.
  $.get('/ajaxtest/getSimpleJSON.do', { name: 'John', time: '2pm' }, function(resp) {
		console.log(resp);
	});
}
// html 받아오기
function getLittleTinyHtml() {
	$.get('/ajaxtest/getLittleTinyHtml.do', function(resp) {
		console.log(resp);
		$('#result').html(resp);
	});
}
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
		return mv; // 반환이 ModelAndView이면 스프링 세팅으로 자동으로 넘어감
	}
}
```

### 두 번째 사용방법: 파라미터를 객체로

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
			console.log(resp);
		}
	};
	$.get(settings);
}
function getSimpleJSON2() {
	$.get({
		url: '/ajaxtest/getSimpleJSON.do',
		data: 'a=1&b=2',
		success: function(resp) {
			console.log(resp);
		}
	});
}
function getLittleTinyHtml2() {
	$.get({
		url: '/ajaxtest/getLittleTinyHtml.do',
		success: function(resp) {
			console.log(resp);
			$('#result').html(resp);
		}
	});
}
```

## jQuery.post()

기본적인 사용방법은 `jQuery.get()`과 거의 같으나, `data`부분은 `querystring`이 아니라 `formdata`로 전송된다.  

```js
function getSimpleJSONWithPost() {
  // 한 줄로 쭉 나열
  // $.post('/ajaxtest/getSimpleJSONWithPost.do', 'a=1&b=2', function(resp) {
	// 	console.log(resp);
	// });

  // 파람미터를 객체로 
	$.post({
		url: '/ajaxtest/getSimpleJSONWithPost.do',
		// data: 'a=1&c=3',
		data: { name: 'John', time: '2pm' },
		dataType: 'json',
		// dataType은 모든 ajax API에 있는 옵션으로 응답 받은 데이터를 어떤 데이터 타입으로 파싱 혹은 핸들링 할 것인지를 의미한다. (xml/json/script/text/html)
		success: function(resp) {
			console.log(resp);
		}
	});
}
```
