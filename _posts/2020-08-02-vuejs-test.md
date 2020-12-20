---
layout: post
date: 2020-08-02 00:00:00 +0900
title: '[vuejs] test'
categories:
  - vuejs

tags:
  - test
---

* Kramdown table of contents
{:toc .toc}

## vuejs

### new Instance
```
var app = new Vue(); // new Instance
```

### new Instance with option ({})
```html

<div id = "app">
  <h1>{{ product }}</h1>
</div>
```

```js
var app = new Vue({
  el: '#app', // id = app인 요소
  data :{
      product: 'Socks' // {{}}  표현식 안에 들어가는 데이터로 값이 변하는대로 바로 적용이 됨. ->  vuejs 기능인가?
  }
});
```

###  v-bind
html요소의 속성 조절

```html
<div id="app-2">
    <span v-bind:title="message">
        내 위에 잠시 마우스를 올리면 동적으로 바인딩 된 title을 볼수 있답니다.     
    </span>
</div>
```

```js
var app2 = new Vue({
    el: '#app-2',
    data:{
        message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다.'
    }
});
```

### v-if
if문

```html
<div id="app-3">
     <p v-if="seen">이제 나를 볼수 있어</p>
     <p v-else>너도 볼수 있어</p>
 </div>
```
```js
var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});
```

### v-for

```html
<div id="app-4">
    <ol>
        <li v-for="todo in todos">
            {{todo.text}}
        </li>
    </ol>
</div>

```
```js
var app4 = new Vue({
    el: '#app-4',
    data: {
        todos:[
            {text: 'JavaScript배우기'},
            {text: 'Vue 배우기'},
            {text: '무언가 멋진 것을 만들기'}
        ]
    }
});

// console
// app4.todos.push({text:'추가컨텐츠'}); // todos 배열의 마지막에 덧붙여짐
```

### v-on
메소드 호출하는 이벤트 리스너 추가 가능

```html
<div id="app-5">
    <p>{{message}}</p>
    <button v-on:click="reverseMessage">메시지 뒤집기</button>
</div>
```
```js
var app5 = new Vue({
    el: '#app-5',
    data: {
        message: '안녕하세요 Vue'
    },
    methods:{
        reverseMessage: function(){
            this.message = this.message.split('').reverse().join('')
        }
    }
})
;
```


### v-model
양식에 대한 입력과 앱 상태를 양방향으로 바인딩

```html
<div id="app-6">
    <p>{{ message }}</p>
    <input v-model="message"> <!-- 여기에 메시지가 입력되면  vue를 통해 <p>태그에도 동일하게 입력값이 들어감 -->
</div>
```
```js
var app6 = new Vue({
    el: '#app-6',
    data: {
      message: '안녕하세요 Vue!'
    }
})
```
