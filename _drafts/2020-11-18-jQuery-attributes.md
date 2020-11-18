
---
layout: post
date: 2020-11-18 18:00:00 +0900
title: '[jQuery] attributes'
categories:
- jQuery
tags:
- attributes
---

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- attributes
[https://api.jquery.com/category/attributes/](https://api.jquery.com/category/attributes/)

# attributes  

## .attr()  

파라미터가 없을땐 특정 속성의 값을 가져온다. 파라미터가 있으면 특정 속성의 값을 주어진 값으로 변경한다.  

```javascript
$('#me').attr('data-howareyou')  
$('#me').attr('data-howareyou', 'fine-thank-you');  
```

## .removeAttr()  

선택한 요소의 특정 속성을 제거한다. .attr()은 속성을 제거하지 못하기 때문에 해당 경우 이 메서드를 사용해야 한다

```javascript
$('input:disabled').removeAttr('disabled');  
```

## .prop()  

파라미터가 없을땐 특정 프로퍼티의 값을 가져온다. 파라미터가 있으면 특정 프로퍼티의 값을 주어진 값으로 변경한다.  

```javascript
$('input:disabled').prop('disabled'); // true  
$('input:disabled').prop('disabled', false);  
```

## .removeProp()  

선택한 요소의 특정 프로퍼티를 제거한다.  

## .val()  

선택한 요소의 값을 가져오거나 설정한다.  
