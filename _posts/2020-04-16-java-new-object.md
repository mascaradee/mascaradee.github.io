---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[java] new object'
categories:
  - java
tags:
  - object
  - newInstance
---


```java
class MyClass{
	String name = "mascaradee";
}

public class Test {
	// 객체 생성 1
	MyClass myClass = new MyClass();
	logger.debug("myClass.name : " + myClass.name);

	// 객체 생성 2
	Class cls = Class.forName("MyClass"); // 클래스만 로드
	MyClass obj = (MyClass) cls.newInstance(); // 객체생성
	logger.debug("myClass.name : " + obj.name);
}
```
