---
layout: post
date: 2022-04-11 13:24:00 +0900
title: '[javascript] function expressions'
categories:
  - javascript
tags:
  - function
  - expressions
---

* Kramdown table of contents
{:toc .toc}

## 함수표현식

함수를 정의하는 방법 중 선언식과 표현식이 있다. 선언식은 기존에 알던 방식이고 표현식은 변수에 함수를 할당하는 형태라고 보면 된다.
따라서 함수표현식 끝에는 세미콜론과 함께 쓰도록 권장된다. `let sayHi = 'Hello';`처럼

```js
function fn() {
  console.log('this is function declaration');
}

let fn = function() { // 함수표현식에는 함수명이 없다.
  console.log('this is function expression');
};
```

## 함수는 값

자바스크립트에서 함수는 값의 일종이다. 따라서 변수에 담을 수도 있고 복사도 가능하다. 일반적인 값(`value`)처럼.  
일반 문자열과 숫자값이 데이터로 표현된다면 함수는 동작으로 인식된다는 점이 차이점이다.  
`alert(sayHi)`의 `sayHi`는 함수를 호출하여 실행하는 것이 아닌 함수 정의를 그대로 출력하는 역할이다. `sayHi()`처럼 함수를 호출하는 것이 아님의 유의한다.

```js
function sayHi() {
  alert('Heloo');
}
alert(sayHi);
/*
function sayHi() {
  alert('Heloo');
}
*/
```

값복사와 동일하게 함수복사도 가능하다. 역시 `sayHi()`로 함수호출이 아닌 괄호 없이 함수명만 써서 복사를 한다는 것에 유의한다.

```js
let func = sayHi;
func(); // Heloo
sayHi(); // Heloo - 여전히 호출할 수 있다.
```


## 콜백함수

함수는 값을 전달하는 것과 같이 매개변수로도 사용할 수 있다.  
`ask`함수호출 시, 전달되는 `showOk`와 `showCancel`을 콜백함수 혹은 콜백이라고 말한다.  
당장 호출되는 것이 아닌 사용자의 선택에 따라 선택되어 나중에 호출이 된다. 사용자가 `confirm`창에서 확인을 누르게 되면 그때서야 `showOk`함수가 호출되게 된다.

```js
function ask(question, yes, no) { // 매개변수로 함수자체를 전달
  if (confirm(question)) yes() // 호출
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

위 코드를 좀 더 짧게 쓸수도 있다.   
아래와 같이 `ask`함수 내, 변수에 할당없이 쓴 함수표현식을 익명함수라고 한다. 이 익명함수는 `ask`함수 밖에서는 호출할 수 없다. 당연하게도 호출하기 위한 이름이 없으니까.

```js
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```

## 함수선언식 vs 함수표현식

### 구문 형태

함수선언식과 함수표현식은 구문형태가 다르다. 함수표현식은 변수에 할당이 되어 사용된다.

```js
// 함수선언식
function fn() {
  console.log('this is function declaration');
}

// 함수표현식
let fn = function() { // 함수표현식에는 함수명이 없다.
  console.log('this is function expression');
};
```

### 생성시점과 사용가능시점

좀더 깊게 차이점을 들여다 보면, 둘의 생성시점과 사용가능시점의 차이가 있는 것을 알 수 있다.  
함수표현식은 자바스크립트가 실행되다가 함수표현식 코드에 도달한 시점에 함수가 만들어지고 사용가능하게 된다.   
즉, `let sum = funciton...` 우변의 함수가 생성된후 `sum` 변수에 할당이 되는 시점부터 사용 가능하다.  

하지만 함수선언식은 다르다. 자바스크립트 엔진은 스크립트를 실행하면서 가장 처음에 함수선언식을 찾아 생성을 한다.  
이걸 초기화 단계라고 볼수 있고 함수호이스팅이라고 부른다. 그렇게 때문에 함수선언식은 위치에 관계없이 호출할 수 있게 된다.

```js
sayHi("John"); // Hello, John -> 함수선언식이 아래에 있지만 여기서 호출 가능하다.

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

반면 함수표현식의 경우에는 할당이 되면서 함수가 생성되고 사용 가능하므로 호출이 먼저 되면 에러가 나게 된다.

```js
sayHi("John"); // error!

let sayHi = function(name) {  // 더 이상 실행될 수 없다.
  alert( `Hello, ${name}` );
};
```

### 유효범위

함수선언식은 블록 안에서만 호이스팅이 된다. 따라서 아래 예시의 마지막 `welcome()`은 오류가 된다.

```js
let age = 16;

if (age < 18) {
  welcome();               // \   (runs) Hello
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
} else {
  welcome();                // (run) age가 20이라면 여기 실행 - Greetings
  function welcome() {
    alert("Greetings!");
  }
}

welcome(); // Error: welcome is not defined
```

반면 함수표현식은 변수에 담아서 사용할 수 있기 때문에 블록밖에서 호출할 수 있다.

```js
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {
  welcome = function() {
    alert("Hello!");
  };
} else {
  welcome = function() {
    alert("Greetings!");
  };
}
welcome(); // ok now

```


## 요약

- 함수는 값으로 어느곳에서나 할당하거나 복사 혹은 선언할 수 있다.
- 메인코드와 분리되어 선언된 함수는 함수선언식으로 부른다.
- 표현식의 일부로 함수가 생성되는 것은 함수표현식이라고 한다.
- 함수선언식은 코드블록이 실행되기 전에 수핸되고 블록 내에서는 어디서든 접근가능하다.
- 함수표현식은 코드가 수행되면서 해당 코드에 도달했을때 생성이 된다.
- 함수를 사용할때 함수선언식을 더 많이 쓰게 되는데 이유는 코드가 실행되기 전에 이미 생성되어 어디서든 접근 가능한 장점이 있고 가독성이 좋기 때문이다.
- 함수표현식은 함수선언식으로 해결이 되지 않을 때 사용하는 것이 좋다.
