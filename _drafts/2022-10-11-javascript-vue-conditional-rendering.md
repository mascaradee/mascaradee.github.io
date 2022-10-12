---
layout: post
date: 2022-10-11 09:05:00 +0900
title: '[javascript] vue conditional rendering'
categories:
  - javascript
tags:
  - vue
  - conditional
  - rendering
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 조건적 렌더링 - v-if, v-show](https://vuejs.org/guide/essentials/conditional.html)


## 조건구문 v-if

조건절에 사용하는 지시어는 아래와 같다. 사용법은 다른 언어와 비슷하게 참값일때만 렌더링된다. 

- `v-if`
- `v-else`
- `v-else-if`

요소에 사용할 수 있다. 

```js
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```


여러요소에 조건적인 렌더링이 필요하다면 템플릿태그에 v-if를 사용하면 된다. 

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```



## 스타일 조건구문 v-show

v-if와 비슷하게 참이면 표시된다. 다만 v-if는 참값이 아닌 경우 렌더링이 되지 않지만 v-show는 항상 렌더링 되고 토글에 따라 display:none /block 상태만 변경되는것. 즉, css 요소에만 적용이 된다. 

```js
<h1 v-show="ok">Hello!</h1>
```


## v-if vs v-show

- v-if: 최초 렌더링 시 참값이 아니면 렌더링이 안되지만 토글비용은 더 높다
- v-show: 무조건 렌더링이 되지만 CSS 기반으로 토글이 된다. 렌더링비용이 더 높다. 

따라서 토글을 더 많이 사용한다면  v-show를 런타임시 변화가 거의 없을것 같으면  v-if를 사용 하는 것이 더 낫다. 



## v-if vs v-for

같은 위치에 있다면 v-if가 우선
