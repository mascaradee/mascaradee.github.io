---
layout: post
date: 2020-04-22
title: '[javascript] if else'
categories:
  - javascript
tags:
  - if
  - else
---

* 참고 사이트 [https://ko.javascript.info/ifelse](https://ko.javascript.info/ifelse)

## 조건부 연산자 if와 ?

### if문

`if(조건문) {...}`

#### 불리언값으로 변환

1. false : 0, '', null, undefined, NaN
2. true : 그 외

```javascript
if(0){ // 0은 false 이므로 아래 실행문은 실행될 수 없음
  alert('never do something');
}

if(1){ // 1은 true이므로 항상 실행
  alert('do something everytime');
}
```

### 조건부연산자 `?` = 삼항연산자

자바스크립트에서 피연사자가 3개인 것은 조건부연산자가 유일.

`condition ? value1 : value2`

```javascript
let accessAllowed = (age > 18) ? true : false; // 괄호 없어도 `>`가 `?`보다 우선순위가 높아 먼저 실행. 가독성 위해 괄호 사용.
// let accessAllowed = age > 18과 같음, 비교연산자는 불리언값을 리턴하므로 사실 42line처럼 할 필요는 없다.
```

### 다중 `?`

물음표 연산자 `?`를 여러개 연결하면 복수의 조건을 처리할 수 있다.

```javascript
let grade = prompt('학년을 입력해주세요.', 1);
let message = (grade < 1) ? '초딩이 아니네 유치원생?' : (grade < 7) ? '초딩 안녕?' : (grade < 8) ? '초등학생이 아니네' : '혹시 중딩?';
alert(message);
```

평가결과를 변수에 할당하지 않고 아래와 같이 바로 표현식을 쓰는 것은 가독성상 안 좋음. 지양

```javascript
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

```javascript
if("0"){ // 문자열 true
  alert('Hello'); // 실행됨
}
```

```javascript
let answer = prompt('What\'s the \"official\" name of JavaScript?','');
if(answer == 'ECMAScript'){
  alert('Right');
} else {
  alert('You don\'t know? \"ECMAScript\"!');
}
```

```javascript
let number = prompt('숫자?', '');
if(number > 0){
  alert(1);
} else if (number < 0){
  alert(-1);
} else {
  alert(0);
}
```

```javascript
let a = prompt('첫번째 숫자?');
let b = prompt('두번째 숫자?');
let result = (+a + +b < 4) ? '미만' : '이상';
alert(result);
```

```javascript
let message;
message = (login == '직원') ? '안녕하세요' : (login == '임원') ? '환영합니다.' : (login == '') ? '로그인이 필요합니다.' : '';
```
