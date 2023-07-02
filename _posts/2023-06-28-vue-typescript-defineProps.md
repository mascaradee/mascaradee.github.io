---
layout: post
date: 2023-06-28 09:05:00 +0900
title: '[vue] defineProps with typescript'
categories:
  - vue
tags:
  - defineProps
  - typescript
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Composition API와 타입스크립트](https://v3-docs.vuejs-korea.org/guide/typescript/composition-api.html)


## Props 정의하는 방법

컴포지션 API + 빌드 (`<script setup>`) + 타입스크립트를 사용하는 경우 `props`의 타입을 정의하는 방법은 런타임기반 선언과 타입기반 선언 2가지 형태가 있다.

`defineProps<PropsOptions>(props?: PropsOptions): InferProps<PropsOptions>`  


## 런타임기반 선언

`defineProps({타입정의})`


전달받은 `props`를 정의할 수 있다. `type, default, required, validator, Function` 등의 옵션이 있어 적절히 사용하면 된다. 옵션 없이 `props명: 타입종류`로 간단하게 표기할수도 있고, 필요한 옵션들을 `props명: {옵션}` 형태로도 상세히 표시할 수 있다. 

자식컴포넌트에서 부모로부터 받을 `props`를 아래처럼 정의 해 놓는다. 부모에서 전달되지 않을 가능성이 있는 값은 `default` 옵션을 추가해 놓으면 안전하다. 

```html
// 자식 컴포넌트
<script setup lang="ts">

// 런타임 기반 선언
const props = defineProps({
  id: { type: String, required: true }, // wrapper type
  content: String,
  etc: { type: String, required: false, default: '기본값' },
  checked: Boolean
});
</script>

<template>
  <h1>Props 런타임 기반 선언 - 원시타입 + 기본값 설정</h1>
  <input type="checkbox" :checked="props.checked">
  <input type="text" :value="props.id">
  <input type="text" :value="props.content">
  <input type="text" :value="props.etc">
</template>
```

부모는 자식이 정의해 놓은 타입에 맞춰 `props`를 전달한다.    

```html
// 부모 컴포넌트
<script setup lang="ts">
import ChildItem from './ChildItem.vue';

const todo = { id: '1', content: 'test1', etc: '기타', checked: true }
</script>

<template>
  <ChildItem :id="todo.id" :content="todo.content" :checked="todo.checked"></ChildItem>
</template>
```


## 타입기반 선언

런타임기반보다 더 간단한 방식으로 제네릭 인자에 객체리터럴 혹은 인터페이스를 전달한다. 필수값으로 들어오지 않을 가능성이 있으면 `?` 옵션 표시를 해준다.   

`defineProps<{객체리터렬}>()`   

```html
<script setup lang="ts">
const props = defineProps<{
  id: string
  content: string,
  etc?: string,
  checked: boolean
}>();
</script>

<template>
  // 위와 동일
</template>
```

혹은 제네릭 인자에 인터페이스로 정의한 타입을 지정한다.  

`defineProps<{인터페이스}>()`   

```html
<script setup lang="ts">

interface Todo {
  id: string,
  content: string,
  etc?: string,
  checked: boolean
}

const props = defineProps<{ todo: Todo }>(); // 부모에서 todo라는 이름의 객체를 넘겨받을 예정

</script>

<template>
  <h1>Props 타입기반 선언 - 제네릭타입 인자로 인터페이스 전달</h1>
  <input type="checkbox" :checked="props.todo.checked">
  <input type="text" :value="props.todo.id">
  <input type="text" :value="props.todo.content">
  <input type="text" :value="props.todo.etc">
</template>
```

```html
<script setup lang="ts">
import ChildItem3 from './ChildItem3.vue';

const todo = { id: '1', content: 'test1', etc: '기타', checked: true }
</script>

<template>
  <ChildItem3 :todo="todo"></ChildItem3>
</template>
```


## 기본값 세팅

`<script setup>`에서 타입기반 선언을 사용할 때, 기본값은 `withDefaults()`를 이용해서 세팅할 수 있다. 런타임기반 선언은 옵션속성에 `default`가 있으니 그걸 사용하면 된다. 

```html
<script setup lang="ts">

interface Todo {
  id: string,
  content: string,
  etc?: string,
  checked: boolean
}

const props = withDefaults(defineProps<Todo>(), {
  id: '',
  content: '',
  etc: 'default value',
  checked: false
});;


</script>

<template>
  <h1>Props 타입기반 선언 - 기본값 설정</h1>
  <input type="checkbox" :checked="props.checked">
  <input type="text" :value="props.id">
  <input type="text" :value="props.content">
  <input type="text" :value="props.etc">
</template>

<style scoped></style>
```

그런데 부모에서 객체형태로 `props`를 넘기는 경우 기본값 설정은 잘 안됐다. 방법이 다른것인지 이건 TODO