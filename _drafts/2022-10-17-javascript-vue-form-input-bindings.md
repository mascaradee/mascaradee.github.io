---
layout: post
date: 2022-10-17 09:05:00 +0900
title: '[javascript] vue form input bindings'
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


## form 바인딩

서버에서 받아온 값은 자바스크립트를 통해 html 요소의 값이 바인딩된다. 그 값이 변경이 되면 변경된 값을 또 바인딩해 줘야 하는 코드가 필요하다.  

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

textarea는 콧수염문법은 허용되지 않으므로  v-model을 이용해야 한다. 

```js
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```


### 체크박스 

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

```html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```