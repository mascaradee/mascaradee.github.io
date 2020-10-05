---
layout: post
date: 2020-10-05 18:00:00 +0900
title: '[jQuery] selectors : basic and basic filter'
categories:
  - jQuery
tags:
  - selectors basic
  - selectors basic filter
---

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 셀렉터 : 기본  
[https://api.jquery.com/category/selectors/basic-css-selectors/](https://api.jquery.com/category/selectors/basic-css-selectors/)

- 셀렉터 : 기본 필터  
[https://api.jquery.com/category/selectors/basic-filter-selectors/](https://api.jquery.com/category/selectors/basic-filter-selectors/)  

## Basic

### All Selector('*')
모든 DOM 요소를 선택하는 셀렉터. 사실상 쓸 일은 음슴.  

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
function fn1() {
	$('section *').addClass('affected'); // section 태그 이하 모든 태그에 스타일 적용
}
</script>
</head>
<body>
	<div><button onclick="fn1()">All Selector</button></div>
	<section>
		<div>DIV</div>
    <div>DIV1</div>
	</section>
</body>
</html>
```

### Class Selector ('.class')

`.`과 클래스 속성의 값을 적는다. 해당 클래스가 부여된 모든 요소를 찾는다.  

```javascript
$('.outter')...
```

### Element Selector ('element')

찾을 태그를 입력한다. 같은 모든 태그가 반환된다.

```javascript
$('div')..., $('fieldset')..., ...
```

### ID Selector ('#id')

```javascript
 $('#my-id')...
```

### Multiple Selector ('selector1, selector2, selectorN')

각 셀렉터 사이에 쉼표(,)가 있으면 멀티 선택으로 작동한다.  
쉼표를 사용할 때 따옴표를 닫으면 안된다.  

```html
<script>
function fn2() {
	$('section div, .mom, #abc').addClass('affected'); // element, class, id 나열된 모든 태그에 스타일 적용
}
</script>
<body>
  <div><button onclick="fn2()">Multiple Selector</button></div>
  <section>
    <div>DIV</div>
    <span class="mom">SPAN</span>
    <p>P <button id="abc">Button</button></p>
  </section> <br>
</body>
```

---

## basic filter

필터는 셀렉터에 쉼표 없이 붙여서 사용하며 앞의 셀렉터를 보조하여 좀 더 상세한 탐색을 위해 사용한다.  
:eq(), :first() 등의 pseudo 클래스는 3.4버전부터 deprecated 상태이므로 생략한다.  

### :focus Selector

현재 포커스 상태의 요소를 반환한다. input, button, select, option 등에 포커스를 줄 수 있다.

```html
<script>
function fn3() {
	setInterval(() => {
		$('*:focus').addClass('affected'); //  포커스를 얻은(클릭) 모든 요소를 2초단위로 스타일 적용
	}, 2000);
}
</script>
<body>
  <div><button onclick="fn2()">Multiple Selector</button></div>
  <section>
    <div>DIV</div>
    <span class="mom">SPAN</span>
    <p>P <button id="abc">Button</button></p>
  </section> <br>
</body>
```

### :header Selector

헤더 태그를 모두 반환(h1, h2, h3, ...), `<header></header>`를 의미하는 것이 아님 주의.  

```html
<script>
function fn4() {
	$('*:header').addClass('affected'); // 모든 헤더 태그에 스타일 적용
}
</script>
<body>
  <div><button onclick="fn4()">:header Selector</button></div>
	<section>
		<header>헤더?</header>
		<h1>헤더</h1>
		<h2>헤더</h2>
		<h3>헤더</h3>
		<h4>헤더</h4>
		<h5>헤더</h5>
		<h6>헤더</h6>
	</section> <br>
</body>
```

### :not() Selector

셀렉터로 선택한 요소 중 제거할 조건을 입력하면 해당 요소를 제외하고 반환한다.  
`:not()` 셀렉터와 같이 `()`있는 것은 꼭 매개변수가 필요하다.  
매개변수 `event`는 브라우저에서 넘겨주는데 호출 시 인수명은 `event`로 고정이다.    

```html
<script>
function fn5(e) {
	var $t = $(e.target);
	var $section = $t.parent().next();
	$('button:not(#not-me)', $section).addClass('affected');
  // 버튼태그 중 아이디가 not-me인 건 제외하고 스타일 적용
  // 다른 pseudo 클래스와 조합하면 $('div:not(:has(button))') 이렇게도 쓸 수 있다.
}
</script>
<body>
  <div><button onclick="fn5(event)">:not() Selector</button></div>
	<section>
		<button>Button</button>
		<button id="not-me">Button</button>
	</section> <br>
</body>
```

### :first-child selector

한 개 이상의 요소를 반환하되, 각 부모의 첫 번째 자식 모두를 반환한다.  
참고로 `:first selector` (3.4버전부터 deprecated)는 한 개 요소만 반환이 된다.  
아래 예제를 `:first selector`로 적용하면 첫 번째 `Hello`에만 스타일이 적용된다.

```html
<script>
function fn6() {
	$('ul li b:first-child').addClass('affected'); // Hello 6개에 스타일 적용
}
</script>
<body>
  <div><button onclick="fn6()">:first-child Selector</button></div>
  <section>
    <ul>
      <li><b>Hello</b> <b>world</b></li>
      <li><b>Hello</b> <b>world</b></li>
      <li><b>Hello</b> <b>world</b></li>
    </ul>
    <ul>
      <li><b>Hello</b> <b>world</b></li>
      <li><b>Hello</b> <b>world</b></li>
      <li><b>Hello</b> <b>world</b></li>
    </ul>
  </section> <br>
</body>
```

### :target Selector

URI의 해시값을 아이디로 가지고 있는 대상을 가리킨다.  

```html
<script>
function fn7() {
	$(':target').addClass('affected');
}
</script>
  <div><a href="#abcdefg">이걸 먼저 눌러</a></div>
  <div><button onclick="fn7()">:target Selector</button></div>
  <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
  <section>
    <h4 id="abcdefg">abcdefg</h4>
  </section> <br>
</body>
```
