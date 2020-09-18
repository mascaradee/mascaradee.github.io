---
layout: post
date: 2020-09-18 00:00:00 +0900
title: '[javascript] operator'
categories:
  - javascript
tags:
  - operator
---

## 참고
[https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%EB%B9%84%ED%8A%B8_%EC%97%B0%EC%82%B0%EC%9E%90](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%EB%B9%84%ED%8A%B8_%EC%97%B0%EC%82%B0%EC%9E%90)

## 연산자

- 산술 연산자
`+ - * / % ++ --`

- 할당 연산자
`= += -= *= /= %= &= ^= |= <<= >>= >>>=`

- 비교 연산자
`== === != !== > < >= <=`

- 논리 연산자
`&& || !`

- 비트연산자
`~ & | ^ << >> >>>`

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

### 일치 연산 `===`의 판단 기준

타입이 서로 다른 두 값은 불일치  

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

### 논리 연산자의 특징

피연산자가 boolean이 아닐 때 피연산자를 boolean으로 변환하여 비교하며,  
반환시엔 변환되기 전의 원래 값을 반환한다.  

```js
undefined && 1; // false && true로 변환 후 비교, undefined 반환
true && '123'; // true && true로 변환 후 비교, '123' 반환
```

다른 연산자처럼 피연산자를 평가(evaluate)하는 과정을 거치는데,  
함수의 경우 실행 후 반환된 값을 boolean으로 변환하여 판단한다.  
따라서 연산자에 따라 함수가 둘 다 실행될 수도 있고 좌변의 함수만 실행될 수도 있다.  

```js
alert(1) && alert(2); // alert(1)만 실행
alert(1) || alert(2); // 둘 다 실행
```

#### `&&` 연산

좌변, 우변 모두 `true`여야 하는데,  
좌변이 `false`일 때는 우변을 검사할 필요 없어 좌변 값을 반환

```js
undefined && 1; // false && 1로 변환하여 검사하지만 좌변이 false이므로 좌변의 값인 undefined가 반환
```

좌변이 `true`일 때는 우변도 검사하여 `true, false` 결과에 상관없이 우변 값을 반환

```js
true && 1; // true && true -> 우변 값인 1 반환
true && undefined; // true && false -> 우변 값인 undefined 반환
```

#### `||` 연산

좌변, 우변 중 하나마 `true`이면 되므로,  
좌변이 `true`일 때는 우변을 검사할 필요 없이 좌변 값을 반환

```js
1 || false; // true || false -> 좌변 값인 1 반환
```

좌변이 `false`일 때는 우변도 검사하여 `true, false` 결과에 상관없이 우변 값을 반환

```js
0 || null; // false || false -> 우변 값인 null 반환
```

#### `&&`와 `||`로 만드는 삼항 연산자

```js
var a = 1;
var b = 2;
var resulta = (a == 1) && 'equal' || 'not equal';
var resultb = (b == 1) && 'equal' || 'not equal';
/*
(a == 1) && 'equal' || 'not equal'
true && 'equal' || 'not equal'  -> && 연산의 좌변이 true이므로 우변 검사
'equal' || 'not equal'
true || true -> 문자열은 true이고 || 연산의 좌변이 true이므로 좌변 값 반환
'equal'


(b == 1) && 'equal' || 'not equal'
false && 'equal' || 'not equal' -> && 연산의 좌변이 false이므로  좌변 반환
(b == 1) || 'not equal'
false || 'not equal' -> ||연산의 좌변이 false이므로 우변 값 반환
'not equal'
*/
```

### 비트 연산

바이너리 연산으로 산술연산보다 속도가 빠르다.

#### 비트 단위 NOT 연산자 `~`

피연산자의 32비트가 모두 뒤집힌다. (1은 0으로, 0은 1로)  
이 과정에서 가장 왼쪽의 부호 비트도 뒤집히면서 양수는 음수로, 음수는 양수로 바뀐다.

```js
~10; // -11
~-10; // 9
```

#### 비트 단위 AND 연산자 `&`

10진수 10 = 2진수 1010
10진수 11 = 2진수 1011
둘을 AND 연산한 결과는 1010

```js
10 & 11; // 10

/* 실제론 아래와 같이 2진수로 연산
1010
1011
1010 -> 1 & 1 = 1로 반환 그 외는 모두 0
*/
```

#### 비트 단위 OR 연산자 `|`

10진수 10 = 2진수 1010
10진수 11 = 2진수 1011
둘을 OR 연산하여 결과는 1011

```js
10 | 11; // 11

/* 실제론 아래와 같이 2진수로 연산
1010
1011
1011 -> 0 | 0 = 0 그 외에는 모두 1
*/
```
