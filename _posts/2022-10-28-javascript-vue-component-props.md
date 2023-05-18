---
layout: post
date: 2022-10-27 09:05:00 +0900
title: '[javascript] vue component props'
categories:
  - javascript
tags:
  - vue
  - props
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue props](https://vuejs.org/guide/components/props.html)


## Props 선언

자식컴포넌트에서 부모로부터 데이터를 전달받고자 할때 그 데이터의 이름(자식에서 사용할 변수명)과 형식을 지정해 주는 듯함. 

`prps:[]` 혹은 `props:{}`  

```js
export default {
  props: {
    title: String, // 키 = prop의 이름, 값 = 예상되는 타입의 생성자 함수
    likes: Number
  }
}
```

## Prop 전달 상세

### Prop 명명규칙

카멜케이스로 작성하면 인용부호를 사용하지 않아도 자바스크립트 식별자로 직접 사용할 수 있다. 

```js
export default {
  props: {
    greetingMessage: String
  }
}
```
```html
<span>{{ greetingMessage }}</span>
```

자식 컴포넌트에도 props를 전달할때 카멜케이스를 사용할 수 있지만 규칙은 케밥케이스를 사용하여 HTML속성에 맞추는 것이다. 

```html
<MyComponent greeting-message="hello" />
```

자바스크립트 관련된 부분은 카멜케이스, HTML 관련된 부분은 케밥케이스로 작성한다. 컴포넌트태그명만 파스칼케이스

### 정적 vs. 유동적인 Props

고정적인 데이터를 전달하기도 

```html
<BlogPost title="My journey with Vue" />
```

유동적으로 변하는 데이터를 바인딩 할 수도 있다. `v-bind` 혹은 `:` 사용해 HTML에 속성을 바인딩하는것처럼 props를 컴포넌트에 바인딩한다.
date()옵션에서 정의한 프로퍼티로 바인딩할 수도 있고 프로터티 + 추가 표현식을 이용할 수도 있다. 

```html
<!-- Dynamically assign the value of a variable -->
<BlogPost :title="post.title" />

<!-- Dynamically assign the value of a complex expression -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### 다른 데이터타입 전달

문자열 뿐만 아니라 모든 종류의 타입의 데이터를 props를 통해 전달할 수 있다. 
데이터를 전달하기 위해서는 `v-bind`를 이용해야 뷰가 인식할 수 있다. 어떤타입이든 관계없이 `v-bind:props명="값"` 형식을 사용한다. 
`"값"`은 문자열을 의미하는 것이 아닌 자바스크립트 표현식이다. 

#### 숫자

```html
<!-- 정적데이터 전달 -->
<BlogPost :likes="42" /> 

<!-- 유동적데이터 전달-->
<BlogPost :likes="post.likes" /> 
```

#### 불리언

불리언 타입의 값이 생략되어 있으면 기본은 true다. 

```html
<!-- true/false 값이 생략되어 있으면 기본적으로 true -->
<BlogPost is-published />

<!-- 정적데이터 전달 -->
<BlogPost :is-published="false" />

<!-- 유동적데이터 전달- -->
<BlogPost :is-published="post.isPublished" />
```

#### 배열

```html
<!-- 정적데이터 전달 -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- 유동적데이터 전달- -->
<BlogPost :comment-ids="post.commentIds" />
```

#### 객체

```html
<!-- 정적데이터 전달 -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- 유동적데이터 전달- -->
<BlogPost :author="post.author" />

```

### 객체를 이용한 여러 개 프로퍼티 바인딩

`v-bind`를 인자 없이 사용해 객체 자체를 전달할 수 있다. 

이 때는 `v-bind:props명="값"` 형태가 아닌 `v-bind="객체명"` 만 쓴다.

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```

```html
<BlogPost v-bind="post" />
```

아래와 같은 의미가 된다.

```html
<BlogPost :id="post.id" :title="post.title" />
```

## 단방향 데이터 흐름

props는 부모로부터 자식으로 전파가 되지만 그 반대는 불가능하다. 부모 프로퍼티가 변경이 되면 그 변경은 자식에게도 전달이 된다.   
실시간으로 부모 프로퍼티 변경사항이 전달되므로 자식컴포넌트에서 부모 프로퍼티를 변경하면 안된다.   

prop을 변경할 수 있는 경우는 2가지가 있다.   

1. 지역변수에 prop으로부터 전달받은 값을 할당해 초기값으로만 이용한다. 다만 이렇게 사용하면 부모 프로퍼티의 값이 변경되었을 경우 변경사항이 새로 정의한 자식의 로컬 프로퍼티에는 적용이 안된다. 

```js
export default {
  props: ['initialCounter'],
  data() {
    return {
      // counter only uses this.initialCounter as the initial value;
      // it is disconnected from future prop updates.
      counter: this.initialCounter
    }
  }
}
```

2. 전달받은 값을 단순히 raw 데이터로만 사용해 데이터 형태의 추가적인 변화를 주려면 `computed`옵션에서 사용한다. 

```js
export default {
  props: ['size'],
  computed: {
    // computed property that auto-updates when the prop changes
    normalizedSize() {
      return this.size.trim().toLowerCase()
    }
  }
}
```

### 객체 혹은 배열 props 변경

props로 객체와 배열을 전달한다는것은 그 주소값을 전달하는 것이기 때문에 자식컴포넌트에서 prop 바인딩을 변경할 수 없지만 중첩 속성은 변경 할 수 있다. 그런데 이렇게 변경이 일어나면 뷰에 굉장한 비용부담이 발생하고 자식 컴포넌트가 부모 프로퍼티에 명확하지 않은 방식으로 상태변화에 영향을 미치므로 데이터 흐름을 파악하기 어려워진다.
가능한 부모 프로퍼티 변경은 하지 않는것이 좋고 필요하다면 자식컴포넌트에서 이벤트를 발생시켜 부모프로퍼터가 변경될 수 있도록 해야 한다. 

## prop 유효성

prop의 정의된 데이터 타입을 맞추지 않으면 뷰는 콘솔창에 경고를 보여준다. 이것은 특히 다른사람이 사용하도록 의도된 컴포넌트를 개발할때 유용하다.

배열로 props를 정의하는 대신 객체를 이용한다. 

```js
export default {
  props: {
    // Basic type check
    //  (`null` and `undefined` values will allow any type)
    propA: Number,
    // Multiple possible types
    propB: [String, Number],
    // Required string
    propC: {
      type: String,
      required: true
    },
    // Number with a default value
    propD: {
      type: Number,
      default: 100
    },
    // Object with a default value
    propE: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function. The function receives the raw
      // props received by the component as the argument.
      // 팩토리 함수: 객체를 반환하는 함수
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // Custom validator function
    propF: {
      validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // Function with a default value
    propG: {
      type: Function,
      // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
      default() {
        return 'Default function'
      }
    }
  }
}
```

- 기본적으로 props는  `required:true`가 지정되지 않는 한 모두 옵션이다.  
- 불리언을 제외하고 값이 없는 props는 `undefined`다.
- 불리언이 값이 없는 경우는 `false`다. 
- 기본값이 설정되어 있다면 `undefined`가 반환된다. prop이 정의되지 않았거나 `undefined`로 값을 전달할 때 모두 포함이다.   

props는 컴포넌트 인스턴스가 생성되기 전에 유효성 체크를 한다. 따라서 `date`나 `compute`와 같은 인스턴스 프로퍼티를 기본값이나 유효성체크 함수에서 사용할 수는 없다. 

### 런타임 타입 확인

`String, Number, Boolean, Array, Object, Date, Function, Symbol` 중에 데이터 타입을 사용할 수 있다.  
물론 커스텀 클래스나 생성자 함수도 데이터 타입으로 사용할 수 있고 `instanceof`를 사용할 수 있게 된다.  

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

뷰는 `instanceof Person`을 사용해 `author` prop의 값이 실제로 `Person` 클래스의 인스턴스인지를 확인한다. 

```js
export default {
  props: {
    author: Person
  }
}
```


## 불리언 변환

`Boolean` 타입의 props는 특별한 캐스팅 규칙에 의해 네이티브 `boolean` 속성을 모방한다. 

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

불리언 타입인 `disabled`에 값이 생략되면 true이고 `disabled`자체가 생략되면 false가 된다. ??

```js
<!-- equivalent of passing :disabled="true" -->
<MyComponent disabled />

<!-- equivalent of passing :disabled="false" -->
<MyComponent />
```

다중 타입을 선언할 수 있다. 
```js
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
```