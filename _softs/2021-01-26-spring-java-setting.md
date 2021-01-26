---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[spring] 스프링MVC Java 세팅 Spring Web MVC Setting by Java'
categories:
  - spring
tags:
  - spring mvc
  - java
---

* Kramdown table of contents
{:toc .toc}

## 참고
[Spring WEB MVC setting by Java](https://www.youtube.com/watch?v=4KChPTnfz-Q&list=PLSBIrFmNg2JYzeFJQ9WhEHCOZy2KT4HGb&index=9)


## pom.xml 설정

`xml` 세팅과 동일하다.

## Java 설정파일

### DispatcherServlet 및 ServletContext 설정

`/springMVCJava/src/mascaradee/config/SpringConfigClass.java`  
`/springMVCJava/src/mascaradee/config/ServletAppContext.java`  

`web.xml`의 역할을 대신할 자바 클래스를 생성한다. 해당 클래스에서 `WebApplicationInitializer` 인터페이스를 구현하면 자동으로 `onStartup()` 메서드를 호출하게 되고 그 메서드에서 `web.xml`의 내용과 동일 내용을 처리한다.  

```java
public class SpringConfigClass implements WebApplicationInitializer{

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        // Spring MVC 프로젝트 설정을 위해 작성하는 클래스의 객체를 생성한다.
        AnnotationConfigWebApplicationContext servletAppContext = new AnnotationConfigWebApplicationContext();
        servletAppContext.register(ServletAppContext.class);

        // 요청 발생 시 요청을 처리하는 서블릿을 DispatcherServlet으로 설정해준다.
        DispatcherServlet dispatcherServlet = new DispatcherServlet(servletAppContext);
        ServletRegistration.Dynamic servlet = servletContext.addServlet("dispatcher", dispatcherServlet);

        // 부가 설정
        servlet.setLoadOnStartup(1); // 가장 먼저 로드
        servlet.addMapping("/");
    }
}
```

###  RootContext 설정

Bean들을 정의하는 파일로 root-context.cml을 대신한다.

`/springMVCJava/src/mascaradee/config/SpringConfigClass.java`  
`/springMVCJava/src/mascaradee/config/RootAppContext.java`

```java
// Bean을 정의하는 클래스를 지정한다.
AnnotationConfigWebApplicationContext rootAppContext = new AnnotationConfigWebApplicationContext();
rootAppContext.register(RootAppContext.class);

// 리스너 설정
ContextLoaderListener listener = new ContextLoaderListener(rootAppContext);
servletContext.addListener(listener);
```


### 필터 설정

파라미터에 한글이 있는 경우, 한글이 깨지지 않도록 인코딩 설정을 해 준다.  

`/springMVCJava/src/mascaradee/config/SpringConfigClass.java`  

```java
// 파라미터 인코딩 설정
FilterRegistration.Dynamic filter = servletContext.addFilter("encodingFilter", CharacterEncodingFilter.class);
filter.setInitParameter("encoding", "UTF-8");
filter.addMappingForServletNames(null, false, "dispatcher");
```

참고로 web.xml을 대신하는 방법에는 2가지가 있다. `WebApplicationInitializer`를 구현하거나 `AbstractAnnotationConfigDispatcherServletInitializer`를 상속하는 방법이다. `WebApplicationInitializer`를 구현하면 내가 원하는 코드를 넣어서 만들 수 있지만 코드가 길어지는 단점이 있다. 이 것을 보완하기 위해  `AbstractAnnotationConfigDispatcherServletInitializer`를 상속하면 좀 더 간단하게 세팅을 할 수 있는 반면 정해진 형식을 따라야 하므로 자율성은 좀 떨어진다.

```java
public class SpringConfigClass extends AbstractAnnotationConfigDispatcherServletInitializer{

    // DispatcherServlet에 매핑할 요청 주소를 세팅한다.
    @Override
    protected String[] getServletMappings() {
        return new String[] {"/"};
    }

    // Spring MVC프로젝트 설정을 위한 클래스를 지정한다.
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[] {ServletAppContext.class};
    }

    // 프로젝트에서 사용할 Bean들들 정의하기 위한 클래스 지정
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[] {RootAppContext.class};
    }

    // 파라미터 인코딩 필터 설정
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        return new Filter[] {encodingFilter};
    }

}
```



### 컨트롤러 설정

`servelt-context.xml`을 대신하는 클래스로 `WebMvcConfigurer` 인터페이스를 구현한다.

`/springMVCJava/src/mascaradee/config/ServletAppContext.java`

```java
// Spring MVC 프로젝트에 관련된 설정을 하는 클래스
@Configuration
// Controller 어노테이션이 세팅되어 있는 클래스를 Controller로 등록한다.
@EnableWebMvc
// 스캔할 패키지를 지정한다.
@ComponentScan("mascaradee.controller")
public class ServletAppContext implements WebMvcConfigurer{

    // Controller의 메서드가 반환하는 jsp의 이름 앞위에 경로롸 확장자를 붙여주도록 설정
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        WebMvcConfigurer.super.configureViewResolvers(registry);
        registry.jsp("/WEB-INF/views/", ".jsp");
    }

    // 정적 파일의 경로를 매핑한다.
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfigurer.super.addResourceHandlers(registry);
        registry.addResourceHandler("/**").addResourceLocations("/resources/");
    }
}
```
