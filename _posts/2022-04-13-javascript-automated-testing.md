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
- [카르마](https://karma-runner.github.io/latest/index.html)는 여기서는 미사용

이 라이브러리는 브라우저와 서버사이드 모두 테스트가 가능하다.


## 실제 활용 예시

```html
<!DOCTYPE html>
<html>
<head>
  <!-- add mocha css, to show results -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
  <!-- add mocha framework code -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
  <script>
    mocha.setup('bdd'); // minimal setup
  </script>
  <!-- add chai -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
  <script>
    // chai has a lot of stuff, let's make assert global
    let assert = chai.assert;
  </script>
</head>

<body>

  <script>
    function pow(x, n) {
      /* function code is to be written, empty now */
    }
  </script>

  <!-- the script with tests (describe, it...) -->
  <!-- <script src="test.js"></script> -->
  <script>
    // 외부파일 임포트가 되지 않아 아래와 같이 사용함.
    describe("pow", function () {
      it("raises to n-th power", function () {
        assert.equal(pow(2, 3), 8);
      });
    });
  </script>

  <!-- the element with id="mocha" will contain test results -->
  <div id="mocha"></div>

  <!-- run tests! -->
  <script>
    mocha.run();
  </script>
</body>

</html>
```

위 코딩을 실행하면 아래와 같은 화면을 볼수 있다.

[모카테스트 초기화면](/images/mocha-test-init.png)

현재는 함수는 코드가 없이 비어 있고 `return`이 없으면 `undefined`를 반환하기 때문에 8과 같지 않아 에러가 나온다.

### 초기 구현

이제 `pow`함수를 수정해 테스트를 통과하게 해 보자.

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```
[모카테스트 초기구현 결과](/images/mocha-test-initial-implementation.png)

### 사양 개선

위에서는 하드코딩으로 억지로 테스트를 통과하게 만든 것이다. 이제 다른 테스트케이스를 추가해서 테스트해 보자.

```js
describe("pow", function () {
  it("raises to n-th power", function () {
    assert.equal(pow(2, 3), 8);
    assert.equal(pow(3, 4), 81); // 2. 추가 테스트케이스를 작성한다.
  });
});
```

첫번째 `assert.equal`은 통과했지만 무조건 8을 리턴하게 되어 있어 두번째는 실패하게 된다.  
하지만 위 코드로는 어떤 것이 실패했는지 구분할 수 없다.  
`assert`문은 에러가 나면 바로 `it`블록이 종료된다. 위 케이스와는 다르지만 첫번째 `assert`문이 실패하면 두번째는 영영 실행되지 않는 상황이 발생할 수도 있다.

[모카테스트 추가케이스 결과](/images/mocha-test-second-test.png)

따라서 테스트 케이스를 나누어 `it`블록에 하나씩 배정하면 테스트 결과를 각각 얻을 수 있어 더 유용하다.

```js
describe("pow", function () {
  it("2 raised to power 3 is 8", function () {
    assert.equal(pow(2, 3), 8);
  });
  it("3 raised to power 4 is 81", function () {
    assert.equal(pow(3, 4), 81);
  });
});
```

[모카테스트 케이스당 하나의 테스트 결과](/images/mocha-test-one-for-one.png)

### 구현 개선

이제 2번째 케이스도 통과할 수 있도록 함수를 수정해 보자.

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

[모카테스트 구현 개선 결과](/images/mocha-test-improving-implementation.png)

반복문을 이용해서 테스트 케이스를 더 많이 만들어 보자.

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```
[모카테스트 테스트 개선 결과](/images/mocha-test-improving-test.png)
