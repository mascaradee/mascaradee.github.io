---
layout: post
date: 2020-12-14 18:00:00 +0900
title: '[javascript] class with callback'
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
  - callback

---

- 참고  
[드림코딩 by 엘리 - class with callback](https://www.youtube.com/watch?v=fU25vI0EOOk&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=18)

## 클래스와 콜백함수

### 클래스 선언

```js
class Counter {
    constructor() {
        this.counter = 0;
    }

    increase() {
        this.counter++;
        console.log(this.counter);
    }
}
const coolCounter = new Counter();
coolCounter.increase();
```

### 5의 배수마다 로그 찍기

```js
class Counter {
    constructor() {
        this.counter = 0;
    }

    increase() {
        this.counter++;
        console.log(this.counter);
        if (this.counter % 5 === 0) {
            console.log('yo!');
        }
    }
}

const coolCounter = new Counter();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
```

### 근데 로그 내용을 직접 바꾸고 싶으면?

```js
class Counter {
    constructor() {
        this.counter = 0;
    }

    increase(runIf5Times) {
        this.counter++;
        console.log(this.counter);
        if (this.counter % 5 === 0) {
            runIf5Times(); //  사용자가 정의한 printSomething()을 호출하도록 전달하여 사용자가 직접 내용을 변경할수 있다.
        }
    }
}

// 콜백함수
function printSomething () {
    console.log('Wow');
}
const coolCounter = new Counter();
coolCounter.increase(printSomething); // 매개변수 명에는 큰 의미가 없다. 매개변수가 전달하는 ref가 중요
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
```

### 근데 어떤 숫자에 로그가 출력이 되는지도 알고 싶고 알럿으로도 띄우고 싶다면?
```js
class Counter {
    constructor() {
        this.counter = 0;
    }

    increase(runIf5Times) {
        this.counter++;
        console.log(this.counter);
        if (this.counter % 5 === 0) {
            runIf5Times(this.counter); // 함수실행 시 this.counter를 전달하여 호출하는 쪽에서 사용 할수 있도록 한다.
        }
    }
}

function printSomething (num) {
    console.log(`Wow + ${num}`);
}
function alertNum(num) {
    alert(`Wow + ${num}`);
}
const coolCounter = new Counter();
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(alertNum);
```

### increase를 호출할때마다 매개변수로 함수를 전달하는 건 넘 힘들어 더 간편하게?

```js
class Counter {
    constructor(runEveryFiveTimes) { // 콜백함수를 인자로
        this.counter = 0;
        this.callback = runEveryFiveTimes;
    }

    increase() {
        this.counter++;
        console.log(this.counter);
        if (this.counter % 5 === 0) {

            // 콜백함수가 없이 호출되는 경우 아래와 같은 오류로 시스템이 정지되므로 에러처리 로직이 필요
            //Uncaught TypeError: this.callback is not a function
            /*
            if( this.callback ){
                this.callback(this.counter);
            }
            */
           // 위 if문을 더 간결하게 아래와 같이
           this.callback && this.callback(this.counter);
        }
    }
}

function printSomething (num) {
    console.log(`Wow + ${num}`);
}
function alertNum(num) {
    alert(`Wow + ${num}`);
}
const printCounter = new Counter(printSomething); // 콜백함수가 없는 경우 오류가 나지만 클래스에서 방지처리함.
const alertCounter = new Counter(alertNum);

printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
```

클래스에 우리가 원하는 기능을 모두 정의하면 사용자가 컨트롤 할수도 없고 재사용이 힘들다.  
이때 콜백함수를 사용하게 되면 하나의 클래스로 여러 인스턴스를 만들어서 사용할 수 있게 되므로 사용자 입맛에 맞게 사용할 수 있다.  
