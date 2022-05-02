---
layout: post
date: 2022-04-25 09:51:00 +0900
title: '[javascript] 트랜스파일러와 폴리필 transpilers and polyfills'
categories:
  - javascript
tags:
  - transpilers
  - polyfills
---

* Kramdown table of contents
{:toc .toc}

## 참고

[트랜스파일러와 폴리필](https://javascript.info/polyfills)


## 트랜스파일러 transpilers

자바스크립트는 지속적으로 새로운 문법이 생기고 발전하고 있지만 모든 브라우저에서 신규문법이나 구조를 한번에 적용하기는 쉽지 않다.
그래서 사용하는 것 중 하나가 트랜스파일러다.
트랜스파일러는 신규 자바스크립트를 옛방식의 자바스크립트로 변환을 해 주는 소프트웨어다.
예를 들어 `널 병합연산자(??)`는 2020년 이전 문법에는 없다.

```js
height = height ?? 100
```

트랜스파일러는 위 코드를 읽고 해석하여 아래와 같이 변환해 준다.

```js
height = (height !== undefined && height !== null) ? height : 100
```

보통 개발자들은 본인 컴퓨터에서 트랜스파일러를 실행하고, 그 결과로 나온 번역된 코드로 배포한다.
바벨(Babel)은 가장 유명한 트랜스파일러 중 하나이고 웹팩(webpack)과 같은 최신 프로젝트 빌드 시스템을 이용한다면 자동으로 트랜스파일을 해 주기도 한다.   


## 폴리필 polyfills

최근 자바스크립트에는 새로운 구조나 연산자뿐만 아니라 내장함수가 추가 되기도 한다.

`Math.trunc()`는 소수점 이하는 잘라내고 정수만 반환하는 함수로 최근에 추가되어 옛방식의 브라우저에서는 제대로 작동하지 않는다. 특히, IE는 버전에 상관없이 미지원.

```js
Math.trunc(1.23); // 1
```

 `Math`는 여러 내장 함수를 가지고 있었지만 `trunc()`는 최근에 추가되었고 이렇게 업데이트되거나 추가되는 함수의 스크립트를 폴리필이라고 한다. 아래가 그것으로 격차를 "채우고" 누락된 구현을 추가한다.

 ```js
 if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

실제 내가 사용했던 예시로 `polyfill`코드는 `document.ready()`보다도 더 먼저 읽혀야 한다. `html` 최상단에 위치하도록 한다. `polyfill`의 상세코드는 `mdn`사이트에서 참고할 수 있다.

[padStart polyfill 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

```html
<head>
<script type="text/javascript" src="/js/polyfill.js"></script>
</head>
```

```js
/**
 * 폴리필. IE 등의 브라우저에 없는 함수가 있으면 만든다.
 */
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
```

### 폴리필 라이브러리

- [core js](https://github.com/zloirock/core-js)  
- [polyfill.io](https://polyfill.io/v3/): 기능과 사용자 브라우저에 따라 폴리필 스크립트를 제공



### 최신 기능 제공하는 브라우저 찾기

- [기능 제공하는 브라우저 찾기1](https://kangax.github.io/compat-table/es6/)  
- [기능 제공하는 브라우저 찾기2](https://caniuse.com/)
