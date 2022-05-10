---
layout: post
date: 2022-05-09 13:43:00 +0900
title: '[javascript] 오브젝트 this 메서드, object this method'
categories:
  - javascript
tags:
  - method
  - this
---

* Kramdown table of contents
{:toc .toc}

## 참조

[this](https://javascript.info/object-methods)


## 메서드란?

오브젝트의 프로퍼티 중 하나로 함수를 사용할 수 있는데 이것을 특별히 **메서드**라고 칭한다.
아래 예시에서 `user`오브젝트는 `sayHi`함수를 메서드로 추가한다.

```js
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() { // 함수표현식
  alert("Hello!");
};

user.sayHi(); // Hello!
```

함수는 물론 별도 선언 후 할당을 할 수도 있다. 어떤 방식을 쓰든 같은 의미이다.

```js
function sayHi() { // 함수 선언
  alert("Hello!");
};
user.sayHi = sayHi; // 함수 할당
```

### 메서드 표현법

오브젝트 프로퍼티로써 메서드는 짧게 표현할 수 있다.
객체상속에 대한 약간의 차이가 있긴 하지만(이건 나중에) 아래 2개 표현은 동일한 동작을 하고 대부분은 더 짧은 표현을 많이 쓴다.

```js
// 메서드 표현 1
user = {
  sayHi: function() {
    alert("Hello");
  }
};
```

```js
// 메서드 표현 2
user = {
  sayHi() {
    alert("Hello");
  }
};
```

## 메서드 내 this

오브젝트 메서드는 오브젝트 내 정보에 접근이 가능해야만 한다. 당연하게도 메서드는 "어떤 행동"을 하도록 정의되어 있는 것이고 "어떤"에 대한 정보를 알아야 하기 때문일테니까...
메서드내에서 오브젝트 프로퍼티를 접근할 때 `this` 키워드를 사용한다.

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    alert(this.name); // this는 user 오브젝트를 의미한다.
  }
};

user.sayHi(); // John
```

기술적으로 `this` 대신 `user`를 넣을 수는 있지만 해당 오브젝트가 다른 곳으로 복사가 되어 값이 바뀌어 버리면 원래 의도했던 값이 나오지 않는 경우가 발생할 수 있다.

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // this.name 대신 user.name으로 써도 오류가 나진 않는다.
  }
};

let admin = user;
user = null;

admin.sayHi(); // TypeError: Cannot read property 'name' of null -> user와 admin은 같은 오브젝트를 참조하고 user의 값이 null로 변경된것은 admin에도 동일한 영향을 미친다.

```

## 자바스크립트 this는 제약이 없다.

자바스크립트에서 `this`키워드에는 제약이 없다. 다른 언어와는 달리 오브젝트 메서드만이 아니라 어떤 함수에서도 사용할 수 있다.   
함수호출 시 자바스크립트 엔진이 메서드의 선언 위치와 관계 없이 알아서 **점(.) 앞의 오브젝트**를 `this`에 매칭해 준다.  
이것은 함수를 재사용할수 있다는 장점이 있지만 더 많은 실수를 만들 수 있다는 단점이 있다.  

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 같은 함수를 다른 오브젝트에 사용
user.f = sayHi;
admin.f = sayHi;

user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
```

심지어 오브젝트 없이도 함수를 호출할수 있다. 이때 `this`는 브라우저의 `window`오브젝트로 이것은 전역오브젝트(`global object`)라고 한다.  
물론 이것은 엄격모드가 아닌 경우에 한해서이고 엄밀히 말해 이것은 프로그램 오류이다.

```js

function sayHi() {
  alert( this.name );  // [object Window]
}

sayHi(); // undefined
```

## 화살표함수는 this가 없다.

화살표함수는 자체적인 `this`를 가지지 않고 바깥 함수의 오브젝트를 사용한다.  
아래 예시에서 `arrow`함수 내 `this`는 `arrow`함수를 감싸고 있는 `sayHi`함수의 `this`인 `user`을 의미한다.

```js
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya

let a = () => alert(this.firstName);
user.f = a;
user.f(); // undefined
```

## 요약

- 오브젝트 프로퍼티로써의 함수는 메서드라고 부른다.  
- 메서드는 `오브젝트.메서드()`를 할 수 있다.
- 메서드는 `this`로 오브젝트를 참조할 수 있다.  


**`this`의 값은 런타임 시에 정의된다.**

- 함수가 선언될때 `this`키워드를 사용할 수 있지만 실제 값을 가지는 건 함수가 호출될 때
- 함수를 여러 오브젝트에 복사될 수 있다.
- `object.method()`처럼 메서드 문법을 사용해서 함수가 호출될 동안에 `this`의 값은 해당 오브젝트이다.
- 화살표 함수는 `this`를 가지지 않지만 바깥함수의 `this`는 사용할 수 있다.
