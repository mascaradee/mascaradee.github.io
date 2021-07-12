---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[java] URL의 searchParam 사용법 '
categories:
  - java
tags:
  - searchParam
  - url
  - request
  - @RequestParam
  - spring
---

* Kramdown table of contents
{:toc .toc}


## searchParam을 사용하는 방법

`https://도메인?서치파람1=서치파람1값&서치파람2=서치파람2값`와 같이 url에 searchParam을 덧붙여 넘기면 컨트롤러에서 사용하는 방법 크게 3가지가 있다.


### request 활용

```
request.getParameter("searchItemNo")
```

### `@RequestParam` 어노테이션 사용

`@RequestParam(value = "searchItemNo", required = false, defaultValue = "1") String searchItemNo`

```java
@RequestMapping("/getItemInfo.do")
public String getItemInfo(HttpServletRequest request,
                          Model model,
                          @RequestParam(value = "searchItemNo", required = false, defaultValue = "1") String searchItemNo) throws Exception {

}
```


### 스프링 활용

`setter`가 정의되어 있는 `VO`에 자동 매핑

```java
public class PrItemInfoVo {

  private String searchItemNo;
  // getter
  public String getSearchItemNo() {
      return searchItemNo;
  }
  // setter
  public void setSearchItemNo(String searchItemNo) {
      this.searchItemNo = searchItemNo;
  }
}
```

```java
@RequestMapping("/getItemInfo.do")
public String getItemInfo(HttpServletRequest request,
                          PrItemInfoVo prItemInfoVo,
                          Model model,
                          @RequestParam(value = "searchItemNo", required = false, defaultValue = "1") String searchItemNo) throws Exception {

   }
```
