---
layout: post
date: 2023-06-12 10:00:00 +0900
title: '[javascript] bind'
categories:
  - javascript
tags:
  - bind
---

* Kramdown table of contents
{:toc .toc}

## 참고

[bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## Function.prototype.bind()

기존 함수를 재정의하여 원하는 대상에 추가해 그 대상의 메소드인 것처럼 사용할 수 있다.  


## 구문

`func.bind(thisArg [, arg1, /* …, */ argN])`  

- `func`는 기존 함수.  
- 첫번째 인수 `thisArg`는 새로운 함수가 추가될 대상이다. 인스턴스를 나타내는 `this`로 보통은 객체인데 함수나 원시타입 값이 될 수도 있다. `null`이나 `undefined`는 전역객체로 원시타입은 객체로 변환된다. 
- `arg1, /* …, */ argN` 인수들은 새로 만들어질 함수의 파라미터로 사용된다. 순서에 맞춰 새 함수의 인자(parameter)로 세팅된다.   
- 반환값은 재정의된 함수 자체를 반환해 준다. 


## 함수 재정의

`update`함수를 `newUpdate`함수로 재정의하여 사용할 수 있다.

```js

// 부모.js
let tasks = [
  {seq: '1', checked: false, content:'test1'},
  {seq: '2', checked: false, content:'test2'},
  {seq: '3', checked: false, content:'test3'}
]

function update(seq, { newChecked, newContent }) {
  const newTasks = tasks.map(task =>
    task.seq === seq ? { ...task, checked: newChecked ?? task.checked, content: newContent ?? task.content } : task
  );
console.log(newTasks);
}


// 자식.js 
let newUpdate = update.bind(this);
newUpdate('1', {newChecked: true});
newUpdate('1', {newContent: 'updated'});
/*
[
  {seq: '1', checked: true, content: 'test1'},
  {seq: '2', checked: false, content: 'test2'},
  {seq: '3', checked: false, content: 'test3'}
]

[
  {seq: '1', checked: true, content: 'updated'},
  {seq: '2', checked: false, content: 'test2'},
  {seq: '3', checked: false, content: 'test3'}
]
*/
```

## 초기값있는 함수 정의

위 예시에서 둘 다 `tasks`배열의 첫번째 요소만 수정을 하고 있다. 호출 시 인수를 넘기는 대신, `bind()`에 두번째 인수에 초기값을 세팅하면 반환될 재정의 함수의 인자로 자동으로 세팅이 된다. 

```js
let newUpdate = update.bind(this, '1');
newUpdate({newChecked: true});
newUpdate({newContent: 'updated'});
// 위 예시와 동일 결과
```


## More

[`apply()`](https://mascaradee.github.io/javascript/javascript-apply)
[`call()`](https://mascaradee.github.io/javascript/javascript-call.md)


## 결론

기존의 함수에 영향이 가지 않도록 인자의 변화를 주고 싶을 때 사용하면 좋을 것 같다. 


