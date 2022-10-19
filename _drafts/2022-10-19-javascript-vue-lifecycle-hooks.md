---
layout: post
date: 2022-10-19 09:05:00 +0900
title: '[javascript] vue Lifecycle Hooks'
categories:
  - javascript
tags:
  - vue
  - lifecycle
  - hooks
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 라이프사이클 훅](https://vuejs.org/guide/essentials/lifecycle.html)
[Options API 라이프사이클 훅](https://vuejs.org/api/options-lifecycle.html)


# 라이프사이클 훅

뷰 컴포넌트 인스턴스는 데이터관찰 세팅, 템플릿 컴파일, 인스턴스를 DOM에 인식시키기, 데이터 변경을 DOM에 업데이트 하기 등의 일련의 단계를 거친다. 
이런 단계를 따라 함수를 실행시키는데 이것을 라이프사이클 훅이라고 하고 특정 단계에 개발자가 원하는 코드를 넣을 수 있다. 

## 라이프사이클 등록

`mounted` 훅은 컴포넌트가 초기 렌더링과 DOM노드를 생성한 이후에 실행이 된다. `document.ready()`와 같다.

```js
export default {
  mounted() {
    console.log(`the component is now mounted.`)
  }
}
```

인스턴스의 라이프사이클에 따른 단계별로 호출되는 훅이 더 있다. 주로 사용하는 것은 `mounted`, `updated`, `unmounted`  
모든 라이프사이클 훅은 `this`를 호출하는데 이 `this`는 현재 활성화 되어 있는 인스턴스를 가리킨다. 참고로 화살표 함수로 라이프사이클 훅을 정의하면 `this`는 사용할 수 없다.  

## 라이프사이클 다이어그램

![라이프사이클 다이어그램](/images/vue-lifecycle.png)

