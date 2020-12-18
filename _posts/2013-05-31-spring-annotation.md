---
layout: post
date: 2013-05-31 13:37:00 +0900
title: '[spring] annotation'
categories:
  - spring
tags:
  - annotation
---

## Spring Framework

스프링 2.5 부터 클래스 패스에 위치한 클래스를 검색하여 특정한 어노테이션이 붙은 클래스를 자동으로 빈으로 등록하는 기능을 제공하고 있다. 이 기능을 사용하면 `XML` 설정파일에 다양한 빈 정보를 추가하지 않고 특정한 클래스를 빈으로 등록할 수 있게 된다.  

* 필요한 환경 : jdk5.0 이상  


### @Component

- 목적 : `<context:component-scan>` 태그를 설정파일에 추가하면 해당 어노테이션이 적용된 클래스를 빈으로 등록하게 된다.  
- 설정 위치: 클래스 선언부 위
- 추가설정 : `XML` 설정파일에 `<context:component-scan>`을 정의하고 적용할 기본  패키지를 `base-package` 속성으로 등록한다.

### @Required

- 목적 : 필수 프로퍼티를 지정
- 설정 위치 : `setter`메소드
- 추가설정 : `RequiredAnnotationBeanPostProcessor` 클래스를 빈으로 등록시켜줘야 한다. 해당 설정 대신에 `<context:annotation-config>` 태그를 사용해도 된다.

### @Autowired

- 목적 : 의존관계를 자동설정할 때 사용하며 타입을 이용하여 의존하는 객체를 삽입해 준다. 그러므로 해당 타입의 빈객체가 존재하지 않거나 또는 2개 이상 존재할 경우 스프링은 예외를 발생시키게 된다.  
- 설정 위치 : 생성자, 필드, 메소드(굳이 setter메소드가 아니여도 된다)  
- 추가설정 : `AutowiredAnnotationBeanPostProcessor` 클래스를 빈으로 등록시켜줘야 한다. 해당 설정 대신에 `<context:annotation-config>` 태그를 사용해도 된다.  
- 옵션 : `required` -  `@Autowired`어노테이션을 적용한 프로퍼티에 대해 굳이 설정할 필요가 없는 경우에 `false`값을 주며 이때 해당 프로퍼티가 존재하지 않더라도 스프링은 예외를 발생시키지 않는다. 디폴트값은 `true`    

### @Qualifier

- 목적 : `@Autowired`의 목적에서 동일 타입의 빈객체가 존재시 특정빈을 삽입할 수 있게 설정한다.  
- 설정위치 : `@Autowired` 어노테이션과 함께 사용된다.  
- 추가설정 : 동일타입의 빈객체 설정에서 `<qualifier value="[alias명]" />`를 추가하여 준다.  
- 옵션 : `name` - `alias`명  

### @Resource

- 목적 : 어플리케이션에서 필요로 하는 자원을 자동 연결(의존하는 빈 객체 전달)할 때 사용.  `@Autowired` 와 같은 기능을 하며 `@Autowired`와 차이점은 `@Autowired`는 타입으로(`by type`),  `@Resource`는 이름으로(`by name`)으로 연결시켜준다는 것이다.  
- 설정위치 : 프로퍼티, `setter`메소드  
- 추가설정 : `CommonAnnotationBeanPostProcessor` 클래스를 빈으로 등록시켜줘야 한다. 해당 설정 대신에 `<context:annotation-config>` 태그를 사용해도 된다.  
- 옵션 : `name`  

### @PostConstruct

- 목적 : 의존하는 객체를 설정한 이후에 초기화 작업을 수행하기 위해 사용  
- 설정위치 : 초기화 작업 수행 메소드  
- 추가설정 : `CommonAnnotationBeanPostProcessor` 클래스를 빈으로 등록시켜줘야 한다. 해당 설정 대신에 `<context:annotation-config>` 태그를 사용해도 된다.  

### @PreConstruct

- 목적 : 컨테이너에서 객체를 제거하기 전에 해야할 작업을 수행하기 위해 사용  
- 설정위치 : 해당 작업 메소드  
- 추가설정 : `CommonAnnotationBeanPostProcessor` 클래스를 빈으로 등록시켜줘야 한다. 해당 설정 대신에 `<context:annotation-config>` 태그를 사용해도 된다.  
