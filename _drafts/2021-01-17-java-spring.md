---
layout: post
date: 2021-01-17 15:35:00 +0900
title: '[java] spring'
categories:
  - java
tags:
  - spring
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



---------------------

## Spring Web MVC by 소프트캠퍼스

### pom.xml 설정

기본적으로 필요한 라이브러리만 추가한다. 최소한 `servlet, jsp, jstl, spring-webmvc` 4개는 필요하다.  
추라고 필요한 라이브러리는 여기서 찾아서 추가 할 수 있다. [https://mvnrepository.com/](https://mvnrepository.com/)  

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>springMVCXml</groupId>
	<artifactId>springMVCXml</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>
	<build>
		<sourceDirectory>src</sourceDirectory>
		<plugins>
			<plugin>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.8.1</version>
				<configuration>
					<release>11</release>
				</configuration>
			</plugin>
			<plugin>
				<artifactId>maven-war-plugin</artifactId>
				<version>3.2.3</version>
				<configuration>
					<warSourceDirectory>WebContent</warSourceDirectory>
				</configuration>
			</plugin>
		</plugins>
	</build>

	<!-- 라이브러리 버전관리 -->
	<properties>
		<javax.servlet-version>4.0.1</javax.servlet-version>
		<javax.servlet.jsp-version>2.3.3</javax.servlet.jsp-version>
		<javax.servlet.jsp.jstl-version>1.2</javax.servlet.jsp.jstl-version>
		<org.springframework-version>5.3.3</org.springframework-version>
		<!-- <org.springframework-version>4.3.25.RELEASE</org.springframework-version> -->
	</properties>

	<!-- 라이브러리 세팅 -->
	<dependencies>
		<!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>javax.servlet-api</artifactId>
			<version>${javax.servlet-version}</version>
			<scope>provided</scope>
		</dependency>
		<!-- https://mvnrepository.com/artifact/javax.servlet.jsp/javax.servlet.jsp-api -->
		<dependency>
			<groupId>javax.servlet.jsp</groupId>
			<artifactId>javax.servlet.jsp-api</artifactId>
			<version>${javax.servlet.jsp-version}</version>
			<scope>provided</scope>
		</dependency>
		<!-- https://mvnrepository.com/artifact/javax.servlet.jsp.jstl/jstl -->
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
			<version>${javax.servlet.jsp.jstl-version}</version>
		</dependency>
		<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>
	</dependencies>
</project>
```

### DispatcherServlet 설정 변경

스프링 사용을 위해 아파치에서 제공하는 `DispatcherServlet` 대신 그것을 확장하여 제공하는 `Spring DispatcherServlet`을 사용하도록 조정한다.
`web.xml`의 아래 부분이 기본 서블릿을 지정해 놓은 곳인데 아파치 서블릿으로 설정되어 있음을 알수 있다.  

`/Servers/Tomcat v9.0 Server at localhost-config/web.xml`

```xml
<servlet>
    <servlet-name>default</servlet-name>
    <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
    ...
    <load-on-startup>1</load-on-startup>
</servlet>
```

아래 프로젝트 내 `web.xml`을 생성하여 스프링이 제공하는 서블릿을 사용하도록 설정한다.
톰캣이 각 프로젝트의 `web.xml`을 자동으로 찾아 실행하기 때문에 꼭 `WebContent/WEB-INF/web.xml`로 명시를 해 줘야 한다.

`/프로젝트/WebContent/WEB-INF/web.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="4.0"
	xmlns="http://xmlns.jcp.org/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee                     
	                    http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd">

	<!-- 현재 웹 애플리케이션에서 받아들이는 모든 요청에 대해 아파치 서블릿 대신 appServlet이라는 이름으로 정의되어 있는 스프링 제공
		서블릿을 사용하겠다. -->
	<servlet-mapping>
		<servlet-name>appServlet</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>

	<!-- 요청 정보를 분석해서 컨트롤러를 선택하는 서블릿을 지정한다. 스프링 서블릿을 사용하겠다는 의미  -->
	<servlet>
		<servlet-name>appServlet</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>
</web-app>
```
참고로 `WebContent`이하는 주소창에 주소를 치면 바로 접근가능지만 `WEB-INF`이하는 주소로 접근 불가능하다.


`context`란 어떤 작업에 필요한 정보가 담겨 있는 것을 말한다. `ServletContext` 란 서블릿을 운영하기 위한 정보를 가지고 있는 것이다.


### ServletContext 설정

spring mvc 관련 웹 애플리케이션 설정을 하는 파일이다. 개발자들이 개별적으로 만들어 쓰는 bean 설정과 별도로 분리하기 위함이다.  
서블릿의 init-param으로 ServletContext 경로를 설정해 준다.  

`/프로젝트/WebContent/WEB-INF/web.xml`

```xml
<servlet>
    <servlet-name>appServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/config/servlet-context.xml</param-value> <!-- 서블릿 설정정보 경로 -->
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
```


###  RootContext 설정

Bean들을 정의하는 파일

`/프로젝트/WebContent/WEB-INF/web.xml`

```xml
<!-- Bean을 정의할 xml 파일을 지정한다.   -->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/config/root-context.xml</param-value>
</context-param>

<!-- 리스너 설정 : context 파일을 읽어 Bean을 구성해 준다.  -->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```


### 필터 설정

파라미터에 한글이 있는 경우, 한글이 깨지지 않도록 인코딩 설정을 해 준다.

`/프로젝트/WebContent/WEB-INF/web.xml`

```xml
<!-- 파라미터 인코딩 필터 설정 -->
<filter>
    <filter-name>encodigFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>		
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceEncoding</param-name>		
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>encodigFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

```

### 컨트롤러 설정

컨틀롤러는 여기에 모여 있다라는 것을 지정한다.

`/WebContent/WEB-INF/config/servlet-context.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans:beans xmlns="http://www.springframework.org/schema/mvc"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xmlns:beans="http://www.springframework.org/schema/beans"
             xmlns:context="http://www.springframework.org/schema/context"
             xsi:schemaLocation="http://www.springframework.org/schema/mvc
                                 http://www.springframework.org/schema/mvc/spring-mvc.xsd
                                 http://www.springframework.org/schema/beans
                                 http://www.springframework.org/schema/beans/spring-beans.xsd
                                 http://www.springframework.org/schema/context
                                 http://www.springframework.org/schema/context/spring-context.xsd">

<!-- 스캔한 패키지 내부의 클래스 중 Controller 어노테이션을 가지고 있는 클래스들을 Controller로 로딩하도록 한다.  -->
<annotation-driven/>

<!-- 스캔할 bean들이 모여있는 패키지를 지정한다. -->
<context:component-scan base-package="mascaradee.controller"></context:component-scan>
</beans:beans>
```

반복되는 jsp 경로를 생략할 수 있도록 지정한다. jsp 파일을 /WEB-INF/views 아래에 위치시킨다면 아래와 같이 세팅하면 된다.  

`/WebContent/WEB-INF/config/servlet-context.xml`

```xml
<!-- Controller의 메서드에서 반환하는 문자열 앞 뒤에 붙일 경로 정보를 세팅한다. -->
<beans:bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
	<beans:property name="prefix" value="/WEB-INF/views/"/>
	<beans:property name="suffix" value=".jsp"/>
</beans:bean>

```

정적파일(이미지, 사운드, 동영상, JS, CSS 등등) 경로를 세팅한다. /WebContent/resources/image 경로에 이미지를 모아놓기로 했다면 아래와 같이 세팅하면 된다. 

`/WebContent/WEB-INF/config/servlet-context.xml`

```xml
<resources mapping="/**" location="/resources/" ></resources>
```
