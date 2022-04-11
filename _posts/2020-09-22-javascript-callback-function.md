---
layout: post
date: 2020-09-22 19:00:00 +0900
title: '[javascript] callback function'
categories:
  - javascript
tags:
  - callback function
---

* Kramdown table of contents
{:toc .toc}

## 콜백 함수

자바스크립트에서 함수는 함수 자체로 객체이며 매개변수로 전달 가능한 특성이 있다.  
그래서 자바스크립트의 함수는 1급 함수라고 한다.  
콜백 함수란 콜리가 주어진 일을 끝낸 후 콜러를 다시 호출하는 것을 개념적인 표현이다.  
흔하 들어지는 예로 비동기 함수 `setTimeout()`가 있다.  

```js
function callback() {
	console.log('times up'); // 출력순서 3 -> 2초 후
}

console.log("before the setTimeout"); // 출력순서 1
setTimeout(callback, 2000);
console.log("i'm off."); // 출력순서 2
```

`setTimeout`을 동기적 작동 방식으로 구현하면

```js
function giveMeCallback(callme, mills) {
	var i = 0;
	var stop = mills * 1000000;
	while (i < stop) {
		i++;
	}
	callme();
}

console.log("hello while"); // 출력순서 1
giveMeCallback(function() {
	console.log('i\'m leaving'); // 출력순서 2 -> 2초 후 출력
}, 2000);
console.log("don't leave me"); // 출력순서 3
```
