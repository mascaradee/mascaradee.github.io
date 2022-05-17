---
layout: post
date: 2022-05-17 11:02:00 +0900
title: '[javascript] symbol'
categories:
  - javascript
tags:
  - symbol
---

* Kramdown table of contents
{:toc .toc}

## 참고

[심볼](https://javascript.info/symbol)


## 심볼 symbol

오브젝트의 키로 사용할 수 있는 데이터 타입은 문자열과 심볼이 있다. 간혹 다른 타입이 키로 쓰이는 것처럼 보이기도 하지만 모두 문자열로 자동 형변환이 되기 때문이다.

- `obj[1]`는 `obj["1"]`로
- `obj[true]`는 `obj["true"]`로

하지만 심볼타입은 문자열로 자동 형변환 되지 않는다.


### 심볼 생성

`Symbol()`을 이용해서 심볼타입을 생성할 수 있다. `()`안에 `description`은 심볼의 이름이라고 생각하면 된다.

`Symbol(description)`

심볼은 유일한 식별자로 이름이 같다고 해도 실제로는 다른 심볼을 가리킨다.

```js
let id1 = Symbol('id');
let id2 = Symbol('id');

console.log(id1 === id2); // false
```

### 심볼 접근

`alert()`은 데이터타입에 상관없이 인자의 타입을 문자열로 바꾸는데 심볼은 문자열로 바꿀 수 없어 에러가 난다. `toString()`를 이용해 심볼을 문자열로 변경할 수 있다.

```js
let id = Symbol('id');
alert(id); // Uncaught TypeError: Cannot convert a Symbol value to a string
alert(id.toString()); // Symbol(id)
```
심볼의 이름을 출력하고 싶다면 아래와 같이 하면 된다.

```js
alert(id.description); // 'id'
```

## 심볼의 용도

### 심볼프로퍼티 접근 및 수정

`obj[키]`로 오브젝트의 심볼프로퍼티에 접근과 수정이 가능하다.  

```js
let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 1; // user에 심볼프로퍼티 id를 추가하면서 값을 1로 변경했다. {name: 'John', Symbol(id): 1}

alert( user[id] ); // 1,  we can access the data using the symbol as the key
```

### 숨겨진 프로퍼티

심볼을 이용하면 숨겨진 프로퍼티를 만들 수 있어 실수로 접근하여 덮어쓰지 못하게 방지 할 수 있다.  
심볼은 유일한 것으로 같은 이름의 심볼에 다른 값을 세팅 할 경우 값이 덮어씌워지지 않고 새로운 심볼 프로퍼티가 추가된다.

```js
let user = {};
let id = Symbol('id');
user[id] = 'symbol value';
console.log(user); // {Symbol(id): 'symbol value'}

let id = Symbol('id');
user[id] = 'different symbol value'; // {Symbol(id): 'symbol value', Symbol(id): 'different symbol value'} -> 다른 심볼 프로퍼티가 추가 생성
```

문자열 타입의 프로퍼티의 경우 같은 프로퍼티에 다른 값을 또 세팅하면 값이 덮어씌워져 마지막 세팅한 값만 남게 된다.

```js
let user = {};
user.id = '1st id value';
console.log(user); // {id: '1st id value'}
user.id = 'different value';
console.log(user); // {id: 'different value'}
```

### 오브젝트 리터럴의 심볼
