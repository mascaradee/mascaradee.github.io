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


## 배열 v-for

배열 기반의 리스트를 렌더링하기 위해  v-for를 사용한다. 


`v-for="(item, index) in items"`  
`v-for="(item, index) of items"`  


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


## 객체와 사용하는 v-for

객체와 사용할 때는 기본적으로 Object.keys()도 같이 호출이 된다. 

`v-for="(value, key, index) in myObject"`
