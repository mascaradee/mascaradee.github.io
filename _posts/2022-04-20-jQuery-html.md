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

## html 태그 가져오기

`.html()`

 지정한 요소 내 자식 요소의 `html`태그를 문자열로 리턴한다.


 ```html
 <div id="demo-container">
   <div id="demo-box">
     Demonstration Box
     <span>Span</span>
   </div>
 </div>
 ```

 `div`태그 중 아이디가 `demo-container`를 찾아 그 자식 요소의 태그를 문자열로 리턴한다.

```js
 $('div#demo-container').html();
```

결과는 아래와 같다.

```
'\n      <div id="demo-box">\n        Demonstration Box\n        <span>Span</span>\n      </div>\n    '
```
