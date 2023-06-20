---
layout: post
date: 2022-11-02 09:05:00 +0900
title: '[vue] component events'
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

이벤트는 prop과는 반대방향으로 흐른다. 자식에서 부모의 데이터를 변경하고 싶을 때 이벤트를 발생시키고 부모가 수신하여 데이터 변경이 이뤄진다. 네이브 DOM이벤트와 다르게 컴포넌트 이벤트는 버블현상이 없다. 따라서 오직 자식 컴포넌트에서 발생한 이벤트만 수신할 수 있다. 만약 형제사이 혹은 중첩컴포넌에서 통신을 하고 싶다면 전역상태관리 방법(global state management solution)이 있다?

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

자식에서 발생된 이벤트는 부모컴포넌트에서 `emits` 옵션으로 명시적으로 정의할 수 있다. 발생된 이벤트의 페이로드에 대한 런타임 유효성 검사를 수행할 수 있는 객체 구문도 사용할 수 있다. 

`emits: [이벤트명, ...]`   
`emits: { 함수 }`


```js
// 부모
export default {
  emits: ['inFocus', 'submit']
}

// 혹은 객체로 
export default {
  emits: {
    submit(payload) {
      // return `true` or `false` to indicate
      // validation pass / fail
    }
  }
}
```

컴포넌트가 어떻게 수행되어야 하는지에 대한 문서를 위해서 발생된 이벤트는 명시적으로 정의하는 것이 권장된다.  fallthrough attribute를 피하기 위해서??

만약 네이티브 이벤트인 `click` 이벤트가 `emits` 옵션에 정의된다면 리스너는 오직 컴포넌트에서 발생시키는 `click`이벤트만 수신하게 된다. 네이티브에서 발생되는 `click`은 무시한다. 


## 이벤트 유효성검사

prop의 데이터타입 검사와 비슷하게 발생된 이벤트는 배열이 아닌 객체로 정의되어 있다면 유효성검사를 할 수 있다. 유효성 검사를 추가하기 위해 자식에서 발생된 이벤트는 `this.$emit` 호출에 전달된 인수들을 받아 유효성검사를 할 수 있는 함수로 할당이 되고 유효성에 따라 불리언 값으로 결과가 리턴된다. 


```js
export default {
  emits: {
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

## v-model 사용하기

커스텀이벤트는 `v-model`로 커스텀 입력값을 만들 수 있다. 

```html
<input v-model="searchText" />
```

내부적으로 템플릿이 컴파일되면 아래처럼 된다. value와 value가 변할때마다 업데이트 할 수 있는 이벤트가 매핑 되는듯 

```html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

컴포넌트에 사용하면 아래와 같이 된다. 

```html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

아래 과정이 내부적으로 진행이 된다.  

1. `modelValue` prop으로 네이티브 `<input>`요소의 `value`에 바인딩한다. 
2. 네이티브 `input`이벤트(`<input>`요소의 값이 변하는 것을 감지하는 이벤트)가 발생하면 변경된 값으로 `update:modelValue`라는 커스텀 이벤트를 발생시킨다. 

```html
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

위 과정은 내부적으로 이루어지는 것이므로 과정을 이해하고 실제 사용은 아래와 같이 하면 된다. 

```html
<CustomInput v-model="searchText" />
```

또 다른 방식으로는 `computed`를 사용하는 것이다. getter에서 값을 리턴하고 setter에서 변경된 값을 업데이트한다. 

```html
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```


### v-model 인수

기본적으로 컴포넌트에서 `v-model`은 `prop`은 `modelValue`로 이벤트는 `update:modelValue`로 사용하지만 인수의 이름은 변경이 가능한다.

```html
<MyComponent v-model:title="bookTitle" />
``` 

`modelValue` 대신 `title`을 사용했다. 

```html
<!-- MyComponent.vue -->
<script>
export default {
  props: ['title'], // props: [변수명]
  emits: ['update:title'] // emits: [이벤트명]
}
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```


### v-model의 복수 바인딩

하나의 컴포넌트 인스턴스에 여러 개의 `v-model`을 바인딩할 수 있다. 

```html

<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```html
<script>
export default {
  props: { // 객체를 통해 바인딩하여 타입을 명시했다. 
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

### v-model의 식별자

TBD


`form input` 바인딩에서  `.trim`, `.number`, `.lazy`과 같은 `v-model`의 내장 식별자를 경험했다. 커스텀 input 컴포넌트에서 사용할 수 있는 커스텀 식별자를 만들 수 있다. 


```html
<MyComponent v-model.capitalize="myText" />
```

커스텀 식별자를 위해서 뷰는 `modelModifiers`라는 `prop`을 제공한다. 

```html
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```