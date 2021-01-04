---
layout: post
date: 2020-05-19 00:00:00 +0900
title: '[javascript] operator'
categories:
  - javascript
tags:
  - operator
---

* Kramdown table of contents
{:toc .toc}

## 참고 사이트
[https://ko.javascript.info/operators](https://ko.javascript.info/operators)  
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

### 이항연산자

피연산자 `y, z` 2개를 받는 연산자를 이항연산자라고 한다. 보통 수학에서 배우는 사칙연산자와 같다.

```javascript
let y = 10, z = 39;
alert( z - y ); // 29
```

## 산술 연산자

### 나머지 연산자 `%`

`/`는 몫을 반환하지만 `%`는 나머지를 반환한다.

```javascript
alert( 10 % 3 ); // 1 -> 10/3은 몫 3, 나머지 1인데 %는 나머지를 리턴한다.
```

### 거듭제곱 연산자 `**`

```javascript
alert( 2 ** 10); // 1024 -> 2*2*2*2*2*2*2*2*2*2
```

```javascript
alert( 4 ** (1/2)); // 2 -> 4는 2의 제곱근
alert( 8 ** (1/3)); // 2 -> 8은 2의 세제곱근
```

### 이항연산자 `+`와 문자열 연결

수학에서는 숫자만 더하지만 자바스크립트에서는 문자열끼리의 결합도 `+`로 할 수 있다.  
- 문자열 + 문자열 = 문자열  
- 문자열 + 숫자 = 문자열  
- 숫자 + 문자열 = 문자열  
문자열이 섞이면 무조건 문자열로 반환된다.

```javascript
let s = "my" + "javascript";
alert(s); // myjavascript
```

```javascript
alert( '3' + 9 ); // 39
alert( 3 + '9' ); // 39
alert( 2 + 1 + '9') // 39 -> 왼쪽부터 순차적으로 진행되므로 2+1 = 3 후에 30 + '9'
```

* 그에 비해 다른 사칙연사자들은 인수를 모두 숫자형으로 변환시켜 계산을 한다.

```javascript
alert('10' - 2); // 8
alert('10' / '2'); // 5
```

### 단항연산자 `+`와 숫자형으로 변환

`+` + 숫자  = 그대로 숫자
`+` + 그 외  = 숫자로 변환

```javascript
let x = 1;
alert(+x); // 1

let y = -2;
alert(+y); // -2

alert(+true); // 1 -> Number(true)와 같은 결과
alert(+''); // 0 -> Number('')와 같은 결과
```

* 이항연산자 `+`
```javascript
let first = '3';
let last = '9';
alert(first + last); // 39 -> 이항연산자 +는 문자열 연결
```

* 단항 & 이항연산자 `+`
```javascript
first = '30';
last = '9';
alert(+first + +last); // 30 + 9 = 39
```

### 연산자 우선순위

우선순위 테이블의 순위의 숫자가 클수록 우선순위가 높으나 `()`괄호는 최우선이다. 단항덧셈이 이항덧셈보다 우선순위가 높기때문에 먼저 수행된다. 순위가 같은 경우에는 왼쪽에서 오른쪽으로 수행된다.

|순위|연산자이름|기호|
|---|---|---|
|17|단항덧셈|`+`|
|13|(이항)덧셈|`+`|

* 우선순위 표 [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

| Precedence |         Operator type        | Associativity | Individual operators |
|:-----------|:-----------------------------|:--------------|:---------------------|
| 21         | Grouping                     | n/a           | ( … )                |
| 20         | Member Access                | left-to-right | … . …                |
|            | Computed Member Access       | left-to-right | … [ … ]              |
|            | new (with argument list)     | n/a           | new … ( … )          |
|            | Function Call                | left-to-right | … ( … )              |
|            | Optional chaining            | left-to-right | ?.                   |
| 19         | new (without argument list)  | right-to-left | new …                |
| 18         | Postfix Increment            | n/a           | … ++                 |
|            | Postfix Decrement            |               | … --                 |
| 17         | Logical NOT                  | right-to-left | ! …                  |
|            | Bitwise NOT                  |               | ~ …                  |
|            | Unary Plus                   |               | + …                  |
|            | Unary Negation               |               | - …                  |
|            | Prefix Increment             |               | ++ …                 |
|            | Prefix Decrement             |               | -- …                 |
|            | typeof                       |               | typeof …             |
|            | void                         |               | void …               |
|            | delete                       |               | delete …             |
|            | await                        |               | await …              |
| 16         | Exponentiation               | right-to-left | … ** …               |
| 15         | Multiplication               | left-to-right | … * …                |
|            | Division                     |               | … / …                |
|            | Remainder                    |               | … % …                |
| 14         | Addition                     | left-to-right | … + …                |
|            | Subtraction                  |               | … - …                |
| 13         | Bitwise Left Shift           | left-to-right | … << …               |
|            | Bitwise Right Shift          |               | … >> …               |
|            | Bitwise Unsigned Right Shift |               | … >>> …              |
| 12         | Less Than                    | left-to-right | … < …                |
|            | Less Than Or Equal           |               | … <= …               |
|            | Greater Than                 |               | … > …                |
|            | Greater Than Or Equal        |               | … >= …               |
|            | in                           |               | … in …               |
|            | instanceof                   |               | … instanceof …       |
| 11         | Equality                     | left-to-right | … == …               |
|            | Inequality                   |               | … != …               |
|            | Strict Equality              |               | … === …              |
|            | Strict Inequality            |               | … !== …              |
| 10         | Bitwise AND                  | left-to-right | … & …                |
| 9          | Bitwise XOR                  | left-to-right | … ^ …                |
| 8          | Bitwise OR                   | left-to-right | … \| …               |
| 7          | Nullish coalescing operator  | left-to-right | … ?? …               |
| 6          | Logical AND                  | left-to-right | … && …               |
| 5          | Logical OR                   | left-to-right | … \|\| …             |
| 4          | Conditional                  | right-to-left | … ? … : …            |
| 3          | Assignment                   | right-to-left | … = …                |
|            |                              |               | … += …               |
|            |                              |               | … -= …               |
|            |                              |               | … **= …              |
|            |                              |               | … *= …               |
|            |                              |               | … /= …               |
|            |                              |               | … %= …               |
|            |                              |               | … <<= …              |
|            |                              |               | … >>= …              |
|            |                              |               | … >>>= …             |
|            |                              |               | … &= …               |
|            |                              |               | … ^= …               |
|            |                              |               | … \|= …              |
| 2          | yield                        | right-to-left | yield …              |
|            | yield*                       |               | yield* …             |
| 1          | Comma / Sequence             | left-to-right | … , …                |


## 할당 연산자 `=`

우선순위가 낮은 편이다.

```javascript
let a = 20 * 2 - 1 // 1) `*` 2) `-` 3) `=`
alert(x); // 39
```

### 값을 반환하는 할당 연산자

아래와 같이 `=`의 할당 속성을 이용해서 수행이 가능하지만 가독성도 좋지 않도 명확성이 떨어지므로 비추.

```javascript
let a = 1;
let b = 2;
let c = 3 - ( a = b + 1); // 1) b+1, 2) a = b + 1, 3) 3 - (a = b + 1), 4) c = 3 - (a = b + 1)
alert(a); // 3
alert(c); // 0
```

### 할당 연산자 체이닝

```javascript
let a, b, c;
a = b = c = 2 + 2; // 1) 2+2, 2) c=2+2, 3) b=c, 4) a=b
alert(a);// 4
alert(b);// 4
alert(c);// 4
```

<br>

아래가 더 가독성이 좋음

```javascript
c = 2 + 2;
b = c;
a = b;
```

### 복합 할당 연산자

```javascript
let n = 15;
n *= 2; // 15 * 2 = 30를 한 후 n에 할당 -> n = n * 2
n += 9; // 30 + 9 = 39를 한 후 n에 할당 -> n = n + 9
alert(n); // 39
```

<br>

복합 할당 연산자의 우선순위는 할당연산자의 순위와 같이 낮다.

```javascript
let n = 2;
n *= 3 + 5;
alert (n); // 2 * ( 3 + 5) = 16 -> n *= 8이 먼저
```

### 증가/감소 연산자

```javascript
let counter = 2;
counter++; // counter = counter + 1;
alert(counter); // 3

counter = 2;
counter--; // counter = counter - 1;
alert(counter); // 1

5++; // SyntaxError: invalid increment/decrement operand -> 변수에만 쓸수 있음
```

* 후위형, 전위형
+1 혹은 -1로 증가/감소처리는 후위형이든 전위형이든 동일하게 처리한다.
후위형: `counter++;` - 변수에 값이 할당이 되면 증가/감소 전의 기존 값을 반환  
전위형: `++counter;` - 변수에 값이 할당이 되면 증가/감소 후의 새로운 값을 반환

```javascript
let counter = 1;
let a = ++counter;
alert(a); // 2

counter = 1;
let b = counter++;
alert(b); // 1

counter = 0;
counter++; // counter = 1
++counter; // counter = 2
alert(counter); // 2
```


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

## 논리 연산자

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

### `&&` 연산

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

### `||` 연산

좌변, 우변 중 하나마 `true`이면 되므로,  
좌변이 `true`일 때는 우변을 검사할 필요 없이 좌변 값을 반환

```js
1 || false; // true || false -> 좌변 값인 1 반환
```

좌변이 `false`일 때는 우변도 검사하여 `true, false` 결과에 상관없이 우변 값을 반환

```js
0 || null; // false || false -> 우변 값인 null 반환
```

### `&&`와 `||`로 만드는 삼항 연산자

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

## 비트 연산자

비트 연사자는 인수를 32비트 정수로 변환하여 이진 연산을 수행  
일반적인 개발에서 쓰일일은 거의 없지만 암호를 다뤄야 할때는 유용.  
바이너리 연산으로 산술연산보다 속도가 빠르다.  

* `&` (비트 AND)
* `|` (비트 OR)
* `^` (비트 XOR)
* `~` (비트 NOT)
* `<<` (왼쪽 시프트)
* `>>` (오른쪽 시프트)
* `>>>` (부호 없는 오른쪽 시프트)

### 비트 단위 NOT 연산자 `~`

피연산자의 32비트가 모두 뒤집힌다. (1은 0으로, 0은 1로)  
이 과정에서 가장 왼쪽의 부호 비트도 뒤집히면서 양수는 음수로, 음수는 양수로 바뀐다.

```js
~10; // -11
~-10; // 9
```

### 비트 단위 AND 연산자 `&`

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

### 비트 단위 OR 연산자 `|`

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

### 비트단위 XOR 연산자 `^`

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

### 좌측 시프트 연산자 `<<`

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

### 우측 시프트 연산자 `>>`

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


### unsigned 우측 시프트 연산자 `>>>`
양수의 경우 `>>` 와 같다. 음수의 경우만 `>>` 와 다른데, 부호 비트를 무시하고 전체를 시프트하기 때문에  
가령 -10(1000000000...1010)을 우측으로 한 번 시프트하면 **2147483643(0100000000...101)**가 된다.  

```js
10 >>> 1;  // 5 -> `>>` 와 같은 결과
-10 >>> 1; // 2147483643 -> 2진수로 변환되어 계산 후 다시 10진수로
```

## 삼항 연산자 `? :`

조건 연산자 또는 선택 연산자. TRUE 혹은 FALSE에 해당하는 값을 반환한다.

## 쉼표 연산자

거의 쓰이지 않으나 코드를 짧게 쓰일 목적으로 가끔 사용  
, 가 포함되어 있는 모든 표현식은 평가는 되지만 마지막 표현식의 결과만 반환

```javascript
let a = (1 + 2, 3 + 4);
alert(a); // `()` 안이 먼저 연산, 그 안의 1+2=3, 3+4=7 표현식중 마지막 3+4=7만 반환, 3은 무시

a = 1 + 2, 3 + 4
alert(a); // a = 3, 7로 `+`가 먼저 연산되어  a = 3, 7, `,`보다 `=`의 우선순위가 높아  a=3 반환되고 7은 무시
```

```javascript
for(a = 1, b = 3, c = a * b; a < 10; a++){
 // c = a * b만 반환?
}
```

## 단항연산자

피연산자 `x` 하나만 받는 연산자는 단항연산자라고 한다.  
피연산자(operand)는 인수(argument)라고도 한다.

```javascript
let x = 5;
x = -x;
alert(x); // -5
```

### delete

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

### typeof

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


### void

피연산자를 실행하되 무조건 undefined를 반환하는 연산자.

```js
function bbb() {
	return 'hello world!';
}
console.log(bbb()); // 'hello world!'
console.log(void bbb()); // undefined
```

같은 이름의 void(any) 함수는 매개변수로 아무 값이나 받아도 상관없는 항상 undefined를 반환하는 함수다.


## 관계 연산자

### in

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

### instanceof

좌측의 객체가 우측의 생성자 함수로 만들어진건지 확인하는 연산자

```js
var obj = {};
obj instanceof Object; // true

function Newbie() {}
var noob = new Newbie();
noob instanceof Newbie; // true
```

##### 연습문제

```javascript
'' + 1 + 0 // 1 -> 10 --> ''이 `+` 로 엮일때는 문자열로 인식
'' - 1 + 0 // -1 --> `-`는 숫자만 받으므로 ''를 0으로 인식
true + false // 1
6 / '3' // 2
'2' * '3' // 6
4 + 5 + 'px' // 9px
'$' + 4 + 5 // $45
'4' - 2 // 2
'4px' - 2 // 4px2 -> NaN  --> `-`는 숫자만 받는데 '4px'는 숫자로 변환불가
7/0 // infinity
'   -9   ' + 5 //-4 -> '   -9   5' -->  `+`는 문자열을 그대로 받는다
'   -9   ' - 5 // -14 ** `-`는 숫자만 인수로 받기때문에 형변환한다.
null + 1 // 1
undefined + 1 // NaN
' \t \n' - 2 // NaN -> -2 --> `\t\n` 은 공백을 뜻한다.
```


* 결과가 12가 아닌 3이 되도록 수정하라
```javascript
let a = prompt('First number?', 1);
let b = prompt('Second number?', 2);
// alert(a + b); // 12
alert(+a + +b); // 3
```
