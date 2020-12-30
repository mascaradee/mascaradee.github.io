---
layout: post
date: 2020-12-30 14:24:00 +0900
title: '[java] string'
categories:
  - java
tags:
  - java
  - string

---

* Kramdown table of contents
{:toc .toc}

## 참고

[https://docs.oracle.com/javase/tutorial/java/data/strings.html](https://docs.oracle.com/javase/tutorial/java/data/strings.html)

## String

`String`은 객체타입이다. 원시 자료형처럼 생성할수 있지만 이 경우, 컴파일러가 자동으로 문자열을 값으로 가지는 `String Object`를 생성한다. 또한 문자열은 불변이므로 수정이 불가하고 몇몇 메서드로 문자열이 수정 되는 것처럼 보이는 것은 작업 결과를 새 문자열로 반환하기 때문이다.  

### String 생성

#### 리터럴방식

```java
String greeting = "Hello World!";
```

#### new 키워드와 constructor 방식

```java
public void testCreationString(){
  char[] helloArray = { 'h', 'e', 'l', 'l', 'o', '.' };
  String helloString = new String(helloArray);
  logger.debug("{}", helloString);
}
```

### 유용한 메서드

#### length()

특수문자를 포함한 문자열의 길이를 반환한다.   

```java
public void testString1(){
  String helloString = new String("hello.");
  int len = helloString.length();
  logger.debug("{}", len);  // 6
}
```

#### getChar()

문자열을 char 타입으로 변경해서 반환한다.  

```java
public void testString2(){
  String helloString = new String("hello.");
  int len = helloString.length();
  char[] helloArray = new char[len];
  helloString.getChars(0, len, helloArray, 0); // char로 반환하는 메서드
  logger.debug("{}", helloArray1);  // [h, e, l, l, o, .]
}
```

#### concat()

2개의 문자열을 연결해 주는 메서드로 문자열의 내용을 연결해서 새로운 String에 담아 반환한다.  
`문자열 + 문자열` 혹은 `문자열 + 리터럴`끼리도 연결이 가능하다.  
하지만 문자열은 보통 `+`연산자를 이용해 연결한다.  

```java
public void testStringConcatenating(){
  String s1 = new String("abc");
  String s2 = new String("def");

  // concat()
  String newString = s1.concat(s2);
  logger.debug("{}", newString);
  logger.debug("{}", s1);
  logger.debug("{}", s2);

  // 문자열 + 리터럴
  String newString1 = newString.concat("나는 한글");
  logger.debug("{}", newString1);

  // '+'
  String newString2 = "I am" + " Ironman.";
  logger.debug("{}", newString2);
}
```

### 문자열 출력

문자열도 숫자 타입과 마찬가지로 `printf(), format()`메서드를 이용해서 출력을 할 수 있다. `printf(), format()`의 차이는 재사용이 가능하느냐의 여부일뿐 동일한 기능이다.

```java
System.out.printf("The value of the float " +
                  "variable is %f, while " +
                  "the value of the " +
                  "integer variable is %d, " +
                  "and the string is %s",
                  floatVar, intVar, stringVar);

String fs;
fs = String.format("The value of the float " +
                   "variable is %f, while " +
                   "the value of the " +
                   "integer variable is %d, " +
                   " and the string is %s",
                   floatVar, intVar, stringVar);
System.out.println(fs);
```

### 문자열을 숫자형으로 변환

숫자형 래퍼 클래스의 `valueOf()`를 이용해서 문자열을 숫자형 래퍼 클래스로 변환한 뒤, `floatValue()` 나  `intValue()` 등의 메서드를 통해서 각 원시 자료형으로 변환을 할 수 있다.

```java
public void testValueOf() {
  Float bf = Float.valueOf("4.5"); // 래퍼 클래스 타입
  float sf = bf.floatValue(); // 원시 숫자 타입

  Integer bi = Integer.valueOf("82");
  int si = bi.intValue();        
}
```

### 숫자형을 문자열로 변환

원시 숫자 타입에 문자열이 더해지면 문자열이 된다.  

`숫자형 + "" 혹은 "문자열"`

```java
public void testNumberToString() {
  int i = 90;
  String s1 = "" + i;
  Assert.assertEquals(true, s1 instanceof String);
}
```

래퍼클래스의 `toString()`메서드를 이용해서 원시 숫자 타입을 문자열로 변환할 수 있다.  

`래퍼클래스.toString()`

```java
public void testNumberToString() {
  int i = 90;
  // 래퍼 클래스.toString()
  String s2 = Integer.toString(i);
  Assert.assertEquals(true, s2 instanceof String);
}
```

### 문자열 자르기

#### substring()

문자열의 원하는 구간으로 자를 수 있다. 새로운 문자열로 반환한다.  

```
String substring(시작인덱스, 종료인덱스)
String substring(시작인덱스)
```

```java
public void testSubstring() {
  String s = "영일이삼사오육칠팔구십";
  String r1 = s.substring(3);
  String r2 = s.substring(6, 8); // endIndex는 불포함
  Assert.assertEquals("삼사오육칠팔구십", s.substring(3));
  Assert.assertEquals("육칠", s.substring(6, 8));
}
```

#### split()

문자열을 한 자씩 잘라 새로운 문자열 배열로 반환한다.

```
String[] split(String 구분자)
String[] split(String 구분자, int 배열최대크기)
```

```java
public void testSplit() {
  String s = "영|일|이삼";
  String[] r1 = s.split("|");
  String[] r2 = s.split("|", 2); // 2번째 인수는 배열의 크기, 2개로 쪼개라

  for (String a : r1) {
    logger.debug("{}", a);
    /*
    영
    |
    일
    |
    이
    삼
    */
  }
  for (String a : r2) {
    logger.debug("{}", a);
    /*
    영
    |일|이삼
    */
  }
}
```
#### subSequence()

`substring()`과 반환타입의 차이가 있지만 기능은 동일하다.
`CharSequence`은 `char` 형의 값을 읽을 수 있는 시퀀스로 인터페이스이다.  

`CharSequence subSequence(int beginIndex, int endIndex)`

```java
public void testSubSequence() {
  String s = "영|일|이삼";
  CharSequence r1 = s.subSequence(0, 4);
  logger.debug("{}", r1);
}
```

#### trim()

문자열의 앞뒤 공백을 제거한 결과를 새로운 문자열로 반환한다.  

`String trim()`

```java
public void testTrim() {
  String s = " 영일 이삼사 오 육     칠   팔  구 십   ";
  String r1 = s.trim();
  Assert.assertEquals("영일 이삼사 오 육     칠   팔  구 십", r1);
}
```

#### toUpperCase(), toLowerCase()

문자열의 영문자를 대문자로(`toUpperCase()`) 혹은 소문자로(`toLowerCase()`) 로 변경하여 새 문자열로 반환한다.  
변경이 필요없는 숫자나 특수문자 등은 그대로 반환한다.  

```
String toLowerCase()
String toUpperCase()
```

```java
public void testChangeCase() {
  String s = "Hello world1!!";
  String r1 = s.toUpperCase();
  String r2 = s.toLowerCase();
  Assert.assertEquals("HELLO WORLD1!!", r1);
  Assert.assertEquals("hello world1!!", r2);
}
```

### 문자열 탐색

#### indexOf(), lastIndexOf()

문자열에서 특정 문자나 부분문자열을 찾는데 앞에서부터 탐색을 시작하는 `indexOf()`, 뒤에서부터 시작하는 `lastIndexOf()` 가 있다. 원하는 문자를 발견하면 그 문자가 있는 첫 번째 인덱스를 반환하고 만약 찾는 것이 없다면 -1을 반환한다.   

```
int indexOf(int ch)
int lastIndexOf(int ch)
int indexOf(int ch, int fromIndex)
int lastIndexOf(int ch, int fromIndex)
int indexOf(String str)
int lastIndexOf(String str)
int indexOf(String str, int fromIndex)
int lastIndexOf(String str, int fromIndex)
```

```java
public void testSerchCharacters() {
  String s = "Hello!@ world@!!";

  int r1 = s.indexOf("!");
  Assert.assertEquals(5, r1);

  int r2 = s.indexOf("!", 6);
  Assert.assertEquals(14, r2);

  int r3 = s.indexOf(72); // H의 아스키코드값
  Assert.assertEquals(0, r3);

  int r4 = s.lastIndexOf("@");
  Assert.assertEquals(13, r4);

  int r5 = s.lastIndexOf("o", 8);
  Assert.assertEquals(4, r5);

  int r6 = s.lastIndexOf("$");
  Assert.assertEquals(-1, r6);
}
```

#### contains()

원하는 문자열의 포함여부에 따라 `true/false`로 반환한다.  
`String`이 `CharSequence`를 구현한 클래스 중 하나이므로 인수로 String 문자열을 넣을 수 있다.   

`boolean contains(CharSequence s)`

```java
public void testContains() {
  String s = "Hello, hi!";
  boolean r1 = s.contains("lo");
  Assert.assertTrue(r1);

  boolean r2 = s.contains("ro");
  Assert.assertFalse(r2);
}
```

### 문자열 대체

#### replace(), replaceAll(), replaceFirst()

문자열을 지정된 다른 문자나 문자열로 대체해서 새로운 `String`객체로 반환한다.  
대소문자도 가려서 대체를 하므로 주의.  

`replace()`와 `replaceAll()`은 동일한 결과를 낼 수 있지만 `replaceAll()`의 첫 번째 인수의 정규식을 통해 더 다양한 대체를 할 수 있다는 점이 다르다.  

```
String replace(char oldChar, char newChar)
String replace(CharSequence target, CharSequence replacement)
String replaceAll(String regex, String replacement)
String replaceFirst(String regex, String replacement)
```

```java
public void testReplaceString() {
  String s = "Hello, Hello, world.";

  String r1 = s.replace('.', '!');
  Assert.assertEquals("Hello, Hello, world!", r1);

  String r2 = s.replace("hello", "hi");
  Assert.assertNotEquals("hi, world.", r2); // 대소문자를 가림

  String r3 = s.replace("Hello", "hi");
  Assert.assertEquals("hi, hi, world.", r3);

  String r4 = s.replaceAll(" ", "-");
  Assert.assertEquals("Hello,-Hello,-world.", r4);

  String r5 = s.replaceAll("[l]", "*"); // l문자 를 *로 바꾼다.
  Assert.assertEquals("He**o, He**o, wor*d.", r5);

  String r6 = s.replaceFirst(" ", "-");
  Assert.assertEquals("Hello,-Hello, world.", r6);		
}
```
