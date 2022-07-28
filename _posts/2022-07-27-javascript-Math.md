---
layout: post
date: 2022-07-27 19:05:00 +0900
title: '[javascript] Math 객체의 주요 메서드'
categories:
  - javascript
tags:
  - Math
  - min
  - max

---

* Kramdown table of contents
{:toc .toc}

## 참고

[Math](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math)

## Math 내장 객체의 주요 메서드

### min 최소값

`let minNumber = Math.min([value1[, value2[, ...]]])`

주어진 숫자 중 가장 작은 값을 반환하고 숫자형 변환 불가한 경우는 `NaN` 반환

```js

let minNum1 = Math.min(undefined); // NaN
let minNum2 = Math.min(10, 2, 3); // 2

let arr = [10, 2, 3];
let minNum3 = Math.min(...arr); // 2, 스프레드 오퍼레이터를 사용해 배열을 인수로 사용할수 있도록 한다. 원래 배열은 인수로 넘길 수 없다.
```