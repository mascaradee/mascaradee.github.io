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
객체를 정의하는 순간 시스템에 의해 `Object.prototype`을 복제하여 어딘가에 새로운 객체의 프로토타입이 만들어진다.

```js
function Newbie() {}
```

해당 프로토타입은 앞으로 `Newbie`가 생성할 객체를 만들 원형이다. `Newbie.prototype`으로 접근이 가능하다.   
다시 한번 강조하자면, `Newbie.prototype`은 Newbie 객체를 만들어낸 원형을 의미하는것이 아닌 `Newbie`가 생성할 객체의 원형에 접근하는 방법이다.  

```js
console.log(Newbie.prototype);
/*
{constructor: ƒ} // 생성자함수
> constructor: ƒ Newbie()
> __proto__: Object // Newbie의 부모는 Object.prototype
*/
```

해당 프로토타입의 생성자함수는 `Newbie.prototype.constructor`로 접근이 가능한다.  
이것은 `Newbie` 프로타입을 만든 생성자라는 의미가 아닌  
시스템에 의해 새로 만들어진 프로토타입이 어떤 생성자함수와 연결되는지를 알수 있는 연결고리 같은 느낌.  

```js
console.log(Newbie.prototype.contructor == Newbie); // true
```

`Newbie()` 생성자함수로 인스턴스 `noob`을 생성할수 있는데 이것은 곧 `Newbie.prototype`을 이용해 `noob`객체를 생성하는 것이다.    
`noob`객체의 원형, 즉 부모 프로토타입은 `noob.__proto__`를 통해 접근할수 있다.
`noob.__proto__`는 `Newbie.prototype`과 같은 것을 가리킨다.
그리고 `noob`을 만든 생성자함수는 `noob.constructor`로 알수 있다.

```js
var noob = new Newbie();
console.log(noob.__proto__ == Newbie.prototype); // true
console.log(noob.constructor == Newbie); // true
```

## 프로토타입 체인
프로토타입이란 말 그대로 인스턴스의 원형, 즉 조상을 말한다.  
noob의 조상은 Newbie 프로토타입이며, Newbie 프로토타입의 조상은 Object 프로토타입이다.  
프로토타입은 이런 상속관계를 거슬러 올라 프로퍼티를 찾는 방식을 말한다.  

toString()은 Object 프로토타입에 있는 메서드다.
noob을 통해 접근하려고 하는 순간, noob에 해당 메서드가 없으니 Newbie 프로토타입에서 찾으며,  
여기에도 없으니 Object 프로토타입까지 올라가서 찾는다.

```js
noob.toString(); // "[object Object]"
```

위의 경우는 읽기에 해당하며, 쓰기의 경우엔 조상을 탐색하지 않고 언급된 객체에 직접 쓴다. (없으면 만들어서라도)

```js
noob.toString = function() { console.log(123); }
noob.toString(); // 123
noob.__proto__.toString(); // "[object Object]" - 조상에는 직접 쓴 함수가 존재하지 않는다.
```
