---
layout: post
date: 2022-10-27 09:05:00 +0900
title: '[vue] component registration'
categories:
  - javascript
tags:
  - vue
  - component
  - registration
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 컴포넌트 심화](https://vuejs.org/guide/components/registration.html)


# 컴포넌트 등록

뷰가 템플릿을 만나게 됐을때, 어디에 구현체가 있는지 알게 하기 위해서 컴포넌트 등록이 필요한다. 전역과 지역 2가지 등록 방법이 있다. 

## 전역 컴포넌트 등록

`app.component()`메소드로 전역 컴포넌트로 등록할 수 있다. 


```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // the registered name
  'MyComponent',
  // the implementation
  {
    /* ... */
  }
)
````

SFC 방식을 사용한다면 `.vue`파일을 임포트하면 된다. `app.component()`는 체인도 가능한다. 

```js
import MyComponent from './App.vue'

app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

전역으로 등록된 컴포넌트는 어떠한 컴포넌트의 템플릿에서 사용될 수 있다. 심지어 중첩된 내부컴포넌트에서도 사용 가능하다. 

```html
<!-- this will work in any component inside the app -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

## 로컬 컴포넌트 등록

전역등록은 편하지만 단점도 있다.

1. 사용하지 않는 컴포넌트도 계속 유지된다. 
2. 규모가 큰 어플리케이션에서 덜 명확한 의존관계를 만든다. 부모가 자식컴포넌트의 구현체를 찾기 어렵게 한다. 전역변수를 너무 많이 사용해서 유지보수를 어렵게 하는 것과 비슷하다. 

로컬로 등록하면 유효범위는 그 컴포넌트에 한정되어 있다. 더 명확한 의존관계를 만들어 불필요한 코드를 줄일 수 있다. 

`components` 옵션으로 로컬 등록을 한다. 

```js
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

`components`객체의 키는 등록될 컴포넌트의 이름이다. 값은 컴포넌트 구현체를 포한할것이다. 위 예시는 ES2015 문법을 이용, 축약 버전이다. 실제는 아래와 같다. 

```js
export default {
  components: {
    ComponentA: ComponentA // 컴포넌트명: 컴포넌트 구현체(임포트명)
  }
  // ...
}
```

로컬 컴포넌트는 하위컴포넌트들에서 사용할 수 없다. 


## 컴포넌트 명명규칙

기본적으로 컴포넌트는 파스칼케이스(각단어 첫자 대문자)로 명명한다. 

1. 파스칼케이스가 유효한 자바스크립트 식별자다. 자바스크립트에 컴포넌트 임포트나 등록을 쉽게 만든다. IDE에서 자동완성에도 도움을 준다. 
2. 템플릿에서 네이티브 HTML 요소인지 뷰 컴포넌트인지 구분할 수 있게 한다.

SFC나 문자열 템플릿에서 권고되지만 DOM 템플릿에서 파스칼케이스는 사용이 불가하므로 주의해야한다.

다행히 뷰가 파스칼케이스로 등록된 컴포넌트는 케밥케이스로 자동 변환해서 HTML에 적용해 준다. 