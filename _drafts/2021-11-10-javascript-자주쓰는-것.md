---
layout: post
date: 2021-11-10 17:00:00 +0900
title: '[javascript] 자주쓰는 것들'
categories:
  - javascript
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

# 자주쓰는 것

## `$`, `jQuery`

jQuery 객체화

```js
$('input[id="masc"]:hidden').val()
```

## 객체초기화 방법

### new Object()

### Object.create()

### Literal notation, 객체 리터럴 표기법

`{}` 안에 `key:value` 형태의 프로퍼티를 갖는 객체를 생성할 수 있다.
`value`에는 원시타입, 또 다른 객체, 함수 등을 넣을 수 있다.

```js
var obj = {}

var obj1 = {
  property1: null, // 변수
  property2: 'hi', // 변수
  property3: {a: 1, b: 2}, // 객제
  property4: function () { // 함수
    console.log('say hi');
  },  
  property5: {
    v1: 10,
    _f1: function () {
      if (obj1.property5.v1 == 10) {
        console.log('hi');
      }
    }
  }
}

// 프로퍼티 접근
obj1.property1; // null
obj1['property2']; // hi
obj1.property3.a; // 1
obj1.property4(); // say hi
obj1.property5._f1();

```

## 객체 리터럴 표기법 vs  JavaScript Object Notation, JSON

| 구분 | 객체 리터럴 표기법 | JSON | 설명 |
|---|---|---|---|
|형식| `{a: 1, b:"하나"}`| `{"a":1, "b":"하나"}`| `JSON`의 `key` 부분은 꼭 ""(쌍따옴표)로 감싸져야 함|
|값|문자열, 숫자, 배열, `boolean`, `null`, 또는 다른 (`JSON`) 객체, **함수** |문자열, 숫자, 배열, `boolean`, `null`, 또는 다른 (`JSON`) 객체| 대부분은 같으나 `JSON`의 값에는 함수를 사용할 수 없음|


## $(document).ready(), $(window).load()

`$(document).ready()`는 DOM이 생성된 후
`$(window).load()`는 DOM 생성 후, 리소스(스타일, 이미지, js 등)까지 다 준비가 된 후

## 브라우저 렌더링 과정 참고

[https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)


## 네임스페이스

자바스크립트 그룹?

`$.namespace()`

`initialize`


---
layout: post
date: 2021-11-10 16:00:00 +0900
title: '[javascript] javascript-group'
categories:
  - javascript
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

# TODO 예시 들어서 정리 필요

## URL의 search param을 객체로 반환하기

```js
/**
 * URL의 search param을 객체로 반환함.
 */
urlParams: function () {
  var params = {};
  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (str, key, value) { params[key] = value; }
  );
  return params;
}
```

## 현재 시간 구하기

```js
/**
 * 현재 시간 구하기. URL의 쿼리스트링에 startDtime가 있으면 해당 시간으로 대체
 * @returns {Date} 현재 시간
 */
getNow: function (format) {
  var params = urlParams();
  var startDtime = params && params.startDtime;
  if (startDtime) {
    try {
      var yer = startDtime.substr(0, 4);
      var mon = startDtime.substr(4, 2);
      var day = startDtime.substr(6, 2);
      if (startDtime.length > 8) {
        var hor = startDtime.substr(8, 2);
        var min = startDtime.substr(10, 2);
        var sec = startDtime.substr(12, 2);
      } else {
        var now = new Date();
        var hor = now.getHours().toString().padStart(2, '0');
        var min = now.getMinutes().toString().padStart(2, '0');
        var sec = now.getSeconds().toString().padStart(2, '0');
      }
      var t = yer + '-' + mon + '-' + day + 'T' + hor + ':' + min + ':' + sec + '+09:00';
      var now = new Date(t);
    } catch (err) { var now = new Date(); }
  } else {
    var now = new Date();
  }
  switch (format) {
    case 'yyyyMMdd':
      return '' + now.getFullYear() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0');
    case 'yyyy-MM-dd':
      return '' + now.getFullYear() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' +  now.getDate().toString().padStart(2, '0');
    case 'HH:mm:ss':
      return '' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');
    default:
      return now;
  }
}
```

## 카운트 다운

```js
/**
 * 기준 시간 ref까지 남은 시간을 object로 반환
 * @param {Date} ref 기준 시간
 * @returns {object} 남은 시간: { 일, 시간, 분, 초 }
 */
countdown: function (ref) {
  var now = getNow().getTime();
  var negative = ref.getTime() < now;
  var total = ref.getTime() - now;
  var seconds = negative ? '00' : Math.floor((total / 1000) % 60).toString().padStart(2, '0').split('');
  var minutes = negative ? '00' : Math.floor((total / 1000 / 60) % 60).toString().padStart(2, '0').split('');
  var hours = negative ? '00' : Math.floor((total / (1000 * 60 * 60)) % 24).toString().padStart(2, '0').split('');
  var days = negative ? '0' : Math.floor(total / (1000 * 60 * 60 * 24)).toString();
  return { seconds: seconds, minutes: minutes, hours: hours, days: days };
}
```

