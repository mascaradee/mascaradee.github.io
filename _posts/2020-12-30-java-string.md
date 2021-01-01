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

`String`은 객체타입이다. 원시 자료타입처럼 생성할수 있지만 이 경우, 컴파일러가 자동으로 문자열을 값으로 가지는 `String Object`를 생성한다. 또한 문자열은 불변이므로 수정이 불가하고 몇몇 메서드로 문자열이 수정 되는 것처럼 보이는 것은 작업 결과를 새 문자열로 반환하기 때문이다.  

### 인스턴스 생성

#### 리터럴방식

```java
String greeting = "Hello World!";
```

#### new 키워드와 constructor 방식

```java
char[] helloArray = { 'h', 'e', 'l', 'l', 'o', '.' };
String helloString = new String(helloArray);
logger.debug("{}", helloString);
```

### 유용한 메서드

#### length()

특수문자를 포함한 문자열의 길이를 반환한다.   

```java
String helloString = new String("hello.");
int len = helloString.length();
logger.debug("{}", len);  // 6
```

#### getChar()

문자열을 char 타입으로 변경해서 반환한다.  

```java
String helloString = new String("hello.");
int len = helloString.length();
char[] helloArray = new char[len];
helloString.getChars(0, len, helloArray, 0); // char로 반환하는 메서드
logger.debug("{}", helloArray1);  // [h, e, l, l, o, .]
```

#### concat()

2개의 문자열을 연결해 주는 메서드로 문자열의 내용을 연결해서 새로운 String에 담아 반환한다.  
`문자열 + 문자열` 혹은 `문자열 + 리터럴`끼리도 연결이 가능하다.  
문자열은 보통 `+`연산자를 이용해 연결한다.  

```java
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

### 문자열을 숫자타입으로 변환

숫자타입 래퍼 클래스의 `valueOf()`를 이용해서 문자열을 숫자타입 래퍼 클래스로 변환한 뒤, `floatValue()` 나  `intValue()` 등의 메서드를 통해서 각 원시 자료타입으로 변환을 할 수 있다.

```java
Float bf = Float.valueOf("4.5"); // 래퍼 클래스 타입
float sf = bf.floatValue(); // 원시 숫자 타입

Integer bi = Integer.valueOf("82");
int si = bi.intValue();       
```

### 숫자타입을 문자열로 변환

원시 숫자 타입에 문자열이 더해지면 문자열이 된다.  

`숫자타입 + "" 혹은 "문자열"`

```java
int i = 90;
String s1 = "" + i;
Assert.assertEquals(true, s1 instanceof String);
```

래퍼클래스의 `toString()`메서드를 이용해서 원시 숫자 타입을 문자열로 변환할 수 있다.  

`래퍼클래스.toString()`

```java
int i = 90;
// 래퍼 클래스.toString()
String s2 = Integer.toString(i);
Assert.assertEquals(true, s2 instanceof String);
```

### 문자열 자르기

#### substring()

문자열의 원하는 구간으로 자를 수 있다. 새로운 문자열로 반환한다.  

```
String substring(시작인덱스, 종료인덱스)
String substring(시작인덱스)
```

```java
String s = "영일이삼사오육칠팔구십";
String r1 = s.substring(3);
String r2 = s.substring(6, 8); // endIndex는 불포함
Assert.assertEquals("삼사오육칠팔구십", s.substring(3));
Assert.assertEquals("육칠", s.substring(6, 8));
```

#### split()

문자열을 한 자씩 잘라 새로운 문자열 배열로 반환한다.

```
String[] split(String 구분자)
String[] split(String 구분자, int 배열최대크기)
```

```java
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
```
#### subSequence()

`substring()`과 반환타입의 차이가 있지만 기능은 동일하다.
`CharSequence`은 `char` 타입의 값을 읽을 수 있는 시퀀스로 인터페이스이다.  

`CharSequence subSequence(int beginIndex, int endIndex)`

```java
String s = "영|일|이삼";
CharSequence r1 = s.subSequence(0, 4);
logger.debug("{}", r1);
```

#### trim()

문자열의 앞뒤 공백을 제거한 결과를 새로운 문자열로 반환한다. 중간에 끼어 있는 공백은 제거하지 않는다.  

`String trim()`

```java
String s = " 영일 이삼사 오 육     칠   팔  구 십   ";
String r1 = s.trim();
Assert.assertEquals("영일 이삼사 오 육     칠   팔  구 십", r1);
```

#### toUpperCase(), toLowerCase()

문자열의 영문자를 대문자로(`toUpperCase()`) 혹은 소문자로(`toLowerCase()`) 로 변경하여 새 문자열로 반환한다.  
변경이 필요없는 숫자나 특수문자 등은 그대로 반환한다.  

```
String toLowerCase()
String toUpperCase()
```

```java
String s = "Hello world1!!";
String r1 = s.toUpperCase();
String r2 = s.toLowerCase();
Assert.assertEquals("HELLO WORLD1!!", r1);
Assert.assertEquals("hello world1!!", r2);
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
```

#### contains()

원하는 문자열의 포함여부에 따라 `true/false`로 반환한다.  
`String`이 `CharSequence`를 구현한 클래스 중 하나이므로 인수로 String 문자열을 넣을 수 있다.   

`boolean contains(CharSequence s)`

```java
String s = "Hello, hi!";
boolean r1 = s.contains("lo");
Assert.assertTrue(r1);

