---
layout: post
date: 2023-05-18 09:05:00 +0900
title: '[typescript] generic type'
categories:
  - typescript
tags:
  - generic
---

* Kramdown table of contents
{:toc .toc}

# 제네릭 타입

제네릭은 타입을 정하지 않고 호출 시점에 넘기는 어떠한 타입도 받아준다.  

```ts
type Member<M, A, P> = { // 제네릭타입을 3개 받겠다.
    name: string,
    baseInfo: M, // 어떤 타입이든 올 수 있다. 
    accountInfo: A 
    pointInfo: P     
}

const mignon : Member<{},{},[]> = {
  name: 'mignon',
  baseInfo: {},
  accountInfo: {},
  pointInfo: []
}
```

원하는 타입을 지정해 재사용할 수 있다. 이 경우 타입스크립트가 타입 체크를 하므로 잘못된 타입이 들어오면 실행 전 에러를 발생시킨다.


```ts
type Member<M, A, P> = {
    name: string,
    baseInfo: M,
    accountInfo: A,
    pointInfo: P 
}

type BaseInfo = {
    id: number,
    grade: string
}
type AccountInfo = {
    accountNo: number,
    bank: string
}

type PointInfo = Array<number>

type MemberInfo = Member<BaseInfo, AccountInfo, PointInfo> 

const mignon : MemberInfo = {
    name: 'mignon',
    baseInfo: {
        id: 200001,
        grade: 'A'        
    },
    accountInfo: {
        accountNo: 1234567890,
        bank: '한국은행'
    },
    pointInfo:[1000, 100, 200]
}
```

`Member<BaseInfo,{},[]>`에서 타입을 지정해 준 `BaseInfo`만 타입스크립트로부터 보호를 받는다. `accountInfo`, `pointInfo`는 타입체크를 하지 않고 타입에 맞지 않는 잘못된 파라미터를 받아도 에러가 나지 않는다. 

```ts
type Member<M, A, P> = {
    name: string,
    baseInfo: M,
    accountInfo: A 
    pointInfo: P     
}

type BaseInfo = {
    id: number,
    grade: string
}

const mignon : Member<BaseInfo,{},[]> = {
  name: 'mignon',
  baseInfo: {
    id: '하나', // error: Type 'string' is not assignable to type 'number'.
    grade: 1 // error: Type 'number' is not assignable to type 'string'.
  },
  accountInfo: {
    accountNo: '한국은행', // 타입이 맞지 않는 잘못된 파라미터를 넘기더라도 에러 미발생
    bank: '한국은행'
  },
    pointInfo:[1000, 100, 200]
}
```

만약 name을 제외한 정보가 없다면 아래처럼 제넥릭을 `null`로 넘기면 해결된다. 

```ts
type Member<M, A, P> = {
    name: string,
    baseInfo: M, 
    accountInfo: A 
    pointInfo: P     
}

const whale: Member<null, null, null> = {
  name: 'whale',
  baseInfo: null,
  accountInfo: null,
  pointInfo: null
}
```

위는 call signature에 제네릭을 사용했지만 제네릭은 어디서든 사용할 수 있다. 

```ts
function printAllNumbers(a: number[]) {
    console.log(a)
    a.forEach(i => console.log(i))
}

printAllNumbers([1,2,3])
```

함수에 제네릭을 사용하면 아래와 같다.

```ts
function printAllNumbers(a: Array<number>) {
    console.log(a)
    a.forEach(i => console.log(i))
}

printAllNumbers([1,2,3])
```