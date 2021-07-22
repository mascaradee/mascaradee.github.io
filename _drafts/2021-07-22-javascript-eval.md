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
