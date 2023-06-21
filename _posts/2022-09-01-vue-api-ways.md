---
layout: post
date: 2022-09-01 10:05:00 +0900
title: '[vue] API방식'
categories:
  - vue
tags:
  - optionsAPI
  - compositionAPI

---

* Kramdown table of contents
{:toc .toc}

## 참조

[Vue 포맷과 API방식](https://vuejs.org/guide/introduction.html#api-styles)


## API 방식

`Options API` 방식과  `Composiotn API`방식 2가지로 사용할 수 있다. `Options API`방식은 `Composiotn API`로부터 구현된 것으로 `Composiotn API`는 `Options API`보다 덜 형식적이고 좀 더 자유롭게 사용할 수 있다. 보통은 복잡하고 큰 프로젝트에서 사용하는 듯.

### Options API 방식

`data, methods, mounted` 컴포넌트 옵션객체를 직접 이용해서 컴포넌트 로직을 정의한다. 

```html
<script>
  export default {
    // data()메소드에서 리턴된 프로퍼티 = this 로 반응 상태다.
    data() {
      return {
        count: 0
      }
    },
    // 이벤트리스너로 사용할수 있다.
    method: {
      increment() {
        this.count++
      }
    },
    // 컴포넌트가 마운트되면 호출된다.
    mounted() {
      console.log(`The initial count is ${this.count}`)
    }
  }
</script>
<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### Composition API 방식

`import`된 `API 함수`를 이용해서 컴포넌트 로직을 정의한다. 전형적으로 `<scitpt setup>`을 이용한다. `setup` 속성으로 미리 정의 된 `imports, top-level변수, 함수`를 사용할 수 있게 된다. 

```html
<script setup>
  import { ref, onMounted } from 'vue'

  const count = ref(0)

  function increment() {
    count.value++
  }

  onMounted(() => {
    console.log(`The initial count is ${this.count}`)
  })
</script>
<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```