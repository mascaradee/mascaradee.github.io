---
layout: post
date: 2020-12-30 10:58:00 +0900
title: '[java] wrapper class'
categories:
  - java
tags:
- wrapper class
- formatting numeric
- intValue
- valueOf
- printf
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Java tutorial : Numbers and Strings-The Numbers Classes](https://docs.oracle.com/javase/tutorial/java/data/numberclasses.html)

## Wrapper Class
보통은 숫자로 작업을 할 때, 원시 자료형을 사용한다.
각 원시 자료형에는 대응하는 래퍼 클래스가 있다. 이 클래스는 객체로 원시 자료형을 감싸고 있다.  
객체를 써야 하는 곳에 원시 자료형을 사용하면 컴파일러가 알아서 박싱을 하고 그 반대로 원시 자료형을 써야 할 때 객체를 사용하면 역시 컴파일러가 언박싱을 한다.

모든 숫자형 래퍼 클래스는 Number 클랙스의 하위에 있다.

- Number
  - Byte
  - Integer
  - Double
  - Short
  - Float
  - Long

하지만 원시 자료형보다 객체를 사용해햐 하는 이유들이 있다.  

 1) 메서드 인수로 객체가 필요할때  e.g. collections of numbers  
 2) 클래스에서 정의한 상수를 사용하기 위해 e.g. MIN_VALUE, MAX_VALUE  
 3) 다른 원시 자료형, 문자열, 숫자 시스템간의 값을 변환하기 위해 제공되는 클래스 메서드를 사용하기 위해  e.g. decimal, octal, hexadecimal, binary  

#### Methods Implemented by all Subclasses of Number
| Method                                |	Description                                                                                                        |
|---                                    |---                                                                                                                 |
| byte byteValue()                      | 숫자형객체를 byte 형으로 변환                                                                                      |
| short shortValue()                    | 숫자형객체를 short 형으로 변환                                                                                     |
| int intValue()                        | 숫자형객체를 int 형으로 변환                                                                                       |
| long longValue()                      | 숫자형객체를 long 형으로 변환                                                                                      |
| float floatValue()                    | 숫자형객체를 float 형으로 변환                                                                                     |
| double doubleValue()                  | 숫자형객체를 double 형으로 변환                                                                                    |
| int compareTo(Byte anotherByte)       | 숫자형객체를 인수와 비교 객체가 크면 양수, 작으면 음수                                                             |
| int compareTo(Double anotherDouble)   | 숫자형객체를 인수와 비교 객체가 크면 양수, 작으면 음수                                                             |
| int compareTo(Float anotherFloat)     | 숫자형객체를 인수와 비교 객체가 크면 양수, 작으면 음수                                                             |
| int compareTo(Integer anotherInteger) | 숫자형객체를 인수와 비교 객체가 크면 양수, 작으면 음수                                                             |
| int compareTo(Long anotherLong)       | 숫자형객체를 인수와 비교 객체가 크면 양수, 작으면 음수                                                             |
| int compareTo(Short anotherShort)     | 숫자형객체를 인수와 비교 객체가 크면 양수, 작으면 음수                                                             |
| boolean equals(Object obj)            | 숫자형 객체와 인수가 같은지 비교하여 true/fasle 리턴, 인수가 숫자형 객체와 같은 형의 원시타입이라면 true 리턴한다. |

```java
public void testObjcetNumberToPrimitiveType() {

  Integer i = new Integer(10);

  byte b = i.byteValue();
  short s = i.shortValue();
  int ii = i.intValue();
  long l = i.longValue();
  float f = i.floatValue();
  double d = i.doubleValue();

  int a = i.compareTo(new Integer (11));
  logger.debug("{}", a); // -1 :음수이면  좌변이 작은거

  logger.debug("{}", i.equals(10)); // false
}
```

#### Conversion Methods, Integer Class

| Method                                      | 	Description |
|---                                          |---
| static Integer decode(String s)	            | Decodes a string into an integer. Can accept string representations of decimal, octal, or hexadecimal numbers as input. |
| static int parseInt(String s)	              | Returns an integer (decimal only). |
| static int parseInt(String s, int radix)	  | Returns an integer, given a string representation of decimal, binary, octal, or hexadecimal (radix equals 10, 2, 8, or 16  respectively ) numbers as input. |
| String toString()	                          | Returns a String object representing the value of this Integer. |
| static String toString(int i)	              | Returns a String object representing the specified integer. |
| static Integer valueOf(int i)	              | Returns an Integer object holding the value of the specified primitive. |
| static Integer valueOf(String s)	          | Returns an Integer object holding the value of the specified string representation. |
| static Integer valueOf(String s, int radix)	| Returns an Integer object holding the integer value of the specified string representation, parsed with the value of radix. | For example, if s = "333" and radix = 8, the method returns the base-ten integer equivalent of the octal number 333.

