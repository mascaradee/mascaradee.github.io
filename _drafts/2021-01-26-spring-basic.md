---
layout: post
date: 2021-01-26 10:59:00 +0900
title: '[spring] spring basic'
categories:
  - spring
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

## 참고
[https://spring.io/projects/spring-framework](https://spring.io/projects/spring-framework)  
[Spring MVC](https://docs.spring.io/spring-framework/docs/5.2.12.RELEASE/spring-framework-reference/web.html#spring-web)

### Git 설정

Git 레파지토리를 만든 후 로컬로 클론한다.  
레파지토리를 먼저 만들게 되면 `upstream` 설정을 따로 하지 않아도 되므로 편하다.  

`git clone https://github.com/mascaradee/Apple.git`

이클립스 `git perspective`에서 레파지토리 설정 후 로컬 레파지토리 `import` 하여 프로젝트까지 만든다.

### 폼파일에 추가

 ```
<!-- spring -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>${org.springframework-version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context-support</artifactId>
    <version>${org.springframework-version}</version>
</dependency>
```

### 구성파일

WebAppInitializer.java
WebConfig.java
RootConfig.java
