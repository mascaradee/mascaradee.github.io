---
layout: post
date: 2023-05-16 09:05:00 +0900
title: '[typescript] base'
categories:
  - typescript
tags:
  - base
---

* Kramdown table of contents
{:toc .toc}

## 참고

- [타입스크립트](https://www.typescriptlang.org/)


# 타입스크립트

코드 실행 시 타입 체크를 하는 자바스크립트의 약점을 보완하기 위해, 컴파일 시 타입 체크를 하여 혹시 있을지 모를 타입 에러를 사용자에게 노출 전에 알려 줄 수 있도록 한 겹의 레이어를 덧씌운 것이라고 할 수 있다. 한 마디로 요약 하지만 정적 타입 검사기.

# 타입스크립트 용도 

## 원시타입 명시

대부분은 자바스크립트에서 사용할 수 있는 원시타입을 그대로 사용하면 된다. 

명시적으로 `greetings`를 선언한 것처럼 타입을 적어주면 되지만 보통은 자바스크립트와 동일한 코드를 사용해도 내부에서 자동으로 타입을 인지한다. 고로 `greeting`을 선언한 코드와 동일한 결과를 얻는다는 것 
```ts
let greeting = ['hi'];
let greetings : string[] = ['hi'. 'hello'];

```

## 객체타입 명시

### any 타입

타입스크립트의 기능을 무효화 하는 타입으로 `any`를 붙여주면 자바스크립트와 동일하게 사용 가능하다.

```ts
const name : any = 'mignon' 
name = 1 // any 타입이므로 어떤 값으로도 할당 가능
```

#### any도 검사하기, noImplicitAny

타입스크립트는 기본적으로 명시되지 않은 타입은 `any`로 판단한다. 이 경우 타입 검사가 이루어 지지 않기 때문에 이것을 원하지 않는다면 `noImplicitAny`를 사용한다. 
컴파일 옵션 `noImplicitAny`는 `any` 타입으로 간주하는 모든 경우에 오류를 발생시킨다. 

### 선택 타입, ?

`name`과 `age`를 갖는 `player`객체가 있다. 타입에 맞춰 변수가 선언되어야 하므로 `age`가 선언되지 않은 아래 코드는 컴파일 에러가 난다.  

```ts
const player : {
  name: string,
  age: number // 실제 선언에서는 이 값이 없으므로 컴파일 에러
} = {
  name: 'mignon'
}
```

`player`가 `age`를 가지고 있지 않을 수도 있다는 것을 표현 할 때, 즉 필수가 아닌 선택에 의해 값이 있을 수도 없을수도 있다는 것을 알려주기 위해  `optional properties`를 사용하면 된다.

실제 표기는 `?`를 덧붙여주면 된다.  

```ts
const player : {
  name: string,
  age?: number // 선택
} = {
  name: 'mignon'
}
```

### 유니언 타입

`|` 연산자로 타입을 조합하여 사용할 수 있다. 

```ts
function printId(id: number | string) { // 숫자 혹은 문자열만 받는다.
  console.log("Your ID is: " + id);
}

printId(101); // OK
printId("202"); // OK
printId({ myID: 22342 }); // 오류: Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
````

### tuple 타입

배열 요소의 타입을 정해진 순서와 타입으로 사용 할 수 있도록 지정하는 타입의 한 종류이다. 

```ts
const person : [string, number, boolean] = ['mignon', 12, true]
person[0] = 1 // error 첫요소의 타입은 문자열이므로
```

### unknown 타입

API를 통해 어떤 종류의 타입인지 모르는 것을 받을 때 사용하지 좋다. 

```ts
let a:unknown; // 어떠한 타입인지 알수 없는 상태지만 받아 주겠다.

let b = a + 1 // error: a가 어떤 타입인지 모르므로 연산 불가
```

따라서 `unknown`타입을 사용하기 위해서는 필수로 타입을 확인 후 처리하는 장치가 필요하다. 

```ts
let a:unknown;

if(typeof a === 'number'){
  let b = a + 1 // OK
}

if (typeof a === 'string') {
  let b = a.toUpperCase
}
```

### void 타입

비어있는 타입, 리턴값이 없다는 것을 의미

```ts
function hello() {
  console.log('hi')
}

// 실제 타입스크립트는 아래와 같이 인식한다. 
function hello() : void {
  console.log('hi')
}
```

### never 타입

오류를 리턴하는 타입

```ts
function hello() : never {
  return 'x'; // Type 'undefined' is not assignable to type 'never'.
}

function hello() : never {
  throw new Error ('xxx') // OK
}
```

```ts
function hello(name:string|number){
  if (typeof name === 'string') {
    name // string 타입
  } else if (typeof name === 'number') {
    name // number 타입
  } else {
    name // never 타입 : 잘못된 타입이 유입되어도 이건 리턴될 일이 없음?
  }
}
```

#### 타입 수정 불가

`readonly`를 붙이면 해당 타입은 수정이 불가능한 상태가 된다. 

```ts
const names : readonly string[] = ['mignon', 'whale']
names.push() // error
```

## 함수 타입 명시

`makePlayer`함수를 변수에 할당하면 `name`항목만 있는 객체를 리턴하므로 `age`를 추가할 수 없다.  

```ts
function makePlayer(name:string) {
  return {
    name: name // name으로 줄여 쓸 수 있다. 
  }
}

const mignon = makePlayer('mignon')
mignon.age = 12 // error
```

함수에 리턴타입으로 `Player`를 명시해 주면, `name, age`가 있는 객체가 리턴되므로 에러가 나지 않는다.  

```ts
type Player = {
  name: string, 
  age?: number
}

function makePlayer(name:string) : Player {
  return {
    name
  }
}

const mignon = makePlayer('mignon')
mignon.age = 12 // OK
```

화살표 함수일 경우는 아래와 같다. 참고로 객체리터럴을 리턴할때는 `()` 안에 넣어 표기해 준다.

```ts
const makePlayer = (name:string) : Player => ({name})
```


## 타입 재사용

특정한 타입에 `alias`를 지정해서 여러 곳에서 재사용할 수 있다. 

```ts
type Player = {
  name: string, 
  age?: number
}

const mignon : Player = {
  name: 'mignon'
}

const whale : Player = {
  name: 'whale',
  age: 10
}
```

