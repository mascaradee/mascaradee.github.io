---
layout: post
date: 2020-04-22
title: '[javascript] data type'
categories:
  - javascript
tags:
  - data type
---

## 수(Number) 관련 함수

#### parseInt(파싱할 문자열, 진수)

```javascript
 parseInt('010', 10); // 10
 parseInt('010'); // 10 -> 구형 브라우저에서 "0"으로 시작하는 문자열은 8 진수 (기수 8)로 가정되지만, 2013 년 이후에는 그렇지 않다.
```

#### parseFloat (파싱할 문자열) :  항상 10진수만

```javascript
parseFloat('0.1'); // 0.1
```

#### + 연산자를 이용한 파싱

```javascript
+ '42' // 42
+ '010' // 10 -> 10진수로 파싱
+ '0x10' // 16 -> 16진수 파싱
```

#### 내장함수와 +연산자 차이

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
일부 브라우저에서만 지원 (Firefox, Chrome)
```javascript
let bigInt = 1234567890223456789032345678904234567890n;
```



<br>

## 문자열(Strings) 관련 함수

```javascript
'hello'.length; // 5
'hello'.charAt(0); // "h"
'hello, world'.replace('hello', 'goodbye'); // "goodbye, world"
'hello'.toUpperCase(); // "HELLO"
````

<br>

## 널(Null)
의도적으로 값이 없음을 가리키는 '객체' 타입의 객체인 null

<br>

## 정의되지 않음(undefined)
초기화되지 않은 값, 아직 어떤 값도 주어지지 않은(할당되지않은) 변수임을 가리키는 '정의되지 않음' 타입의 객체인 undefined

<br>

## 불리언(boolean)
- `false`, `0`, 빈 문자열 (`""`), 수가 아님을 뜻하는 `NaN`, `null`, 와 `undefined`은 모두 `false`
- 다른 모든 값은 `true`

```javascript
if(1) { // true이므로 조건 만족하여 아래 수행
    // do something
}
```

<br>

## 객체(Objects)
간단히 이름-값 쌍(name-value pairs)의 모임

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

/* 다른 표기 방법 */
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
