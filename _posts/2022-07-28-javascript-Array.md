---
layout: post
date: 2022-07-28 19:05:00 +0900
title: '[javascript] Array 전역객체의 메서드'
categories:
  - javascript
tags:
  - array
  - fill
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Array 전역 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)


### fill 요소를 같은 값으로 채우기

`Array.prototype.fill()`  

요소의 크기만큼 특정값으로 채운다. 

`let arr = arr.fill(value[, start[, end]])`

- `value`: 배열을 채울 값
- `start`: 채우기 시작할 인덱스, 기본은 0
- `end`: 어디까지 채울 것인지 끝 인덱스로 해당 인덱스는 불포함, 기본은 this.length
- `arr` : 기본배열을 변형해서 반환한다. 


```js
Array(2).fill(5); // [5, 5];
/*
Array(2) // 값은 없지만 2개의 요소크기의 배열을 생성한다. 
.fill(5); // 요소 크기만큼 모두 5의 값을 채운다.  
*/

Array(5).fill(1, 1, 3); // [empty, 1, 1, empty × 2], end인덱스는 불포함하므로 1,2인덱스에만 값이 들어간다. 
```



