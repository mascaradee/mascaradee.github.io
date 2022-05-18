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

`Symbol()`을 이용해서 심볼타입을 생성할 수 있다. `()`안에 `key`는 심볼의 이름이라고 생각하면 된다.

`Symbol(key)`

심볼은 유일한 식별자로 이름이 같다고 해도 실제로는 다른 심볼을 가리킨다.

```js
let id1 = Symbol('id');
let id2 = Symbol('id');

console.log(id1 === id2); // false
```

### 심볼 접근

`alert()`은 데이터타입에 상관없이 인자의 타입을 문자열로 자동으로 바꾸는데 심볼은 문자열로 자동 변환이 되지 않아 에러가 난다. `toString()`를 이용하면 심볼도 문자열로 변경할 수 있다.

```js
let id = Symbol('id');
alert(id); // Uncaught TypeError: Cannot convert a Symbol value to a string
alert(id.toString()); // Symbol(id)
```
심볼의 이름을 출력하고 싶다면 아래와 같이 하면 된다.

```js
alert(id.description); // 'id'
```

### 심볼프로퍼티 접근 및 수정

`obj[key]`로 오브젝트의 심볼프로퍼티에 접근과 수정이 가능하다.  

```js
let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 1; // user에 심볼프로퍼티 id를 추가하면서 값을 1로 변경했다. {name: 'John', Symbol(id): 1}
// user[Symbol('id')] = 1과도 같은 의미

alert( user[id] ); // 1,  we can access the data using the symbol as the key
```

## 숨겨진 프로퍼티

심볼을 이용하면 숨겨진 프로퍼티를 만들 수 있어 실수로 접근하여 덮어쓰지 못하게 방지 할 수 있다.  
심볼은 유일한 것으로 같은 이름의 심볼에 다른 값을 세팅 할 경우 값이 덮어 씌워지지 않고 새로운 심볼 프로퍼티가 추가된다.

```js
let user = {};
let id = Symbol('id');
user[id] = 'symbol value';
console.log(user); // {Symbol(id): 'symbol value'}

let id = Symbol('id');
user[id] = 'different symbol value'; // {Symbol(id): 'symbol value', Symbol(id): 'different symbol value'} -> 다른 심볼 프로퍼티가 추가 생성
```

문자열 프로퍼티의 경우 같은 프로퍼티에 다른 값을 또 세팅하면 값이 덮어씌워져 마지막 세팅한 값만 남게 된다.

```js
let user = {};
user.id = '1st id value';
console.log(user); // {id: '1st id value'}
user.id = 'different value';
console.log(user); // {id: 'different value'}
```

### 오브젝트 리터럴의 심볼

오브젝트 리터럴에서 심볼을 프로퍼티로 사용하려면 아래와 같이 `[]`를 이용하면 된다.

```js
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123, // 심볼 프로퍼티
  id: 123 // 문자열 프로퍼티
};
// {name: 'John', id: 123, Symbol(id): 123}
```

### for...in의 심볼 프로퍼티

심볼프로퍼티는  `for...in`으로 도출되지  않는다.

```js
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key); // name, age (no symbols) -> 심볼을 나타나지 않는다.

alert( "Direct: " + user[id] ); // 123 -> 하지만 프로퍼티로는 존재한다.
```

`Object.keys(user)`로도 역시 심볼은 노출되지 않는다. 이 특성을 이용해 외부에 노출하고 싶지 않는 프로퍼티는 심볼로 정의할 수 있다.  
하지만 오브젝트 복제는 모든 프로퍼티를 복제하여 같은 구조로 만들므로 심볼 프로퍼티도 함께 구성된다.

```js
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

## 전역 심볼 Global Symbol

기본적으로 심볼은 이름이 같더라도 다른 개체이다. 하지만 전역 심볼로 동일 이름으로 동일 개체를 가리킬 수 있다.

### 전역 심볼 찾기

전역심볼은 `Symbol.for(key)`로 접근할 수 있다.

```js
let id = Symbol.for("id"); // 전역 레지스트리에서 id라는 이름의 심볼을 찾고 없으면 생성한다.

let idAgain = Symbol.for("id"); // 전역 레지스트리에서 id라는 이름의 심볼을 찾는다. 위에서 이미 생성했으니 같은 개체를 리턴한다.

alert( id === idAgain ); // true
```

### 전역 심볼 이름 찾기

`Symbol.keyFor(symbol)`은 전역심볼로 전역심볼의 이름(`key`)을 찾을 수 있다. 단, 전역이 아닌 심볼의 이름은 찾을 수 없다.

```js
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id

let localSym = Symbol('id');
alert(Symbol.keyFor(localSym)); // undefined
alert(localSym.description); // id -> 전역심볼이 아닌 경우 이름을 찾는 방법
```

## 시스템 심볼 System symbol

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`

## 요약

- 심볼은 유일한 식별자를 위한 원시데이터타입이다. 기본적으로 이름이 같아도 다른 개체다.
- 심볼 생성: `Symbol([key])`
- 전역 심볼 생성: `Symbol.for(key)`
- 심볼 사용 케이스
  - 숨겨진 프로퍼티:  `for...in`으로 도출 되지 않고 실수로 접근하거나 수정할 수 없다.
  - 시스템 심볼: 내장된 기능을 제공?
- 심볼은 100% 숨겨지진 않는다. `Object.getOwnPropertySymbols(obj)`로 모든 심블을 찾아낼 수 있거나
`Reflect.ownKeys(obj)`로 심볼을 포함해 오브젝트가 가지고 있는 모든 key를 찾을 수 있다.
