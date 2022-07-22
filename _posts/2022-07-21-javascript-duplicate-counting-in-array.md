---
layout: post
date: 2022-07-21 19:05:00 +0900
title: '[javascript] 배열 내에서 중복 카운팅'
categories:
  - javascript
tags:
  - javascript
  - Map
  - foreach
---

* Kramdown table of contents
{:toc .toc}

## 배열 내에서 중복 카운팅

```js

const arr = ['a', 'a', 'b', 'b'];

const newArr = new Map();
arr.forEach( ele => {
  newArr[ele] = (newArr[ele] || 0) + 1;
});

// Map(0) {a: 2, b: 2, size: 0}
```
