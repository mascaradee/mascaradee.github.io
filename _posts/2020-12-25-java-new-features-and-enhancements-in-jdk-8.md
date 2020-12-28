---
layout: post
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

- 매개변수의 타입을 추론할 수 있는 경우, 타입 생략 가능
- 매개변수가 하나인 경우에는 괄호 `()` 생략 가능
- 함수의 몸체가 하나의 표현식(`expression`)으로만 이루어진 경우에는 중괄호 `{}` 생략 가능하고 자바 런타임이 표현식을 평가하고 그 결과값을 반환한다.
- 함수의 몸체가 하나의 return문(`statement block`)으로만 이루어진 경우에는 중괄호 `{}` 생략 불가능
- void 메서드는 `{}`가 필요없다.

```
(parameters) -> expression
또는
(parameters) -> { statements; }
```

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

| Kind                                                                        | Example                                |
| ---                                                                         | ---                                    |
| Reference to a static method                                                | `ContainingClass::staticMethodName`    |
| Reference to an instance method of a particular object                      | `containingObject::instanceMethodName` |
| Reference to an instance method of an arbitrary object of a particular type | `ContainingType::methodName `          |
| Reference to a constructor                                                  | `ClassName::new`                       |

### static 메서드 참조

```java
List<String> list = Arrays.asList(new String[] { "하나", "둘", "셋" });
Stream<String> stream = list.stream();

// 람다 표현식
stream.forEach((ele) -> {
	System.out.println(ele);
}); // 요건 아래와 같고

// 메서드 참조
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

TODO

### 생성자 참조

단순히 객체를 생성하고 반환하는 람다 표현식은 생성자 참조로 변환할 수 있다.  

```java
// 람다 표현식
(a) -> { return new Object(a); }

// 생성자 참조
Object::new
```

#### ※ 메서드 참조를 사용할 수 없는 경우

메서드 참조는, 람다 표현식의 바디에서 단 하나의 호출 표현식만 작성할 경우에만 적용할 수 있다. 아래의 경우 메서드 참조로 작성할 수 없다. `logger.info(str);`을 메서드 참조로 추가 할 수 있는 방법이 없다.  

```java
InnerClass.doSomething((str) -> {
  logger.debug(str);
  logger.info(str);
});
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

### 스트림의 처리 과정?

스트림 생성 -> 스트림 중개 연산 -> 스트림 최종 연산

### 1) 스트림의 생성

다양한 데이터 소스에서 스트림을 생성할 수 있다.  

1. 컬렉션   
2. 배열  
3. 가변 매개변수
4. 지정된 범위의 연속된 정수
5. 특정 타입의 난수들
6. 람다 표현식
7. 파일
8. 빈 스트림

#### 컬렉션

컬렉션(`Set, List, Map, SortedSet, SortedMap, HashSet, TreeSet, ArrayList, LinkedList, Vector, Collections, Arrays, AbstractCollection`)을 스트림으로 생성한다.   

리스트는 컬렉션인터페이스를 상속하여 컬렉션의  `stream()`, `parallelStream()`을 사용할 수 있다.   
`stream()`은 데이터를 순차적으로 스트림으로 생성하여 반환한다.  
`parallelStream()`은 내부의 `thread` 가 데이터의 개수만큼 생성되어 병렬적으로 동시에 결과를 반환하는데 실행할 때마다 그 결과의 순서는 `thread`의 속도에 따라 바뀌게 된다.

```java
public void testStream1() {
		List<String> list = new ArrayList<>();
		list.add("일");
		list.add("이");
		list.add("삼");
		list.add("사");

		Stream<String> stream = list.stream(); // Collection.stream()를 호출해 스트림 생성
		stream.forEach(logger::debug); // 일 이 삼 사

		// 같은 stream을 재 사용할 경우  에러가 발생한다. stream은 일회용이다.
		stream.forEach(logger::debug); // 에러 메시지: java.lang.IllegalStateException: stream has already been operated upon or closed

		// 하지만 원본 데이터 list는 변경이 되지 않으므로 재사용할 수 있다.
		Stream<String> stream2 = list.parallelStream(); // Collection.parallelStream()를 호출해 스트림 생성
		stream2.forEach(logger::debug);	// 삼 사 이 일
	}
```

#### 배열

