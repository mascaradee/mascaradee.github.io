---
layout: post
date: 2022-05-10 13:46:00 +0900
title: '[javascript] 생성자와 new 연산자, Constructor and new operator'
categories:
  - javascript
tags:
  - constructor
  - new
---

* Kramdown table of contents
{:toc .toc}

## 참고

[생성자](https://javascript.info/constructor-new)

## 생성자 함수 Constructor function

생성자 함수는 일반 함수와 같다. 다만 구분을 위한 관례가 있다.

- 첫자는 대문자로 시작한다.
- 실행될 때 `new` 연산자와 함께 사용한다.

```js
function User(name) {
  // this = {} 생략
  this.name = name;
  this.isAdmin = false;
  // return this; 생략
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false
```

`new`연산자로 함수가 실행될 때 다음 단계로 진행된다.

1. 비어있는 오브젝트가 생성되고 `this`에 할당된다.
2. 함수 바디가 실행이 되고, 보통은 `this`가 수정되고 새로운 프로퍼티가 추가된다.
3. `this`가 **리턴**된다. (새롭게 만들어진 오브젝트가 리턴)

일반 함수라면 1, 3은 직접 명시를 해야하지만 생성자 함수는 내부에서 처리된다.

즉, `let user = new User("Jack");`는 아래와 같은 의미이다.

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

같은 구조의 오브젝트를 만들기 위해서 오브젝트 리터럴`({...})`을 매번 사용해 정의하는 것보다 `new User('Ann')`, `new User('masc')` 과 같이 생성자 함수를 이용하면 쉽고 간편하게 오브젝트를 생성할 수 있다.  
재사용을 위한 오브젝트 생성코드를 구현하는 것이 생성자 함수의 주요 목적이다.   

화살표함수를 제외한 모든 함수는 `new`와 함께 사용하면 위 알고리즘에 의해 생성자로 사용할 수 있다. 일반 함수와의 구분을 위해 함수명이 대문자로 시작한다는 것을 잊지 말자.  

아래처럼 생성자 함수 바디가 복잡하지만 딱 한 번만 쓸 예정이라면 `new function(){}` 형태로 쓸 수도 있다.  
이럴거면 `new` 없이 일반 함수로 사용하면 되지 않나라는 의문이 들었는데 생성자함수로 오브젝트를 구성하는 코드를 캡슐화하기 위한 목적이란다.  

```js
// create a function and immediately call it with new
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};
```

## 생성자 모드 테스트 new.target

이 부분은 거의 사용되지는 않는 부가적인 정보로 가볍게 알고 넘어가면 된다.  

일반함수 호출인지, 생성자함수 호출인지를 구분할수 있다. 일반함수 호출일때는 `undefined`를 리턴하고 생성자함수 호출일때는 해당 함수를 그대로 리턴해 준다.   

```js
function User() {
  alert(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }
```

생성자 함수로 호출해야 하는데 일반 함수로 실행을 했을 경우 내부에서 생성자함수처럼 변경해서 처리해 주는 상황에 사용할 수 있다. 하지만 이건 비추, 명확하게 `new`를 사용해 새로운 오브젝트를 만드는 것을 권장.  

```js
function User(name) {
  if (!new.target) { // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John
```

## 생성자 함수 내 return문

생성자 함수는 암묵적으로 `this`를 리턴하므로 `return`문을 별도로 명시할 필요가 없다. 하지만 명시를 할 경우 아래 규칙에 따른다.

- `this`가 아닌 별도 오브젝트를 리턴하는 경우, `this`대신 명시한 오브젝트가 리턴된다.
-  원시타입과 리턴하거나 `return`만 쓴 경우는 원래대로 그냥 `this`가 리턴된다.

```js
function BigUser() {
  this.name = "John";
  return { name: "Godzilla" };  // this 대신 { name: "Godzilla" } 새롭게 만들어진 이 오브젝트가 리턴된다.
}
alert( new BigUser().name );  // Godzilla, got that object


function SmallUser() {
  this.name = "John";
  return; // <-- returns this : return;만 쓰든, return 1;과 같이 원시타입과 같이 쓰든 결과는 `this`가 리턴된다.
}
alert( new SmallUser().name );  // John
```

## 생성자의 메서드

생성자 함수의 파라미터를 가지고 `this`에 프로퍼티뿐만 아니라 메서드도 추가할 수 있다. 좀 더 복잡한 로직은 `class`를 이용할 수 있다.  

```js
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

let john = new User("John");

john.sayHi(); // My name is: John

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

## 요약

- 생성자 함수 간단히 생성자는 일반함수이지만 일반함수와의 구분을 위해 함수명의 첫자를 대문자로 시작한다.
- 생성자 함수는 `new`를 이용해 호출되고 그것은 `this`라는 비어있는 오브젝트를 만들고 프로퍼티와 메서드 등이 채워진 채로 리턴된다.
- 생성자 함수는 비슷한 구조의 오브젝트의 생성을 쉽고 빠르게 하기 위함이다.
- 자바스크립트는 내장 생성 함수를 가지고 있다. `e.g. Date, Set`
