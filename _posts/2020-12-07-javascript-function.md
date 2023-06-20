---
layout: post
date: 2020-12-07 16:00:00 +0900
title: '[javascript] function'
categories:
  - javascript
tags:
  - function
  - ES6
  - declaration
  - expression
  - arrow function
  - rest parameter
  - default parameter
---

* Kramdown table of contents
{:toc .toc}

## 참고  
[드림코딩 by 엘리](https://www.youtube.com/watch?v=e_lU39U-5bQ&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=5)

# 함수

## 함수 선언 Function declaration

- 하나의 함수에는 한 가지 기능만 넣는 것이 좋다
- 네이밍은 동사로 시작
- 함수는 `object`이다.

`function name (param1, param2) { body ... return; }`

```js
function printHi() {
  console.log('Hi');
}
printHi();

function log(message) {
  console.log(message);
}
log('anoter Hi')
```

### Default function parameter

- 매개변수에 기본값을 설정할 수 있다.  
- ES6 부터 추가
- ie는 미지원  

`function 함수명 ( 매개변수1, 매개변수2 = 기본값 ) { }`

함수에 매개변수가 존재하고, 매개변수 중 기본값이 필요한 경우 `매개변수 = 기본값`의 형태로 표기할수 있다.  
물론 매개변수 없는 함수도 있으므로 꼭 넣어야 하는 필수 값은 아니다.  
만약 디폴트값이 없는 매개변수가 존재하는데 함수 호출 시, 해당 매개변수를 넘겨주지 않는다면 자바스크립트 엔진은 해다 매개변수의 값을 `undefined`로 세팅해 준다.  

```js
function showMessage(message, from) {
    console.log(`${message} by ${from}`);
}
showMessage('Hi!'); // Hi! by undefined

// OLD
function showMessage1(message, from) { // 2번째 인자의 기본 값을 설정할수 있다.
  if(from === undefined){
    from = 'Stranger';
  }
  console.log(`${message} by ${from}`);
}
showMessage1('Hi!'); // Hi! by Stranger

// NEW
function showMessage1(message, from ='Stranger') { // 2번째 인자의 기본 값을 설정할수 있다.
    console.log(`${message} by ${from}`);
}
showMessage1('Hi!'); // Hi! by Stranger
```

### Rest function parameter

- 정해지지 않은 개수의 매개변수를 배열로 전달받는다.
- ES6 부터 추가
- ie는 미지원  

`function 함수명(...변수명) {}`

여러 개의 매개변수를 표기할때 변수명(보통은 args로 표현) 앞에 `...`를 붙이면 배열을 의미한다.    

```js
function printAll(...args) {
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
    /*
    위과 같은 결과
    1) for... of
    for (const arg of args) {
        console.log(arg);
    }
    2) forEach()
    args.forEach((arg) => console.log(arg));
    */
}
printAll('apple', 'banana','mango');
```

### 함수 유효 범위

- 블록 기준 유효범위를 가지고 있는데 함수 역시 블록으로 여겨진다.  
- 블록 안에서는 밖의 요소를 참조할 수 있지만 밖에서는 안의 요소를 참조할 수 없다.

### 결과 리턴 return

```js
function fn() {
    console.log('hi');
    // return undefined; 가 생략되어 있는 것과 같음
}
fn();

function add(a, b) {
   return a + b;
}
const result = add(1, 2); // 3 : return a + b에 의해 값이 리턴됨
```

### Early return, early exit

조건에 맞지 않는 것은 빨리 종료를 할 수 있게 코딩하는 것이 좋다.  

```js
//bad
function update(point) {
  if(point > 10) {
    // do something
  }
}

// good
function update(point) {
  if(point <= 10) {
    return;
  }
  // do  something
}
```

## 함수 표현 Function expression

변수와 같이 취급되어  
- 변수에 할당할 수 있다.
- 매개변수로 사용 할 수 있다.
- 함수의 리턴값으로 사용 할 수 있다.

**※ statement : 정의 혹은 선언된 부분, expression : 연산이 되어 결과값으로 대체 되는 부분**

### 변수에 할당

익명함수는 변수에 할당 할 수 있다.  

```js
const fn = function () {
  console.log('I am function');
};
fn(); // I am function
const fn2 = fn; // 또 다른 변수에 할당 (함수 이름만 사용해서 할당, 함수호출과는 구분할것)
fn2(); // I am function
```

함수선언식과 함수표현식의 가장 큰 차이는 호이스팅의 여부이다.   
함수표현식은 호이스팅이 되지 않으므로 함수 호출은 꼭 함수 선언 이후에만 가능하다.

```js
fn(); // function.js:41 Uncaught ReferenceError: Cannot access 'fn' before initialization
const fn = function () {
  console.log('I am function');
};
fn(); // I am function : 정상 출력
```

하지만 함수선언식은 자동으로 호이스팅이 되어 자바스크립트 엔진에 의해 문서의 최상단으로 옮겨지게 되므로(실제 소스는 아니지만)
함수호출이 가능하다.

```js
fn3();  // I am hoisting : 정상 출력
function fn3() {
  console.log('I am hoisting');
};
fn3(); // I am hoisting : 정상 출력
```

### 함수 표현식 내의 콜백함수

함수의 매개변수에 또 다른 함수(콜백함수)를 세팅할 수 있다.  

```js
function createPicture(command, drawLine, drawCircle) {
    if (command === 'line') {
        drawLine();
    } else {
        drawCircle();
    }
}
const drawLine = function () { // 익명함수
    console.log('this is a line');
}
const drawCircle = function circle () { // 기명함수
    console.log('this is a circle');
}
createPicture('line', drawLine, drawCircle); // drawLine()은 함수이지만 매개변수로 넘길때는 '()'를 붙이지 않고 이름만 넘긴다. 변수를 넘길때 이름만 넘기는것과 같은 맥락
createPicture('circle', drawLine, drawCircle);
```

### 화살표 함수표현 Arrow function expression

익명함수로 이루어져 있다.  
ie 미지원

`(매개변수1, 매개변수2, ...) => 실행문`
기존 익명함수의 `function(매개변수)`는 `(매개변수, ...)`로 `{}`는 `=>`를 의미한다.  
이때 실행문이 한 줄인 경우에는 `return`이 자동으로 붙여서 해석된다.

```js
// 기존 익명함수
const sayHello = function () {
    console.log('hello');
};
sayHello();

// 매개변수가 없는 경우
const sayHello1 = () => console.log('hello');
sayHello1();

// 매개변수가 있는 경우
const saySomething = (something) => console.log(`${something}`);
saySomething('안녕');
```

실행문이 복잡한 경우 블록이 필요할때 화살표 함수와 혼용하여 사용가능하지만 2줄 이상의 표현식일경우, 꼭 return을 수동으로 표기해 줘야함.  

```js
const showMeMore = (a , b) => {  
  // do something more
  return a + b;
}
```

### 즉시 실행 함수 표현 Immediately Invoked Function Expression, IIFE

정의 되지마자 즉시 실행한다.  

`(function() { 실행문 })();`

```js
(function () {
  console.log('immediately show me');
})();
```
