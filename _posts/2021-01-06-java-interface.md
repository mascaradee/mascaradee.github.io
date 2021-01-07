---
layout: post
date: 2021-01-02 09:00:00 +0900
title: '[java] 인터페이스 Interface'
categories:
  - java
tags:
  - interface
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Java tutorial : Interfaces and Inheritance-Interfaces](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html)  
[Java tutorial : Collections-Interfaces](https://docs.oracle.com/javase/tutorial/collections/interfaces/index.html)

## 인터페이스 Interface

인터페이스는 어떤 기준이 되는 기능을 보여주는 규격 혹은 가이드와 같다. 마치 자동차 제조업체가 자동차의 기능을 명세해 놓은 문서를 각 자동차 브랜드 회사에 배포하는 것과 같다. 자동차 회사에서는 제조업체가 제공한 규격을 기준으로 각 회사별로 차별화 된 기능을 구현할 것인다.
자바의 인터페이스는 클래스와 비슷한 참조타입으로 상수, 메서드 서명, `default` 메서드, `static` 메서드, 중첩 타입만을 가질 수 있다. 메서드 바디는 `default` 메서드와 `static` 메서드만 가질 수 있다. 인터페이스는 인스턴스화할 수 없고 오직 클래스에 의해 구현되거나나 다른 인터페이스에 의해 확장만 될 뿐이다.  
메서드 서명이란 `{}`과 메서드 바디가 없이 `리턴타입 메서드명(인자);`로만 이루어진 부분을 의미한다. 클래스로 구현이 되었을 때 메서드 바디에 내용이 들어갈 수 있다.  


### 인터페이스 선언

`interface` 키워드를 사용하여 인터페이스를 선언한다. `public` 접근 지정자에 의해 어떤 클래스에서 사용될 수 있다. 만약 `public`이 아니라면 해당 인터페이스는 인터페이스와 동일한 패키지에 정의 된 클래스에만 액세스 할 수 있다. 인터페이스는 클래스 서브 클래스처럼 다른 인터페이스를 확장하거나 다른 클래스를 확장 할 수 있다.
인터페이스 바디에는 추상(`abstract`) 메서드, `default` 메서드, `static` 메서드를 가질 수 있다. 추상 메서드는 구현이 포함되어 있지 않아 `{}`이 없이 세미콜론으로 마치고 추상 클래스에서만 구현이 가능한다. `default`메서드와 `static`메서드는 해당 키워드로 정의가 되고 구현부가 있는 것이 추상 메서드와 다르다. 3개 메서드 종류 모두 암묵적으로 `public`이므로 `public` 키워드를 생략해도 된다.
인터페이스 안의 상수는 모두 암묵적으로 `public static final`이므로 역시 생략이 가능하다.

```
public interface 인터페이스명 extends 부모 인터페이스1, 부모 인터페이스2, 부모 인터페이스 3{
  상수;
  메서드 서명;
  ...
}
```

```java
public interface List<E> extends Collection<E> {

    int size(); // 메서드 서명

    default void replaceAll(UnaryOperator<E> operator) { // defualt 메서드, public이 생략
        Objects.requireNonNull(operator);
        final ListIterator<E> li = this.listIterator();
        while (li.hasNext()) {
            li.set(operator.apply(li.next()));
        }
    }
}
```

### 인터페이스 구현

`implements` 키워드를 클래스를 선언할때 클래명 뒤에 붙여 인터페이스를 구현함을 표현한다. 1개 이상의 인터페이스를 구현할 수 있다. `extends`구문이 있다면 그 뒤에 `implements`구문을 넣는다. `implements`를 하는 클래스의 경우에는 인터페이스에서 선언된 모든 메서드를 구현해야 한다.

```
public class 클래스명 implements 인터페이스명 {
    @Override
    public 인터페이스에서 선언된 메서드명() {

    }
    ...
}
```

## default 메서드

이미 만들어져 있는 인터페이스에 새로운 메서드를 추가한다고 하면 인터페이스를 구현했던 모든 클래스에 영향을 미치게 된다. 이럴 땐 기존 인터페이스는 두고 기존인터페이스를 확장하여 새 인터페이스를 만드는 게 낫다. 아니면 `default`메서드나  `static` 메서드를 이용하는 방법도 있다.  두 메서드는 인터페이스 내에서 메서드 바디를 가질 수 있는 메서드다.  
그렇게 추가된 메서드를 위해 클래스를 수정하거나 다시 컴파일 할 필요가 없다.  
하지만 `static` 메서드의 경우 필수 메서드가 아닌 유틸리티성 메서드로 간주된다. 그래서 주요 핵심 메서드가 추가 되어야 할 때는 `default` 메서드를 이용하는 게 맞다.  


```
public interface 인터페이스명 {
    default 리턴타입 메서드명(매개변수) {
        //메서드 바디
    }
}
```

### default 메서드 포함한 인터페이스의 확장

default 메서드는 확장된 다른 인터페이스로 자동으로 상속되고 그것을 재 선언하여 추상화할수 있으며, 오버라이드를 하여 재정의를 할 수도 있다.  

```java
public interface Draw {
	void drawLine();
	void drawCircle();
	default String getColor(String color) {
		return color;
	}
}
```

```java
public interface DrawOilPaint extends Draw{
	void color(); // 상속받은 default메서드는 추상화 가능
}
```

```java
public interface DrawWarterPaint extends Draw{
    default String color(String color) {
		String red = "빨강";
		return red; //  상속받은 default 메서드는 재정의도 가능한다.
	}
}
```

## static 메서드

`static` 키워드를 시작으로 하는 메서드를 말하고 구현된 클래스의 모든 인스턴스는 `static` 메서드를 공유한다. 유틸성 메서드를 `static`으로 선언하는 게 좋다.


### 기존 라이브러리에 default 메서드 통합

`default` 메서드는 람다 표현식을 매개변수로 사용할 수 있고, 기존 인터페이스에 새로운 기능을 쉽게 추가할 수 있다.
