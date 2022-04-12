---
layout: post
date: 2022-04-11 09:12:00 +0900
title: '[javascript] tips '
categories:
  - javascript
tags:
  - tips
  - map
  - filter
  - destructuring
  - Object.entries
  - reduce
  - flat
  - ~~
---

* Kramdown table of contents
{:toc .toc}

## 참고

[자바스크립트 팁](https://javascript.plainenglish.io/8-javascript-tricks-to-make-you-a-better-programmer-948b5a3c35b4)

## if else 대신 map

조건이 많아 질 때는 `if else` 반복을 사용하는 것보다는 `map`을 이용 하는 것이 추가 조건을 넣기에도 좋다.

```js
const getFriutsPrice = (name) => {
  if (name === 'apple') {
    return 50000
  } else if (name === 'grape') {
    return 10000
  } else if (name === 'strawberry') {
    return 8000
  }
}
console.log(getFriutsPrice('grape')) // 10000
```

아래처럼

```js
const getFriutsPrice = (name) => {

  const fruitsMap = {
    'apple': 50000,
    'grape': 10000,
    'strawberry': 8000,
    // 과일이 추가되면 이름과 가격만 이 아래에 추가하면 된다.
  }
  return fruitsMap[name];
}
console.log(getFriutsPrice('grape')) // 10000
```

## for 대신 filter와 map

아래 데이터를 출력해야 한다고 할때, `for`보다 `filter`와 `map`을 사용하는 것이 간단하고 의미를 좀 더 명확하게 만든다.

```js
const fruits = [
  {
    name: 'apple',
    group: 1,
  },
  {
    name: 'grape',
    group: 1,
  },
  {
    name: 'strawberry',
    group: 2,
  }
]

const names = [];
for (let i = 0, len = fruits.length; i < len; i++) {
  if (fruits[i].group === 1) {
    names.push(fruits[i].name); // ['apple', 'grape']
  }
}
```

아래처럼 `filter`와 `map`을 사용할 수 있다.

```js
const names = fruits
  .filter((fruits) => fruits.group === 1) // [{name: 'apple', group: 1},{name: 'grape', group: 1}]
  .map((fruits) => fruits.name ); // ['apple', 'grape']
console.log(names);
```


## 값을 바꿀때 사용하는 구조분해할당

값을 서로 바꿀때 임시 변수를 새로 만드는 대신 `구조분해할당(Destructuring assignment)`를 사용 할 수 있다.

```js
let beforeValue = '앞';
let afterValue = '뒤';
let temp = beforeValue;
beforeValue = afterValue;
afterValue = temp;
console.log(beforeValue, afterValue); // 뒤 앞
```

구조분해할당을 사용하면 아래처럼. **하지만 아쉽게도 IE에서는 사용할 수 없다.**

```js
let beforeValue = '앞';
let afterValue = '뒤';
[beforeValue, afterValue] = [afterValue, beforeValue];
console.log(beforeValue, afterValue); // 뒤 앞
```


## Object.entries

프로토타입의 프로퍼티를 제외한 오브젝트의 프로퍼티만 출력하고자 할 때 유용하다.
`banana`는 오브젝트의 프로토타입에 추가되었지만 `fruitsMap`은 오브젝트로부터 비롯되었기 때문에 `for in`을 이용하면 프로토타입의 변수까지도 출력을 하게 된다.

```js
const fruitsMap = {
  'apple': 50000,
  'grape': 10000,
  'strawberry': 8000,
}
Object.prototype['banana'] = 2000;

console.log(fruitsMap); // {apple: 50000, grape: 10000, strawberry: 8000}
console.log(Object.prototype); // {banana: 2000, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}

for (const key in fruitsMap) {
  console.log(key, fruitsMap[key]);
  /*
  apple 50000
  grape 10000
  strawberry 8000
  banana 2000
  */
}
```

`fruitsMap`의 프로퍼티만 출력하려면 `Object.entries()`를 이용하면 된다.

```js
Object.entries(fruitsMap).forEach(([ key, value ]) => {
   console.log(key, value)
})
/*
apple 50000
grape 10000
strawberry 8000
*/
```

## 깊이에 상관없이 다중 배열 내 항목 출력하기

여러 레벨로 이루어진 배열을 하나의 새로운 배열로 담아 출력 하고 싶을 때 `reduce`를 이용해 누적된 결과를 새로운 배열로 리턴할 수 있다.

```js
const fruits = [ [ 'apple', [ 'banana' ] ], [ 'citron', [ 'durian', [ 'fig' ] ] ] ]
const flattenFruits = (fruits) => {
  return fruits.reduce((res, fruits) => {
    return res.concat(Array.isArray(fruits) ? flattenFruits(fruits) : fruits)
  }, [])
}
console.log(flattenFruits(fruits)); // ['apple', 'banana', 'citron', 'durian', 'fig']
```

하지만 더 간단하게 아래와 같은 함수를 이용할 수 도 있다. `Infinity`를 이용해 깊이에 상관없이 플랫하게 표현할 수 있다.
**그렇지만 IE에서는 사용 불가하니 주의하자**

```js
fruits.flat(Infinity);  // ['apple', 'banana', 'citron', 'durian', 'fig']
```

## 소수 버림

`Math.floor`를 이용해 소수점 이하 숫자를 버릴 수 있는데 대신 `~~`연산자를 이용하면 쉽게 처리할 수 있다.

```js
const fruits = [
  {
    name: 'apple',
    price: 1000.50,
  },
  {
    name: 'grape',
    price: 2000.60,
  },
  {
    name: 'strawberry',
    price: 3000.70,
  }
]

const discountedFruits = fruits.map((ele) => {
  return {
    name: ele.name,
    price: ~~ele.price
  }
})
console.log(discountedFruits);
/*
(3) [{…}, {…}, {…}]
0: {name: 'apple', price: 1000}
1: {name: 'grape', price: 2000}
2: {name: 'strawberry', price: 3000}
length: 3
[[Prototype]]: Array(0)
*/
```

## 합계 계산 reduce

`forEach`를 이용해 각 항목들의 합을 구할 수 있지만 `reduce`를 이용하면 더 쉽다.

```js
const fruits = [
  {
    name: 'apple',
    price: 1000,
    amount: 1,
  },
  {
    name: 'banana',
    price: 2000,
    amount: 2,
  },
  {
    name: 'citron',
    price: 3000,
    amount: 3,
  }  
]
let sum = 0
fruits.forEach((fruit) => {
  sum += fruit.price * fruit.amount
})
console.log(sum); // 14000
```

```js
let sum1 = fruits.reduce((result, fruit) => result += fruit.price * fruit.amount, 0);
console.log(sum1); // 14000
```

## 로그를 테이블로

```js
const fruits = [
  {
    name: 'apple',
    price: 1000,
    amount: 1,
  },
  {
    name: 'banana',
    price: 2000,
    amount: 2,
  },
  {
    name: 'citron',
    price: 3000,
    amount: 3,
  }  
]
console.log(fruits);
/*
0: {name: 'apple', price: 1000, amount: 1}
1: {name: 'banana', price: 2000, amount: 2}
2: {name: 'citron', price: 3000, amount: 3}
length: 3[[Prototype]]: Array(0)
*/
console.table(fruits);
/*
|     (index)    |          name    |          price    |          amount           |
|----------------|------------------|-------------------|---------------------------|
| 0              | 'apple'          | 1000              | 1                         |
| 1              | 'banana'         | 2000              | 2                         |
| 2              | 'citron'         | 3000              | 3                         |
*/
```
