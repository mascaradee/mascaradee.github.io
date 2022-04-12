---
layout: post
date: 2022-04-08 09:26:00 +0900
title: '[javascript] 함수 functions'
categories:
  - javascript
tags:
  - function
---

* Kramdown table of contents
{:toc .toc}

## 참고

[함수 기초](https://javascript.info/function-basics)

## 함수 functions

동일한 기능의 중복코드를 방지하기 위한 방법.
함수정의식은 중괄호에 의해 구분이 되므로 세미콜론은 생략 가능 하지만 함수표현식은 세미콜론이 필요.

```
function name(parameter1, parameter2, ... parameterN) {
  ...body...
}

// 호출
name();
```

### 변수 사용

변수의 유효범위에 따라 로컬과 글로벌 변수로 나뉜다.

```js
let globalV = 'hi '; // 실행 1

function fn() { // 호출되기 전까지 실행되지 않는다.
  let localV = 'there';
  alert(globalV + localV);
}

alert(globalV + localV); // 실행 2 -  localV를 알 수 없는 상태 : ReferenceError: localV is not defined
```

### 파라미터 parameters

함수에 임의의 데이터를 넘겨서 사용할 수 있도록 한다. 전역변수를 함수 내부에서 변경하면 전역변수 값이 변경되지만 전역변수를 파라미터로 넘기면 내부에서 해당 값을 복사를 해서 로컬변수처럼 사용하게 되고 값을 변경한다고 해도 전역변수에 영향을 미치지 않는다.

```js
function showMessage(from, text) {
  from = '*' + from + '*'; // make "from" look nicer
  alert( from + ': ' + text );
}

let from = "Ann";
showMessage(from, "Hello"); // *Ann*: Hello
// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

### 인자와 인수 parameters and arguments

* 인자(parameters): 함수 정의 시 사용
* 인수(arguments): 함수 호출 시 전달하는 값


### 기본값 default parameters

자바스크립트는 정의된 파라미터를 넘기기 않아도 에러가 나지 않는다. 다만, 해당 파라미터는 `undefined`가 될뿐이다. 이를 방지하기 위해 기본값을 설정할 수 있다.  
기본값에는 문자열뿐만아니라 표현식도 들어갈 수 있고 **파라미터가 넘겨지지 않을 때**만 실행이 된다.  

```js
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}
showMessage("Ann"); // Ann: no text given
```

기본값을 설정하지 않고 함수 내에서 조건문으로 파라미터를 체크할 수도 있다.

```js
function showMessage(text) {
  // ...

  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }
  alert(text);
}
showMessage(); // empty message
```

혹은 아래와 같이 한줄로도 가능하다. `OR` 연산자에 의해 피연산자는 `boolean`값으로 평가된다. `text`가 `undefined`라면 `false`로 변환되고 `true`를 찾아 반환하는 `OR`연산자의 특성상 `'empty message'`를 반환하게 된다.

```js
text = text || 'empty message';
```

최근 자바스크립트라면 아래와 같이 `null병합연산자`를 사용하여 0과 같은 `falsy`도 정상으로 체크할 수 있다.

```js
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}
showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```


### 리턴값

함수 내부에서 `return [값]`을 만나면 수행을 멈추고 호출한 곳으로 결과를 리턴한다.

```js
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

값이 없이 `return` 만 있는 경우는 함수 수행만 중단된다.

```js
let age = false;
function showMovie(age) {
  if ( !age ) {
    return; // 이 시점에 showMovie() 함수가 종료되므로 다음 alert()은 실행되지 않는다.
  }
  alert( "Showing you the movie" );
}
```

함수 바디에 내용이 없거나 `return`만 있는 경우 해당 함수는 `undefined`이다.

```js
function doNothing() { /* empty */ }
alert( doNothing() === undefined ); // true

function doNothing1() {
  return;
}
alert( doNothing1() === undefined ); // true
```

자바스크립트는 `return` 다음에 세미콜론이 있다고 추정하기 때문에 `return`과 값 사이를 줄바꿈하면 동작하지 않는다. 값이 줄바꿈이 필요하면 괄호로 묶는 것은 허용된다.


### 함수 네이밍

함수명은 동사로 짓는다. 간결하게 해당 함수의 기능을 나타내게 지어야 한다.
많이 쓰는 접두사는 아래와 같다.

- show
- get
- calc
- create
- check

함수마다 하나의 동작을 하도록 생성하는 것이 좋다. `getAge`라는 함수명이 있다면 이 함수에서는 나이를 얻는 동작만 해야 한다. 리턴받은 나이를 `alert`등으로 노출을 하는 동작은 같이 있으면 좋지 않다.  
함수 자체로 동작의 설명할 수 있도록 생성해야 한다.

아래는 소수(1과 자기 자신으로만 나눠지는 수)를 구하는 예시이다. 소수를 구하는 동작과 구해진 소수를 `alert`으로 노출하는 동작이 섞여 있다.

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    alert( i ); // a prime
  }
}
```

아래와 같이 또 다른 함수를 만드는 것이 더 좋은 예시이다.

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```
