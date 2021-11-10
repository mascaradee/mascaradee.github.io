---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[javascript] 정의되기 전 function 호출 시 오류 방지'
categories:
  - javascript
tags:
  - function
  - typeof
---

* Kramdown table of contents
{:toc .toc}

## function 정의되지 않아 나는 오류 방지

`Uncaught ReferenceError: setTimeoutForMain is not defined`


`setTimeoutForMain`라는 `function`이 정의되지 않은 상태에서 호출 했을 때 나는 에러다.
간단한 방지책으로 `typeof`를 사용하여 `function`이 정의가 되어 있으면 실행하도로 유도한다.

```js
onclick="typeof setTimeoutForMain == 'function' && setTimeoutForMain();"
```

```js
if (typeof setTimeoutForMain == 'function') {
  if (index == 2) {
    setTimeoutForMain();
  }
}
```
