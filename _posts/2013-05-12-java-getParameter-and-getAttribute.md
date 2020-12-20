---
layout: post
date: 2013-05-12 07:27:00 +0900
title: '[java] getParameter and getAttribute'
categories:
  - java
tags:
  - getParameter
  - getAttribute
---

* Kramdown table of contents
{:toc .toc}

## getParameter
- GET / POST 방식으로 파라미터 값을 넘기 고, 그 값을 사용할때 쓰는 메소드가 getPara meter이며, 리퀘스트 영역에 있는 메소드이다.  
- getParameter는 String타입을 반환.  

## getAttribute
- getAttribute는 page, request, response, s ession, application과 같은 스코프 영역에 임의의 속성값(Attribute)을 저장하고 가져올 때 사용하는 것이다.  
- 거의 모든영역에서 공통적으로 사용하는 메소드로 해쉬맵방식으로 key값 value값을 settAttribute메소드를 이용해서 저장하고, getAttribute메소드를 이용해서 반환.  
- getAttribute는 Object타입으로 반환.  
