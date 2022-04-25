---
layout: post
date: 2022-04-22 08:20:00 +0900
title: '[jQuery] html'
categories:
  - jQuery
tags:
  - jQuery
  - html
---

* Kramdown table of contents
{:toc .toc}

## 참고

[jquery-html](https://api.jquery.com/html/#html)

## html 내용 가져오기

`.html()`

 지정한 요소의 `html`태그를 문자열로 리턴한다.


 ```html
 <div id="demo-container">
   안녕하세요
   <div id="demo-box">
     여기는 div태그,
     <span>여기는 Span태그 자리</span>
   </div>
 </div>
 ```

 `div`태그 중 아이디가 `demo-container`를 찾아 태그 내부의 `html`을 문자열로 리턴한다.

```js
 $('div#demo-container').html();
```

결과는 아래와 같다.

```
'\n      안녕하세요\n      <div id="demo-box">\n        여기는 div태그,\n        <span>여기는 Span태그 자리</span>\n      </div>\n    '
```

## html 바꾸기

`.html( html로 변환할 문자열 )`  
`.html( function )`

지정한 위치에 문자열 혹은 함수로 전달받은 내용을 `html`로 변환하여 교체한다. 이 메서드는 브라우저의 `innerHTML`프로퍼티를 사용한다.


```js
 $('div#demo-container').html('<p>새로운 내용!</p>');
```

`div#demo-container`의 내용이 모두 삭제되고 `<p>새로운 내용!</p>`로 교체된다.

```html
<div id="demo-container">
  <p>새로운 내용!</p>
</div>
```

인수로 함수를 넘길 수도 있다.

```js
$('div#demo-container').html(function () {
    var emphasis = "<em>" + $( "p" ).length + " paragraphs!</em>";
    return "<p>All new content for " + emphasis + "</p>";
});
```

함수에서 리턴한 내용대로 `html`이 대체된다. 단, 함수는 1.4버전 이후부터 사용가능.

```html
<div id="demo-container">
  <p>All new content for <em>1 paragraphs!</em></p>
</div>
```

일부 브라우저에서는 제대로 작동이 되지 않으수도 있음에 주의, 특히 IE 9 이하
