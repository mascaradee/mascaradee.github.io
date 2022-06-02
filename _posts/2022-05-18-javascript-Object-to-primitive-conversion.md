---
layout: post
date: 2022-05-18 10:54:00 +0900
title: '[javascript] Object to primitive conversion'
categories:
  - javascript
tags:
  - object
  - primitive
  - conversion
---

* Kramdown table of contents
{:toc .toc}

## 참고

[오브젝트 변환](https://javascript.info/object-toprimitive)

## 요약
원시값을 기대하는 내장 함수나 연산자를 사용할 때 객체-원시형으로의 형 변환이 자동으로 일어납니다.

객체-원시형으로의 형 변환은 `hint`를 기준으로 세 종류로 구분할 수 있습니다.

- `string` (`alert` 같이 문자열을 필요로 하는 연산)
- `number` (수학 연산)
- `default` (드물게 발생함)
연산자별로 어떤 `hint`가 적용되는지는 명세서에서 찾아볼 수 있습니다. 연산자가 기대하는 피연산자를 '확신할 수 없을 때’에는 `hint`가 `default`가 됩니다. 이런 경우는 아주 드물게 발생합니다. 내장 객체는 대개 `hint`가 `default`일 때와 `number`일 때를 동일하게 처리합니다. 따라서 실무에선 `hint`가 `default`인 경우와 `number`인 경우를 합쳐서 처리하는 경우가 많습니다.

객체-원시형 변환엔 다음 알고리즘이 적용됩니다.

1. 객체에 `obj[Symbol.toPrimitive](hint)`메서드가 있는지 찾고, 있다면 호출합니다.
2. 1에 해당하지 않고 `hint`가 `string`이라면, `obj.toString()`이나 `obj.valueOf()`를 호출합니다.
3. 1과 2에 해당하지 않고, `hint`가 `number`나 `default`라면 `obj.valueOf()`나 `obj.toString()`을 호출합니다.

`obj.toString()`만 사용해도 '모든 변환’을 다 다룰 수 있기 때문에, 실무에선 `obj.toString()`만 구현해도 충분한 경우가 많습니다. 반환 값도 ‘사람이 읽고 이해할 수 있는’ 형식이기 때문에 실용성 측면에서 다른 메서드에 뒤처지지 않습니다. `obj.toString()`은 로깅이나 디버깅 목적으로도 자주 사용됩니다.
