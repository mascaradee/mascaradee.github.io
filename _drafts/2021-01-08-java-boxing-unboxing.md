---
layout: post
date: 2021-01-08 21:42:00 +0900
title: '[java] 박싱과 언박싱 Boxing and Unboxing '
categories:
  - java
tags:
  - boxing
  - unboxing
---

* Kramdown table of contents
{:toc .toc}

## 참고
[Java tutorial: Learning the Java Language> Numbers and Strings> Autoboxing and Unboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)  


## 오토 박싱 Autoboxing

오토 박싱이란 자바 컴파일러가 원시 데이터 타입을 그것의 래퍼 클래스로 자동으로 변환해 주는 것을 말한다.
메소드 호출 시 매개변수의 데이터타입에 맞춰서 박싱이 일어나거나 할당 시에는 할당된 변수의 데이터 타입에 맞춰 박싱이 일어나게 된다.

```java
Integer i1 = 10; // 원시데이터타입으로 값을 할당했지만 자동으로 Integer로 변환되었다.
Integer i2 = Integer.valueOf(10);		
Assert.assertEquals(i1, i2);
Assert.assertTrue(i1 instanceof Integer);
Assert.assertTrue(i2 instanceof Integer);
```

## 언박싱 Unboxing

언박싱이란 박싱의 반대로 래퍼클래스에서 원시데이터타입으로 변환하는 것을 말한다.  
메소드 호출 시 매개변수의 데이터타입에 맞춰서 언박싱이 일어나거나 할당 시에는 할당된 변수의 데이터 타입에 맞춰 언박싱이 일어나게 된다.

```java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i += 2) {
    li.add(Integer.valueOf(i));
}

int sum = 0;
for (Integer i: li) {
    if (i % 2 == 0) { // Integer 객체타입에 %, += 같은 연산자는 사용할 없지만 컴파일러가 자동으로 언박싱을 한다.  
        sum += i;
    }
}
logger.debug("{}", sum);

/* 실제로 위 코드는 아래와 같이 i.intValue()로 언박싱이 일어나 컴파일 에러가 발생하지 않는다.
for (Integer i: li) {
    if (i.intValue() % 2 == 0) {  
        sum += i.intValue();
    }
}
logger.debug("{}", sum);
*/
```

아래는 자바 컴파일러에 의해 박싱, 언박싱이 일어나는 원시데이터 타입과 래퍼 객체를 연결한 것이다.  

| Primitive type | 	Wrapper class |
|---             |---             |
| boolean        | Boolean        |
| byte           | Byte           |
| char           | Character      |
| float          | Float          |
| int            | Integer        |
| long           | Long           |
| short          | Short          |
| double         | Double         |
