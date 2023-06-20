---
layout: post
date: 2022-12-02 09:05:00 +0900
title: '[javascript] Transition'
categories:
  - javascript
tags:
  - vue
  - transition
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue transition](https://vuejs.org/guide/built-ins/transition.html)


## transition

뷰는 상태변경에 대한 응답으로 전환과 애니메이션 작업에 도움이 되는 빌트인 컴포넌트를 제공한다.   

- `<Transition>` 컴포넌트는 요소나 컴포넌트가 DOM에 들어오고 나갈때 애니메이션 적용을 위해 사용한다. 
- `<TransitionGroup>` 컴포넌트는 `v-for` 리스트에 요소나 컴포넌트가 추가되거나 제거 혹은 이동될 떄 사용한다. 

위 2개의 컴포넌트외에도 토글 CSS나 상태를 조정하는 스타일 바인딩 기술을 통해 애니메이션을 적용할 수 있다. 

## <Transition> 컴포넌트

`<Transition>`컴포넌트는 내장 컴포넌트로 등록없이 모든 컴포넌트의 템플릿 상에서 사용이 가능하다.   
기본 슬롯을 통해 전달된 요소나 컴포넌트상에 들어오고 나가는 애니메이션을 적용할 때 사용한다. 들어오기와 나가기는 아래 중 하나에 의해 트리거됩니다.   

- `v-if`를 통해 조건적 렌더링이 될때
- `v-show`로 조적적 노출이 될때
- `<component>`라는 특별 요소를 통해 유동적인 컴포넌트 토글이 일어날떄 


```html
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```css
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

참고로 `<Transition>`컴포넌트는 하나의 요소 혹은 컴포넌트의 슬롯 내용에만 적용이 된다. 만약 슬롯내용이 컴포넌트로 되어 있다면 하나의 루트 요소만 가진 것이어야만 한다.  

