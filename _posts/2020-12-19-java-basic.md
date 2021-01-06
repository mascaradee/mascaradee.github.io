---
layout: post
date: 2020-12-19 15:57:00 +0900
title: '[java] basic '
categories:
  - java
tags:
  - java
  - language
  - specificaiton
  - comment
  - variable
  - data type
  - literal
  - operator
  - if
  - switch
  - while
  - for
---

* Kramdown table of contents
{:toc .toc}

## 참고
[Java Language Specification 15 Edition](https://docs.oracle.com/javase/specs/jls/se15/html/index.html)  
[ASCII CODE table - wikipedia](https://en.wikipedia.org/wiki/ASCII)  
[if - w3schools](https://www.w3schools.com/java/java_conditions.asp)  
[switch - w3schools](https://www.w3schools.com/java/java_switch.asp)  
[while - w3schools](https://www.w3schools.com/java/java_while_loop.asp)  
[for - w3schools](https://www.w3schools.com/java/java_for_loop.asp)  

## 코멘트 처리

### 한 줄 코멘트

`//`로 한 줄을 코멘트 처리할 때 사용한다.  

```java
public static void main(String[] args) {
  String a; // 한줄 코멘트는 이렇게
}
```

### 여러 줄 코멘트

`/*  */`로 한 줄 코멘트을 여러 줄에도 적용할 수 있지만 아래와 같이 블록 코멘트도 따로 있다.  

```java
public static void main(String[] args) {
  String a;
  /*  여러 줄 코멘트는 이렇게
  a = "test";
  int b = 1;
  */
}
```

### JavaDoc Comment

`/** */`는 자바문서, 자바 API 문서를 설명하는 정보를 만드는 코멘트이다. 실무에서 주로 본 태그는 아래 정도이지만 더 많은 태그들이 존재한다.  

[more JavaDoc Tag](https://en.wikipedia.org/wiki/Javadoc)  

| Tag & Parameter | Usage                             | Applies to                            |
|-----------------|-----------------------------------|---------------------------------------|
| @author         | 개발자 이름                       | Class, Interface, Enum                |
| @version        | 클래스 혹은 인터페이스의 버전     | Class, Interface, Enum                |
| @since          | 언제부터 시작되었는지             | Class, Interface, Enum, Field, Method |
| @param          | 매개변수                          | Method                                |
| @return         | 리턴값                            | Method                                |
| @exception      | 예외에 대한 명시                  | Method                                |
| @throws         | 예외에 대한 명시                  | Method                                |
| @deprecated     | 더 이상 권장하지 않는 메서드 표기 | Class, Interface, Enum, Field, Method |

```java
/**
 * @author mascaradee <mascaradee@example.com>
 * @version 1.1
 * @since 2020.12.19
 */
public class MyClass () {
  // 클래스 내용
  /**
   * @param name name to check a validation
   * @return  true if the move is valid, otherwise false
   */
  boolean isValidName(name) {
    // 로직 생략
    return true;
  }
}
```

## 세미콜론 `;`

문장이 끝맺었음을 나타내는 의미로 사용된다. 자바는 `;`으로 문장이 끝나지 않으면 컴파일 에러가 난다.   

```java
String name // syntax error
int age = 0;
```

여러 문장을 이어서 표현하고 싶을때는 사이에 `;`을 넣으면 된다.
```java
String name = "mas"; int age = 5;
```

## 자바 변수

### 식별자 명명 규칙

아래 문자열들로 식별자를 만들 수 있다. 심지어 한글로도 가능하다...

- 영문자 `A-Z, a-z`, 숫자 `0-9`, `_` (단어 사이에만), `$` (기계적으로 생성된 소스코드에만) 로만 구성할 수 있다.  
- 숫자로 시작할 수 없다.  
- 변수의 이름 사이에 공백이 포함되면 안된다.  
- 예약어, `true`, `false`, `null`은 컴파일 시 에러가 나므로 식별자 사용이 안된다.  
- 예약어는 아니지만 식별자 사용 금지: `var`는 로컬 변수의 타입이라는 의미로 쓰이기도 하고 람다의 공식적인 파라미터 타입, `yeild`는 `yeils statement` 때문에 식별자로 사용이 안된다.   

### 예약어

식별자로 사용할 수 없는 미리 예약된 단어들이다.   

```
abstract   continue   for          new         switch
assert     default    if           package     synchronized
boolean    do         goto         private     this
break      double     implements   protected   throw
byte       else       import       public      throws
case       enum       instanceof   return      transient
catch      extends    int          short       try
char       final      interface    static      void
class      finally    long         strictfp    volatile
const      float      native       super       while
_ (underscore)
```

추가로 예약어는 아니지만 `open, module, requires, transitive, exports, opens, to, uses, provides, with`는 제한된 키워드이다.

### 변수의 데이터 타입

자바는 변수마다 데이터 타입이 지정되어 있어 데이터 타입에 맞는 변수값을 넣어야 에러가 나지 않는다.  

- 원시 타입 : 불리언, 숫자(`byte, short, int, long, char | float, double`)
- 참조 타입 : 클래스, 인터페이스, 배열. 이것들의 값은 객체를 참조한다.
- null 타입 : 실제로는 특수한 null 리터럴로 취급

#### 원시 타입 Primitive type

- 숫자 타입  

  (1) 정수형 타입 `integral types`

  | 종류 | 크기(bit) | 범위  |
  |---   |---   |       |
  |byte  | 8   | -128 to 127, inclusive |
  |short | 16  | -32768 to 32767, inclusive |
  |int   | 32  | -2147483648 to 2147483647, inclusive |
  |long  | 64  | -9223372036854775808 to 9223372036854775807, inclusive |
  |char  | 16  | '\u0000' to '\uffff' inclusive, that is, from 0 to 65535 |

  (2) 부동소수점 타입 `floating-point types`

  양수, 음수, 기호, +0, -0, 양의 무한대, 음의 무한대, `NaN`

  | 종류  | 크기(bit)|
  |---    |---       |
  |float  | 32       |
  |double | 64       |

- `boolean`타입  
  `true, false`로 `boolean` 표현식은 `if, while, do, for`에서도 사용  


##### 원시 타입 변수 선언과 초기화

데이터 타입에 명시된 타입의 값을 할당해야 컴파일 오류가 나지 않는다.

`데이터 타입  식별자(변수명) = 값`

```java
class MyClass {
  int num; // 선언
  num = 1; // 할당
  int num1 = 1; // 선언과 할당을 한번에
  void testM() {
      // int num2; // compile error - class 멤버 변수가 아닌 메서드 로컬 변수의 경우 초기화 필수
      int num2 = 2;
      char a = 97;
      float f = 0.0007;
      boolean b = true;
  }
}
```

#### 참조 타입 Reference type

- 클래스 타입
- 인터페이스 타입
- type variable `T`- 제네릭클래스, 인터페이스, 메서드, 생성자의 파라미터 타입으로 사용되고 타입이 정해져 있지 않다. `Object` 외에는 모두 상속(`extend`)이 필요하다. 상속과 관련이 있다 TODO    
- 배열 타입

##### 객체 Object

객체는 클래스 인스턴스이거나 배열이다. 참조값은 이런 객체를 가리키거나 객체를 참조하지 않는 `null`을 가리킨다.

**인스턴스 생성 방법1**  

`클래스명 식별자 = new 클래스명();`

```java
class MyClass {
}
MyClass mc = new MyClass();
```

**인스턴스 생성 방법 2**  

`( 클래스명 )Class.forName( "클래스명" ).newInstance();`

```java
MyClass mc1 = (MyClass)Class.forName("MyClass").newInstance();
```

**배열 생성 방법1**  

`클래스명 식별자[] = new 클래스명[ 배열크기 ];`

```java
String s[] = new String[2];
```

**배열 생성 방법2**  

`클래스명 식별자[] = { 클래스 타입의 값1, 클래스 타입의 값2 };`

_**☆ 자바스크립의 배열 리터럴은 '[ ]'를 사용하지만 자바는 '{ }'를 사용하는 것에 유의 할 것**_

```java
String s1[] = {"test", "do"};
// {"test", 1} 같은타입의 값이 아니라서 에러날 것임. TODO
```

원시 타입과 참조 타입의 가장 큰 차이는 값 복사와 주소 복사의 차이에 있다.

```java
class MyClass {
    int val;
}
class CopyTest {
  public static void main(Stirng[] args) {

      // 원시 타입의 값 복사
      int num1 = 1;
      int num2 = num1;
      num2 = 2;
      System.out.print("num1==" + i1); // 1
      System.out.println(" but num2==" + i2); // 2

      // 참조 타입의 주소 복사
      MyClass mc1 = new MyClass();
      mc1.val = 3;
      MyClass mc2 = mc1; // 주소(binary name)복사가 이루어짐 고로, mc1, mc2는 같은 객체를 가리킨다.
      mc2.val = 4;
      System.out.print("mc1.val==" + mc1.val); // 4
      System.out.print("mc2val==" + mc2.val); // 4
  }
}

```

#### 변수의 유효범위 Scope

TODO  좀 더 정리를...  

- 변수가 선언된 블럭이 유효범위이다.
- 지역변수가 전역변수에 비해 우선순위가 높다.  
- 정적 스코프 = 렉시컬 스코프 : 사용되는 시점에서의 유효범위를 사용하는 것이 아니라 정의된 시점에서의 유효범위를 사용한다.

## 리터럴 Literal

문자 그대로의 값, 숫자, 문자, `null`의 소스코드 표현이다.  

### 정수 리터럴 Integer Literal

- 10진수, 16진수, 8진수, 2진수가 있다.
- 아스키문자에 `L` 혹은 `l`을 붙이면 `long` 타입이고 나머지는 모두 `int` 타입이다.  
- `int` 타입의 최대값 2147483648 즉, 2<sup>31</sup> 자리수 표현이 가능하고 0-2147483647 까지 중에서 사용한다. 즉 32bit가 넘게 되면 컴파일 에러가 난다.
- `long` 타입의 최대값 9223372036854775808L 즉, 2<sup>63</sup>자리수 표현이 가능하고  0L-9223372036854775807L까지 중에서 사용한다. 즉 64bit가 넘게 되면 컴파일 에러가 난다.
- 숫자 사이에 `_`가 표기되는 건 정수로 취급한다.  


#### 10진수 decimal  

` 0 - 9 사이의 숫자 혹은 '_'(숫자 사이에만)`  

```java
0
2
0l // 0L 표기를 더 권장한다. 'l'은 '1'과 헛갈림
2_147_483_648L
```

- 양수만 가능
- int 타입 최대값 : 2147483647 (2<sup>31</sup>)
- long 타입 최대값 : 9223372036854775807L (2<sup>63</sup>)

#### 16진수 hexadecimal

`0x + 16개의 숫자(0 - 9) 혹은 문자(a - f 혹은 A - F) 혹은 '_'`  
`0X + 16개의 숫자(0 - 9) 혹은 문자(a - f 혹은 A - F) 혹은 '_'`   

```java
0xDada_Cafe
0x100000000L
```

- 양수, 0, 음수 가능
- int 타입 최대값  : 0x7fff_ffff (10진수로 치면 2147483647)
- 최소값 : 0x8000_0000 (10진수로 치면 -2147483648)
- long 타입 최대값 : 0x7fff_ffff_ffff_ffffL (10진수로 치면 9223372036854775807L)
- long 타입 최소값 : 0x8000_0000_0000_0000L (10진수로 치면 -9223372036854775808L)

#### 8진수 octal

`0 + 0-7 사이의 숫자 혹은 '_'`  

```java
0372
0777L
```

- 양수, 0, 음수 가능
- int 타입 최대값  : 0177_7777_7777 (10진수로 치면 2147483647)
- 최소값 : 0200_0000_0000 (10진수로 치면 -2147483648)
- long 타입 최대값 : 07_7777_7777_7777_7777_7777L
- long 타입 최소값 : 010_0000_0000_0000_0000_0000L

#### 2진수 binary

`0b + 0 혹은 1 혹은 '_'`  
`0B + 0 혹은 1 혹은 '_'`  

- 양수, 0, 음수 가능
- int 타입 최대값  : 0b0111_1111_1111_1111_1111_1111_1111_1111 (10진수로 치면 2147483647)
- 최소값 : 0b1000_0000_0000_0000_0000_0000_0000_0000 (10진수로 치면 -2147483648)
- long 타입 최대값 : 0b0111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111L
- long 타입 최소값 : 0b1000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000L


### 부동소수점 리터럴 Floating Point Literal

- 부동소수점 리터럴은 정수 부분, 10 진수 또는 16 진수 (ASCII 마침표 문자로 표시), 분수, 지수, 데이터타입 접미사(float: f F, double: d D)로 구성되어 있다.    
- `float`, `double` 타입을 사용한다.  

`[숫자].[숫자]+[지수]+[접미사]`

```java
6.022137e+23f // 숫자.숫자+지수+접미사
1e-9d // 숫자+지수+접미사
```

### 불리언 리터럴 Boolean Literal

- `boolean` 타입만 사용한다.

```java
true
false
```

### 문자 리터럴 Character Literal

```'[`] or[\] + 문자'```

- `char` 타입만 사용한다.

```java
'a'
'\t'
'\''
'\u03a9'
```

### 문자열 리터럴 String Literal

`"문자열"`

- `String` 타입만 사용한다.
- 런타임 시에 문자열 리터럴은 String 클래스의 인스턴스를 참조한다.  

```java
""
"\""
"This is a string"
```

```java
package testPackage;
class Test {
    public static void main(String[] args) {
        String hello = "Hello", lo = "lo";
        System.out.println(Other.hello == hello); // true
        /*
        문자열 리터럴은 같은 이름의 인스턴스가 이미 존재하면 그것을 참조한다. 따라서 원시타입처럼 값을 복사하는 것처럼 사용할 수 있다.
        */
    }
}
class Other { static String hello = "Hello"; }
```

### Text Block

` ''' [내용] ''' `

- `String` 타입만 사용한다.

```java
String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
/*
문자열 연결(+)보다 훨씬 읽기 편하다. 아래와 비교
*/
String html = "<html>\n" +
              "    <body>\n" +
              "        <p>Hello, world</p>\n" +
              "    </body>\n" +
              "</html>\n";
```

### Escape Sequences

```java
\b (backspace BS, Unicode \u0008)
\s (space SP, Unicode \u0020)
\t (horizontal tab HT, Unicode \u0009)
\n (linefeed LF, Unicode \u000a)
\f (form feed FF, Unicode \u000c)
\r (carriage return CR, Unicode \u000d)
\LineTerminator (line continuation, no Unicode representation) // LF:newLine, CR: return, CRLF
\" (double quote ", Unicode \u0022)
\' (single quote ', Unicode \u0027)
\\ (backslash \, Unicode \u005c)
\OctalEscape (octal value, Unicode \u0000 to \u00ff)
```

### Null Literal

- 항상  null 타입

```java
null
```


## 연산자

### 숫자 타입 연산자

- 숫자 연산자 : 정수형 타입의 결과는 `int` 혹은 `long`, 부동 소수점 타입의 결과는 `float` 혹은 `double`
  - 단항 연산자 : `+, -` (숫자나 문자열 모두 적용 할 수 있는데, 숫자 + 문자열 = 문자열로 결과 리턴)
  - 증식 연산자 : `*, /, %`
  - 증가 연산자 : `++` (전치 혹은 후치)
  - 감소 연산자 : `--` (전치 혹은 후치)
  - 쉬프트 연산자 : `<<, >>, >>>`
  - 비트 보수 연산자: `~`
  - 정수 비트 연산자 : `&, ^, |`
  - 삼항 연산자 : `? :`
  - 숫자형 객체 타입 : `Byte, Short, Integer, Long, Character, Float, Double, Math`

- 비교 연산자 : 결과는 `boolean`타입으로 리턴한다.  
  - 숫자 비교 연산자 : `<, <=, >, >=`
  - 동등 연산자 : `==, !=`

- Exception
  - NullPointerException
  - ArithmeticException : 정수형 타입에서 `/, %`의 우변이 0일때
  - OutOfMemoryError : `++, --`으로 객체숫자타입으로 전환될때나 메모리가 부족할때 ?

### boolean 타입 연산자

- 관계형 연산자 : `==, !=`
- 논리 보수 연산자 : `!`
- 논리 연산자 : `&`(2개 피연산자 모두 `true`), `^`(피연산자의 값이 다를때), `|`(2개 피연산자 모두 `false`)
- and, or연산자 : `&&`, `||`
- 삼항 연산자 : `? :`
- 문자열 연결 연산자 : `+` ( `boolean` + 문자열 = 문자열로 결과 리턴)


## 제어문

순차적인 흐름을 제어해야 할 경우 제어문을 사용한다. 조건문과 반복문이 이에 해당한다.  
제어문의 실행문은 중괄호로 둘러싸여 있으면 이 영역을 블록이라고 한다.  

### 조건문

주어진 조건식에 따라 별도의 명령을 수행하도록 제어한다.  

#### if 문

`if`의 조건식의 결과가 `true`이면 해당 블록의 실행문을 `false`인 경우 `else` 혹은 `else if`의 블록의 실행문을 실행한다. 조건식의 결과는 항상 `boolean`이 되어야 한다.   

```
if ( 조건식 ) {
  명령문
}
```  
```
if ( 조건식 ) {
  실행문
} else { // if 조건식 결과 false일 때
  실행문    
}
```  
```
if ( 조건식1 ) {
  실행문
} else if ( 조건식2 ) { // 조건식1은 false, 조건식2가 true일때   
  실행문    
} else { // if 조건식1, else if 조건식2 모두 false 일 때
  실행문    
}
```  

```java
String apple = "red";
String banana = "yellow";

if ( apple == "red" ) {
  System.out.println("빨간건 사과");
} else if ( banana == "long") {
  System.out.println("바나나는 길어");
} else {
  System.out.println("길면 기차");
}
```

#### switch 문

- `if`문보다 가독성도 좋고 속도도 빠른편이다.
- 하지만 `switch` 문의 조건 값으로는 아래와 같이 제한이 있다.  
  - `byte, short, char, int`타입의 변수나 리터럴
  - 숫자 기본형 타입과 연관된 `Byte, Short, Character, Integer` 클래스(래퍼 클래스)의 객체
  - `enum`
  - `String` 클래스 객체

```
switch (조건 값) {
  case 값1:
      조건 값이 값1일 때 실행하고자 하는 명령문;
      break;
  case 값2:
      조건 값이 값2일 때 실행하고자 하는 명령문;
      break;
  ...
  default:
      조건 값이 어떠한 case 절에도 해당하지 않을 때 실행하고자 하는 명령문;
      break;
}
```
```java
int month = 12;
switch (month) {
  case 1:
    System.out.println("1월");
    break; // switch 문 종료
  ...
  case 11:
    System.out.println("11월");
    //break; // 이 부분이 생략되면 case 12도 함께 실행된다.
  case 12:
    System.out.println("12월");
    break;
  default:
    System.out.println("월이 아닌데");
    break;
}
```

### 반복문

#### while 문

조건식이 true이면 계속 블록의 실행문을 반복한다.

```
while ( 조건식 ) {
  실행문
}
```

```java
int i = 0;
while (i < 5) { // i = 0 ~ 4까지 블로을 반복 실행하게 된다.
  System.out.println(i);
  i++;
}
```

#### do-while 문

do-while 문은 블록내 실행문을 먼저 수행한 후, 조건식을 체크하여 true이면 블록의 실행문을 다시 반복 수행한다.  

```
do {
  실행문
} while ( 조건식 )
```

```java
int i = 4;
do {
  System.out.println(i); // 4만 출력되고 조건식에는 맞지 않아 반복은 되지 않는다.
  i++;
}
while (i < 5);
```

#### for 문

수행 횟수를 정확히 알고 있을 때 사용하는 반복문이다.  

```
for ( 초기식; 조건식; 증감식 ) { // 조건식이 true일 때 실행문 반복
  실행문
}
```

```java
for (int i = 0; i < 5; i++) {
  System.out.println(i);
}
```

#### for-Each 문

배열의 요소를 반복할 때 사용한다.  

```
for ( 데이터 타입 변수명 : 배열명 ) {
  실행문
}
```

```java
String[] fruits = {"apple", "banana", "kiwi", "blueberry"};
for (String fruit : fruits) {
  System.out.println(fruit);
}
```
