---
layout: post
date: 2020-05-13 00:00:00 +0900
title: '[javascript] prompt and comfirm'
categories:
  - javascript
tags:
  - prompt
  - comfirm
---

* Kramdown table of contents
{:toc .toc}

## prompt
title과 default 입력과 함께 확인, 취소 버튼이 있는 모달창이 뜬다.
파폭, 사파리, 에지 외에는 버전별로 제한이 있다.

`result = prompt(title, [default])`

* title: 모달창에 보여지는 문자열
* default(optional): 입력필드의 초기값으로 사용자가 변경할수 있음.
* result: 사용자가 입력한 값 혹은 null

```javascript
let grade = prompt("몇 학년이니?", "1");
alert(`넌 ${grade}학년이구나`);
```


<br>

## comfirm
모달창에 질문이 출력되고 확인, 취소 버튼으로 true, false 결과를 받는다.
크롬과 오페라에서는 버전별로 제한이 있다.

`result = comfirm(question)`

* question: 모달창에 보여지는 질문
* result: true or false

```javascript
let isMom = confirm("저장하시겠습니까?")
alert(isMom);
```
