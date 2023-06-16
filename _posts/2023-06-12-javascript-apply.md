---
layout: post
date: 2023-06-12 10:00:00 +0900
title: '[javascript] apply'
categories:
  - javascript
tags:
  - apply
---

* Kramdown table of contents
{:toc .toc}

## 참고

[apply()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)



## Function.prototype.apply()

기존 함수를 재정의하여 원하는 대상에 추가해 그 대상의 메소드인 것처럼 사용할 수 있다.  
특히 2번째 인수를 배열로 받는데 배열의 요소를 하나씩 뽑아 사용한다. 


## 구문

`func.apply(thisArg, [argsArray])`  


- `func`는 기존 함수.  
- 첫번째 인수 `thisArg`는 새로운 함수가 추가될 대상이다. 인스턴스를 나타내는 `this`로 보통은 객체인데 함수나 원시타입 값이 될 수도 있다. `null`이나 `undefined`는 전역객체로 원시타입은 객체로 변환된다. 
- 두번째 인수 `argsArray` 인수배열은 새로 만들어질 함수의 파라미터로 사용된다. 배열의 요소가 하나씩 꺼내져서 순서대로 함수의 파라미터로 전달이 된다. 
- 반환값은 재정의된 함수의 실행 결과값으로 재정의함수 자체를 반환하는 `bind()`와 차이가 있다.  

## 예시

2번째 인수인 배열의 요소를 하나씩 뽑아 쓰는 예시다.  

`Math.max(값1, 값2, /* … ,*/ 값N)`는 값들을 받아 사용한다. 배열을 인수로 받을 수 없지만 `apply()`가 2번째 인수로 배열을 받아 재정의된 함수에 값을 하나씩 전달하는 특징을 적용하면 `Math.max()`에 값 목록이 아닌 배열을 넘겨서 사용할 수 있다. 


```js
Math.max(5, 6, 2, 3, 7); // 7, 원래 이게 기본 사용법

const numbers = [5, 6, 2, 3, 7];

Math.max(numbers); // NaN, 배열을 인수로 넘기면 숫자로 인식하지 못한다.

Math.max.apply(null, numbers); // 7, 배열을 하나씩 뽑아 값 목록으로 만들어준다. 
```

모든 함수는 내부에 `arguments` 객체를 가지고 있다. 전달받는 모든 인수에 대한 정보를 가지고 있다. `apply()`의 두번째 인수`[3, 4]`는 `3, 4`로 별도 값으로 쪼개져서 넘겨지고 있다... 이게 배열이 쪼개져서 하나씩 세팅되는 것을 증빙할 수 있나??

```js
function fn() { 
  console.log(arguments)
}
fn.apply(null, [3,4]) // fn(3,4)와 같음

fn(3,4) === fn.apply(null, [3,4]) // true

/*
Arguments(2) [3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
0: 3
1: 4
callee: ƒ fn()
length: 2
Symbol(Symbol.iterator): ƒ values()
[[Prototype]]: Object
*/
```

아래도 `arguments`를 활요한 예시다. 


```js
function addNumbers() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

const numbers = [2, 4, 6, 8];

const sum = addNumbers.apply(null, numbers);
console.log(sum); // 20
```

## More

[`call()`](https://mascaradee.github.io/javascript/javascript-call)   
[`bind()`](https://mascaradee.github.io/javascript/javascript-bind)



## 결론

배열을 인수로 받아야 할 때 응용해서 사용하면 좋을 듯
