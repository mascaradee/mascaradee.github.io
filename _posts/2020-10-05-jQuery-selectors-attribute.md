---
layout: post
date: 2020-10-05 18:00:00 +0900
title: '[jQuery] selectors : attribute'
categories:
  - jQuery
tags:
  - selectors attribute
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 셀렉터 : 속성   
[https://api.jquery.com/category/selectors/attribute-selectors/](https://api.jquery.com/category/selectors/attribute-selectors/)


## Selector

`jQuery`에서 셀렉터란 `jQuery( selector [, context] )` 메서드를 사용할 때 첫 번째 인자로 전달하는,   
찾을 요소가 무엇인지를 정의하는 `CSS` 셀렉터를 확장하는 문자열을 말한다.  
참고로 두 번째 인자 `context`는 적용범위이다.


### Attribute Contains Prefix Selector [name|="value"]

`jQuery( '[ attribute |= "value"] ')`

- `attribute`: 찾으려는 속성
- `value`: 찾으려는 속성의 값. `value`와 완전히 일치하는 단어로 시작하면 모두 리턴  
하이픈으로 이어진 경우도 이에 해당됨.  

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<style>
h3 {
  margin: 0;
}
section {
	border: 1px solid black;
}
section div, section span, section p {
  width: 80px;
  height: 40px;
  padding: 10px;
  margin: 10px;
  background-color: #EEEEEE;
}
.affected {
	border: 3px solid red;
}
</style>
<script>
function testAttrPrefixSelector() {
	$('[name|=abc]').addClass('affected'); // name속성이 abc로 시작하면 스타일 적용
}
</script>
</head>
<body>
  <div><button onclick="testAttrPrefixSelector()">attr prefix selector</button></div>
	<section>
		<div name="abc">DIV</div>
		<span name="abc-456">SPAN</span>
		<p name="abc789">P <button name="abc 789">Button</button></p>
	</section><br>
</body>
</html>
```

### Attribute Contains Selector [name*="value"]

`jQuery( '[ attribute *= "value"] ')`

- `value`: 찾으려는 속성의 값. 위치에 상관없이 이 값이 포함되어 있으면 모두 리턴

```html
<script>
function testAttrContainsSelector() {
	$('[name*=c]').addClass('affected'); // name 속석에 'c' 가 포함되어 있으면 스타일 적용
}
</script>
</head>
<body>
  <div><button onclick="testAttrContainsSelector()">attr contains selector</button></div>
	<section>
		<div name="abc">DIV</div>
		<span name="abc-456">SPAN</span>
		<p name="abc789">P <button name="abc 789">Button</button></p>
	</section><br>
</body>
```

### Attribute Contains Word Selector [name~="value"]

`jQuery( '[attribute ~= "value"] ')`

- `value`: 찾으려는 속성의 값.   
위치에 상관없이 단어가 포함되어 있으면 모두 리턴. 여기서 단어는 빈칸으로 구분한 문자를 말한다.  
하이픈으로 이어진 단어는 대상이 아님.  

```html
<script>
function testAttrContainsWordSelector() {
	$('[data-identifier~=man]').addClass('affected');
}
</script>
</head>
<body>
  <div><button onclick="testAttrContainsWordSelector()">attr contains word selector</button></div>
	<section>
		<div data-identifier="earth-man">DIV</div>
		<span data-identifier="woman">SPAN</span>
		<p data-identifier="man ual">P <button data-identifier="manAtArms">Button</button></p>
	</section><br>
</body>
```


### Attribute Starts With Selector [name^="value"]

`jQuery( '[attribute ^= "value"] ')`

- `value`: 속성의 값이 `value`로 시작하는 태그를 모조리 리턴

```html
<script>
function testAttrStartsWithSelector() {
	$('[name^=dc]').addClass('affected');
}
</script>
</head>
<body>
  <div><button onclick="testAttrStartsWithSelector()">attr starts with selector</button></div>
	<section>
		<div name="00dcba00">DIV</div>
		<span name="dcba0000">SPAN</span>
		<p name="dcba789">P <button name="dcba 789">Button</button></p>
	</section><br>
</body>
```


### Attribute Ends With Selector [name$="value"]

`jQuery( '[attribute $= "value"] ')`

- `value`: 속성의 값이 `value`로 끝나는 태그를 모조리 리턴

```html
<script>
function testAttrEndsWithSelector() {
	$('[name$=qwer]').addClass('affected');
}
</script>
</head>
<body>
  <div><button onclick="testAttrEndsWithSelector()">attr ends with selector</button></div>
	<section>
		<div name="00qwer00">DIV</div>
		<span name="qwer0000">SPAN</span>
		<p name="789qwer">P <button name="789 qwer">Button</button></p>
	</section><br>
</body>
```


### Attribute Not Equal Selector [name!="value"]

`jQuery( '[attribute != "value"] ')`

- `value`: 속성의 값이 `value`와 일치하지 않으면 모두 리턴

```html
<script>
function testAttrNotEqualSelector() {
	$('[name!=asdf]').addClass('affected');
}
</script>
</head>
<body>
  <div><button onclick="testAttrNotEqualSelector()">attr not equal selector</button></div>
	<section>
		<div name="asdf">DIV</div>
		<span name="asdf">SPAN</span>
		<p name="asdf">P <button name="asd">Button</button></p>
	</section><br>
</body>
```


### Attribute Equal Selector [name="value"]

`jQuery( '[attribute = "value"] ')`

- `value`: 속성의 값이 `value`와 일치하면 모두 리턴

```html
<script>
function testAttrEqualSelector() {
	$('[name=asdf]').addClass('affected');
}
</script>
</head>
<body>
  <div><button onclick="testAttrEqualSelector()">attr equal selector</button></div>
	<section>
		<div name="asdf">DIV</div>
		<span name="asdf">SPAN</span>
		<p name="asdf">P <button name="asd">Button</button></p>
	</section><br>
</body>
```
