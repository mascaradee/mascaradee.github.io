---
layout: post
date: 2020-09-15 14:00:00 +0900
title: '[javascript] hoisting'
categories:
  - javascript
tags:
  - hoisting
---

* Kramdown table of contents
{:toc .toc}

## 호이스팅
호이스팅이란, 정의된 함수나 변수가 유효범위의 최상단으로 끌어올려지는 특성을 말함  

### 변수의 호이스팅

`a()` 함수 내에서 실제 실행 순서가 변경이 되는데 함수 내의 모든 변수의 선언이 가장 먼저 실행된다.
그렇기 때문에 `scope`는 전역 변수가 아닌 로컬 변수를 의미하고 아직 값 할당이 이루어지지 않아 `undefined`가 된다.  

```js
var scope = 'global';
function a() {
	console.log(scope); // undefined
	var scope = 'local';
	console.log(scope); // local
	var a = 1;
	var b = 2;
}
a();

// 위 한수는 실제로 아래와 같이 실행
/*
var scope = 'global';
function a() {
  var scope, a, b; // 변수의 호이스팅
  console.log(scope); // undefined
  scope = 'local';
  console.log(scope);  // local
  a = 1;
  b = 2;
}
*/
```

### 함수의 호이스팅

실제 실행 시 함수 정의식, 변수 선언, 호출식 순으로 작동하므로 `fn()` 함수는 변수 `fn`의 값으로 대체되어 찾을 수 없는 상태가 된다.

```js
var fn = 0; // 변수 선언
function fn() { // 같은 이름으로 함수 선언
  // ...
}
fn(); // TypeError: fn is not a function
fn; // 0

/*
// 위 코드는 실제로 아래처럼 작동한다.
function fn() {
  // ...
} // 함수의 호이스팅
var fn; // 변수의 호이스팅
fn = 0; // 같은이름의 변수 0으로 대체
fn(); // fn() 함수는 찾을 수 없음
fn; // 변수 값 0이 출력
*/
```

### 함수 표현식의 호이스팅 예외

함수 정의식과 달리 함수 표현식은 호이스팅이 되지 않는다.  
실제로 함수 표현식을 제대로 실행하기 위해서 호출식 이전에 위치해야 한다.  

```js
first(); // 실행됨
second(); // Uncaught TypeError: second is not a function
// 함수 정의식
function first() {}
// 함수 표현식
var second = function() {};

/*
// 위 코드는 실제로 아래처럼 작동한다.
function first(){}
var second;
first();
second();
second = function() {}; // 함수 표현식은 호이스팅 되지 않는다.
*/
```
