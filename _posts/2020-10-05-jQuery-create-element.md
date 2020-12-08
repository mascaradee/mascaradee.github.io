---
layout: post
date: 2020-10-05 18:00:00 +0900
title: '[jQuery] create element'
categories:
  - jQuery
tags:
  - create
  - element
---

## 요소 생성 방법 1

아래 예제는 아이디가 `article`인 `div`요소 내 마지막에 `button`태그 추가  

```html
<script>
$(document).ready(function() { // DOM 생성이 완료된 시점
 	$('#article').append('<button type="button">뀨?</button>') // .append() : 선택된 요소 내 마지막에 추가
});
</script>
</head>
<body>
  <div class="align-center" id="article">
  	<h1>jQuery create element test</h1>
  	<hr>
  	<p>description</p>
    <!-- 이 부분에 <button type="button">뀨?</button> 추가됨  -->
  </div>
</body>

```

## 요소 생성 방법 2

아이디가 `article`인 `div`요소 내 마지막에 `button`태그 추가  

```html
<script>
$(document).ready(function() { // DOM 생성이 완료된 시점
	var $ele = $('<button>');
	$ele.attr('type', 'button');
	$ele.text('뀨뀨?');
	$('#article').append($ele);
});
</script>
</head>
<body>
  <div class="align-center" id="article">
  	<h1>jQuery create element test</h1>
  	<hr>
  	<p>description</p>
    <!-- 이 부분에 <button type="button">뀨뀨?</button> 추가됨  -->
  </div>
</body>

```
