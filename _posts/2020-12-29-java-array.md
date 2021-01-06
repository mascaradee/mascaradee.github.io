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

[Java tutorial : Language Basics-Variables-Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)  
[https://opentutorials.org/module/516/5373](https://opentutorials.org/module/516/5373)


## 배열

배열을 생성할 때 크기를 지정해서 추후 변경할 수 없지만 데이터 크기가 확정적일 때 배열을 사용하는 것이 메모리나 처리속도 면에서는 좋다. 이런 제한적인 기능때문에 다른 데이터의 부품으로 사용하기도 한다. 또한 인덱스를 통한 검색이 용이하다.    




###  배열 인스턴스의 생성

선언까지는 메모리 할당이 되지 않는다. 데이터 타입에는 모든 원시 타입과 `String`까지 들어갈수 있다.

```
데이터 타입[]  배열명;
데이터 타입  배열명[]; // 할수는 있지만 비권장
```

인스턴스를 생성하는 첫 번째 방법은 `new` 키워드를 사용한다.  
배열의 지정된 크기를 메모리에 올리는 동시에 배열변수명에도 할당하면 비로소 인스턴스가 생성된다.
이 부분이 생략되면 컴파일 에러가 발생한다.

```
배열명 = new 데이터 타입[배열크기]
```

배열의 각 요소에는 아래과 같이 값을 할당한다.

```
배열명[0] = 값1;
배열명[1] = 값2;
배열명[2] = 값3;
...
```

또는 배열 선언과 초기화를 한 방에 하는 방법도 있다. 이 경우 배열의 크기는 `{ }`안의 값의 개수다.

```
데이터 타입[] 배열명 = { 값1, 값2, 값3 ...}
```

```java
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
```

### 배열 크기

`.length` 프로퍼티는 배열의 크기를 리턴한다. 단지 데이터의 개수가 아닌 초기에 정한 배열의 크기이다. 그리고 메서드가 아님에 주의한다.

```java
String[] strArr = { "하나", "둘", "셋" };
logger.debug("{}", strArr.length); // 3
```

### 배열 복사

`System` 클래스의 `.arraycopy()` 메서드를 이용한다.

```java
char[] copyFrom = {'u','n','e','m','p','l','o','y','e','d'};
char[] copyTo = new char[8];
System.arraycopy(copyFrom, 2, copyTo, 0, 8);
Assert.assertEquals("employed", new String(copyTo)); // 출력하기 쉽게 String에 담은 것이지 copyTo는 배열이다.
```

### 유용한 기능

`java.util.Arrays` 클래스에서는 복사, 정렬, 검색 등 많은 기능을 제공하고 있다.

위에서 배열 복사한 예시도 `java.util.Arrays.copyOfRange()`를 이용해 아래와 같이 바꿀 수 있다.  

`public static char[] copyOfRange(char[] original, int from, int to(exclusive))`

```java
char[] copyFrom = {'u','n','e','m','p','l','o','y','e','d'};
char[] copyTo = java.util.Arrays.copyOfRange(copyFrom, 2, 10);		
Assert.assertEquals("employed", new String(copyTo));
```

- `java.util.Arrays.binarySearch()` : 지정한 값을 찾아 인덱스로 리턴한다.
- `java.util.Arrays.equals()` : 2개의 배열이 같은지 여부를 true/false로 리턴한다.
- `java.util.Arrays.fill()` : 지정한 값으로 배열을 채운다.
- `java.util.Arrays.sort()` : 순차적으로 오름차순으로 정렬한다.
- `java.util.Arrays.parallelSort()` : 병렬로 오름차순으로 정렬, 자바 8 이상 사용 가능하고 다중 프로세서일때는 훨씬 빠르다.


### 요소 사용

인덱스로 배열의 요소을 하나씩 사용하는 방법이 있다.  

`배열명[인덱스]`

```java
public void testArray1() {
  // 꺼내 쓰기
  String[] strArr = {"하나", "둘","셋"};
  logger.debug("{}", strArr[0]);
  logger.debug("{}", strArr[1]);
  logger.debug("{}", strArr[2]);
  logger.debug("{}", strArr.length);

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

### 요소 삭제

#### 배열의 원하는 요소를 삭제하는 방법 1

`ArrayUtils.remove(array, index)`는 `array`의 원하는 `index`의 요소를 지운 결과를 새로운 객체로 리턴한다.  
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

#### 배열의 원하는 요소를 삭제하는 방법 2

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
