---
layout: post
date: 2020-04-14 00:00:00 +0900
title: '[java] split methods'
categories:
  - java
tags:
  - split
  - split to array
  - split to string
---

* Kramdown table of contents
{:toc .toc}

## splitByWholeSeparator

```java
import org.apache.commons.lang.StringUtils;

String content = "1,2,3,4,5";
String separator = ",";

// splitByWholeSeparator() : content를 separator를 기준으로 나눠 문자열 배열로 반환
String[] contents = StringUtils.splitByWholeSeparator(content, separator);
```

<br>

## deepToString

```java
// Arrays.deepToString(배열) : 배열을 [1,2,3,4,5] 형태로 출력
logger.debug(Arrays.deepToString(contents)); // [1,2,3,4,5]
```
