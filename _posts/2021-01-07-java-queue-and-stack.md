---
layout: post
date: 2021-01-07 20:15:00 +0900
title: '[java] 큐와 스택 Queue and Stack'
categories:
  - java
tags:
  - queue
  - stack
---

* Kramdown table of contents
{:toc .toc}

## 참고

[Java tutorial : Collections-Interfaces-The Queue Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/queue.html)


## 큐 인터페이스 Queue Interface

큐는 처리가 되기 전까지 요소를 붙잡고 있는 모음이다. 기본 컬렉션 작업 외에도 추가 삽입, 제거 및 검사 작업을 제공한다.

```
public interface Queue<E> extends Collection<E> {
    E element();
    boolean offer(E e);
    E peek();
    E poll();
    E remove();
}
```

큐메서드는 작업이 실패하면 `exception`던지거나 특별한 값(`null` 혹은 `false`)을 리턴하는 2가지 형태다.

| Type of Operation	| Throws exception | Returns special value|
|---                |---               |---                   |
| Insert	        | add(e)	       | offer(e)             |
| Remove	        | remove()	       | poll()               |
| Examine	        | element()	       | peek()               |

큐는 필수는 아니지만 일반적으로 들어온 순서(FIFO, First-in-first-out)대로 요소를 처리한다. 예외 중에는 값에 따라 요소를 정렬하는 우선순위 큐 (Priority Queue)도 있다. 어떤 순서를 사용하든 첫 요소(헤드)는 `remove` 혹은 `poll` 메서드에 의해 제거되는 대상이다. FIFO에 따라 모든 요소들을 큐의 마지막에 삽입된다. 다른 종류의 큐도 있긴 하지만 모든 큐 구현체는 순서 속성을 가져야 한다.  
큐 구현으로 보유하는 요소 수를 제한 할 수 있다. `java.util.concurrent`의 일부 큐 구현은 제한되어 있지만 `java.util`의 구현은 제한되지 않는다.

큐 구현은 일반적으로 `null`요소의 삽입을 허용하지 않지만 큐를 구현하기 위해 개조 된 `LinkedList` 구현에는 예외다. 역사적인 이유로 `null` 요소를 허용하지만 `null`은 `.poll()` 및 `.peek()` 메서드에 의해 특수 리턴 값으로 사용되므로 이를 활용하지 않는게 좋다.


### .add(), .offer()

`.add()` 메서드는 컬렉션인터페이스로부터 상속받은 메서드로 큐의 용량 제한을 위반하지 않는 한 요소를 삽입한다. 요소 삽입이 실패하면, `IllegalStateException`이 발생한다.  
`.offer()` 메서드는 제한된 큐에서만 사용하고 요소 삽입이 실패하면 `false`를 리턴한다는 점만 `.add()`와 다르다.

```
boolean add(E e);
boolean offer(E e);
```

```java
Queue<String> q = new LinkedList<>();
logger.debug("{}", q); //[]
q.add("일");
q.add("이");
q.offer("삼");
logger.debug("{}", q); // [일, 이, 삼]
```

### .remove(), ,poll()

두 메서드 모두 큐의 헤드를 제거하고 리턴한다. 정확히 어떤 요소가 제거되는지는 큐의 순서정책에 따른다. 큐가 비었을때 `.remove()` 메서드는 `NoSuchElementException`을 발생시키고 `.poll()`메서드는 `null`을 리턴한다는 점만 다르다.

```
E remove();
E poll();
```

```java
Queue<String> q = new LinkedList<>();
q.add("일");
q.add("이");		

String r1 = q.remove();
logger.debug("{}", r1); // 일 -> 제거된 맨 앞의 요소가 리턴
logger.debug("{}", q); // [이] -> 맨 앞의 요소인 '일'이 제거된 결과

String r2 = q.poll();
logger.debug("{}", r2); // 이-> 제거된 맨 앞의 요소가 리턴
logger.debug("{}", q); // []-> 맨 앞의 요소인 '이'가 제거된 결과

//q.remove(); // java.util.NoSuchElementException -> 요소 제거 실패 시 예외 발생
logger.debug("{}", q.poll()); // null -> 요소 제거 실패 시 null 리턴
```

