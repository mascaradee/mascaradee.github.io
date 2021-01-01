---
layout: post
date: 2020-12-29 15:18:00 +0900
title: '[java] array'
categories:
  - java
tags:
  - array
---

* Kramdown table of contents
{:toc .toc}

## 참고

[https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)
[https://opentutorials.org/module/516/5373](https://opentutorials.org/module/516/5373)

## 배열

배열을 생성할 때 크기를 지정해서 추후 변경할 수 없는 배열을 사용하는 이유는? 데이터 크기가 확정적일 때 배열을 사용하는 것이 메모리나 처리속도 면에서는 좋다. 이런 제한적인 기능때문에 다른 데이터의 부품으로 사용하기도 한다.  


##  배열의 생성

```
타입[] 변수명 = new 타입[크기];
타입[] 변수명 = new 타입[]{};
타입[] 변수명 = {};
```

```java
public void testArray() {
	int[] arr1 = new int[3];
	arr1[0] = 1;
	arr1[1] = 2;
	arr1[2] = 3;
  int[] arr2 = new int[]{1, 2, 3};
	int[] arr3 = {1, 2, 3};

	Assert.assertArrayEquals(arr2,arr1);

	String[] strArr1 = new String[3];
	strArr1[0] = "하나";
	strArr1[1] = "둘";
	strArr1[2] = "셋";
  String[] strArr2 = new String[] {"하나", "둘","셋"};
	String[] strArr1 = {"하나", "둘","셋"};
	Assert.assertArrayEquals(strArr1,strArr2);
}
```

## 배열 사용

인덱스로 배열의 요소을 하나씩 사용하는 방법이 있다.  

`배열명[인덱스]`

```java
public void testArray1() {
  // 꺼내 쓰기
  String[] strArr = {"하나", "둘","셋"};
  logger.debug("{}", strArr[0]);
  logger.debug("{}", strArr[1]);
  logger.debug("{}", strArr[2]);
  logger.debug("{}", strArr.length); // length() : 데이터의 숫자가 아닌 초기에 정한 배열의 크기

  // 수정
  strArr[0] = "넷";
  logger.debug("{}", strArr[0]); // 넷
}
```

배열의 모든 요소을 사용하기 위해서는 반복문을 이용한다.  

```
for (초기화; 종료조건; 증감식){}
for (변수 : 배열){}
```

```java
public void testArray2() {
  String[] strArr = {"하나", "둘","셋"};

  // for문
  for(int i = 0; i < strArr.length; i++) {
    logger.debug("이건 그냥 for문 : {}", strArr[i]);
  }
  // 향상된 for문
  for(String s: strArr) {
    logger.debug("이건 향상된 for문: {}", s);
  }
}
```

## 배열 요소 삭제

### 배열의 원하는 요소를 삭제하는 방법 1

`ArrayUtils.remove(array, index)`는 `array`의 원하는 `index`의 요소를 지운 결과를 새로운 객체로 반환한다.  
이건 java built in api가 아닌 apach api이다.   

```java
public void testArray3() {
  String[] strArr = { "하나", "둘", "셋" };

  for(int i = 0; i < strArr.length; i++) {
    if (strArr[i] == "하나") {
      strArr = ArrayUtils.remove(strArr, i);
    }
  }
  logger.debug("{}", Arrays.toString(strArr)); // array 요소들을 로그 찍을때는 요걸 사용해야 원하는대로 나온다.
}
```

### 배열의 원하는 요소를 삭제하는 방법 2

다른 방법으로는 또 다른 배열을 이용하는 것이다.  

```java
public void testArray4() {
  String[] strArr = { "하나", "둘", "셋" };
  String[] copy = new String[strArr.length - 1];

  for (int i = 0, j = 0; i < strArr.length; i++) {
    logger.debug("{}:{}", i, j);
      if (strArr[i] != "둘") {
          copy[j++] = strArr[i];
      }
  }
  logger.debug("{}", Arrays.toString(copy));
}
```
