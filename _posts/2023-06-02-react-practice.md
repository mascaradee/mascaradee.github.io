---
layout: post
date: 2023-06-02 14:23:00 +0900
title: '[react] practice'
categories:
  - react
tags:
  - practice
---

* Kramdown table of contents
{:toc .toc}

# 투투앱 만들기

## 구조 확인

html의 구조를 파악해서 컴포넌트로 나눌 단위를 정한다. 

~~![todoapp](/images/todoapp.png)~~


## 컴포넌트 정의 

컴포넌트는 자바스크립트 함수로 정의하면 되지만 함수와 아래 2가지가 다르다. 
- 컴포넌트명은 대문자로 시작 
- 리턴값은 JSX 마크업

## 컴포넌트 가져오기 내보내기

다른 곳에서 이 컴포넌트를 사용하려면 내보내기가 필요하다. `default`는 부모 컴포넌트 하나에만 붙일 수 있다. 
```jsx
export default function TodoApp() {
  // somethins to do
}
export function TodoItem() {
  // somethins to do
}
```

컴포넌트를 사용하기 위해선 가져오기가 필요하다. `import`를 붙이면 다른 컴포넌트나 모듈을 가져와 사용할 수 있다. `export default`된 컴포넌트는 가져온 쪽에서 원하는 이름을 붙일 수 있지만  `default` 없이 `export`만 있는 컴포넌트를 가져올때는 꼭 지정된 이름을 `{}`안에 넣어서만 사용할 수 있다. 

```jsx
import MyApp from './TodoApp.js'
import { TodoItem } from './TodoItem.js'
```


## 반환문에 JSX 적용하기

컴포넌트의 리턴값은 `JSX`여야 한다. 연관성이 있는 마크업과 로직을 한번에 렌더링 하기위해 사용하는 문법 확장프로그램이다.   
`HTML`과 비슷하게 생겼지만 엄밀히 말해 `HTML`은 아니다 `JSX`는 자바스크립트 객체로 변환이 된다. 

`HTML`문법과 비슷하게 사용할 수 있지만 다른 점은 닫는 태그가 꼭 존재해야 한다는 것.  `<input>`태그를 보면 `HTML`에서는 없어도 되는 `</>`가 있다.

```jsx
export default function TodoApp() {
  return (
    <div class="todo-input-box">
      <input class="todo-input" placeholder="할 일을 입력 후 엔터" />
    </div>
  );
}
```

`App`컴포넌트에서 나머지 컴포넌트를 중첩해서 사용한다.

```jsx
import './Todo.css';

function Todos() {
  return (
    <ul class="todo-list">
      <Todo />
    </ul>
  );
}

function NewTodo() {
  return (
    <input type="text" class="todo-input" placeholder="할 일을 입력 후 엔터" />
  )
}


export default function TodoApp() { // 부모 컴포넌트
  return (
    <div class="todo-wrapper">
      <div class="todo-title">todos</div>
      <div class="todo-box">
        <div class="todo-input-box">
          <NewTodo />
        </div>
        <Todos />
      </div>
    </div>
  );
}
```

작은 단위로 HTML을 나눠 컴포넌트로 정의할 수 있다. 아직 기능을 붙이기 전이다. 

```jsx
import './Todo.css';

function Delete() {
  return (
    <button class="delBtn">x</button>
  );
}

function Content() {
  return (
    <div class="content">
      <input class="todo" />
    </div>
  );
}

function Check() {
  return (
    <div class="checkbox"></div>
  );
}

function Todo() {
  return (
    <li class="todo-item" >
      <Check />
      <Content />
      <Delete />
    </li>
  );
}

function Todos() {
  return (
    <ul class="todo-list">
      <Todo />
    </ul>
  );
}

function NewTodo() {
  return (
    <input type="text" class="todo-input" placeholder="할 일을 입력 후 엔터" />
  )
}


export default function TodoApp() { // 부모 컴포넌트
  return (
    <div class="todo-wrapper">
      <div class="todo-title">todos</div>
      <div class="todo-box">
        <div class="todo-input-box">
          <NewTodo />
        </div>
        <Todos />
      </div>
    </div>
  );
}
```


## 데이터 전달, props

`props`을 이용해 부모에서 자식컴포넌트로 데이터를 전달할 수 있다. 컴포넌트가 받는 유일한 인수(argument)는 `props`객체이다.  
JSX문법 `{}`를 사용한다. 원시타입, 표현식, 함수, 배열, 객체, 이벤트 등 모든 타입의 데이터를 전달할 수 있다. `{}`내부는 자바스크립트 영역이라고 생각하면 된다.

속성도 `{}`로 전달할 수 있지만 스타일 속성은 `{{}}`를 사용해야 한다. `{}`안에 객체를 넘긴다고 생각하면 된다. 한가지 유의할 점은 JSX는 카멜케이스를 써야한다.  
- html: `<ul style="background-color: black">`
- JSX: `<ul style={{ backgroundColor: 'black' }}>`

부모컴포넌트에서 로컬스토리지에 있는 데이터를 조회해서 `<Todos todos={todos} />`로 자식컴포넌트에 전달한다. 

```jsx
import { useState, useEffect } from 'react'
import './Todo.css';
import NewTodo from './NewTodo'
import Todos from './Todos'

export default function TodoApp() {
  const [todos, setTodos] = useState(getStore());

  function getStore() {
    let todos = localStorage.getItem('todos');
    return JSON.parse(todos);
  }
  
  return (
    <div className="todo-wrapper">
      <div className="todo-title">todos</div>
      <div className="todo-box">
        <div className="todo-input-box">
          <NewTodo />
        </div>
        <Todos todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}
```

 `props`는 readonly 속성으로 리액트에서는 변경을 허용하지 않는다. 

자식컴포넌트에서 전달받은 `props`의 변경이 필요하다면, 부모로부터 `setState`함수도 같이 전달을 받아 그것을 이용해 부모에 `props`의 변경을 알려야한다. 그래야 리렌더링이 진행이 된다. 그렇지 않을 경우 리렌더링은 일어나지 않아 화면에 해당 변경사항이 노출되지 않는다. 

```jsx
import TodoItem from './TodoItem';
import { setStore } from './store';

export default function Todos({ todos, setTodos }) {
  const todoList = todos.map(item => {
    return (
      <TodoItem todo={item} customUpdate={update} customDelete={deleteItem} key={item.seq} /> // map() 호출 안쪽에 꼭 key 추가해야함.
    )
  });
  function update() {
    setStore(todos)
    setTodos()
  }
  function deleteItem(targetSeq) {
    setStore(todos.filter(e => e.seq !== targetSeq));
    setTodos()
  }
  return (
    <ul className="todo-list">
      {todoList}
    </ul>
  );
}
```

