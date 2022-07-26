---
layout: post
date: 2022-07-26 19:05:00 +0900
title: '[javascript] localeCompare 문자열 비교하고 정렬까지'
categories:
  - javascript
tags:
  - javascript
  - localeCompare
  - sort
---

* Kramdown table of contents
{:toc .toc}

## 참고 

[문자열 비교](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

## localeCompare, 문자열 비교 

`String.prototype.localeCompare()`

`기준문자열.localeCompare(비교할문자열)` 형태로 사용한다. 거기에 추가로 로케일과 옵션을 매개변수로 받아 지역 언어에 맞는 기준으로 비교가 가능하다.

```
let number = referenceStr.localeCompare(compareString)
let number = referenceStr.localeCompare(compareString, locales)
let number = referenceStr.localeCompare(compareString, locales, options)
```

- `referenceStr`: 기준문자열
- `compareString`: 비교할 문자열
- `locales`: 어느 나라 기준인지? [로케일참조](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
- `options`: `{numeric: true}, { sensitivity: 'base' }` 등 추가적인 옵션
- `number`:  `referenceStr`이 `compareString`보다 크면 1, 작으면 -1, 같으면 0으로 반환된다.


```js'
'a'.localeCompare('z'); // -1
'ä'.localeCompare('a', 'de', { sensitivity: 'base' }); // 0 , 독일어
'ä'.localeCompare('a', 'sv', { sensitivity: 'base' }); // 1 , 스웨덴어

'2'.localeCompare('10'); // 1
'2'.localeCompare('10', undefined, {numeric: true}); // -1 , 옵션으로 숫자값으로된 문자열임을 알려주면 우리가 예상한대로 2가 더 작다고 판단해 준다. 
```


```js
// 각 문자의 두번째 자리의 알파벳 오름차순 정렬하기, 혹시 해당 문자가 같으면 전체 단어를 비교하여 오름차순 정렬하기

const arr = ['ant', 'can', 'ben', 'bell'];
arr.sort((prev, next) => {
   return prev[1] === next[1] ? // 각 단어의 2번째 알파벳이 같은가요?
      prev.localeCompare(next) : // 그럼 전체 단어 오름차순
      prev[1].localeCompare(next[1]); // 아니면 2번째 알파벳 오름차순
})
```