`Arrays`에는 다양한 형태의 `stream()`가 있다. 컬렉션 타입뿐만 아니라 기본 타입 숫자형 을 위한 별도 스트림이 존재하는데 `IntStream, LongStream, DoubleStream` 인터페이스로 각각 제공한다.  

```
<T> Stream<T> stream(T[] 배열)
<T> Stream<T> stream(T[] 배열, int 시작인덱스(포함), int 종료인덱스(미포함))

IntStream stream(int[] 배열)
IntStream stream(int[] 배열, int 시작인덱스(포함), int 종료인덱스(미포함))

LongStream stream(long[] 배열)
LongStream stream(long[] 배열, int 시작인덱스(포함), int 종료인덱스(미포함))

DoubleStream stream(double[] 배열)
DoubleStream stream(double[] 배열, int 시작인덱스(포함), int 종료인덱스(미포함))

```
```java
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

#### 가변 매개변수

가변 매개변수를 `Stream.of()`를 이용해 스트림으로 반환한다
매개변수의 타입에 관계없이 그 데이터로 스트림을 생성한다.  

```
<T> Stream<T> of(T t)
<T> Stream<T> of(T... values)
```
```java
public void testStream3() {
  Stream<Integer> stream1 = Stream.of(100, 80, 90, 70);
  stream1.forEach(System.out::println);

  Stream<String> stream2 = Stream.of("일", "이", "삼");
  stream2.forEach(System.out::println);

  String[] arr1 = new String[]{"사과", "바나나", "오렌지", "포도"};
  Stream<String> stream3 = Stream.of(arr1);
  stream3.forEach(System.out::println);
}
```

#### 지정된 범위의 연속된 정수

`int, long` 타입의 연속된 정수를 지정된 범위 내에서 스트림을 생성한다.  

```
IntStream range(int 시작인덱스(포함), int 종료인덱스(미포함))
IntStream rangeClosed(int 시작인덱스(포함), int  종료인덱스(포함))

LongStream range(long 시작인덱스(포함), final long 종료인덱스(미포함))
LongStream rangeClosed(long 시작인덱스(포함), final long 종료인덱스(포함))
```
```java
public void testStream4() {
  LongStream lStream1 = LongStream.range(0, 5);
  lStream1.forEach(System.out::println); // 0 1 2 3 4

  LongStream lStream2 = LongStream.rangeClosed(0, 5);
  lStream2.forEach(System.out::println); // 0 1 2 3 4 5
}
```

#### 특정 타입의 난수들

`int, long, double` 타입의 난수로 스트림 생성한다.

```
Random().ints()
Random().ints(스트림사이즈)
Random().ints(시작난수, 종료난수)
Random().ints(스트림사이즈, 시작난수, 종료난수)

Random().longs()
Random().longs(스트림사이즈)
Random().longs(시작난수, 종료난수)
Random().longs(스트림사이즈, 시작난수, 종료난수)

Random().doubles()
Random().doubles(스트림사이즈)
Random().doubles(시작난수, 종료난수)
Random().doubles(스트림사이즈, 시작난수, 종료난수)
```

```java
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

#### 람다 표현식

람다 표현식을 이용해 무한대 스트림을 생성한다.

```
<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f)
<T> Stream<T> generate(Supplier<T> s)
```

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

#### 파일

파일을 라인단위로 읽어온다.  

```java
public void testStream7() throws IOException {

  String fileName = "C:/Users/masca/Desktop/readFile.txt";
  Stream<String> stream = Files.lines(Paths.get(fileName), Charset.forName("euc_kr")); //  java.nio.file.Files, java.nio.file.Paths ->  신규 패키지
  stream.forEach(System.out::println);
}
```

#### 빈 스트림

```java
public void testStream8() {
	// 아무 요소도 가지지 않는 빈 스트림은 Stream 클래스의 empty() 메서드를 사용하여 생성할 수 있다.
	Stream<Object> stream = Stream.empty();
	System.out.println(stream.count()); // 0 : 스트림의 요소의 총 개수를 출력함.
}
```

### 2) 스트림의 중개 연산

`Stream, IntStream, LongStream, DoubleStream`에 각각 아래 메서드가 존재한다.  

- 스트림 필터링 : filter(), distinct()
- 스트림 변환 : map(), flatMap()
- 스트림 제한 : limit(), skip()
- 스트림 정렬 : sorted()
- 스트림 연산 결과 확인 : peek()


