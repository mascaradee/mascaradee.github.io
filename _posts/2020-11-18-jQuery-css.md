---
layout: post
date: 2020-11-18 15:00:00 +0900
title: '[jQuery] css'
categories:
- jQuery
tags:
- css
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 셀렉터 : css
[https://api.jquery.com/category/css/](https://api.jquery.com/category/css/)

# css  

## .addClass()  

선택한 요소에 클래스를 더한다.  
`second-one, third-one`는 실제 정의된 곳이 없지만 오류없이 클래스는 추가된다.  
정의된 내용이 없으므로 단지 클래스명만 추가되는 결과가 나온다.

```css
.affected {
	border: 3px solid red;
}
```
```js
$('input').addClass('affected');  
$('input').addClass('affected, second-one, third-one');  
```

## .removeClass()  

선택한 요소에 특정 클래스를 삭제한다.  

```js
$('input').removeClass('affected');  
$('input').removeClass('affected, second-one, third-one');  
$('input').removeClass('affected, second-one'); // 이 경우, second-one만 제거되는데?  
```

## .hasClass()  

선택한 요소에 지정한 클래스가 있으면 true, 아니면 false 리턴  

```js
$('input').hasClass('second-one');  
```

## .toggleClass()  

선택한 요소에 지정한 클래스를 토글한다. 클래스가 없으면 추가하고 있으면 지운다.  

```js
$('input').toggleClass('second-one');  
```

## .css()  

선택한 요소의 스타일을 변경한다. 혹은 선택한 요소의 특정 스타일을 가져온다.  

```js
$('div').css('display', 'none'); // display 스타일의 값을 none으로 변경  
$('div').css('display'); // display 스타일의 값을 리턴 , 즉, 현재 none 값이므로 none 리턴
```
