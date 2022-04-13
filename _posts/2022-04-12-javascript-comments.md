---
layout: post
date: 2022-04-13 08:36:00 +0900
title: '[javascript] 주석 Comments'
categories:
  - javascript
tags:
  - comment
---

* Kramdown table of contents
{:toc .toc}

## 참고

[주석](https://javascript.info/comments)



## 주석

- 한줄 주석: `//`
- 여러 줄 주석 : `/* ... */`

주석은 간략하게 써서 코드의 이해를 돕는 것이다. 주석으로 복잡한 코드를 설명하려고 들지 말라. 그럴바엔 새 코딩을 하는 것이 낫다.

아래처럼 주석을 달아 `for`문의 용도를 설명하는 것보다

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

    // check if i is a prime number
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i);
  }
}
```

중첩을 제거하여 별도 함수로 만드는 것이 어떤 기능을 하는 것인지 이해하기 쉽다.

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    alert(i);
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

## 주석 사용법

코드를 설명하는 것보다는 조감도처럼 어떻게 작용하는지, 제어흐름은 무엇이지 등 컴포넌트의 개괄을 쓰는 것이 좋다. 이런걸 `UML`이라고 하는데 코드를 설명하는 구조다이어그램을 작성한다.

### Doc 주석

함수의 목적에 대한 이해를 도와준다. 여러 툴을 이용해서 자동으로 주석을 생성하거나 주석을 바탕으로 `HTML`문서를 생성할 수도 있다.

```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

아래는 `JSDoc`에 대한 이해를 도울 수 있는 API와 자동화를 위한 툴 정보.

[JSDoc이란?](https://en.wikipedia.org/wiki/JSDoc)  
[JSDoc API](https://usejsdoc.org/)  
[WebStorm - JavaScript IDE](https://www.jetbrains.com/webstorm/)  
[JSDoc 3](https://github.com/jsdoc/jsdoc)  

## 요약

- 주석은 `Doc`작성과 같이 전체적인 구조를 파악하기 위해 사용한다.
- 주석은 함수의 사용법을 작성한다.
- 주석은 코드로만 이해가 불가능할 때 사용한다.
- 코드가 어떻게 작동하는지 그것이 무엇을 하는지에 대한 것을 주석으로 남기지는 말라.