#### filter()

조건에 맞는 요소만으로 재구성한 스트림을 반환한다. 조건에는 람다 표현식을 사용할 수 있다.  

`IntStream filter(IntPredicate predicate);`

```java
public void testStream9() {
  IntStream iStream = IntStream.of(6, 7, 8, 9, 10);
  iStream.filter(n -> n % 2 == 0).forEach(System.out::println); // 6 8 10  짝수만 골라라 		

  LongStream lStream = LongStream.of(13, 14, 18, 16, 17, 110);
  lStream.filter(n -> n % 2 != 0).forEach(System.out::println); // 13 17  홀수만 골라라 		

  DoubleStream dStream = DoubleStream.of( 5.6, 3.4, 1.2, 4.5);
  dStream.filter(n -> n < 4).forEach(System.out::println); // 3.4 1.2 4이하만 골라라
}
```

#### distinct()

중복요소가 있으면 제거한 스트림을 반환한다. 내부적으로 `Object`클래스의 `equals()`를 사용하여 요소의 중복을 비교한다.  

`distinct()`

```java
public void testStream10() {
  IntStream stream = IntStream.of(1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5);
  stream.distinct().forEach(e-> logger.debug("distinct: {}", e)); // 1 2 3 4 5
}
```

#### map()

스트림 요소를 주어진 함수의 조건에 맞춰 스트림을 재구성해서 반환한다.  
`filter()`와 `map()`은 둘다 주어진 함수의 조건에 맞춰 스트림을 재구성하지만  
`filter()`는 주어진 조건에 맞지 않는 요소는 버리고 스트림을 구성한다. 조건의 결과가 `true/false`가 되어야 한다.  
`map()`은 버리는 요소 없이 모든 요소에 조건을 적용하여 요소의 값이 변형이 있을 지 모르지만 모두 반환한다.   

```
IntStream map(IntUnaryOperator mapper);
LongStream map(LongUnaryOperator mapper);
DoubleStream map(DoubleUnaryOperator mapper);
<R> Stream<R> map(Function<? super T, ? extends R> mapper);
```

```java
public void testStream11() {
  Stream<String> stream = Stream.of("Hi", "hello", "happy","harmony");
  stream.map(e -> e.length()).forEach(e -> logger.debug("map: {}", e));

  IntStream iStream = IntStream.of(6, 7, 8, 9, 10);
  iStream.map(n -> n % 2).forEach(e -> logger.debug("compare to map and filter: {}", e)); // 0 1 0 1 0
}
```

#### flatMap()

해당 스트림의 요소가 배열일 경우, 배열의 각 요소를 주어진 함수에 인수로 전달하여, 그 반환값으로 이루어진 새로운 스트림을 반환한다.

```
IntStream flatMap(IntFunction<? extends IntStream> mapper);
LongStream flatMap(LongFunction<? extends LongStream> mapper);
DoubleStream flatMap(DoubleFunction<? extends DoubleStream> mapper);
<R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper);
```

```java
public void testStream12() {
  String[] arr = {"I missed you", "You need me", "We will be happy"};	 
  Stream<String> stream = Stream.of(arr); // Arrays.stream(arr);		
  stream.flatMap(s -> Stream.of(s.split(" +"))).forEach(e -> logger.debug("flatMap: {}", String.valueOf(e))); // 공백이 하나 이상 있으면 split해서 스트림을 만들어라.
}
```

#### limit(), skip()

```
IntStream limit(long maxSize);
LongStream limit(long maxSize);
DoubleStream limit(long maxSize);
Stream<T> limit(long maxSize);

IntStream skip(long n);
LongStream skip(long n);
DoubleStream skip(long n);
Stream<T> skip(long n);
```

```java
public void testStream13() {
  IntStream stream1 = IntStream.range(0, 10);
  IntStream stream2 = IntStream.range(0, 10);
  IntStream stream3 = IntStream.range(0, 10);

  stream2.limit(3).forEach(n -> logger.debug("limit: {}", n)); // 0 1 2
  stream1.skip(5).forEach(n -> logger.debug("skip: {}", n)); // 5 6 7 8 9
  stream3.skip(2).limit(3).forEach(n -> logger.debug("skip & limit: {}", n)); // 2 3 4
}
```

#### sorted()

비교자(comparator)가 없으면 사전 순으로 정렬을 한다.  

