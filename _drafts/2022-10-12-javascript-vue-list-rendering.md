---
layout: post
date: 2022-10-12 09:05:00 +0900
title: '[javascript] vue list rendering'
categories:
  - javascript
tags:
  - vue
  - list
  - rendering
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 리스트 렌더링 - `v-for`](https://vuejs.org/guide/essentials/list.html)


## v-for

반복이 가능한 배열 기반의 리스트를 렌더링하기 위해  v-for를 사용한다.


- 프로퍼티 사용: `v-for="(item, index) in items"`  
- 속성값 사용: `v-for="item of items"`  
- 숫자범위 사용: `v-for="n in 10"`  
  - 인덱스 0이 아닌 숫자 1부터 시작함에 유의
- 객체 사용:  `v-for="(value, key, index) in myObject"`


items는 리스트원본을 의미하고 item은 배열의 한 요소 아래 예시에서는 { message: 'Foo' }를 의미한다. 물론 별칭이므로 이름은 다른것으로 바꿔도 무방하나 구조는 유지해야한다. 

```js
data() {
  return {
    parentMessage: 'Parent',
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}

```

```js
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>

```

v-for 내에서는 템플릿표현식으로 부모 프로퍼티도 접근이 가능한데 이건 자바스크립트와 마찬가지. 요런식으로 렌더링 된다. 

```
* Parent - 0 - Foo
* Parent - 1 - Bar
```

구조분해할당으로 사용할 수 있다. 

```js
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

### 구조분해할당 참조

[구조분해할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)



## <template>에  v-for 사용

v-if와 마찬가지로 여러개 요소에 반복적으로 뭔가를 적용해야 할때 <template>에 v-for를 사용 할 수 있다. items의 프로퍼티 개수만큼 2개의 <li>태그가 반복해서 렌더링 된다. 

```js
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## v-for와 v-if는 같은 요소에 쓰는 것이 좋지 않다

 v-if의 암묵적인 우선순위가 더 높아 v-for와 v-if는 같은 요소에 동시에 적용하지 않는 것이 좋다. v-if 조건에 따라 변수에 접근이 불가능할 수가 있기 때문이다. 


```js
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

v-if가 먼저 평가되어 렌더링되어야 하는데 todo의 정의는 아직 평가되기 전인 v-for 안에 있다. 따라서 정의되지 않은 todo를 사용하 에러가 발생한다. 

```js
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## key 사용법

객체의 key와는 달리 리스트 내부의 변경이 일어났을 때 DOM요소를 변경하는 것 대신 이걸 이용하는 듯 한데 이해 안감??

기본적으로 v-for를 이용할때 key를 사용하는게 성능향상에는 도움이 된다. key는 원시타입으로 바인딩해야한다. 문자열이난 숫자타입으로 
객체는 불가 

리스트의 순서가 변경이 되었을 때 이미 렌더링이 된 DOM을 재 렌더링 하지 않고 값만 바꿔치기 한다. 이 때문에 단독으로 사용했을 때는 문제가 되지 않지만 하위요소가 있다면 같이 값이 변경되지 않는 상황이 발생한다. 

변경사항 같이 적용되어야 하는 요소의 그룹핑을 위한 장치인듯.


TODO


```js
<script>
export default {
  data() {
    return {
     list: ['a', 'b', 'c'], 
    }
  },
  methods: {
    shift() {
      this.list.push(this.list.shift());
    }
  }
}
</script>

<template>
  <button type="button" @click="shift">리스트변경하기</button>
  <ul>
    <li v-for="item in list">
      {{ item }} <input type="number"/>개
    </li>
  </ul>
</template>
```

버튼을 누를때마다 리스트의 순서는 변경된다. 하지만 input에 넣은 숫자는 그대로. 이것떄문에  key를 사용한다 같이 이동시키기 위해서 

```js
<script>
export default {
  data() {
    return {
     list: ['a', 'b', 'c'], 
    }
  },
  methods: {
    shift() {
      this.list.push(this.list.shift());
    }
  }
}
</script>

<template>
  <button type="button" @click="shift">리스트변경하기</button>
  <ul>
    <li v-for="item in list">
      {{ item }} <input type="number"/>개
    </li>
  </ul>
</template>
```

이때 :key 속성을 사용하면 li와 input 태그를 한번에 묶어서 이동시킬수 있다. 단, 자식 component나 다른 관계가 없을때만 적용이 된다. 

```js
<li v-for="item in list" :key="item">
  {{ item }} <input type="number"/>개
</li>
```

[참고](https://goodteacher.tistory.com/525)

