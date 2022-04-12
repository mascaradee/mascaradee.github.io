---
layout: post
date: 2020-09-16 18:00:00 +0900
title: '[javascript] type conversion'
categories:
  - javascript
tags:
  - type conversion
---

* Kramdown table of contents
{:toc .toc}

## 타입 변환

### 암시적 타입 변환

자바스크립트는 특정 타입이 필요한 곳의 피연산자의 타입을 자동으로 변환한다.

비교 연산자 때문에 숫자가 아닌 `n`를 `Number(number)`로 자동 치환한다.

```js
var n = '123';

if(100 < n){
    console.log('Hello!');
}
```

논리 연산자 때문에 `boolean`이 아닌 `b`를 `Boolean(b)`로 자동 치환한다.  
하지만, `null-string('')` 아닌 문자열은 모두 `true`다. 참고로 `blank(' ')`도 true.

```js
var b = 'false';
var empty = '';
var blank = ' ';

if(b){
    console.log('world!');
}
if(!empty){
    console.log('I am here!');
}
if(blank){
    console.log('I am nobody');
}
```

덧셈에서는 양쪽 어느변 중 하나라도 `string`이면 둘 다 `string`으로 변환하여 연산한다.

```js
var s = 'str';

console.log('string concatenation:', s + 567); // 'str567'
console.log('string concatenation', 1 + 2 + '3'); // 33  - 연산자 우선순위 때문에 1 + 2 가 먼저 연산이 된후 string과 결합된다.
console.log('string concatenation', 1 + '2' + 3); // 123 - 이 경우 문자가 아닌 숫자는 String(1) 이런식으로 자동 치환함.
```

동등연산자 `==`는 피연산자들이 서로 다른 타입일때 타입 변화을 시도한다.
일치 연산자(`===`, 엄격한 동등 연산자)를 사용할 때는 암시적 타입 변환이 작동하지 않는다.

```js
console.log(true == 1); // true - true는 1로 치환후 계산
console.log(false == 0); // true - false는 0으로 치환후 계산
console.log(true === 1); // false
```

증감 연산자(++, --)를 사용할 때 숫자로 변환할 수 없는 값이면 `NaN`을 리턴한다.

```js
var a = 'a';
console.log(a++); // NaN
```

객체는 모두 true다. 심지어 아무것도 없어도

```js
console.log(Boolean([])); // true

var obj = {};
if(obj){
    console.log("there is not any values so it's not supposed to be here!! it's not my intention.");
}
```

아래와 같이 자바스크립트의 타입 자동변환을 이용해 코딩한 사례도 있으나 가시적이지 않으므로 비추

```js
console.log(!!1); // 이 코드의 원래 의도는  Boolean(1) 요것이다.
```


### 명시적 타입 변환
명시적으로 타입을 변환 시킬 때에는 `Boolean(), String(), Number(), Object()`을 이용하면 된다.

```js
Boolean('abcd'); // true
String(123); // "123"
String(true); // "true"
Number('123'); // 123
Number('a123'); // NaN
Object(123); // new Number(123)과 같다.
```

### 자바스크립트 타입 변환 표

[출처: JavasScript: The Definitive Guide. David Flanagan 저. 6판. 58쪽]

|                   |    String   | Number | Boolean |         Object        |
|:-----------------:|:-----------:|:------:|:-------:|:---------------------:|
| undefined         | "undefined" | **NaN**| false   | TypeError             |
| null              | "null"      | **0**  | false   | TypeError             |
| true              | "true"      | 1      |         | new Boolean(true)     |
| false             | "false"     | 0      |         | new Boolean(false)    |
| "" (empty string) |             | 0      | false   | new String("")        |
| "1.2"             |             | 1.2    | true    | new String("1.2")     |
| "one"             |             | NaN    | true    | new String("one")     |
| " "               |             | 0      | **true**| new String(" ")       |
| 123               | "123"       |        | true    | new Number(123)       |
| -1                | "-1"        |        | true    | new Number(-1)        |
| 0                 | "0"         |        | false   | new Number(0)         |
| -0                | "0"         |        | false   | new Number(-0)        |
| NaN               | "NaN"       |        | false   | new Number(NaN)       |
| Infinity          | "Infinity"  |        | true    | new Number(Infinity)  |
| -Infinity         | "-Infinity" |        | true    | new Number(-Infinity) |
| { }               |             |        | true    |                       |
| [ ]               |             | 0      | true    |                       |
| [9]               | "9"         | 9      | true    |                       |
| ["a"]             |             | NaN    | true    |                       |
| [1, 2]            |             | NaN    | true    |                       |
| function() { }    |             | NaN    | true    |                       |