```
IntStream sorted();
LongStream sorted();
DoubleStream sorted();
Stream<T> sorted();
Stream<T> sorted(Comparator<? super T> comparator);
```

```java
public void testStream14() {
  // sorted()
  IntStream stream1 = IntStream.of(5, 2, 39, 3, 1);
  Stream<String> stream2 = Stream.of("dog", "cat", "hippo", "chicken");

  stream1.sorted().forEach(e -> logger.debug("sorted: {}", e)); // 1 2 3 5
  stream2.sorted(Comparator.reverseOrder()).forEach(e -> logger.debug("sorted: {}", e)); // hippo  dog  chicken  cat
}

```
#### peek()

작업 처리를 중간에 확인해 볼때 사용한다.

```
IntStream peek(IntConsumer action);
```
```java
IntStream.of(1, 2, 3, 4)
        .filter(e -> e > 2)
        .peek(e -> System.out.println("Filtered value: " + e))
        .map(e -> e * e)
        .peek(e -> System.out.println("Mapped value: " + e))
        .sum();
/*
Filtered value: 3
Mapped value: 9
Filtered value: 4
Mapped value: 16
*/
```

### 스트림의 최종 연산

- 요소의 출력 : forEach()
- 요소의 소모 : reduce()
- 요소의 검색 : findFirst(), findAny()
- 요소의 검사 : anyMatch(), allMatch(), noneMatch()
- 요소의 통계 : count(), min(), max()
- 요소의 연산 : sum(), average()
- 요소의 수집 : collect()

#### forEach()

스크림의 각 요소를 소모하여 명시된 동작을 수행한다. 반환 타입이 void이므로 보통 스트림의 모든 요소를 출력하는 용도로 사용한다.  

```java
public void testStream16() {
	  IntStream.of(1, 2, 3, 4).forEach(e -> logger.debug("{}", e));
}
```
#### reduce()

첫 번째와 두 번째 요소를 가지고 연산을 하고, 그 결과와 세번째 요소를 가지고 다시 연산을 수행하여 모든 요소들을 소모한다.  
초기값이 주어진 경우, 초기값과 스트림의 첫 번째 요소와 연산, 그 결과와 두 번째 연산을 수행, 반복하여 모든 요소들을 소모한다. 하지만 초기값이 주어진 경우, 모든 연산이 끝나고 난 후 결과값은 String이다 연산의 결과가 없더라도 초기값은 반환을 해야 하기 때문이다. 초기값이 없는 경우는 Optional<T>로 결과값이 반환되는 것을 확인할 수 있다.

```java
public void testStream17() {
  Stream<String> stream1 = Stream.of("I", "love", "you");
  Stream<String> stream2 = Stream.of("I", "hate", "you");

  Optional<String> result1 = stream1.reduce((s1, s2) -> s1 + " " + s2);
  result1.ifPresent(logger::debug); // ifPresent(함수) : 값이 있다면 함수 실행
  String result2 = stream2.reduce("also", (s1, s2) -> s1 + " " + s2);
  logger.debug(result2);
}
```
#### findFirst(), findAny()

`findFirst()`는 스트림의 첫 번째 요소를 참조하는 Optional 객체를 반환한다.   
`findAny()`는 스트림 요소 중 하나를 참조하는 Optional 객체를 반환한다.   
하지만 병렬 스트림이 아닌 경우에는 둘 다 첫 번째 요소를 참조하므로 변별력은 없다.  확실히 하려면 병렬 스트림에서 첫 번째 요소를 얻고 싶다면 `findFirst()`를 써야 한다.  

```java
public void testStream18( ) {
  IntStream stream1 = IntStream.of(5, 4, 3, 2, 1);
  IntStream stream2 = IntStream.of(5, 4, 3, 2, 1);

  stream1.findFirst().ifPresent(e -> logger.debug("findFirst: {}", e)); // 5
  stream2.findAny().ifPresent(e -> logger.debug("findAny: {}", e)); // 5


  List<String> list = new ArrayList<>();
  list.add("일");
  list.add("이");
  list.add("삼");
  list.add("사");

  Stream<String> stream3 = list.parallelStream();
  Stream<String> stream4 = list.parallelStream();

  stream3.findFirst().ifPresent(e -> logger.debug("findFirst: {}", e)); // 일
  stream4.findAny().ifPresent(e -> logger.debug("findAny: {}", e));	// 삼
}

```

