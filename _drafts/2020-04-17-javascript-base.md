---
layout: post
date: 2020-04-17 00:00:00 +0900
title: '[javascript] base'
categories:
  - javascript
tags:
  - src
  - semicolon
  - use strict
---

## src 속성
`<script>` 태그는 `src`속성과 내부코드를 동시에 가지지 못함.

#### 연습
`C:\dev\git\mascaradee.github.io\_includes\mine\javascript-src.html`

## 세미콜론
세미콜론 자동 삽입에 의해 줄바꿈이 있으면 대부분 세미콜론 생략 가능.  
하지만 아래와 같이 `+`로 끝나면 불완전한 표현식으로 인식 세미콜론이 자동 삽입되지 않음.
```javascript
alert(1+
2
+3);
```
이렇게 예외적인 경우가 발생하므로 세미콜론을 명시하는 편이 추정하지 못하는 에러를 방지하는데 좋을듯.

## use strict
신규기능은 상관이 없지만 기존기능이 변경된 경우 호환성 문제가 있기 때문에  
ECMAScript5 이후부터 변경된 사항을 적용하기 위해서는 `use strict`를 사용해야함.  
스크립트 최상단 혹은 함수 본문 맨 앞(해당 함수에만 적용됨)에 위치해야 해당 영역에 정확하게 적용이 되고 한 번 적용이 되면 되돌릴수 없음.
