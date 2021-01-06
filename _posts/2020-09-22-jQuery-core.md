---
layout: post
date: 2020-09-22 19:00:00 +0900
title: '[jQuery] core'
categories:
  - jQuery
tags:
  - core
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 코어  
[https://api.jquery.com/category/core/](https://api.jquery.com/category/core/)

## jQuery()  
[https://api.jquery.com/jQuery/](https://api.jquery.com/jQuery/)  

`jQuery`는 `$`로 대체할 수 있다.  
`$`가 싫으면 다른걸로 바꿀 수 있는데 `jQuery`가 `$`를 재정의하는 함수를 제공한다.  

### `jQuery( selector [, context] )`

가장 자주 쓰게 될 DOM 셀렉터  
- selector: `jQuery` 셀렉터 문법으로 작성된 문자열(CSS3 셀렉터를 확장한다)
- context: 탐색할 범위를 의미하고 CSS로 표현. 찾을 대상의 부모를 표시.  
  가령 context가 `div#abc`인 경우 ID가 abc인 DIV 태그 하위의 요소만 탐색한다.

```html
<body>
  <div class="align-center">
  	<h1>PAGE TITLE HERE</h1>
  	<hr>
  	<p>description</p>
  	<h2>sub title</h2>
  	<p>대문자는 h1까지만 하기로 하자.</p>
  	<ul>
  		<li> </li>
  		<li><p>hello</p></li>
  		<li> </li>
  	</ul>
  </div>
  <script>
  var $firstHeader = $('h1:first'); // h1 태그 중 첫번째 요소 리턴
  var $phraseInUnorderedList = $('p', 'ul'); // $('ul').find('p') 와 같음. 즉, p태그 중 ul태그 하위에 있는 요소 찾기
  </script>
</body>
```

참고로 위 소스에서 `<script></script>`를 `<head></head>` 내부가 아닌  
`<body></body>` 내부에 넣은 이유는 스크립트에서 DOM을 참조해야 하는데  
DOM보다 먼저 써버리면 위에서부터 순차적으로 해석을 하는
HTML 특성상 참조할 DOM이 없어 실제 원하는 값(`$firstHeader` 혹은 `$phraseInUnorderedList`) 을 찾을 수 없기 때문이다.

```html
<head>
  <script>
  var $firstHeader = $('h1:first'); // DOM 생성 전으로
  var $phraseInUnorderedList = $('p', 'ul'); // DOM 생성 전
  </script>
</head>
<body>
  <div class="align-center">
  	<h1>PAGE TITLE HERE</h1>
  	<hr>
  	<p>description</p>
  	<h2>sub title</h2>
  	<p>대문자는 h1까지만 하기로 하자.</p>
  	<ul>
  		<li> </li>
  		<li><p>hello</p></li>
  		<li> </li>
  	</ul>
  </div>
</body>
```
```console
// 확인 방법
$firstHeader.length; // 0
$phraseInUnorderedList.length; // 0
```

### `jQuery( element )`
자바스크립트로 얻어낸 DOM을 파라미터로 전달하면 `jQuery` 객체로 만들어 리턴하는 메서드  

```javascript
var h1 = document.querySelector('h1'); // DOM 가져오기
var $h1 = $(h1); // H1 DOM을 jQuery 객체로 변환
console.log($h1[0] === h1); // true - 배열의 형태로 DOM을 가지고 있다.
$h1.find('div'); // H1 하위 노드에서 div 탐색
```

### `jQuery( elementArray )`
바로 위 메서드과 크게 다르지 않고 단지 DOM을 배열 형식으로 던지면  
`jQuery` 객체도 내부의 배열에 해당 요소를 담아서 되돌려줌

```javascript
var lies = document.querySelectorAll('li');
console.log(lies.length); // 3
var $lies = $(lies);
console.log($lies[0] === lies[0]); // true
$lies.find('p'); // 모든 선택된 li 태그 하위 노드에서 p 탐색
```

### `jQuery( html [, ownerDocument] )`
`document.createElement()`와 흡사한 메서드   
- html: 생성할 DOM을 의미하는 태그 형식의 문자열
- ownerDocument: DOM을 소유할 문서 객체. document 객체가 여러개일 경우는 거의 없으므로 안쓴다고 보면 된다.

```javascript
var $newEle = $('<div>야이뇸아</div>');
$('div:first').append($newEle); // div 중 첫번째 요소 리턴한 후 $newEle를 해당 요소의 끝나기 바로 전에 붙인다. 즉, </div> 바로 앞에
```

```HTML
<div class="align-center">
	<h1>PAGE TITLE HERE</h1>
	<hr>
	<p>description</p>
	<h2>sub title</h2>
	<p>대문자는 h1까지만 하기로 하자.</p>
	<ul>
		<li> </li>
		<li><p>hello</p></li>
		<li> </li>
	</ul>
  <div>야이뇸아</div>
</div>
````

### `jQuery( html, attributes )`
- attributes: 새로 만들어질 요소의 속성, 이벤트, 메서드를 정의  
이 방식의 경우 html은 태그 바디에 어떤한 텍스트도 있어선 안된다.

```javascript
var $newEle2 = $('<button></button>', {
	'text': '누질러요',
	'class': 'hoho',
	'on': {
		'click': (event) => {
			console.log('나 불렀엉?');
		}
	}
});
$('div:first').append($newEle2);
```

```html
<div class="align-center">
	<h1>PAGE TITLE HERE</h1>
	<hr>
	<p>description</p>
	<h2>sub title</h2>
	<p>대문자는 h1까지만 하기로 하자.</p>
	<ul>
		<li> </li>
		<li><p>hello</p></li>
		<li> </li>
	</ul>
  <div>야이뇸아</div>
  <button class="hoho">누질러요</button>
</div>
```

### `jQuery.noConflict( [removeAll] )`
- removeAll: `true`로 지정하면 `jQuery`를 의미하는 모든 변수를 초기화한다.  
`jQuery` 객체를 의미하는 `$` 변수를 초기화하는 메서드.  
`$`라는 이름이 다른 자바스크립트 라이브러리와 겹칠 경우에 사용한다.

### `jQuery( callback )`
DOM 생성이 모두 완료되면 실행할 함수를 지정하는 메서드  
`$(document).ready(fn)`와 같다.

```html
<script>
$(function() { // $(document).ready(fn) 와 같으므로 페이지 상단에 위치해 있더라도 DOM이 모두 생성된 후 실행된다.
	console.log('모든 P 태그의 수:', $('p').length);
	$('button').click(rm);
});
function rm() { // 참조하는 DOM이 있더라도 해당 함수가 호출되기 전까지 실행되지 않으므로 페이지 상단에 위치해도 무방
	$('div:first').remove();
}
</script>
<body>
  <div class="align-center">
  	<h1>PAGE TITLE HERE</h1>
  	<hr>
  	<p>description</p>

  	<h2>sub title</h2>
  	<p>대문자는 h1까지만 하기로 하자.</p>

  	<ul>
  		<li> </li>
  		<li><p>hello</p></li>
  		<li> </li>
  	</ul>
  </div>
</body>
```
