---
layout: post
date: 2023-06-12 10:00:00 +0900
title: '[javascript] bind-apply-call'
categories:
  - javascript
tags:
  - bind
  - apply
  - call
---

* Kramdown table of contents
{:toc .toc}

## bind()

`Function.prototype.bind(대상함수, [인수1, 인수2 ...])`

## 설명

`bind()`는 기존의 함수를 재정의하여 새로운 함수를 반환해 준다. 첫 인수(argument)로 재정의할 대상함수를 `this`로 넘겨주고 추가 인수를 선택적으로 넘기면 순서에 맞춰 새 함수의 인자(parameter)로 세팅된다.  

## 함수재정의

`update`함수를 `newUpdate`함수로 재정의하여 원하는 인자만 넘길 수 있다. 


```js
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

위 예시에서 둘 다 첫번째 요소만 수정을 하고 있다. 호출시 인자를 넘기는 대신, `bind()`에 두번째 인자에 초기값을 세팅하면 반환될 재정의 함수의 인자로 자동으로 세팅이 된다. 

```js
let newUpdate = update.bind(this, '1');
newUpdate({newChecked: true});
newUpdate({newContent: 'updated'});
// 위 예시와 동이 결과
```


## More

[`apply()`](_posts\2023-06-12-javascript-apply.md)


[`call()`](_posts\2023-06-12-javascript-call.md)



