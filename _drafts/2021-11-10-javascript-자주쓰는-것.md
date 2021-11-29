---
layout: post
date: 2021-11-10 17:00:00 +0900
title: '[javascript] 자주쓰는 것들'
categories:
  - javascript
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

# 자주쓰는 것

## `$`, `jQuery`

jQuery 객체화

```js
$('input[id="masc"]:hidden').val()
```

## 객체초기화 방법 

### new Object()

### Object.create()

### Literal notation, 객체 리터럴 표기법

`{}` 안에 `key:value` 형태의 프로퍼티를 갖는 객체를 생성할 수 있다.
`value`에는 원시타입, 또 다른 객체, 함수 등을 넣을 수 있다.

```js
var obj = {}

var obj1 = {
  property1: null, // 변수
  property2: 'hi', // 변수
  property3: {a: 1, b: 2}, // 객제
  property4: function () { // 함수
    console.log('say hi');
  },  
  property5: {
    v1: 10,
    _f1: function () {
      if (obj1.property5.v1 == 10) {
        console.log('hi');
      }
    }
  }
}

// 프로퍼티 접근
obj1.property1; // null
obj1['property2']; // hi
obj1.property3.a; // 1
obj1.property4(); // say hi
obj1.property5._f1();

```

## 객체 리터럴 표기법 vs  JavaScript Object Notation, JSON

| 구분 | 객체 리터럴 표기법 | JSON | 설명 |
|---|---|---|---|
|형식| `{a: 1, b:"하나"}`| `{"a":1, "b":"하나"}`| `JSON`의 `key` 부분은 꼭 ""(쌍따옴표)로 감싸져야 함|
|값|문자열, 숫자, 배열, `boolean`, `null`, 또는 다른 (`JSON`) 객체, **함수** |문자열, 숫자, 배열, `boolean`, `null`, 또는 다른 (`JSON`) 객체| 대부분은 같으나 `JSON`의 값에는 함수를 사용할 수 없음|


## $(document).ready(), $(window).load()

`$(document).ready()`는 DOM이 생성된 후
`$(window).load()`는 DOM 생성 후, 리소스(스타일, 이미지, js 등)까지 다 준비가 된 후

## 브라우저 렌더링 과정 참고

[https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)


## 네임스페이스

자바스크립트 그룹?

`$.namespace()`

`initialize`
