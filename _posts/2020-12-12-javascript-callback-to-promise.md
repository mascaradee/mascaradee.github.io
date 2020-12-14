---
layout: post
date: 2020-12-12 14:00:00 +0900
title: '[javascript] callback to promise'
categories:
  - javascript
tags:
  - callback
  - promise
---

* Kramdown table of contents
{:toc .toc}

## 참고사이트
- 드림코딩 by 엘리  
[https://www.youtube.com/watch?v=JB_yU6Oe2eE&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=12](https://www.youtube.com/watch?v=JB_yU6Oe2eE&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=12)

### Callback Hell example

```js
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() =>{
            if(
                (id === 'macs' && password === 'happy') ||
                (id === 'hi' && password === 'world')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }
    getRoles(user, onSuccess, onError) {
        setTimeout(()=>{
            if (user === 'macs') {
                onSuccess({name:'macs', role: 'admin'});
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

// id/ pw 받아오기
const user = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

// 로그인 호출
const rId = user.loginUser(
    id,
    password,
    rId => {
        //  롤 조회 호출  
        user.getRoles(
            rId,
            userWithRole => {
                // 결과 출력
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            },
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error);
});
```
이렇게 콜백이 중복되면 가독성이 떨어지고 유지보수 및 디버깅이 힘들어진다.  
비추다.  


## Callback to Promise

```js
class UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                console.log(id);
                if(
                    (id === 'macs' && password === 'happy') ||
                    (id === 'hi' && password === 'world')
                ) {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 2000);
        });        
    }
    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if (user === 'macs') {
                    resolve({name:'macs', role: 'admin'});
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);    
        })
    }
}

// 프로미스로 콜백지옥 해결하기
const user = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
user
    .loginUser(id, password)
    .then(user.getRoles)
    .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
    .catch(console.log);
```

### Promise to async

```js
// async로 콜백지옥 해결하기
const user = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

async function caller(id, password) {
    const rId = await user.loginUser(id, password);
    const roles = await user.getRoles(rId);
    return `Hello ${roles.name}, you have a ${roles.role} role`;
}
caller(id, password)
.then(console.log)
.catch(console.log);
```
