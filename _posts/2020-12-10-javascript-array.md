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

## 배열 Array
인덱스로 지정되어 있는 자료구조  

## 자료구조
비슷한 타입의 객체들을 묶어 놓은 것으로 자바스크립트는 동적언어로 타입에 덜 구애 받아 동일하지 않은 타입의 객체라도 묶어 놓을 수 있으나 이것은 추천하지 않는다.  
자바의 경우는 같은 타입이 아니면 묶일 수 없음에 주의  

### TODO
 추가 공부 - 자료구조와 알고리즘

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

#### for

```js
for (let i = 0; i < fruits.length; i++) {
   console.log(fruits[i]);
}
```

#### for-of

`for (값 of 배열) {}`로 루프를 돌면서 `값(요소)`을 리턴한다.

`for (variable of iterable) { ... }`

```js
for (let fruit of fruits) {
    console.log(fruit);
}
```

참고로 for-in은 배열이 아닌 객체를 이용해 반복문을 만든다.  

`for (키 in 오브젝트) {}`로 루프를 돌면서 `키(프로퍼티)`, `값(요소)`를 리턴한다.

`for (variable in object) { ... }`

```js
const obj = {a: 1, b: 2, c: 3}
for (const property in obj) {
    console.log(property); // a b c
    console.log(obj[property]); // 1 2 3
}
```

#### forEach

배열의 각 요소마다 콜백함수를 수행한다.

`forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;`
- `callbackfn: (value: T, index: number, array: T[]) => void` - 콜백함수 매개변수로 값, 인덱스, 배열을 세팅할 수 있고 리턴은 `void`
- `thisArg?: any` - (옵션) 콜백함수가 참조하는것???

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

### 배열 추가, 배열 삭제
- 배열 추가 : .push(), .unshift(), .splice()
- 배열 삭제 : .pop(), .shift(), .splice()

![array-native-function.jpg](/images/array-native-function.jpg)

#### .push()

배열의 맨 뒤에 요소를 추가하고 추가 요소를 포함한 길이를 리턴한다.  
그 배열은 요고가 추가된 상태로 변경이 된다.  

`.push(...items: T[]): number;`
- `...items: T[]` - '매개변수1' : 배열 형식의 한 개 요소 혹은 여러 요소를 매개변수로 사용
- `: number` : 리턴 형식

```js
fruits.push('🍓', '🍒');
let arrayLength = fruits.push('🍓', '🍒');
console.log(arrayLength); // 4 : 추가 포한한 길이 리턴
console.log(fruits); // (4) ["🍎", "🍌", "🍓", "🍒"]
```

#### .pop()

배열의 마지막 요소를 삭제하고 삭제한 그 요소를 리턴한다.  
그 배열은 요소가 삭제된 상태로 변경이 된다.  


`.pop(): T | undefined;`
- `: T | undefined` : 리턴 형식 - 삭제한 요소(element) 혹은 없는 경우 undefined를 리턴

```js
fruits.pop();
let removeItem = fruits.pop();
console.log(removeItem); // 🍒 : 삭제한 마지막 요소 리턴
console.log(fruits); //  ["🍎", "🍌", "🍓"]
```

#### .unshift()

배열의 맨 앞에 새로운 요소를 추가하고 추가 요소를 포함한 길이를 리턴한다.  
그 배열은 요소가 추가된 상태로 변경이 된다.  

`.unshift(...items: T[]): number;`
- `...items: T[]` - '매개변수1' : 배열 형식의 한 개 요소 혹은 여러 요소를 매개변수로 사용
- `: number` : 리턴 형식

```js
let length = fruits.unshift('🍑','🍇');
console.log(length); // 5
console.log(fruits); // ["🍑", "🍇", "🍎", "🍌", "🍓"]
```

#### .shift()

배열의 첫번째 요소를 삭제하고 삭제한 그 요소를 리턴한다.  
그 배열은 요소가 삭제된 상태로 변경이 된다.  

`.shift(): T | undefined;`
- `: T | undefined` : 리턴 형식 - 삭제한 요소 (element) 혹은 없는 경우 undefined를 리턴

```js
let removeItem1 = fruits.shift();
console.log(removeItem1); // 🍑
console.log(fruits); // ["🍇", "🍎", "🍌", "🍓"]
```

