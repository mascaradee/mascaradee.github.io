---
layout: post
date: 2020-05-20 00:00:00 +0900
title: '[javascript] comparison operator'
categories:
  - javascript
tags:
  - comparison operator
---

* Kramdown table of contents
{:toc .toc}

## 참고 사이트

[https://ko.javascript.info/comparison](https://ko.javascript.info/comparison)  
[https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%EB%B9%84%ED%8A%B8_%EC%97%B0%EC%82%B0%EC%9E%90](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%EB%B9%84%ED%8A%B8_%EC%97%B0%EC%82%B0%EC%9E%90)

## 비교연산자

`<`, `>`, `<=`, `>=`, `==`, `!=`  
불린형을 반환  

### 문자열 비교

유니코드값에 따라 크고 작음을 판단. 일반적인 사전순으로 문자열을 비교하는 것과 같으나 자바스크립트는 대소문자도 구분하여 비교.  
소문자가 더 값이 큼.

```javascript
alert('Z' > 'z'); // false
```

### 다른 형끼리 비교

사칙연산자와 마찬가지로 비교연산자 역시 인수를 숫자형으로 자동변환하여 비교한다.

```javascript
alert('39' < 40 ); // true
alert(true == 1); // true

let a = 0;
alert( Boolean(a)); // boolean 0은 false

let b = '0';
alert(Boolean(b)); // 문자열의 boolean타입은 true

alert(a == b); // 비교연산자는 모든 인수를 숫자형으로 변환하므로 0=0으로 true

```

### 동등 연산 `==`의 판단 기준

같은 타입, 같은 값을 가지고 있는 두 값은 동등
문자열과 숫자 비교 시 타입은 문자열은 숫자로 변환되고 그 값이 같으면 동등

```js
1 == 1; // true
1 == '1'; // true
```

두 값 중 하나가 null이고 다른 하나가 `undefined`라면 두 값은 동등  

```js
null == undefined; // true
```

boolean 값과 비교시 `true`는 1로 변환, `false`는 0으로 변환 후 비교

```js
true == '1'; // true :  1 == '1' 비교로 변환된다.
true == '2'; // false
```

객체와 숫자 혹은 문자열 비교이면, 객체를 원시 타입으로 변환 후 비교

```js
[2] == '2'; //true
```

### 일치 연산자 `===`

동등 연산자 `==`는 자동형변환으로 0과 false를 구별하지 못하지만 일치 연산자 `===`는 형까지 비교를 하므로 구별할 수 있다.

```javascript
alert(0 === false); // false, 피연산자의 형이 다름
```

```js
1 === '1'; // false
```

두 값 중 하나가 null이고 다른 하나가 `undefined`라면 두 값은 불일치

```js
null === undefined; // false
```

NaN 값은 자신을 포함해 다른 어떤 값과도 일치하지 않음

```js
NaN === NaN; // false
```

0은 -0은 일치

```js
0 === -0; // true
```

모두 같은 객체나 배열 또는 함수를 참조하고 있다면 두 값은 일치하지만,  
같은 프로토타입에 의해 생성된 2개의 객체는 일치하지 않는다.

```js
function Fn(){ console.log(1) }
var a = Fn;
var a1 = Fn;
a === a1; // true

var b = new Fn();
var c = new Fn();
b === c; // false

({a:1}) === ({a:1}); // false
```

### null과 undefined 비교

일치 연산자 `===`를 제외하고 비교연산자는 null이나 undefined이 피연산자로 올 경우 원하지 않는 결과가 나올수 있으므로  
주의해야한다. 따라서 변수가 null이나 undefined가 될 가능성이 있다고 판단되면 따로 처리하는 코드가 필요하다.

```javascript
alert(null === undefined); // false, 형이 다름
alert(null == undefined); // true, 예외 규칙임
alert(null < undefined); // false, null은 0, undefined는 NaN
```

* null vs 0

```javascript
alert(null > 0); // false, 0 > 0 이므로
alert(null == 0); // false, 동등연산자는 null이나 undefined는 형변환하지 않으므로 비교 불가
alert(null >= 0); // true, 0 >= 0 -> 실제 이런 결과를 원하지 않을수도 있으므로 주의해야함.
```

* 비교 불가능한 undefined

```javascript
alert(undefined > 0); // false, NaN > 0
alert(undefined < 0); // false, NaN < 0
alert(undefined == 0); // false,  동등연산자는 null이나 undefined는 형변환하지 않으므로 비교 불가
```


##### 연습문제

```javascript
alert(5 > 4); // true
alert('apple' > 'pineapple'); // false, 문자열은 사전순으로 비교
alert('2' > '12'); // ~false~ -> true, ~비교연산자는 숫자형으로 자동변환하여 비교~ -> 문자열끼리 비교임
alert(undefined == null); // true, 예외로 같은 취급
alert(undefined === null); // false, 자동형변환 되지 않아 다름
alert(null == '\n0\n'); // ~true~ -> false , ~숫자형으로 변환 0 == 0~ ->null과 같은 건 undefined만
alert(null === +'\n0\n'); // false, null === 0
```
