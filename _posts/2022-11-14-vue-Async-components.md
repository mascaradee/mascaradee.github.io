---
layout: post
date: 2022-11-14 09:06:00 +0900
title: '[vue] Async components'
categories:
  - vue
tags:
  - async
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue async components](https://vuejs.org/guide/components/async.html)


## 기본 사용법

### 뷰 함수 이용

`defineAsyncComponent`함수는 큰 앱을 작은 덩어리로 나누어 필요한 경우마다 서버통신을 하게 해준다.    

`defineAsyncComponent`함수는 프로미스를 반환해 주는데 그것은 성공했을때 resolve 콜백을, 실패했을때 reject 콜백을 호출하도록 되어 있다. 


```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...load component from server
    resolve(/* loaded component */)
  })
})
// ... use `AsyncComp` like a normal component
```

### ES module dynamic import 이용

대부분 이 방식을 이용하게 될 거고, 역시 프로미스를 반환한다. Vite와 webpack에서 아래 문법도 허용해준다. 그래서 SFC에서도 import를 사용할 수 있다.  

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

일반적인 컴포넌트처럼 비동기 컴포넌트도 글로벌로 등록하여 사용할 수 있다.   

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

물론 `defineAsyncComponent`를 이용해 로컬 컴포넌트로도 사용할 수 있다. 


```js
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

### defineAsyncComponent 추가 옵션

- loadingComponent: 내부 컴포넌트가 로드되는 동안 가장 먼저 노출되는 컴포넌트
- delay: loadingComponent가 나타나기까지 딜레이 되는 시간, 밀리세컨드 단위 - 너무 빠르면 깜빡거리는게 보일 수 있어서
- errorComponent: 서버에서 오류가 발생했을 때 reject 콜백에 의해 로드되는 컴포넌트
- timeout: 요청을 기다리는 시간으로 요청이 너무 올래 걸리면 이 시간만큼 대기 후, errorComponent를 노출한다.  


```js
const AsyncComp = defineAsyncComponent({
  // the loader function
  loader: () => import('./Foo.vue'),

  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```
