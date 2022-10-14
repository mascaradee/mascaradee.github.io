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

vue가 v-for가 적용되어 있는 리스트를 변경할때 기본적으로 제자리패치 전략을 이용한다. 리스트 항목의 순서에 변경이 있는 경우에 DOM요소를 각 항목의 순서에 맞게 이동시키는 것 대신 Vue는 각 요소를 제자리에서 패치하고 특정 인덱스에서 렌더링되어야 하는 내용을 확인한다.  
즉, 리스트의 순서가 변경이 되었을 때 이미 렌더링이 된 DOM을 재 렌더링 하지 않고 값만 바꿔치기 한다. 이 때문에 단독으로 사용했을 때는 문제가 되지 않지만 하위요소가 있다면 같이 값이 변경되지 않는 상황이 발생한다. 이를 방지하기 위해 사용하는 것이 :key다.  
변경사항 같이 적용되어야 하는 요소의 그룹핑을 위한 장치라고 생각하면 쉽다.   

기본적으로 v-for를 이용할때 key를 사용하는게 성능향상에는 도움이 된다. key는 문자열이나 숫자타입의 원시타입으로 바인딩해야 하고 객체는 불가하다. 


참고로 :key는 객체의 key와는 전혀 상관없음에 유의한다. 


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

버튼을 누를때마다 리스트의 순서는 변경된다. 하지만 input에 넣은 숫자는 그대로. 

```js
<script>
export default {
  data() {
    return {
     list: ['a', 'b', 'c'], 
    }
  },
  methods: {
    myShift() {
      this.list.push(this.list.shift());
    }
  }
}
</script>

<template>
  <button type="button" @click="myShift">리스트변경하기</button>
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



## 컴포넌트에 v-for 사용

컴포넌트에 v-for 사용할수는 있으나 컴포넌트는 독립된 스코프를 가지고 있으므로 데이터는 자동으로 넘어가지 않는다. 데이터를 넘기기 위해서는 pros를 이용해야 한다. 

TBC


## 배열을 변경하는 메소드

배열을 변경하는 메소드 중에는 기존 배열에 변경사항을 적용해서 그래로 돌려주는 것도 있고 

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()


filter(), concat(), slice()와 같이 기존 배열을 기준으로 조건에 맞는 새로운 배열을 만들어서 반환하는 것도 있다. 이 메소드를 이용할 때는 기존 배열에 새로운 배열을 할당해 줘야 한다.

왜냐하면 Vue는 배열이 변경될때마다 DOM을 다시 만들지 않고 최대한 재사용하려고 구현되어 있기 때문이다. 따라서 기존 배열에 변경된 배열로 대체해 주는 것이 효율적인 방식이라고 할 수 있다. 

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```