boolean r2 = s.contains("ro");
Assert.assertFalse(r2);
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
String s = "Hello, Hello, world.";

String r1 = s.replace('.', '!');
Assert.assertEquals("Hello, Hello, world!", r1);

String r2 = s.replace("hello", "hi");
Assert.assertNotEquals("hi, hi, world.", r2); // 대소문자를 가리므로 not equal

String r3 = s.replace("Hello", "hi");
Assert.assertEquals("hi, hi, world.", r3);

String r4 = s.replaceAll(" ", "-");
Assert.assertEquals("Hello,-Hello,-world.", r4);

String r5 = s.replaceAll("[l]", "*"); // l문자 를 *로 바꾼다.
Assert.assertEquals("He**o, He**o, wor*d.", r5);

String r6 = s.replaceFirst(" ", "-");
Assert.assertEquals("Hello,-Hello, world.", r6);
```


### 문자열 비교

#### endsWith(), startsWith()

인수 문자열로 끝나는지 혹은 시작되는지 확인하여 `true/false`를 반환한다.
offset 인덱스가 있는 경우, 해당 인덱스 부터 비교를 한다.

```
boolean endsWith(String suffix)
boolean startsWith(String prefix)
boolean startsWith(String prefix, int offset)
```

```java
String s = " Happy new year!";
Assert.assertEquals(true, s.endsWith("!"));  
Assert.assertEquals(true, s.startsWith(" ")); // 공백도 확인할 수 있다.
Assert.assertEquals(true, s.startsWith("H", 1)); // 공백도 확인할 수 있다.
Assert.assertEquals(false, s.startsWith("New", 7)); // 대소문자도 가림
Assert.assertEquals(true, s.startsWith("new", 7)); // 대소문자도 가림
```

#### compareTo(), compareToIgnoreCase()

`compareTo()` 메서드는 사전순으로 2개의 문자열을 비교한다. 기준문자열이 비교할 문자열보다 크면 양수, 같으면 0, 작으면 음수를 반환한다.  
`compareToIgnoreCase()` 메서드는 같은 기능이나 영문자의 대소문자를 구분하지 않고 비교한다.  

```
int compareTo(String anotherString)
int compareToIgnoreCase(String str)
```

```java
String s1 = "H"; // 아스키 코드값 72
String s2 = "h"; // 아스키 코드값 104

Assert.assertEquals(-32, s1.compareTo(s2)); // 72 - 104 = -32 : 기준 문자열(앞)이 더 작아서 음수 출력
Assert.assertEquals(32, s2.compareTo(s1)); // 104 - 72 = 32 : 기준 문자열(앞)이 더 커서 양수 출력
Assert.assertEquals(0, s1.compareTo(s1)); // 72 - 72 = 0 : 기준 문자열(앞)과 비교할 문자열(뒤)가 같아서 0

String s3 = "aunt";
String s4 = "bee";

Assert.assertEquals(-1, s3.compareTo(s4)); // aunt가 bee보다 사전 앞장에 실려 있다. 따라서 음수
Assert.assertEquals(1, s4.compareTo(s3)); // bee가 aunt보다 사전 뒷장에 실려 있다. 따라서 양수
Assert.assertEquals(0, s3.compareTo(s3));

Assert.assertEquals(0, s1.compareToIgnoreCase(s2)); // 대소문자 무시하고 비교
```

#### equals(), equalsIgnoreCase()

`equals()` 메서드는 문자열끼리 같은지를 비교하여 `true/false`를 반환한다.  
`equalsIgnoreCase()` 메서드는 같은 기능이나 영문자의 대소문자를 구분하지 않고 같은지 비교하여 결과를 반환한다.  

```
boolean equals(Object anObject)
boolean equalsIgnoreCase(String anotherString)
```

```java
String s1 = "Happy new year";
String s2 = "happy new year";