**※ 참고로 shift(), unshift()는 pop(), push()보다 엄청 느리다**  

#### .splice()

배열의 요소들을 삭제하거나 새로운 요소를 삭제한 자리에 추가할수 있다. 삭제한 요소들을 리턴한다.  
그 배열은 요소가 삭제된 상태로 변경이 된다.    

`splice(start: number, deleteCount?: number): T[];`  
`splice(start: number, deleteCount: number, ...items: T[]): T[];`
- `start: number` - 매개변수1 : 숫자형식의 시작인덱스
- `deleteCount?: number` - (옵션) 매개변수2 : 삭제할 개수, 생략시 시작 인덱스 이후로 모두를 삭제한다.
- `...items: T[]` - (옵션) 매개변수3 : 삭제자리를 대체하여 추가할 요소들
- `: T[]` - 리턴 형식 : 삭제한 요소를 배열로 리턴한다.

```js
// console.clear();
console.log(fruits); // ["🍇", "🍎", "🍌", "🍓"]
let removeItem2 = fruits.splice(1, 1); // 사과 한개만 삭제
console.log(removeItem2); // ["🍎"]  배열에서 지정한 익덱스를 삭제하고 그 삭제 항목을 배열로 리턴한다.
// fruits.splice(1); // 사과부터 모두 삭제

fruits.splice(1, 1, '🥝','🍉'); // 세번째 매개변수로 삭제항목의 자리를 대신해 다른 항목을 추가할 수 있다.
console.log(fruits); // ["🍇", "🥝", "🍉", "🍓"]
```

### 배열 연결

#### .concat()

2개 이상의 배열을 연결한다.  

`concat(...items: ConcatArray<T>[]): T[];`  
`concat(...items: (T | ConcatArray<T>)[]): T[];`
- `...items: (T | ConcatArray<T>)[]` - 매개변수 : 연결할 문자열 혹은 배열
-  `: T[]` - 리턴 형식 : 연결된 결과 배열

```js
const fruits2 = ['🥑','🍅'];
const newFruits =  fruits.concat(fruits2); // array + array
const newFruits1 = newFruits.concat('🍍'); // arrya + 문자열
console.log(newFruits); // ["🍇", "🥝", "🍉", "🍓", "🥑", "🍅"]
console.log(newFruits1);
```

### 검색

#### .indexOf()

지정된 배열 요소의 첫번째 인덱스를 리턴한다. 두번째 매개변수로 지정된 인덱스부터 끝까지 검색한다.  

`indexOf(searchElement: T, fromIndex?: number): number;`
- `searchElement: T`- 매개변수1 : 찾을 요소
- `fromIndex?: number` - (옵션) 매개변수2 : 지정한 인덱스이후 부터 요소를 찾는다.  
- `: number` - 리턴 형식 : 찾은 인덱스를 리턴한다.  

```js
console.clear();
console.log(fruits); // ["🍇", "🥝", "🍉", "🍓"]
fruits.push('🍇');
console.log(fruits); // ["🍇", "🥝", "🍉", "🍓", "🍇"]
console.log(fruits.indexOf('🍇')); // 0
console.log(fruits.indexOf('🍇', 1)); // 4 :
```

#### .lastIndexOf()

지정된 배열 요소를 끝에서부터 찾아 처음 나오는 인덱스를 리턴한다. 두 번째 매개변수로 지정된 인덱스부터 거꾸로 검색한다.  

`lastIndexOf(searchElement: T, fromIndex?: number): number;`
- `searchElement: T`- 매개변수1 : 찾을 요소
- `fromIndex?: number` - (옵션) 매개변수2 : 지정한 인덱스부터 거꾸로 요소를 찾는다.  
- `: number` - 리턴 형식 : 찾은 인덱스를 리턴한다.  

```js
console.log(fruits); // ["🍇", "🥝", "🍉", "🍓", "🍇"]
console.log(fruits.lastIndexOf('🍇')); // 4
console.log(fruits.lastIndexOf('🍇', 3)); // 0 : 두번째 매개변수로 지정된 인덱스부터 거꾸로 검색
```

#### .includes()

지정된 배열 요소가 있는지 확인 후 true/false 리턴한다. 두 번째 매개변수로 지정된 인덱스부터 검색한다.  

