---
layout: post
date: 2020-12-12 14:00:00 +0900
title: '[javascript] promise'
categories:
  - javascript
tags:
  - promise
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- 드림코딩 by 엘리  
[https://www.youtube.com/watch?v=JB_yU6Oe2eE&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=12](https://www.youtube.com/watch?v=JB_yU6Oe2eE&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=12)

- MDN : Promise.prototype.finally()  
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

## promise

비동기를 간편하게 수행하기 위해 자바스크립트가 제공하는 오브젝트. 콜백함수을 대체할 수 있는 방법  
- state : 수행중(pending) 종료(fulfilled or rejected)  
- 정보 제공(producer) vs  정보 소비(consumer)  

ie는 미지원   

### Promise 생성자 함수 (Producer)

`Promise()`는 생성이 되자마자 `executor(콜백함수)`가 실행이 되므로 주의해야 한다. 사용자가 직접 입력할 때 동작하는 기능이라면 생성 시에도 불필요하게 동작을 하므로 유의해야 한다.  

`new Promise(resolve, reject)`  
`new <T>(executor:(
                    resolve: (value?: T | PromiseLike<T>) => void,
                    reject: (reason?: any) => void
                  ) => void)
: Promise<T>;`
- `executor: () => void` - 콜백함수
- `resolve: (value?: T | PromiseLike<T>) => void` - 콜백함수 매개변수1 : 서버통신 성공 시 호출
- `reject: (reason?: any) => void` - 콜백함수 매개변수2 : 서버통신 실패 시 호출
- `Promise<T>` - 리턴형식

```js
const promise = new Promise((resolve, reject) => {
    // doing some heavy work (network, read files)
    console.log('doing something...');
    setTimeout(() => {
        //resolve('macs');
        reject(new Error('no network'));
    }, 2000);
});
```

### then, catch, finally (Consumers)

#### then

Promise의 콜백함수가 실행 후 결과(성공, 실패)를 덧붙인다.    

`then<TResult1 = T, TResult2 = never>(
                                      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) |
                                                    undefined |
                                                    null,
                                      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) |
                                                    undefined |
                                                    null
                                     )
: Promise<TResult1 | TResult2>;`
- `onfulfilled?` - (옵션) 매개변수1 : 성공 결과
- `onrejected?` -  (옵션) 매개변수2 : 실패 결과
- `Promise<TResult1 | TResult2>` - 리턴 형식: `Promise`를 리턴한다.

#### catch

Promise의 콜백함수가 실행 후 실패 결과만 덧붙인다.    

`catch<TResult = never>(
                        onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) |
                                      undefined |
                                      null
                        )
: Promise<T | TResult>;`
- `onrejected?` - (옵션) 매개변수1 : 실패 결과
- `Promise<T | TResult>` - 리턴 형식: `Promise`를 리턴한다.


#### finally

Promise의 결과가 성공이든 실패든 모두 받는다.  

`.finally(function() {
   // settled (fulfilled or rejected)
});`

```js
promise
.then(value => { // value는 promise가 제대로 작동해서 resolve 콜백함수를 통해서 전달한 값이다.즉, macs
    console.log(value);
}) // then()은 promise를 다시 리턴하므로 아래 catch에 전달할수 있다. = 체이닝
// catch가 없는 경우 - Uncaught (in promise) Error: no networ -> 오류가 발생하므로 오류 관리를 위해 catch문에 처리를 위한 로직을 넣는다.
.catch(error => {
    console.log(error);
})
.finally(() => { // 성공이든 실패든 무조건 실행되는 부분
    console.log('finally');
});
```

### 프로미스 연결하기 Promise chaining

```js
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
.then(num => num * 2) // resolve(1)의 value인 1 => 1 * 2 => num = 2
.then(num => num * 3) // 위에서 리턴된 num = 2 => 2 * 3 => num = 6
.then(num => { // 위에서 리턴된 num = 6
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num - 1), 1000); // 6 - 1 => num = 5
    });
})
.then(num => console.log(num)); // 위에서 리턴된 num = 5
```

### Error Handling

```js
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() =>
            //resolve(`${hen} => 🥚`), 1000); // 작동 성공
            reject(new Error(`${hen} => 🥚`)), 1000) // 작동 실패 -> Uncaught (in promise) Error: 🐓 => 🥚 at promise.js:58 오류처리는 아래 catch()
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    });

/*    
getHen()
.then(hen => getEgg(hen))
.then(egg => cook(egg))
.then(meal => console.log(meal));
*/
getHen()
.then(getEgg) // 콜백함수결과값이 하나이고 다른 함수의 매개변수 그대로 전달할때는 왼쪽과 같이 생략 가능
.catch(error => {
    return '🍞'; // 에러 발생 시 원하는 핸들링을 할수 있다. 적절한 핸들링이 있어야 promise가 원활하게 끝까지 진행할 수 있다.
})
.then(cook)
.then(console.log)
.catch(console.log) // 에러 처리
;
// getHen().then(getEgg).then(cook).then(console.log); 이렇게 한줄로 쓸 수도 있지만 가독성이 좋지 않다.
```
