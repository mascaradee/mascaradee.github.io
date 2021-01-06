---
layout: post
date: 2021-01-02 19:56:00 +0900
title: '[java] 컬렉션 인터페이스 Collection Interface'
categories:
  - java
tags:
  - collection interface
  - for-each
  - iterator
---

* Kramdown table of contents
{:toc .toc}

## 참고
[Java tutorial : Collections-Interfaces-The Collection Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/collection.html)  

## 컬렉션 인터페이스

컬렉션 인터페이스는 정해지지 않은 컬렉션 타입을 온전히 인수로 전달하기 위한 용도이다.  
컬렉션을 탐색하는 방법에는 집계 연산 사용, `for-each` 구문과 `iterator`를 사용하는 3가지 방법이 있다.  

### 집계 작업 사용

자바 8 버전이후로 스트림으로 집계 작업을 하는 것이 선호되고 있다. 집계 작업은 람다 표현식을 사용해 코드를 더 간결하게 만든다.
컬렉션이 크고 컴퓨터 성능도 좋다면 스트림 대신 병렬스트림을 대신 요청할 수 있다.

```java
myShapesCollection.stream() // stream을 생성한다.
.filter(e -> e.getColor() == Color.RED) // 인수의 색깔이 빨간 색인 요소를 고른다. 내부에 이미 반복문이 있다.
.forEach(e -> System.out.println(e.getName())); // 빨간색인 요소의 이름을 출력한다.
```

컬렉션 프레임웍에는 `containsAll, addAll, removeAll` 등과 같은 수 많은 대량 작업에 관한 메서드가 있다. 하지만 이건 집계 작업이 아니다.  
새 집계 작업과 기존 대량 작업의 차이는 이전 버전이 모두 변경되어 기본 컬렉션을 모두 수정한다는 것인다. 반대로 새 집계 작업은 기본 컬렉션을 수정하지 않는다.    
새로운 집계 연산과 람다 표현식을 사용할 때는 나중에 코드가 병렬 스트림에서 실행되는 경우 향후 문제가 발생하지 않도록 변형을 방지하도록 주의 해야 한다.  


### for-each 구문

for-each 구문으로 컬렉션이나 배열을 더 간단하게 탐색할 수 있다.  

```java  
for (Object o : collection)
    System.out.println(o);
```

### Iterators

`iterator`는 객체로 컬렉션을 탐색하거나 컬렉션에서 선택적으로 요소를 제거할 수 있다. `iterator`는 `iterator` 메서드를 이용해서 얻을 수 있다.

```java
public interface Iterator<E> {
    boolean hasNext(); // 추가 요소가 있으면 true
    E next(); // 다음 요소 리턴
    void remove(); //optional - 기본 컬렉션에서 next()에 의해 리턴된 마지막 요소를 제거, 꼭 next() 호출당 한 번만 호출된다.
}
```
`iterator` 대신  `for-each`를 사용할 수는 있지만 `for-each`에서는 `remove`를 사용할 수 없다. 또한 `iterator`만 여러 컬렉션을 병렬도 반복할수 있다.
아래는 `iterator`로 필터링을 하는 예시다.

```java
static void filter(Collection<?> c) {
    for (Iterator<?> it = c.iterator(); it.hasNext(); )
        if (!cond(it.next()))
            it.remove();
}
```

## 컬렉션의 대량 작업 Collection Interface Bulk Operations

대량 작업은 전체 컬렉션에서 수행을 할 수 있지만 대부분의 경우 효율성이 떨어진다.  

- `containsAll()` : 지정한 컬렉션의 모든 요소가 대상 컬렉션에 모두 포함되어 있으면 true 리턴한다.  
- `addAll()` : 지정한 컬렉션의 모든 요소를 대상 컬렉션에 모두 추가하고 추가가 되면 true 리턴한다.
- `removeAll()` : 대상 컬렉션에 지정한 컬렉션의 모든 요소들이 포함되어 있으면 제거한다. 공통 부분을 제거한다. 제거된 게 있으면 true 리턴한다.   
- `retainAll()` : `removeAll()`과 반대로 대상 컬렉션과 지정한 컬렉션이 공통 부분만 빼고 제거한다. 제거된 게 있으면 true 리턴한다.   
- `clear()` : 컬렉션의 모든 요소를 제거한다.  

```java  
c.removeAll(Collections.singleton(e)); //컬렉션 c에서 지정된 요소 e의 모든 인스턴스를 제거
c.removeAll(Collections.singleton(null)); // 컬렉션에서 모든 null 요소를 제거
```

## 컬렉션 인터페이스 배열 작업 Collection Interface Array Operations

`toArray` 메서드는 입력 시 배열을 예상하는 컬렉션과 이전 `API` 사이의 브리지로 제공된다. 배열 작업을 통해 컬렉션을 배열로 변환할 수 있다.  

```java
Object[] a = c.toArray(); // z컬렉션 c의 요소 개수만큼 배열의 크기가 지정된다.
String[] a = c.toArray(new String[0]); // 컬렉션 c의 요소 개수만큼 문자열 배열의 크기가 지정된다.
```
