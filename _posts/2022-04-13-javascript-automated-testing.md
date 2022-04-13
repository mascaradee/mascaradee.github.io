---
layout: post
date: 2022-04-13 10:20:00 +0900
title: '[javascript] 테스트 자동화 automated testing'
categories:
  - javascript
tags:
  - testing
---

* Kramdown table of contents
{:toc .toc}

## 참고

[테스트 자동화](https://javascript.info/testing-mocha)  
[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)  
[모카 가이드 - 테스트 프레임웍](https://mochajs.org/)  



## 테스트 자동화의 필요성

개발을 하면서 여러 테스트를 하고 작동이 제대로 되지 않을 때마다 코드를 수정한다. 그리고 다시 테스트를 진행하지만 수정 전 통과했던 테스트 케이스를 다시 테스트해 보지 않는 경우가 많다. 이럴 경우 다시 오류가 나는 경우가 있는데 이것을 방지하기 위해 별도의 테스트 코드를 작성하고 해당 케이스를 모두 다시 수행할 수 있도록 만드는 것이 좋다.


## 행동 주도 개발 Behavior Driven Development (BDD)

`BDD`는 테스트, 문서, 예시로 이루어져 있다. 아래 예시로 살펴보자.

`x`의 `n`제곱값을 구하는 `pow(x, n)`함수를 만들어 보자. `n`은 0보다 큰 정수이다. 물로 `**`연산자를 이용하면 쉽게 만들 수 있지만 여기선 개발하는 과정에 집중해 보자.  

함수를 만들기 전에 어떤 기능을 하는지와 구체적인 예시가 들어 있는 `사양(specification, spec)`을 적어본다.

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

-  `describe("title", function() { ... })` 은 어떤기능을 하는지 설명하기 위해 사용한다.
- `it("use case description", function() { ... })`은 특정한 사용예시를 설명한다. 인수로 테스트할 함수를 넣는다.
- `assert.equal(value1, value2)`는 구현한 내용을 비교하여 같지 않으면 오류를 리턴한다.

## 개발 플로우

1. 기본 기능을 테스트할 초기사양을 적는다.
2. 기능 구현을 한다.
3. 모카프레임웍을 이용해서 사양을 테스트한다. 기능이 완성되지 않았다면 에러가 나고 제대로 돌아갈때까지 수정을 하면 된다.
4. 테스트와 함께 초기 구현체가 만들어진다.
5. 테스트케이스를 사양에 추가해서 구현체를 테스트 한다.
6. 테스트, 수정을 오류가 없을 때까지 반복한다.

## 테스트 준비에 필요한 프레임웍과 라이브러리

- [모카](https://mochajs.org/)는 `describe`와 `it` 같은 테스트를 위한 함수를 제공해 주는 프레임웍이다.
- [차이](https://www.chaijs.com/)는 여러 종류의`assertions`을 제공해 주는 라이브러리다.
- [사이논](https://sinonjs.org/)은 함수를 감시하고 내장 함수를 사용할 수 있게 해 주는 라이브러리다.

이 라이브러리는 브라우저와 서버사이드 모두 테스트가 가능하다.
