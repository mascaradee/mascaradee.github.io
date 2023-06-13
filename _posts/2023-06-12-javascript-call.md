---
layout: post
date: 2023-06-12 10:00:00 +0900
title: '[javascript] call'
categories:
  - javascript
tags:
  - call
---

* Kramdown table of contents
{:toc .toc}

## Function.prototype.call()

기존 함수를 재정의하여 원하는 대상에 추가해 그 대상의 메소드인 것처럼 사용할 수 있다. `apply()`와 동일하지만 2번째 인수의 형태만 다르다.

## 구문

`func.call(thisArg [, arg1, /* …, */ argN])`  

- `func`는 기존 함수.  
- 첫번째 인수 `thisArg`는 새로운 함수가 추가될 대상이다. 인스턴스를 나타내는 `this`로 보통은 객체인데 함수나 원시타입 값이 될 수도 있다. `null`이나 `undefined`는 전역객체로 원시타입은 객체로 변환된다. 
- `arg1, /* …, */ argN` 인수들은 새로 만들어질 함수의 파라미터로 사용된다. `apply()` 2번째 요소로 배열만 받는 것과는 다른 점이다. 
- 반환값은 재정의된 함수의 실행 결과값으로 재정의함수 자체를 반환하는 `bind()`와 차이가 있다.  


## 예시

`printName()`를 `obj`객체의 메소드처럼 사용을 하고 싶다면 `call()`을 이용해서 `obj`를 넘겨준다. 그럼 아래처럼 사용 가능

```js
let name = 'mignon';

let obj = {
  name: 'whale'
}

function printName() {
  console.log(this.name)
}

printName.call(obj);


/*
obj 안에 메서드가 생성된 것처럼 동작하게 된다. 
let obj = {
  name: 'whale',
  printName() {
    console.log(this.name)
  }
}
*/

```

`Array.prototype.map()`은 배열에 종속되어 있는 메서드다. 따라서 배열에만 적용이 가능하지만 아래처럼 `call()`을 이용해 재정의하면 사용가능하다. 

```js
var elems = document.querySelectorAll('div');
var values = [].map.call(elems, function(obj) {
  return obj.value;
});
```

## More
[`apply()`](https://mascaradee.github.io/javascript/javascript-apply)  
[`bind()`](https://mascaradee.github.io/javascript/javascript-bind)


## 결론

대상에 없는 메서드를 추가하여 쓰고 싶지만 기존 함수는 변경하고 싶지 않을 때 사용하면 될 듯 
