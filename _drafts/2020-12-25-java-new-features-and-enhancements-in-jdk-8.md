layout: post
---
date: 2020-12-25 16:00:00 +0900
title: '[Java] new features and enhancements in jdk 8'
categories:
  - java
tags:
  - jdk 8
  - java
---

* Kramdown table of contents
{:toc .toc}

## 참고
- [What's New in JDK 8](https://www.oracle.com/java/technologies/javase/8-whats-new.html)  
- [JAVA8 변경 사항 by tcpschool](http://www.tcpschool.com/java/java_intro_java8)

## JDK 8 변경사항

- 람다 표현식
- 메서드 참조 Method Reference
- Default Method
- 스트림
- Type inferece 개선
- Optional
- Joda Time 방식의 새 날짜 API 변경
- IO/NIO 확장
- Concurrency API 개선

- 새 자바스크립트 엔진 (Nashorn) : JDK11에서 제거될 예정
- JavaFX
- 메타 데이터 지원 보완
- Heap에서 Permanent Generation 제거


## 람다 표현식

- 람다 표현식이란 익명 클래스를 하나의 식으로 표현한 것이다.  
- 메서드의 매개변수로 전달이 될 수 있다.
- 메서드의 결과값으로 반환이 될 수도 있다.
- 람다 표현식은 기존의 불필요한 코드를 줄여주고 가독성을 높이는데 목적이 있다.  

보통 자바 메서드는 아래와 같은데  

```java
int add (int num1, int num2) {
  return num1 + num2;
}
```

람다 표현식으로 변환을 하면 다음과 같다. 자바스크립트의 화살표 함수와 비슷하다.  

```java
(num1, num2) -> num1 + num2;
```

람다 표현식의 형태는 클래스 선언과 동시에 객체를 생성하는 익명클래스와 같다.   

```java
new Object() {
  int add (int num1, int num2){
    return num1 + num2;
  }
};

new Object((num1, num2) -> num1 + num2);
```

### 람다 표현식 작성법

```java
(parameters) -> expression
또는
(parameters) -> { statements; }
```

- 매개변수의 타입을 추론할 수 있는 경우, 타입 생략 가능
- 매개변수가 하나인 경우에는 괄호 `()` 생략 가능
- 함수의 몸체가 하나의 표현식(`expression`)으로만 이루어진 경우에는 중괄호 `{}` 생략 가능하고 자바 런타임이 표현식을 평가하고 그 결과값을 반환한다.
- 함수의 몸체가 하나의 return문(`statement block`)으로만 이루어진 경우에는 중괄호 `{}` 생략 불가능
- void 메서드는 `{}`가 필요없다.

```java
(num1, num2) -> num1 + num2

(num1, num2) -> {
    return num1 + num2;
}

name -> System.out.println("내 이름은 " + name)
```

## 메서드 참조 Method Reference

메서드 참조는, 람다 표현식의 바디에서 단 하나의 호출 표현식만 작성할 경우에만 적용할 수 있다.  
람다 표현식에서 불필요한 매개변수를 제거하고 `::`사용해 표현할 수 있다.  

| Kind                                                                        | Example                              |
| ---                                                                         | ---                                  |
| Reference to a static method                                                | ContainingClass::staticMethodName    |
| Reference to an instance method of a particular object                      | containingObject::instanceMethodName |
| Reference to an instance method of an arbitrary object of a particular type | ContainingType::methodName           |
| Reference to a constructor                                                  | ClassName::new                       |

### static 메서드 참조

```java
List<String> list = Arrays.asList(new String[] { "하나", "둘", "셋" });
Stream<String> stream = list.stream();
stream.forEach((ele) -> {
	System.out.println(ele);
}); // 요건 아래와 같고
stream.forEach(System.out::println); // 스태틱 멤버라서 클래스를 명시한 것 뿐임.
```

### 특정 객체의 인스턴스 메서드에 대한 참조

```java
private static final Logger logger = LoggerFactory.getLogger(LamdaExpressionTest.class);

// 아래 넷은 모두 결과가 같다.

// #1 내부 클래스를 이용하는 방식
InnerInf inf = new InnerInf() {
  @Override
  public void saySomething(String str) {
    logger.debug(str);				
  }
};
InnerClass.doSomething(inf);

// #2 익명 클래스를 이용하는 방식
InnerClass.doSomething(new InnerInf() {
  @Override
  public void saySomething(String str) {
    logger.debug(str);				
  }
});

// #3 1, 2를 줄여서 쓸 수 있게 나온게 람다 표현식
InnerClass.doSomething((str) -> {
  logger.debug(str);
}); // 아래와 같다.

// #4 3을 줄여서 나온게 메서드 참조
InnerClass.doSomething(logger::debug);		

static class InnerClass {
  static void doSomething(InnerInf inf) {
    String str = "hello";
    inf.saySomething(str);
  }
}

interface InnerInf {
  void saySomething(String str);
}
```

### 특정 타입의 임의 객체의 인스턴스 메서드에 대한 참조

### 생성자 참조

단순히 객체를 생성하고 반환하는 람다 표현식은 생성자 참조로 변환할 수 있다.  

```java
// 람다 표현식
(a) -> { return new Object(a); }

// 생성자 참조
Object::new
```

### 메서드 참조를 사용할 수 없는 경우

```java
InnerClass.doSomething((str) -> {
  logger.debug(str);
  logger.info(str);
});
// 위의 경우 메서드 참조로 작성할 수 없음.
// 메서드 참조는, 람다 표현식의 바디에서 단 하나의 호출 표현식만 작성할 경우에만 적용할 수 있다.
// logger.info(str);을 추가 할 수 있는 방법이 없다.  
InnerClass.doSomething(logger::debug);
```

## Default Method


### default 메서드, static 메서드

인터페이스는 기본적으로 구현체가 없는 추상메서드와 상수만을 가질 수 있다. 그래서 인터페이스를 상속받는 클래스에서 메서드를 오버라이딩하고 구현체를 생성한다.
하지만 jdk 8에서 메서드에 default 키워드를 붙이면 클래스에 구현체를 생성할 필요가 없고 인터페이스 내에서 바로 구현이 가능하게 변경되었다. 인터페이스가 변경이 될때 마다 그것을 구현하는 클래스도 항상 변경이 되어야만 했던 문제를 해결할 수 있다.  
static 메서드도 default 메서드와 같이 인터페이스 내에 구현을 할 수 있게 변경이 되었다. 다만 해당 메서드를 호출하는 방법은 기존 static 메서드를 호출하는 방식인 `인터페이스명.메서드명`로 default 메서드 호출 방식과는 차이가 있다.  

```java
interface Person {
  public abstract void think(); // 추상(구현체가 필요한 미완성) 메서드

  public default void speak() {
    logger.debug("I can speak!");
  }
  public static void smile() {
    logger.debug("I can smile!");
  }
}

class Personality implements Person {

  @Override
  public void think() {
    logger.debug("I implement Person's think");
  }		
}

public void testDefaultMethod() {
  Personality p = new Personality();
  p.think(); // Personality 클래스에서 구현한 내용이 나온다.
  p.speak(); // Personality 클래스에서 구현하지 않아도 Person인터페이스에서 이미 구현되 내용이 나온다.
  Person.smile(); // static 메서드 호출 방법: 인터페이스명.메서드명
}
```

## 스트림 Stream API

배열, 컬렉션, 파일 등의 많은 양의 데이터에 접근하기 위한 방법을 스트림을 통해 정형화 시킬 수 있다.  

- 내부 반복을 통해 작업을 수행
- 재사용 불가
- 원본 데이터는 변경하지 않음
- 필터-맵 기반의 API를 사용하여 지연연산을 통해 성능을 최적화
- parallelStream()을 통해 쉽게 병렬처리

### 스트림의 생성

다음의 다양한 데이터 소스에서 스트림을 생성할 수 있다.  

1. 컬렉션   

컬렉션(`Set, List, Map, SortedSet, SortedMap, HashSet, TreeSet, ArrayList, LinkedList, Vector, Collections, Arrays, AbstractCollection`)을 스트림으로 생성한다.   

```java

// Collection interface
// Collection<E>의 <E>는 elements(요소)의 타입을 의미
public interface Collection<E> extends Iterable<E> {
  (...)
  default Stream<E> stream() {
    return StreamSupport.stream(spliterator(), false);
  }

  default Stream<E> parallelStream() {
      return StreamSupport.stream(spliterator(), true);
  }
  (...)
}

// List interface
// List<E>는 Collection<E>를 상속하고 있다.
public interface List<E> extends Collection<E> {
}

public void testStream1() {
		List<String> list = new ArrayList<>();
		list.add("일");
		list.add("이");
		list.add("삼");
		list.add("사");

		Stream<String> stream = list.stream(); // Collection.stream()를 호출해 스트림 생성
		stream.forEach(logger::debug);
		/*
		[결과] stream()은 순차적으로 결과를 반환한다.
		일
		이
		삼
		사
		 */

		// 같은 stream을 재 사용할 경우  에러가 발생한다. stream은 일회용이다.
		//stream.forEach(logger::debug); // 에러 메시지: java.lang.IllegalStateException: stream has already been operated upon or closed

		// 하지만 원본 데이터 list는 변경이 되지 않으므로 재사용할 수 있다.
		Stream<String> stream2 = list.parallelStream(); // Collection.parallelStream()를 호출해 스트림 생성
		stream2.forEach(logger::debug);		
		/*
		[결과] parallelStream()은 결과를 병렬로 반환한다.
          내부의 thread 가 데이터의 크기만큼 생성되어 동시에 실행 결과를 반환한다.
		삼
		사
		이
		일
		*/
	}
```

2. 배열  

Arrays에는 다양한 형태의 stream() 메소드가 있다.   
컬렉션 타입뿐만 아니라 기본 타입 숫자형 을 위한 별도 스트림이 존재하는데 IntStream, LongStream, DoubleStream 인터페이스로 각각 제공한다.  

```java
// Arrays.class
public class Arrays {

  // 요소 타입에 맞춰 Stream 생성
  public static <T> Stream<T> stream(T[] array) {
    return stream(array, 0, array.length);
  }
  //  stream(T[] 배열, int 시작인덱스(포함), int 종료인덱스(미포함)
  public static <T> Stream<T> stream(T[] array, int startInclusive, int endExclusive) {
    return StreamSupport.stream(spliterator(array, startInclusive, endExclusive), false);
  }

  // int[] 전용
  public static IntStream stream(int[] array) {
    return stream(array, 0, array.length);
  }
  public static IntStream stream(int[] array, int startInclusive, int endExclusive) {
    return StreamSupport.intStream(spliterator(array, startInclusive, endExclusive), false);
  }

  // long[] 전용
  public static LongStream stream(long[] array) {
    return stream(array, 0, array.length);
  }
  public static LongStream stream(long[] array, int startInclusive, int endExclusive) {
    return StreamSupport.longStream(spliterator(array, startInclusive, endExclusive), false);
  }

  // double[] 전용
  public static DoubleStream stream(double[] array) {
    return stream(array, 0, array.length);
  }
  public static DoubleStream stream(double[] array, int startInclusive, int endExclusive) {
    return StreamSupport.doubleStream(spliterator(array, startInclusive, endExclusive), false);
  }
}

public void testStream2() {
  String[] arr1 = new String[]{"a", "b", "c", "d"};

  Stream<String> stream1 = Arrays.stream(arr1);
  stream1.forEach(logger::debug); // a b c d

  Stream<String> stream2 = Arrays.stream(arr1, 1, 3);
  stream2.forEach(logger::debug); // b c

  int [] arr2 = new int[]{-2, -1, 0, 1, 2};
  IntStream stream3 = Arrays.stream(arr2, 1, 3);
  stream3.forEach(System.out::println); // -1 0

  double [] arr3  = new double[]{1.1, 2.1, -3.1, -4.1};
  DoubleStream stream4 = Arrays.stream(arr3, 0, 4);
  stream4.forEach(System.out::println); // 1.1  2.1  -3.1  -4.1
}
```

3. 가변 매개변수

매개변수의 타입에 관계없이 그 데이터로 스트림을 생성한다.  

```java
// Stream interface
public interface Stream<T> extends BaseStream<T, Stream<T>> {
  public static<T> Stream<T> of(T t) {
      return StreamSupport.stream(new Streams.StreamBuilderImpl<>(t), false);
  }
  @SafeVarargs
  @SuppressWarnings("varargs") // Creating a stream from an array is safe
  public static<T> Stream<T> of(T... values) {
      return Arrays.stream(values);
  }
}

public void testStream3() {
  // 가변 매개변수를 Stream.of()를 이용해 stream으로 반환한다.
  // 어떤 타입의 매개변수가 오던 상관없다.
  Stream<Integer> stream1 = Stream.of(100, 80, 90, 70);
  stream1.forEach(System.out::println);

  Stream<String> stream2 = Stream.of("일", "이", "삼");
  stream2.forEach(System.out::println);

  String[] arr1 = new String[]{"사과", "바나나", "오렌지", "포도"};
  Stream<String> stream3 = Stream.of(arr1);
  stream3.forEach(System.out::println);
}
```

4. 지정된 범위의 연속된 정수

`int, long` 타입의 정수로 스트림을 생성한다.  

```java
// LongStream interface
public interface LongStream extends BaseStream<Long, LongStream> {
  // 지정된 범위의 연속된 정수를 스트림으로 생성, 시작인덱스(포함) ~ 종료인덱스(미포함)
  public static LongStream range(long startInclusive, final long endExclusive) {
      if (startInclusive >= endExclusive) {
          return empty();
      } else if (endExclusive - startInclusive < 0) {
          // Size of range > Long.MAX_VALUE
          // Split the range in two and concatenate
          // Note: if the range is [Long.MIN_VALUE, Long.MAX_VALUE) then
          // the lower range, [Long.MIN_VALUE, 0) will be further split in two
          long m = startInclusive + Long.divideUnsigned(endExclusive - startInclusive, 2) + 1;
          return concat(range(startInclusive, m), range(m, endExclusive));
      } else {
          return StreamSupport.longStream(
                  new Streams.RangeLongSpliterator(startInclusive, endExclusive, false), false);
      }
  }
  // 지정된 범위의 연속된 정수를 스트림으로 생성, 시작인덱스(포함) ~ 종료인덱스(포함)
 public static LongStream rangeClosed(long startInclusive, final long endInclusive) {
     if (startInclusive > endInclusive) {
         return empty();
     } else if (endInclusive - startInclusive + 1 <= 0) {
         // Size of range > Long.MAX_VALUE
         // Split the range in two and concatenate
         // Note: if the range is [Long.MIN_VALUE, Long.MAX_VALUE] then
         // the lower range, [Long.MIN_VALUE, 0), and upper range,
         // [0, Long.MAX_VALUE], will both be further split in two
         long m = startInclusive + Long.divideUnsigned(endInclusive - startInclusive, 2) + 1;
         return concat(range(startInclusive, m), rangeClosed(m, endInclusive));
     } else {
         return StreamSupport.longStream(
                 new Streams.RangeLongSpliterator(startInclusive, endInclusive, true), false);
     }
   }
}

public void testStream4() {
  // int타입  -> IntStream
  // long타입  -> LongStream

  // 지정된 범위의 연속된 정수를 스트림으로 생성, 시작인덱스(포함) ~ 종료인덱스(미포함)
  LongStream lStream1 = LongStream.range(0, 5);
  lStream1.forEach(System.out::println); // 0 1 2 3 4

  // 지정된 범위의 연속된 정수를 스트림으로 생성, 시작인덱스(포함) ~ 종료인덱스(포함)
  LongStream lStream2 = LongStream.rangeClosed(0, 5);
  lStream2.forEach(System.out::println); // 0 1 2 3 4 5
}
```

5. 특정 타입의 난수들

`int, long, double` 타입의 난수로 스트림 생성한다.

```java
// Random class
public class Random implements java.io.Serializable {
  // 스트림 사이즈 제한을 매개변수로 받음
  public DoubleStream doubles(long streamSize) {
      if (streamSize < 0L)
          throw new IllegalArgumentException(BadSize);
      return StreamSupport.doubleStream
              (new RandomDoublesSpliterator
                       (this, 0L, streamSize, Double.MAX_VALUE, 0.0),
               false);
  }
  // 스트림 사이즈 무제한
  public DoubleStream doubles() {
    return StreamSupport.doubleStream
            (new RandomDoublesSpliterator
                     (this, 0L, Long.MAX_VALUE, Double.MAX_VALUE, 0.0),
             false);
  }
  // 스트림사이즈, 변수 범위 지정
  public DoubleStream doubles(long streamSize, double randomNumberOrigin,
                            double randomNumberBound) {
    if (streamSize < 0L)
        throw new IllegalArgumentException(BadSize);
    if (!(randomNumberOrigin < randomNumberBound))
        throw new IllegalArgumentException(BadRange);
    return StreamSupport.doubleStream
            (new RandomDoublesSpliterator
                     (this, 0L, streamSize, randomNumberOrigin, randomNumberBound),
             false);
   }
   // 변수 범위 지정
   public DoubleStream doubles(double randomNumberOrigin, double randomNumberBound) {
    if (!(randomNumberOrigin < randomNumberBound))
        throw new IllegalArgumentException(BadRange);
    return StreamSupport.doubleStream
            (new RandomDoublesSpliterator
                     (this, 0L, Long.MAX_VALUE, randomNumberOrigin, randomNumberBound),
             false);
   }
}

public void testStream5() {
  // 특정 타입의 난수로  사이즈 3인 스트림  생성
  DoubleStream dStream1 = new Random().doubles(3);
  dStream1.forEach(System.out::println);
  /*
    0.38434323931443837
    0.06228834365606606
    0.7796684376090923
    0.4812742990023451
    0.0176082316364643
   */
  // 특정 타입의 난수로  사이즈 3이고 지정된 범위의 난수로 스트림  생성
  DoubleStream dStream2 = new Random().doubles(3, 0, 5);
  dStream2.forEach(System.out::println);
  /*
    4.302398241260798
    3.5919174282230233
    4.699447706075691
   */
}
```

6. 람다 표현식

```java  
public void testStream6() {
  // 무한대 순서대로 스트림이 생성
  Stream<Integer> stream = Stream.iterate(2, n -> n + 2).limit(5); // n -> n + 2 : 람다 표현식
  stream.forEach(System.out::println);  //  2 4 6 8 10 -> limit이 없으면 무한대

  // 무한대 순서없이 스트림이 생성
  Stream<Double> stream1 = Stream.generate(Math::random).limit(5); // Math::random : 람다 표현식
  stream1.forEach(System.out::println);
  /* limit이 없으면 무한대
   0.8500387237760662
   0.43955966963566606
   0.9991392315545777
   0.2321134847333718
   0.5490946597736491
   * */
}
```

7. 파일

파일을 라인단위로 읽어온다.  

```java
public void testStream7() throws IOException {

  String fileName = "C:/Users/masca/Desktop/readFile.txt";
  Stream<String> stream = Files.lines(Paths.get(fileName), Charset.forName("euc_kr")); //  java.nio.file.Files, java.nio.file.Paths ->  신규 패키지
  stream.forEach(System.out::println);
}
```

8. 빈 스트림

```java
public void testStream8() {
		// 아무 요소도 가지지 않는 빈 스트림은 Stream 클래스의 empty() 메소드를 사용하여 생성할 수 있다.
		Stream<Object> stream = Stream.empty();
		System.out.println(stream.count()); // 0 : 스트림의 요소의 총 개수를 출력함.
	}
```

### 스트림의 중개 연산

1. 스트림 필터링 : filter(), distinct()
2. 스트림 변환 : map(), flatMap()
3. 스트림 제한 : limit(), skip()
4. 스트림 정렬 : sorted()
5. 스트림 연산 결과 확인 : peek()

```java


```

### 스트림의 최종 연산

1. 요소의 출력 : forEach()
2. 요소의 소모 : reduce()
3. 요소의 검색 : findFirst(), findAny()
4. 요소의 검사 : anyMatch(), allMatch(), noneMatch()
5. 요소의 통계 : count(), min(), max()
6. 요소의 연산 : sum(), average()
7. 요소의 수집 : collect()



## Type inferece 개선
## Optional
## Joda Time 방식의 새 날짜 API 변경
