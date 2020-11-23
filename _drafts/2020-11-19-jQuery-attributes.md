
---
layout: post
date: 2020-11-19 17:00:00 +0900
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

```HTML
<div class="abc" id="grandfather">
  <div id="father">
    <article id="me" data-howareyou="fine-thankyouandrew?"></article>
  </div>
</div>
```

속성의 값을 출력  

```javascript
$('#me').attr('data-howareyou');

// 출력결과: "fine-thankyouandrew?"
```

파라미터 값으로 변경  

```javascript
$('#me').attr('data-howareyou', 'fine-thank-you');  
```

결과로 `data-howareyou` 속성의 값이 변경된것을 확인할 수 있다.

```HTML
<div class="abc" id="grandfather">
  <div id="father">
    <article id="me" data-howareyou="fine-thank-you?"></article>
  </div>
</div>
```

## .removeAttr()  

선택한 요소의 특정 속성을 제거한다.  
`.attr(속성명, '')`처럼 파라미터에 ''를 지정하면 속성값만 제거 되고 속성 자체는 제거하지 못하기 때문에 해당 경우 이 메서드를 사용해야 한다.  
참고로 `.attr(속성명, null)`인 경우에는 속성 자체를 제거할 수 있다.

```HTML
<input type="text" disabled>
```

```javascript
$('input:disabled').removeAttr('disabled'); // 속성 제거
$('input:disabled').attr('disabled', null); // 윗 라인과 같은 기능
//$('input:disabled').attr('disabled', ''); // 아무 반응이 없음
```

결과

```HTML
<input type="text">
```

## .prop()  

파라미터가 없을땐 특정 프로퍼티의 값을 가져온다. 파라미터가 있으면 특정 프로퍼티의 값을 주어진 값으로 변경한다.  

```javascript
$('input:disabled').prop('disabled'); // true  
$('input:disabled').prop('disabled', false);  // 결과는 removeAttr과 같음, 참고로 disabled는 속성이나 프로퍼티임.
```

## .removeProp()  

선택한 요소의 특정 프로퍼티를 제거한다.  

```javascript
$('input:disabled').prop('aatestProp', 1234);
// console 창에서 확인 가능
// jQuery.fn.init [input, prevObject: jQuery.fn.init(1)]
//  0: input
//    aatestProp: 1234
//    accept: ""
//    ... (중략)

$('input:disabled').removeProp('aatestProp');
// jQuery.fn.init [input, prevObject: jQuery.fn.init(1)]
//  0: input
//    accept: ""
//    ... (중략)
```


## .val()  

선택한 요소의 `value` 속성의 값을 가져오거나 설정한다.  

```html
<input type="reset" value="리셋1">
```

```javascript
$('input:reset').val(); // 리셋1  
$('input:reset').val('리이셋1');
```

결과는  

```html
<input type="reset" value="리이셋1">
```
