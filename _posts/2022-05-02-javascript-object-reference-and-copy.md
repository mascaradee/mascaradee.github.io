---
layout: post
date: 2022-05-02 16:10:00 +0900
title: '[javascript] 오브젝트 참조와 복사 object reference and copy'
categories:
  - javascript
tags:
  - object
  - reference
---

* Kramdown table of contents
{:toc .toc}

## 참조

[오브젝트 참조와 복사](https://javascript.info/object-copy)
[deep cloning 라이브러리](https://lodash.com/docs#cloneDeep)


## 오브젝트 참조와 복사

오브젝트는 원시타입과는 달리 값 자체를 복사하는 것이 아닌 메모리상 어딘가에 존재하는 오브젝트의 위치 즉, 주소값을 복사한다.  
따라서 원시타입이 값 복사가 이루어지면 서로 다른 개체로 취급이 되지만 오브젝트는 또 다른 변수에 담아도 같은 주소를 복사하므로 동일 오브젝트를 의미한다.   
이것을 `참조(reference)`라고 표현한다.

```js
let greeting = 'hello';
console.log(greeting); // hello
let gt = greeting;
console.log(gt); // hello
gt = 'hi';
console.log(gt); // hi
console.log(greeting === gt); // false

let obj1 = {greeting: 'hello'};
let obj2 = obj1;
console.log(obj1 === obj2); // true;

obj2.greeting = 'hi';
console.log(obj1); // {greeting: 'hi'}
console.log(obj2); // {greeting: 'hi'}
console.log(obj1 === obj2) // true;
```

## 참조에 의한 비교

오브젝트 비교는 같은 주소값을 가진 오브젝트를 바라보는지 비교를 한다. 위 예시와 다르게 별도 초기화를 한 2개의 오브젝트의 참조는 같지 않다.

```js
let a = {};
let b = {}; // 동일하게 비어있는 오브젝트로 할당이 되었지만 할당에 의해 다른 오브젝트를 참조하게 된다.

console.log(a == b); // false
console.log(a === b); // false
```

## 오브젝트 복제(cloning), 병합(merging) Object.assign

참조 복사가 아닌 오브젝트 자체를 복제하여 동일한 구조와 프로퍼티를 가진 다른 개체로 사용할 수 있다. 하지만 참고로 이런 상황이 많이 발생하지는 않는다.   
새로운 오브젝트를 만들고 반복문을 통해 모든 프로퍼티를 복사한다. 아래 `user`와 `clone`은 구조와 프로퍼티 값은 같지만 다른 참조를 하는 별도 개체가 된다.

```js
let user = {
  name: "John",
  age: 30
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

좀 더 간편한 방법도 있다. `Object.assign` 내장함수를 이용한다.  

```
Object.assign(targetObject, [sourceObject1, sourceObject2, sourceObject3...])
```

- `targetObject`: 복사한 결과로 만들어지는 오브젝트로 리턴 대상.
- `sourceObject1 ~ N`: 복사할 대상으로 개수에 상관없이 반복문으로 모든 프로퍼티를 `targetObject`에 복사한다.  

```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2); // user = { name: "John", canView: true, canEdit: true }
```

만약 이미 같은 프로퍼티가 존재한다면 덮어쓰게 된다.

```js
let user = { name: "John" };
Object.assign(user, { name: "Pete" }); // user = { name: "Pete" }
```

그 외에서 스프레드 연산자에 의한 복제도 있다. 다만 브라우저별 지원현황은 체크하고 사용하길.

```js
let user = { name: "John" };
let clone = {...user}; // { name: "John" }
```


## 중첩 복제

오브젝트의 프로퍼티는 모든 타입을 가질 수 있으므로 원시타입뿐만 아니라 오브젝트도 될 수 있다.

```js
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
```

`user`를 `clone`오브젝트로 복제를 하게 되면 내부에 있는 `sizes`오브젝트는 어떻게 될까? 결론은 같은 오브젝트를 참조하게 된다.
`assign()`을 이용해서 복제하는 것을 "얕은 복제(shallow copy)"라고 하고 내부 오브젝트 프로퍼티까지 동일구조로 복제가 되지 않는 것을 의미한다.

```js
let clone = Object.assign({}, user);

console.log(clone.sizes == user.sizes); // true, 같은 오브젝트를 참조한다.
console.log(clone.sizes === user.sizes); // true, 같은 오브젝트를 참조한다.

user.sizes.width++;
console.log(clone.sizes.width); // 51, 같은 오브젝트를 참조하므로 변경된 값으로 도출
```

모든 프로퍼티 포함 별도 오브젝트로 복제를 하기 위해서 "깊은 복제(deep cloning)"를 해다 한다. `for`문을 이용해 키, 값을 하나씩 복사하거나 `_.cloneDeep(obj)`같은 이미 구현된 라이브러리를 사용해도 된다.


### 오브젝트 const 사용

보통 `const`를 이용해 변수를 만들면 수정이 불가하다.  
하지만 `const`를 이용해 오브젝트를 선언하면 내부 프로퍼티의 값은 변경이 가능하다.  
오브젝트는 주소값을 참조하기 때문에 `const`를 이용하면 해당 주소값을 변경할 수 없다는 것을 의미하고 같은 오브젝트만 참조할 수 있다.

```js
const user = {
  name: "John"
};

user.name = "Pete";

alert(user.name); // Pete, 오류없이 프로퍼티의 값이 변경된다.

user = {}; // Uncaught TypeError: Assignment to constant variable. 재할당은 불가, 같은 오브젝트만 참조할 수 있다.
```
