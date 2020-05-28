---
layout: post
date: 2020-05-19 00:00:00 +0900
title: '[javascript] operator'
categories:
  - javascript
tags:
  - operator
---

* 참고 사이트 [https://ko.javascript.info/operators](https://ko.javascript.info/operators)

## 연산자

### 단항연산자

피연산자 x 하나만 받는 연산자는 단항연산자라고 한다.  
피연산자(operand)는 인수(argument)라고도 한다.

```javascript
let x = 5;
x = -x;
alert(x); // -5
```

### 이항연산자

피연산자 y, z 2개를 받는 연산자를 이항연산자라고 한다. 보통 수학에서 배우는 사칙연산자와 같다.

```javascript
let y = 10, z = 39;
alert( z - y ); // 29
```

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
|:----------:|:----------------------------:|:-------------:|:--------------------:|
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

### 할당 연산자 `=`

우선순위가 낮은 편이다.

```javascript
let a = 20 * 2 - 1 // 1) `*` 2) `-` 3) `=`
alert(x); // 39
```

##### 값을 반환하는 할당 연산자

아래와 같이 `=`의 할당 속성을 이용해서 수행이 가능하지만 가독성도 좋지 않도 명확성이 떨어지므로 비추.

```javascript
let a = 1;
let b = 2;
let c = 3 - ( a = b + 1); // 1) b+1, 2) a = b + 1, 3) 3 - (a = b + 1), 4) c = 3 - (a = b + 1)
alert(a); // 3
alert(c); // 0
```

##### 할당 연산자 체이닝

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

### 비트 연산자

비트 연사자는 인수를 32비트 정수로 변환하여 이진 연산을 수행  
일반적인 개발에서 쓰일일은 거의 없지만 암호를 다뤄야 할때는 유용.

* & (비트 AND)
* | (비트 OR)
* ^ (비트 XOR)
* ~ (비트 NOT)
* << (왼쪽 시프트)
* >> (오른쪽 시프트)
* >>> (부호 없는 오른쪽 시프트)


### 쉼표 연산자

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