### .element(), peek()

두 메서드 모두 큐의 헤드를 리턴한다. 큐가 비었을때 `.element()` 메서드는 `NoSuchElementException`을 발생시키고 `.peek()`메서드는 `null`을 리턴한다는 점만 다르다.

```
E element();
E peek();
```

```java
Queue<Integer> q = new LinkedList<>();
q.add(100);
q.add(200);

int r1 = q.element();
logger.debug("{}", r1); // 100 -> 맨 앞의 요소를 리턴
int r2 = q.peek();
logger.debug("{}", r2); // 100 -> 맨 앞의 요소를 리턴
```

## 스택 클래스 Stack Class

큐와는 달리 스택은 나중에 들어온 것 (LIFO, last-in-first-out)부터 처리된다. `Vector` 클래스를 확장한다.  
일반적인 `push` 및 `pop` 작업은 물론 스택의 맨 위 항목을 들여다 보는 방법, 스택이 비어 있는지 테스트하는 방법, 스택에서 항목을 검색하고 얼마나 멀리 있는지 확인하는 방법이 제공된다.


### .empty()

스택이 비어있는지 검사한다.  

`boolean empty()`

```java
Stack<Integer> s = new Stack<Integer>();
Assert.assertEquals(true, s.empty());
```

### .push()

스택의 맨 위에 항목을 넣는다.

`E push(E item)`

```java
Stack<Integer> s = new Stack<Integer>();
s.push(1);
s.push(2);
int r = s.push(3);
logger.debug("{}", r); // 스택에 들어가 항목을 반환해 준다.
logger.debug("{}", s); // [1, 2, 3]
```

### .peek()

스택의 맨 위의 객체를 찾아서 리턴한다. 스택이 비어 있는 경우 `EmptyStackException`이 발생한다.

`synchronized E peek()`

```java
Stack<Integer> s = new Stack<Integer>();
//int r1 = s.peek();
//logger.debug("{}", r1); // java.util.EmptyStackException

s.push(1);
s.push(2);
s.push(3);
int r2 = s.peek();
Assert.assertEquals(3, r2); // 마지막에 들어간 3이 가장 먼저 리턴 되었다. 스택에서 제거되는 것은 아니다.
```

### .pop()

스택의 맨 위의 객체를 제거하고 그 객체를 리턴한다. 스택이 비어 있는 경우 `EmptyStackException`이 발생한다.

`synchronized E pop()`

```java
Stack<Integer> s = new Stack<Integer>();
//int r1 = s.pop();
//logger.debug("{}", s);  // java.util.EmptyStackException

s.push(1);
s.push(2);
s.push(3);

int r2 = s.pop();
Assert.assertEquals(3, r2); // 마지막에 들어간 3이 제거되고 그 값이 리턴된다.
logger.debug("{}", s); // [1, 2]
```

### .search()

원하는 객체가 어디에 있는지 찾아서 그 위치를 리턴한다. 인덱스가 아닌 1부터 시작하는 위치로 리턴되고 찾는 객체가 없으면 -1을 리턴한다.

`synchronized int search(Object o)`

```java
Stack<String> s = new Stack<String>();
int r1 = s.search("이");
Assert.assertEquals(-1, r1); // 원하는 결과가 없으면 -1을 리턴한다.

s.push("일");
s.push("이");
s.push("삼");

int r2 = s.search("이");
Assert.assertEquals(2, r2); // 원하는 객체의 위치를 반환한다. 이때 위치는 인덱스가 아닌 1부터 시작하는 위치이다.
```

![stack-queue](/images/stack-queue.jpg)
