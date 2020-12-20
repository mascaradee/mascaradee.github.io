---
layout: post
date: 2020-05-19 00:00:00 +0900
title: '[javascript] type conversion'
categories:
  - javascript
tags:
  - type conversion
  - typeof
  - string
  - number
  - boolean
---

* Kramdown table of contents
{:toc .toc}

## 형 변환

1. 자동 형 변환
2. 명시적 형 변환

## 문자형으로 변환

문자형의 값이 필요할 때 자동으로 혹은 명시적으로 형을 변환한다.

```javascript
let value = false;
alert(typeof value); // boolean

value = String(value); // "false"
alert(typeof value);  // string
```

## 숫자형으로 변환

수학과 관련된 함수와 표현식에서 자동으로 혹은 명시적으로 형을 변환한다.

```javascript
alert('37' / '12'); // 3
alert(typeof ('37' / '12')); // number

let str = '2020';
alert(typeof(str)); // string
let num = Number(str); // 2020
alert(typeof num ); // number

let grade = Number('나는 1학년이야');
alert(grade); // NaN -> 형 변환 실패 (숫자와 문자가 섞여 있음)

// 숫자형 형 변환 규칙
alert(Number(undefined)); // NaN
alert(Number('undefined')); // NaN
alert(Number()); // 0
alert(Number('')); // 0
alert(Number(null)); // 0
alert(Number(' ')); // 0 -> 문자열 처음과 끝 공백이 제거된 후 남은 문자열로 변환
alert(Number('123 ')); // 123
alert(Number('123a ')); // NaN -> a때문에 변환실패
alert(Number(true)); // 1
alert(Number(false)); // 0
```

## 불린형으로 변환

논리 연산을 수행할때 자동으로 혹은 명시적으로 형을 변환한다.

```javascript
alert(Boolean(0)); // false
alert(Boolean('')); // false
alert(Boolean(null)); // false
alert(Boolean(undefined)); // false
alert(Boolean(NaN)); // false
alert(Boolean('0')); // true -> 문자열로 인식
alert(Boolean(' ')); // true -> 문자열 공백으로 인식
```
