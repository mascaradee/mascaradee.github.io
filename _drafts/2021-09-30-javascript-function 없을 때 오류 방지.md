---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[] '
categories:
  -
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

## function 정의되지 않아 나는 오류 방지

`Uncaught ReferenceError: setTimeoutFor15countReviewMain is not defined`


`function` 정의의가 없이 호출만 했을 때 나는 에러로  곳을 찾을 수 없다는 에러이다.
간단한 방지책으로 `typeof`를 사용하면 예방 할 수 있다. 



```js
onclick="typeof setTimeoutFor15countReviewMain == 'function' && setTimeoutFor15countReviewMain();"


if (typeof setTimeoutFor15countReviewMain == 'function') {
  if (idxcont == 2) {
    setTimeoutFor15countReviewMain();
  } else {
    $('#evtFloatingBanner01').hide();
  }
}

```
