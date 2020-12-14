---
layout: post
date: 2020-12-13 20:00:00 +0900
title: '[javascript] async and await'
categories:
  - javascript
tags:
  - promise
  - async
  - await
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- 드림코딩 by 엘리  
[https://www.youtube.com/watch?v=aoQSOZfz3vQ&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=13](https://www.youtube.com/watch?v=aoQSOZfz3vQ&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=13)

## async & await
프로미스 체이닝을 동기적으로 실행 되는 것처럼 보여질 수 있도록 쓰는 API
기존의 기능을 감싸서 제공하는 API = syntactic sugar

### async

`async`키워드를 `function()` 앞에 붙이기만 하면 비동기함수가 된다.

`async function name([param[, param[, ...param]]]) {
   statements
}`

#### (1) 동기 방식

아래와 같이 동기로 스크립트를 작성할 경우, 순차적인 실행을 하는 자바스크립트 특성상 10초동안 `fetchUser()`의 실행이 모두 끝날때까지 이후 스크립트는 동작을 할 수가 없어 마냥 기다리게만 된다. 만약 이후 스크립트가 화면을 구성하는 부분이라면 고객은 빈 화면을 10초동안 유지시키고 있어야 하는 불상사가...  

```js
function fetchUser() {
    // do network request in 10 secs ...
    return 'macs';
}
const user = fetchUser();
console.log(user);
```

#### (2) 비동기 방식 Promise

`Promise`는 이런 오랜 작업을 비동기로 실행할 수 있게 하고 바로 다음 스크립트를 실행하도록 두 갈래로 갈라주는 역할을 한다.   

```js
function fetchUser() {
    return new Promise((resolve, reject) => {
        // do network request in 10 secs..
        // return 'macs';
        /*
        Promise {<pending>}
        __proto__: Promise
        [[PromiseState]]: "pending"
        [[PromiseResult]]: undefined
        -> resolve나 reject로 완료처리를 해 주지 않고 return 'macs'를 하면 계속 pending 상태로 남아 있게 된다.
        */
        resolve('macs');
        /* 서버로부터 응답을 받은 후 resolve를 실행하면 아래와 같이 상태가 변경된다.
        Promise {<fulfilled>: "macs"}
        __proto__: Promise
        [[PromiseState]]: "fulfilled"
        [[PromiseResult]]: "macs"
        */
    });
}

const user = fetchUser();
user.then(console.log); // macs : Promise 실행 결과가 완료된 후에 로그가 찍히므로 아래 로그보다 더 나중에 찍힘.
console.log(user);
```

#### (3) async

함수 선언 앞에 async 키워드만 붙이면 내부적으로 promise로 변경된다.  

```js
async function fetchUser() {
    return 'macs'
}
const user = fetchUser();
user.then(console.log);
console.log(user);
```

#### (4) await

`await`는 `async`함수 안에서만 쓸수 있고 `promise`가 끝날때까지 기다리는 기능    

`[rv] = await expression;`
- `expression` - `Promise`를 기다리기 위한 Promise 혹은 어떤 데이터
- `rv` - `Promise`의 결과

```js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getApple() {
    await delay(2000);
    // throw 'error'; // 에러를 처리하는 기능 필요
    return '🍎';
}
async function getBanana() {
    await delay(1000);
    return '🍌';
}
```
Promise를 써서 위 함수들을 호출한다면 아래와 같이 쓸 수 있지만 Promise도 체이닝이 반복되다 보면 콜백지옥과 다를바 없다.  

```js
// 콜백지옥이 연상됨 -> 비추
function pickFruits() {
    return getApple().then(apple => {
        return getBanana().then(banana => `${apple} + ${banana}`);
    });
}
pickFruits().then(console.log); // 🍎 + 🍌
```

위 코드를 async를 사용하면 동기적으로 보이게 코딩할 수 있다.  

```js
async function pickFruits() {
    try {
        const apple = await getApple(); // getApple()이 끝날때까지 다음은 실행 못함.
        const banana = await getBanana();
        return `${apple} + ${banana}`;
    } catch {
        // error handling
    }
}
pickFruits().then(console.log); // 🍎 + 🍌
```

하지만 또 문제가 있는데 그거슨 각 함수들이 병렬적으로 처리가 되지 않아 시간을 많이 잡아먹는다는 것이다. `await` 덕분에 `getApple()`(1초) 이 다 실행 된 후 `getBanana()`(2초)가 실행되어 다 실행될따까지 총 2초가 걸린다. 하지만 `getApple()`와 `getBanana()`는 실행 시 연관이 없는 기능이므로 순차적으로 실행될 필요도 전혀 없다.
아래와 같이 코드를 바꾸면 병렬 실행이 해결된다.  

```js
async function pickFruits() {
    const applePromise = getApple(); // promise는 생성되는 순간 실행
    const bananaPromise = getBanana(); // promise는 생성되는 순간 실행되므로 getApple()이 끝날때까지 기다리지 않는다.
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
}
pickFruits().then(console.log); // 🍎 + 🍌
```


### useful Promise APIs

#### .all()

`Promise`를 전달하면 모든 프로미스가 실행된 결과를 모아 배열로 리턴한다. 수동으로 병렬구조를 만들었던 것을 `api`를 이용해 손쉽게 해결할 수 있다.  

```js
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()]).then(fruits => fruits.join(' + '));
}
pickAllFruits().then(console.log); // 🍎 + 🍌
```

#### .race()

`Promise`를 전달하면 먼저 결과가 나온 것만 리턴한다.

```js
function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log); // 🍌
```
