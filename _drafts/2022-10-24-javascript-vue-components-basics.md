---
layout: post
date: 2022-10-24 09:05:00 +0900
title: '[javascript] vue components basics'
categories:
  - javascript
tags:
  - vue
  - components
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 컴포넌트 기본](https://vuejs.org/guide/essentials/component-basics.html)
[Vue와 웹 컴포넌트](https://vuejs.org/guide/extras/web-components.html)


# 컴포넌트 기본

## 컴포넌트 정의하기

뷰 컴포넌트는 한 파일에 각 컴포넌트를 정의해서 사용하는데 이것을 SFC, Single-File Component라 한다. 

컴포넌트를 아래와 같이 정의하면

```js
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

뷰가 즉석에서 자바스크립트 객체로 변환해 준다. 

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```

## 컴포넌트 사용하기 

다른 파일에 정의되어 있는 컴포넌트를 가져와 사용할 수 있다. import로 가져올 소스 경로를 알려주고 components 속성으로 해당 소스를 컴포넌트로 등록을 한다. 그리고 template에 추가할 컴포넌트의 위치를 지정해 준다.   
전역 컴포넌트의 경우는 import 없이 사용할 수 있다.  


```js
<script>
import ButtonCounter from './ButtonCounter.vue' // 이 경로의 소스를 가져와 사용하겠다. 위에서 정의한 소스

export default {
  components: { // 컴포넌트 등록: 불러온 소스의 내용을 컴포넌트로 사용하겠다.
    ButtonCounter
  }
}
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter /> // 이 위치에 불러온 컴포넌트를 넣겠다. 
</template>

````

컴포넌트는 몇번이고 원하는 만큼 재사용할 수 있다. 단, 각각의 컴포넌트는 같은 모양이지만 별도의 개체로 작동한다. 3개의 동일 컴포넌트를 사용하지만 각 버튼의 숫자는 클리할 때마다 각자 카운팅이 된다. 그것은 컴포넌트를 사용할 때머더 새 인스턴스가 만들어지기 때문이다.

```js
<h1>Here are many child components!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

SFC 상에서 자식컴포넌트는의 태그명은 네이티스 HTML요소와 구분할 수 있도록 파스칼케이스 즉, 단어별 첫자는 대문자 형태로 쓰길 추천한다.  
컴포넌트들이 컴파일 된 결과는 아래와 같다. HTML의 태그는 대소문자를 가리지 않지만 뷰는 컴파일하면서 대소문자에 따라 케밥케이스로 변경한다. 

```html
<!-- if this template is written in the DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

## props 전달하기

틀은 유지한채 데이터만 바꾸기 원한다면 props를 사용한다. props는 컴포넌트에 등록할 수 있는 사용자 정의 속성으로 부모컴포넌트에서 자식컴포넌트로 데이터를 전달 살때 사용한다. 

```js
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

prop 속성으로 값이 전달하면 자식 컴포넌트 인스턴스의 프로퍼티로 받게 된다. 자식컴포넌트에서는 `this`로 그 값에 접근한 수 있다. props는 제한 없이 사용할 수 있다.  

```html
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

보통 실무에서는 동일 컴포넌트를 반복하기 보다는 배열로 값을 전달한다. 

```js
<!-- BlogPost.vue -->
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}
```

```html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

### 이벤트 수신하기
