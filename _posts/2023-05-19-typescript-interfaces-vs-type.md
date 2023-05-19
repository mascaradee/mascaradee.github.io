---
layout: post
date: 2023-05-19 09:05:00 +0900
title: '[typescript] interfaces vs type'
categories:
  - typescript
tags:
  - interfaces
  - type
---

* Kramdown table of contents
{:toc .toc}

# 데이터 타입 지정하는 방법

## type을 사용하는 방법

### 별칭 사용

원시타입에 별칭을 부여해서 사용한다. 

```ts
type   = string

const nickName: Name = 1 // error: Type 'number' is not assignable to type 'string'.
```

### 특정한 값 사용

특정한 값을 지정해서 그 외 값이 들어오는 것을 방지 할 수 있다. 

```ts
type KeyColor = 'black' | 'white' | 'silver'

const color: KeyColor = 'red' // error : Type '"red"' is not assignable to type 'KeyColor'.
```

### 객체 사용

객체의 프로퍼티에 타입을 지정한다.

```ts
type Player = {
    nickName: string,
    age: number
}

const mignon: Player = {
    nickName: 1, // error: Type 'number' is not assignable to type 'string'.
    age: 12
}
```

### call signature

함수의 파라미터, 리턴값의 타입을 지정한다. 

```ts
type SuperPrint = {
  <T>(arr: T[]): void
}

const superPrint: SuperPrint = (arr) => {
  arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3])
```


## 인터페이스 사용

`type`과 동일한 형태로  `interface`로만 변경해주면 동일한 역할을 한다. 단, 인터페이스 객체의 모양만 설명한다.  

```ts
interface Player {
  nickname: string,
  age: number
}

const mignon: Player = {
  nickname: 'mignon',
  age: 12
}

interface NickName = string // error: 'string' only refers to a type, but is being used as a value here.
```

### 인터페이스 상속

인터페이스 상속은 클래스 상속과 마찬가지로 사용한다.   

```ts
interface User {
  name: string
}
interface Player extends User {}

const mignon: Player = {
  name: 'mignon'
}
```

인터페이스를 `type`으로 변경하면 아래와 같다.  

```ts
type User = { // 정의
  name: string
}
type Player = User & {} // 상속

const mignon: Player = {
  name: 'mignon'
}
```

### 인터페이스 합치기

타입스크립트는 같은 이름의 인터페이스의 프로퍼티를 자동으로 합쳐준다. 따라서 `name`뿐만 아니라, `lastNem, firstName`도 함께 써줘야 에러가 나지 않는다. 이건 인터페이스에서만 가능하다. 

```ts
interface User {
  name: string
}
interface User {
  lastName: string
}
interface User {
  firstName: string
}
const mignon: User = {
  name: 'mignonwhale',
  lastName: 'whale',
  firstName: 'mignon'
}
```

## 참고 

인터페이스, 타입, 추상클래스는 객체나 클래스의 모양을 설명하는 용도로 사용한다. 아래는 소스코드는 다르지만 모두 같은 용도임을 확인 할 수 있다. 

```ts
interface PlayerA {
  firstName: string
}
type PlayerB = {
  firstName: string
}
abstract class PlayerC {
  constructor(
    public firstName: string
  ) {}
}

const player : PlayerC = { // PlayerA, PlayerB, PlayerC 타입은 모두 동일한 결과를 낸다. 
  firstName: 'mignon'
}
```

# 결론

객체의 모양을 설명해 주기 위해서 `type`과 `interface` 둘다 사용이 가능하지만 각 특징을 잘 이용해야 한다.  `type`은 좀 더 유연하고 `interface`는 객체지향에 맞게 설계가 되어 있다. 
객체나 클래스를 정의할 때는 `interface`를 그 나머지 경우에는 `type`을 쓰도록 추천하고 있다. 