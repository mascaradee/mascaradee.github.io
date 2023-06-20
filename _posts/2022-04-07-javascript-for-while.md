---
layout: post
date: 2022-04-07 11:09:00 +0900
title: '[javascript] 반복문'
categories:
  - javascript
tags:
  - for
  - while
  - break
  - continue
  - label
---

* Kramdown table of contents
{:toc .toc}

## 참고

[loops](https://javascript.info/while-for)

## 반복문

조건에 맞지 않을 때까지 반복해서 실행한다. 

## for

가장 많이 쓰이는 반복문

```js
for (초기화; 조건식; 증감식) {
  // ... loop body ...
}
```

* 초기화 표현식: 최초 한 번만 실행
* 조건식: 조건식의 결과 값이 참이 나오면 내부 구문을 실행한다.
* 증감식: 내부 구문을 실행 후, 증감식을 실행하고 다시 조건식을 평가하며 반복한다.

`for`문 내 표현식 일부를 생략할 수도 있다.  

초기화 생략

```js
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
  alert( i ); // 0, 1, 2
}
```

초기화, 증감식 생략

```js
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

모두 생략도 가능하고 무제한으로 반복된다. 이렇게 사용하면 `while(true)`문과 동일하다. 단, `;;`을 생략하면 문법에러다.

```js
for (;;) {
  // repeats without limits
}
```

## while

`while` 조건문에는 비교연산을 비롯한 모든 표현식과 변수가 들어갈 수 있고 그것이 평가되어 `boolean` 값을 리턴한다.  

```js
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}

let j = 3;
while (j) { // when j becomes 0, the condition becomes falsy, and the loop stops
  alert( j );
  j--;
}
```

## do...while

무조건 한 번은 실행되어야 하는 반복문일 때 사용하지만 빈도는 많지는 않다.

```js
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```


## 반복문 중지 `break`

반복문은 `falsy`값을 만날때까지 반복이 되지만 중간에 중지하는 방법이 있다.
아래 예시에서 `prompt` 결과값이 없는 경우, 즉 사용자 입력이 없는 조건이 달성되면 `break`에 의해 전체 반복문이 중지된다.

```js
let sum = 0;

while (true) { // 무제한 반복  for(;;){} 와 동일
  let value = +prompt("Enter a number", '');
  if (!value) break;
  sum += value;
}
alert( 'Sum: ' + sum );

```

## 다음 반복으로 이동 `continue`

반복문 실행 중 `continue`구문을 만나면 그 이하 구문은 실행되지 않은 채 다음 반복을 실행한다.

```js
for (let i = 0; i < 10; i++) {
  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;
  alert(i); // 1, then 3, 5, 7, 9
}
```

## 이중 for문 중지 `label`

`for`문에서 `break`를 만나면 `break`를 감싸고 있는 `for`문만 영향을 받게 된다. 이중 `for`문을 한 번에 중지하기 위해서는 `label`을 사용한다.

```
labelName: for (...) {
  ...
}
```

```js
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i},${j})`, '');
    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // outer라는 라벨이 없이 break만 있다면 안쪽 for문만 중지된다.
    // do something with the value...
  }
}
alert('Done!');
```

`continue`도 `label`과 함께 사용할 수 있어 반복 중 `continue <labelName>`을 만나면 다음 반복으로 이동한다.
