---
layout: post
date: 2021-12-15 23:20:00 +0900
title: '[reactJS] 리액트 기초'
categories:
  - reactJS
tags:
  - reactJS
---

* Kramdown table of contents
{:toc .toc}


## 리액트  기초

### 리액트
html태그를 만들 리액트 요소를 만든다. 엔진역할?

### 리액트돔
리액트요소를 html 태그로 렌더링 해 준다.


바닐라JS로 <span>태그를 한 번 만들어 보자

```js
<!DOCTYPE html>
<html>
  <body>
    <span>Total clicks: 0 </span>
  </body>
  <script>
    const span = document.querySelector('span');
    button.addEventListener('moveEnter', handleClick);
  </script>
</html>


```

그걸 리액트를 적용하는 걸로 바꾸면

```js
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
  </body>
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script>
    const root = document.getElementById('root');
    const span = React.createElement('span', {id: 'cute-span'}, 'heloo'); // html요소, properties, 텍스트
    ReactDOM.render(span, root);
  </script>
</html>
```

짠 아래와 같이 <span>태그 생성된걸 확인 할 수 있다.

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
  <div id="root"><span id="cute-span">heloo</span></div>  
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script>
    const root = document.getElementById('root');
    const span = React.createElement('span');
    ReactDOM.render(span, root);
  </script>
</body>
</html>
```

자바스크립트를 사용 할때는 html 요소가 모두 만들어진 상태에서 스크립트를 추가해 요소들을 조절하지만
리액트에서는 스크립트를 작성해서 html 요소를 만든다. 즉, 반대의 순서로!

근데 실전에서는 저렇게 쓰지 않는다는게 함정, 이벤트리스너도 추가해서 JSX라는 문법으로 변경해 보자

```js
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
  </body>
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script>
    const root = document.getElementById('root');
    const Span = (
        <span id="cute-span" style={{backgroundColor:"tomato"}} onMouseEnter={() => console.log('mouse enter')}>
            heloo
        </span>
    );
    /* 리액트에서는 js의 이벤트 리스너는 아래와 같이 표현할 수 있다.
    React.createElement('span', {
        id: 'cute-span',
        style: {
          backgroundColor: "tomato"
      },
        onMouseEnter: () => console.log('mouse enter')
    }, 'heloo'); // html요소, properties, 텍스트
    */
    ReactDOM.render(span, root);
  </script>
</html>
```

훨씬 더 익숙한 html 같지 않은가? 그런데 이렇게만 하면 브라우저에서 에러가 난다.
왜냐면 브라우저는 JSX문법을 이해하지 못하니까
브라우저가 알수 있게 변경해 줄수 있는 바벨을 추가해 줘야 한다.

```js
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
  </body>
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
```

그럼 아래와 같이 바벨이 브라우저가 이해할 수 있도록 JSX 부분을 리액트로 변환해 준것을 볼 수 있다.


컴포넌트는 함수로 만들어야 제대로 렌더링이 된다.



각 컴포넌트에 상세설명을 해 주고 마지막에 한 번에 렌더링을 돌려 주는 방식으로 깔끔


변수를 JSX에 전달해 주는 방법
{}


바닐라 JS와 리액트의 렌터링 차이를 확인해보자
리액트에서는 숫자만 바뀐다.

### 참고  

[리액트 버전별 다운로드](https://github.com/facebook/react/releases)
[JSX 문법](https://ko.reactjs.org/docs/introducing-jsx.html)
[바벨-자바스크립트 컴파일러](https://babeljs.io/)
[Props-type](https://reactjs.org/docs/typechecking-with-proptypes.html)
