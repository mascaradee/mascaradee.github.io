---
layout: post
date: 2023-06-16 10:00:00 +0900
title: '[react] useState hook'
categories:
  - react
tags:
  - hook
  - useState
---

* Kramdown table of contents
{:toc .toc}


## 참고 

[useState](https://react.dev/reference/react/useState)

## useState

상태를 관리하는 훅으로 컴포넌트 최상단에서만 사용 가능하다. 기본적으로 반복문이나 조건문에서는 사용이 불가하지만 필요하다면, 새로운 컴포넌트를 만들고 상태를 그 컴포넌트로 전달하면 가능하다. 

## 구문

`const [something, setSomething] = useState(initialState)`  

- `initialState`는 초기값, 모든 유형을 초기값으로 사용할 수 있다. 함수도 물론 사용 가능하지만 함수호출을 하는 것이 아닌 함수자체를 넘기거나 익명함수를 넘긴다. 초기값은 최초 렌더링 후에는 무시된다. 
- 반환값은 현재상태값과 상태값을 변경할 수 있는 `set`함수로 이루어진 배열이다.


### set 함수 

- `set`함수는 `setSomething(nextState)` 형태로 상태값을 업데이트하고 다시 렌더링을 하게 한다. 인수 `nextState`값은 함수 포함 모든 유형이 가능하다. 
- `set`함수는 리렌더링에 대한 상태만 업데이트하는 함수이기 때문에, `set`함수 호출 직후에 실제 화면상의 상태값은 변경되지 않는다. 
- `Object.is()`로 새 상태값과 현재 상태값이 같으면 리액트는 리렌더링을 하지 않는다. 
- 리액트는 모든 이벤트 핸들러가 실행되고 해당 설정 함수를 호출된 후에야 한번에 화면을 업데이트한다. 
- 만약 이보다 먼저 화면을 업데이트 해야 한다면, `flushSync`를 통해 화면에 더 일찍 업데이트하도록 강제할 수 있다. 
- `set`함수 호출은 현재 컴포넌트 내에서만 허용된다. 


## 상태값 변경 시점

```jsx
import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  function handleClick() {
    setAge(age + 1);
  }

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Increment age
      </button>
      <p>Hello, {name}. You are {age}.</p>
    </>
  );
}
```

나이를 변경하는 `set`함수를 3번 연속으로 실행한다고 해도 `age`가 바로 업데이트 되지 않아 원하는 결과를 얻을 수 없다. 이걸 해결하려면 상태값이 아닌 업데이트 함수를 인수로 넘겨야 한다. 

```jsx
  function handleClick() {
    setAge(age + 1); // setAge(42 + 1)
    setAge(age + 1); // setAge(42 + 1) 여전히 age는 42다. 이 순간에는 상태변수의 값은 없데이트 전이다. 
    setAge(age + 1); // setAge(42 + 1) 여전히 age는 42다. 이 순간에는 상태변수의 값은 없데이트 전이다. 
  }

```

업데이트 함수를 인수로 넘기면, 실제 리액트는 내부에서 이렇게 실행이 된다. 

1. 이벤트 핸들러 `handleClick()` 실행
2. `set` 함수의 인수로 전달된 업데이트 함수`(updater function)`인 `a => a + 1`를 큐에 차례로 넣음
3. 컴포넌트 리렌더링, 대기상태의 큐의 업데이트 함수 계산
  - 업데이트 함수는 대기상태값으로 다음 상태값을 계산한다. `a => a + 1` 에서 `a`가 대기상태값, `a + 1`의 계산결과가 다음 상태값이 된다. 
4. 큐에 넣은 업데이트 함수 동일한 순서대로 호출
5. age 상태값 업데이트

```jsx
  function handleClick() {
    setAge(a => a + 1); // setAge(42 + 1)
    setAge(a => a + 1); // setAge(43 + 1)
    setAge(a => a + 1); // setAge(44 + 1)
  }
```

실제 이런 경우는 많이 발생하지 않는다. 리액트가 클릭에 반응해 바로 상태를 업데이트 하기 때문이다. 핸들러 내에서 2개 이상의 상태를 업데이트 해야 하는 경우에는 업데이트 함수가 유용하다. 

## 객체와 배열의 상태 변경

기본적으로 `state`는 `read-only`다. 직접 변경하면 안된다. 따라서 객체와 배열의 상태는 직접 변경하면 안되고 복사본으로 대체를 해야 한다. 

```jsx
form.firstName = 'Taylor'; // 직접 수정은 안된다. 실제로 된다고 하더라도 리렌더링이 제대로 이루어 지지 않는다. 
```

```jsx
setForm({
  ...form, // 기존 객체를 전개구문으로 복사
  firstName: 'Taylor' // 그 중  firstName만 변경한다. 
});
```

## 함수 초기값 세팅

`useState`의 초기값은 최초 한 번만 사용되고 그 이후에는 무시된다. 그런데 아래처럼 함수호출식을 인수로 넘기면 리렌더링을 할때마다 재호출로 인한 자원소모가 발생한다. 실제 값은 더 이상 사용하지 않는데도 말이다. 

```jsx
const [tasks, setTasks] = useState(getStore() || []); 

```

함수호출식이 아닌 함수자체(초기화함수, `the initializer function`)를 넘기면 이 문제는 해결된다. 인수로 넘겨받은 함수 자체는 최초 렌더링 시에만 호출되고 이후는 호출 되지 않는다. 

```jsx
const [tasks, setTasks] = useState(getTodoList);
function getTodoList() {
  return getStore() || [];
}
```

## key로 상태 리셋하기

보통 리스트를 렌더링할때 `key`를 사용하지만 `key`를 이용해 컴포넌트의 상태를 리셋할 수 있다.  
리셋버튼을 클릭하면 `version`상태가 변경된다. 그럼 리액트는  `key`상태값이 변화한 것을 감지하고 `Form` 컴포넌트를 다시 그리게 되고 `name` 상태는 다시 초기화된다. 

```jsx
import { useState } from 'react';

export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}

function Form() {
  const [name, setName] = useState('Taylor');

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}.</p>
    </>
  );
}
```
