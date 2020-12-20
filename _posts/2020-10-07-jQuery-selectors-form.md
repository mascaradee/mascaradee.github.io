---
layout: post
date: 2020-10-07 15:00:00 +0900
title: '[jQuery] selectors : form'
categories:
  - jQuery
tags:
  - selectors form
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 셀렉터 : 기본  
[https://api.jquery.com/category/selectors/form-selectors/](https://api.jquery.com/category/selectors/form-selectors/)

## form

### :input selector

모든 `<input>, <textarea>, <select>, <button>`을 선택하는 셀렉터  

`$(':input')...`

참고로 `$('input')`는 `<input>`만을 찾는 것이다.  

```html
<head>
<style>
.affected {
	border: 3px solid red;
}
</style>
<script>
function fn1(){
	$(':input').addClass('affected');
}
function fn2(){
	$('input').addClass('affected');
}
</script>
</head>
<body>
<div class="align-center">
  <div><button onclick="fn1()">:input selector</button></div>
  <div><button onclick="fn2()">input태그만</button></div>
	<section>
		<fieldset>
			<input type="text">
      <button type="button">눌러</button>
      <textarea></textarea>
      <select>
        <option>1</option>
        <option selected>2</option>
      </select>
		</fieldset>
	</section> <br>
</div>
</body>
```

### type selector

`<input>` 태그의 타입을 선택하는 셀렉터  

```
:text
:checkbox
:file
:image
:password
:radio
```
```html
<head>
<script>
function fn3(){
	$(':checkbox').prop("checked", true); // 체크 선택
}
</script>
</head>
<body>
<div class="align-center">
  <div><button onclick="fn3()">:checkbox selector</button></div>
	<section>
		<fieldset>
			<input type="checkbox">체크박스
		</fieldset>
	</section> <br>
</div>
</body>
```

`:submit` 셀렉터와 `:reset` 셀렉터는 `<input>` 태그의 타입은 물론 `<button>` 태그 타입도 선택하는 셀렉터  

```html
<head>
<script>
function fn4(){
	$(':reset').addClass('affected');
}
</script>
</head>
<body>
<div class="align-center">
  <div><button onclick="fn4()">:reset selector</button></div>
	<section>
		<fieldset>
			<input type="reset" value="리셋1">
			<button type="reset">리셋2</button>
		</fieldset>
	</section> <br>
</div>
</body>
```

### :button selector

`<button>` 태그와 `<input type="button">` 태그를 선택하는 셀렉터  

```html
<head>
<script>
function fn5(){
	$(':button').addClass('affected');
}
</script>
</head>
<body>
<div class="align-center">
  <div><button onclick="fn5()">:button selector</button></div>
	<section>
		<fieldset>
			<input type="button" value="인풋버튼타입">
			<button type="submit">버튼태그</button>
		</fieldset>
	</section> <br>
</div>
</body>
```

### :checked selector

`<input type=checkbox>`와 `<input type=radio>` 태그 중 `check`가 되어 있는(checked) 태그를 선택하는 셀렉터

```html
<head>
<script>
function fn6(){
  $(':checked').prop("checked", false); // 선택된 체크 해제
}
</script>
</head>
<body>
<div class="align-center">
  <div><button onclick="fn6()">:checked selector</button></div>
	<section>
		<fieldset>
			<input type="checkbox" value="체크박스">
			<input type="radio" value="라디오버튼">
		</fieldset>
	</section> <br>
</div>
</body>
```

### :selected selector

`<option>` 태그 중 선택된 태그만  

```html
<head>
<script>
function fn7(){
  console.log($(':selected').text());
}
</script>
</head>
<body>
<div class="align-center">
  <div><button onclick="fn7()">:selected selector</button></div>
  <section>
    <fieldset>
      <select>
        <option>1</option>
        <option selected>2</option>
      </select>
      <select>
        <option>1</option>
        <option>2</option>
      </select>
    </fieldset>		
  </section> <br>
</div>
</body>
```


### :disabled, enabled selector

disabled 상태이거나 아닌 태그를 선택하는 셀렉터  


### :focus selector

현재 focus 상태인 태그를 선택하는 셀렉터  
