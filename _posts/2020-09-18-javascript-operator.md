---
layout: post
date: 2020-09-18 00:00:00 +0900
title: '[javascript] operator'
categories:
  - javascript
tags:
  - operator
---

* Kramdown table of contents
{:toc .toc}

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

논리연산자의 조건 중 복잡한 것은 가장 마지막에 체크하도록 코딩하는 것이 좋다.
`v1`이 `false`라면 바로 `false`를 반환하므로 불필요하게 복잡한 `fn()`을 체크할 필요가 없다.

```js
const v1 = '';
const v2 = true;
console.log(`&&연산자: ${v1 && v2 && fn()}`); // 아래보다 더 좋은 예시
console.log(`&&연산자: ${fn() && v1 && v2}`);
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
----
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
----
1011 -> 0 | 0 = 0 그 외에는 모두 1
*/
```

#### 비트단위 XOR 연산자 `^`

10진수 10은 2진수 1010
10진수 11은 2진수 1011
XOR 결과          0001


```js
10 ^ 11; // 1

/* 실제론 아래와 같이 2진수로 연산
1010
1011
----
0001 -> 같은 숫자는 0, 다른 숫자일경우는 1
*/
```

#### 좌측 시프트 연산자 `<<`

`<<` 는 우변의 숫자 n만큼 2의 n제곱을 해 준다.

```js
10 << 1; // 20 -> 10 * (2의 1제곱)
10 << 3; // 80  ->  10 * (2의 3제곱)
2 << 2; // 8 -> 2 * (2의 2제곱)
```

역시 실제론 2진수로 연산이 된다.  
10진수 10은 2진수 1010으로 아래와 같은 형태라고 보면  

|0|0|0|0|...|1|0|1|0|
|-|-|-|-|---|-|-|-|-|

이걸 좌측으로 한 칸 시프트 하면(`10 << 1`) 10100이 된다. (새로 추가된 자리는 0으로 채움)

|0|0|0|0|...|1|0|1|0|`0`|
|-|-|-|-|---|-|-|-|-|---|

2진수 10100값은 10진수로 `16 + 4 = 20` 이 된다.

|2진수      | 1| 0| 1| 0| 0|
|-----------|--|--|--|--|--|     
|10진수(2^n)|16| 8| 4| 2| 1|

같은 방식으로 `10 << 3` 은 좌측으로 3칸 시프트 하면 1010000이 되고  
2진수 1010000값은 10진수로 `64 + 16 = 80` 이 된다.

|2진수      | 1| 0| 1| 0| 0| 0| 0|
|-----------|--|--|--|--|--|--|--|
|10진수(2^n)|64|32|16| 8| 4| 2| 1|

#### 우측 시프트 연산자 `>>`

`>>` 는 우변의 숫자 n만큼 2의 n제곱을 나누어 준다.

```js
10 >> 1; // 5  ->  10 / (2의 1제곱)
10 >> 3; // 1  ->  10 / (2의 3제곱)
```

역시 실제론 2진수로 연산이 된다.  
10진수 10은 2진수 1010으로 아래와 같은 형태라고 보면  

|0|0|0|0|...|1|0|1|0|
|-|-|-|-|---|-|-|-|-|

이걸 우측으로 한 칸 시프트 하면(`10 >> 1`) 101이 된다. (마지막 자리는 삭제된다.)

|0|0|0|0|...|1|0|1|
|-|-|-|-|---|-|-|-|

2진수 101값은 10진수로 `4 + 1 = 5` 이 된다.

|2진수      | 1| 0| 1|
|-----------|--|--|--|
|10진수(2^n)| 4| 2| 1|

같은 방식으로 `10 >> 3` 은 우측으로 3칸 시프트 하면 0001이 된다. (마지막 3자리는 삭제된다.)

|0|0|0|0|...|1|
|-|-|-|-|---|-|

2진수 0001값은 10진수로 `1` 이 된다.

|2진수      | 1|
|-----------|--|
|10진수(2^n)| 1|

단, 음수의 경우 맨 좌측의 부호비트는 유지된다.   
그래서 -10(1000000000...1010)을 우측으로 한 번 시프트 하면  

|1|0|0|0|...|1|0|1|0|
|-|-|-|-|---|-|-|-|-|

-5(1000000000...101)가 된다.  

|`1`|0|0|0|...|1|0|1|
|---|-|-|-|---|-|-|-|


#### unsigned 우측 시프트 연산자 `>>>`
양수의 경우 `>>` 와 같다. 음수의 경우만 `>>` 와 다른데, 부호 비트를 무시하고 전체를 시프트하기 때문에  
가령 -10(1000000000...1010)을 우측으로 한 번 시프트하면 **2147483643(0100000000...101)**가 된다.  

```js
10 >>> 1;  // 5 -> `>>` 와 같은 결과
-10 >>> 1; // 2147483643 -> 2진수로 변환되어 계산 후 다시 10진수로
```

#### 삼항 연산자 `? :`

조건 연산자 또는 선택 연산자. TRUE 혹은 FALSE에 해당하는 값을 반환한다.

#### instanceof

좌측의 객체가 우측의 생성자 함수로 만들어진건지 확인하는 연산자

```js
var obj = {};
obj instanceof Object; // true

function Newbie() {}
var noob = new Newbie();
noob instanceof Newbie; // true
```

#### typeof

연산자 다음에오는 변수, 함수, 객체 또는 표현식의 타입을 반환한다.

typeof "John"                     // "string"
typeof 3.14                       // "number"
typeof NaN                        // "number"
typeof false                      // "boolean"
typeof [ 1, 2, 3, 4 ]             // "object"
typeof { name: 'John', age: 34 }  // "object"
typeof new Date()                 // "object"
typeof function() {}              // "function"
typeof myCar                      // "undefined" (if myCar is not declared)
typeof null                       // "object"

#### in

객체나 배열의 특정 프로퍼티가 존재하는지 확인하고 있을 경우 `true`를 반환하는 연산자

```js
var obj = {
	a: 1,
	b: 2
};

'a' in obj; // true

for-in 반복문에서 사용하기도 한다.

for (var ele in obj) {
	console.log(ele); // 'a', 'b'
	console.log(obj[ele]); // 1, 2
}
```
단, 이 경우 해당 객체의 프로퍼티 중 객체가 소유한 프로퍼티(own properties)만 가져온다.
즉, 프로포타입으로부터 상속받은 프로퍼티는 무시한다.

```js
obj.toString; // ƒ toString() { [native code] } - 프로토타입으로 부터 받은 프로퍼티로 존재
obj.toString in obj; // false
```


#### delete

객체의 프로퍼티를 삭제하는 연산자.

```js
var fn = { word: "hi" };

console.log(fn.word);   // "hi"

delete fn.word; // true
console.log(fn.word); // undefined
```

객체의 프로퍼티만 삭제가 가능하므로, var 키워드로 정의된 변수나 함수 선언문으로 정의된 함수, 함수 매개변수는 삭제할 수 없다.  

```js
var aaa;
delete aaa; // false
function fn(a) {
	console.log(delete a); // false
}
console.log(delete fn); // false
```


#### void

피연산자를 실행하되 무조건 undefined를 반환하는 연산자.

```js
function bbb() {
	return 'hello world!';
}
console.log(bbb()); // 'hello world!'
console.log(void bbb()); // undefined
```

같은 이름의 void(any) 함수는 매개변수로 아무 값이나 받아도 상관없는 항상 undefined를 반환하는 함수다.
