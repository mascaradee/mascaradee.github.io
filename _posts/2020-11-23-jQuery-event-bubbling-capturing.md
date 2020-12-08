---
layout: post
date: 2020-11-23 18:00:00 +0900
title: '[jQuery] event bubbling and capturing'
categories:
  - jQuery
tags:
  - bubbling
  - capturing
---

### 이벤트 전파

모든 이벤트는 이벤트 고유기능과 이벤트 전파기능을 가지고 있다.  
예를 들어 blur의 경우 커서를 없애는 고유기능을 가지고 있고  
다른 요소들(상위요소)에게 해당 이벤트가 발생되었음을 전파한다.
이벤트전파의 흐름은 3가지로 나눌수 있다.
 - 캡처링 단계
 - 타겟 단계
 - 버블링 단계


#### 1) 버블링 단계

하위요소에서 이벤트 발생 시 최상단 부모 요소까지 이벤트까지 모두 동작하는 현상으로  
거의 모든 이벤트에 적용됨. (`focus` 제외)

`me` 요소만 클릭했지만 결과는 `me -> mother -> grandmother`의 이벤트까지 모두 동작한다.

```html
<body>
  <div id='grandmother' style='border: 50px solid red;' onclick='alert("grandmother")'>
    <div id='mother' style='border: 50px solid orange;' onclick='alert("mother")'>
      <div id='me' style='border: 50px solid yellow;' onclick='alert("me")'></div>
    </div>
  </div>
</body>
```

#### 2) 타겟 단계

이벤트가 발생한 가장 안쪽의 요소, 실제 이벤트가 시작된 타겟 요소

```HTML
<html>
  <style>
    body * {
      margin: 10px;
      border: 1px solid blue;
    }
    div * {
    	border: 1px solid black;
    }
  </style>
  <script src="/static/js/jquery-3.5.1.js"></script>
  <body>
    <div id='grandmother' style='background-color:red; height: 100px;' >
      <div id='mother' style='background-color:orange; height: 60px;' >
        <div id='me' style='background-color:yellow; height: 20px;' ></div>
      </div>
    </div>
  </body>
  <script>
  $(function(){
    $('#grandmother').on('click', function(event){
  	  let backgroundColor = event.target.style.backgroundColor
  	  event.target.style.backgroundColor = 'green';
      // chrome needs some time to paint yellow
      setTimeout(() => {
  	    alert("target = " + event.target.id + ", this=" + this.id);
  	    event.target.style.backgroundColor = backgroundColor
      }, 0);
    });
  });
  </script>
</html>
```

#### 3) 캡처링 단계
많이 사용되지는 않지만 버블링과 반대 개념으로 하위요소에서 이벤트가 발생했으나  
최상단 요소의 이벤트부터 동작해서 실제 이벤트가 발생한 요소까지 동작한다.

`me` 요소만 클릭했지만 결과는 `grandmother -> mother -> me`의 이벤트 순서로 동작한다.


```html
<body>
  <div id='grandmother' style='border: 50px solid red;'>
    <div id='mother' style='border: 50px solid orange;'>
      <div id='me' style='border: 50px solid yellow;'></div>
    </div>
  </div>
</body>
```
```javascript
for(let elem of document.querySelectorAll('*')) {
  elem.addEventListener("click", e => alert('캡처링: ${elem.tagName}: ${elem.id}'), true);
  elem.addEventListener("click", e => alert('버블링: ${elem.tagName}: ${elem.id}'));
}
```

#### 이벤트 전파 흐름
https://onedrive.live.com/embed?cid=6D43ECA37A1182E8&resid=6D43ECA37A1182E8%21174133&authkey=AHra9bVmHKq7620&em=2

#### 참고
[https://ko.javascript.info/bubbling-and-capturing] (https://ko.javascript.info/bubbling-and-capturing)

[https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/] (https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)
