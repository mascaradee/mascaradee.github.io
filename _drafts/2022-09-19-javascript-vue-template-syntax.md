---
layout: post
date: 2022-09-15 09:05:00 +0900
title: '[javascript] vue template 문법'
categories:
  - javascript
tags:
  - vue
  - template
  - mustache
  - v-html
  - v-bind
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 공식 - vue template syntax](https://vuejs.org/guide/essentials/template-syntax.html#directives)  
[Vue 기초 튜토리얼](https://vuejs.org/tutorial/#step-3)  


# 템플릿 문법

`<temlplate />`은 `HTML`처럼 보이지만 실제로는 `vue`의 구성요소이다. 다만 `HTML`문법을 이용해서 작성하고 브라우저의 `HTML`파서에 의해 컴파일 된다. 
`vue`의 특징인 반응성(reactivity)이 적용되어 데이터가 변경되면 DOM에 실시간 렌더링이 된다. 

---

## 문자열 바인딩

`{{ 프로퍼티명 혹은 자바스크립트 표현식 }}`  

`{{ }} (Mustache)`로 프로퍼티를 문자열로 바인딩한다. `{{}}`내부는 자바스크립트 영역이라고 봐도 무방하다.

아래 예시에서 `data()`에 `title`프로퍼티가 선언되어 있으면 해당 값이 렌더링 되는 것을 볼 수 있다. 

```html
<script>
  creatApp({
  data() {
    return {
      title: 'Hello, Vue',
      bindedId: 'titleId',
      bindedClass: 'title'
    }
  }
}).mount('#app');
</script>

<style>
  .title {
    color: red;
  }
</style>
```

아래와 같이 코딩하면

```html
<div id="app">
  <h1>{{ title }}</h1>
</div>
```

실제 결과는 요렇게 렌더링 된다.

```html
<div id="app">
  <h1>Hello, Vue</h1>
</div>
```

---

## v-지시어

`v-`지시어는 `vue`가 제공하는 특별한 속성으로 값이 변하면 역시 DOM에 실시간 렌더링이 된다. 


### HTML 바인딩

`v-html=프로퍼티명`

`{{ }}`는 문자열로만 해석이 되기 때문에 `HTML`을 문법을 그대고 전달하고 싶으면 `v-html`를 사용한다. 

```html
<script>
  const rawHtml = ref('<span style="color: red">This should be red.</span>');
</script>
<template>
  <p>Using text interpolation: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</template>
```

결과는 아래처럼 `{{ }}`는 `HTML`을 넘겨도 그대로 문자열로 바인딩이 되지만 `v-html` 지시어를 사용하면 `HTML`문법에 맞춰 파싱이 된 후 대체된다.  

```
Using text interpolation: <span style="color: red">This should be red.</span>
``` 

파싱 결과는 아래와 `<span>`의 텍스트가 빨간색으로 변경되어 적용된다.  

Using v-html directive: <span style="color: red">This should be red.</span>  

하지만 XSS취약성으로 쉽게 연결되기 때문에 `v-html`은 믿을 수 있는 컨텐츠일때만 사용해야 한다. 되도록 사용 안하는것이 좋을 듯 함

---

### 속성 바인딩

`v-bind:HTML속성=프로퍼티명`  
`:HTML속성=프로퍼티명`

`{{ }}`는 문자열로만 해석이 되기 때문에 `HTML속성`을 사용하기 위해서 아래와 같이 `v-bind` 지시어와 함께 `HTML속성`을 사용한다. 
바인딩 된 값이 `null`이나 `undefined`이면 무시된다. 

```
v-bind:id
v-bind:class
...
```

짧게 아래와 같이 써도 무방하고 실제 더 많이 사용된다.

```
:id
:class
...
```

코딩은 이렇게하고 `Vue` 엔진에 의해 컴파일이 되면

```html
<div id="app">
  <h1 v-bind:id="bindedId" v-bind:class="bindedClass">{{ title }}</h1>
</div>
```

실제 결과는 이렇게 나온다. 

```html
<div id="app">
  <h1 id="titleId" class="title">Hello, Vue</h1>
</div>
```

### Boolean 속성 바인딩

`:disabled=참/거짓을 가지는 프로퍼티명`

참, 혹은 빈 문자열은 `disabled` 속성이 적용된다. 거짓일 경우는 생략, 즉 사용가능으로 버튼이 바뀐다.

```html
<script>
    const disableYn = false;
</script>
<template>
  <button :disabled="disableYn">
    클릭 가능?
  </button>
</template>
```

### 멀티 속성 바인딩

여러 개의 속성은 `v-bind`에 객체를 바인딩하여 사용한다. 


```script
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

```html
<div v-bind="objectOfAttrs"></div>
```

---


### 자바스크립트 표현식 바인딩

`{{ 자바스크립트 표현식 }} 혹은 v-bind="자바스크립트 표현식"`

`Mustache`와 `v-bind`에 자바스크립트 표현식도 적용할 수 있다. 현재 컴포넌트 인스턴스의 데이터 유효범위 내에서 자바스크립트 표현식은 평가된다. 

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

단, 표현식에 한한다. 선언문이나 정의식은 적용되지 않는다.  


### 함수 바인딩

컴포넌트에 정의한 함수 역시 `{{ }}`와 `v-bind` 내에서 호출 할 수 있다.

```html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

하지만, 컴포넌트가 바뀔때마다 같이 호출이 되므로 사이드 이펙트는 신경써서 사용할 것.


---

## 지시어

`vue`가 제공하는 내장 지시어들이 있다. `v-html`, `v-bind`가 그 예시들로 값의 변경될 때 DOM에 바로 적용이 된다. 


### v-if

`v-if=프로퍼티명`  

타 문법의 `if`처럼 사용한다. 


아래 예시 처럼 `seen`의 값이 참/거짓이냐에 따라 `<p>` 영역의 생성이 결정된다. 거짓일 경우 `<p>`영역은 제거된다. 

```html
<p v-if="seen">Now you see me</p>
```

### v-bind

`v-bind:HTML속성=프로퍼티명`
`:HTML속성=프로퍼티명`  

`HTML` 속성을 연결하기 위해 사용한다. 


### v-on

`v-on:이벤트종류=프로퍼티명`  
`@이벤트종류=프로퍼티명`  

`DOM` 이벤트를 리슨한다. 

```html

<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>

```

### 동적 속성 바인딩

`attributeName`의 값은 아래 예시에서는 `href`가 되겠지만 그 부분에 자바스크립트 표현식을 이용해 다른 속성을 정의 할 수도 있다. 

```html
<!--
Note that there are some constraints to the argument expression,
as explained in the "Dynamic Argument Value Constraints" and "Dynamic Argument Syntax Constraints" sections below.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

아래 예시가 더 이해하기 쉬울듯 `eventName`에는 `click`이벤트가 매핑될 수도 다른 이벤트가 매핑될 수도 있다.  `eventName`에 세팅되는 이벤트종류에 따라서

```html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething">

```

#### 동적 속성 제약

- `null` 값이면 바인딩이 자동으로 제거되지만 다른 문자열이 아닌 값은 경고가 뜬다. 
- 동적속성바인딩에 공백이나 따옴표는 허용되지 않는다. `'foo'`가 아닌 `foo`로만 써야 한다. 
  
  ```html
  <!-- This will trigger a compiler warning. -->
  <a :['foo' + bar]="value"> ... </a>
  ```
- HTML 내에 vue를 쓰는 경우, 속성명은 소문자로 치환이 되므로 대문자를 섞어 쓰면 무시되어 작동이 제대로 안될 수 있다. `someAttr` 는 `someattr`로 치환되서 인식된다. 단, SFC의 경우에는 해당 제약이 없다.
  
  ```html
  <a :[someAttr]="value"> ... </a> 
  ```


### 제어자 (Modifiers)

제어자는 .(점)뒤에 쓰는 특별한 접미사다. `.prevnet` 제어자는 `event.preventDefault()`를 호출하는 것을 의미한다. 

아래예시에서 `submit`의 기본 기능인 새로고침을 막는다. 

```html
<form @submit.prevent="onSubmit">...</form>
```


### directive syntax

![directive syntax](/images/vue-directive-syntax.png)