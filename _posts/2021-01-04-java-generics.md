---
layout: post
date: 2021-01-04 20:45:00 +0900
title: '[java] 제네릭 Generics'
categories:
  - java
tags:
  - generics
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Java tutorial : Generics](https://docs.oracle.com/javase/tutorial/java/generics/index.html)  
[Java tutorial : extra-Generics](https://docs.oracle.com/javase/tutorial/extra/generics/index.html)  
[생활코딩 - 제네릭](https://opentutorials.org/course/1223/6237)

## 제네릭을 사용해야 하는 이유?

제네릭은 클래스, 인터페이스 및 메서드를 정의 할 때 데이터 타입을 매개 변수로 사용할 수 있게 한다. 자바 5 이상 사용 가능   

- 잡기 어려운 런타임 오류보다 좀 더 고치기 쉬운 컴파일 오류를 발생 시켜 더 빠른 수정을 하게 한다.
- 캐스트(타입 변환)가 필요없다.
```java
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0);
```

```java
List<String> list = new ArrayList<String>();
list.add("hello");
String s = list.get(0);   // 리스트 생성시 이미 제네릭으로 String을 선태해 만들었기 때문에 여기에 캐스트가 필요없다.
```
- 다양한 타입의 컬렉션을 사용할 수 있고 커스텀화를 시킬수도 있다.  


## 제네릭 타입

단순히 하나의 타입으로 정의를 하면 그 타입만 받을 수 밖에 없지만 제네릭으로 정의를 하면 원시 타입을 제외하고 어떤 타입이 오든 소화를 시킬 수 있다. 즉 클래스를 정의 할 때 데이터 타입을 확정하지 않고 인스턴스를 생성할 때 데이터 타입을 지정하는 기능이 제네릭이다.  

`class name<T1, T2, ..., Tn> { /* ... */ }`

```java
/**
 * Generic version of the Box class.
 * @param <T> the type of the value being boxed
 */
public class Box<T> {
    // T stands for "Type"
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```

### 타입 파라미터 명명 규칙

한 자리의 영어 대문자로 정해져 있다.  

```
E - Element (used extensively by the Java Collections Framework)
K - Key
N - Number
T - Type
V - Value
S,U,V etc. - 2nd, 3rd, 4th types
```

### 제네릭 타입 인스턴스 생성

자바 컴파일러는 `Box<Integer>`선언 시에 타입을 추론할 수 있으므로 자바 7부터 `new Box<>()`로 `<>`안의 타입을 생략할 수 있다.  

```java
Box<Integer> integerBox = new Box<Integer>();
Box<Integer> integerBox = new Box<>(); //
```

### 멀티 타입 파라미터

`OrderedPair<K, V>` 클래스의 2개 인자를 가지고 있는데 이 클래스의 인스턴스인 `p1`은 선언 할 때 `String, Integer` 타입으로 선언했고 `p2`는 `String, String`타입으로 선언된 것을 볼수 있다.  제네릭 타입은 원시 타입을 제외한 모든 타입을 허용한다.  

```java
ublic interface Pair<K, V> {
    public K getKey();
    public V getValue();
}

public class OrderedPair<K, V> implements Pair<K, V> {

    private K key;
    private V value;

    public OrderedPair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey()    { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> p1 = new OrderedPair<>("Even", 8);
Pair<String, String>  p2 = new OrderedPair<>("hello", "world");
```

### 매개변수화 타입

제네릭 타입에는 `Box<Integer>`와 같이 매개변수화된 타입도 넣을 수 있다.

```java
OrderedPair<String, Box<Integer>> p = new OrderedPair<>("primes", new Box<Integer>(...));
```

### 원시 타입 사용 금지

제네릭 타입에 원시 타입(`raw type`)을 사용하면 여러가지 오류가 런타임으로 넘어가게 된다. 그러므로 피하는것이 좋다.  

```java
public class Box<T> {
    // T stands for "Type"
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}

Box box = new Box(); // 제네릭이 아닌 클래스처럼 선언하고 인스턴스화 시킬수 있지만 Box는 raw 타입을 제네릭타입의 인수로 넘긴것이다.

Box<Integer> intBox = new Box<>(); // 제네릭 타입인자에  Integer타입을 인수로 넣어 인스턴스를 생성한다.
Box box1 = intBox; // raw type에 Box<Integer>클래스를 매개변수화하여 할당할수 있다.
//box1.set(1); // warning: unchecked invocation to set(T) 실제로 이 부분은 아예 컴파일 에러가 난다.. -> 바뀐듯

Box box2 = new Box();
Box<String> strBox = box2; // 위와 반대로  제네릭 타입에 raw 타입을 넣으면 warning이 뜬다
               // warning: The expression of type GenericsTest.Box needs
                           // unchecked conversion to conform to GenericsTest.Box<String>
```

## 제네릭 메서드

제네릭 메서드의 경우 타입 파라미터('<T>')가 메서드의 리턴타입 앞에 있어야 한다. 특히 정적(static)메서드라면 필수.  

`static <타입 파라미터> 리턴타입 메서드명(매개 변수1, 매개 변수2... )`

```java
class PrintGeneric {
    public static <K, V> String print(Box<String> fruit, Box<Integer> price) {
        return fruit.get() + "는 맛있어. 맛있으면 "  + price.get() + "원";
    }
}
```

### 제네릭 메서드 호출

```java
// 명시적
Box<String> fruit = new Box<String>();
fruit.set("사과");
Box<Integer> price = new Box<Integer>();
price.set(500);
PrintGeneric.<String, Integer>print(fruit, price); // 사과는 맛있어. 맛있으면 500원

// 암시적
Box<String> fruit = new Box<>();
fruit.set("사과");
Box<Integer> price = new Box<>();
price.set(500);
PrintGeneric.print(fruit, price);// 사과는 맛있어. 맛있으면 500원
```

### 타입 제한 Bounded Type Parameters

매개변수 타입이 원하는 타입만 들어올 수 있도록 제한하고 싶을때는 `extends`와 상위 타입을 사용한다. 아래 예시에서는 `Number`타입으로 제한을 두었기 때문에 `Integer` 타입만 허용이 되는 상태가 된다.  

`<타입 extends 상위경계>`  

#### 제네릭 클래스  

```java
class RestrictedGeneric<A extends Number> {
}
RestrictedGeneric<Integer> r1 = new RestrictedGeneric<>();
RestrictedGeneric<String> r2 = new RestrictedGeneric<>(); // 오류: Bound mismatch
```

#### 제네릭 메서드  

```java
class RestrictedGenericMethod {
    public static <K, V extends Number> String print(K fruit, V price) {
        return fruit.get() + "는 맛있어. 맛있으면 "  + price.get() + "원";
    }
}

String fruit = new String("사과");
String price = new String("500");
String result = RestrictedGenericMethod.print(fruit, price); // The method print(K, V) in the type RestrictedGenericMethod is not applicable for the arguments (String, String)
```

`Number`를 확장한 `A`타입은 `Number` 클래스의 메서드를 사용할 수 있다.  

```java
class RestrictedGeneric<A extends Number> {
    private A n;
    public boolean isEven() {
        return n.intValue() % 2 == 0; // Number.intValue()
    }
}
```

#### 멀티 타입 제한 Multiple Bounds

제한을 여러 개를 둘 수는 있지만 클래스는 가장 먼저 명시되어야 하다.

`<T extends B1 & B2 & B3>`

### 제네릭, 상속 그리고 하위 타입 Generics, Inheritance, and Subtypes

하위타입은 상위 타입에 할당할 수 있다. 제네릭도 마찬가지다. 아래 예시에서  `Integer`타입과 `Double`타입은 `Number`타입의 하위타입이므로 매개변수로 사용할 수 있다.  

```java
class Box<T> {
    public void add(Number n) {}
}

Box<Number> box = new Box<Number>();
box.add(new Integer(10));   // OK
box.add(new Double(10.1));  // OK
```

하지만 `Box<Number>`타입이 인수인 경우에 `Box<Integer>` 타입이 올수는 없다. 2개는 다른 타입이지 상하위 관계가 아니기 때문이다.

```java
class InheritanceTest {
    public void boxTest(Box<Number> n) {
    }
}

InheritanceTest ih = new InheritanceTest();
ih.boxTest(new Box<Number>());
ih.boxTest(new Box<Integer>()); // 오류: The method boxTest(Box<Number>) in the type InheritanceTest is not applicable for the arguments (Box<Integer>)
```    

#### 제네릭 클래스와 하위 타입 Generic Classes and Subtyping

제네릭 클래스도 하위 타입을 받아들일 수 있다.  

`ArrayList<String> < List<String> < Collection<String>`
