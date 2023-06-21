---
layout: post
date: 2020-09-14 22:00:00 +0900
title: '[javascript] prototype'
categories:
 - javascript
tags:
  - prototype
  - prototype chain
---

* Kramdown table of contents
{:toc .toc}

## 참고
[https://noritersand.github.io/javascript/javascript-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-prototype/](https://noritersand.github.io/javascript/javascript-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-prototype/)

## 프로토타입
클래스의 생성자로 객체를 생성하는 자바와는 달리 자바스크립트는 프로토타입을 이용해 객체를 생성한다.  
객체를 정의하는 순간 자바스크립트에 의해 `Object.prototype`을 복제하여 어딘가에 새로운 객체의 프로토타입이 만들어진다.

```js
function Mom() {
  this.name = '엄마';
  this.takeCare = function () {
    console.log('엄마는 나를 돌봐줘');
  }
}
```

`Mom`함수로 만들어질 객체는 `Mom`프로토타입을 바탕으로 만들어진다. 객체를 생성할 때, 프로토타입을 찾을 수 있는 정보가 같이 만들어지고 `Mom.prototype`으로 접근이 가능하다.


```js
console.log(Mom.prototype); // 자바스크립트가 어딘가에 만든 Mom의 프로토타입
/*
 {
  constructor: f Mom()
  [[Prototype]]: Object // Mom의 부모 프로토타입
 } 
 */
```

해당 프로토타입의 생성자함수는 `Mom.prototype.constructor`로 접근이 가능한다.  
이것은 `Mom` 프로토타입을 만든 생성자가 아니다. 새로 만들어질 객체의 프로토타입이 어떤 생성자함수와 연결되는지를 알수 있는 연결고리 같은 느낌.  

```js
console.log(Mom === Mom.prototype.constructor);// true
```

`Mom` 생성자함수로 인스턴스 `me`를 생성할수 있는데 이것은 곧 `Mom.prototype`을 이용해 `me`객체를 생성하는 것이다.     
`me`객체의 원형, 즉 부모 프로토타입은 `me.__proto__`를 통해 접근할수 있다.
`me.__proto__`는 `Mom.prototype`과 같은 것을 가리킨다.
그리고 `me`를 만든 생성자함수는 `me.constructor`로 알수 있다.

```js
let me = new Mom();
console.log(me.__proto__ == Mom.prototype); // true
console.log(me.constructor == Mom); // true
```

## 프로토타입 체인
프로토타입이란 말 그대로 인스턴스의 원형, 즉 조상을 말한다.  
`me`의 조상은 `Mom`프로토타입이며, `Mom`프로토타입의 조상은 `Object`프로토타입이다.  
프로토타입은 이런 상속관계를 거슬러 올라 프로퍼티를 찾는 방식을 말한다.  

`toString()`은 `Object` 프로토타입에 있는 메서드다.
`me`를 통해 접근하려고 하는 순간, `me`에 해당 메서드가 없으니 `Mom` 프로토타입에서 찾으며,  
여기에도 없으니 `Object` 프로토타입까지 올라가서 찾는다.

```js
me.toString(); // "[object Object]"
console.log(me instanceof Mom); // true
console.log(me instanceof Object); // true

Object.prototype.test = 'test'; // 최상위 조상의 프로토타입에 프로퍼티를 추가해도 프로토타입 체인으로 자식이 접근할 수 있다. 
console.log(me.test); // test
```
