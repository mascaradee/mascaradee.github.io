---
layout: post
date: 2023-06-08 09:00:00 +0900
title: '[react] event'
categories:
  - react
tags:
  - event
---

* Kramdown table of contents
{:toc .toc}


## 이벤트 핸들러 명명 규칙

`handle[적용이벤트명]`  

예를 들어, `onClick`이벤트에 덧불일거면 `handleClick`으로 핸들러 함수명을 지으면 된다. 

## 이벤트 핸들러 적용

### 함수 선언식
```jsx
export default function Input() {

  function handleChange(e) {
    alert('변경된 값은' + `${e.target.value}`)
  }
  return (
    <input value={'mignon'} onChange={handleChange}/>
  );
}

```