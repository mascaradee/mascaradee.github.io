---
layout: post
date: 2015-06-17 10:01:00 +0900
title: '[java] ModelAndView'
categories:
  - java
tags:
  - ModelAndView
---

## ModelAndView

화면으로부터 입력받은 `model`을 그대로 다시 `view`에 전달할때 이용하는 객체  

※ `model` : 데이터를 담고 있는 객체? 보통 `DTO` 혹은 `VO`라고 하기도 한다.  

※ `view`: 화면에 출력될 `html` 문서, `JSP(html+css+script)`   

``` java
@RequestMapping("/bo/inquireNoticeList.do")
public ModelAndView inquireNoticeList(ModelAndView mv){
    return mv;
}
```

화면에서 `URL(inquireNoticeList.do)`을 입력받으면 컨트롤러의 `inquireNoticeList()` 메소드에 매핑이 된다.  

`ModelAndView`는 별도 설정이 없으면 입력받은 `url`과 동일한 이름의 `.jsp`를 찾아간다.  

즉, `@RequestMapping("/bo/inquireNoticeList.do")`와 같은 `/bo/inquireNoticeList.jsp`를 찾아 화면에 출력한다.  

그러므로  `url`과 컨트롤러의 메소드명은 일치시키는게 관리하기 편하다.  

또 한 가지 알고 있어야 할 것은 스프링은 파라미터로 입력된 값은 별도로 `new`생성자를 이용하지 않아도 바로 이용할수 있다.  

위 예시에서 `ModelAndView mv`를  `new ModelAndView();` 로 새로 인스턴스를 생성하지 않아도 리턴값으로 사용하는 것을 확인 할수 있다.    

```java
@RequestMapping(value = "/bo/usr/inqUsrLg.do")
public ModelAndView inqUsrLg(HttpSession session, ModelAndView mv, UsrLgVO inputVO) {

    UsrLgVO loginVO = usrLgService.inqUsrLg(inputVO);

    if(loginVO != null){
        // session에 VO를 넣어 넘기는 방법
        session.setAttribute("loginVO", loginVO);
        // view로 넘기는 방법
        // mv.setViewName("redirect:/경로);
        mv.setViewName("redirect:/bo/usr/hm.do");

        // ModelAndView에 object를 추가해서 넘기는 방법
        // mv.addObject("object명", object);
        // mv.addObject("inputVO", inputVO); = req.setAttribute("inputVO", inputVO);
    } else {
        mv.setViewName("redirect:/bo/usr/lg.do");
    }
    return mv;
}
```

여기에서 `mv.addObject("object명", object);`는 `@ModelAndView("object명") Object object` 와 동일한 결과를 나타낸다.    

```java
@RequestMapping(value = "/bo/usr/inqUsrLg.do")
public ModelAndView inqUsrLg(HttpSession session, ModelAndView mv
        , @ModelAndView("transferVO") UsrLgVO inputVO) {

    UsrLgVO loginVO = usrLgService.inqUsrLg(inputVO);

    if(loginVO != null){
        mv.setViewName("redirect:/bo/usr/hm.do");
          // mv.addObject("transferVO", inputVO);
          // ModelAndView 리턴일때,
          // 이 부분은  @ModelAndView("transferVO") UsrLgVO inputVO와 동일하다.
    } else {
        mv.setViewName("redirect:/bo/usr/lg.do");
    }
    return mv;
}
```
