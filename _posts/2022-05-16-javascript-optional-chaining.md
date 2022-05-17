---
layout: post
date: 2022-05-16 13:37:00 +0900
title: '[javascript] optional chaining'
categories:
  - javascript
tags:
  - optional-chaining
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Optional chaining '?.'](https://javascript.info/optional-chaining)

## Optional chaining '?.'

오브젝트의 정의되지 않은 프로퍼티에 접근하려고 할 때 에러가 아니라 `null` 혹은 `undefined`를 결과로 얻고 싶을 때 사용한다.  
삼항연산자나 `&&`로도 같은 기능을 할 수 있으나 코드가 중복(` user.address`)이 된다는 단점이 있다. 상황에 맞게 적절히 사용해야 할 듯.  
단, 실제 에러로 응답을 받아야 하는 상황에까지 `?.`을 사용해서는 안된다.

```js
let user = {}; // user has no address

// 아래 예시는 user.address가 계속 중복된다.
alert( user.address ? user.address.street ? user.address.street.name : null : null );

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

### '?.' 사용법

`value?.prop`

`?.`의 직전값이 `null` 혹은 `undefined`이면 `undefined`를 리턴한다.  
오브젝트의 프로퍼티 접근법 중 하나인 `.`(여기서는 `user.address`)와 동일하게 작동하지만 `null`과 `undefined`를 먼저 체크하여 결과를 리턴한다는 것이 차이다.  

```js
let user = {};
console.log(user?.address?.street); // undefined

let user = {
  address: {
    street: 21
  }
};

console.log(user?.address?.street); // 21, 프로퍼티가 모두 존재하면, user.address.street와 동일하게 작동한다.
```

`?.`의 직전값에만 해당 기능이 작동하므로 `user`에 대해서만 `null, undefined` 를 체크한다. 그 이후는 모두 `.`으로만 접근하므로 에러.

```js
let user = {}
user?.user.address.street; // Uncaught TypeError: Cannot read properties of undefined (reading 'address')
```


### 함수의 `?.` 사용법

함수 역시 오브젝트의 프로퍼티이므로 당연히 사용 가능하다.

```js
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)
```

### 배열의 `?.` 사용법

```js
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

### `?.`를 이용한 삭제

```js

let user = {}
delete user?.name; // delete user.name if user exists

delete user.address.street // Uncaught TypeError: Cannot convert undefined or null to object
```

### `?.`를 이용한 쓰기는 안된다.

`?.`는 읽기와 삭제는 가능하지만 쓰기는 안된다.

```js
let user = null;

user?.name = "John"; // Uncaught SyntaxError: Invalid left-hand side in assignment
                    // because it evaluates to: undefined = "John"
```

## 요약

- `obj?.prop`: `obj`가 존재하면 `obj.prop` 아니면 `undefined` 리턴
- `obj?.[prop]`: `obj`가 존재하면 `obj[prop]` 아니면 `undefined` 리턴
- `obj.method?.()`: `obj.method`가 존재하면 `obj.method()` 호출 아니면 `undefined` 리턴
