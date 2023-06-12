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


## apply()

`Function.prototype.apply(대상함수, [인수배열])`

## 설명

역시 함수 재정의할 때 사용하는 메소드다. 인수배열을 넘기면 배열요소가 새로 정의될 함수에 각 인자로 세팅된다. 반환값은 재정의된 함수가 아닌 함수의 실행 결과값으로 `bind()`와 차이가 있다.  

## 예시

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