#### anyMatch(), allMatch(), noneMatch()

`anyMatch()` : 해당 스트림의 일부 요소가 특정 조건을 만족할 경우에 `true`를 반환한다.  
`allMatch()` : 해당 스트림의 모든 요소가 특정 조건을 만족할 경우에 `true`를 반환한다.  
`noneMatch()` : 해당 스트림의 모든 요소가 특정 조건을 만족하지 않을 경우에 `true`를 반환한다.  

```java
public void testStream19() {
  Stream<String> stream1 = Stream.of("A","B","A","C");
  Stream<String> stream2 = Stream.of("A","A","A","B");
  Stream<String> stream3 = Stream.of("D","E","F","A");

  logger.debug("{}", stream1.anyMatch(e -> e == "A") ); // true
  logger.debug("{}", stream2.allMatch(e -> e == "A") ); // false
  logger.debug("{}", stream3.noneMatch(e -> e == "A") ); // false
}
```

#### count(), max(), min()

`count()`: 해당 스트림의 요소의 총 개수를 long 타입의 값으로 반환한다.   
`max()`, `min()`: 해당 스트림의 요소 중에서 가장 큰 값과 가장 작은 값을 가지는 요소를 참조하는 Optional 객체를 얻을 수 있다.  

```java
public void testStream20() {
  Stream<String> stream1 = Stream.of("a","b","c","d");
  IntStream stream2 = IntStream.of(1, 2, 3, 4);
  IntStream stream3 = IntStream.of(1, 2, 3, 4);

  logger.debug("{}", stream1.count()); // 4
  logger.debug("{}", stream2.max()); // OptionalInt[4]
  logger.debug("{}", stream3.min().getAsInt()); // 1 , getAsInt() : OptionalInt에 값이 존재하면 그 값을 반환
}
```

#### sum(), average()

`sum()` : 모든 요소의 합을 해당 스트림의 타입에 맞춰 기본 타입(`int, long, double`)으로 반환한다.  
`average()` : 모든 요소의 평균을 해당 스트림의 타입에 맞춰 기본 타입으로 래핑된 `Optional`객체로 반환한다.  

```java
public void testStream21() {
  IntStream stream1 = IntStream.of(1, 2, 3, 4);
  DoubleStream stream2 = DoubleStream.of(1.1, 2.1, 3.1, 4.1);

  logger.debug("{}", stream1.sum()); // 10
  logger.debug("{}", stream2.average().getAsDouble()); // OptionalDouble[2.6] /  2.6
}
```

#### collect()

`collect()` 메서드는 인수로 전달되는 `Collectors` 객체에 구현된 방법대로 스트림의 요소를 수집한다.  
스트림 요소의 수집 용도별 사용할 수 있는 `Collectors` 메서드는 다음과 같다.  

1. 스트림을 배열이나 컬렉션으로 변환 : `toArray(), toCollection(), toList(), toSet(), toMap()`  
2. 요소의 통계와 연산 메서드와 같은 동작을 수행 : `counting(), maxBy(), minBy(), summingInt(), averagingInt()` 등  
3. 요소의 소모와 같은 동작을 수행 : `reducing(), joining()`  
4. 요소의 그룹화와 분할 : `groupingBy(), partitioningBy()`  

```java
public void testStream22() {
  Stream<String> stream = Stream.of("일", "이", "삼", "사");
  List<String> list = stream.collect(Collectors.toList());
  Iterator<String> i = list.iterator();
  while (i.hasNext()) {
    logger.debug("{}", i.next()); // 일 이 삼 사		
  }
}
```

## Type inferece 개선

TODO

## Optional 클래스

`int`가 `Integer`라는 래퍼클래스를 가지고 있는 것처럼 `Optional<T>`는 `T`타입의 객체를 포장해 주는 래퍼 클래스이다.   

### Optional 객체의 생성

`of()` : `Optional` 객체를 생성할 수 있지만 `null`은 허용하지 않는다. (`NullPointerException`)  
`ofNullable()` : `Optional` 객체를 생성할 수 있고 `null`도 허용한다. 따라 `null`이 될 가능성이 있으면 이걸 이용해 객체를 생성하는게 좋다. 만약 `null`이 있는 경우, 비어있는 `Optional` 객체를 반환한다.

