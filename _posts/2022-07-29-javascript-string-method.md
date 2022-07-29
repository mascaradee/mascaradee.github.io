---
layout: post
date: 2022-07-29 19:05:00 +0900
title: '[javascript] String 메서드'
categories:
  - javascript
tags:
  - string
  - repeat
---

* Kramdown table of contents
{:toc .toc}

## 참고
[String 전역 객체 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String)


## repeat 문자열 반복

`String.prototype.repeat()`

문자열을 주어진 횟수만큼 반복해서 붙여 만든 새 문자열을 반환한다. 

`let newStr = str.repeat(count);`
- `str`: 반복할 문자열 
- `count`: 반복할 횟수
- `newStr`: 횟수만큰 문자열을 반복하여 만들어진 새로운 문자열, 기존 문자열은 변함없다.

```js
'*'.repeat(5); // *****
```



