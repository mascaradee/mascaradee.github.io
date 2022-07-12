---
layout: post
date: 2022-07-12 17:16:00 +0900
title: '[css] css-base '
categories:
  - css
tags:
  - css
---

* Kramdown table of contents
{:toc .toc}

# CSS

## 참고
[CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
[CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
[CSS properties reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)
[flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## selectors

- `*` : 모두
- `div`, li: 태그명
- `#` : 아이디
- `.` : 클래스명
- `:` : 상태 e.g. hover
- `[]` : 속성

```css
selector { 
  property: value;
}
```

# 주요 property

## display

블록,인라인 요소의 속성을 무시하고 수동으로 블록, 인라인 속성으로 변경 할 수 있는 property.

- inline: 설정된 사이즈와 상관없이 컨텐츠를 인라인으로 만든다. 
- inline-block: 컨텐츠와 상관없이 설정된 사이즈에 맞춰 블록이 생기지만 해당 블록이 일렬로 생성된다.
- block: 설정된 사이즈에 맞춰 한 줄에 하나의 블록이 생긴다.


## position

블록의 위치를 조정한다. 

- static: 기본설정, 태그순서대로 그대로 보여준다. 
- relative: 내 위치기준에서 주어진 위치로 변경한다.
- absolute: 나를 감싸고 있는 박스 기준에서 주어진 위치로 변경한다. 
- fixed: window page 기준에서 주어진 위치로 변경한다. 
- sticky: 스크롤이 되어도 위치 변경이 이루어 지지 않는다. 


## float

이미지와 텍스트의 배열을 조정한다. 

- left, right, center


# flex box

중심축과 반대축으로 이루어져 있다.

## container에 적용할 수 있는 property

- display
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content


`display: flex;`   

flex box 사용알림

`flex-direction: row`

박스들이 정렬되는 방향을 지정한다. 

- row 중심축을 가로로 하고 왼쪽에서 오른쪽으로 정렬
- row-reverse 중심축을 가로로 하고 오른쪽에서 왼쪽으로 정렬
- column 중심축을 세로로 하고 위에서 아래로 정렬 
- column-reverse 중심축을 세로로 하고 아래에서 위로 정렬


`flex-wrap: nowrap`  

줄바꿈을 하겠다. 

- nowrap
- wrap 

`flex-flow: row nowrap`  

`flex-direction`과 `flex-wrap`을 하나로 합쳐서 표현한다.


`justify-content: flex-start`  

중심축에서 아이템의 정렬은 그대로 유지한채 배치만 변경한다. 

- flex-start
- flex-end
- center
- space-around
- space-evenly
- space-between



`align-items: center`

반대축에서 아이템의 정렬을 정한다. 

- center
- baseline


`align-content`

반대축에서 아이템의 정렬은 그대로 유지한채 배치만 변경한다. 



## item에 적용할 수 있는 property

- order
- flex-grow
- flex-shrink
- flex
- align-self


`order: 1`  

아이템의 순서를 바꿀때 사용한다. 하지만 거의 사용되지 않음  


`flex-grow: 1`  

아이템의 크기가 늘어날 때 비율. 기본은 0  


`flex-shrink: 1`  

아이템의 크기가 줄어들 때 비율  

`flex-basis: 60%`  

`flex-grow` 와 `flex-shrink`를 합친것과 같다.  


`flex: 2 2 auto`   

`flex-grow` 와 `flex-shrink`와 `flex-basis`를 한 번에 표현한다.  


`align-self: center`  

아이템별 위치 설정을 한다.    

