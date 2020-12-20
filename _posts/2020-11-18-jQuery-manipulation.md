---
layout: post
date: 2020-11-18 15:00:00 +0900
title: '[jQuery] manipulation'
categories:
- jQuery
tags:
- manipulation
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- manipulation
[https://api.jquery.com/category/manipulation/](https://api.jquery.com/category/manipulation/)

# manipulation  

## .after(), .before(), .insertAfter(), .insertBefore()  

지정한 요소나 새로 만든 요소를 선택한 요소의 뒤 혹은 앞에 붙여넣는다.   
`.append()`나 `.prepend()`는 선택 요소의 자식이 되며, `.after()`나 `.before()`는 선택 요소의 형제가 된다.  

### 변경 전  

```HTML
<div id="father">
	<article id="me"></article>
</div>
```

### 변경 후

새 요소를 추가하는 방식으로 `father`의 형제로 `uncle-sam`이 추가됨

```javascript
$('#father').after('<div id="uncle-sam"></div>');
```
```HTML
<div id="father">
	<article id="me"></article>
</div>
<div id="uncle-sam"></div>
```

기존 요소의 위치를 변경하는 방식으로 `father`의 자식이던 `me`가 `father`와 형제레벨로 이동한다.

```javascript
$('#father').after($('article#me'));
$('article#me').insertAfter('#father'); // 윗 줄과 같은 결과
```
```HTML
<div id="father"></div>
<article id="me"></article>
<div id="uncle-sam"></div>
```

## .append(), .prepend(), .appendTo(), .prependTo()  

지정한 요소나 새로 만든 요소를 선택한 요소의 안쪽 마지막 혹은 맨 앞에 붙여넣는다.  

### 변경 전  

```HTML
<div id="father">
	<article id="me"></article>
</div>
<div id="imNext"></div>
```

### 변경 후

새 요소를 추가하는 방식  

```javascript
$('#father').append('<div id="주워온아이"></div>');
```
```HTML
<div id="father">
	<article id="me"></article>
	<div id="주워온아이"></div>
</div>
<div id="imNext"></div>
```

기존 요소의 위치를 변경하는 방식  

```javascript
$('#father').append($('#imNext'));
$('#imNext').appendTo('#father');  // 윗 줄과 같은 결과
```
```HTML
<div id="father">
	<article id="me"></article>
	<div id="주워온아이"></div>
	<div id="imNext"></div>
</div>
```

## .remove()  

선택한 요소를 삭제한다.  자식요소도 포함하염 삭제한다.  

```javascript
$('div').remove()  
```

## .replaceWith(), .replaceAll()

선택한 요소를 주어진 태그로 대체하며 원래 있던 요소는 삭제한다.  
.replaceAll()은 replace의 대상과 피대상을 반대로 적용하는 메서드다.

```javascript
$( '#father' ).replaceWith( '<h2>New heading</h2>' );
$( '<h2>New heading</h2>' ).replaceAll( '#father' );  
```

## .text()  

파라미터 없이 쓰일 경우 선택한 요소 하위의 모든 텍스트 노드를 더해 반환한다.  

```HTML
<section id="for-text">
	안녕
	<div id="hello">하시
		<div id="hi">렵니까?</div>
	</div>
</section>
```
```javascript
$('#for-text').text();  

// 결과
"
		안녕
		하시
			렵니까?

	"
```

파라미터가 있으면 선택한 요소의 내부에 주어진 문자열을 텍스트 노드로 만들어 대체한다.   
이 경우 기존에 있던 태그가 사라진다.

```javascript
$('#for-text').text('신동엽');  

```
```HTML
<section id="for-text">신동엽</section>
```

## .html()  

파라미터 없이 쓰일 경우 선택한 요소 하위의 모든 요소를 HTML 형식의 텍스트로 반환한다.  

```javascript
$('section').eq(0).html();  

// 결과
"
		<form>
			<fieldset>
				<input type="text">
				<input type="text" value="123">
				<input type="button">
				<input type="reset" value="리셋1">
				<button type="reset">리셋2</button>
				<textarea></textarea>
			</fieldset>
		</form>		
	"
```

파라미터가 있으면 선택한 요소의 내부를 주어진 HTML로 대체한다.  

```javascript
$('section').eq(0).html('<p>헬로워얼드</p>');  
```
```HTML
<section style="position: relative;"><p>헬로워얼드</p></section>
```

## .wrap()  

선택한 요소를 주어진 태그로 각각 감싼다. `.append()`나 `.prepend()`와 반대로 부모를 추가하는 메서드.  

```javascript
$( '#father' ).wrap( "<div id='grandmother'></div>" );  
```
```HTML
<div id='grandmother'>
	<div id="father">
		<article id="me"></article>
	</div>
</div>
```

## .wrapAll()  

선택한 요소를 주어진 태그로 감싼다. `.wrap()`과 차이점은 선택한 요소가 여러개일 때 모두 묶어서 하나의 부모만 추가한다는 것이다.

```javascript
$( '.abc' ).wrapAll( '<div class="new" />');  
```

```HTML
<div class="new">
	<div class="align-center abc" id="grandgrandfather">
		<div class="abc" id="grandfather">
			<div id="father">
				<article id="me"></article>
			</div>
		</div>
	</div>
</div>
```

## .wrapInner()  

선택한 요소의 모든 자식을 주어진 태그로 감싼다.  

```javascript
$( '.abc' ).wrapInner( '<div class="new" />');    
```
```HTML
<div class="align-center abc" id="grandgrandfather">
	<div class="new">
		<div class="abc" id="grandfather">
			<div class="new">
				<div id="father">
					<article id="me"></article>
				</div>
			</div>
		</div>
	</div>
</div>
```

## .unwrap()  

선택한 요소를 감싸고 있는 태그, 즉 부모를 삭제한다.  

```javascript
$('form').unwrap();  
```
