---
layout: post
date: 2022-03-22 08:27:00 +0900
title: '[javascript] on()'
categories:
  - javascript
tags:
  - jQuery
  - on
  - bubble
  - event
  - method
---

* Kramdown table of contents
{:toc .toc}

## .on()

이벤트를 붙여주는 기능이라고 생각하면 쉬움.
브라우저가 클릭과 같은 사용자 액션에 맞춰 이벤트를 생성하면서 미리 정의해둔 핸들러함수를 호출해 준다.

`.on( events [, selector ] [, data ], handler )`  
`부모요소.on(이벤트종류명 [, 적용 셀렉터] [, 데이터], 핸들러함수)`

아래 예시에서 `on`메소드는 `change` 이벤트가 발생하면 `input` 셀렉터에 로그를 찍는 `핸들러함수`를 붙여주는 역할을 한다. `userInfo`로 제한을 뒀기때문에 저장여부의 `input`은 해당되지 않는다.

```html
<div id="userGroup">
    <div id="userInfo">
        <label>아이디</label>
        <input type="text" id="userId" name="userId" value="" /><br/>
        <label>이름</label>
        <input type="text" id="userName" name="userName" value="" /><br/>
    </div>
    <div id="saved">
        <label>저장여부</label>
        <input type="checkbox" id="checkYn" /><br/>
    </div>
</div>
```

```js
$('#userInfo').on('change', 'input', () => {
  console.log($(event.target).val()); // checkYn은 해당하지 않는다.
});
```

참고로 `.trigger()`는 `.on()`과 같은 기능이나 브라우저이벤트뿐만 아니라 커스텀이벤트도 처리할수 있다.


`.on( events [, selector ] [, data ] )`  
`부모요소.on(이벤트정보 [, 적용 셀렉터] [, 데이터])`

`events` 인수는 키:값 형태로 이벤트와 핸들러함수를 매핑해 줄 수 있다.
예시를 두번째 형태로 고치면 아래와 같다.

```js
$('#userInfo').on({
    change: function() {
        console.log($(event.target).val());
    }
}, 'input');
```

셀렉터가 생략된다면 버블효과에 의해 `userGroup`요소 하위의 요소들에서 `change` 이벤트가 발생할 경우
모두 이벤트 핸들러를 호출하게 된다.

```html
<div id="userGroup">
    <div id="userInfo">
        <label>아이디</label>
        <input type="text" id="userId" name="userId" value="" /><br/>
        <label>이름</label>
        <input type="text" id="userName" name="userName" value="" /><br/>
        <label>좋아하는 과일은?</label>
        <select id="fruit" name="fruit">
            <option value="apple">apple</option>
            <option value="banana">banana</option>
            <option value="citrus">citrus</option>
        </select>
    </div>
    <div id="saved">
        <label>저장여부</label>
        <input type="checkbox" id="checkYn" /><br/>
    </div>
</div>
```
```js
$('#userGroup').on({
    change: function() {
        console.log($(event.target).val());
    }
});
```
