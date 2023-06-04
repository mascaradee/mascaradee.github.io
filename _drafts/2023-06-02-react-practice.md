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

컴포넌트는 자바스크립트 함수로 정의하면 되지만 아래 2가지가 다르다. 
- 컴포넌트명은 대문자로 시작 
- 리턴값은 JSX 마크업

그리고 `export default`를 덧붙여 다른 파일에서도 `import` 할 수 있도록 한다.  
`default`는 메인 컴포넌트 하나만 붙일수 있고 `import` 하는 파일에서 원하는 이름으로 변경해서 사용할 수 있다. 
`default` 없이 `export`만 있는 컴포넌트는 지정된 이름으로만 쓸 수 있다.  `import` 하는 쪽에서 `import { Todos } from './App.js'` 이렇게 사용할 수 있다. 

```jsx
export default function TodoApp() {

}
```

## 반환문에 JSX 적용하기

컴포넌트의 리턴값은 JSX여야 한다. HTML과 비슷하게 생겼지만 엄밀히 말해 HTML은 아니다 JSX는 자바스크립트 객체로 변환이 된다. 연관성이 있는 마크업과 로직을 한번에 렌더링 하기위해 사용하는 문법 확장프로그램이다.  

HTML문법과 비슷하게 사용할 수 있지만 다른 점은 닫는 태그가 꼭 존재해야 한다는 것.  `<input>`태그를 보면 HTML에서는 없어도 되는 `</>`가 있다.

```jsx
export default function TodoApp() {
  return (
    <div class="todo-wrapper">
      <div class="todo-title">todo app</div>
      <div class="todo-box">
        <div class="todo-input-box">
          <input class="todo-input" placeholder="할 일을 입력 후 엔터" />
        </div>
        <ul class="todo-list">
          <li class="todo-item">
            <div class="checkbox"></div>
            <div class="content">
              <input class="todo" />
            </div>
            <button class="delBtn">x</button>
          </li >
        </ul >
      </div >
    </div >
  );
}
```

`App`컴포넌트에서 나머지 컴포넌트를 중첩해서 사용한다. 이때 서브컴포넌트는 메인과 같은 레벨에 위치하도록 정의한다. 이렇게 해야 메인에서 서브로 값을 전달할 수 있다.

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


export default function TodoApp() { // 메인 컴포넌트
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


export default function TodoApp() { // 메인 컴포넌트
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

## 기능 연결

### 데이터 전달

JSX는 `{}`로 컴포넌트끼리 데이터를 전달한다.  원시타입, 표현식, 함수, 배열, 객체, 이벤트 등 모든 타입의 데이터를 전달할 수 있다. `{}`내부는 자바스크립트 영역이라고 생각하면 된다.
심지어 서브컴포넌트에서 받는 파라미터도 `{}`로 표시한다. 컴포넌트가 받는 유일한 인수(argument)는 `props`객체로 그걸 리터럴로 쓴걸로 생각해도 될 것 같다

속성도 `{}`로 전달할 수 있지만 스타일 속성은 `{{}}`를 사용해야 한다. `{}`안에 객체를 넘긴다고 생각하면 된다. 한가지 유의할 점은 JSX는 카멜케이스를 써야한다.  
- html: `<ul style="background-color: black">`
- JSX: `<ul style={{ backgroundColor: 'black' }}>`

메인컴포넌트에서 로컬스토리지에 있는 데이터를 조회해서 `<Todos todos={todos} />`로 서브컴포넌트에 전달한다. 

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
        <Todos todos={todos} />
      </div>
    </div>
  );
}




```
