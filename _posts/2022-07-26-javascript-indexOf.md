---
layout: post
date: 2022-07-26 19:05:00 +0900
title: '[javascript] indexOf, lastIndexIf, findIndex 특정요소 인덱스 찾기 '
categories:
  - javascript
tags:
  - indexOf
  - lastIndexIf
  - findIndex
---

* Kramdown table of contents
{:toc .toc}

## 참고

[findIndex()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)


## indexOf, 문자열 혹은 배열요소의 앞에서부터 특정위치 찾기

`Array.prototype.indexOf()`  
`String.prototype.indexOf()`  

문자열과 배열 모두 소화 가능한 메서드로 앞에서부터 원하는 문자열 혹은 배열요소를 찾아 해당 위치의 인덱스를 반환한다. 없으면 -1 반환

`let index = arr.indexOf(searchElement[, fromIndex])`
`let index = str.indexOf(searchElement[, fromIndex])`

- `searchElement`: 찾으려는 문자열 혹은 배열요소
- `fromIndex`: 문자열 혹은 배열요소에서 찾기 시작하는 위치를 나타내는 인덱스 값
- `index`: 찾은 문자열 혹은 배열요소의 위치 인덱스


## lastIndexOf, 문자열 혹은 배열요소의 뒤에서부터 특정위치 찾기

`Array.prototype.lastIndexOf()`  
`String.prototype.lastIndexOf()`  


`let index = arr.lastIndexOf(searchValue[, fromIndex])`
`let index = str.lastIndexOf(searchValue[, fromIndex])`

문자열과 배열 모두 소화 가능한 메서드로 뒤에서부터 원하는 문자열 혹은 배열요소를 찾아 해당 위치의 인덱스를 반환한다. 없으면 -1 반환. 참고로 찾는 것은 뒤에서부터지만 인덱스는 거꾸로 세지는 않는다. 

```js
['c', 'a', 'b', 'c'].indexOf('c'); // 0
['c', 'a', 'b', 'c'].lastIndexOf('c'); // 3
```

## findIndex 배열요소의 특정위치 찾기

`Array.prototype.findIndex()`  

배열에서만 사용가능하다. `indexOf`와 다른점이라면 콜백함수에 더 다양한 수식을 넣어 부합하는 요소를 찾을 수 있다는 것.

`let index = arr.findIndex(callback(element[, index[, array]])[, thisArg])`

```js
// 럭키 7 위치 찾기
['1','2','3','4','5','6','7','8','9'].findIndex((e, i) => e === '7'); // 6

/* {}가 들어가면 return을 명시해줘야 한다. 
['1','2','3','4','5','6','7','8','9'].findIndex((e, i) => {return e === '7'}) 
*/
```