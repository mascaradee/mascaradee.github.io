---
layout: post
date: 2015-06-18 19:06:00 +0900
title: '[spring] interceptor'
categories:
  - spring
tags:
  - interceptor
---

## 스프링 인터셉터

![/images/action-servlet.jpg](/images/action-servlet.jpg)  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!-- DispatcherServlet Context: defines this servlet's request-processing infrastructure -->

    <mvc:interceptors>
        <mvc:interceptor>
            <mvc:mapping path="/bo/**"/>
            <bean id="interCeptorController" class="com.sj.interceptor.InterCeptorController"></bean>
        </mvc:interceptor>
    </mvc:interceptors>

    <!-- Enables the Spring MVC @Controller programming model -->
    <mvc:annotation-driven />

    <!-- Handles HTTP GET requests for /resources/** by efficiently serving up static resources in the ${webappRoot}/resources directory -->
    <mvc:resources mapping="/resources/**" location="/resources/" />

    <!-- Resolves views selected for rendering by @Controllers to .jsp resources in the /WEB-INF/views directory -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/" />
        <property name="suffix" value=".jsp" />
    </bean>

    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <property name="defaultEncoding" value="UTF-8"/>
    </bean>

    <context:component-scan base-package="com.sj.*" />

    <!-- AOP -->
    <aop:aspectj-autoproxy/>

</beans>
```
환장하는줄....  

접두어를 잘 맞춰서 적용시켜주면 되는건데 기존 접두어 세팅 부분과 겹쳐서 당황;;  


스프링 인터셉터 설정하는 부분으로 *-servlet.xml 파일(울 플젝은 action-servlet.xml)에 위 노란 부분을 설정해 준 후 아래와 같이 intercepter 폴더을 생성한 후에 intercepterController 클래스를 만든다  

즉, 클라이언트로부터 요청되는 url은 dispatcherservlet에 의해 각 해당 컨트롤러로 분기가 되는데 그 전에 intercepter를 먼저 거친 후 컨틀롤러로 갈수 있도록 하는거다  

위 설정파일을 제대로 세팅해야만 가능  

![/images/interCeptorController.jpg](/images/interCeptorController.jpg)  

```java
package com.sj.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Controller
public class InterCeptorController extends HandlerInterceptorAdapter {
    Logger log = Logger.getLogger(this.getClass());

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){

        try {
            if(request.getSession().getAttribute("loginVO") == null){
                log.debug("여기다2:"+request.getSession().getAttribute("loginVO"));
                response.sendRedirect("/bo/mgr/lg.do");
                return false;
            } else {
                log.debug("여기다:"+request.getSession().getAttribute("loginVO"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }
}
```
