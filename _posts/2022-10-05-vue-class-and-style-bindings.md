---
layout: post
date: 2022-10-05 09:05:00 +0900
title: '[vue] class and style bindings'
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


# 클래스와 스타일 바인딩

`v-bind`를 이용해 HTML의 `class`와 `style`속성으로 바인딩할 수 있고 `v-bind`는 문자열을 기본으로 표현식을 사용해 객체 혹은 배열로도 평가될 수 있다. 


## 기본 문법

- 기본: `v-bind:class='클래스명'`  
- 축약형: `:class='클래스명'`  
- 객체사용: `:class={ 클래스명: 불리언값, 클래스명: 불리언값 }`  
- 배열사용: `:class=[ 클래스명, 클래스명]`  
- 표현식 사용: `:class={ 표현식 }`  


## HTML 클래스 바인딩

### 객체 사용

```js
<div :class="{ active: isActive }"></div>
```

isActive 참이면 클래스에 active를 적용하라는 의미로 렌더링되고 반대라면 해당 클래스는 적용되지 않는다. 즉, isActive 프로퍼티의 값에 따라 토글클래스를 만들 수 있다. 

```html
<div class="active"></div>
```

객체를 바인딩할 때는 `{ active: boolean(isActive) }` 라고 생각하면 쉬울듯 boolean 판단값에 따라 키를 클래스에 적용하라는 정도로 이해하면 된다.


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

### 컴포넌트에 사용

컴포넌트에 클래스 적용하면 자식컴포넌트의 루트요소에 있던 기존 클래스와 더불어 부모에서 전달된 클래스가 함께 적용이 된다. 


#### HTML 클래스 

부모템플릿에 자식 컴포넌트 MyComponent를 추가하고 클래스를 적용한다. 
```html
<MyComponent class="baz boo" />
```

기존 자식컴포넌트의 템플릿에 아래와 같이 클래스가 이미 지정되어 있다면 

```html
<p class="foo bar">Hi!</p>
```

결과적으론 아래와 같이 변경이 된다.

```html
<p class="foo bar baz boo">Hi!</p>
```

#### :bind=class

:class를 사용해도 마찬가지다. 

```js
<MyComponent :class="{ active: isActive }" />
```

```js
<p class="foo bar active">Hi</p>
```

#### $attrs

자식컴포넌트에 루트요소가 여러개 있다면 어떤 요소에 전달한 클래스를 적용할지 지저을 해 줘야 하는데 `$attrs`를 사용한다.

```html
<MyComponent class="baz" />
````

```js
<p :class="$attrs.class">Hi!</p> 
<span>This is a child component</span>
```

결과는 

```html
<p class="baz">Hi!</p> 
<span>This is a child component</span>
```


## 인라인 스타일 바인딩

HTML 요소의 style 속성을 :style로 연결할 수 있다.

- 기본: `v-bind:style=스타일명`
- 축약: `:style=스타일명`
- 객체: `:style={ 스타일명: 스타일값, ... }`
- 배열: `:style=[ 스타일명1, 스타일명2, ...]`

### 객체사용

스크립트영역에서 스타일의 키는 카멜케이스를 사용하도록 권장되지만 뷰바인딩에서는 케밥케이스도 적용은 된다. 아래는 프로퍼티를 스타일명으로 적용한 사례

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

카멜케이스

```js
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

케밥케이스

```js
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

객체 자체를 스타일에 적용할 수도 있다. 

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

```js
<div :style="styleObject"></div>
```

결과는

```html
<div style="color:red; font-size:13px"></div>
```


### 배열 사용

스타일 역시 배열을 사용할 수 있다. `baseStyles`이 객체일 수도 

```js
<div :style="[baseStyles, overridingStyles]"></div>
```


### 자동 접두사 적용

브라우저마다 제조사별로 같은 기능을 특정 접두사로 붙여서 쓰는 경우가 있다. Vue는 런타임시 자동으로 이것을 체크해서 자동으로 접두사를 추가한다. 


```js
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

위 코드는 `display: flex`로 적용이 된다. 

