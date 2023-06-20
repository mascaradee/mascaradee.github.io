---
layout: post
date: 2022-11-28 09:05:00 +0900
title: '[javascript] 커스텀 지시어'
categories:
  - javascript
tags:
  - vue
  - directives
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue cusotm directives](https://vuejs.org/guide/reusability/custom-directives.html)


## 커스텀 지시어 (Custom Directives)

코드 재사용성을 위한 2가지 방식으로 컴포넌트와 컴포지션 API의 컴포저블(Composables) 방식이 있다. 컴포넌트가 주요 구성 요소임에 반해 컴포저블은 상태저장로직을 재사용하는데 중점을 둔다. 반면에 커스텀 지시어는 낮은 레벨의 DOM 접근에 관련된 로직을 재사용하기 위해 사용한다.   
커스텀 지시어는 컴포넌트와 비슷하게 라이프사이클 훅을 포함한 객체로 정의된다. 훅은 지시어에 바인딩된 요소를 받는다. 

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // enables v-focus in template
    focus
  }
}
```

```html
<input v-focus />
```

페이지의 다른 곳이 클릭이 되지 않았다면 커서는 input 요소안에 포커싱되어 있을 것이다. 이 커스텀 지시어는 페이지 로드시에만 적용되는 `autofocus`보다 나은데, Vue에 의해 요소가 유동적으로 삽입되었을 때도 작동하기 때문이다. 컴포넌트와 비슷하게 커스텀 지시어는 템플릿에서 사용하기 위해서 선 등록이 되어야 한다. `directives`옵션을 사용하면 된다.  
역시 전역으로도 등록이 가능하다.   

```js
const app = createApp({})

// make v-focus usable in all components
app.directive('focus', {
  /* ... */
})
```

하지만 커스텀 지시어는 꼭 필요한 경우가 아니면 내장 지시어 `v-bind`를 사용하는 것이 더 추천한다. 내장 지시어가 더 효율적이고 서버렌더링 친화적이기 때문이다. 

## 지시어 훅

```js
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode, prevVnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {}
}
```

- `el`: 지시어에 바인딩된 요소
- `binding`: 객체형태로 값, 이전값(beforeUpdate, updated에서만 사용가능), 전달인자, 식별자, 인스턴스, 지시어정의객체를 가진다. 
- `vnode`: 바인딩된 요소를 나타내는 기본 vnode
- `prevNode`: 이전 vnode (beforeUpdate, updated에서만 사용가능)  
  
```html
<div v-example:foo.bar="baz">
```

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* value of `baz` */,
  oldValue: /* value of `baz` from previous update */
}
```

## 함수 축약형으로 사용

커스텀 지시어를 함수로 정의하면 `mounted`나 `updated` 때 별다른 훅이 없어도 같은 동작을 한다.  

```html
<div v-color="color"></div>
```
```js
app.directive('color', (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value
})
```

## 객체 리터럴 전달

지시어는 자바스크립트 객체 리터럴을 이용하야 여러개의 값을 전달할 수 있다. 지시어는 모든 자바스크립트 표현식을 가질 수 있다. 


```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## 컴포넌트에서 지시어 사용

커스텀 지시어는 컴포넌트의 최상단 노드(root node)에 적용된다. 여러개 `root node`를 가지고 있는 컴포넌트에서는 커스텀 지시어는 무시되고 경고가 뜬다. 속성과 다르게 지시어는 `v-bind="$attrs`를 이용해 다른 요소를 전달 할 수 없다. 보편적으로 컴포넌트에서 커스텀 지시어는 권장되지 않는다.  

```html
<MyComponent v-demo="test" />
```

```html
<!-- template of MyComponent -->

<div> <!-- v-demo directive will be applied here -->
  <span>My component content</span>
</div>

````
