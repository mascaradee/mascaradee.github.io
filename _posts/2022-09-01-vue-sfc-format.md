---
layout: post
date: 2022-09-01 10:05:00 +0900
title: '[vue] 포맷 '
categories:
  - vue
tags:
  - sfc

---

* Kramdown table of contents
{:toc .toc}

## 참조

[Vue 포맷](https://vuejs.org/guide/scaling-up/sfc.html)

## Vuejs 포맷

### SFC Single-File-Component 

`SFC(Single-File-Component)`포맷은 하나의 파일에 템플릿, 로직, 스타일로 구성되며, 빌드툴을 사용가능한 `Vue` 프로젝트에서  `.vue`라는 파일명으로 만들어진다.


```html
<template>
  <h1>{{ greeting }}</h1>
</template>

<script>
  export default {
    data() { 
      return {
        greeting: 'Helloo'
      }
    },
    method: { },
    mounted() { }
  }
</script>

<style>
h1 {
  color: red;
}
</style>
```


물론 `html` 내에 `vue`를 임포트하여 사용할 수도 있다. 

```html
<div id="app">
  <h1>Make me dynamic!</h1>
</div>

<script type="module">
import { createApp } from 'vue'

createApp({
  // component options
  // declare some reactive state here.
}).mount('#app')
</script>

<style>
h1 {
  color: red;
}
</style>
```


### SFC의 장점

- `HTML, CSS, javascript` 문법을 사용해서 컴포넌트를 모듈화할 수 있다. 
- 연관되어 있는 것끼리 모아둔다. 
  - 기존 웹 개발에서는 `HTML, CSS, javascript` 파일타입 별로 분리하는 것이 선호되었지만 그것보다는 같은 관심사(?)로 연관있는 템플릿, 로직, 스타일 구성요소끼리 한 파일 내에 묶어 놓는 것이 유지보수가 용이하다고 판단하고 있는듯
- 미리 컴파일된 템플릿을 사용하여 비용절감 가능
  - `Static Site Generation` 정적 사이트 생성기를 의미하는 듯
- 컴포넌트 범위에만 적용되는 `CSS`
  - `scoped`속성을 통해 적용범위를 제한하여 다른 컴포넌트에는 영향을 미치지 않는다.
  - 자식컴포넌트의 루트요소나 `:deep()`을 이용하면 스타일 적용범위를 확장할 수는 있다. 
- `<script setup>` 속성을 통해 `Composition API` 사용 가능하다.
- 템플릿과 스크립트를 교차 분석하여 더 많은 컴파일 시간 최적화를 할 수 있다. 
- 자동완성이나 타입체크 등 템플릿 표현을 위한 IDE 보조를 받을 수 있다. 
- 즉시 사용 가능한 핫 모듈 교체(`HMR`) 지원 가능하다.
