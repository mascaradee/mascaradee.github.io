---
layout: post
date: 2022-09-15 09:05:00 +0900
title: '[vue] base todo'
categories:
  - vue
tags:
  - tutorial
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue tutorial](https://vuejs.org/tutorial/#step-1)  


## 텍스트 바인딩

`{{ 텍스트, 혹은 자바스크립트 표현 }}`

## 속성 바인딩

`v-bind:HTML속성`
`:HTML속성`

## 이벤트 바인딩

`v-on:이벤트종류`
`@이벤트종류`

## 폼 바인딩

`v-model:`

원래 `:value="text" @input="onInput"`과 같이 쓰는 텍스트 바인딩과 이벤트 바인딩을 한 방에 해결하는 방법
input, checkbox, radio buttons, select dropdowns의 값 변경을 감지하여 DOM에 자동 적용할 수 있다. 
요소의 value 속성을 변경한다.

## 조건절

`v-if v-else`

## 리스트

`v-for :key`

## computed property

`computed:{}`

## ref

DOM 요소에 직접 접근을 해야 할 때 사용한다.

`ref`
`this.$refs`


## hook

컴포넌트의 라이프사이클의 특정 시점에 원하는 콜배을 등록 할 수 있다.

### mounted

### created

### updated


## watchers

프로퍼티가 변경되면 실행되는 콜백함수로 프로퍼티명과 같은 이름으로 함수를 만든다. 

`watch:{}`


## components

- `import 추가할 컴포넌트명 from '컴포넌트파일경로'`
- 스크립트에 `components: { 추가할 컴포넌트명 }` 추가
- 템플릿의 원하는 위치에 `<추가할 컴포넌트명 />` 추가


## props

부모컴포넌트로부터 입력값을 자식 컴포넌트에서는 props로 받을 수 있다. 

부모는 템플릿의 속성바인딩으로 : `:프로퍼티명="전달할 값 이름"`  
자식은 : 스크립트 `props:{}` 속성으로 


```
// 부모컴포넌트

<script>

data() {
  return {
    greeting: 'Hello, this is passed by parent'
  }
}

</script>

<template>
  <ChildCompo :msg="greeting" />
</template>
```

```
// 자식 컴포넌트
 props: {
    msg: String
  }
```

## Emits

자식컴포넌트에서 발생한 이벤트를 부모로 전달한다. 

자식: 스크립트에 `this.$emit(이벤트명, 파라미터)`  

```
<script>
export default {
  emits: ['response'], // 이벤트 선언
  created() {
    this.$emit('response', 'hello from child') // 부모 컴포넌트로 이벤트 전달 
  }
}
</script>
```



부모: 템플릿에 `<ChildComp  @이벤트명="(파라미터) => {}" />`

```
<template>
  <ChildComp  @response="(m) => childMsg = m" />
  <p>{{ childMsg }}</p>
</template>
```

## Slots

부모가 자식에게 템플릿을 전달할 수 있다. 
이거 props랑 차이는??? 아마도 props는 데이터만, slots는 템플릿에서 나타낼 수 있는 것는 다?


부모: 템플릿에서 자식 컴포넌트에 html 혹은 데이터 등을 세팅하면(어디까지 가능한지는 좀 더 알아볼것)
```
<template>
  <ChildComp>
    <button>
      {{ msg }}  
    </button>
  </ChildComp>
</template>
```

자식: 템플릿에서 `<slot/>`으로 해당 내용을 전달 받을 수 있다. 부모로부터 아무것도 받지 않는 경우에는 대체 컨텐츠(Fallback content)로 구성할 수 있다. 

```
<template>
  <slot>Fallback content</slot>
</template>
```

