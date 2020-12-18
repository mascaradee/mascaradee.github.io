---
layout: post
date: 2015-06-18 11:11:00 +0900
title: '[java] UsrLgController'
categories:
  - java
tags:
  - UsrLgController
---

```java
package com.sj.bo.mgr.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sj.bo.mgr.service.UsrLgService;
import com.sj.bo.mgr.vo.UsrLgVO;

@Controller
public class UsrLgController {
    Logger log = Logger.getLogger(this.getClass());

    @Resource(name="usrLgService")
    private UsrLgService usrLgService;

    // forword: http://localhost:8080/bo/mgr/lg.do
 // /WEP-INF 이하는클라이언트에서 .jsp 파일명으로 바로 접근하수 없으므로 화면에 우회적으로 접근할수 있도록 forword 설정한다.
    // ModelAndView는 매핑된 url 과 동일한 이름의 .jsp를 찾아간다. (/WEB-INF/view/bo/mgr/lg.jsp)
    @RequestMapping(value = "/bo/mgr/lg.do")
    public ModelAndView drawLogin(ModelAndView mv) {
        return mv;
    }

    // forword: http://localhost:8080/bo/hm.do
    @RequestMapping(value = "/bo/mgr/hm.do")
    public ModelAndView drawHome(ModelAndView mv) {
        return mv;
    }

 // 서버단: 컨트롤러 메소드명과 클라이언트단: url과 일치시키는 것이 관리상 편리하다.
    @RequestMapping(value = "/bo/mgr/inqUsrLg.do")
    public ModelAndView inqUsrLg(HttpSession session, ModelAndView mv, UsrLgVO inputVO) {

        log.debug("★★★★★★[sjp log]: inputParam check start ==============================");
        log.debug(inputVO);
        log.debug("★★★★★★[sjp log]: inputParam check end ================================");

        UsrLgVO loginVO = usrLgService.inqUsrLg(inputVO);

        log.debug("★★★★★★[sjp log]: outputParam check start ==============================");
        log.debug(loginVO);
        log.debug("★★★★★★[sjp log]: outputParam check end ================================");

        if(loginVO != null){
            session.setAttribute("loginVO", loginVO);

//            mv.setViewName("redirect:/"); // location.href = http://localhost:8080
//            mv.setViewName("redirect:"); // location.href = http://localhost:8080/bo/login
            mv.setViewName("redirect:/bo/mgr/hm.do"); // location.href = http://localhost:8080

//            mv.addObject("inputVO", inputVO); // req.setAttribute("inputVO", inputVO);
        } else {
            mv.setViewName("redirect:/bo/mgr/lg.do");
        }
        return mv;
    }

    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/bo/mgr/inqUsrLgAjax.do")
    @ResponseBody
    public String inqUsrLgAjax(HttpSession session, UsrLgVO inputVO) {

        UsrLgVO loginVO = usrLgService.inqUsrLg(inputVO);

        JSONObject responseObject = new JSONObject();

        if(loginVO != null){
            session.setAttribute("loginVO", loginVO);
            responseObject.put("status", "success");
            responseObject.put("result", "/bo/mgr/hm.do");
        } else {
            responseObject.put("status", "fail");
        }

        System.out.println(responseObject.toString());
        return responseObject.toJSONString();
    }
 }
```
