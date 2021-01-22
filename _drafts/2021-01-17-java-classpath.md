---
layout: post
date: 2021-01-17 15:35:00 +0900
title: '[java] 클래스패스 classpath'
categories:
  - java
tags:
  - classpath
---

* Kramdown table of contents
{:toc .toc}

## 클래스패스 classpath

개발자가 자바로 `.java`소스파일을 생성하면, 컴파일러는 `JVM`이 알 수 있도록 소스파일을 바이트 코드로 변환하는데 그 결과가 `.class` 파일이고 이 변환 과정을 컴파일이라고 한다. `JVM`에게 생성된 `.class` 파일이 어디에 있는지 알려주는 게 바로 클래스패스다.  즉, 클래스패스란 클래스가 있는 경로다.
