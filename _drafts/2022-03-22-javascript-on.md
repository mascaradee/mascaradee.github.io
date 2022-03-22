---
layout: post
date: 2022-03-22 08:27:00 +0900
title: '[javascript] on'
categories:
  - javascript
tags:
  - on
  - bubble
  - event
---

* Kramdown table of contents
{:toc .toc}

## .on()

이벤트를 붙여주는 기능


`.on(이벤트종류명 [, 적용 셀렉터] [, 데이터], 핸들러함수)`

```html
<div id="userGroup">
  <div id ="userInfo">
    <label>아이디</label>
    <input type="text" id="userId" /><br/>
    <label>이름</label>
    <input type="text" id="userName" /><br/>
  </div>
  <div id="saved">
    <label>저장여부</label>
    <input type="checkbox" id="checkYn"/><br/>
  </div>
</div>
```

```js
$('#userInfo').on('change', 'input', () => {
    debugger;
    console.log($(this).text());
});

```




`.on(이벤트정보 [, 적용 셀렉터] [, 데이터])`
