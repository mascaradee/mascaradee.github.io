---
layout: post
date: 2020-09-09 22:00:00 +0900
title: '[javascript] closure'
categories:
  - javascript
tags:
  - closure
---

## 클로저

함수 안에서 정의되어 유효범위가 끝난 변수나 함수가 유효범위 밖에서 생존하는 특성  
일반적으로 자바스크립트의 유효범위는 함수내로 제한이 있다.

```js
function fn() {
  var a = 1;
  console.log('a: ', a);
}
fn();
console.log(typeof a); // undefined
```

`a`가 클로저 스코프에 해당하는 변수이다.    
`a`는 `getInnerFunction()` 함수 안에 있는 변수이므로 해당 함수가 실행되고 난 이후에는 사라지는게 맞지만   
리턴된 `inner()` 함수가 참조를 하고 있으므로 `b`가 실행되었을때도 살아있게 된다.

```js
function getInnerFunction(){
  var a = 'Still alive';
  function inner(){
    console.log(a);
  }
  return inner;
}
var b = getInnerFunction(); // inner = function inner(){console.log(a)} = Strill alive
b(); // Still alive
```
