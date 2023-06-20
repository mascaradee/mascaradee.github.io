---
layout: post
date: 2022-12-01 09:05:00 +0900
title: '[javascript] 플러그인'
categories:
  - javascript
tags:
  - vue
  - plugins
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue plugin](https://vuejs.org/guide/reusability/plugins.html)


## 플러그인

플러그인은 뷰에 앱 수준 기능을 추가하는 독립적인 코드다. 아래와 같이 플러그인을 설치한다.  

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* optional options */
})

```

플러그인은 `install()`메서드를 가진 객체 혹은 설치기능자체로 작동하는 함수다. 설치함수는 `app.use()`에 전달된 추가 옵션이 있는경우 그것과 함께 앱 인스턴스를 전달받는다. 

```js
const myPlugin = {
  install(app, options) {
    // configure the app
  }
}
```

플러그인은 적용범위가 엄격하게 제한되어 있지 않지만 일반적으로 다음을 포함한다. 

1. `app.component()`메소드와 `app.directive()`메소드를 이용해 하나 혹은 여러개의 전역컴포넌트나 커스텀 지시어를 등록한다. 
2. `app.provide()`메소드를 호출하여 주입가능한 자원을 만든다. 
3. 전역인스턴스프로퍼티 혹은 메소드를 `app.config.globalProperties`에 연결하여 추가한다. 
4. 뷰라우터 같은 일부 조합을 수행해야 하는 라이브러리

