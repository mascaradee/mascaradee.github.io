---
layout: post
date: 2020-06-09 00:00:00 +0900
title: '[php] echo and operator'
categories:
  - php
tags:
  - echo
  - operator
---

* 참고 사이트 [https://kitae0522.tistory.com/entry/php01](https://kitae0522.tistory.com/entry/php01)  
[https://www.w3schools.com/php/php_variables.asp](https://www.w3schools.com/php/php_variables.asp)

## php 출력 함수

`echo(출력 내용);`  
`echo 출력 내용;`  
`<?= 출력내용?>` // `=` 이 echo를 뜻함


## double colon
static, constant, 상속된 프로퍼티나 메소드에 접근할수 있다

```php
<?php
class MyClass {
  const CONST_VALUE = '상수';
}

echo MyClass::CONST_VALUE; // 상수 - as of php 5.3.0

?>
```

## double arrow operator (=>)

array 접근하는 방법

```php
<?php
$myArray = array(
    0 => 'Big',
    1 => 'Small',
    2 => 'Up',
    3 => 'Down'
);

echo($myArray.0); // Big?? -> 표현식이 맞는지 확인 필요
?>
```

## object operator (->)

object 메소드나 프로퍼티에 접근하는 법. 자바의 .으로 접근하는것과 같음

```php
<?php
$obj = new MyObject();
$obj->thisProperty = 'Fred'; // obj.thisProperty에 Fred 세팅
$obj->getProperty(); // obj.getProperty 호출
?>
```
