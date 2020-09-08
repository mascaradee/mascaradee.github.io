---
layout: post
date: 2020-09-07 22:00:00 +0900
title: '[javascript] constructor function'
categories:
  - javascript
tags:
  - constructor function
---

## 생성자 함수

인스턴스를 생성하는 함수  
생성자 함수의 `prototype` 프로퍼티는 앞으로 만들 인스턴스의 조상이 될 프로토타입을 가리킨다.  
관례상 일반함수와 구분하기 위해 함수명을 대문자로 시작, 명사형으로 만든다.  

`new 생성자_함수명()`

```js
function Me(){
  this.age = 39;
  this.eat = function(food){
    console.log('eat ', food);
  }
}

let me = new Me(); // {age: 39, eat: ƒ}
me.age; // 39
me.eat('kiwi'); // eat kiwi
```

생성자 함수를 일반 함수로써 호출하면 인스턴스를 생성하지 않고 `return`문에 의한 반환값이나 `undefined`를 반환한다.

```js
function Me(){
  this.age = 39;
  this.eat = function(food){
    console.log('eat ', food);
  }
  return 1;
}

let notMe = Me(); // 1
```

실제 `Object()` 함수는 아래와 같은 형태인데, 여기서 `this`는 `Object()` 생성자 함수가 생성한 새 인스턴스를 의미한다.  

```js
function Object() {
  if (!(this instanceof Object)) { // this가 Object로부터 생성된 인스턴스가 아니면
    return new Object(); // Object 생성자 함수로 새 인스턴스를 생성하고 반환해라.
  }
  ...
}
```

생성자 함수를 만들 때 위 조건문을 넣으면 생성자 함수로써 호출하지 않더라도 자동으로 인스턴스를 생성해서 반환한다.  
즉, 생성자 함수로 호출된 함수의 `this`는 함수의 소유자가 아니라 앞으로 반환할 새 인스턴스를 의미한다.  
일반 함수로 호출된 함수의 `this`는 함수를 소유한 (브라우저라면 최상위 객체인 window) 객체가 된다.  

```js
function Me(){
  if (!(this instanceof Me)) {
    return new Me();
  }
  this.age = 39;
  this.eat = function(food){
    console.log('eat ', food);
  }
}

let meme = Me(); // {age: 39, eat: ƒ}
```

`this`는 새 인스턴스를 가리키며 생성자 함수가 호출된만큼 새로 생성된다. 위의 `eat()`처럼 생성자 함수 내에서 `this`의 프로퍼티로 함수를 정의하면, 매 인스턴스가 생성될 때마다 `eat()` 함수가 새로 만들어지는 셈이 된다.  
이 경우 메모리의 낭비를 초래하므로 어차피 재정의될 일 없는 프로퍼티라면 인스턴스의 프로퍼티보다 프로토타입의 프로퍼티로 정의하는 것이 낫다.

```js
function Me(){
  if (!(this instanceof Me)) {
    return new Me();
  }
  this.age = 39; // 변할수 있는 값
}

Me.prototype.eat = function(food) { // function은 잘 변경하지 않으므로 프로토타입에 넣어 메모리 낭비 방지
	console.log('eat', food);
};

let me = new Me();
```

이렇게 정의하면 `eat()`은 Me 프로토타입에 딱 한 번만 정의되며, `Me()`에 의해 생성된 인스턴스는 이를 상속받는다.

### 프로토타입 체인

인스턴스의 프로퍼티에 접근할 때, 인스턴스에 없는 프로퍼티라면 부모(=프로토타입)에 있는 프로퍼티인지를 자동으로 탐색하는데, 이것이 프로토타입 체인이다.

```js
me.eat('apple'); // "eat apple"
// 위 결과가 가능한 이유는, me에 eat()은 없지만 프로토타입 체인으로 부모가 갖고 있는 eat()을 찾아 실행했기 때문이다.
```
