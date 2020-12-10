---
layout: post
date: 2020-12-10 18:00:00 +0900
title: '[javascript] array'
categories:
  - javascript
tags:
  - array
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- 드림코딩 by 엘리  
[https://www.youtube.com/watch?v=yOdAVDuHUKQ&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=8](https://www.youtube.com/watch?v=yOdAVDuHUKQ&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=8)

# array

## 자료구조
비슷한 타입의 객체들을 묶어 놓은 것으로 자바스크립트는 동적언어로 타입에 덜 구애 받아 동일하지 않은 타입의 객체라도 묶어 놓을 수 있으나 이것은 추천하지 않는다.  
자바의 경우는 같은 타입이 아니면 묶일 수 없음에 주의  

## TODO
 추가 공부 - 자료구조와 알고리즘


## 배열 Array
인덱스로 지정되어 있는 자료구조  

### 배열 선언

```js
const arr1 = new Array();
const arr2 = [1, 2];
```

### 인덱스 접근

```js
const fruits = ['🍎', '🍌'];
console.log(fruits); // ['🍎', '🍌']
console.log(fruits.length); // 2
console.log(fruits[0]); // 🍎 : 배열의 첫번째 인덱스
console.log(fruits[fruits.length - 1]); // 🍌 : 배열의 마지막 인덱스
console.log(fruits[2]); // undefined
console.clear();
```

### 반복

#### for loop

```js
for (let i = 0; i < fruits.length; i++) {
   console.log(fruits[i]);
}
```

#### for(값 of 배열)

```js
for (let fruit of fruits) {
    console.log(fruit);
}
```
#### forEach

```js
/*
fruits.forEach(function(value, index, array){
    console.log(value);
    console.log(index);
    console.log(array);
});
*/
fruits.forEach((fruit) => console.log(fruit)); // 화살표함수표현식
```

#### 배열 추가1 .push()

배열의 맨 뒤에 항목을 추가하고 추가 항목을 포함한 길이를 리턴한다.  

`.push(...items: T[]): number;`
- `...items: T[]` '인자: 데이터타입' - 배열 형식의 한 개 항목 혹은 여러 항목을 인자로 사용
- `number` : 리턴값 형식

```js
fruits.push('🍓', '🍒');
let arrayLength = fruits.push('🍓', '🍒');
console.log(arrayLength); // 4 : 추가 포한한 길이 리턴
console.log(fruits); // (4) ["🍎", "🍌", "🍓", "🍒"]
```

#### 배열 삭제1 .pop()

배열의 마지막 항목을 삭제하고 삭제한 그 항목을 리턴한다.  

`.pop(): T | undefined;`
- `T | undefined` : 리턴값 형식 - 삭제한 항목 (element) 혹은 없는 경우 undefined를 리턴

```js
fruits.pop();
let removeItem = fruits.pop();
console.log(removeItem); // 🍒 : 삭제한 마지막 항목 리턴
console.log(fruits); //  ["🍎", "🍌", "🍓"]
```

#### 배열 추가2 .unshift()

배열의 맨 앞에 새로운 항목을 추가하고 추가 항목을 포함한 길이를 리턴한다.  

`.unshift(...items: T[]): number;`
- `...items: T[]` '인자: 데이터타입' - 배열 형식의 한 개 항목 혹은 여러 항목을 인자로 사용
- `number` : 리턴값 형식

```js
let length = fruits.unshift('🍑','🍇');
console.log(length); // 5
console.log(fruits); // ["🍑", "🍇", "🍎", "🍌", "🍓"]
```

#### 배열 삭제2 .shift()

배열의 첫번째 항목을 삭제하고 삭제한 그 항목을 리턴한다.  
```js
let removeItem1 = fruits.shift();
console.log(removeItem1); // 🍑
console.log(fruits); // ["🍇", "🍎", "🍌", "🍓"]
```

#### **shift(), unshift()는 pop(), push()보다 엄청 느리다**  

#### .splice()
```js
// splice : remove an item by index position
// 지정한 인덱스부터 지정된 삭제개수만큼  데이터를 삭제할 수 있다.
// console.clear();
console.log(fruits); // ["🍇", "🍎", "🍌", "🍓"]
let removeItem2 = fruits.splice(1, 1); // 사과 한개만 삭제
console.log(removeItem2); // ["🍎"]  배열에서 지정한 익덱스를 삭제하고 그 삭제 항목을 배열로 리턴한다.
// fruits.splice(1); // 사과부터 모두 삭제

fruits.splice(1, 1, '🥝','🍉'); // 세번째 인자로 삭제항목의 자리를 대신해 다른 항목을 추가할 수 있다.
console.log(fruits); // ["🍇", "🥝", "🍉", "🍓"]

// combine two arrays
const fruits2 = ['🥑','🍅'];
const newFruits =  fruits.concat(fruits2); // array + array
const newFruits1 = newFruits.concat('🍍'); // arrya + 문자열
console.log(newFruits); // ["🍇", "🥝", "🍉", "🍓", "🥑", "🍅"]
console.log(newFruits1);
```

#### 검색

```js
console.clear();
console.log(fruits);
console.log(fruits.indexOf('🍇')); // 0
console.log(fruits.includes('🥑')); // false
fruits.push('🍇');
console.log(fruits);
console.log(fruits.indexOf('🍇', 1)); // 4 : 두번째 인자로 지정된 인덱스부터 끝까지 검색
console.log(fruits.lastIndexOf('🍇')); // 4
console.log(fruits.lastIndexOf('🍇', 3)); // 0 : 두번째 인자로 지정된 인덱스부터 거꾸로 검색
```