`includes(valueToFind[, fromIndex])`
- `valueToFind` - 매개변수1 : 찾을 요소
- `[, fromIndex]` - (옵션) 매개변수2 : 검색을 시작할 위치

```js
console.log(fruits.includes('🥑')); // false
```

#### .join()

배열을 문자열로 리턴한다.  

`join(separator?: string): string;`
- `separator?: string` - (옵션)매개변수 : 문자열 구분자가 있으면 그것을 이용하고 없으면 ','로 연결된 문자열로 리턴

```js
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.join()); // apple, banana, orange
console.log(fruits.join('^')); // apple^banana^orange
```

#### .split()

문자열을 지정된 구분자를 이용해 구분한 후 별도 배열을 만들어 리턴한다.  

`split(separator: string | RegExp, limit?: number): string[];`
- `separator: string | RegExp` - 매개변수1 : 문자열 혹은 정규식 구분자
- `limit?: number` - (옵션) 매개변수2 : 지정된 개수만큼 리턴한다.
- `: string[]` - 리턴 형식

```js
const fruits = '🍎, 🥝, 🍌, 🍒';
console.log(fruits.split(',', 3)); // ["🍎", " 🥝", " 🍌"]
```

#### .reverse()

배열을 뒤집어서 재구성해 그 배열을 리턴한다.  

`reverse(): T[];`
- `: T[]` : 리턴 형식

```js
const array = [1, 2, 3, 4, 5];
console.log(array.reverse()); // [ 5, 4, 3, 2, 1]
console.log(array); // [ 5, 4, 3, 2, 1] 배열 자체가 reverse 된다.
```

#### .slice()

지정된 시작숫자와 종료숫자만큼 요소를 잘라 새로운 배열로 리턴한다.  
기존 배열은 수정되지 않는다.  

`slice(start?: number, end?: number): T[];`
- `start?: number`  - (옵션) 매개변수1 : 자르는 시작 인덱스
- `end?: number` -  (옵션) 매개변수2 : 자르는 종료 인덱스로 종료인덱스 미포함 전까지를 자른다.
- `: T[]` - 리턴 형식

```js
const array = ['일', '이', '삼', '사', '오'];
console.log(array.slice(2)); // ['삼', '사', '오'] - 2번 인덱스 포함 이후 요소를 잘라 리턴
console.log(array.slice(2, 3)); // ['삼'] - 2번 인덱스 이후 3번 인덱스 전까지 잘라 리턴
console.log(array); // 배열자체 수정은 없다  cf.splice
```

#### .find()

배열의 루프를 돌면서 콜백함수 조건에 맞는 요소가 나오면 거기서 루프실행을 멈추고 그 요소를 리턴한다. 맞는 요소가 없으면 `undefined`를 리턴한다.  

`find(callback[, thisArg])`
- `callback(element, index, array)` - 매개변수1 : 배열의 각 값에 대해 실행할 함수로 매개변수로 요소, 인덱스, 배열을 받는다.  
- `[, thisArg]` - (옵션) 매개변수2 : 콜백이 호출될때 this로 사용할 객체

```js
class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// 90점인 학생 찾기
const result = students.find(student => student.score === 90);
console.log(result); // Student {name: "C", age: 30, enrolled: true, score: 90} <- 오브젝트 형식의 요소
```

#### .filter()

배열의 루프를 돌면서 조건에 맞는 요소를 모아 새 배열로 만들어 리턴한다.  

`filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];`  
`filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];`  
- `predicate: (value: T, index: number, array: T[]) => unknown` - 매개변수1 : 값, 인덱스, 배열을 매개변수로 받는 함수로 이 조건에 따라 요소를 필터링한다.  
- `thisArg?: any` - (옵션) 매개변수2 : 함수를 실행할 때 this로 사용하는 값

```js
// 등록된 학생들은 누구인가?
const result = students.filter(student => student.enrolled ); // student.enrolled == true로 할 필요는 없다.
console.log(result);
/*
(3) [Student, Student, Student]
0: Student {name: "A", age: 29, enrolled: true, score: 45}
1: Student {name: "C", age: 30, enrolled: true, score: 90}
2: Student {name: "E", age: 18, enrolled: true, score: 88}
*/
```

