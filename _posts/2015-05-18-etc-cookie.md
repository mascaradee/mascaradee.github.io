---
layout: post
date: 2015-05-18 17:15:00 +0900
title: '[etc] cookie'
categories:
  - etc
tags:
  - cookie
---

## cookie 란

쿠키는 사용자가 웹 사이트를 처음 방문할 때 웹 사이트에서 사용자 컴퓨터의 하드 디스크에 저장해 놓는 작은 파일  

쿠키는 사용자의 효율성을 높여줍니다. 온라인 상점에서 가상 쇼핑백에 상품을 넣고 며칠 후에 다시 해당 사이트를 방문했을 때, 상품이 그대로 쇼핑백에 담겨 있는 것을 본 적이 있으신가요? 그것이 바로 쿠키의 역할  

쿠키는 4개의 속성과 하나의 데이터를 가지는구조체이다. 우선은 유효 기간(쿠키의 데이터를 브라우저에 보관하는 기간)과 어디에서 이 쿠키를 읽을 수 있을지를 결젱하는 패스(Path), 그리고 보안(Secure)의 4가지 속성을 가진다.   

- 유효기간 : 쿠키가 생성되면 기본적으로 브라우저가 종료될 때까지는 쿠키의 데이터를 사용할 수 있다. 하지만 유효 기간을 지정하면 브라우저가 종료되어도 지정한 기간 동안은 쿠키 데이터를 읽고 쓸 수 있게 된다. 유효 기간이 지나면 쿠키 데이터는 소멸된다. 실제로 파일이 지워지지는 않더라도 데이터를 브라우저에서 읽을 수가 없다.  

- 패스 : 쿠키는 쿠키 데이터를 생성한 웹 페이지에서만 그 데이터를 읽을 수 있다. 하지만 Path 항목을 지정행주면 해당 Path 이하에서는 그 쿠키 데이터를 공유할 수 있다.  
ex) http://www.sp.or.kr/bbs/board.html 에서 쿠키를 생성하면, http://www.sp.or.kr/bbs/board.html 이외의 페이지에서는 쿠키 데이터를 읽을 수가 없다. 하지만 Path를 /bbs 로 설정하면 http://www.sp.or.kr/bbs 모든 페이지에서 쿠키 데이터를 읽을 수가 있다. Path를 / 로 지정하면 http://www.sp.or.kr/ 의 모든 페이지에서 쿠키를 읽을 수가 있다.  

- 도메인 : 도메인 속성은 패스 속성을 확장한 것이다.  패스가 하나의사이트에서 쿠키 데이터를 읽고 쓰는 권한을 설정하는 것이라면, 도메인 항목은 도메인 단위에서 쿠키 데이터를 읽고 쓰는 권한을 설정하게 된다.   
ex) 패스를 / 로 설정을 하면 sp.or.kr 의 모든 페이지에서 위의 쿠키를 읽을 수 있게 된다.  

- 보안 : 이는 쿠키 데이터의 전송 방법을 지정한다. 보통은 일반 HTTP를 이용하여 전송하지만, 만일 안전한 전송 방법을 지정하면 HTTPS 등의 보안 전송 방법을 사용하면 된다. 하지만 대부분의 경우 쿠키로는 위험하지 않은 데이터를 전달하기 때문에 거의 사용하지 않는다.  
