---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[javascript] map 반환값 '
categories:
  - javascript
tags:
  - map
---

* Kramdown table of contents
{:toc .toc}

## array.map()

```js
const originalArray = [
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
];

const a = originalArray.map((e, i) => e.id = i);
// 기존 배열이 변경됨: 객체 내부 요소를 수정하면 바로 반영이 된다. 

const originalArray1 = [
  { name: 'Item 11' },
  { name: 'Item 12' },
  { name: 'Item 13' },
];
const b = originalArray1.map((e, i) => {return {...e, id: i}});
// 새 배열로 복사하여 id를 추가했으므로 새 배열 반환, 기존은 그대로 

const originalArray2 = [
  { name: 'Item 21' },
  { name: 'Item 22' },
  { name: 'Item 23' },
];

const c = originalArray2.map((e, i) => ({...e, id: i}))
// 새 배열로 복사하여 id를 추가했으므로 새 배열 반환, 기존은 그대로 
```