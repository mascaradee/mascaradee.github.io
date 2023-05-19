---
layout: post
date: 2023-05-19 09:05:00 +0900
title: '[typescript] interfaces'
categories:
  - typescript
tags:
  - interfaces
---

* Kramdown table of contents
{:toc .toc}

# 인터페이스의 용도

- 자바스크립트에는 없고 타입스크립트에만 존재
- 객체나 클래스의 모양을 설명
- 데이터 타입의 하나로 사용 가능


추상클래스는 자바스크립트에도 있다
인터페이스로 추상클래스를 대체할 수 있다. 하지만 생성자를 만들어야 하는 단덤, 
장점은 여러 인터페이스 받을 수 있다. 

## 추상클래스 

`User` 추상클래스는 상속받은 `Player`서브클래스에 무엇을 구현해야 하는지를 알려준다. 청사진과도 같다. 

```ts
abstract class User {
  constructor(
    protected firstName: string,
    protected lastName: string
  ) { }
  abstract fullName(): string
  abstract sayHi(name: string): string
}

class Player extends User {
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  sayHi(name: string) {
    return `Hi, ${name}. My name is ${this.fullName()}`
  }
}
```

하지만 자바스크립트에는 추상클래스가 존재 하지 않아 일반 클래스로 컴파일이 되어버린다.  

```js
"use strict";
class User { // abstract 키워드가 없다.
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // 추상메서드 역시 없다.
}
class Player extends User {
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `Hi, ${name}. My name is ${this.fullName()}`;
    }
}
````

추상클래스의 용도처럼 사용할 수 있는 것이 인터페이스다. 

```ts
interface User {
  firstName: string,
  lastName: string,
  fullName(): string
  sayHi(name: string): string
}

class Player implements User { // error: 인터페이스의 프로퍼티와 메서드를 구현해야 한다.

}
```

추상클래스를 인터페이스로 변경하면 아래와 같다. 
- `interface`는 생성자가 없다. (따라서 인스턴스를 만들지 못한다.)
- `extends` 대신 `implements` 사용한다. 
- `extends`는 하나의 클래스만 상속할 수 있지만, `implements`는 여러 인터페이스를 상속받을 수 있다. 
- 서브클래스에 생성자가 필요하고 `public` 접근제어자만 사용할 수 있다. 
- 인터페이스에서 선언된 것은 서브클래스에서 모두 구현이 되어야 한다. 

```ts
interface User {
  firstName: string,
  lastName: string,
  fullName(): string
  sayHi(name: string): string
}

interface Human {
  health: number
}

class Player implements User, Human { // extends가 아닌 implements로 여러개 상속 가능
  constructor(
    public firstName: string, // public 외에는 불가, 인터페이스의 프로퍼티에는 접근제어자가 없기 때문
    public lastName: string,
    public health: number  
  ) {}
  fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
  sayHi(name: string): string {
    return `Hi, ${name}. My name is ${this.fullName()}`
  }
}
```

자바스크립트로 컴파일은 아래처럼 된다. 인터페이스는 컴파일 되지않는다. 파일의 용량을 줄일 수 있는 이점이라고도 할 수 있다. 

```js
"use strict";
class Player {
    constructor(firstName, lastName, health) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.health = health;
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `Hi, ${name}. My name is ${this.fullName()}`;
    }
}
```

### 인터페이스 데이터타입의 하나로 사용 할 수 있다. 

```ts
interface User {
  firstName: string,
  lastName: string,
  fullName(): string
  sayHi(name: string): string
}

function makeUser(user: User) {
    return 'hi'
 }
```