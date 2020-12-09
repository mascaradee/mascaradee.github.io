---
layout: post
date: 2020-12-09 15:00:00 +0900
title: '[javascript] object'
categories:
  - javascript
tags:
  - object
  - ES6
  - for...in
  - for...of
  - assign

---

- 참고  
[드림코딩 by 엘리](https://www.youtube.com/watch?v=1Lbr29tzAA8)

# 객체

primitive 변수에는 하나의 값만 넣을 수 있다. 추가되는 정보가 많아 질수록 추가해야 하는 변수도 늘어나게 되는데 이것을 개선하고자 object를 사용한다.  

## 객체 선언과 프로퍼티 추가 / 삭제

- object literal

```js
const obj1 = {};
```

- object constrcutor

```js
const obj2 = new Object();
```

객체 선언 후에도 프로퍼티를 추가하거나 삭제할수 있다. 하지만 유지보수하기엔 힘들어지므로 추천하지는 않는다.  

```js
function print(person) {
    console.log(person.name);
    console.log(person.age);
}
const macs = {name: 'macs', age: 5};
print(macs); // {name: 'macs', age: 5}

// 프로퍼티 추가
macs.hasJob = true;
console.log(macs.hasJob); // true

// 프로퍼티 삭제
delete macs.hasJob;
console.log(macs.hasJob); // undefined
```

## 계산된 프로퍼티 Computed properties

객체 내 프로퍼티를 얻는 받법도 2가지이다.  

```js
console.log(macs.name); // 보통 이렇게
console.log(macs['name']); // ['문자열']이 들어가야 제대로 출력 가능하고 선언 시, 어떤 값을 출력해야 할지 모를때 사용한다.

//프로퍼티 추가2
macs['hasJob'] = true;
console.log(macs.hasJob);

function printValue(obj, key) {
    //console.log(obj.key); // key에 어떤 값이 들어올지 알수 없는 상태이므로 이 방법은 사용할 수 없다.
   console.log(obj[key]);
}
printValue(macs, 'name'); // macs
printValue(macs, 'age'); // 5
```

## Property value shorthand

객체의 키와 값의 이름이 동일한 경우 키만 명시하여 사용할 수 있다.  

```js
const person1 = { name: 'bob', age: 2};
const person2 = { name: 'steve', age: 3};
const person3 = { name: 'dave', age: 4};

const person4 = makePerson('mac', 30); // 비슷한 객체를 계속 추가해야 할 경우, 함수를 만들어 해결하면 더 유용
console.log(person4);
function makePerson(name, age) {
    return {
        name, //name: name, : key명과 value명이 같다면 하나로 줄여서 사용 가능
        age// age:age
    };
}
```

## 생성자 함수 Constructor Function
순수하게 객체 생성만을 목적으로 하는 함수는 생성자 함수라고 한다. 생성자 함수명은 대문자로 시작한다.  

```js
function Person(name, age) {
    // this = {}; // 이 작업은 자바스크립트 엔진에서 대신 해 준다.
    this.name = name;
    this.age = age;
    // return this; // 이 작업은 자바스크립트 엔진에서 대신 해 준다.
}
```

## in operator : property existence check

객체 내에 키가 있는지 확인하는 용도로 true/false 반환, 객체 내에 없는 키를 출력하려고 할때는 'undefined'를 반환한다.  

`(키 in 객체)`

```js
console.log('name' in macs); // true
console.log('age' in macs); // true
console.log('random' in macs); // false
console.log(macs.random); // undefined
```

## for... in

객체의 키를 도출하는 데 이용한다.  

`for (키 in 객체)`

```js
console.clear(); // 이전 로그 삭제
for (key in macs) {
    console.log(key); // name age hasJob
}
```

## for...of

리스트, 배열과 같은 iterable을 이용해 값을 도출하는데 이용한다.  

`for (값 of 배열)`

```js
const array = [1, 2, 4, 5];
// old
for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}
// new
for (i of array) {
    console.log(i);
}
```


## 객체 속성 복사 Object.assign()

`Object.assign(target, ...sources)`

```js
const user = { name: 'macs', age: '20'};
const user2 = user; // user와 user2는 메모리의 같은 레퍼런스를 가진다. 레퍼런스가 실제 macs, 20이 들어 있는 객체를 가리킨다.
user2.name = 'bbung';
console.log(user);

// 객체 복사 old
const user3 = {};
for (key in user) {
    user3[key] = user[key];
}
user.name = 'macs';
console.clear();
console.log(user); // { name: 'macs', age: '20'}
console.log(user2); // user와 user2는 같은 객체를 가리키므로 수정사항이 동일하게 반영
console.log(user3); // {name: "bbung", age:"20"} : 별도 객체이므로 수정이 되어도 다른 객체에 영향을 미치지 않는다.  

// 객체 복사 new ex1
const user4 = {};
Object.assign(user4, user); // Object.assign({}, user);와 동일
console.log(user4);

// 객체 복사 new ex2
const fruit1 = { color: 'red'};
const fruit2 = { color: 'blue', size: 'big'};
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); // assign할 때 뒤에 명시된 fruit2의 color가 1을 덮어쓰게 된다.
console.log(mixed.size);
```