Assert.assertEquals(false, s1.equals(s2));
Assert.assertEquals(true, s1.equalsIgnoreCase(s2));
```

#### regionMatches(), matches()

`regionMatches()` 메서드는 문자열의 영역이 인수의 영역과 일치하는지 확인한다.    
기준 문자열의 경우 `toffset` 인덱스에서 시작하고 비교할 문자열의 경우 `ooffset`에서 시작한다. 비교할 문자열의 길이가 `len`이다.  
`boolean ignoreCase`를 추가하여 `true`일 경우 대소문자 무시를 한다.

`matches()` 메서드는 문자열이 인수의 정규식과 일치하는지 여부로 `true/false`를 반환한다.

```
boolean regionMatches(int toffset, String other, int ooffset, int len)
boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)
boolean matches(String regex)
```

```java
// regionMatches()
String searchMe = "Green Eggs and Ham";
String findMe = "Eggs";
int searchMeLength = searchMe.length();
int findMeLength = findMe.length();
boolean foundIt = false;
for (int i = 0; i <= (searchMeLength - findMeLength); i++) {
  if (searchMe.regionMatches(i, findMe, 0, findMeLength)) {
    // searchMe(기준 문자열)의 i번째 문자부터 findMe의 문자열과 비교를 하는데 findMe의 0번째 배열의 문자부터 findMeLength만큼 돌면서 비교한다.
    // 그 다음 다시 기준 문자열의 i++ 문자 비교를 계속한다.
    foundIt = true;
    logger.debug("{}", i); // 6
    logger.debug("{}", searchMe.substring(i, i + findMeLength)); // Eggs
    break;
  }
}
```

```java
// matches()
String s = "2021 begins";
Assert.assertEquals(false, s.matches("[b]")); // contains()와는 다르다 주어진 문자열과 동일한 패턴을 찾는 것이므로
Assert.assertEquals(true, s.matches("[0-9]* begins"));
```

## StringBuilder 클래스

`StringBuilder` 객체와 `String` 객체는 동일하지만 수정을 할 수 있다는 것만 다르다. `StringBuilder` 객체는 내부적으로 일련의 문자열이 있는 가변 배열처럼 취급된다.   
어떤 시점에 길이와 문자열의 내용은 메서드 호출을 통해서 변할 수 있다.  
`StringBuilder`가 더 간단한 코드나 더 좋은 성능을 제공하지 않는한 `String`을 써야 하지만 많은 수의 문자열을 연결해야 하는 경우에는 `StringBuilder`가 더 효율적이다.

참고로 `StringBuffer` 클래스는 `StringBuilder` 클래스와 완전 똑같다. 다만 메서드가 동기화되어 스레드로부터 안전하다는 점만 제외하고.

### 길이와 수용력

`StringBuilder` 클래스에도 `length()` 메서드가 있다. 다만 `String` 과는 다르게 수 많은 문자열의 할당된 공간인 `capacity`를 가지고 있다. `capacity()` 메서드로 확인할 수 있는데 이건 항상 `length`보다 크거나 같고  `StringBuilder`에 추가 필요에 따라 자동으로 확장된다.  

#### StringBuilder() 생성

기본적으로 비어 있는 16 크기의 공간을 가진 `StringBuilder`를  생성한다.  
인수로 들어오는 `CharSequence`, `String`의 값에 따라 초기화를 하고 거기에 16 크기의 공간을 추가하여 생성한다.
혹은 `capacity`의 값(`int`)을 인수로 받아 그 숫자 크기대로 비어있는 `capacity`를 만든다.  

```
StringBuilder()
StringBuilder(CharSequence cs)
StringBuilder(String s)
StringBuilder(int initCapacity)
```
```java
StringBuilder sb = new StringBuilder();
logger.debug("{}", sb.length()); // 0
logger.debug("{}", sb.capacity()); // 16 - 초기 capacity
sb.append("abcdefghi");
logger.debug("{}", sb.length()); // 9
logger.debug("{}", sb.capacity()); //16 - 길이가 16이 넘지 않아서 길이가 추가되지 않음
sb.append("abcdefghijklmnopqrstuvwxyz");
logger.debug("{}", sb.length()); // 35
logger.debug("{}", sb.capacity()); // 35 - 길이와 같은 크기로 추가됨
sb.append("a");
logger.debug("{}", sb.length()); // 36
logger.debug("{}", sb.capacity()); // 72 - 길이보다 큰 크기로 추가됨

StringBuilder sb1 = new StringBuilder("안녕하세요");
logger.debug("{}", sb1.length()); // 5
logger.debug("{}", sb1.capacity()); // 21

