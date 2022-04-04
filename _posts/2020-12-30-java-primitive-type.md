---
layout: post
date: 2020-12-30 10:58:00 +0900
title: '[java] 원시타입 Primitive type'
categories:
  - java
tags:
  - java
  - primitive type
  - byte
  - short
  - int
  - long
  - double
  - float
---

* Kramdown table of contents
{:toc .toc}

## 참고
[Java tutorial : Language Basics-Variables-Primitive Data Types](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
[Java tutorial : Numbers and Strings-Numbers](https://docs.oracle.com/javase/tutorial/java/index.html)

## 원시타입 Primitive

자바에는 8개의 원시 데이터 타입이 있다.

### 정수형

| 데이터 타입 | 	메모리의 크기 | 표현 가능 범위                                                                              | 비고                                                                                                                   |
|---          |---             |---                                                                                          | ---                                                                                                                    |
| byte        |	1 byte (8bit)  | -128 ~ 127                                                                                  | 큰 배열에서 메모리를 절약용으로 사용. int가 제한되는 곳에서도 쓰인다.                                                  |
| short       |	2 byte (16bit) | -32,768 ~ 32,767                                                                            | 큰 배열에서 메모리를 절약용으로 사용.                                                                                  |
| int         |	4 byte (32bit) | -2,147,483,648~2,147,483,647  (-2<sup>31</sup> ~ 2<sup>31-1</sup>)                          | Java SE 8 + 에서는 int를 사용하여 최소값이 0이고 최대 값이 2<sup>32-1</sup> 인 부호없는 32 비트 정수를 나타낼 수 있다. |
| long        |	8 byte (64bit) | -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807 (-2<sup>63</sup> ~ 2<sup>63-1</sup>) | Java SE 8 + 에서는 long을 사용하여 최소값이 0이고 최대 값이 2<sup>64-1</sup> 인 부호없는 64 비트 long을 나타낼 수 있다.|


### 실수형

| 데이터 타입 | 	메모리의 크기 | 표현 가능 범위                                           | 비고                                                                                                                         |                  
|---          |---             |---                                                       |---                                                                                                                           |
| float	      |	4 byte (32bit) | ±(1.40129846432481707e-45 ~ 3.40282346638528860e+38)     | 부동 소수점 숫자의 큰 배열에 메모리 절약용으로 double 대신 float를 사용. 정확한 값을 알수는 없기 때문에 BigDecimal 써야한다. |
| double	    |	8 byte (64bit) | ±(4.94065645841246544e-324d ~ 1.79769313486231570e+308d) | 10진수 값의 경우 이 데이터 타입이 기본이다. 이 것도 역시 통화 같은 정확한 값을 얻어야 하는 곳에 쓰이면 안된다.               |


### 기타

| 데이터 타입 | 	메모리의 크기 | 표현 가능 범위                        | 비고                                            |                  
|---          |---             |---                                    |---                                              |
| boolean	    | 1bit           | true / fasle                          | 보통 조건식의 결과로 이 데이터 타입을 사용한다. |
| char	      |	2 byte (16bit) | '\u0000' (or 0) ~ \uffff' (or 65,535) | 유니코드                                        |

## 문자열 String

`String`은 원시타입이 아닌 객체이지만 원시타입처럼 선언과 초기화 및 할당을 하여 사용하기도 한다.  

### 원시 타입의 기본값

필드로 선언만 하고 초기화를 하지 않으면 기본으로 컴파일러가 값을 넣는다.  
단, 로컬변수에는 해당되지 않는다.

| Data    | Type	Default Value (for fields) |
|---      |---                               |
| byte    |	0                                |
| short   |	0                                |
| int     |	0                                |
| long    |	0L                               |
| float   |	0.0f                             |
| double  |	0.0d                             |
| char    |	`'\u0000'`                       |
| String  | (or any object)  	null           |
| boolean |	false                            |

```java
int test;
public void testInt(){
  int test1;		
  System.out.println(test); // 0 -  기본값이 출력된다.
  System.out.println(test1); // compile-error: The local variable test1 may not have been initialized
}
```

### 원시 타입 선언 및 할당

원시타입은 클래스로부터 생성된 객체가 아니므로 `new` 키워드를 통해 생성되지 않는다.  
리터럴로 값을 할당해 주면 된다.  
예를 들면, `int i`으로 `int`타입 변수 `i`선언, `= 2474829734;`으로 값을 할당해 주면 된다.

```java
byte b = 100;
short s = 10000;
int i = 2474829734;
boolean b = true;
char c = 'a'; // string과 다르게 홑따옴표 안에 넣어야 한다.
```

### 정수 리터럴

정수 리터럴의 마지막에 `L`을 붙이면 그 값은 `long` 타입이고 그 외에는 `int` 타입니다. `long` 타입은 `int` 타입의 표현 범위를 포함하므로 가능한 일이다.  
정수 리터럴로 정수 타입의 `byte, short, int, long` 타입도 만들 수 있다. 또한 정수 리터럴은 10진수, 16진수, 바이너리를 표현할 수 있다.

```java
int decVal = 26; // The number 26, in decimal
int hexVal = 0x1a; //  The number 26, in hexadecimal
int binVal = 0b11010; // The number 26, in binary
long l = 2474829734L; // 알패벳 L로  long 타입을 명시하여 int와 구분
```

### 부동 소수점 리터럴

부동 소수점 리터럴의 마지막에 `f` 혹은 `F`를 붙이면 `float` 타입이고 `d` 혹은 `D`를 붙이면 `double` 타입인데 보통 `double` 타입은 생략한다.
```java
double d1 = 123.4;
double d2 = 1.234e2; // same value as d1, but in scientific notation
float f1  = 123.4f;
```

### 문자와 문자열 리터럴

문자와 문자열리터럴은 유니코드(UTF-16)로 되어 있다. `'\u0108'` 혹은 `"S\u00ED Se\u00F1or"` 처럼 유니코드를 표현해야 한다. 위 예시처럼 문자 리터럴은 홑따옴표, 문자열 리터럴은 겹따옴표로 표현해야 한다.  
이스케이프 시퀀스를 지원한다.   
`null` 리터럴도 있는데 원시타입을 제외하고 모든 변수에 할당할 수 있지만 존재 여부 판단외에는 거의 할 일이 없다. 그래서 `null`은 종종 객체를 사용할 수 없음을 나타낼 때 마커로 사용되기도 한다.
클래스 리터럴이란 것도 있다.

### 숫자 리터럴 언더바(_) 사용

자바 7 이상에서 언더바를 숫자와 숫자리터럴 사이에서 사용할 수 있다. 예를 들어 콤마로 큰 자리 숫자를 구분하는 것처엄 긴 숫자군의 구분을 하기 위해 사용하기도 한다.
단, 값의 처음 혹은 끝, 부동 소수점 리터럴에서 소수점에 인접,  F 또는 L 접미사 앞, 숫자 문자열이 예상되는 위치에서 사용할 수 없다.

```java
long creditCardNumber = 1234_5678_9012_3456L;
long socialSecurityNumber = 999_99_9999L;
float pi =  3.14_15F;
long hexBytes = 0xFF_EC_DE_5E;
long hexWords = 0xCAFE_BABE;
long maxLong = 0x7fff_ffff_ffff_ffffL;
byte nybbles = 0b0010_0101;
long bytes = 0b11010010_01101001_10010100_10010010;
```
