---
layout: post
date: 2020-06-08 00:00:00 +0900
title: '[php] codeigniter input class'
categories:
  - php
tags:
  - codeigniter
  - input
  - libraries

---

* 참고 사이트 [http://www.ciboard.co.kr/user_guide/kr/libraries/input.html](http://www.ciboard.co.kr/user_guide/kr/libraries/input.html)

## Input Class

보안을 위해 전역 입력 데이터를 전처리.  
입력데이터를 가져오거나 가져온 데이터를 전처리하는 헬퍼함수 제공

php 문법

```
$something = isset($_POST['something']) ? $_POST['something'] : NULL;
```

codeIgniter의 input은 내부 헬버가 입력데이터 존재여부 먼저 확인 후 결과리턴 true/false

```
$something = $this->input->post('something');
// this: controller
// input: codeIgniter input 클래스
// post:
```

메인 함수
$this->input->post()  
$this->input->get()  
$this->input->cookie()  
$this->input->server()  
