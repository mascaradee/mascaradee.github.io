---
layout: post
date: 2022-04-11 16:54:00 +0900
title: '[javascript] 화살표 함수 arrow function'
categories:
  - javascript
tags:
  - arrow function
---

* Kramdown table of contents
{:toc .toc}

## 참고

[화살표 함수](https://javascript.info/arrow-functions-basics)


## 화살표 함수

함수표현식과 비슷하지만 더 간단한 표기법이다.

```
let func = (arg1, arg2, ..., argN) => expression;
```

함수표현식으로는 아래와 같이 표현할 수 있다.

```
let func = function(arg1, arg2, ..., argN) { expression }
```

만약 인수가 하나밖에 없다면 괄호도 생략 가능하다.

```
let func = arg => expression;
```

하지만 인수가 없다면 괄호는 필수다.

```
let func = () => expression;
```

표현식이 복잡해서 줄바꿈이 일아나며 블록`{}`으로 감싸면 된다. 단, 이때는 `return`이 필수다.

```
let func = (arg1, arg2) => {
  let result = arg1 + arg2;
  return result;
}
```

## 요약

화살표 함수는 간단한 표현식이다.

- 블록`{}`을 사용하는 경우 `return`지시어는 필수다.
- 인수가 없을때는 괄호는 생략가능하다.
