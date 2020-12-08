---
layout: post
date: 2020-11-19 19:00:00 +0900
title: '[jQuery] data'
categories:
- jQuery
tags:
- data
---

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- data
[https://api.jquery.com/category/data/](https://api.jquery.com/category/data/)

# data  

## .data()
선택한 요소의 특정 데이터의 값을 가져오거나 설정한다.  
`.data()`는 사용자 정의 속성값을 바꾸는 API를 제공하지 않는다.   
사용자 정의 속성값은 가져오는 것만 가능하다.  
따라서 혼란을 피하기 위해 사용자 속성을 다룰 때는 `.attr()`만 사용하는 것이 좋다.
따라서 사용자 정의 태그(e.g. `data-abc="defg"`)를 다룰 때는  이 메서드를 사용하면 안된다.
`.data()`는 도큐먼트 오브젝트에 객체를 할당하고 싶을 때 사용한다.

```javascript
$('#me').data('foo', { a:1, b:2 });
$('#me').data('foo'); // {a:1, b:2}
```
