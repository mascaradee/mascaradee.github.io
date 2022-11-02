---
layout: post
date: 2022-11-02 09:05:00 +0900
title: '[javascript] vue component events'
categories:
  - javascript
tags:
  - vue
  - events
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue events](https://vuejs.org/guide/components/events.html)


## 이벤트 발생과 수신


이벤트는 prop과는 반대방향으로 흐른다. 자시에서 발생시키고 수신은 부모다 한다. 네이브 DOM이벤트와 다르게 컴포넌트 이벤트는 버블형상이 없다. 따라서 오직 자식 컴포넌트에서 발생한 이벤트만 수신할 수 있다. 만약 형제사이 혹은 중첩컴포넌에서 통신을 하고 싶다면 전역상태관리 방법(global state management solution)이 있다?

이벤트 발생은 2가지 방법이 있다.   

- 템플릿 표현식: `$emit`메소드를 이용해 `v-on`핸들러에 이벤트를 발생시킬 수 있다. 

```html
<!-- 자식 -->
<button @click="$emit('someEvent')">click me</button>
```

- 컴포넌트인스턴스: `this.$emit()`

```js
// 자식
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
````

부모에서 이벤트 수신을 한다.  
자바스크립트 영역에서는 카멜케이스가 html 영역에서는 케밥케이스로 바뀌는 것을 볼수 있고 발생된 이벤트는 `v-on`을 통해서 수신한다.  

`@수신이벤트명=콜백함수명 혹은 콜백함수 자체`형태로 `some-event`라는 이벤트가 발생된 것을 알게되면 `callback` 함수를 실행하게 된다. 


```html
<!-- 부모-->
<MyComponent @some-event="callback" />
```

`.once`식별자는 또한 이벤트수신에 도움을 준다. 이름대로 한번만 렌더링 된다. 

```html
<!-- 부모-->
<MyComponent @some-event.once="callback" />
```

## 이벤트 인수

자식이 `$emit(이벤트명, 인수)`형태로 이벤트를 발행하여 인수를 부모에게 전달할 수 있다. 

```html
<!-- 자식 -->
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

부모는 전달받은 인자를 콜백함수에 이용할 수 있다. 화살표 함수를 이용해 콜백함수를 바로 정의해도 되고

```html
<!-- 부모 -->
<MyButton @increase-by="(n) => count += n" />
```

`method` 옵션에 정의를 해도 된다. 

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}

...

<MyButton @increase-by="increaseCount" />
```

이벤트 이름 뒤에 `$emit()`에 전달되는 모든 추가 인수는 리스너에 전달된다. `$emit('foo', 1, 2, 3)` 인 경우 `1, 2, 3`이라는 세 개의 인수를 전달한다.  


## 이벤트 발생 정의


