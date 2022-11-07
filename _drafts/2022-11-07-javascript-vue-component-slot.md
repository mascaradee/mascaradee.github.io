---
layout: post
date: 2022-11-07 09:05:00 +0900
title: '[javascript] vue component slots'
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

부모에서 `<FancyButton>`컴포넌트를 사용하는데 `Click me!`라는 텍스트를 전달하려고 한다. 

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

내용이 없이 렌더링을 하기 위해서 대체 컨텐츠(`fallback content`, i.e `default`)를 `slot`으로 사용하는 것은 유용하다.   
부모쪽에서 `slot`내용을 제공하지 않았으나 `Submit`이라는 기본값을 만들기 위해서는 `<slot>`태그 사이에 직접 값을 넣을 수도 있다.  

```html
<button type="submit">
  <slot>
    Submit <!-- fallback content -->
  </slot>
</button>
```

자식 컴포넌트의 `<slot>`태그의 사이에 넣은 값은 부모컴포넌트로부터 값이 넘어오면 대체 된다.   

부모로부터 아무 내용도 전달이 되지 않은 경우,   
```html
<SubmitButton />
```
```html
<button type="submit">Submit</button>
```

부모로부터 내용이 전달된 경우, 
```html
<SubmitButton>Save</SubmitButton>
```
```html
<button type="submit">Save</button>
```