---
layout: post
date: 2023-06-12 10:00:00 +0900
title: '[javascript] call'
categories:
  - javascript
tags:
  - call
---

* Kramdown table of contents
{:toc .toc}

## call()

`Function.prototype.call(대상함수, [인수1, 인수2 ...])`

## 설명

함수를 재정의하여 호출한다. 인수를 넘기면 재정의될 함수의 인자로 세팅이 되어 실행된 후 결과값을 반환한다. `apply()`함수와 동일한 기능이지만 인수배열을 받는 것만 다르다.  

## 예시

```js
function fn(a, b) {
  return a + b;
}
function fn1(a, b) {
  return fn.call(this, a, b);
}

fn1(1 , 2) // 3
```

## More
[`apply()`](https://mascaradee.github.io/javascript/javascript-apply)  
[`bind()`](https://mascaradee.github.io/javascript/javascript-bind)

 
