---
layout: post
date: 2020-12-09 18:00:00 +0900
title: '[jQuery] events'
categories:
  - jQuery
tags:
  - events
---

* Kramdown table of contents
{:toc .toc}


## 참고사이트
- `jQuery` 공식 도움말  
[https://api.jquery.com](https://api.jquery.com)

- events    
[https://api.jquery.com/category/events/](https://api.jquery.com/category/events/)

# events  

## .bind()

이벤트 핸들러를 할당하는 메서드. 3.x 버전부터 deprecated 상태임.  

```html
<select class="custom-select d-block w-100" id="country" name="country" >
  <option value="">Choose...</option>
  <option selected>United States</option>
</select>
```
```js
$(function(){
  function fn1() {
    console.log('What did you call me?');
  }
  // $('#country').click(fn1);
  $('#country').bind('click', fn1);
});
```

## .off()

이벤트 핸들러를 제거하는 메서드  

```js
$('#country').off(); // id="country"의 모든 이벤트 핸들러 삭제
$('#country').off('click'); // id="country"의 'click' 이벤트 핸들러 삭제
```

## .one()

한 번 실행하면 사라지는 이벤트 핸들러를 할당한다.  

```js
$('#country').one('click', function () { console.log('hi');});
```

## .on()

이벤트 핸들러를 할당하는 메서드... 의 확장판

1) .bind()처럼 사용하기

```js
$('#state').on('change', function() {
  console.log('뮈신가 바껴부럿구마잉');
})
```

2) 버블링을 이용한 동적으로 생성된 태그 핸들링 하기  

```html
<body>
    <form id="myForm">
        <div id = appendAfterMe>
            <button type="button" id="appendCheckBoxBtn">체크 박스 추가</button><br><br>
            <input type="checkbox" checked id="same-address" > same-address<br><br>
            <input type="checkbox" id="same-info" > same-info<br><br>
            <input type="text" id="address" value="서울 노원 어딘가"><br><br>
            <input type="text" id="address2" value="어딘가"><br><br>
            <input type="text" id="zip" value=07123>
        </div>
    </form>
</body>
```
```js
// 아래처럼 이미 만들어져 있는 태그에 이벤트 핸들러를 할당할 경우  
var n = 0;
function fn2() {
    console.log(n++ + ': 안녕하세요. 체크박스에오.');
}
$('input:checkbox').on('click', fn2); // 이 이벤트가 생성될 때 존재하는 checkbox에만 적용된다.

// 나중에 추가된 태그에는 핸들러를 따로 할당해야 제대로 작동한다.
/*
$('#appendCheckBoxBtn').click(function() {
    $('<input type="checkbox">').appendTo('#appendAfterMe');
    $('input:checkbox').click(fn2); // 추가된 태그에 핸들러 할당
});
*/

// 하지만 아래와 같이 버블링 방식의 .on()을 활용하면 간단히 해결된다.
// 이벤트가 전달되는 상위로 전달되는 버블링 특성을 이용해 myForm 이하의 checkbox에서 발생한 이벤트를 핸들하는 방법   
$('#appendCheckBoxBtn').click(function() {
    $('<input type="checkbox">').appendTo('#appendAfterMe');
});
$('#myForm').on('click', 'input:checkbox', fn2); // 기존 것과 새로 추가된 것 모두에 이벤트가 적용된다.

// .on()으로 이벤트를 할당하는 또 다른 방법들
//  1) 공백으로 구분된 문자열로 이벤트를 여러개 할당 할 수 있다.
$('#address').on('click mouseover keydown', function() {
    console.log(n++ + ': 안녕하신가! 만일 내게 묻는다면 나는 주소창.')
});
// + 버블링방식
$('#myForm').on('click mouseover keydown', '#address', function(){});

// 2) Object 형식으로 이벤트 할당 할 수 있다.
function fn3() {
    console.log(n++ + ': 이제 콘솔은 지겨워');
}
$('#address2').on({
    click: fn3,
    mouseover: fn3
});
// + 버블링방식
$('#myForm').on({
    click: fn3,
    mouseover: fn3,
}, '#address2');

// 3) 네임스페이스 이용
// 특정 이벤트에 여러 핸들러를 부착할 때, 네임스페이스를 이용해서 각각의 핸들러에 이름을 지정하고 나중에 지울 때 활용할 수 있다.
$('#zip').on('click.abc', function(){
    console.log(n++ + ': 응애에요');
});
$('#zip').on('click.efg', function(){
    console.log(n++ + ': 아 들이대');
});
// 여기서 모종의 이유로 첫 번째 핸들러를 지우고 싶다면?
$('#zip').off('click.abc');

// 네임스페이스를 Object 방식으로
$('#zip').on({
    'click.aaa': function() { console.log(1); },
    'click.bbb': function() { console.log(2); }
});
```
