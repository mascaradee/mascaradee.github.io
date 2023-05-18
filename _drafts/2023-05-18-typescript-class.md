---
layout: post
date: 2023-05-18 09:05:00 +0900
title: '[typescript] class'
categories:
  - typescript
tags:
  - class
---

* Kramdown table of contents
{:toc .toc}

# 클래스

생성자, 메서드, 접근제어자, 프로퍼티로 구성되어 있다.   

```
class 클래스명 {
    constructor (
        접근제어자 프로퍼티명:데이터타입
    ) {}
    메서드명() {}
}
```


클래스 contstructor를 생성하면 타입스크립는 자동으로 `this.firstNme = firstName`을 생성해준다.  

실제 소스   

```ts
class Player {
    constructor (
        private firstName:string,
        private lastName:string,
        public nickName:string
    ) {}
}
```

컴파일 결과  

```js
"use strict";
class Player {
    constructor(firstName, lastName, nickName) {
        this.firstName = firstName; // 타입스크립트에 의해 자동 생성
        this.lastName = lastName;
        this.nickName = nickName;
    }
}
```

## privte public

클래스의 private은 클래스 내에서만 접근 가능하여 상속받은 클래스나 외부에서 접근이 불가능하다. public은 모든 곳에서 접근이 가능하다.

```ts
class Player {
    constructor (
        private firstName:string,
        private lastName:string,
        public nickName:string
    ) {}
}

const mignon = new Player('mignon', 'whale', 'mignonwhale');
mignon.nickName // OK
mignon.firstName // error: Property 'firstName' is private and only accessible within class 'Player'.
````


## abstract extends

추상클래스는 일반클래스에서 상속을 받아 구현체를 만들면 추상클래스 내부에 접근이 가능하다. 물론 접근제어자 기준에 따라서 접근이 가능하다.

```ts
abstract class User {
    constructor (
        private firstName:string,
        private lastName:string,
        public nickName:string
    ) {}
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

class Player extends User {
    
}

const mignon = new Player('mignon', 'whale', 'mignonwhale');
mignon.nickName // 프로퍼티 OK
mignon.getFullName() // 메서드 OK
```


## proteced

추상클래스 내의 추상메서드는 call signature만 가지고 있고 상속받은 클래스에서 구현체를 만들어야 한다.

```ts
abstract class User {
    constructor (
        private id:string
    ) {}
    abstract getId():void // 추상메서드
}

class Player extends User {} // error: 추상메서드를 상속받기 위해서는 구현체가 필요하다.

const mignon = new Player('mignonwhale');
mignon.id // error: private 프로퍼티이므로 접근 불가능
```

구현체를 만들어도 여전히 `User.id`는 `private`이므로 접근이 불가능하다.  

```ts
abstract class User {
    constructor (
       private id:string
    ) {}
    abstract getId():void
}

class Player extends User { 
    getId(){
      console.log(this.id) // error: private 프로퍼티이므로 접근 불가능
    }
}

const mignon = new Player('mignonwhale');
mignon.id // error: private 프로퍼티이므로 접근 불가능
```

외부에서는 접근을 막지만 상속을 받은 서브클래스에서는 접근이 가능하도록 하기 위해서는 `private` 대신 `protected`를 사용하면 된다.   

```ts
abstract class User {
    constructor (
       protected id:string // 상속클래스에서는 접근 가능
    ) {}
    abstract getId():void
}

class Player extends User { 
    getId(){
      console.log(this.id)
    }
}

const mignon = new Player('mignonwhale');
mignon.id // error: protected 프로퍼티이므로 접근 불가능
```




