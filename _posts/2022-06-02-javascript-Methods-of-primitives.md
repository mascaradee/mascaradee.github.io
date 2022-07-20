---
layout: post
date: 2022-06-02 09:47:00 +0900
title: '[javascript] Methods of primitives '
categories:
  - javascript
tags:
  - methods
  - primitives
  - types
---

* Kramdown table of contents
{:toc .toc}

## 참고

[원시타입의 메서드](https://javascript.info/primitives-methods)


## 원시 데이터타입과 객체의 구분

### 원시타입

- 한 종류의 데이터타입의 값을 가진다.
- 종류는 7가지로 `string, number, bigint, boolean, symbol, null, undefined`가 있다.

### 객체

- 프로퍼티로 여러 종류의 값을 저장할 수 있다.
- 오브젝트 리터럴, `{}`을 이용해 생성한다.
- 함수도 객체의 일종이다.
- 함수를 객체의 프로퍼티로 저장할 수 있다.


자바스크립트는 `Date, Errors, HTML요소` 등을 다루는 다양한 내장 객체를 제공한다. 각 객체들은 고유한 프로퍼티와 메서드를 가지고 있다. 
하지만 이런 기능을 사용하면 시스템 자원이 많이 소모된다. 객체는 원시값보다 무겁고 내부 구조를 유지하기 위해 추가 자원을 사용하기 때문이다.


## 원시타입을 객체처럼 사용하기: 래퍼 객체

자바스크립트는 원시타입의 가볍고 빠른 특성을 유지하면서도, 유용한 메서드를 동시에 사용하기 위해 래퍼객체를 사용한다. 
래퍼객체는 원시타입의 이름을 차용해 `String, Number, Boolean, Symbol, BigInt` 라고 한다. 
(원시타입 이름의 첫자가 모두 대문자)

```js
let str = 'Hello';
alert(str.toUpperCase()); // 'HELLO'
```

원시타입인 `str`이 인수로 받은 문자열을 모두 대문자로 바꿔주는 `toUpperCase()` 메서드를 사용할 수 있는 이유는 아래와 같은 프로세스 때문인다.

- `str`는 문자열 원시타입이므로 그것의 프로퍼티에 접근하는 순간 자바스크립트 엔진은 래퍼 객체라는 특수객체를 생성한다. 이 객체는 `str`의 값인 문자열을 알고 있고 `toUpperCase()`와 같은 유용한 메소드도 가지고 있다. 
- 메소드가 실행되면 값은 모두 대문자로 변환되어 반환되고 
- 특수객체는 사라지고 원시타입의 `str`만 남게 된다. 


### 래퍼 객체 사용

래퍼객체를 `new` 생성자를 이용해 만들수도 있으나 비추.
만약 `0`이 `false`라는 특징을 이용해 조건문을 의도한 경우, 아래 예시는 무조건 참이 되므로 의도와 맞지 않게 된다. 객체는 논리평가 시 항상 참이기 때문이다. 

```js

let zero = new Number(0);

if (zero) { // 변수 zero는 객체이므로 조건문이 참, zero = 0이라면 거짓
  alert( "그런데 여러분은 zero가 참이라는 것에 동의하시나요!?!" );
}
```

생성자를 붙이지 않고 래퍼객체를 사용하는 건 괜찮다. 

```js
let num = Number('1984'); // 1984 -> 문자열을 숫자로 
```

### null/undefined는 래퍼객체가 없다. 

`null/undefined`는 위 법칙에서 예외로 관련 래퍼객체나 메서드도 제공하지 않는다. 