StringBuilder sb2 = new StringBuilder(1);
logger.debug("{}", sb2.length()); // 0
logger.debug("{}", sb2.capacity()); // 1 - 기본 16이 아닌 인수로 넘어온 값으로 capacity 크기 결정
```

#### setLength(), ensureCapacity()

각 길이와  `capacity`의 크기를 세팅하는 메서드이다.  
`setLength()` 메서드는 문자열보다 인수의 길이가 더 작으면 문자열의 내용은 길이에 맞게 잘라버리고   
`ensureCapacity()` 메서드는 `StringBuilder`가 생성될 때 가지는 `capacity`보다 큰 것이 인수로 들어오면 `capacity`의 크기를 늘려버린다.
`append(), insert(), setLength()` 등의 메서드로 길이늘려 기존 `capacity`보다 더 커지면 `capacity`는 자동으로 크기를 늘린다.

```
void setLength(int newLength)
void ensureCapacity(int minCapacity)
```

```java
// setLength()
StringBuilder sb = new StringBuilder("안녕");
sb.setLength(3);
logger.debug("{}", sb); // 문자열의 길이보다 큰 길이로 세팅하여 모두 출력
sb.setLength(1);
logger.debug("{}", sb); // 문자열의 길이보다 작은 길이로 세팅하여 문자열의 길이가 그 만큼 잘림
```

```java
// ensureCapacity()
StringBuilder sb = new StringBuilder();
sb.ensureCapacity(16);
logger.debug("{}", sb.capacity()); // 16 - 기본과 동일한 크기
sb.ensureCapacity(18);
logger.debug("{}", sb.capacity()); // 34 - 기본보다 큰 최소크기가 인수로 들어와서 capacity가 커진것을 알수 있다.
```

### StringBuilder 유용한 메서드

#### append(), insert()

`append(), insert()` 같은 메서드는 `String`에는 없는 기능이다. 두 메서드는 오버로딩되어 어떤 타입이든 상관없이 사용할 수 있는데 `StringBuilder` 안에서 자동으로 `String`으로 변환되어 각 기능을 수행한다. 두 메서드는 모두 문자열에 무언가를 추가한다는 공통 기능을 가지고 있지만 차이는 `append()` 메서드는 무조건 마지막에, `insert()` 메서드는 지정되 위치에 추가한다는 것이다.  

문자열에 인수의 내용을 `String`으로 변환하여 추가한다.  

```
StringBuilder append(boolean b)
StringBuilder append(char c)
StringBuilder append(char[] str)
StringBuilder append(char[] str, int offset, int len)
StringBuilder append(double d)
StringBuilder append(float f)
StringBuilder append(int i)
StringBuilder append(long lng)
StringBuilder append(Object obj)
StringBuilder append(String s)
```

`String`으로 변환된 두 번째 인수의 내용을 `offset` 인덱스의 앞에 추가한다. 즉, 지정한 인덱스 자리에 들어가란 말과 같다.

```
StringBuilder insert(int offset, boolean b)
StringBuilder insert(int offset, char c)
StringBuilder insert(int offset, char[] str)
StringBuilder insert(int index, char[] str, int offset, int len)
StringBuilder insert(int offset, double d)
StringBuilder insert(int offset, float f)
StringBuilder insert(int offset, int i)
StringBuilder insert(int offset, long lng)
StringBuilder insert(int offset, Object obj)
StringBuilder insert(int offset, String s)
```

```java
StringBuilder sb = new StringBuilder("안녕");
sb.append("시오");
sb.append("!");
sb.append(321);
Assert.assertEquals("안녕시오!321", sb.toString());

sb.insert(2, "하");
Assert.assertEquals("안녕하시오!321", sb.toString());
```

####  delete(), deleteCharAt()

문자열 혹은 문자를 삭제한다.   

```
StringBuilder delete(int start, int end)
StringBuilder deleteCharAt(int index)
```

```java
StringBuilder sb = new StringBuilder("안녕하시오");
sb.delete(3, 4); // 시작인덱스 부터 종료인덱스 -1까지 삭제
Assert.assertEquals("안녕하오", sb.toString());

sb.deleteCharAt(2); // 해당 인덱스만 삭제
Assert.assertEquals("안녕오", sb.toString());
```

#### replace(), setCharAt()

인수로 들어온 문자 혹은 문자열을 대체한다.  

```
StringBuilder replace(int start, int end, String s)
void setCharAt(int index, char c)
```

```java
StringBuilder sb = new StringBuilder("안녕하시오");
sb.replace(3, 5, "세요"); // 시작인덱스 부터 종료인덱스 -1까지 대체
Assert.assertEquals("안녕하세요", sb.toString());

sb.setCharAt(2, '*'); // 해당 인덱스만 대체
Assert.assertEquals("안녕*세요", sb.toString());
```

#### reverse()

문자열을 뒤집는다.   

`StringBuilder reverse()`

```java
StringBuilder sb = new StringBuilder("다 간다~ 이 일요일이 다 간다~");
sb.reverse();
Assert.assertEquals("~다간 다 이일요일 이 ~다간 다", sb.toString());
```

#### toString()

문자열을 `String`으로 반환한다.  보통 `StringBuilder`는 `String` 처럼 출력을 하지만 내부전긍로 `문자열.toString()`을 호출한다.

`String toString()`
