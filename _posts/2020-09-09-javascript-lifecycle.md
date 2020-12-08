---
layout: post
date: 2020-09-09 22:00:00 +0900
title: '[javascript] lifecycle'
categories:
  - javascript
tags:
  - lifecycle
---

## 라이프 사이클

변수나 함수가 생존하는 시점 혹은 유효범위(scope)를 말한다.  
블록기준의 유효범위를 갖는 자바와는 달리 자바스크립트는 함수기준으로 유효범위가 정해진다.

```js
var a = 1; // 전역변수
function fn(){
  var b = 2; // 로컬변수
  console.log('b1: ', b); // 2
}
fn();
console.log('a: ', a); // 1
//console.log('b2: ', b); // Uncaught ReferenceError: b is not defined
```

전역변수 `a`와 로컬변수 `a`는 변수명은 동일하지만 선언된 위치가 함수 안(로컬변수)과 밖(전역변수)으로 다르다.  
따라서 서로 다른 개체라고 볼수 있다.

```js
var a = 1; // 전역변수
function fn(){
  var a = 2; // 로컬변수
  console.log('a1: ', a); // 2, 로컬변수 출력
}
fn();
console.log('a2: ', a); // 1, 전역변수 출력
```

하지만 함수 안에서 전역변수 `a`를 호출하여 새로운 값을 할당하면 전역변수 `a`의 값이 변경된다.

```js
var a = 1;
function fn(){
  a = 2; // 전역변수 a에 2라는 값을 재할당
  console.log('a1: ', a); // 2, 전역변수에 새로 할당된 값 출력
}
fn();
console.log('a2: ', a); // 2, 전역변수 출력
```

`c` 변수의 경우 블록안에서 선언되었지만 그 블록이 함수 안에 존재하므로 블록밖, 함수 안에서 유효하다.

```js
function fn(){
  {
    var c = 3;
    console.log('c1: ', c); // 3
  }
  console.log('c2: ', c); // 3
}
fn();
```

`i` 역시 `for`문 내에서 선언된 변수이지만 `for`문이 함수 안에 있으므로 값을 출력할수 있다.  
**하지만 `let` 을 이용해 선언된 변수는 자바 규칙과 동일하게 블록 안에서만 유효하다.**

```js
function fn(){
  for (var i = 0; i < 10; ++i) {}
	console.log('hello: ', i); // 10

	for (let j = 0; j < 10; ++j) {}
	// console.log('hellooo', j); // Uncaught ReferenceError: j is not defined
}
fn();
```
