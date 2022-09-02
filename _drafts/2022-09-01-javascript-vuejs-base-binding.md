---
layout: post
date: 2022-09-01 10:05:00 +0900
title: '[javascript] vuejs 기본 - 값 바인딩'
categories:
  - javascript
tags:
  - vuejs
---

* Kramdown table of contents
{:toc .toc}

## 참조

[Vue 기초 튜토리얼](https://vuejs.org/tutorial/#step-3)



## 텍스트 바인딩

`{{ }}`

텍스트 바인딩, 내부는 자바스크립트 영역이라고 보면 된다. `data()`에 `title`프로퍼티가 선언되어 있으면 해당 값이 렌더링 된다. 

```html
<script>
  creatApp({
  data() {
    return {
      title: 'Hello, Vue',
      bindedId: 'titleId',
      bindedClass: 'title'
    }
  }
}).mount('#app');
</script>

<style>
  .title {
    color: red;
  }
</style>
```

아래와 같이 코딩하면

```html
<div id="app">
  <h1>{{ title }}</h1>
</div>
```

실제 결과는 요렇게

```html
<div id="app">
  <h1>Hello, Vue</h1>
</div>
```


## 속성 바인딩

`Vue`는 `v-` 로 시작하는 지시어를 제공한다. 
`HTML속성`에 바인딩을 하기 위해서는 아래와 같이 `v-bind` 지시어와 함께 `HTML속성`을 사용한다. 

```
v-bind:id
v-bind:class
...
```

짧게 아래와 같이 써도 무방

```
:id
:class
...
```

코딩은 이렇게하고 `Vue` 엔진에 의해 컴파일?이 되면

```html
<div id="app">
  <h1 v-bind:id="bindedId" v-bind:class="bindedClass">{{ title }}</h1>
</div>
```

실제 결과는 이렇게 나온다. 

```html
<div id="app">
  <h1 id="titleId" class="title">Hello, Vue</h1>
</div>
```