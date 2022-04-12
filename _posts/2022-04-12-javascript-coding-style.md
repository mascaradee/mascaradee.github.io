---
layout: post
date: 2022-04-12 10:39:00 +0900
title: '[javascript] 자바스크립트 코딩 스타일 coding style'
categories:
  - javascript
tags:
  - coding
  - style
---

* Kramdown table of contents
{:toc .toc}

## 참고

[자바스크립트 코딩 스타일](https://javascript.info/coding-style)

## 코딩 스타일 가이드

간단 명확한게 최고.

## 괄호

모든 여는 괄호의 앞은 공백을 두고 시작한다. 하지만 함수명 다음 여는 괄호는 공백없이 붙여서 사용한다.

```js
function abc(a, b) {
  //do something
}
```

괄호 다음에 오는 파라미터나 인수는 붙여 사용하지만, 중첩 함수가 인수로 쓰이는 경우는 함수 앞, 뒤에 공백을 둔다.

```js
alert( abc('a', 'b') );
```

## 중괄호

중괄호는 조건문 다음 공백을 두고 같은 라인에서 연다. 바디의 내용이 길거나 줄바꿈을 하려면 중괄호로 묶어주어야 한다.

```js
if (condition) {
  // do something
  // and that
}
```

단, 바디 부분의 로직이 한줄로 끝난다면 중활호는 필요 없지만 짧은 내용이 아니라면 중괄호를 이용하는게 가독성이 더 좋다.

```js
if (true) alert(true);
```

## 줄 길이

한 라인의 내용이 너무 길면 ``백틱(`)``을 이용해서 줄바꿈을 한다. 주로 80자 또는 120자정도를 한줄로 하는데 이건 플젝마다 합의하기 나름이다.

```js
let str = `
동해물과 백두산이 마르고 닳도록
어쩌구 저쩌구
불라불라
`;

if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

## 들여쓰기

### 가로 들여쓰기

탭(= 공백 4)과 공백 2개로 들여쓰는 방법이 있지만 좀 더 유연한 방법은 공백을 사용하는 것이다. 아래와 같이 공백 5개로 파라미터를 정렬시킬 수 있다. 탭을 이용했다면 첫번째 파라미터와 무조건 정렬이 틀어지겠지...

```js
show(parameters,
     aligned, // 5 spaces padding at the left
     one,
     after,
     another
  ) {
  // ...
}
```

### 세로 들여쓰기

로직 상의 구분과 가독성을 위해서 빈 줄을 추가한다. 9줄 이상은 세로 들여쓰기가 필수다.

```js
function pow(x, n) {
  let result = 1;
  //              <-- 초기화 후 한 줄 추가
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  //              <-- 반복문 후 한 줄 추가
  return result;
}
```

## 세미콜론

줄바꿈이 자동으로 세미콜론 역할을 해 준다고 해도 명시적으로 표현하는 것이 좋다.


## 중첩

가능하면 많은 중첩구문은 피하는 것이 좋다. `continue`를 써서 중첩을 회피하는 것도 하나의 방법이다.


```js
// bad
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- one more nesting level
  }
}

// good
for (let i = 0; i < 10; i++) {
  if (!cond) continue;
  ...  // <- no extra nesting level
}
```

`if/else`에서 `else`문도 불필요하다면 제거하는 것이 가독성에 좋다.

```js
// bad
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }
}
```

조건 `n < 0`을 먼저 걸러냄으로써 나머지 메인 흐름을 실행할 수 있게 된다. 가능한 제거할 수 있는 조건을 먼저 쓰는 것이 좋다.

```js
// good
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

### 함수 위치

함수선언문의 위치는 호출부와 상관없이 먼저 나오든 나중에 나오든 상관이 없다.(어차피 자바스크립트 엔진이 코드를 해석하기에 앞서 변수선언, 함수선언문 등을 먼저 생성해 놓기 때문이다.)  
하지만 함수명만으로 함수가 어떤 일을 수행하는지 짐작이 된다면 호출부를 먼저 쓰는 것이 좋다. 굳이 함수를 분석하지 않아도 흐름을 이해할 수 있기 때문이다.

```js
// the code which uses the functions
let elem = createElement();
setHandler(elem);
walkAround();

// --- helper functions ---
function createElement() {
  ...
}

function setHandler(elem) {
  ...
}

function walkAround() {
  ...
}
```

### 스타일 가이드 참고 사이트

[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
[Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
[StandardJS](https://standardjs.com/)


### 서식 자동완성 툴 Linters
