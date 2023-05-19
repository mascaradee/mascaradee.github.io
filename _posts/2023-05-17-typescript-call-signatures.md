---
layout: post
date: 2023-05-17 09:05:00 +0900
title: '[typescript] call signatures'
categories:
  - typescript
tags:
  - base
---

* Kramdown table of contents
{:toc .toc}

# 함수

## call signatures

함수가 어떻게 호출되는지 알려준다. 어떤 파라미터 타입으로 어떤 리턴타입이 되는지 설명해준다.

```ts
type Add = (a:number, b:number) => number; // call signature
const add:Add = (a, b) => a + b
```

## overloading

call signature를 아래와 같이 변경할수 있다. 오버로딩을 위한 형태이다. 

```ts
type Add = {
  (a:number, b:number) : number
}
```

이제 형태는 같지만 파라미터 타입이 하나 다른 것을 추가해 보자.

```ts
type Add = {
  (a:number, b:number) : number
  (a:number, b:string) : number
}

const add: Add = (a, b) => a + b // errror : b의 타입이 number 혹은 string이 들어올수 있으므로 추가 처리가 필요하다고 말해준다. 
```

아래와 같이 추가 확인을 해 줘야 한다. 

```ts
const add: Add = (a, b) => {
  if (typeof b === 'string') {
    return a
  } else {
    return a + b
  }
}
```

파라미터의 개수가 다른 call signature를 처리하는 방법을 보자

```ts
type Add = {
  (a:number, b:number) : number
  (a:number, b:number, c:number) : number
}

const add : Add = (a, b, c) => a + b + c // error: c가 인입되지 않는 경우도 가려줘야 한다. 
```

c는 선택적으로 인입이 되므로 이걸 타입스크립트에 명시해 줘야 한다. 

```ts
const add : Add = (a, b, c?:number) => {
  if (c) {
    return a + b + c
  } else {
    return a + b
  }
}

add(1, 2) // 정상
add(1, 2, 3) // 정상
```

실제 실전에서 많이 사용하는 예시

```ts
type Config = {
  path: string,
  state: {
    a: number
  }
}

type Push = {
  (path: string) : void
  (config: Config) : void
}

const push : Push = (config) => { // 파라미터명은 어떤 것이 들어와도 상관이 없다.
  if (typeof config === 'string') {
    console.log(config) // 첫번째 call signature로 string
  } else {
    console.log(config.path, config.state.a) // 두번째 call signature로 Config타입
  }
}
```

## 다형성과 제네릭 타입

다양한 타입으로 오버라이딩을 할 수 있지만 일일이 하나씩 call signature를 써 주는 것보다 한 번에 해결하는 방법으로 제네릭 타입을 사용할 수 있다.  

숫자 배열을 받는 함수이다.  

```ts
type SuperPrint = {
  (arr: number[]) : void
}

const superPrint : SuperPrint = (arr) => {
  arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3])
```

boolean타입이나 string타입으로도 파라미터를 받고 싶다면 아래와 같이 call signature를 추가하면 된다. 

```ts
type SuperPrint = {
  (arr: number[]) : void
  (arr: boolean[]) : void
  (arr: string[]) : void
}

const superPrint : SuperPrint = (arr) => {
  arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3])
superPrint([true, false, true])
superPrint(['a', 'b', 'c'])
```

타입별로 각각 call signature를 만들지 않고 제네릭타입을 써서 한 번에 표현해보자.
제네릭타입은 함수를 정의할때 타입을 지정하지 않아도 호출될때 넘기는 어떤 타입도 받을 수 있다.  
기존 signature 맨 앞에 `<TypePlaceHolder>`를 추가하여 타입스크립트에 제네릭타입을 쓰겠다고 알려준다.
아래 예시에서는 `T`를 썼지만 이 자리는 대문자로 시작하는 어떤걸 써도 무방하고 단지 이 자리에 호출될 때 타입이 대체된다고 생각하면 된다. 그리고 실제 타입 자리에도 역시 placdholder명을 넣어준다.

```ts
type SuperPrint = {
  <T>(arr: T[]) : void
}

const superPrint : SuperPrint = (arr) => {
  arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3]) // 내부에선 이렇게 인식한다. const superPrint: <number>(arr: number[]) => void
superPrint([true, false, true]) // const superPrint: <boolean>(arr: boolean[]) => void
superPrint(['a', 'b', 'c']) // const superPrint: <string>(arr: string[]) => void
superPrint(['a', 'b', 1, true]) // 어떤 타입이든 다 소화 가능, const superPrint: <string | number | boolean>(arr: (string | number | boolean)[]) => void
```

그럼 아무 타입이나 다 받아주는 거면, any타입을 쓰거나 자바스크립트를 쓰는 것과 다른게 무엇일까? 타입스크립트의 보호하에 있다는 점이 다르다. 어떤 파라미터가 들어와도 타입스크립트가 인식한 타입에 맞는 제한이 걸리게 된다. 즉, `a[0] = 2`이고 숫자에는 `toUpperCase()` 함수를 사용할 수 없다는 것을 실행 전에 에러로 알려준다. 자바스크립트는 실행되기 전까지 알 수 없다. 

```ts
type SuperPrint = <T>(arr: T[]) => T

const superPrint : SuperPrint = (arr) => arr[0]

const a = superPrint([2, 'b', 1, true])

a.toUpperCase() 
// error: Property 'toUpperCase' does not exist on type 'string | number | boolean'. Property 'toUpperCase' does not exist on type 'number'.
```

제넥릭 타입을 여러개 사용 하고 싶다면 `<T, M>`처럼 제네릭타입 개수와 이름을 알려주고, 순서에 맞춰 원하는 파라미터 자리에 제네릭이름을 넣어주면 된다.  

```ts
type SuperPrint = <T, M>(arr: T[], b: M) => T
const superPrint : SuperPrint = (arr) => arr[0]
const a = superPrint([2, 'b', 1, true], 3)
```


참고로 call signature는 일반함수로 변환해서 쓸 수 있다. 

```ts
function superPrint<T>(arr: T[]) {
  return arr[0]
}
```