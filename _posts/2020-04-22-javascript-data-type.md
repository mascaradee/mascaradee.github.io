---
layout: post
date: 2020-04-22 00:00:00 +0900
title: '[javascript] data type'
categories:
  - javascript
tags:
  - data type
---

* Kramdown table of contents
{:toc .toc}

## 수(Number) 관련 함수

#### parseInt(파싱할 문자열, 진수)

모든 브라우저 호환, 단 IE는 9 이상부터 가능

```javascript
 parseInt('010', 10); // 10
 parseInt('010'); // 10 -> 구형 브라우저에서 "0"으로 시작하는 문자열은 8 진수 (기수 8)로 가정되지만, 2013 년 이후에는 그렇지 않다.
```

#### parseFloat (파싱할 문자열)

항상 10진수만  

```javascript
parseFloat('0.1'); // 0.1
```

#### `+`연산자를 이용한 파싱

```javascript
+ '42' // 42
+ '010' // 10 -> 10진수로 파싱
+ '0x10' // 16 -> 16진수 파싱
```

#### 내장함수와 `+`연산자 차이

```javascript
parseFloat('10.2abc'); // 10.2 -> 문자열을 숫자로 파싱할 수 없을때까지만 하고 그 결과 리턴
+ '10.2abc'; // NaN -> 문자열이 섞여 있으면 무조건 NaN 리턴
```

#### NaN

```javascript
parseInt('hello', 10); // NaN (Not a Number)
NaN + 5; // NaN (Not a Number)
isNaN(NaN); // true
isNaN(1); // false
```

#### Infinity와 -Infinity

```javascript
1 / 0; //  Infinity
-1 / 0; // -Infinity

// isFinite() : 유한인지 여부
isFinite(1 / 0);     // false
isFinite(-Infinity); // false
isFinite(NaN);       // false
```

#### BigInt

자바스크립트 허용 숫자 범위는 -2<sup>53</sup> ~ 2<sup>53</sup> 사이로 16자리 정수인데   
이것보다 더 큰 숫자가 필요하거나 아주 높은 정밀도 작업이 필요할때 사용  
정수 리터럴 끝 + `n` 을 붙여 사용  
일부 브라우저의 일부버전에서만 지원 (Firefox, Chrome, Edge, Opera)

```javascript
let bigInt = 1234567890223456789032345678904234567890n;
```

## 문자열(Strings)

큰따옴표 혹은 작은 따옴표 구분없이 둘 중 하나로 묶으면 문자열로 인식  

### 역 따옴표(backtick): \` \`

역따옴표 안에 `${}`로 변수나 표현식을 넣어주면 해당 부분에 값이 넣어짐.

```javascript
let name = 'Jamie';

alert(`Welcome, ${name}!`); // Welcome, Jamie!
alert(`일 더하기 일은 ${1+1}`); // 일 더하기 일은 2
alert( `Welcome ${1}` ); // Welcome 1 -> 1이 표현식
alert( `Welcome ${"name"}` ); // Welcome name -> "name" 이 표현식
```

### 문자열(Strings) 관련 함수

```javascript
'hello'.length; // 5
'hello'.charAt(0); // "h"
'hello, world'.replace('hello', 'goodbye'); // "goodbye, world"
'hello'.toUpperCase(); // "HELLO"
````

## 널(Null)

의도적으로 값이 없음을 가리키는 '객체' 타입의 객체인 null,  
다른 언어에서는 자바스크립트의 null과는 조금 다른 성격으로 존재하지 않는 것을 가리킬때 쓰임.

```javascript
let name = null;
alert(name); // null
```

## 정의되지 않음(undefined)

초기화되지 않은 값, 아직 어떤 값도 주어지지 않은(할당되지않은) 변수임을 가리키는 '정의되지 않음' 타입의 객체인 undefined

```javascript
let a;
alert(a); // undefined
```

## 불리언(boolean)
`false`, `0`, 빈 문자열 (`""`), 수가 아님을 뜻하는 `NaN`, `null`, 와 `undefined`은 모두 `false`  
다른 모든 값은 `true`  

```javascript
if(1) { // true이므로 조건 만족하여 아래 수행
    // do something
}

let isLesser = 1 > 2;
alert( isLesser ); // false
```

## 객체(Objects)
간단히 이름-값 쌍(name-value pairs)의 모임. 한 가지만 표현할 수 있는 원시자료형과 달리 복잡한 개체를 표현할 때 사용.

```javascript
// 객체 생성1
var obj = new Object();

// 객체 생성2 : 객체 리터럴 구문
var obj = {};
obj.name = "Simon";

// 객체 속성에 접근하는 방법
> obj.name // "Simon"
> obj["name"] // "Simon"

var obj = {
    name: "Carrot",
    "for": "Max",
    details: {
        color: "orange",
        size: 12
    }
}

> obj.details.color // "orange"
> obj["details"]["size"] // 12
```

### 배열(Array)

```javascript
// 배열객체 생성 1
var a = new Array();
a[0] = "dog";
a[1] = "cat";
a[2] = "hen";

// 배열객체 생성 2 : 배열 리터럴 이용
var a = ["dog", "cat", "hen"];

// 내장함수 length : 배열에서 가장 큰 인덱스보다 + 1, 배열의 개수가 아님!!
> a.length
> 3

var b = new Array();
b[100] = "coq";
> b.length
> 101
```

### 함수(Function)
first-class function으로 변수할당, 인자, 리턴값으로도 사용할수 있다.  

```javascript
function add(x, y){
  var total = x + y;
}
> add(1, 2); // undefined -> return문이 없을 경우

function add(x,y){
  var total = x + y;  
  return total;
}
> add(); // NaN -> undefined에 대해 덧셈을 수행할 수 없습니다
> add(10, 20, 3); // 30 -> 처음의 두 수가 더해집니다. 3은 무시됨

function add() {
  var sum = 0;
  for(var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
    console.log(sum);
  }
  return sum;
}
> add(2,3,4,5); // 14

다른 표기 방법 (function expression)은 아래와 같다.  함수선언은 hoisting이 되지만 이건 안된다.  

var avg = function() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum / arguments.length;
}

/* console.log(arguments);
Arguments(4) [2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
0: 2
1: 3
2: 4
3: 5
callee: ƒ add()
arguments: null
caller: null
length: 0
name: "add"
prototype: {constructor: ƒ}
__proto__: ƒ ()
[[FunctionLocation]]: VM1636:1
[[Scopes]]: Scopes[1]
length: 4
Symbol(Symbol.iterator): ƒ values()
__proto__: Object
(중략)
*/
```

### 날짜(Date)

### 정규식(RegExp)

## 심볼(Symbol)
고유한 식별자가 필요한 경우 사용.  

```javascript
const sb1 = Symbol('id');
const sb2 = Symbol('id');
console.log(sb1 === sb2); // false : 같은 문자열 'id'로 심볼을 만들었으나 고유한 다른 식별자로 인식됨

const gSb1 = Symbol.for('id');
const gSb2 = Symbol.for('id');
console.log(gSb1 === gSb2); // true
console.log(`value: ${sb1.description}, type: ${typeof sb1}`); // value: id, type: symbol
```

## typeof 연산자

인수의 자료형을 리턴. 변수의 자료형을 알아낼때 사용

```javascript
typeof 1; // "number"
typeof 101010101010101110101010101101010101010n; // "bigint"
typeof '일'; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" -> 실제 객체는 아니지만 호환성을 위해 수정을 하지 않고 남겨놓은 것임.
typeof Date; // "function" -> 함수는 객체형에 속함
typeof Symbol("id") // "symbol"
```
