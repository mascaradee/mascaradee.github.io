---
layout: post
date: 2022-10-21 09:05:00 +0900
title: '[javascript] vue template refs'
categories:
  - javascript
tags:
  - vue
  - template
  - refs
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 템플릿 Refs](https://vuejs.org/guide/essentials/template-refs.html)


# 템플릿 참조

직접적으로 DOM에 접근하기 위해서는 `ref`속성을 사용한다. `ref`를 사용하면 특정 DOM요소나 자식컴포넌트 인스턴스가 마운트 된 이후에 직접 참조할 수 있다.  `input`태그에 포커싱을 하거나 HTML요소에 써드파티 라이브러리를 초기화 하려는 경우에 유용하다. 

## 참조에 접근

컴포넌트가 마운트된 이후에 `this.$refs`로 참조 결과를 얻을 수 있다. 만약 템플릿 표현식으로 `$refs`로 접근하려 한다면 첫 렌더링에서는 null이 되는데 이는 첫번째 렌더링이 끝날 때까지(마운트 될때까지) HTML요소가 존재하지 않기 때문이다.

```js
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```


composition API 방식의 `setup()` 메소드 사용은 아래와 같이 

```js
<script>
export default {

  setup() {
    const input = ref(null)

    onMounted(() => {
      input.value.focus()
    })
  
    return{
      input
    }
  }
}
</script>
```

혹은 

```js
<script setup>
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>
```



## v-for에서 참조

`ref`가 `v-for`내에서 사용되면 결과값은 연관있는 요소가 포함되어 배열이 된다. 다면 순서는 보장할 수 없고 v3.2.25상위 버전에서만 사용 가능

```js
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

## 참조의 문자열 키 대신 함수 바인딩 

`ref`속성은 문자열 키 대신에 함수로 바인딩할 수 있고 컴포넌트가 업데이트 될때마다 호출이 되고 첫번째인자로 참조할 요소를 받는다. 
`:ref=콜백함수` 형태로 사용하는데 인라인 함수 대신 `methods` 속성에 정의해서 사용할 수도 있다. 

```html
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

## 컴포넌트 참조

`ref`는 자식 컴포넌트에서도 사용할 수 있고 이 때, 자식 컴포넌트의 인스턴스를 참조한다. 참조된 인스턴스는 자식컴포넌트의 `this`와 같고 부모 컴포넌트에서 자식 컴포넌트의 모든 프로퍼티와 메소드에 접근할 수 있다는 의미니다. 이것으로 부모와 자식간의 결합이 밀착되게 만들기 때문에 꼭 필요한 경우에만 참조를 사용해야 하고 대신 표준 `props`속성과 `emit`인터페이스를 먼저 사용하도록 해야 한다. 

```js
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child will hold an instance of <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

`expose`속성은 자식 인스턴스에 접근하는데 제약을 줄수 있다. 해당 속성에 포함된 것만 부모에서 접근할 수 있다. 

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```