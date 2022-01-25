---
layout: post
date: 2021-12-21 16:23:00 +0900
title: '[reactJS] JSX elements must be wrapped'
categories:
  - reactJS
tags:
  - JSX
  - JSX fragment
---

* Kramdown table of contents
{:toc .toc}


## JSX 규칙 1

하나의 요소만 return에 들어갈 수 있다. 아래는 <h1>과 <p>태그 2개의 요소로 되어 있다.
```
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: C:\dev\reactjs\mulberry\src\routes\Detail.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (4:4)

  2 |   return (
  3 |     <h1>Detail</h1>
> 4 |     <p>123</p>
    |     ^
  5 |   );
  6 | }
  7 | export default Detail;
```

실제 리액트로 렌더링이 되면 아래와 같이 return이 2번 생성되어 버리기 때문이다.
```
return React.createElement(
    'h1',
    null,
    'Detail'
);
return React.createElement(
    'p',
    null,
    '123'
)
```

따라서 오류없이 노출하려면 아래와 같이 하나의 요소인것처럼 한 번 감싸야 한다.
그 안에 자식은 얼마든지 존재해도 된다.

```
return (
  <>
    <h1>Detail</h1>
    <p>123</p>
  </>
);
```


### 참고  

[JSX 문법](https://reactjs.org/docs/introducing-jsx.html)
