---
layout: post
date: 2020-12-30 14:24:00 +0900
title: '[java] char type'
categories:
  - java
tags:
  - java
  - char
  - character
  - escape sequences

---

* Kramdown table of contents
{:toc .toc}

## 참고

[Java tutorial : Numbers and Strings-Characters](https://docs.oracle.com/javase/tutorial/java/data/characters.html)

## char

문자 타입에도 `Character`클래스라는 래퍼 클래스가 존재한다. 역시 컴파일러가 `char`를 `Character`클래스로 혹은 그 반대로 박싱, 언박싱을 한다.

**자바에서는 문자는 홑따옴표, 문자열은 쌍따옴표로 구분을 한다.**  

```java
public void testCharacter() {
  // 자바의 한 문자는 char 타입으로 홑따옴표로 값을 할당한다.
  char ch = 'a';
  // Unicode for uppercase Greek omega character
  char uniChar = '\u03A9';
  // an array of chars
  char[] charArray = { 'a', 'b', 'c', 'd', 'e' };

  logger.debug("{}\n{}\n{}", ch, uniChar, charArray);
}
```

## Character 클래스

`char`타입의 래퍼 클래스인 `Character`클래스에는 유용한 메서드들이 있다.  
자세한 건 https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html 참고하길   

```java
public void testCharacterClass() {
  Character ch1 = new Character('a');
  Character ch2 = Character.toUpperCase(ch1); // static 메서드이기 때문에 클래스명.메소드명 으로 호출한다.
  logger.debug("{}", ch2); // A
  Character ch3 = Character.toLowerCase(ch2);
  logger.debug("{}", ch3); // a  
}
```

## 이스케이프 시퀀스  Escape Sequences

자바 컴파일러는 아래 이스케이프 시퀀스는 해당 명령에 따라 해석한다.

```java
System.out.println("She said \"Hello!\" to me."); // She said "Hello!" to me.
```

| Escape  | Sequence	Description                                      |
|---      |---                                                         |
| `\t`    | Insert a tab in the text at this point.                    |
| `\b`    | Insert a backspace in the text at this point.              |
| `\n`    | Insert a newline in the text at this point.                |
| `\r`    | Insert a carriage return in the text at this point.        |
| `\f`    | Insert a formfeed in the text at this point.               |
| `\'`    | Insert a single quote character in the text at this point. |
| `\"`    | Insert a double quote character in the text at this point. |
| `\\`    | Insert a backslash character in the text at this point.    |
