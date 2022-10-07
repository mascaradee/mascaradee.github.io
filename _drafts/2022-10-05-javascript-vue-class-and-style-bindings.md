---
layout: post
date: 2022-10-05 09:05:00 +0900
title: '[javascript] vue class and style bindings'
categories:
  - javascript
tags:
  - vue
  - bindings
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 클래스와 스타일 바인딩](https://vuejs.org/guide/essentials/class-and-style.html)


## 클래스와 스타일 바인딩

`v-bind`를 이용해 HTML의 `class`와 `style`속성으로 바인딩할 수 있고 `v-bind`는 문자열을 기본으로 표현식을 사용해 객체 혹은 배열로도 평가될 수 있다. 


### 기본 문법

- 기본: `v-bind:class='클래스명'`  
- 축약형: `:class='클래스명'`  
- 객체사용: `:class={ 키: 값, 키: 값 }`  
- 배열사용: `:class=[ 키, 키]`  
- 표현식 사용: `:class={ 표현식 }`  




### 객체 사용

```js
<div :class="{ active: isActive }"></div>
```

isActive 참이면 클래스에 active를 적용하라는 의미로 렌더링되고 반대라면 해당 클래스는 적용되지 않는다. 즉, isActive 프로퍼티의 값에 따라 토글클래스를 만들 수 있다. 

```html
<div class="active"></div>
```

객체를 바인딩할 때는 `{ active: boolean(isActive) }` 라고 생각하면 쉬울듯 boolean 판단값에 따라 키를 클래스에 적용하라는 정도로 이해하면 될듯


데이터 프로퍼티를 이용해 객체를 전달 할 수도 있다. 

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```
```js
<div :class="classObject"></div>
```

computed 프로퍼티를 사용하면 아래와 같다.

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

```js
<div :class="classObject"></div>
```
computed 프로퍼티는 내부에 메소드형태이지만 실제 사용은 data처럼 사용하는 듯 


### 배열 사용

```js
data() {
  return {
    isActive: true,
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

```js
<div :class="[activeClass, errorClass]"></div>
```

객체는 값을 변경하면서 토글처럼 사용 할수 있지만 배열의 경우에는 data에 선언된대로 바로 적용이 된다.  배열을 토글처럼 사용하고 싶으면 내부에서 삼항연산자를 이용하면 된다.


```js
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

하지만 여러개의 값들에 삼항연산자를 모두 적용하긴 어렵다. 이럴 때는 배열안에 객체를 넣어 이를 해결할 수 있다. 

```js
<div :class="[{ active: isActive }, errorClass]"></div>
```

`{ active: isActive }`에서 `isActive`가 참이면 `'active'`로 적용이 되고 `errorClass`는 data프로퍼티에 선언된 `'text-danger'`로 변환되면서 2개의 클래스가 적용된다. 

```html
<div class="active text-danger"></div>
```