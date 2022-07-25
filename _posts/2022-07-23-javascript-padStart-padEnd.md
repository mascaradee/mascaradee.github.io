---
layout: post
date: 2022-07-23 19:05:00 +0900
title: '[javascript] padStart, padEnd, repeat 문자열 추가 '
categories:
  - javascript
tags:
  - padStart
  - padEnd
  - repeat
---

* Kramdown table of contents
{:toc .toc}

## 참고 

[padStart](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

## 문자열에 특정길이만큼 원하는 문자 덧붙이기

### padStart, 앞에서부터 채우기

`str.padStart(targetLength [, padString])`

문자열에 원하는 길이만큼 원하는 문자를 **앞에** 추가하여 채운다.

```js
let month = new Date().getMonth() + 1;
let strMonth = String(month);
strMonth.padStart(2,'0'); // '07'
````


### padEnd, 뒤에서부터 채우기

`str.padEnd(targetLength [, padString])`

문자열에 원하는 길이만큼 원하는 문자를 **뒤에** 추가하여 채운다.

```js

let cafe = { coffee: '5', latte: '7'};

cafe.coffee.padEnd(4, 0); // 5000
cafe.latte.padEnd(4, 0); // 7000

````


### repeat, 문자열 반복해서 추가 

`str.repeat(count);`


기존 문자열을 인수로 받은 횟수만큼 반복해서 반환한다. 

```js
let str = 'a';

str.repeat(3);// 'aaa'
```