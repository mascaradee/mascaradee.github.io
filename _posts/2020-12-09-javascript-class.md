---
layout: post
date: 2020-12-08 17:00:00 +0900
title: '[javascript] class'
categories:
  - javascript
  - ES6
tags:
  - class
  - getter
  - setter
  - fields
  - static
  - inheritance
  - instanceof

---

- 참고  
[드림코딩 by 엘리](https://www.youtube.com/watch?v=_DLhUBWsRtw&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=6&t=2s)

## 클래스
- class : template
- object : instance of a class
- class는 ES6에 추가
- IE 미지원

## 클래스 선언

클래스는 새 인트턴스를 만들기 위한 일종의 틀을 의미한다.  

```js
class Person {
    // constructor
    constructor(name, age) {
        // fields
        this.name = name; //this는 이 클레스를 이용해 새로 생성할 인스턴스를 뜻함
        this.age = age;
    }
    // methods
    speak() {
        console.log(`${this.name}: hello!`);
    }
}

const macs = new Person('macs', 20);
console.log(macs.name); // macs
console.log(macs.age); // 20
macs.speak(); // macs: hello!
```

## Getter and Setter

사용자의 입력오류로 인해 잘못된 값이 인입되어도 그대도 사용을 해야 하는 경우가 발생하게 된다.  
이것을 방지하기 위해 바로 메모리에 있는 값에 접근하거나 할당하는 대신 getter와 setter를 호출하게 하여 내부에서 값 접근, 할당을 한다. 이렇게 하면 비정상적인 값을 할당하려 할 때 오류메시지를 리턴할 수도 있다.

```js
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age() { // getter를 정의하는 순간 constructor의 this.age는 메모리를 읽는 것이 아닌 이 getter를 호출하게 된다.
        return this._age;
    }
    set age(value) { // setter를 정의하는 순간 constructor의 `= age`는 바로 메모리에 값을 할당하는 것이 아닌 setter를 호출하게 된다.

        /*
        // 사용자가 이상한 값을 넣는 것을 걸러 낼 수 있는 방법 1
        if (value < 0) {
            throw Error('age can not be negative');
        }

        // 사용자가 이상한 값을 넣는 것을 걸러 낼 수 있는 방법 2
        this._age = value < 0 ? 0 : value;
        */
        this._age = value;       
    }
    /*
    그런데 문제는 `= value`로 인해 또 다시 setter가 무한반복 호출되면 아래와 같은 에러가 발생
    Uncaught RangeError: Maximum call stack size exceeded
    이를 방지하기위해 getter, setter 내의 변수명은 constructor와는 다르게 설정한다.
    보통은 변수명 앞에 '_'을 붙여둔다.
    */
     }

const user1 = new User('Steve', 'Jobs', -1);
console.log(user1.age); // -1
```

## 필드 Public and Private Fields

`constructor()` 없이 필드 정의 가능하고 `private`은 `#`만 앞에 붙여주면 된다.
최근 추가된 부분이라 지원되는 브라우저가 적으므로 참고만 한다.   


```js
class Example {
    publicField = 1;
    #privateField = 9;
}
const e1 = new Example();
console.log(e1.publicField); // 1 : 외부에서 접근 가능한 변수
console.log(e1.privateField); // undefined : 외부에서 접근 불가능한 변수
```

## 스태틱 프로퍼티와 메소드 Static properties and methods

클래스로 인스턴스를 만들때 모든 인스턴스에서 변경되지 않는 고유한 값이거나 매번 공통으로 사용되는 프로퍼티나 메소드가 있는 경우 스태틱으로 선언을 하면, 인스턴스가 생성될 때 마다 새로 만들어 지는 것을 막아 메모리 낭비를 방지할 수 있다.
클래스 정의 시에만 생성되므로 접근은 `클래스명.프로퍼터 혹은 메소드명`으로만 가능한다.
최근 추가된 부분이라 지원되는 브라우저가 적으므로 참고만 한다.    

```js
class Article {
    static publisher = 'MACS magazine';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }
    static printPublisher() {
        console.log(Article.publisher);
    }
}

const a1 = new Article(1);
const a2 = new Article(2);
console.log(a1.publisher); // undeifned : static에 접근하는 방법은 클래스명을 통해 직접 접근해야함.
console.log(Article.publisher); // MACS magazine
Article.printPublisher();
```

## 상속 Inheritance

모든 인스턴스에서 공통으로 사용하는 부분을 클래스로 만들어 놓으면 해당 클래스를 상속받은 인스턴스에서는 클래스의 기능을 그대로 가져다 쓸 수 있다.  
또한 클래스의 상속받은 기능에 수정이 필요로 할때 클래스에서만 수정을 하면 상속받은 인스턴스에 모두 적용이 된다.  

```js
class Shape {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        console.log(`drawing ${this.color} color of`); // 여기를 수정하면 모든 상속 받은 부분이 수정됨.
    }
    getArea() {
        return this.width * this.height;
    }
}

class Rectangle extends Shape {}
const rectangle = new Rectangle(20, 20, 'blue'); // rectangle 인스턴스 생성
rectangle.draw(); // rectangle 인스턴스는 Rectangle 클래스로 만들어졌지만 Rectangle이 Shape로부터 상속받은 필드, 메소드를 모두 사용할 수 있다.

class Triangle extends Shape {
    // 오버라이딩
    getArea() {
        return (this.width * this.height) / 2;
    }
    draw() {
        console.log('▲'); // 오버라이딩 되어 기존 부모에 있던 내용이 사라짐
        super.draw(); // 부모의 내용도 그대로 사용하고 싶을 때
    }
}
const triangle = new Triangle (20, 20, 'red');
console.log(triangle.getArea()); // 기존 width * height 가 아닌 (width * height) / 2로 계산된 값이 나온다.
triangle.draw();
```

## instanceof

어느 클래스의 인스턴스인지 알 수 있다.  

```js
console.log(rectangle instanceof Rectangle); // true
console.log(triangle instanceof Rectangle); // false
console.log(triangle instanceof Triangle); // true
console.log(rectangle instanceof Shape);  // true
console.log(rectangle instanceof Object); // true
```
