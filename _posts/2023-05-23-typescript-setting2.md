---
layout: post
date: 2023-05-23 09:05:00 +0900
title: '[typescript] setting2
'
categories:
  - typescript
tags:
  - setting
---

* Kramdown table of contents
{:toc .toc}


# 효율적인 세팅

매번 컴파일하고 재실행하는 것을 효율적으로 변경해보자   

```ts
// index.ts
console.log('hi')
```

`package.json`파일에 파일실행 시작 스크립트 명령어를 추가한다. 

```json
 "scripts": {
    "build": "tsc",
    "start": "node build/index.js" // node환경에서 수동 빌드
  },
```

터미널에서 명령어를 실행해 본다.  

```
PS C:\typechain> npm run build & npm run start

> typechain@1.0.0 build
> tsc


> typechain@1.0.0 start
> node build/index.js  

hi
```

`ts-node`를 설치하면 개발 환경에서만 빌드 없이 타입스크립트 실행할 수 있다. 

```
PS C:\typechain> npm i -D ts-node   
```

`package.json`파일에 `"dev": "ts-node src/index"` 명령 스크립트를 추가한다. 

```json
  "scripts": {
    "build": "tsc",  
    "start": "node build/index.js",
    "dev": "ts-node src/index"  // node환경에서 자동빌드
  },
```

`nodemon`은 명령어를 자동 실행하여 일일이 명령스크립트를 실행할 필요가 없는 기능이다. 필요하면 추가하자.  

```
PS C:typechain> npm i nodemon   
```

`package.json`파일에 `dev` 명령어를 아래와 같이 수정하면 `nodemon`을 사용할 수 있다. 

```json
  "scripts": {
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/index.ts",
    "start": "node build/index.js"
  },
```

`npm run dev`로 새로 만든 명령어를 실행해 보자   

```
PS C:\dev\git\typechain> npm run dev  

> typechain@1.0.0 dev
> nodemon --exec ts-node src/index.ts

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json      
[nodemon] starting `ts-node src/index.ts`   
hi
[nodemon] clean exit - waiting for changes before restart
```

이제 파일의 수정이 있을 때마다 자동 빌드와 재실행이 된다. 