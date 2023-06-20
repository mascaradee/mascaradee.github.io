---
layout: post
date: 2022-11-04 09:05:00 +0900
title: '[vue] component fallthrough attributes'
categories:
  - javascript
tags:
  - vue
  - fallthrough
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue fallthrough attributes](https://vuejs.org/guide/components/attrs.html)


## 속성 상속

fallthrough attributes란 컴포넌트로 전달되는 속성이나 `v-on` 이벤트리스너를 말한다. 단, 수신 컴포넌트의 `props` 또는 `emits`에 명시적으로 선언되지 않는 `class`, `style`, `id` 등이다. 

컴포넌트는 하나의 루트 노드로 렌더링이 된다. 이때 fallthrough attributes는 자동으로 루트 노드의 속성으로 추가된다. 


```html
<!-- 자식 MyButton 컴포넌트--> 
<button>click me</button>
```

위 컴포넌트를 부모에서 사용한다. 

```html
<!-- 부모 -->
<MyButton class="large" />
```

실제 렌더링은 아래와 같이 된다. 

```html
<button class="large">click me</button>
```

자식컴포넌트에서는 `class`를 부모에서 전달하는 것을 받는 `prop`으로 선언하지 않았지만 자동으로 추가가 되었다. 


### class 와 style 병합

만약 자식컴포넌트에 class와 style이 속성이 존재하면, 부모의 것과 병합이 된다. 

`class="btn large"`의 `btn`은 자식의 속성, `large`는 부모로부터 받은 속성이다. 


```html
<button class="btn large">click me</button>
```

### v-on 리스너 상속

v-on 이벤트 리스너에도 같은 규칙이 적용된다. 

```html
<MyButton @click="onClick" />
```

`click` 리스너는 부모컴포넌트에서 `<MyButton>`의 루트노드에  추가될 것이다. 그것은 `<button>`태그가 클릭되면 부모에 선언된 `onClick`메소드가 실행이 된다. 이때 만약 자식의 네이티브 `<button>`태그에도 `click`이벤트 리스너가 존재한다면 동시에 실행이 된다. 

### 중첩 컴포넌트 상속

 TBD


## 속성 상속 비활성화

`inheritAttrs: false`로 자동 상속을 방지 할 수 있다. 이것을 이용해서 루트노드 외 다른 요소에도 속성을 적용해야 할 때 사용할 수 있다.   
`$attrs`를 이용해 직접적으로 fallthrough attributes에 접근할 수 있다. 


```html
<span>Fallthrough attributes: {{ $attrs }}</span>
```

`$attrs`객체는 `props`난 `emits`옵션으로 선언되지 않은 모든 속성이 포함되어 있다.  

- `props`와 달리 자바스크립트 영역에서도 케밥케이스 형태를 유지하므로 접근은 `$attrs['foo-bar']`와 같이 접근을 해야 한다. 
- `v-on` 이벤트 리스너는 `$attrs.onClick`처럼 접근한다. 


자식 컴포넌트릉 아래처럼 `<div>`태그로 감싸준다. 

```html
<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>
```

우리는 루트노드인 `<div>`가 아닌 내부의 `<button>`에 fallthrough attributes를 적용하고 싶다. `inheritAttrs: false`와 `v-bind="$attrs"`를 이용하면 쉽게 해결.

```html
<script>
  export default {
     inheritAttrs: false
  }
</script>

<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

`v-bind`에 인자가 없으면 모든 요소에 전달받은 속성을 모두 적용한다는 것에 주의.


## 멀티 루트 노드에서의 속성 상속

단일 루트노드를 가진 컴포넌트와느 달리 멀티 루트노드를 가진 컴포넌트에는 fallthrough attributes가 자동으로 상속되지 않는다. `$attrs`가 명시적으로 매핑되어 있지 않다면 런타임시 경고를 발생시킨다. 

```html
<CustomLayout id="custom-layout" @click="changeValue" />
```

`CustomLayout` 컴포넌트가 아래처럼 멀티 루트 템플릿이라면 뷰는 어느 곳에 속성을 상속시킬지 알 수 없어 경고를 발생한다. 

```html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

이렇게 처리하면 괜찮다. 

```html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```


## 자바스크립트에서 fallthrouth attributes에 접근

자바스크립트에서도 `$attrs`를 이용해서 접근이 가능하다. 

```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```