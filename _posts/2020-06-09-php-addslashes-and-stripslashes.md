---
layout: post
date: 2020-06-09 00:00:00 +0900
title: '[php] addslashes and stripslashes'
categories:
  - php
tags:
  - addslashes
  - stripslashes
---

## 참고 사이트 [https://www.w3schools.com/php/func_string_addslashes.asp](https://www.w3schools.com/php/func_string_addslashes.asp)


## 이스케이프 문자열 만들기

### addslashes()

db에 저장할때 아래 특수기호들을 그대로 적용하기 위해 역슬래시를 덧붙여 이스케이프된 문자열로 반환하는 기능  

`작은따옴표(''), 큰따옴표(""), 역슬래시(\), null`

php 5.4 이전에는 `magic_quotes_gpc`에 의해 addslashes()기능이 GET, POST, COOKIE데이터에는 디폴트로 적용되었으므로  
확인 후 2번 적용되지 않도록 해야 한다. 확인방법은 get_magic_quotes_gpc()로


```php
<?php
  $str = "I'm the 'girl'";
  echo($str); // I'm the 'girl'
  echo(addslashes($str)); // I\'m the \'girl\'
?>
```


### stripslashes()

addslashes() 의 반대 기능

```php
<?php
  echo(stripslashes("I\'m the \'girl\'")); // I'm the 'girl'
?>
```
