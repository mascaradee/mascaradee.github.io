---
layout: post
date: 2022-05-02 09:10:00 +0900
title: '[javascript] 오브젝트 object'
categories:
  - javascript
tags:
  - object
---

* Kramdown table of contents
{:toc .toc}

## 참고

[오브젝트](https://javascript.info/object)


## 오브젝트 Object

자바스크립트 전반에 쓰이는 데이터 타입 중 하나로 `키:값` 쌍의 형태로, 키는 프로퍼티명, 식별자 등으로 불린다.

```
let 오브젝트명 = {
  키: 값,
  프로퍼티명: 프로터티값,
  식별자: 값,
  ...
};
```

### 오브젝트 선언

2가지 방법으로 오브젝트를 생성할수 있는데 보통은 오브젝트 리터럴 방식인 `{}`를 이용한다.

```js
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```

### 오브젝트 생성

프로퍼티명은 문자열이지만 값은 어떤 타입도 사용할 수 있다.

```js
let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};
```

### 오브젝트 접근, 값 얻기

프로퍼티값은 `.`으로 접근할수 있다.

```js
alert(user.name); // John
alert(user.age); // 30
```

### 프로퍼티 추가

프로퍼티 추가도 `.`으로 접근하여 값을 할당하는 것으로 가능하다.

```js
user.isAdmin = true; // {name: 'John', age: 30, isAdmin: true}
```

### 프로퍼티 삭제

`delete`를 이용해 프로퍼티를 삭제 할 수 있다.

```js
delete user.age; // {name: 'John', isAdmin: true}
```

### 여러 단어 프로퍼티명

프로퍼티 명은 여러 단어를 사용할 수 있지만 따옴표로 묶어줘야 한다.

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // multiword property name must be quoted
};
```

### 콤마

프로퍼티는 콤마`(,)`로 구분을 하는데 마지막 프로퍼티에도 콤마를 넣어도 기능에는 문제가 없다.

```js
let user = {
  name: "John",
  age: 30, // 마지막 프로퍼티이지만 콤마를 넣어도 무방
}
```

### 대괄호([]) 이용한 프로퍼티 접근, 추가, 삭제  

`.`으로 프로퍼티를 접근, 추가, 삭제할 수도 있지만 여러단어로 된 프로퍼티명인 경우 그렇게 접근이 불가하다.

```js
user.likes birds; // Uncaught SyntaxError: Unexpected identifier
user."likes birds"; // Uncaught SyntaxError: Unexpected identifier
```

자바스크립트는 공백이나 `$`와 `_` 제외한 특수기호로 시작하는 프로퍼티명은 인식하지 못한다. 이런 경우 대괄호`([])`를 이용한다.

```
오브젝트명["프로퍼티명"];
```

```js
user["likes birds"]; // 프로퍼티 접근
user["likes birds"] = true; // 프로퍼티 추가
delete user["likes birds"]; // 프로퍼티 삭제
```

아래와 같이 사용자에 의해 프로퍼티명이 입력된다고 해보자. 대괄호 안은 프로퍼티명을 문자열로 받은 후 해당 프로퍼티를 찾도록 되어 있어 원하는 결과를 얻을 수 있다.
하지만 `.`은 프로퍼티명이 바로 오게 되어 있으므로 `key1`에 `name`이라는 프로퍼티명을 할당했더라도 자바스크립트가 프로퍼티명이 `key1`변수에 할당된 값이라는 것을 인식할 수 없다.

```js
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name") -> user["name"]으로 변환되어 접근


let key1 = "name";
alert( user.key1 ) // undefined -> 오브젝트 내 key1이라는 프로퍼티를 찾는데 선언되지 않았으므로 찾을 수 없다.
```

`.`으로 프로퍼티를 접근하는 것은 `[]`에 비해 편하지만 `[]`에 의한 접근은 자바스크립트 연산을 통해 좀더 복잡한 것도 가능하다.

```js
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // fruit 변수에 담긴 값이 프로퍼티명으로 연산되어 전환된다. ->  bag["apple"] 이것과 같은 결과와 같다.
};
//  bag[fruit] = 5;와 같이 표현할 수도 있다.

alert( bag.apple ); // 5 if fruit="apple"
alert( bag["apple"] );
```

할당된 프로퍼티명을 변경 할 수도 있다.

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

### 프로퍼티 줄임

프로퍼티명과 프로퍼티값을 의미하는 파라미터명 혹은 변수명이 같은 경우 줄여 쓸 수 있다.

```js
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

아래처럼

```js
function makeUser(name, age) {
  return {
    name,
    age,
    // ...other properties
  };
}
```

```js
let name = "Sam";
let user = {
  name, // name:name 혹은 name: "Sam"과 같은 의미
  age: 10,
}
```

### 프로퍼티명으로 예약어 사용 가능

예약어든 어떤 데이터 타입든 상관없이 프로퍼티명은 모두 문자열 혹은 심볼로 변환되므로 아래와 같은 상황이 가능하다.

```js
let obj = {
  for: 1,
  let: 2,
  return: 3,
  1: 4
};

alert( obj.for + obj.let + obj.return + obj[1] );  // 10
```

단, 숫자를 프로퍼티명으로 사용할수는 있지만 그것은 내부에서 문자열로 바뀌므로 `obj.1`로 접근은 불가능하고 `obj[1]` 또는 `obj['1']`로 가능하다.


### 프로퍼티 확인, in

`in`을 이용해 프로퍼티의 존재여부를 판단할 수 있다. 존재 여부는 `true/false`로 리턴받는다.  

```
"key" in object
```

```js
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
```

아래 예시에서 `test`라는 프로퍼티는 존재한다. 하지만 프로퍼티의 값이 `undefined`인지 프로퍼티가 없어서 `undefined`인지 구분할 수 없다.
하지만 `in`을 사용하면 프로퍼티가 있는지 확인할 수 있다.

```js
let obj = {
  test: undefined
};

alert( obj.test ); // undefined
alert( "test" in obj ); // true
```


### for...in 반복문

` for...in`  반복문으로 오브젝트의 모든 프로퍼티`(key)`를 탐색할 수 있다.

```
for (key in object) {
  ...
}
```

`for`문을 돌면서 `let key` 변수를 생성하여 `user`의 프로퍼티를 담는다. `key`는 변수명이므로 어떤 것으로든 바꿀 수 있다.
`for(let prop in obj)`로 많이 쓰인다.

```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
```

### 오브젝트 내 순서

프로퍼티명이 숫자로 변환이 되는 문자열이라면 숫자 순서대로 정렬이 되고 그 외는 추가된 순서에따라 정렬이 된다.  
이런 특성을 이용해서 추가된 순서로 정렬을 원하다면 `+49`, `+48`과 같이 문자열로 만들어 쓰는 꼼수를 쓸 수도 있다.  
물론 반대로 숫자의 특성을 이용한 정렬을 이용할 수도 있다.

```js
let codes = {
  "z": "zzz",
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA",
  "a": "aaa",
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49, z, a
}
```

## 요약

- 오브젝트는 `키:값`의 쌍으로 이루어진 배열이다.
- 프로퍼티 키는 문자열 혹은 심볼
- 프로퍼티 값은 어떤 타입이든 가능
- 프로퍼티 접근은 `obj.property`과 `obj["property"]` 혹은 `obj[키를 담은 변수]`로 가능하다.
- 프로퍼티 삭제는 `delete obj.prop`
- 프로퍼티 존재여부는 `"key" in obj`
- 프로퍼티 반복은 `for(let prop in obj)`
- 오브젝트 종류: `Object(plain object), Array, Date, Error` 등
