---
layout: post
date: 2022-11-07 09:05:00 +0900
title: '[vue] component slots'
categories:
  - javascript
tags:
  - vue
  - slot
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue slots](https://vuejs.org/guide/components/slots.html)


## Slot Content and Outlet

템플릿 컨텐츠를 전달하기 위해 `slot`을 사용한다. 부모에서 자식으로 데이터를 전달하기 위해서는 `props`를 사용하는 것처럼 템플릿을 전달하기 위해서는 `slot`을 이용한다.   

부모에서 `<FancyButton>`컴포넌트를 사용하는데 `Click me!`라는 텍스트를 전달하려고 한다. 이것은 `slot content`라고 하고 이 내용이 들어갈 위치를 `slot outlet`이라고 한다. 

```html
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>
```

`<FancyButton>`컴포넌트의 템플릿은 아래와 같다. 

```html
<button class="fancy-btn">
  <slot></slot> <!-- slot outlet -->
</button>
```

부모에서 전달한 템플릿 내용은 `<slot/>`태그로 지정된 곳에 변환되어 렌터링 된다. 자식에서 렌더링 되는 이 위치를 `slot outlet`이라고 한다. 결과적으로 아래와 같이 렌더링 된다.  

```html
<button class="fancy-btn">Click me!</button>
```


`slot`은 텍스트 전달에만 한정되지 않는데 여러개의 html 요소를 전달할 수도 있다. 

```html
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

`slot`을 이용하면 좀 더 유연하고 재사용성을 증가시킬 수 있다. 여러곳에서 `<FancyButton>` 컴포넌트를 사용해도 내부 컨텐츠를 달리 전달하여 다른 형태를 만들 수도 있지만 여전히 내부 `class="fancy-btn"`스타일은 동일하게 적용시킬 수 있을 것이다. 


## 렌더링 유효범위

`slot`은 부모에서 정의되기 때문에 부모의 `data`에 접근할 수 있다. 

```html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

`message`는 같은 내용이 렌더링 된다. 하지만 `slot`은 자식 컴포넌트의 데이터에는 접근을 할 수 없다. 템플릿 표현식은 오직 그것이 정의된 곳에서만 한해 접근할 수 있다. 


## 대체 컨텐츠

부모쪽에서 `slot`내용을 제공하지 않았으나 `Submit`이라는 defualt값을 만들기 위해서는 `<slot>`태그 사이에 직접 값을 넣을 수도 있다.  

```html
<button type="submit">
  <slot>
    Submit <!-- fallback content -->
  </slot>
</button>
```

자식 컴포넌트의 `<slot>`태그의 사이에 넣은 값은 부모컴포넌트로부터 값이 넘어오면 대체 된다.   

부모로부터 아무 내용도 전달이 되지 않은 경우, 자식에 기본값 세팅되어 렌더링 된다. 

```html
<SubmitButton />
```

```html
<button type="submit">Submit</button>
```

부모로부터 내용이 전달된 경우, 부모의 값으로 대체되어 렌더링 된다. 

```html
<SubmitButton>Save</SubmitButton>
```

```html
<button type="submit">Save</button>
```

## slot 이름

여러개의 slot을 전달할때 이름을 지정해 각 slot을 구분할 수 있다. 이름이 지정되지 않은 경우는 기본적으로 "default"를 이름으로 갖는다. 

- 부모: <template v-slot:이름></template> 혹은 <template #이름></template>
- 자식: <slot name="이름"></slot>


자식컴포넌트에  heaer, main, footer 태그 안에 각 slot을 구성하려고 한다. 

```html
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

header와 footer에 slot명을 지정한다.  

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

부모에서 slot 내용을 넘길때 header에 해당 하는 내용은 아래와 같이 넘길 수 있다. 이름이 있든 없든 slot 내용은 slot outlet이 지정된 곳에 전달이 되므로 아래 예시에서 <template> 태그로 감싸지지 않음 부분은 이름이 지정되지 않은 slot outlet에 전달이 되어 <main>안에 들어 가게 된다. 

```html
<BaseLayout>
  <template v-slot:header>
     <h1>Here might be a page title</h1>
  </template>

  <!-- implicit default slot -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

<!-- 명시적으로 기본 이름은 default를 이용해 전달 할 수도 있다. 
  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
-->
  <template #footer>
    <!-- content for the header slot -->
  </template>
</BaseLayout>
```

default 이름은 한 번 밖에 사용할 수 없다. 따라서 여러 slot을 전달할 때는 이름을 별도로 지어주는 편이 나을 듯 

2개를 default로 사용하려고 하면 아래처럼 경고가 뜬다. 

`(12:7) Extraneous children found when component already has explicitly named default slot. These children will be ignored.`


```html
  <BaseLayout>
    <template #default>
      <p>A paragraph for the main content.1</p>
      <p>And another one.</p>
    </template>
    
      <p>A paragraph for the main content.2</p>
      <p>And another one.</p>

  </BaseLayout>
```

```html
<template>
  <div class="container">
    <main>
      <slot></slot>
      <slot></slot>
    </main>
  </div>
</template>
```

## 동적 slot 이름

문자열 이름 뿐 아니라 `[]`를 이용해 동적으로 이름을 부여 할 수도 있다. `[]` 영역은 자바스크립트 영역이다. 


```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- with shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## 범위 지정 slot

원래 slot 내용은 자식 컴포넌트의 상태에 접근할 수 없지만, 부모와 자식 모두에서 접근이 가능하도록 할 수 있는 방법이 있다. 그렇게 하기 위해서 자식이 데이터를 렌더링 할 때 slot에 데이터를 전달할 수 있는 방법이 필요하다. 컴포넌트에 props를 전달하는 것처럼 slot에 속성을 세팅하여 slot content에 전달하여 해결할 수 있다.  

- props: 부모컴포넌트에서 자식으로 속성전달
- slotProps : 자식에서 부모로 속성 전달   


자식컴포넌트의 slot의 속성은 `slotProps`로 전달이 된다. 

```html
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

부모컴포넌트에서 아래와 같이 표현식으로 접근이 가능하다. 

```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

`slotProps`을 함수의 인수처럼 풀어 쓸 수도 있다. 

```html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### named slot의 props

```html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```


이름이 지정된 slot도 사용법은 동일하다. 하지만 `name` 속성은 예약어이기 떄문에 slotProps에 전달되는 것은 `{ message: 'hello' }`만이다. 

```html
<slot name="header" message="hello"></slot>
```

이름이 붙은 slot과 없는 slot을 섞어서 쓸때 props를 쓰려면 이름 없는 slot에도 `<template>` 태그를 적용해 줄 필요가 있다. `v-slot`지시어를 직접적으로 컴포넌트에 쓸때 컴파일 에러가 난다. 이것은 props 범위에 대한 모호성을 피하기 위함이다. 

```html
<!-- This template won't compile -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message belongs to the default slot, and is not available here -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

props는 지정된 slot 내에서만 사용이 가능하다. 

```html
<template>
  <MyComponent>
    <!-- Use explicit default slot -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

## slot 샘플

slot 유효범위의 좋은 예시


```html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

```html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

## 렌더링 하지 않는 컴포넌트
TBD