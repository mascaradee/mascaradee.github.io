---
layout: post
date: 2020-12-11 17:00:00 +0900
title: '[javascript] callback'
categories:
  - javascript
tags:
  - callback
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- 드림코딩 by 엘리  
[https://www.youtube.com/watch?v=s1vpVCrT8f4&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=11](https://www.youtube.com/watch?v=s1vpVCrT8f4&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=11)

## Callback

자바스크립트는 동기적인 언어이다. hoisting 이후로 순서대로 코드가 실행이 된다.  
**※ hoisting : var, function 선언이 제일 위로 올라가서 먼저 실행되는 것**  

```js
console.log('1');
setTimeout(() => console.log('2'), 1000);
console.log('3');

// 동기 콜백함수
function printImmediately(print) {
    print();
} // hoisting
printImmediately(() => console.log('hello'));

// 비동기 콜백함수
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
} // hoisting
printWithDelay(() => console.log('async callback'), 2000);

/*
1
3
hello
2
async callback
*/
```
원래대로라면 코딩된 순서대로 실행이 되어야 하지만 자바스크립트 엔진이 위 코드를 읽으면  
(1) `console.log('1')` 실행 (동기)  
(2) `setTimeout()` 브라우저 API로 브라우저에 1초 후에 콜백함수를 호출하도록 요청 (비동기)  
(3) `console.log('3')` 실행 (동기)  
(4) `printImmediately()` 실행 (동기)  
(5) `printWithDelay()`내 `setTimeout()`으로 브라우저에 2초 후에 콜백함수를 호출하도록 요청 (비동기)  
(6) 1초후에 브라우저에서 콜백함수 `()=> console.log('2')`를 실행하게 된다.  
(7) 2초후에 브라우저에서 콜백함수 `()=> console.log('async callback')`를 실행하게 된다.  
