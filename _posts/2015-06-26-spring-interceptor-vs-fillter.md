---
layout: post
date: 2015-06-26 10:08:00 +0900
title: '[spring] interceptor vs fillter'
categories:
  - spring
tags:
  - interceptor
  - spring
  - fillter
---

* Kramdown table of contents
{:toc .toc}

## 참고

- [인터셉터와 필터](http://changpd.blogspot.kr/2013/03/spring.html)
- [스프링 mvc 이미지참조](http://egloos.zum.com/springmvc/v/504151)

## MVC
model-view-controller  

![/images/springmvc.jpg](/images/springmvc.jpg)  

## Spring Interceptor

![/images/spring-mvc-request-lifecycle.jpg](/images/spring-mvc-request-lifecycle.jpg)  

Controller 에서 공통적으로 또는 특정 패키지들에 속한 부분에 대해서 선후 처리가 필요한 경우 스프링 인터셉터를 이용하면 편리하다. 특히, 사용자 로그인 권한체크 유용하다.  

아래 3개의 메소드를 제공한다. 각 호출되는 시점이 달라 선, 후처리를 모두 가능하게 해 준다.  

- preHandle() : one is called before the actual handler is executed. 컨트롤러 들어가기 전  
- postHanle() : one is called after the handler is executed. 컨트롤러 들어갔다 나온후 뷰로 보내기전  
- afterCompletion() : one is called after the complete request has finished. 뷰까지 끝나고 나서  

스프링 3.0. x버전부터는 mvc 라는 XML 설정 네임스페이스를 제공함으로써 추가 클래스 작성 필요 없이 설정을 더욱 쉽도록 지원하고 있다. 먼저 인터셉터를 사용할수 있도록 설정을 해 보자  

1) [projectName]-servlet.xml에 아래코드를 추가  

- 모든 컨트롤러가 아래 인터셉터를 거친다.  

```
<mvc:interceptors>
    <mvc:interceptor>
        <bean id="loginInterceptor" class="com.sj.bo.interceptor.LoginInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

- /bo 디렉터리의 .do로 끝나는 url이 들어올 경우 아래 인터셉터를 거친다. (추가 path 지정가능)  

```
<mvc:interceptors>
    <mvc:interceptor>
        <mvc:mapping path="/bo/*/*.do"/>
        <!--<mvc:mapping path="/**.do"/> -->
        <bean id="loginInterceptor" class="com.sj.bo.interceptor.LoginInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

[참고] 인터셉터 거치지 않을 path설정 (스프링 버전 3.2 ~)  

```
<mvc:interceptor>
    <mvc:mapping path="/**"/>
    <exclude-mapping path="/login/**"/>
    <bean id="loginInterceptor" class="com.sj.bo.interceptor.LoginInterceptor"/>
</mvc:interceptor>
```

※ Spring 3.0 이전 버전  

[http://docs.spring.io/spring/docs/3.0.x/spring-framework-reference/html/mvc.html#mvc-handlermapping-interceptor](http://docs.spring.io/spring/docs/3.0.x/spring-framework-reference/html/mvc.html#mvc-handlermapping-interceptor)

mvc네임스페이스가 없어 bean으로 모두 정의한 후 이용 가능   

```
<beans>
    <bean id="handlerMapping" class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
        <property name="interceptors">
            <list>
                <ref bean="officeHoursInterceptor"/>
            </list>
        </property>
        <property name="mappings">
            <value>
                /*.form=editAccountFormController
                /*.view=editAccountFormController
            </value>
        </property>
    </bean>            

    <bean id="officeHoursInterceptor" class="samples.TimeBasedAccessInterceptor">
        <property name="openingTime" value="9"/>
        <property name="closingTime" value="18"/>
    </bean>
<beans>
```

2) controller  

- 클라이언트로부터 .do로 request가 올 경우 아래 인터셉터를 먼저 거친다.  

```java
package com.sj.bo.interceptor;

import java.io.IOException;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sj.bo.sys.service.MnService;
import com.sj.bo.sys.vo.MnVO;
import com.sj.bo.sys.vo.UsrLgVO;

/**  
 * @Class Name : LoginInterceptor.java
 * @Description : 로그인 인터셉터
 *                     - 로그인, 권한체크를 위해 로그인을 제외한
 *                   /bo 이하 경로의 모든 controller가 호출되기 전에 실행된다.
 * @Modification  
 * @
 * @    수정일      수정자              수정내용
 * @ -----------   ---------   -------------------------------
 * @
 *
 * @author
 * @since 2015. 6. 21
 * @version 0.9
 * @see
 */
@Controller
public class LoginInterceptor extends HandlerInterceptorAdapter {
    Logger log = Logger.getLogger(this.getClass());

    @Resource(name="mnService")
    private MnService mnService;

    private static String[] EXCLUDING_URL = {
        "/bo/sys/login.do",
        "/bo/sys/inqUsrLg.do",
        "/bo/sys/error.do"
    };

    private static String HOME_URL = "/bo/home.do";

    /**
     * Controller 전에 처리할 경우 interceptor의 preHandle() 이용
     */
    public boolean preHandle(HttpServletRequest request
                                          , HttpServletResponse response
                                          , Object handler) throws IOException{
        log.debug("===============================");
        log.debug("===== ["+ this.getClass() +"] START =======");
        log.debug("===============================");

        /* 예외 URL 처리 */
        String requestUrl = request.getRequestURI();
        for (String url: EXCLUDING_URL) {
            if (url.equals(requestUrl)) {
                return true;
            }
        }

        /* 로그인 세션 체크 시작 */
        HttpSession session = request.getSession();
        UsrLgVO loginVO = (UsrLgVO) session.getAttribute("loginVO");
        if (loginVO == null) {
            // 로그인 상태가 아니면 로그인 페이지로 리다이렉트            
            response.sendRedirect("/bo/sys/login.do");
            return false;
        }
        /* 로그인 세션 체크 끝 */

        /* 권한 체크 시작 */
        if (!requestUrl.equals(HOME_URL)) {
            //.jsp는 권한체크하지 않는다.
            String url = requestUrl.substring(requestUrl.lastIndexOf("."), requestUrl.length());

            if(!url.equals(".jsp")){
                // id로 권한 있는 메뉴 가져옴 (ex: select count(1) from 메뉴 join 권한 where 로그인 아이디)
                MnVO menuVO = new MnVO();
                menuVO.setFrmUrl(requestUrl);
                menuVO.setLgId(loginVO.getLgId());
                int menuAthCnt = mnService.inqMnAthCnt(menuVO);

                // 위의 결과가 0일때 권한이 없음
                if(menuAthCnt == 0){
                    response.sendRedirect("/bo/sys/login.do");
                    return false;
                }
            }
        }
        /* 권한 체크 끝 */
        return true;
    }
}
```

Spring interceptor와 filter의 차이  

- 결론: 스프링을 쓴다면 인터셉터가 나을듯  

- 용도: 사용자, 화면 권한 체크할 때 쓰임  

- 구조: 컨트롤러에 가기 전 먼저 url을 가로채서 뭔가를 처리할 수 있다.  

- 차이: 호출되는 시점이 다르다.  
