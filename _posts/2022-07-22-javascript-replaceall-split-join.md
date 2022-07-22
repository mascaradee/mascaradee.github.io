---
layout: post
date: 2022-07-22 19:05:00 +0900
title: '[javascript] split(), join()으로 replaceall구현하기'
categories:
  - javascript  
tags:
  - javascript
  - split
  - join
---

* Kramdown table of contents
{:toc .toc}

## split(), join()으로 replaceall구현하기

`str.split([separator[, limit]])`

구분자를 기준으로 **문자열**을 나누어 **배열**로 반환한다. 구분자에 해당하는 문자는 사라진다. 

`arr.join([separator])`

**배열**을 구분자로 이어서 **문자열**로 반환한다. 


```js
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

replaceAll('one2threefourone', 'one', 0); // 02threefour0

````
