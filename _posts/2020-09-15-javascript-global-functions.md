---
layout: post
date: 2020-09-15 15:00:00 +0900
title: '[javascript] global functions'
categories:
  - javascript
tags:
  - global functions
---

* Kramdown table of contents
{:toc .toc}

## 전역 함수

### eval(), uneval()

문자열을 스크립트로 변환하여 평가하거나 역으로 문자열을 생성하는 함수  
`eval()`은 공격에 취약하므로 가급적 사용하지 말 것.  
`uneval()`은 deprecated 상태임.  

```js
eval('console.log("hello! i\'m a chicken!")');
// uneval(console); // 현재의 브라우저들은 지원하지 않아 실행 불가

var a = request.geParameter("a");
eval(a); // "a"에 공격용 스크립트를 넣어 보낼수 있다.
```

### encodeURI(), encodeURIComponent()
`encodeURI`는 한글을 인코딩함.  
`encodeURIComponent`는 URI 구성 특수문자(/, :, ?, =, &)까지 인코딩함. 그래서 쿼리스트링의 값으로 URI를 넘겨야할 때 사용함.

```js
encodeURI('/a/b/c?q=132123&returnUrl=/product/사과/12345'); // "/a/b/c?q=132123&returnUrl=/product/%EC%82%AC%EA%B3%BC/12345"
encodeURIComponent('/a/b/c?q=132123&returnUrl=/product/사과/12345'); // "%2Fa%2Fb%2Fc%3Fq%3D132123%26returnUrl%3D%2Fproduct%2F%EC%82%AC%EA%B3%BC%2F12345"
```

### decodeURI(), decodeURIComponent()
`decodeURI`는 `encodeURI`를 통해 인코딩된 값을  
`decodeURIComponent`는 `encodeURIComponent`를 통해 인코딩된 값을 디코딩할 수 있다.

```js
decodeURI('/a/b/c?q=132123&returnUrl=/product/%EC%82%AC%EA%B3%BC/12345'); // "/a/b/c?q=132123&returnUrl=/product/사과/12345"
decodeURIComponent('%2Fa%2Fb%2Fc%3Fq%3D132123%26returnUrl%3D%2Fproduct%2F%EC%82%AC%EA%B3%BC%2F12345'); // "/a/b/c?q=132123&returnUrl=/product/사과/12345"
```

### isFinite(), isNaN()
`isFinite()` 함수는 매개변수가 유한값인지 검사하는 함수이다. 유한한 숫자이면 true, 무한한 숫자이거나 숫자가 아니면 false 리턴.  
`isNaN()` 함수는 매개변수가 `Not a Number` 인지 검사하는 함수이다. 숫자가 아니면 true, 숫자이면 false.  

```js
isFinite(1); // true
isFinite('1'); // true
isFinite('a'); // false
isFinite({}); // false
isNaN(1); // false
isNaN('1'); // false
isNaN('a'); // true
isNaN({}); // true
```

### parseFloat(), parseInt()
`parseFloat()` 함수는 부동 소수점 실수로 변환  
`parseInt()` 함수는 정수로 변환  

```js
parseFloat("10.33"); // 10.33
parseFloat("5.4321e6") // 5432100 , e6 = 10^6
parseInt(100); // 100
parseInt('100'); // 100
parseInt(new String(1100)); // 1100
parseInt('10.00'); // 10
parseInt('10.98'); // 10
parseInt('40 years'); // 40
parseInt('010'); // 10
parseInt('0x10'); // 16
```
