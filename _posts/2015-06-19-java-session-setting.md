---
layout: post
date: 2015-06-19 09:15:00 +0900
title: '[java] session setting'
categories:
  - java
tags:
  - session
---

## 세션 설정
- web.xml에 아래 소스를 추가  
- session-timeout 은 분 단위로 설정 된다. 30 이라고 선언했다면 getSession() 할때 마다 Session 유효 시간은 30분 이다.  

```
  <session-config>
      <session-timeout>30</session-timeout>
  </session-config>
```

- 세션 생성 및 종료 여부를 확인  

```
package com.sj.bo.common;

import java.util.Date;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;

public class HttpSessionCheckingListener implements HttpSessionListener {

    Logger log = Logger.getLogger(this.getClass());

    public void sessionCreated(HttpSessionEvent event) {
        if (log.isDebugEnabled()) {
            log.debug("Session ID".concat(event.getSession().getId()).concat(" created at ").concat(new Date().toString()));
        }
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        if (log.isDebugEnabled()) {
            log.debug("Session ID".concat(event.getSession().getId()).concat(" destroyed at ").concat(new Date().toString()));
        }
    }
}
```

- web.xml에 아래 소스를 추가  

```
<listener>
    <listener-class>com.sj.bo.common.HttpSessionCheckingListener</listener-class>
</listener>
```
