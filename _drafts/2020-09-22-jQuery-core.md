---
layout: post
date: 2020-09-22 19:00:00 +0900
title: '[jQuery] core'
categories:
  - jQuery
tags:
  - core
---

## 참고사이트
- jQuery 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 코어  
[https://api.jquery.com/category/core/](https://api.jquery.com/category/core/)

## jQuery()  
[https://api.jquery.com/jQuery/](https://api.jquery.com/jQuery/)  

jQuery는 $로 대체할 수 있다.  
$가 싫으면 다른걸로 바꿀 수 있다. jQuery는 $를 재정의하는 함수를 제공한다.  

`jQuery( selector [, context] )`

가장 자주 쓰게 될 DOM 셀렉터  
- selector: jQuery 셀렉터 문법으로 작성된 문자열(CSS3 셀렉터를 확장한다)
- context: 탐색할 범위를 의미하고 CSS로 표현. 찾을 대상의 부모를 표시.  
  가령 context가 'div#abc'인 경우 ID가 abc인 DIV 태그 하위의 요소만 탐색한다.

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
  var $firstHeader = $('h1:first'); // h1 태그 중 첫번째 요소 반환
  var $phraseInUnorderedList = $('p', 'ul'); // $('ul').find('p') 와 같음. 즉, p태그 중 ul태그 하위에 있는 요소 찾기
  </script>
</body>
```

참고로 위 소스에서 `<script></script>`를 `<head></head>` 내부가 아닌  
`<body></body>` 내부에 넣은 이유는 스크립트에서 DOM을 참조해야 하는데  
DOM보다 먼저 써버리면 위에서부터 순차적으로 해석을 하는
HTML 특성상 참조할 DOM이 없어 실제 원하는 값($firstHeader 혹은 $phraseInUnorderedList) 을 찾을 수 없기 때문이다.

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