```java
public void testOptionalClass() {
  //Optional<String> op = Optional.of(null); // java.lang.NullPointerException

  Optional<String> op = Optional.ofNullable("안녕");
	logger.debug("{}", op.get());
}
```


### Optional 객체 접근

`get()` : Optional 객체의 저장된 값에 접근할 수 있다.   
`orElse()` : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 값을 반환한다.  
`orElseGet()` : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 람다 표현식의 결괏값을 반환한다.  
`orElseThrow()` : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 예외를 발생환한다.  

```java
public void testOptionalClass1() {

	Optional<String> op1 = Optional.ofNullable(null);
	//logger.debug("{}", op1.get()); // get() 사용 시  null이 있는 경우 java.util.NoSuchElementException: No value present

	if (op1.isPresent()) { // 위 에러를 피하기 위해서 value값을 먼저 체크한다.  
		logger.debug("{}", op1.get());
	} else {
		logger.debug("{}", "null이여");
	}

	List<String> list = new ArrayList<>();
	list.add("일");
	list.add("이");
	list.add(null);
	list.add("사");

	Optional<List<String>> op3 = Optional.ofNullable(list);
	logger.debug("{}", op3.get()); // [일, 이, null, 사]
}
```

```java
public void testOptionalClass2() {
  Optional<String> op4 = Optional.empty(); // Optional 객체 초기화
  logger.debug("{}",op4.orElse("null이 있어부러야"));
  logger.debug("{}", op4.orElseGet(() -> {
    String str = new String();
    str = "null이 또 이써야";
    return str;
  }));
}
```

#### 기본 타입의 Optional 클래스

`IntStream` 클래스와 같이 기본 타입 스트림을 위한 별도의 `Optional` 클래스를 제공하고 있다.  
반환 타입이 `Optional<T>` 타입이 아니라 해당 기본 타입이라는 사실만 제외하면 거의 모든 면에서 비슷하다.  

- `OptionalInt` 클래스
- `OptionalLong` 클래스
- `OptionalDouble` 클래스

```java
public void testOptionalClass3() {
  OptionalInt op = OptionalInt.of(10);
  logger.debug("{}", op); //  OptionalInt[10]
  logger.debug("{}", op.getAsInt()); // 10 -> OptionalInt의 값에 바로 접근
}
```


## Joda Time 방식의 새 날짜 API 변경

기존 `Calendar` 클래스 대신 쓰던 `Joda Time` 라이브러리를 `java.time` 패키지로 제공하게 되었다.  

1. `java.time.chrono` : `ISO-8601`에 정의된 표준 달력 이외의 달력 시스템을 사용할 때 필요한 클래스들
2. `java.time.format` : 날짜와 시간에 대한 데이터를 구문분석하고 형식화하는 데 사용되는 클래스들
3. `java.time.temporal` : 날짜와 시간에 대한 데이터를 연산하는 데 사용되는 보조 클래스들
4. `java.time.zone` : 타임 존(`time-zone`)과 관련된 클래스들

### LocalDate & LocalTime

`LocalDate` 클래스는 날짜를 `LocalTime` 클래스는 시간을 표현하는데 사용한다.

#### 날짜와 시간 객체의 생성

- `now()` : 현재 날짜와 시간을 이용해 새로운 객체를 생성
- `of()` : 전달된 인수로 특정 날짜와 시간을 가지는 새로운 객체를 생성

```java
public void testLocalDateTimeNow() {
  LocalDate ld1 = LocalDate.now();
  LocalDate ld2 = LocalDate.now(Clock.systemDefaultZone());
  LocalDate ld3 = LocalDate.now(ZoneId.systemDefault());
  logger.debug("{}", ld1); // 2020-12-28
  logger.debug("{}", ld2); // 2020-12-28
  logger.debug("{}", ld3); // 2020-12-28

  LocalTime lt = LocalTime.now();		
  logger.debug("{}", lt); // 15:14:56.932
}

public void testLocalDateTimeOf() {
  LocalDate ld1 = LocalDate.of(1982, 9, 1);
  LocalTime lt1 = LocalTime.of(12, 11, 22, 100000000);
  logger.debug("{} {}", ld1, lt1); // 1982-09-01 12:11:22.100
}
```

#### 날짜와 시간 객체 접근

- `get()` 메서드로 객체에 접근이 가능하다.   

