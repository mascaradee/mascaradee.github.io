---
layout: post
date: 2022-10-17 09:05:00 +0900
title: '[vue] form 입력값 바인딩, v-model'
categories:
  - javascript
tags:
  - vue
  - form
  - input
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue form input태그 바인딩](https://vuejs.org/guide/essentials/forms.html)


## form 입력값 바인딩

서버에서 받아온 값은 여러 방법으로 html 요소의 값이 바인딩된다. 그 값이 변경이 되면 변경된 값을 또 바인딩해 줘야 하는 코드가 필요하다.  

```js
<input
  :value="text" // input태그에 값 바인딩 
  @input="event => text = event.target.value"> // 값이 바뀌면 다시 바인딩
```

하지만 vue에서는 v-model속성으로 그 작업을 간소화 할 수 있다. 

```js
<input v-model="text">
```

`v-model`은 `input, textarea, select` 태그에 적용할 수 있다. 

- `input type="text"`와 `textarea`는 `value프로퍼티`와 `input이벤트` 사용 가능
- `input type="checkbox"`와 `input type="radio"`는 `checked프로퍼티`와 `change이벤트` 사용 가능
- `select`는 `value프로퍼티`와 `change이벤트` 사용 가능

`v-model`은 `form` 요소에 설정된 초기 `value, checked, selected` 값은 무시한다. 따라서 초기값 세팅이 필요하다면 `date()` 옵션내에 해야 한다. 



## 사용법

### 텍스트

```js
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

### 멀티 텍스트

textarea는 콧수염문법은 허용되지 않으므로 v-model을 이용해야 한다. 

```js
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p> <!-- 아무것도 적용이 되지 않는다. --> 
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```


### 체크박스 

체크박스는 불리언값을 바인딩힌다. checked는 체크박스를 체크를 할 때마다 true/false로 값이 변경된다. 

```js
  data() {
    return {
      checked: true
    }
  }
```

```js
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

여러개 체크박스를 사용할때는 배열이나 Set을 이용하면 된다. 

```js
export default {
  data() {
    return {
      checkedNames: [] // 초기값은 없는 상태
    }
  }
}
```

체크박스가 true라면 해당 요소의 value가 v-model로 바딩되어 있는 배열에 세팅된다. 

```html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```

### 라디오

라디오는 value의 문자열을 바인딩힌다.

```js
  data() {
    return {
      picked: 'One'
    }
  }
```

```html
<template>
  <div>Picked: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</template>
```


### 셀렉트 드랍박스

옵션의 텍스트가 문자열로 바인딩된다. 

```html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

셀렉트에 초기값이 옵션과 일치하는 것이 없다면, `unselected`상태가 되는데 iOS에서는 이런 경우, change 이벤트를 발생시키지 않기 때문에 첫번째 항목을 선택할 수 없는 오류가 발생된다.  따라서 위 예시처럼 비어있는 값으로 초기값을 세팅하는 것을 추천한다. TBD


`multiple` 속성을 추가하면 배열로 바인딩하게 되고 멀티 선택이 가능하다. 

```html
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

v-for를 이용해 유동적으로 렌더링 할 수 있다. 

```js
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}
```

```html
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>

```


## 값 바인딩

라디오, 셀렉트 옵션은 v-model로 문자열을 바인딩한다. 체크박스는 불리언값을 바인딩한다. 그 외 현재 활성화된 인스턴스의 프로퍼티를 유동적으로 바인딩하고 싶을 때는 v-bind를 사용하는데 문자열이 아닌 입력값도 바인딩할 수 있다. 

```js
<!-- `picked` 는 라디오 체크 시 문자열 "a"를 바인딩 한다 -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` 는 체크박스 체크 시 불리언값을 바인딩 한다 -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` 는 첫 옵션이 선택되면 문자열 "abc"를 바인딩 한다 ->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```


### 체크박스

v-model과 함께 쓸 수 있는 true-value, false-value 속성이 있다. 체크박스의 체크여부에 따라 문자열 yes와 no가 바인딩된다. 

```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

v-bind로도 true-value, false-value 속성을 사용해 유동적으로 값을 바인딩할 수 있다. 


```html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```


### 라디오

라디오는 원래 value값이 바인딩 되는데 여기서는 유동적으로 first에 할당되는 값들이 pick에세팅될 수 있음을 보여준다. 

```html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

### 셀렉트옵션

v-model은 문자열 외에도 객체도 바인딩할 수 있다. 옵션이 선택되면 { number: 123}이라는 객체가 바인딩된다. 

```html
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```


## 제어자 (Modifiers)

### .lazy

v-model은 기본적으로 input이벤트(input종류의 태그의 값의 변화를 감지하는)가 발생하면 동기화가 된다. `lazy`제어자를 사용하면 change이벤트 발생 후에 동기화가 된다. input이벤트와 change이벤트 차이를 알아야 할 듯 

```html
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />
```


### .number

입력값을 자동으로 숫자타입으로 변경한다. 대신 parseFloat()으로 파싱되지 않는다면 원래값이 노출된다.  
`number`제어자는 자동으로 `input type="number"`로 적용이 된다. 

```html
<input v-model.number="age" />
```


### .trim

공백삭제 기능

```html
<input v-model.trim="msg" />
```


## 컴포넌트에 v-model 쓰기

TBD