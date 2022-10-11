---
layout: post
date: 2022-10-11 09:05:00 +0900
title: '[javascript] vue conditional rendering'
categories:
  - javascript
tags:
  - vue
  - rendering
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 조건절](https://vuejs.org/guide/essentials/conditional.html)


## 조건절

조건절에 사요하는 지시어는 아래와 같다. 사용법은 다른 언어와 비슷하게 참값일때만 렌더링된다. 

- `v-if`
- `v-else`
- `v-else-if`

요소에 사용할 수 있다. 

```js
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```


### 템플릿에 사

여러요소에 조건적인 렌더링이 필요하다면 템플릿태그에 v-if를 사용하면 된다. 

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

