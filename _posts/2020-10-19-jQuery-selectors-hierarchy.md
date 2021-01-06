---
layout: post
date: 2020-10-19 19:00:00 +0900
title: '[jQuery] selectors : hierarchy'
categories:
- jQuery
tags:
- selectors
- hierarchy
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- 셀렉터 : 계층
[https://api.jquery.com/category/selectors/hierarchy-selectors/](https://api.jquery.com/category/selectors/hierarchy-selectors/)


# hierarchy

## Child Selector ("parent > child")

부모 기준으로 자식을 찾는 셀렉터로 오른쪽 꺽쇠로 표현한다. (parent와 child 사이의 빈칸은 허용된다.)  
기준이 되는 태그의 바로 하위에 위치하는 선택할 때 사용한다.  

`$('form:first > fieldset')`  

부모로 지정한 첫번째 `form`의 자식인 `fieldset`을 찾는다.  

모든 자식 요소를 선택하려면 `$('form:first >')`만 써도되고 위 결과와는 달리 `fieldset` 아래 `input` 도 함께 선택한다. 즉, `fieldset`과 같은 레벨(형제)이면 모두 찾는다.

```html
<section>
  <form>
    <fieldset>
      <input type="text">
      <input type="button">
      <input type="reset">
      <button type="reset">리셋</button>
      <textarea></textarea>
    </fieldset>
    <input type="text" value="추가">
  </form>		
</section> <br>
```

## Decendant Selector ("ancestor descendant")

빈칸으로 표현하는 셀렉터. 깊이에 상관 없이 자손 노드를 선택할 때 사용한다.   

`$('form:first input[type=button]')`  

조상으로 지정한 첫번째 `form`의 자손 중 `input[type=button]`을 찾는다.  

모든 자손 요소를 선택하려면 `$('form:first *')`만 써도 됨.  
참고로 `$('form:first ')` 처럼 빈칸만 넣는 것은 자손이 아닌 자신을 첫번째 `form`을 찾는것으로 빈칸은 오타로 치부한다.

```html
<section>
  <form>
    <fieldset>
      <input type="text">
      <input type="button">
      <input type="reset">
      <button type="reset">리셋</button>
      <textarea></textarea>
    </fieldset>
    <input type="text" value="추가">
  </form>		
</section> <br>
```

```javascript
$('form:first input[type=button]').length
// 1
// <input type="button">
$('form:first *').length
// 7
$('form:first ').length
// 1
// <form></form>
```

## Next Adjacent Selector ("prev + next")

형제 노드 중 바로 다음에 있는 노드 하나를 선택할 때 사용한다.  

`$('input:reset + button')`  

`input` 중 `reset` 타입의 다름 형제인 `button`을 찾는다.   
만약 다음에 해당 조건에 맞는 노드가 없다면 리턴되지 않는다.  
`$('input:reset +')`만 써도 됨.  

```html
<section>
  <form>
    <fieldset>
      <input type="reset">
      <div>
        <button>추가버튼</button>
      </div>
      <button type="reset">리셋</button>
    </fieldset>
  </form>		
</section> <br>
```
```javascript
$('input:reset + button').length
// 0 -> 같은 레벨인지는 상관없이 바로 다음 노드를 찾는데 바로 다음은 <div>임
// jQuery.fn.init [prevObject: jQuery.fn.init(1)]
$('input:reset +')
// jQuery.fn.init [div, prevObject: jQuery.fn.init(1)]
```

## Next Siblings Selector ("prev ~ siblings")

형제 노드 중 다음에 오는 지정한 노드를 선택할 때 사용한다.  

`$('input[value=123] ~ textarea')`  

모든 다음 형제 요소를 선택하려면 `$('input[value=123] ~')`만 써도 됨.  

```html
<section>
  <form>
    <fieldset>
      <input type="text" value="123">
      <input type="button">
      <input type="reset">
      <button type="reset">리셋</button>
      <textarea></textarea>
    </fieldset>
    <input type="text" value="추가">
  </form>		
</section> <br>
```
```javascript
$('input[value=123] ~ textarea').length
// 1
$('input[value=123] ~')
/*
<input type="button">
<input type="reset">
<button type="reset">리셋</button>
<textarea></textarea>
*/
```
