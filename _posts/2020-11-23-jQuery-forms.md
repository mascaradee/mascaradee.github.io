---
layout: post
date: 2020-11-23 18:00:00 +0900
title: '[jQuery] forms'
categories:
  - jQuery
tags:
  - forms
---

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- forms  
[https://api.jquery.com/category/forms/](https://api.jquery.com/category/forms/)

# forms  

## .blur()  

파라미터가 없으면 blur 이벤트를 발생시킨다.  
파라미터가 있으면 blur 이벤트에 작동할 핸들러를 설정한다.

```javascript
// DOM이 모두 생성된 후에 실행
/*
$(document).ready(function() {  
	...  
}); // 아래와 같음  

$(function(){

});
*/

$(function() {
	$('#firstName').on('keyup', function(event) {
		var $target = $(this);
		var val = $target.val();
		if (val && val.length > 2) {
			$target.blur();
		}
	});

	$('#firstName').blur(function() {
		var $target = $(this);
		console.log('뿌얘졌네요');
	});
});
```
```html
<div>
  <label>First name</label>
  <input type="text" id="firstName">
</div>
```

#### 리스너

이벤트가 발생하는지 감시하는 역할

#### 핸들러

이벤트가 발생했을 때 실행할 함수


## .change()

파라미터가 없으면 change 이벤트를 발생시킨다. 파라미터가 있으면 change 이벤트에 작동할 핸들러를 설정한다.  

```javascript
$('#lastName').change(); // $('#lastName').trigger('change'); 같은 결과
```

```javascript
function fn2(event) {
	var $target = $(this);
	var value = $target.val();
	$target.val(value.replace(/[^A-Za-z0-9]/gi, '뿅')); // 영어, 숫자가 아니면 대체
}  // 재사용이 필요할 경우 이렇게 따로 함수를 만든다.

// 핸들러 설정 + 이벤트 발생
$('#lastName').change(fn2).change(); // $('#lastName').on('change', fn2);
```

`$('#lastName').change(fn2)`는 이벤트가 발생되었을때 실행할 함수를 정의해 놓는 부분이고   
바로 다음에 오는 `.change()`가 이벤트를 발생시키는 부분이다.  


```html
<input type="text" class="form-control" id="lastName" name="lastName" placeholder="" value="ㅂ1ㅈ2ㄷ3ㄱ4">
```

## .submit(), .focusin(), .focusout()

`.blur()`와 같게 파라미터가 없으면 해당 이벤트를 발생시킨다. 파라미터가 있으면 해당 이벤트에 작동할 핸들러를 설정한다.  

## .select()
다른 메소드와 거의 같으나, 여기서 `select` 이벤트는 `input`이나 `textarea`에서 텍스트를 드래그했을 때  
발생하는 이벤트를 말한다.

```javascript
$('#lastName').select(function() {
	console.log('hi. you got me');
});
```
```HTML
<input type="text" class="form-control" id="lastName" name="lastName" placeholder="" value="ㅂ1ㅈ2ㄷ3ㄱ4">
```

## jQuery.param()

배열이나 자바스크립트 객체, 제이쿼리 객체를 직렬화된 표현(URL의 쿼리스트링)의 문자열로 바꾼다.

```javascript
var myObject = {
	a : {
		one : 1,
		two : 2,
		three : 3
	},
	b : [ 1, 2, 3 ]
};
window.recursiveEncoded = $.param(myObject); //a%5Bone%5D=1&a%5Btwo%5D=2&a%5Bthree%5D=3&b%5B%5D=1&b%5B%5D=2&b%5B%5D=3
window.recursiveDecoded = decodeURIComponent($.param(myObject)); // a[one]=1&a[two]=2&a[three]=3&b[]=1&b[]=2&b[]=3
```

## .serialize()

지정된 `form` 하위의 입력란들을 `submission`을 위한 인코딩된 문자열로 변환한다.  
입력란에 해당하는 태그에 `name` 속성이 없을 경우 대상에서 제외한다.

```javascript
decodeURIComponent($('#myform').serialize()); // firstName=이뿅뿅&lastName=뿅1뿅2뿅3뿅4&email=mascaradee@mail.net&address=서울 어딘가
```
```HTML
<form id="myForm">
  <div class="row">
    <div class="col-md-6 mb-3">
      <label for="firstName">First name</label>
      <input type="text" class="form-control" name="firstName" id="firstName" placeholder="" value="이뿅뿅">
    </div>
    <div class="col-md-6 mb-3">
      <label for="lastName">Last name</label> <input type="text"
        class="form-control" id="lastName" name="lastName" placeholder="" value="ㅂ1ㅈ2ㄷ3ㄱ4">
    </div>
  </div>
  <div class="mb-3">
    <label for="email">Email <span class="text-muted">(Optional)</span></label>
    <input type="email" class="form-control" id="email" name="email" placeholder="you@example.com" value="mascaradee@mail.net">
  </div>
  <div class="mb-3">
    <label for="address">Address</label>
    <input type="text" class="form-control" id="address" name="address" placeholder="1234 Main St" value="서울 어딘가">
  </div>
  </form>
```

## .serializeArray()

지정된 `form` 하위의 입력란들을 `name`과 `value`가 `property`인 객체들의 배열로 변환한다.

```javascript
$('#myForm').serializeArray();
/*
(4) [{…}, {…}, {…}, {…}]
0: {name: "firstName", value: "이뿅뿅"}
1: {name: "lastName", value: "뿅1뿅2뿅3뿅4"}
2: {name: "email", value: "mascaradee@mail.net"}
3: {name: "address", value: "서울 어딘가"}
length: 4
__proto__: Array(0)
*/
```
같은 `form`을 대상으로 `.serialize()`를 사용한 결과와 `.serializeArray() + jQuery.param()`을 사용한 결과는 같다.

```javascript
$('#myForm').serialize() === $.param($('#myForm').serializeArray()); // true
```
