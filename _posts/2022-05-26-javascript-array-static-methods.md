---
layout: post
date: 2022-05-26 08:40:00 +0900
title: '[javascript] array static methods'
categories:
  - javascript    
tags:
  - array
  - static
  - method
---

* Kramdown table of contents
{:toc .toc}

## 참고

[전역객체-Array](https://devdocs.io/javascript/global_objects/array)

## .from()

배열로 변환 가능한 것 또는 반복가능한 객체를 배열로 바꿔준다.

`Array.from(arrayLike)`
`Array.from(arrayLike, function(){})`

```js
let arrLike = 'abc';
Array.from(arrLike); // [a, b, c]
```
