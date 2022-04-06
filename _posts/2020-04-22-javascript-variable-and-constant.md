---
layout: post
date: 2020-04-22 00:00:00 +0900
title: '[javascript] variable and constant'
categories:
  - javascript
tags:
  - variable
  - constant
  - var
  - let
  - const
---

* Kramdown table of contents
{:toc .toc}

## 참고

[https://javascript.info/variables](https://javascript.info/variables)

## 변수 종류

<br>

### var (old version)

어디에서나 유효하지만 함수 안에서 선언이 된 경우에만 함수블록 내로 제한  
hoisting 문제로 ES6이후부터는 `let` 으로 대체

```js
// 값 지정없이 선언 가능
var a;
console.log(a); // undefined

// 값 변경 가능
var aa = 'abc';

// 유효범위
for (var b = 0; b < 3; b++){
	console.log(b); // 0 ~ 2
}
console.log(b); // 3 - for문 밖에 있지만 유효
console.log(aa); //abc

function fn(){
	var ccc = 7;
	ccc++;
	console.log(ccc);
  console.log(aa); // 'abc'
}

fn(); // 8
console.log(ccc); // Uncaught ReferenceError: ccc is not defined - 함수블록에서만 유효
console.log(aa); // 'abc'
```

### let

변수가 선언된 `블록`에서만 유효함.  
[브라우저 버전에 따른 제약 있음.](https://docs.microsoft.com/ko-kr/microsoft-edge/dev-guide/whats-new/javascript-version-information)   
실제 IE 11(11.836.18362.0)에서 정의 및 실행되지 않음  

```js
// 값 지정없이 선언 가능
let c;

// 한번에 선언 가능하지만 가독성이 좋지는 않다.
let z, y, x;

// 값 변경 가능
let d = 'abc';

// 유효범위
function fn(){
  let ee = 9;

  for(let e = 0; e < 3; e++){
    console.log(e); // 0 ~ 2
  }
  console.log(e); // undefined -> for문 블록을 벗어나 유효범위에서 벗어남
  console.log(ee); // 9
}
console.log(ee); // Uncaught ReferenceError: ee is not defined -> function 블록을 벗어남
console.log(d); // abc
```

### const

고정된 값을 사용할때 사용하고 초기화는 필수이며, 재할당도 불가함.  
변수가 선언된 블록에서만 유효함. 브라우저 버전에 따른 제약 있음.  
IE는 11이후부터 가능하다고 하나 실제 IE 11(11.836.18362.0)에서 정의 및 실행되지 않음.

- 일반적인 상수: 값을 예측하지 못하지만 런타임에 계산되는 값
- 대문자 상수: 실행 전 이미 값을 알고 있고 하드코딩한 값을 사용할때 대문자 상수 이용. 기억하기 용이하고 가독성이 좋고 오타 적다는 장점

```js
const pi = 3.14;
Pi = 1 ; // 재할당 시 에러발생 Uncaught TypeError: Assignment to constant variable.

const MY_BIRTHDAY = "2020.04.22"
```

오브젝트나 배열을 const로 선언하면 값은 수정이나 추가가 가능하지만 재할당은 불가능하다.

```js
const obj = {};

obj = {}; //  TypeError: Assignment to constant variable.

obj.a = 1;
obj.a = 2;
obj.b = 'heloo';
console.log(obj); // {a: 2, b: 'heloo'} - 실제 타입을 혼용해서 쓰는것은 비추

const arr = [1,2,3,4];
arr[0] = 100;
console.log(arr); // [100, 2, 3, 4]
```

## 변수 명명 규칙

- 오직 문자와 숫자, 그리고 기호 `$`와 `_`만 들어갈 수 있음. 단, 첫 글자는 숫자가 될 수 없음.  
- 대소문자 구분
- 보통 카멜방식으로 표시
- 예약어는 변수명으로 사용 불가 ex. let, class, function
