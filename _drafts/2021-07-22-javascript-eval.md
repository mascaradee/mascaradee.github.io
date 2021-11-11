---
layout: post
date: 2021-07-22 14:14:00 +0900
title: '[javascript] eval'
categories:
  - javascript
tags:
  - eval
---

* Kramdown table of contents
{:toc .toc}

## eval()

문자리터럴을 자바스크립트로 변환하여 처리할 수 있도록 한다.

`eval(문자리터럴)`


```html
<input type="hidden" id="playerVars" value="{playsinline: 1, version: 1, loop: 0, autoplay: 0, controls: 1, modestbranding: 1, fs: 0, rel: 0 }"/>
```


```js
eval('var playerVars = ' + $('#playerVars:input').val());
this.playerVars = playerVars;
```


// 동적변수
//  mayflies2108p._0809onlineSale[brandCode]와  mayflies2108p._0809onlineSale.brandCode 는 동일한 의미이나
// brandCode의 값이 문자열이기 때문에 []를 사용한다.
var brandCode = 'brandCode' + brLgcAeEvtCdSeq;
if (typeof mayflies2108p._0809onlineSale[brandCode] === 'undefined') {
  mayflies2108p._0809onlineSale[brandCode] = 0; // 동적변수 초기화
}
if (json.ret > 0) {
  return;
}