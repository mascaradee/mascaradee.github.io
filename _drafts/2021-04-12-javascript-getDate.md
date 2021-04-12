---
layout: post
date: 2021-04-12 14:46:00 +0900
title: '[javascript] getDate'
categories:
  - javascript
tags:
  - getDate
---

* Kramdown table of contents
{:toc .toc}

## 기준일로부터 오늘이 몇 번째 날인지

```
getDay: function () {

  var today = new Date();
  var standardDay = new Date($('input[id="evtStrtDt"]:hidden').val());
  var daysAfter = (today.getTime() - standardDay.getTime()) / (1000*60*60*24);
  mplanshop.mayflies2104._202104_26parentsDay.evtDay = Math.ceil(daysAfter);
  if (mplanshop.mayflies2104._202104_26parentsDay.evtDay < 0) {
    alert('이벤트기간이 아닙니다. ');
    return;
  }
  return mplanshop.mayflies2104._202104_26parentsDay.evtDay;
},
```
