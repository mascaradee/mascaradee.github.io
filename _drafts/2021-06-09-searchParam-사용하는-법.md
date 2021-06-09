---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[] '
categories:
  -
tags:
  -
---

* Kramdown table of contents
{:toc .toc}


## searchParam을 사용하는 방법

`https://도메인?서치파람1=서치파람1값&서치파람2=서치파람2값`와 같이 url에 searchParam을 덧붙여 넘기면 컨트롤러에서 사용하는 방법 크게 3가지가 있다.


### request 활용

```
request.getParameter("chlNo")
```

### `@RequestParam` 어노테이션 사용

`@RequestParam(value = "searchItemNo", required = false, defaultValue = "001") String searchItemNo`
```java
@RequestMapping("/getFirstBuyPlanShopDetail.do")
public String getFirstBuyPlanShopDetail(HttpServletRequest request, PrDispCatBaseFo prDispCatBaseFo,
   FoPreviewInfo previewInfo, Model model, @UserContextAttribute UserContext userContext, 			
   @RequestParam(value = "searchItemNo", required = false, defaultValue = "001") String searchItemNo) throws Exception {

   }
```



### 스프링 활용

setter가 정의되어 있는 VO에 자동 매핑

`
 PrDispCatBaseFo prDispCatBaseFo
`

```java
@RequestMapping("/getFirstBuyPlanShopDetail.do")
public String getFirstBuyPlanShopDetail(HttpServletRequest request, PrDispCatBaseFo prDispCatBaseFo,
   FoPreviewInfo previewInfo, Model model, @UserContextAttribute UserContext userContext, 			
   @RequestParam(value = "searchItemNo", required = false, defaultValue = "001") String searchItemNo) throws Exception {

   }
```
