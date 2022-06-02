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

- 여러 개의 값과 프로퍼티를 가진다.
- 오브젝트 리터럴, `{}`을 이용해 생성한다.
- 함수도 객체의 일종이다.
- 객체의 프로퍼티로 함수를 이용할 수 있다.


`alphaGo` 객체에 `doGo`라는 메서드를 만들었다. 객체는 내부적으로 추가 자원을 필요로 하고 원시타입보다 무겁다. 또한 기능을 위해서는 비용이 들게된다.


```js
let alphaGo = {
  name: 'alphaGo',
  doGo: function() {
    alert('move black go stone here!');
  }
}

alphaGo.doGo(); // move black go stone here!
```
