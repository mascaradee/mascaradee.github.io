---
layout: post
date: 2022-11-16 09:05:00 +0900
title: '[vue] 비동기 컴포넌트'
categories:
  - vue
tags:
  - component
  - async
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue async components](https://vuejs.org/guide/components/async.html)


## 기본 사용법

### 뷰 함수 이용

`defineAsyncComponent`함수는 큰 앱을 작은 덩어리로 나누어 필요한 경우마다 서버통신을 하게 해준다. 


```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...load component from server
    resolve(/* loaded component */)
  })
})
// ... use `AsyncComp` like a normal component
````

`defineAsyncComponent`함수는 프로미스를 반환해 주는데 그것은 성공했을때 resolve 콜백을, 실패했을때 reject 콜백을 호출하도록 되어 있다. 


### ES module dynamic import 이용

대부분 이 방식을 이용하게 될 거고, 역시 프로미스를 반환한다.

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

`AsyncComp`는 래퍼 컴포넌트인데 실제 호출이 일어났을때만 페이지상에 렌더링이 된다. 또한 모든 props와 slots을 내부 컴포넌트로 전달하므로 비동기 래퍼를 사용하여 지연로딩(일시에 모든 자원을 로딩하는 것이 아닌 필요한 시점에 로딩하는 기술)을 달성하면서 원래 컴포넌트를 원활하게 교체할 수 있다. 

`app.component()`로 전역으로 등록해 사용할 수 있고, `defineAsyncComponent`로 로컬 등록이 가능하다. 


## 로딩과 에러 상태

