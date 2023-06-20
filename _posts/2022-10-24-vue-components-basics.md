---
layout: post
date: 2022-10-24 09:05:00 +0900
title: '[vue] components basics'
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
<!-- 모화면 -->
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

자식컴포넌트는 이벤트를 발생시켜서 부모컴포넌트와 통신을 할 수 있다.   
`@이벤트종류="$emit(함수명)"의 형식으로 자식컴포넌트에서 이벤트를 발생시켜 함수를 호출한다. 클릭 할 때 마다 `enlarge-text` 함수를 호출한다. 


```js
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

부모는 호출된 함수가 정의되어 있고 자식이 이벤트를 발생요청을 하면 해당 함수를 실행한다. `@enlarge-text="postFontSize += 0.1"`가 실행되어 자식컴포넌트의 버튼이 클릭될때마다 글자 크기가 커지게 된다. 당연하게도 자식 컴포넌트의 글자크기만 변경이 된다. 

```js
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}

<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
    @enlarge-text="postFontSize += 0.1"
   />
</div>
```

### 슬롯으로 컨텐츠 전달

props를 통해 자바스크립트 값을 전달할 수 있는 것처럼 `slot`을 통해  template 자체도 전달을 할 수 있다. `<AlertBox>`템플릿을 통째로 `<slot />`위치에 전달해 렌더링 할 수 있다. 

```html
<AlertBox>
  Something bad happened.
</AlertBox>
```

```js
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

### 동적 컴포넌트 사용 속성, `:is`

탭화면처럼 컴포넌트를 동적으로 변경해야 하는 경우가 있다. `:is`를 사용하면 컴포넌트의 동적 사용이 가능해진다.

`currentTab` 값이 변경이 되면 컴포넌트가 변경된다.   

`<component :is=컴포넌트명 혹은 실제 임포트된 컴포넌트 객체></component>`  

```js
<component :is="currentTab"></component>
``` 

`:is`로 여러개 컴포넌트가 변경되면 비사용되는 컴포넌트는 unmounted가 되는데 `<KeepAlive>`컴포넌트로 강제로 살아있는? 상태로 유지할 수 있다.


### DOM 템플릿 파싱 시 주의사항

아래 주의 사항은 DOM에 직접 템플릿을 작성하는 경우에만 해당한다.   

#### 대소문자 변환 유의

HTML 태그와 속성은 대소문자를 구분하지 않으므로 브라우저는 대문자는 모두 소문자로 변환한다.  
그말인즉슨, DOM 템플릿을 사용할 때   
- 파스칼케이스 컴포넌트명과 
- 카멜케이스 prop명 또는 `v-on` 이벤트명은   
HTML에서는 모두 케밥케이스로 변환된다는 말이다.  

```js
// camelCase in JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

#### 셀프 클로징 태그 생략 불가

뷰는 `/>`를 모두 클로징이라고 인식하지만 DOM 템플릿은 클로징 태그를 꼭 작성해야 한다. HTML 스펙상 `<input>`, `<img>`과 같은 일부를 제외하고는 클로징 태그를 생략할 수 없다. 

```html
<my-component></my-component>
```


#### 요소 배치 제한

`<ul> - <li>`, `<ol> - <li>`, `<table> - <tr>`, `<select> - <option>` 처럼 HTML 요소 중 짝궁처럼 같이 써야 하는 하위요소들이 있다.  
`<table>`은 `<tr>`태그를 찾지만 아래와 같이 컴포넌트를 사용하게 되면 오류가 발생할 수도 있다. 

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

이럴 때는 직접 컴포넌트를 선언하지 말고 `:is`를 사용하면 해결된다. 만약 네이티스 HTML요소에 `is` 값을 사용하려면 꼭 `vue:` 프리픽스로 뷰 컴포넌트임을 알려줘야 한다. 

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```