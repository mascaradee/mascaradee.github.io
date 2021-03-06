---
layout: post
date: 2020-06-09 00:00:00 +0900
title: '[php] variable and scope'
categories:
  - php
tags:
  - variable
  - scope
---

* Kramdown table of contents
{:toc .toc}

## 참고 사이트 [https://kitae0522.tistory.com/entry/php01](https://kitae0522.tistory.com/entry/php01)  
[https://www.w3schools.com/php/php_variables.asp](https://www.w3schools.com/php/php_variables.asp)

## php 변수 유효 범위

1. 지역변수  
함수내부에서 선언된 변수는 오직 함수 내부에서만 접근 가능

```php
<?
  function fn(){
    $str = "local variable";
    echo("지역변수 {$str}은 함수내부에서만 접근가능"); // 지역변수 local variable은 함수내부에서만 접근가능 -> local variable 접근 가능
  }
  fn();
  echo("지역변수 {$str}은 함수 밖에서는 접근불가"); // 지역변수 은 함수 밖에서는 접근불가 -> 접근 불가
?>
```

2. 전역변수  
함수 밖에 선언된 변수는 바로 접근 가능하지만 함수 밖에서 선언된 변수를 함수 내부에서 접근하려면 `global` 키워드 사용

```php
<?
  $str ="global variable";
  function fn(){
    echo("<p>전역변수 {$str}은 그냥 접근할 수 없다.</p>"); // 전역변수 은 그냥 접근할 수 없다. -> 접근 불가
    global $str;
    echo("<p>전역변수 {$str}은 키워드 'global'을 붙여야 접근가능</p>"); // 전역변수 global variable은 키워드 'global'을 붙여야 접근가능 -> 접근가능
  }
  fn();
  echo("<p>전역변수 {$str}은 함수 밖에서는 그냥 접근 할 수 있다.</p>"); // 전역변수 global variable은 함수 밖에서는 그냥 접근 할 수 있다. -> 접근가능
?>
```

3. 정적변수  
함수 내부에서 `static` 키워드로 선언한 변수는 함수의 호출이 종료되더라도 메모리상에서 사라지지 않고 지역변수처럼 해당 함수 내부에서만 접근 가능

```php
<?
  function myFn(){
    static $a = 10;
    echo $a;
    $a++;
  }
  echo('<br>');
  myFn(); // 10
  echo('<br>');
  myFn(); // 11
  echo('<br>');
  myFn(); // 12
?>
```

4. 슈퍼 글로벌 변수  
미리 정의된 전역변수, 어디서든 사용 가능


## 변수선언
`$변수명 = 값`

## 변수호출
`$변수명.`  
`.$변수명.`  
`{$변수명}`  
`<?=$변수명?>`