#### .map()

배열의 루프를 돌면서 콜백함수의 조건에 맞게 다른 값으로 변환해서 그 값들을 새로운 배열로 리턴한다.  
내가 따로 for문을 만들어서 일일이 돌릴 필요가 없는 그레이트한 메서드임.  

`map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];`
- `callbackfn: (value: T, index: number, array: T[]) => U` - 매개변수1 : 콜백함수
- `thisArg?: any` - (옵션) 매개변수2 : callback을 실행할 때 this로 사용되는 값.

```js
// make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
const result = students.map(student => student.score);
console.log(result);

// make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
const result1 = students
.map((student) => student.score) // 학생들의 점수만 배열로 만든다.
.join(); // 점수배열을 문자열로 합친다.
console.log(result);
```

#### .some()

배열의 루프를 돌면서 콜백함수 조건에 맞는 요소가 하나라도 있으면 true, 모두 없으면 false를 리턴한다.  

`some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;`
- `predicate: (value: T, index: number, array: T[]) => unknown `- 매개변수1 : 콜백함수
- `thisArg?: any` - (옵션) 매개변수2 : callback을 실행할 때 this로 사용되는 값.
- `: boolean` - 리턴형식

```js
//check if there is a student with the score lower than 50
const result = students.some(student => student.score < 50);
console.log();
```

#### .every()

`.some()`과 반대로 모든 요소가 조건에 맞으면 true, 하나라도 맞지 않는게 있으면 false를 리턴한다.  

`every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;`  
`every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];`
- `predicate: (value: T, index: number, array: T[]) => unknown` - 매개변수1 : 콜백함수
- `thisArg?: any` - (옵션) 매개변수2 : callback을 실행할 때 this로 사용되는 값.
- `: boolean` - 리턴형식

```js
//check if there is a student with the score lower than 50
// 같은 문제를 every로 해결할 수는 있지만 가독성이나 이해도가 어렵다.
const result = !students.every(student => student.score >= 50);
console.log();
```

#### .reduce()

콜백함수를 실행해서 얻은 값을 계속 누적되어 다른 콜백함수의 매개변수가 되고 또 누적되는 것을 반복하여 그 값을 리턴한다.  

`reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;`
- `callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U` - 매개변수1 : 콜백함수로 이전값, 현재 값, 현재 인덱수, 배열을 매개변수로 받는다.  
- `initialValue: U` - 매개변수2 : 초기값, 이 값이 주어지지 않으면 원하는 값이 나오지 않음

```js
const result = students.reduce((prev, curr) => {
  console.log('---');
  console.log(prev); // 누적된 값이 리턴
  console.log(curr); // 주어진 배열의 현재 데이터 (인덱스 0 ~ 끝)
  return prev + curr.score;
}, 0); // prev가 0부터 시작하도록 하는 초기값
/*
---
0
Student {name: "A", age: 29, enrolled: true, score: 45}
---
45
Student {name: "B", age: 28, enrolled: false, score: 80}
---
125
Student {name: "C", age: 30, enrolled: true, score: 90}
---
215
Student {name: "D", age: 40, enrolled: false, score: 66}
---
281
Student {name: "E", age: 18, enrolled: true, score: 88}
*/

const result1 = students.reduce((prev, curr) => prev + curr.score, 0);
console.log(result1 / students.length);
```

#### .sort()

비교함수 조건에 따라 배열을 정렬한다. 예를 들어 함수의 첫 번째 매개변수가 두 번째 매개변수보다 작으면 음수를 리턴하고 같으면 0이나 양수를 리턴하여 정렬에 사용한다. 만약 함수가 생략되면 ASCII 코드값에 의해 오름차순 정렬이 된다.

`[11,2,22,1].sort((a, b) => a - b)`


`sort(compareFn?: (a: T, b: T) => number): this;`
- `compareFn?: (a: T, b: T) => number` - (옵션) 매개변수1 : 비교함수
- `: this` - 리턴 형식


```js
// sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
const result = students
.map((student) => student.score) // 학생들의 점수로만 배열을 만든다.
.sort((a,b) => a - b) // 오름차순 정렬을 한다.
.join(); // 배열을 문자열로 만든다.
console.log(result);
```
