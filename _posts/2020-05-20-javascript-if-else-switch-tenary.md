---
layout: post
date: 2020-05-20 00:00:00 +0900
title: '[javascript] 조건문'
categories:
  - javascript
tags:
  - if-else
  - switch
  - tenary-operator
---

* Kramdown table of contents
{:toc .toc}

## 참고 사이트

[ifelse](https://javascript.info/ifelse)
[switch](https://javascript.info/switch)



## if

`if(조건문) {...}`

### 불리언값으로 변환

1. `false` : 0, '', `null`, `undefined`, `NaN`
2. `true` : 그 외

```js
if(0){ // 0은 false 이므로 아래 실행문은 실행될 수 없음
  alert('never do something');
}

if(1){ // 1은 true이므로 항상 실행
  alert('do something everytime');
}

let obj;
if (obj) {
  console.log(obj.name);
}

// 위 if 문은 아래와 같이 한 줄로 표기가 가능한다.
obj && console.log(obj.name); //  &&연산자는 앞이 true일때만 뒤를 실행한다. 따라서 이렇게 유효성 체크를 하면 된다.  
```

## Switch statement

`if` 조건문이 많아질때, 이넘(`enum`) 값을 확인할때 `if`문 대신 쓰면 가독성에 좋다. `case`문은 값과 타입의 일치여부를 판단하는 **일치연산**을 한 결과와 같고 `break`를 만날때까지 비교를 계속하고 같은 값이 없다면 `default`를 수행한다.  

```js
const fruit = 'grape';
switch (fruit) {
  case 'apple':  // if (fruit === 'apple')
    console.log('good for you in the morning');
    break;
  case 'banana':
    console.log('good instead of breakfast');
    break;
  case 'tomato':
    console.log('good instead of breakfast');
    break;
  default:
    console.log('so so');
    break;
}
```

`banana`와 `tomato`는 같은 내용을 실행하므로 하나로 합쳐 아래와 같이 쓸수 있다.  

```js
(...)
case 'banana':
case 'tomato':
  console.log('good instead of breakfast');
  break;
(...)
```

## 조건부연산자 `?`, 삼항연산자

자바스크립트에서 피연산자가 3개인 것은 조건부연산자가 유일.

`condition ? value1 : value2`

```js
let accessAllowed = (age > 18) ? true : false; // 괄호 없어도 `>`가 `?`보다 우선순위가 높아 먼저 실행. 가독성 위해 괄호 사용.
// let accessAllowed = age > 18과 같음, 비교연산자는 불리언값을 리턴하므로 사실 42line처럼 할 필요는 없다.
```

### 다중 `?`

물음표 연산자 `?`를 여러개 연결하면 복수의 조건을 처리할 수 있다.

```js
let grade = prompt('학년을 입력해주세요.', 1);
let message = (grade < 1) ? '초딩이 아니네 유치원생?' : (grade < 7) ? '초딩 안녕?' : (grade < 8) ? '초등학생이 아니네' : '혹시 중딩?';
alert(message);
```

평가결과를 변수에 할당하지 않고 아래와 같이 바로 표현식을 쓰는 것은 가독성상 안 좋음. 지양

```js
// 지양
let year = prompt('올해는 몇년?','');
(year == '2020') ? alert('정답') : alert('오답');

// 지향
if(year == '2020'){
  alert('정답');
} else {
  alert('오답');
}
```

* 연습문제

```js
if("0"){ // 문자열 true
  alert('Hello'); // 실행됨
}
```

```js
let answer = prompt('What\'s the \"official\" name of JavaScript?','');
if(answer == 'ECMAScript'){
  alert('Right');
} else {
  alert('You don\'t know? \"ECMAScript\"!');
}
```

```js
let number = prompt('숫자?', '');
if(number > 0){
  alert(1);
} else if (number < 0){
  alert(-1);
} else {
  alert(0);
}
```

```js
let a = prompt('첫번째 숫자?');
let b = prompt('두번째 숫자?');
let result = (+a + +b < 4) ? '미만' : '이상';
alert(result);
```

```js
let message;
message = (login == '직원') ? '안녕하세요' : (login == '임원') ? '환영합니다.' : (login == '') ? '로그인이 필요합니다.' : '';
```