```java
public void testLocalDateTimeInstance() {
  LocalDate ld = LocalDate.now();
  int year = ld.getYear();
  Month month = ld.getMonth();
  int month1 = ld.getMonthValue();
  int day = ld.getDayOfMonth();		
  logger.debug("{} {} {} {}", year, month, month1, day); // 2020 DECEMBER 12 28

  LocalTime lt = LocalTime.now();
  int hour = lt.getHour();
  int min = lt.getMinute();
  int sec = lt.getSecond();
  int nano = lt.getNano();
  logger.debug("{}:{}:{}.{}", hour, min, sec, nano); // 15:55:9.587000000
}
```

#### TemporalField 인터페이스

`TemporalField` 인터페이스는 월(`month-of-year`)과 시(`hour-of-day`)와 같이 날짜와 시간과 관련된 필드를 정의해 놓은 인터페이스이다.

| 열거체 상수 | 	설명 |
|---|---|
| ERA |	시대 |
| YEAR |	연도 |
| MONTH_OF_YEAR |	월 |
| DAY_OF_MONTH |	일 |
| DAY_OF_WEEK |	요일 (월요일:1, 화요일:2, ..., 일요일:7) |
| AMPM_OF_DAY |	오전/오후 |
| HOUR_OF_DAY |	시(0~23) |
| CLOCK_HOUR_OF_DAY |	시(1~24) |
| HOUR_OF_AMPM |	시(0~11) |
| CLOCK_HOUR_OF_AMPM |	시(1~12) |
| MINUTE_OF_HOUR |	분 |
| SECOND_OF_MINUTE |	초 |
| DAY_OF_YEAR |	해당 연도의 몇 번째 날 (1~365, 윤년이면 366) |
| EPOCH_DAY |	EPOCH(1970년 1월 1일)을 기준으로 몇 번째 날 |


```java
public void testLocalDateTimeTemporalField() {
  LocalDateTime ldt = LocalDateTime.now();
  int year = ldt.get(ChronoField.YEAR);
  int month = ldt.get(ChronoField.MONTH_OF_YEAR);
  int day = ldt.get(ChronoField.DAY_OF_MONTH);
  long epochDay = ldt.getLong(ChronoField.EPOCH_DAY);

  logger.debug("지금은 {}년 {}월 {}일이고 1970년 1월 1일로부터 {}째 날이다. ", year, month, day, epochDay);
}
```

#### 날짜와 시간 객체의 필드값 변경

- `with()` : 전달한 인수대로 변경   
- `plus(), minus()` : 전달한 인수로 계산을 해서 변경

```java
public void testLocalDateTimeChange() {
  LocalDateTime ldt = LocalDateTime.now();
  logger.debug("오늘은 {}", ldt); //  오늘은 2020-12-28T16:20:52.063
  LocalDateTime changedD = ldt.withYear(2030);
  changedD = changedD.withHour(20);
  logger.debug("바뀐 날짜는 {}", changedD); // 바뀐 날짜는 2030-12-28T20:20:52.063

  changedD = changedD.plusMinutes(20);
  logger.debug("바뀐 분은 {}", changedD); // 바뀐 분은 2030-12-28T20:40:52.063
  changedD = changedD.minusSeconds(10);
  logger.debug("바뀐 초는 {}", changedD); // 바뀐 초는 2030-12-28T20:40:42.063
}
```

#### 날짜와 시간 객체의 비교

- `compareTo()` : 날짜와 시간을 비교한다.  
- `isEqual()` : `equals()` 메서드와는 달리 오직 날짜만을 비교한다.   (`LocalDate` 클래스에서만 제공)  
- `isBefore()` : 두 개의 날짜와 시간 객체를 비교하여 현재 객체가 명시된 객체보다 앞선 시간인지를 비교한다.    
- `isAfter()` : 두 개의 날짜와 시간 객체를 비교하여 현재 객체가 명시된 객체보다 늦은 시간인지를 비교한다.   

```java
public void testLocalDateTimeCompare() {
  LocalDate ld = LocalDate.now();		
  LocalDate ld1 = LocalDate.of(1999, 1, 1);
  logger.debug("{}", ld.compareTo(ld1)); //  21 year 비교?
  logger.debug("{}", ld.isEqual(ld1)); // false
  logger.debug("{}", ld.isBefore(ld1)); // false
  logger.debug("{}", ld.isAfter(ld1)); // true
}
```
