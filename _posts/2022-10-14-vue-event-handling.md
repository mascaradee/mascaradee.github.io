---
layout: post
date: 2022-10-14 09:05:00 +0900
title: '[vue] event handling'
categories:
  - javascript
tags:
  - vue
  - event
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 이벤트 핸들링](https://vuejs.org/guide/essentials/event-handling.html)


## 이벤트 리스닝

### 인라인 핸들러

- `v-on:이벤트종류="핸들러함수"`
- `@이벤트종류="핸들러함수"`


### 메소드 핸들러

- `v-on:이벤트종류="핸들러함수명"`
- `@이벤트종류="핸들러함수명"`


## 인라인 핸들러

HTML에 직접 간단한 이벤트를 작성한다. `onclick`과 같다고 보면 된다. 핸들러 함수 자리에 함수를 직접 쓰거나 다른 곳에 정의되어 있는 함수를 바로 호출해서 사용한다. 

```js
data() {
  return {
    count: 0
  }
  methods: {
    say(message) {
      alert(message);
    }
  }
}
```

```html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
<button @click="say('hello')">Say hello</button>
```

인라인 핸들러에서 이벤트 객체를 사용하는 방법은 2가지다. 

- $event 변수 사용
- 화살표 함수 사용

```js
methods: {
  warn(message, event) {
    // now we have access to the native event
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
````

```html
<!-- $event 변수 사용 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 화살표함수 사용 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```


## 메소드 핸들러

복잡하고 많은 로직이 들어간 이벤트 핸들러로 인라인 핸들러로 해결할 수 없는 경우에 사용한다. v-on을 이용해 함수명이나 컴포넌트 메소드의 경로를 함께 써준다. 

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // `this`는 현재 활성화된 인스튼스를 가리킨다. 여기서는 date()라고 생각해도 무방
    alert(`Hello ${this.name}!`);
    // `event` 는 네이티브 DOM 이벤트
    if (event) {
      alert(event.target.tagName); // BUTTON
    }
  }
}
```

```html
<!-- `greet`는 위에서 정의된 함수명 -->
<button @click="greet">Greet</button>
```

메소드 속성은 자동으로 트리거된 네이티브 DOM이벤트 객체를 받는다. 


## 이벤트 제어자 (Event Modifiers)

`.stop,.prevent,.self,.capture,.once,.passive`와 같이 점과 함께 접미사를 사용하면 자바스크립에서 제공하는 아래와 같은 기능을 사용할 수 있다. 

- `.stop`: event.stopPropagation(), 캡처 및 버블링 단계에서 현재 이벤트의 추가 전파를 방지한다. 
- `.prevent`: event.preventDefault(), 기본 html 동작을 중단한다. (e.g. form태그의 submit)
- `.self`: 
- `.capture`: 
- `.once`: 
- `.passive`: 

```html
<!-- click이벤트의 버블링 방지 -->
<a @click.stop="doThis"></a>

<!-- submit 이벤트의 기본 기능인 새로고침 방지 -->
<form @submit.prevent="onSubmit"></form>

<!-- 제어자는 체인으로 사용 가능하다. -->
<a @click.stop.prevent="doThat"></a>

<!-- 핸들러 없이 제어자만 사용가능 -->
<form @submit.prevent></form>

<!-- event.target이 요소 자체인 경우만 트리거 핸들러로 사용 -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>

<!-- 자식요소의 이벤트가 실행되기 전에 이 요소의 이벤트를 먼저 실행될 수 있도록 캡처 -->
<div @click.capture="doThis">...</div>

<!-- 최대 한 번만 이벤트 실행 -->
<a @click.once="doThis"></a>

<!-- passive = true는  스크롤을 위해 preventDefault()를 호출하지 않고 바로 스크롤 기능을 수행하겠다라는 의미 .passive 수정자는 일반적으로 모바일 장치의 성능을 개선하기 위해 터치 이벤트 리스너와 함께 사용된다. -->
<div @scroll.passive="onScroll">...</div>
```

제어자의 순서에 따라 적용도 달라지게 되므로 유의. `@click.prevent.self` 는 클릭 기본액션이 자신과 자손들에게까지 방지된다. 반면에 `@click.self.prevent`는 오직 클릭의 기본액션만 자신에게 적용된다. 


.passive와 .prevent는 같이 사용할 필요가 없다. .passsive 내부에 이미 .prevnet를 쓰지 않겠다는 의도가 있기 때문


## 키 제어자(Key Modifiers)

v-on, @으로 키 이벤트도 지정할 수 있다.   

엔터키가 들어온 경우에만 submit을 콜한다. 

```js
<input @keyup.enter="submit" />
````

KeyboardEvent.key로 알아낼 수 있는 키 이름을 케밥형식으로 사용할 수 있다.   

- `.page-down`
- `.enter`
- `.tab`
- `.delete (captures both "Delete" and "Backspace" keys)`
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`: 윈도우키


## .exact Modifier

오로지 해당 제어자만 혹은 제어자와 체인으로 연결된 시스템키가 눌렸을때만 이벤트가 트리거 된다. 

```js
<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>
```


## 마우스버튼 제어자 (Mouse Button Modifiers)

- `.left`
- `.right`
- `.middle`
