---
layout: post
date: 2021-07-22 14:14:00 +0900
title: '[javascript] 동적변수'
categories:
  - javascript
tags:
  - eval
---

* Kramdown table of contents
{:toc .toc}

## 동적변수

//  mayflies2108p._0809onlineSale[brandCode]와  mayflies2108p._0809onlineSale.brandCode 는 동일한 의미이나
// brandCode의 값이 문자열이기 때문에 []를 사용한다.
var brandCode = 'brandCode' + brLgcAeEvtCdSeq;
if (typeof mayflies2108p._0809onlineSale[brandCode] === 'undefined') {
  mayflies2108p._0809onlineSale[brandCode] = 0; // 동적변수 초기화
}
if (json.ret > 0) {
  return;
}
