---
layout: post
date: 2021-01-11 20:52:00 +0900
title: '[java] 웹앱 기초 webapp basic'
categories:
  - java
tags:
  - webapp

---

* Kramdown table of contents
{:toc .toc}

## 참고
[web server vs. WAS](https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html)  
[web.xml 구성1](https://gmlwjd9405.github.io/2018/10/29/web-application-structure.html)  
[web.xml 구성2](http://wiki.gurubee.net/pages/viewpage.action?pageId=26740333)  


## 웹 서버, 웹어플리케이션 서버

![Web Server vs. WAS](/images/web-server-WAS1.jpg)

- 웹 서버 `Web Server`: 클라이언트, 보통 브라우저의 `HTTP` 요청에 따라 웹 서버는 `HTML, CSS, JavaScript` 등의 정적컨텐츠를 제공, `WAS`에 클라이언트 동적컨텐츠 요청을 전달하고 받은 응답을 다시 클라이언트에 제공하는 중개 역할을 한다. 아파치가 웹 서버다.

- 웹 어플리케이션 서버 `Web Application Server,Web App Server, WAS`: 웹 서버로부터 동적컨텐츠 요청을 수행하기 위해 `DB`에 접근하거나 비지니스 로직을 처리한 후 응답을 하는 서버다. 톰캣이 웹 어플리케이션 서버 즉, `WAS`의 한 종류이다. `WAS`는 웹 서버와 웹 컨테이너로 구성되어 있는데 웹 컨테이너는 `JSP, Servlet`을 실행시킬 수 있는 구동환경을 제공한다.

![Web Server vs. WAS](/images/web-server-WAS.jpg)

`WAS`는 웹 서버의 역할도 수행 할 수 있지만 프로젝트 규모에 따라 트래픽이 몰릴 경우가 있고 이것을 모두 혼자 감내하긴 힘들므로 웹 서버를 별도로 두어 정적컨텐츠를 바로 처리하게끔 구성하기도 한다.


## 이클립스 설정

### 다이나믹 프로젝트 구조

- `build` : 컴파일 결과
- `src` : 자바소스, `Servlet` 코드
- `WebContent`: 사용자들은 접근할 수 없는 경로, `root`, `localhost:8080/`에서  `/`를 의미함. 배포할 때 이 폴더가 `.war`로 변환된다.  
- `WebContent > META-INF` : `war`파일(컴파일된 파일 모음)의 메타 정보
- `WebContent > WEB-INF` : `JSP(WebContent >WEB-INF>JSP)` 등을 모아 놓는 곳

### 퍼블리싱이란?

톰캣서버가 인지 할 수 있는 구조로 바꿔 주는 작업으로 예를 들어, 실제 이클립스상의 자바 소스는 `src` 폴더에 있지만 퍼블리싱이 되면 지정된 `Server path`의 아래 경로로 들어간다.  
`C:\dev\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\Grape\WEB-INF\classes`  
이건 이클립스 상에서 패키지 우클릭 `properties > Deployment Assembrly `에서 설정된 경로를 확인할 수 있다.  

### `web.xml` 하는일

배포시 참고되는 환경파일로 어플리케이션의 환경, `Servlet`의 정보를 설정하는 역할, 하지만 `xml`의 특성상 수정과 코딩이 불편하고 어디서 오류가 났는지 확인하기가 어렵다. 따라서 서블릿 3.0부터는 `web.xml`의 역할을 자바의 어노테이션을 이용해 대신한다.

- `ServletContext`의 초기 파라미터: 요청에 따라 어떤 `dispatcherservlet`에 매핑되는지 정보, 서블릿 이름을 실제 서블릿클래스, 요청 `URL`에 매핑한다.
- `Session`의 유효시간 설정
- `Servlet/JSP`에 대한 정의
- `Servlet/JSP` 매핑
- `Mime Type` 매핑
- `Welcome File list`
- `Error Pages` 처리
- 리스너/필터 설정
- 보안

#### 서블릿 기본 설정

서블릿 정의: 서블릿 이름 지정 및 실제 클래스 경로를 지정한다.  

```
<servlet>
    <servlet-name>MyDispatcher</servlet-name>
    <servlet-class>MyDispatcher</servlet-class>
</servlet>
```

URL 매핑: 접근 가능한 url 패턴 정의, 아래 예시는 패턴이 지정되지 않았으므로 바로 접근 가능하다.  

```
<servlet-mapping>
    <servlet-name>MyDispatcher</servlet-name>
    <url-pattern></url-pattern>
</servlet-mapping>
```

시작페이지 설정: 연결되 서블릿이나 페이지가 없을 경우 아래 기본 페이지로 연결된다.  

```
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```
