---
layout: post
date: 2022-09-01 10:05:00 +0900
title: '[vue] 기본 샘플'
categories:
  - vue
tags:
  - createApp
  - data
  - mounted
  - mustaches
---

* Kramdown table of contents
{:toc .toc}

## 참조

[Vue 기초 튜토리얼](https://vuejs.org/tutorial/#step-2)

## 기본 구조

`Vue`의 핵심 기능 중 하나는 선언적 렌더링이다. 자바스크립트 상태가 변경되면 자동으로 연동되어 있는 `HTML`에도 업데이트가 된다.   

`HTML`에서 `Vue`가 제공하는 컴포넌트를 이용하기 위해서 임포트가 필요하다. `{}` 안에 다수의 컴포넌트를 임포트 할 수 있다. 

```html
<script>
  import { createApp } from 'vue'
</script>
```

`reactive state`가 변경될 때마다 `HTML DOM`과 동기화를 사용하기 위해서 `Vue`가 제공하는 컴포넌트를 사용해야 한다. `createApp()`에 전달되는 객체가 바로 컴포넌트다. 

`createApp({ 컴포넌트 })`

```html
<script>
  import { createApp } from 'vue'

  createApp({
    // 컴포넌트
  });
</script>
```

`.mount() 메소드`를 이용해서 컴포넌트를 마운트할 `DOM`요소를 지정해 준다. 

`.mount('컴포넌트를 적용할 DOM요소')`

```html
<script>
  import { createApp } from 'vue'

  createApp({
    // 컴포넌트
  }).mount('#app');
</script>

<div id="app">
  <h1>Hello, world</h1>
</div>
```

`data() 컴포넌트 옵션`을 이용해서 `reactive state`를 선언해보자. message프로퍼티는 이제 동적으로 반응할 수 있다. 스크립트에서 변경이 되면 자동으로 `HTML요소`에도 반영이 된다. 

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello, mignonwhale'
      }
    }
  }).mount('#app');
</script>

<div id="app">
  <h1>Hello, world</h1>
</div>

```

`data()`의 `message 프로퍼티`를 `HTML`에 적용하기 위해서는 `{{ }}(mustaches syntax)`를 사용한다. 이제 기존 `Hello, world`를 동적으로 변경할수 있게 되었다. `{{}}` 내부는 자바스크립트 영역이라고 보면 된다. 

`{{ data에서 선언한 프로퍼티명 }}`

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello, mignonwhale'
      }
    }
  }).mount('#app');
</script>

<div id="app">
  <h1> {{ message }} </h1>
</div>

```