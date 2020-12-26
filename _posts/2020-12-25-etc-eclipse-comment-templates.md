---
layout: post
date: 2020-12-07 00:00:00 +0900
title: '[etc] eclipse comment templates'
categories:
  - etc
tags:
  - eclipse
  - comment templates
---

## 코드, 주석 템플릿 설정하기

코드와 주석의 템플릿을 파일로 만들어 import 할수 있다.  

이클립스 경로 : `Window > Preferences > Code Style > Code Templates`  

### 주석 템플릿 예시  

```
/**
 *
 * ${tags}
 * @since ${id:date('yyyy-MM-dd')}
 * @author ${user}
 */
```

### 코드 템플릿 예시

```
@SuppressWarnings("unused")
private static final Logger logger = LoggerFactory.getLogger(${type_name}.class);
```
