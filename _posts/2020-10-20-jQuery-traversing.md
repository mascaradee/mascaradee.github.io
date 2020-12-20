---
layout: post
date: 2020-10-20 18:00:00 +0900
title: '[jQuery] traversing'
categories:
- jQuery
tags:
- traversing
---

* Kramdown table of contents
{:toc .toc}


## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 셀렉터 : 트래버싱 (횡단)
[https://api.jquery.com/category/traversing/](https://api.jquery.com/category/traversing/)


# traversing  

## .add()  

선택한 객체 배열에 다른 요소를 추가한다.  

`$('input:button').add('input:checkbox').add('select');`

버튼타입인 `input`과 체크박스타입인 `input`, `select`를 추가 선택한다.

```html
<section>
	<fieldset>
		<input type="text" id="1">
		<input type="text" id="2">
		<input type="button" id="3">				
	</fieldset>
</section> <br>
<section>
	<fieldset>
		<input type="checkbox" id="4">1 <br>
    <select id="5">
				<option>1</option>
				<option selected>2</option>
			</select>
	</fieldset>
</section> <br>
```  

```javascript
$('input:button').add('input:checkbox').add('select').length; // 3
// id = 3, 4, 5의 요소가 선택되고 객체배열에 추가된다.
```

## .addBack()  

선택한 객체 배열에 이전 순서에서 선택한 요소를 추가한다.  

`$('input:button').next().addBack();`  

```html
<section>
	<fieldset>    
		<input type="text" id="1">
    <input type="button" value="2" id="2">
    <input type="reset" id="3">
	</fieldset>
</section> <br>
```  
```javascript
$('input:button').next(); // id = 2가 선택
$('input:button').next().addBack(); // id = 2인 요소와 그 바로 앞인  id=1(처음 선택된)요소도 객체배열에 추가된다.
```

## .children()  

선택한 요소(들)의 직계 자손을 선택한다.  

`$('div.align-center:first').children();  
$('div.align-center:first').children('section');  
`

```html
<div class="align-center abc" id="grandgrandfather">
  <h1> traversing </h1>
  <section>
    <form>
      <fieldset>
        <input type="text">
      </fieldset>
    </form>		
  </section> <br>
  <section>
      <fieldset>
        <input type="button">
      </fieldset>
  </section> <br>
</div>
```  
```javascript
$('div.align-center:first').children(); // div 내부의 모든 자손 요소 선택 - h1, section, form...
$('div.align-center:first').children('section'); // div 내부의 section 요소들만 선택
```

## .closest()  

선택한 요소(들)의 부모들 중 조건에 맞는 가장 가까운 부모를 선택한다.  
`.closest(조건)`에서 조건은 필수이다. 조건이 없는 경우 무시된다.   

`$('#me').closest('.abc')`

```html
<div class="align-center abc" id="grandgrandfather">
  <div class="abc" id="grandfather">
		<div id="fahter">
			<article id="me"></article>
		</div>
	</div>
</div>
```  
```javascript
$('#me').closest('.abc'); // grandfather 선택
```

## .contents()  

선택한 요소(들)의 텍스트 노드를 선택한다.  

```html
<div class="align-center abc" id="grandgrandfather">
  <h1> traversing </h1>
  <section>
    <form>
      <fieldset>
        <input type="text">
      </fieldset>
    </form>		
  </section> <br>
</div>
```  
```javascript
$('h1').contents(); // traversing
$('h1').text(); // 보통은 위보다는 이렇게 사용한다.
```

## .each()  

선택한 요소만큼 반복하며 콜백 함수를 실행한다.  

```html
<div class="align-center abc" id="grandgrandfather">
  <h1> traversing </h1>
  <section>
    <form>
      <fieldset>
        <input type="text">
      </fieldset>
    </form>		
  </section> <br>
  <section>
      <fieldset>
        <input type="button">
      </fieldset>
  </section> <br>
  <section>
      <fieldset>
        <input type="reset">
      </fieldset>
  </section> <br>
</div>
```  
```javascript
var $section = $('section');  
$section.each(function(idx, ele) { // section의 개수(length)만큼 돌면서
	console.log('idx:', idx);  
	console.log('ele:', ele);  
	if (idx == 1) {  
		// .each() 에서는 return 혹은 return true가 continue, return false가 break다.  
		return true;  // 2번째 section은 그냥 남기고
	}  
	var $target = $(ele);  
	$target.children().remove(); // 자손을 모두 지운다.
});  
```

## .end()  

쉽게 말해서, traversing 카테고리의 메서드의 실행을 한 번 되돌린다.  

`$('section').eq(1).next().next().end().end();`  

```html
<div class="align-center abc" id="grandgrandfather">
  <h1> traversing </h1>
  <section>
    <form>
      <fieldset>
        <input type="text">
      </fieldset>
    </form>		
  </section>
  <br>
  <section>
      <fieldset>
        <input type="button">
      </fieldset>
  </section>
  <br>
  <section>
      <fieldset>
        <input type="reset">
      </fieldset>
  </section>
  <br>
</div>
```  
```javascript
$('section').eq(1); // section 중 2번째 요소(인덱스 1) 선택
$('section').eq(1).next(); // 다음 요소 선택. 즉, <br> 선택
$('section').eq(1).next().next(); //  그 다음 요소 선택. 즉, 세번째 <section>
$('section').eq(1).next().next().end(); // 이전인 <br>로 돌아감
$('section').eq(1).next().next().end().end(); // <br> 이전인  두 번째 <section>로 돌아감
```

## .eq()  

선택한 요소들의 순서를 지정해 하나만 선택한다.  

`$('section').eq(2); // 세 번째 <section>만 선택.`


## .filter()

선택한 요소들에 조건을 대입해 걸러내는 메서드. 조건은 셀렉터 작성법과 완전히 같다.  

```javascript
var $inpts = $('input');
var $bttns = $ele.filter(':button');
```

실제로 많이 사용되지 않는다.  
위 예시에서 `input`을 먼저 선택해서 뭔가 작업을 한 후,
해당 `input` 중 `:button`에 또 다른 작업이 필요할 경우, 즉, 중간에 뭔 작업이 더 있으면
`filter`를 사용할 수 있는데 장점은 문자열을 조금 덜 쓴다는 점 정도이다.
아래와 같이 쓰면 문자열이 조금 더 많아져 코드 해석이 조금 더 어려워진다라는...

```javascript
var $inptBttns = $('input:button');
```

## .find()

선택한 요소들의 하위 요소(자손)에서 지정한 요소를 선택한다.  

```javascript
$('section').find(':button')
```

## .is()

선택한 요소가 주어진 조건에 맞으면 true, 아니면 false 반환  

```javascript
$('input').eq(2).is('[value]');

var trueOrNot = $('input').is(function(idx, ele) {
 return $(ele).is(':button');
}); // 'input' 중에 ':button'이 하나라도 있으면 true
```

많이 사용되진 않는다.


## .has()  

선택한 요소 중 주어진 조건에 맞는 요소를 자손으로 포함하고 있는 요소만 남김.  

```javascript
$('section').has('select')  
```

## .next() / .prev()  

선택한 요소의 바로 다음 혹은 바로 전 요소를 선택한다. 단, 형제 레벨의 요소만.    

## .nextAll() / .prevAll()  

선택한 요소 다음(혹은 이전)의 모든 요소를 선택하거나 조건에 맞는 요소만 선택. 단, 형제 레벨의 요소만.  

```javascript
$('#grandfather').nextAll()  
$('#grandfather').nextAll('section')  
```

## .nextUntil() / .prevUntil()  

선택한 요소 다음(혹은 이전) 요소부터, 주어진 조건의 요소 전까지 선택한다.  

```javascript
$('#grandfather').nextUntil('section:last')  
```

## .offsetParent()  

`.closest()`와 비슷한 메서드. 가장 가까운 조상 중 `positioned` 상태인 조상을 선택한다.   
`positioned` 상태란, `position style`의 값이 `relative, absolute, fixed`인 것을 의미한다.  

```html
<div class="abc" id="grandfather">
	<div id="father">
		<article id="me"></article>
	</div>
</div>

<div id="imNext"><button onclick="fn1()">asdfqwe</button></div>
<section style="position: relative;">
	<form>
		<fieldset>
			<input type="text">
			<input type="text" value="123">
			<input type="button">
			<input type="reset" value="리셋1">
			<button type="reset">리셋2</button>
			<textarea></textarea>
		</fieldset>
	</form>		
</section> <br>
```

```javascript
$('input:reset').offsetParent(); // <section>태그 부분이 선택된다.
```

## .parent()  

선택한 요소의 바로 위 부모를 선택한다.   

```html
<section style="position: relative;">
	<form>
		<fieldset>
			<input type="text">
			<input type="text" value="123">
			<input type="button">
			<input type="reset" value="리셋1">
			<button type="reset">리셋2</button>
			<textarea></textarea>
		</fieldset>
	</form>		
</section> <br>
```

```javascript
$('input:reset').parent(); // <fieldset>태그 부분이 선택된다.
```

## .parents()  

선택한 요소의 직계 조상 중 주어진 조건에 해당하는 모든 요소를 선택한다.  

```html
<div class="abc" id="grandfather">
	<div id="father">
		<article id="me"></article>
	</div>
</div>

<div id="imNext"><button onclick="fn1()">asdfqwe</button></div>
<section style="position: relative;">
	<form>
		<fieldset>
			<input type="text">
			<input type="text" value="123">
			<input type="button">
			<input type="reset" value="리셋1">
			<button type="reset">리셋2</button>
			<textarea></textarea>
		</fieldset>
	</form>		
</section> <br>
```
```javascript
$('input:reset').parents(); // <section>태그 부분이 선택된다. <div>는 <section>의 형제
```

## .parentsUntil()  

선택한 요소의 직계 조상 중 주어진 조건에 해당하는 요소 직전까지 모두 선택한다.  

```html
<div class="abc" id="grandfather">
	<div id="father">
		<article id="me"></article>
	</div>
</div>

<div id="imNext"><button onclick="fn1()">asdfqwe</button></div>
<section style="position: relative;">
	<form>
		<fieldset>
			<input type="text">
			<input type="text" value="123">
			<input type="button">
			<input type="reset" value="리셋1">
			<button type="reset">리셋2</button>
			<textarea></textarea>
		</fieldset>
	</form>		
</section>
<br>

```
```javascript
$('input:reset').parentsUntil('form'); // <fieldset>태그 부분이 선택된다.
```

## .siblings()  

선택한 요소의 형제 중 조건에 맞는 모든 요소를 선택한다. (nextAll과 prevAll을 합친거라고 보면 된다)  

## .slice()  

substring처럼 시작 인덱스 종료 인덱스(종료 인덱스는 생략 가능)를 지정하여 선택한 요소 배열을 잘라내는 메서드.  

```javascript
$('div').slice(2); // 모든 div를 선택 후, 첫 번째와 두 번째 div는 배열에서 제거한다.  
$('div').slice(2, 4); // 모든 div를 선택 후, 세 번째와 네 번째 div 외 모든 요소를 배열에서 제거한다.  
```

## .map(callback)  

선택한 요소만큼 callback을 실행한다. callback 파라미터는 index와 domElement(document object)이다.   
각 callback이 반환하는 값을 모아서 새 jQuery 객체를 만든다. callback이 null이나 undefined를 반환하면 빈값으로    
채우지 않고 생략한다.  

```html
<fieldset>
	<input type="text">
	<input type="text" value="123">
	<input type="button">
	<input type="reset" value="리셋1">
	<button type="reset">리셋2</button>
	<textarea></textarea>
</fieldset>
```

```javascript
$('input').map(function(idx, ele) {
	return $(ele).attr('type'); // ['text', 'text', 'button', 'reset']
});  

$('input').map(function(idx, ele) {
	var type = $(ele).attr('type');
	return type == 'text' ? undefined : type;  // ['button', 'reset']
});  
```
