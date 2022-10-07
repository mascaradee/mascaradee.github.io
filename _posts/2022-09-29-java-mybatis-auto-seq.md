---
layout: post
date: 2022-09-29 09:05:00 +0900
title: '[java] mybatis auto seq'
categories:
  - java
tags:
  - mybatis
  - autoSeq
---

* Kramdown table of contents
{:toc .toc}


## mybatis에서 등록 후 자동부여되는 순번을 돌려받고 싶으면 아래 속성을 추가한다. 

`useGeneratedKeys="true" keyProperty="interestKeywordAutoSn"`

```
<insert id="insertInterestCategory" useGeneratedKeys="true" keyProperty="interestKeywordAutoSn">
```