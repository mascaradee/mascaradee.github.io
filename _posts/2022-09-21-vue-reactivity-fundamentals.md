---
layout: post
date: 2022-09-21 09:05:00 +0900
title: '[vue] reactivity-fundamentals '
categories:
  - vue
tags:
  - reactivity
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 반응성 기초](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)


# 반응성 기초

## reactive state 선언

Option API에서는 `data` 함수 옵션으로 컴포넌트 `reactive state`를 선언한다. 옵션들은 모두 객체를 돌려받는 함수형태여야 한다. 
`vue`가 컴포넌트 인스턴스를 생성하고 그 결과값을 객체로 넘겨주기 떄문이다. 
`this`를 이용해서 `data()` 내에서 선언된 프로퍼티를 사용할수 있다. 

`data()` 밖에서도 프로퍼티를 추가할 수 있지만 `reactive system`은 최초 인스턴스가 생성되었을때만 구성이 되므로 추가한 프로퍼티에는 reactive state를 사용할 수 없다. 

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {} // data()밖에서 선언된 프로퍼티는 reactive system에 들어가지 못한다. 
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```


$, _ 는 vue에서 사용하는 예약 접두사로 사용하지 말것 



##  메소드 선언

`methods` 객체 옵션으로 메소드를 추가할 수 있다. `this`값은 자동으로 methods 연결되어 컴포넌트 인스턴스를 참조하게 된다. 
이벤트리스너나 콜백에서도 `this`값이 올바르게 유지된다. `methods`옵션 내 화살표함수는 this를 사용할 수 없으므로 유의


```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // methods can be called in lifecycle hooks, or other methods!
    this.increment()
  }
}
```

<template>에서 methods에 접근할수 있다. 템플릿 내에서 대부분은 이벤트 리스터로 사용할 수 있다. 

```html
<button @click="increment">{{ count }}</button>
```


## DOM 업데이트 시기

상태를 변경하면 DOM은 자동으로 업데이트 되지만 항상 실시간으로 동기화되는것은 아니다. Vue는 얼마나 많은 상태변경을 했든 상관없이 변화를 감지하여 모아둔 다음 각 컴포넌트를 한번만 업데이트 한다.

상태변경 후 DOM 업데이트가 완료될 때까지 기다리기 위해 `nextTick()`함수를 사용할 수 있다.  

### Deep Reactivity

기본적으로 vue는 deeply reactive를 가지는데 이 말은 중첩된 객체과 배열의 변화도 감지 할 수 있다는 뜻
최상위 레벨에서의 변화만 감지할 수 있는 shallow reactive 객체를 만들 수도 있지만 많이 사용되지는 않는듯

### Stateful Methods

???




