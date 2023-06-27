---
layout: post
date: 2023-06-27 09:05:00 +0900
title: '[vue] vue-typescript 프로젝트에서 vue 모듈을 찾을 수 없을 때'
categories:
  - vue
tags:
  - vue
  - typescript
  - d.ts
---

* Kramdown table of contents
{:toc .toc}


## 문제

뷰와 타입스크립트를 같이 사용하는 프로젝트에서 `.vue` 모듈을 인식하지 못하여 아래와 같은 메시지가 나온다.   

`Cannot find module './App.vue' or its corresponding type declarations`

```ts
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue' // Error: Cannot find module './App.vue' or its corresponding type declarations

createApp(App).mount('#app')

```

## 원인

타입스크립트가 `App.vue`의 타입을 알수 없어 생기는 문제


## 해결

`.vue` 모듈에 대한 타입을 정의하는 파일을 생성해주면 해결된다. `src` 아래 `shims-vue.d.ts` 파일명으로 생성한다. 
`shims-vue.d.ts` 파일은 `Vue.js`와 `TypeScript`를 함께 사용할 때 타입 정의 파일을 선언하기 위한 관례적인 이름이다. 
`shims`는 특정한 환경에서 다른 환경과의 호환성을 제공하기 위해 사용되는 코드 조각을 의미한다. 

```ts
// 파일명: shims-vue.d.ts
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
```