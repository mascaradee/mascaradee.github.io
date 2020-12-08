---
layout: post
date: 2020-09-14 22:00:00 +0900
title: '[javascript] wrapper type'
categories:
  - javascript
tags:
  - wrapper type
---

## 래퍼 타입

아래는 모두 원시형 값이다. 하지만 메서드가 존재하는 이유는 무엇일까?
그 이유는 원시형 변수의 프로퍼티에 접근하려고 할 때 자바스크립트가 원시형 값을 자동으로 래퍼 클래스로 임시 교체하기 때문이다.

```js
var n = 123;
var b = true;
var s = 'hi';

n.toString(); // new Number(n).toString();
s.indexOf('i'); // new String(s).indexOf('i');
```

이런 특성 때문에 원시형 변수에 프로퍼티를 새로 추가할 경우, 다시 접근하는건 불가능하다.

```js
n.length = 3;
n.length; // undifined
```
위 예시의 첫번째 라인의 `n` 과 두번째 라인의 `n`은 다른 객체이다.
실제 작동은 아래와 같이 한다.
```js
new Number(n).length = 3; // n이 아니라 새로운 Number 타입의 인스턴스에 추가됨
new Number(n).length; // undifined, 이 또한 새로 만들어진 인스턴스의 length를 찾음
```
