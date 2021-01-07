---
layout: post
date: 2021-01-02 09:00:00 +0900
title: '[java] 접근제어자 access modifier'
categories:
  - java
tags:
  - static
  - final
  - public
  - private
  - proteced
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Java tutorial : <public, private, proteced.> Classes and Objects-More on Classes-Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)  
[Java tutorial : <static.> Classes and Objects-More on Classes-Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)  
[Final keyword](https://en.wikipedia.org/wiki/Final_(Java))  
[Java tutorial : <final.> Interfaces and Inheritance-Writing Final Classes and Methods](https://docs.oracle.com/javase/tutorial/java/IandI/final.html)

## 접근제어자 access modifier

3개의 접근 제어자가 있는데 적용 범위는 아래 표와 같다.  만약 접근 제어자가 없다면 기본적으로 패키지 내에서만 접근이 가능하다.  
같이 다른 소스에서 가져온 클래스를 사용할 때 접근 수준에 따라 자신의 클래스에서 사용할 수있는 해당 클래스의 멤버가 결정된다.  
또한 클래스를 작성할 때 모든 멤버 변수와 클래스의 모든 메서드가 가져야하는 접근 수준을 결정한다.  
제한적인 사용이 필요할 때는 `private`으로 선언하고 상수를 제외하고 모든 필드는 `public`을 피하는 것이 좋다.

### Access Levels

| Modifier    | Class | Package | Subclass | World |
|---          |---    |---      |--        |---    |
| public      | Y     | Y       | Y        | Y     |
| protected   | Y     | Y       | Y        | N     |
| no modifier | Y     | Y       | N        | N     |
| private     | Y     | N       | N        | N     |

## 스태택 static

공통으로 적용되는 필드, 메서드에 `static` 키워드를 추가하여 생성한다.  

### 클래스 변수, static 변수

필드에 스태틱이 적용되면 스태틱 필드 혹은 클래스 변수라고 하고 해당 클래스로 생성된 모든 인스턴스가 메모리의 고정된 위치에 있는 그 변수를 공유하게 된다.
일반적으로 변수는 인스턴스를 생성한 후 해당 인스턴스로부터 호출이 가능하지만, 클래스 변수는 클래스의 인스턴스를 만들지 않고도 호출 할 수 있다.

`클래스명.변수명`

```java
public class Bicycle {
    private int id;
    private static int numberOfBicycles = 0;

    public Bicycle(int startCadence, int startSpeed, int startGear){
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;

        // increment number of Bicycles
        // and assign ID number
        id = ++numberOfBicycles;
    }
}
```

### 클래스 메서드, static 메서드

메서드 선언 할 때 `static` 키워드를 추가하면 스태틱 메서드가 되고 역시 인스턴스 생성 없이 호출이 가능하다. 스태틱 메서드의 용도는 스태틱 필드에 접근하는 것이다.

`클래스명.메서드명`

```java
public static int getNumberOfBicycles() {
    return numberOfBicycles; // 클래스 변수 리턴
}
```

### 상수

상수를 정의할 때 `static`키워드와 함께 수정 불가능을 의미하는 `final`키워드를 사용한다. 이렇게 상수를 정의하면 재할당은 불가능하다.  
상수명은 대문자로 표기해야 하고 단어가 2개 이상으로 구성되면 언더바로 연결한다.

```java
static final double PI = 3.141592653589793;
```

### 스태틱 초기화 블록 Static Initialization Blocks

스태틱 변수를 초기화를 하려는데 초기화에 로직이 포함되어 한 줄로 끝나지 않을 때 스태틱 초기화 블록을 사용해 그 내부에서 초기화를 시킨다. 그럼 런타임 시에 해당 블록을 먼저 확인하여 스태틱 변수를 초기화 된다.

```
static {
    // 초기화 로직
}
```

```java
class Imstatic {
	public static final String text;
	static {
		String aa = Thread.currentThread().toString();
		System.out.println(aa);
		// aa를 가공
		text = aa;
	}
}

Imstatic.text; // Thread[main,5,main]
```

### 인스턴스 멤버 초기화

인스턴스 변수를 초기화 하기 위해서 보통 생성자를 사용하지만, 그 대신 초기화 블록과 `final` 메서드를 사용할 수 있다.

#### 초기화 블록

초기화 블록은 스태틱 초기화 블록과 같고 단지 `static` 키워드만 없다. 자바 컴파일러는 초기화 블록을 모든 생성자에 복사해 준다. 따라서 이 방법으로 여러 생성자간에 코드 블록을 공유할 수 있다.  

```
{
    // 초기화 로직
}
```

```java
class Imstatic {

	public final String str;
	{
		str = "a" + Integer.valueOf(10).toString();
	}
}
```

#### final

`final` 키워드를 붙이면 하위클래스에서 재정의 할 수 없다. 변경해서는 안되는 곳에 이 키워드를 붙여 최종으로 만든다.
변수, 메서드, 클래스에 모두 적용할 수 있다.