```java
public void testConversion() {

  String s = new String("123");
  int convInt = Integer.parseInt(s);
  logger.debug("int: {}", convInt); // 123
  String ss = Integer.toString(convInt);
  logger.debug("String: {}", ss); // 123
  Integer bigInt = Integer.valueOf(convInt);
  logger.debug("Integer: {}", bigInt);
}
```

#### Formatting Numeric Print Output

숫자 타입에 맞게 출력을 하려면 아래와 같이 사용하면 된다.  
`System.out.format(String format, Object... args)`
`System.out.printf(String format, Object... args)`

타입에 맞게 출력을 하려면 `%converter` 형태로 `%` 다음에 타입을 가리키는 문자를 넣으주면 된다.

```java
int i = 461012;
System.out.format("The value of i is: %d%n", i);
// %d = decimal integer
// %n = newline character
```

| Converter | 	Flag |	Explanation                                                                                                         |
|---        |---     |---                                                                                                                   |
| d	        |        |	A decimal integer.                                                                                                  |
| f	        |        |	A float.                                                                                                            |
| n	        |        |	A new line character appropriate to the platform running the application. You should always use %n, rather than \n. |
| tB        | 	     | 	A date & time conversion—locale-specific full name of month.                                                        |
| td, te    | 	     | 	A date & time conversion—2-digit day of month. td has leading zeroes as needed, te does not.                        |
| ty, tY    | 	     | 	A date & time conversion—ty = 2-digit year, tY = 4-digit year.                                                      |
| tl        |        |	A date & time conversion—hour in 12-hour clock.                                                                     |
| tM        |        |	A date & time conversion—minutes in 2 digits, with leading zeroes as necessary.                                     |
| tp        |        |	A date & time conversion—locale-specific am/pm (lower case).                                                        |
| tm        |        |	A date & time conversion—months in 2 digits, with leading zeroes as necessary.                                      |
| tD        |        |	A date & time conversion—date as %tm%td%ty                                                                          |
|  	        | 08     |	Eight characters in width, with leading zeroes as necessary.                                                        |
|  	        | +	     | Includes sign, whether positive or negative.                                                                         |
|  	        | ,	     | Includes locale-specific grouping characters.                                                                        |
|  	        | -	     | Left-justified..                                                                                                     |
|  	        | .3     | Three places after decimal point.                                                                                    |
|  	        | 10.3	 | Ten characters in width, right justified, with three places after decimal point.                                     |

다른 타입 포맷팅의 자세한 내역은 아래 사이트를 참고 한다.  
[https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html)

```java
public void testFormattingNumeric() {
  // 숫자타입을 포맷팅하기 위해서 `%converter`를 사용한다.
  // `8%d' =  8자리 정수

    long n = 461012;
      System.out.format("%d%n", n);      //  -->  "461012"
      System.out.printf("%d%n", n);      //  -->  "461012"

      System.out.format("%08d%n", n);    //  -->  "00461012"
      System.out.format("%+8d%n", n);    //  -->  " +461012"
      System.out.format("%,8d%n", n);    // -->  " 461,012"
      System.out.format("%+,8d%n%n", n); //  -->  "+461,012"

      double pi = Math.PI;

      System.out.format("%f%n", pi);       // -->  "3.141593"
      System.out.format("%.3f%n", pi);     // -->  "3.142"
      System.out.format("%10.3f%n", pi);   // -->  "     3.142"
      System.out.format("%-10.3f%n", pi);  // -->  "3.142"

      //로케일에 따라 소수점을 콤마로 표현하기도 한다.
      System.out.format(Locale.FRANCE,"%-10.4f%n%n", pi); // -->  "3,1416"

      Calendar c = Calendar.getInstance();
      System.out.format("%tB %te, %tY%n", c, c, c); // -->  "May 29, 2006"
      System.out.format("%tl:%tM %tp%n", c, c, c);  // -->  "2:34 am"
      System.out.format("%tD%n", c);    // -->  "05/29/06"
}
```

이 외에도 세자리마다 점을 찍는 포맷(The DecimalFormat Class, https://docs.oracle.com/javase/8/docs/api/java/text/DecimalFormat.html)  
간단한 수식 (Class Math, https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html)  
난수 (Random Numbers, Math.random()) 등이 있다.  