## 메소드

속성의 값을 구하거나 해당 속성값을 변경할 때 사용
`.attr(attributeName)`

```js
$('#id').attr('onclick', 'alert("테스트")');
```

프로퍼티의 값을 구하거나 해당 프로퍼티값을 변경할 때 사용
`.prop(propertyName)`

```js
$('#id').prop('onclick', null);
$("#id2").prop('checked', false);
$("#id3").prop('checked', true);
```

## 삼항 연산자

비교할 값이 참이면 ? 다음 거짓이면 : 다음 값으로 치환하는데 스크립트에서는
비교식 대신 변수 자체를 비교대상으로 넣어도 된다.
만약 아래 예시처럼 `type`이 `false`, `0`, 빈 문자열 (`""`), `NaN`, `null`, 와 `undefined`은 모두 `false` 값이기 때문에 아래와 같이 표현이 가능하다.

```js
type ? type : ''
```


## 요소 감추기 노출하기

`show` = `display:block`, `hide` = `display:none` 과 동일한 기능, `toggle`은 `show`와 `hide`를 번갈아가면서

`$([셀렉터]).show();`

`$([셀렉터]).hide();`

`$([셀렉터]).toggle();`


## 원하는 자리수 만들기

원하는 자리수만큼 앞(왼쪽)에서부터 지정된 문자열로 채운다.

`str.padStart([원하는 자리수], [채워넣을 문자열])`
`str.padRight([원하는 자리수], [채워넣을 문자열])`

원하는 자리수만큼 마지막(오른쪽)부터 지정된 문자열로 채운다.

`str.padEnd([원하는 자리수], [채워넣을 문자열])`
`str.padLeft([원하는 자리수], [채워넣을 문자열])`

```js
var str = 1234;
str = str.toString().padStart(6, '0'); // 6자리 만들기
console.log(str); // 001234
```

## String.prototype.indexOf()

찾으려고 하는 문자열이 `str` 중에 있으면 해당 문자열의 위치, 인덱스를 반환한다. 일치하는 값이 없으면 -1 로 반환

`str.indexOf([찾을 문자열])`

```html
<input type="hidden" id="seqGrp" value="1,2,3"/>
<input type="hidden" id="popId" value="3,4,5"/>
```
```js
matchResultPopup: function (winFvrSeq) {
   var seqGrpArr = $('input[id="seqGrp"]:hidden').val().split(',');
   var popIdArr = $('input[id="popId"]:hidden').val().split(',');
   var index = seqGrpArr.indexOf(winFvrSeq);
   ps.eventDetail.eventShowLayScroll('eventResult' + popIdArr[index]);
}
```


## eval()

`eval()`을 사용하면 해커가 위험한 코드를 사용할 수 있기때문에 주의해서 사용해야 한다.
내부 구조를 짐작한 해커라면 아래 예시에서 `html`의 `liveInfo`의 값들을 변형해 시간이나 날짜를 변경해 버릴 수도 있다.
주요한 정보를 `eval()`로 사용하는 것은 매우 위험하다.

`eval(string)`


```html
<input type="hidden" id="liveInfo" value="{ date: 21, sHour: 19, sMin: 50, eHour: 21}"/>
```
```JS
eval('var liveInfo =' + $('#liveInfo').val());
mayflies2110p._1018onFocus.handleOyLive(liveInfo.date, liveInfo.sHour, liveInfo.sMin, liveInfo.eHour);
```


## 매개변수

```html
<div onclick="queen.issueCoupon('abc1234567890', issueCpnCallBack, ['abc', 'etf']);">쿠폰 다운 받기</div>
```

```js
/**
 * 쿠폰 발급
 * @param {string} cpnNo 쿠폰번호
 * @param {function} callback 콜백함수
 * @param {string[]} checkType 이벤트별 특별한 체크로직이 필요할 경우 사용(선택)
 */
issueCoupon: function (cpnNo, callback, checkType) {
  if (!ps.eventDetail.checkLogin()) {
    return;
  } else {
    if (typeof cpnNo == 'undefined' || cpnNo == '') {
      alert('쿠폰 번호가 없습니다.');
      return;
    }
    if (typeof callback == 'undefined') {
      callback = function (resp) {
        (resp && resp.message) ? alert(resp.message) : console.error(resp);
      }
    }
    var param = { cpnNo: cpnNo, types: checkType ? checkType : ''}; // types: ['abc', 'etf']
    mayfq.loading();
    common.Ajax.sendRequest('POST', _baseUrl + 'coupon/issueCoupon.do', common.convertObjectToQuerystring(param), callback);
  }
}
```
