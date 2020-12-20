---
layout: post
date: 2020-12-15 20:00:00 +0900
title: '[css] flext box'
categories:
  - css
tags:
  - flext box
---

* Kramdown table of contents
{:toc .toc}


## 참고 사이트  

[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS)  
[MDN flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)  
[MDN align-content 참고](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)  
[드림코딩by엘리 - flexbox](https://www.youtube.com/watch?v=7neASrWEFEM)  
[css 연습](https://flexboxfroggy.com/#ko)  
[flexbox 개념](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)  

## flex box

박스(`container`)와 아이템(`item`)에 적용할 수 있는 속성이 있다.  
- 박스 속성 : `display, flex-direction, flex-wrap, flex-flow, justify-content, align-items, align-content`  
- 아이템 속성 : `order, flex-grow, flex-shrink, flex, align-self`  

중심축, 반대축 - 중심축에 따라 반대축이 수평 혹은 수직으로 바뀌기도 한다.  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='/css/flex-box.css'/>
</head>
<body>
    <div class="container">
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">3</div>
        <!-- <div class="item item4">4</div>
        <div class="item item5">5</div>
        <div class="item item6">6</div>
        <div class="item item7">7</div>
        <div class="item item8">8</div>
        <div class="item item9">9</div>
        <div class="item item10">10</div>
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">3</div>
        <div class="item item4">4</div>
        <div class="item item5">5</div>
        <div class="item item6">6</div>
        <div class="item item7">7</div>
        <div class="item item8">8</div>
        <div class="item item9">9</div>
        <div class="item item10">10</div>
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">3</div>
        <div class="item item4">4</div>
        <div class="item item5">5</div>
        <div class="item item6">6</div>
        <div class="item item7">7</div>
        <div class="item item8">8</div>
        <div class="item item9">9</div>
        <div class="item item10">10</div> -->
    </div>
</body>
</html>
```

```css
.container {
    padding-top: 100px;
    background: beige;
    height: 100vh; /* 보이는 화면의 100%를 모두 사용하겠다.*/
    display: flex; /* item을 가로로 일렬로 붙여서 보여진다. 왼쪽부터 오른쪽으로 정렬*/

    /* flex-direction: row;       */
    /*
    flex-direction  중심축(아이템이 진행되는 방향)을 지정
    row(default): 화면의 왼쪽에서 오른쪽으로 아이템이 그려짐 (1,2,3 ~ 10)
    row-reverse : 화면의 오른쪽부터 왼쪽으로 아이템이 그려짐 (10,9,8~ 1)
    column :  수직으로 위부터 아래로   (1,2,3 ~ 10)
    column-reverse : 수직으로 아래부터 위로 (10,9,8~ 1)
    */

    /* flex-wrap: wrap; */
    /*
    flex-wrap 화면 기준으로 열이 더 많을 경우 줄바꿈을 한다.
    nowrap(default) : 줄바꿈 안한다.
    wrap : 화면의 폭에 맞춰 줄바꿈
    wrap-reverse : 아래부터 시작해서 위로 줄바꿈이 생긴다.
    */

    /* flex-flow: column nowrap;  */
    /* flex-direction + flex-wrap 한 속성 */

    /* justify-content: space-between; */
    /*
    justify-content 중심축에서 아이템을 어떻게 배치 할 것인지
    1) flex-direction: row; 인 경우       
        flex-start(default) : 순서는 html에 그려진 순서대로 왼쪽정렬 (1,2,3, ~ 10)
        flex-end : 순서는 html에 그려진 순서대로 오른쪽정렬(1,2,3, ~ 10)
        center : 행의 중간정렬
    2) flex-direction: column; 인 경우       
        flex-start(default) : 순서는 html에 그려진 순서대로 위쪽정렬  (1,2,3, ~ 10)
        flex-end : 순서는 html에 그려진 순서대로 아래쪽정렬 (1,2,3, ~ 10)
        center : 열의 중간정렬
    space-around : 아이템을 스페이스로 감싸는 것. 사이마다 간격을 준다. 첫번째, 마지막 아이템만 각 왼쪽 오른쪽이 하나의 스페이스로만 둘러져 폭이 좁다
    space-evenly : 모든 간격 동일하게
    space-between : 첫, 마지막 아이템은 화면에 딱 맞게 붙이고 나머지에는 사이 간격을 준다.
    */

    /* align-items : baseline; */
    /*
    align-items 반대축에서 아이템을 어떻게 배치 할 것인지
    center : 중앙정렬
    baseline : 아이템 내 텍스트가 모두 동일한 위치로 보일 수 있도록 배치
     e.g 아이템1의 padding: 40px 조건이 있어 다른 아이템과 차이가 있을때 아이템1의 텍스트 위치와 동일한 선상에 다른 아이템 텍스트를 보일 수 있도록 배치한다.
    */

    /* align-content:space-between; */
    /*
    align-content 반대축에서 아이템 배치
    center : 중앙
    space-between : 중간 줄의 아이템의 간격을 띄운다.?
    */
}

.item {
    width: 40px;
    height: 40px;
    border: 1px solid black;
}

.item1 {
    background: #ffcdd2;
    /* padding : 40px; */

    /* order: 2;  */
    /* order : 아이템의 순서를 변경하는데 사용, 실무에서 별로 사용하진 않음 */

    /* flex-grow: 2; */
    /*
    flex-grow  중요한 속성으로 컨테이너가 커졌을때 공간을 꽉 채우려는 속성이다.
    0: 아이템 자신의 크기만 유지
    1: 아이템 크기를 제외한 나머지 공간도 채우려고 한다. 다른 아이템과 비례해 1만큼 더 채운다. 만약 2가 되면 다른 아이템보다 2배로 더 공간을 차지한다.
    */

    /* flex-shrink: 2; */
    /*
    flex-grow  중요한 속성으로 컨테이너가 줄어들었을때 아이템을 줄이려는 속성이다.
    0: 아이템 자신의 크기만 유지
    1: 아이템 크기보다도 줄어드는데 비율대로 더 숫자가 클수록 더 많이 줄어든다.
    */

    /* flex-basis: 60%; */
    /*
    flex-basis  컨테이너의 크기 변경에 따라 공간을 차지하는데 더 세부적으로 세팅할 수 있다. flex-grow나 flex-shrink를 쓰지 않아도 이걸로 한번에 해결 가능
    */

    flex: 2 2 auto; /*grow, shrink, basis*/

    align-self: center; /*아이템별로 정렬 */
}
.item2 {
    background: #f8bbd0;
    /* order: 1; */
    /* flex-grow: 1;
    flex-shrink: 1; */
    /* flex-basis: 30%; */
}
.item3 {
    background: #e1bee7;   
    /* order: 3; */
    /* flex-grow: 1;
    flex-shrink: 1; */
    /* flex-basis: 10%; */
}
.item4 {
    background: #d1c4e9;
}
.item5 {
    background: #c5cae9;
}
.item6 {
    background: #bbdefb;
}
.item7 {
    background: #b3e5fc;
}
.item8 {
    background: #b2ebf2;
}
.item9 {
    background: #b2dfdb;
}
.item10 {    
    background: #c8e6c9;
}
```
