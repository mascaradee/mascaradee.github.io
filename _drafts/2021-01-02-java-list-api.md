---
layout: post
date: 2015-06-18 19:05:00 +0900
title: '[] '
categories:
  -
tags:
  -
---

* Kramdown table of contents
{:toc .toc}

## 넘나 어려워서 TODO 

## 참고

[Java tutorial : Collections-Interfaces-The List Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/list.html)  

## 리스트 인터페이스

리스트는 순서가 있는 컬렉션이고 중복을 허용하는데 자세히 말하자면 동일한 객체의 주소값을 저장하는 것이다. NULL도 저장할 수 있다. 컬렉션 인터페이스를 상속하여 여러 기능이 있다.  

- 위치 접근 - 인덱스로 조작 할 수 있다.  `get(), set(), add(), addAll(), remove()`
- 검색 - 지정된 객체를 검색하면 인덱스를 반환한다. `indexOf(), lastIndexOf()`
- 반복 - 목록의 순차 특성을 활용하기 위해서 `Iterator`를 확장한다. `listIterator()`
- 범위 뷰 - `sublist()` 로 임의 범위 조작을 할수 있다.

리스트에는 2개의 구현체가 있는데  `ArrayList`는 보통 더 나은 구현체이고 `LinkedList`는 특정한 상황에서 더 나은 성능을 제공한다.

### 컬렉션 작업 Collection Operations

`remove()` : 리스트 상에서 제거할 대상이 발견되는 것 중 첫 요소를 제거한다.   
`add(), addAll()` : 리스트의 마지막에 새로운 요소를 덧붙인다. 자바 8에서는 `stream()`을 이용해서 같은 기능을 구현할 수 있다.  
`equals()` : 두 개의 List 객체가 동일한 순서로 동일한 요소를 포함하는 경우 동일하다.

### 위치 접근과 검색 작업 Positional Access and Search Operations

`get, set, add, remove`: 위치 접근, set, remove는 덮어 쓰거나 제거중인 이전 값을 반환한다.  
`indexOf, lastIndexOf`: 리스트 상에서 지정된 요소의 첫번째 인덱스 혹은 마지막 인덱스를 반환한다.  
`addAll` : 정해진 위치에서 모든 요소를 추가한다. 이터레이터에서 반환된 순서대로 추가 된다.
`swap` : 요소의 순서를 맞바꾼다.  

### Iterators
### Range-View Operation
### List Algorithms



## 참고

[Java tutorial : Collections-Implementations-List Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)  

## 리스트 구현체 List Implementations

`ArrayList`와 `LinkedList`는 범용 목적의 리스트 구현체이다.  
대부부은 `ArrayList`를 사용하는데 일정 시간 위치 접근을 제공하면서 매우 빠르다. 각 요소들에 노드 객체를 할당할 필요가 없고 동시에 여러 요소를 이동해야 할 때 `System.arraycopy`를 활용할 수 있다. `ArrayList`를 동기화 오버 헤드가없는 `Vector`로 생각해라.  
리스트 시작에 요소를 자주 추가하거나 리스트 내부 요소를 삭제하기 위해서 반복을 한다면, `LinkedList`를 사용해야한다. 하지만 `LinkedList`는 수행에 비용이 많이 들고 일반적으로 `ArrayList`가 더 빠르므로 잘 선택해야 한다.  
