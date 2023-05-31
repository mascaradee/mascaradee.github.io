---
layout: post
date: 2023-05-22 09:05:00 +0900
title: '[typescript] setting
'
categories:
  - typescript
tags:
  - setting
---

* Kramdown table of contents
{:toc .toc}

# 타입스크립트 설정

## nodejs 설치

최신버전으로 설치

## vscode 

폴더를 만들고 vscode를 연다. 
```
PS C:> mkdir typechain

PS C:typechain> code typechain
```

- 터미널을 열고  package.json 파일을 생성한다.

```
PS C:typechain> npm init -y
```

- 위 명령어로 생성된 package.json 수정 
```json
  "main": "index.js", // 삭제 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1" // 내용만 삭제
  },
```

- 타입스크립트 세팅  

```
PS C:typechain> npm i -D typescript
```

- package.json 확인 하단에 아래 내용이 추가됨
```json
  "devDependencies": {
    "typescript": "^5.0.4"
  }
```

- 노드 프로젝트에 src > index.ts 폴더와 파일 생성 

```ts
const hello = () => 'hi';
```

- `tsconfig.json` 파일 생성: `vscode`에 타입스크립트를 쓴다는 것을 알려주는 기능, 자동완성을 해 준다. 

```json
{
    "include": [ // 타입스크립트 파일이 어디에 있는지?
        "src"
    ],
    "compilerOptions": { // 컴파일한 자바스크립트 파일은 어디에 놓을지?
        "outDir": "build"
    }
}
```

- `package.json`의 `scripts` 객체의 값으로 아래처럼 넣어준다. 

```json
 "scripts": {
    "build": "tsc" // 타입스크립트로 컴파일 한다.
  },
```

- 터미널에서 제대로 컴파일 되는지 확인한다. `node_module` 폴더가 생기면서 타입스크립트가 실행된다. 

```
PS C:typechain> npm run build

> typechain@1.0.0 build
> tsc

```

- `vscode`에 `build`라는 폴더가 생기고 `index.ts`의 컴파일 버전인 `index.js`가 생성된것을 확인 할 수 있다. 오래된 버전의 자바스크립트로 컴파일된 결과다. 

```js
var hello = function () { return 'hi'; };
```

- `tsconfig.json` 파일에 컴파일될 자바스크립트 버전을 명시해준다. 

```json
{
    "include": [
        "src"
    ],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6" // 어떤 버전의 자바스크립트로 컴파일 할 건지 
    }
}
```

- 다시 컴파일 후 `index.js`파일을 확인해 보자. `const`와 화살표 함수를 사용하는 버전으로 알맞게 컴파일 되었다. 

```js
const hello = () => 'hi';
```

- `target`에 대해 더 자세히 알고 싶다면 다음 링크 확인 
  - [https://www.typescriptlang.org/tsconfig#target](https://www.typescriptlang.org/tsconfig#target)


## compilerOptions

### lib

- `lib`는 코드가 어떤 환경에서 작동할 것인지 타입스크립트에 알려주는 역할로 해당 환경의 코드 자동완성을 사용할 수 있다. 
- [tsconfig#lib 참고](https://www.typescriptlang.org/tsconfig#lib)

```json
{
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6" 
        "lib": ["ES6", "DOM"]
    }
}
```

브라우저에서 작동하는 프로그램을 위해 `dom` 속성이 필요하다. `dom`을 타입스크립트 프로젝트에서 사용 가능한 건 `dom`에서 사용하는 타입을 정의해 놓은 파일이 존재하기 때문이다. 이 그 정의 파일이고  `localStorage`를 별도 임포트 없이 사용 할 수 있는 건 `lib.dom.d.ts` 파일에 이미 정의가 되어 있기 때문이다.

```ts
// lib.dom.d.ts
declare var localStorage: Storage;
```

### strict

- 타입스크립트 규칙을 따르도록 강제한다. 

```json
{
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6" 
        "lib": ["ES6", "DOM"],
        "strict": true
    }
}
```

### 정의 파일, declaration file (.d.ts)

자바스크립트 패키지, 프레임웍, 라이브러리를 타입스크립트 프로젝트에서 사용하기 위해서 타입스트립트에게 어떤 자바스크립트 타입들이 있는지 알려줘야 하는데 그때 사용하는 것이 정의 파일이다.   
자바스크립트로 만들어진 `myPackgae.js` 모듈을 `npm`이나 `github`에서 받았다고 가정하고 사용해보자   

```js
// myPackage.js

export function init(config) {
    return true;
}
export function exit(code) {
    return code + 1;
}
```

타입스크립트는 임포트를 할 init 함수의 타입을 알 수 없어 에러가 난다. 

```ts
import {init} from "myPackage"; 
/*
error:
'init' is declared but its value is never read.ts(6133)
Could not find a declaration file for module 'myPackage'. 'c:/typechain/src/myPackage.js' implicitly has an 'any' type.ts(7016)
*/
```

즉, 정의 파일을 추가해 줘야한다. 

```ts
// myPackage.d.ts
interface Config {
    url: string;
}
declare module "myPackage" {
    function init(config:Config): boolean;
}
```

이제 자바스크립트로 만든 `init`함수를 타입스크립트 프로젝트에서 사용할 수 있다 

```ts
import {init} from "myPackage"; 

init({
  url: "/home"
})
```

나머지 함수도 정의를 해야 사용 가능하다. 

```ts
// myPackage.d.ts
interface Config {
    url: string;
}
declare module "myPackage" {
    function init(config: Config): boolean;
    function exit(code: number): number;
}
```

임포트를 한 후 호출해보자  

```ts
import {init, exit} from "myPackage"; 

init({
  url: "/home"
})

exit(1)
```


# 타입스크립트 프로젝트에서 자바스크립트 사용하기 

1) 정의파일을 생성해 자바스크립트의 모든 타입을 설명 

TODO 위의 예시 다시 정리 

2) 타입스크립트 + (자바스크립트 + JSDOC) 혼용해서 사용하기

자바스크립트 파일을 그대로 임포트해서 타입스크립트와 혼용해서 사용할 수 있다. 이 경우 정의파일은 필요없고 자바스크립트 코드에는 타입스크립트 체크는 없다. 

`./myPackage` 형태로 임포트를 하면 해당 경로의 파일을 불러오지만 현재 타입스크립트에서는 자바스크립트를 허용하지 않으므로 에러가 난다.   

```ts
// index.ts
import {init, exit} from "./myPackage";

/*
error: 
All imports in import declaration are unused.ts(6192)
Could not find a declaration file for module './myPackage'. 'c:/typechain/src/myPackage.js' implicitly has an 'any' type.ts(7016)
* /
```

`tsconfig.json` 설정파일의 컴파일 옵션에 `"allowJs": true`로 자바스크립트 사용을 허용해준다.  

```json
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "lib": ["ES6", "DOM"],
        "strict": true,
        "allowJs": true
    }
}
```

이제 자바스크립트를 직접 불러와서 사용 가능하다. 타입스크립트가 추론한 `call signature`도 확인할 수 있다. 그런데  `init(1)`로 호출을 해도 에러가 발생하지 않는다. 타입스크립트가 보기에 `init`함수의 파라미터타입은 어떤 것이든 들어올 수 있기 때문이다.

```ts
// index.ts
import {init, exit} from "./myPackage";

/*
init 설명
(alias) function init(config: any): boolean
*/

init(1) // 에러가 발생하지 않는다.
```

자바스크립트를 타입스크립트처럼 사용해 타입체크를 하고 싶으면 `JSDOC`을 이용하면 된다. 이것은 타입스크립트에게 자바스크립트 타입을 설명해준다. `myPackage.js`에 `JSDOC`을 추가해보자  

```js
// @ts-check

/**
 * Initializes the project
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns void
 */
export function init(config) {
    return true;
}

/**
 * Exits the program
 * 
 * @param {number} code 
 * @returns number
 */
export function exit(code) {
    return code + 1;
}
```

이제 타입스크립트는 타입체크를 할 수 있다. 

```ts
// index.ts
import {init, exit} from "./myPackage";

init(1) // error: Argument of type 'number' is not assignable to parameter of type '{ debug: boolean; url: string; }'.ts(2345)
```


# 모듈 임포트 하기 

`node_modules`의 `crypto`모듈을 임포트 해보자. 모듈을 바로 임포트 할 수 없다.  

```ts
import crypto from "crypto";

/*
'crypto' is declared but its value is never read.ts(6133)
Module '"crypto"' has no default export.ts(1192)
*/
```

`tsconfig.json` 에 `"esModuleInterop": true`와 `"module": "CommonJS"`를 추가해서 자바스크립트 모듈 추가를 쉽게 한다. 

```json
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6", // 브라우저앱을 위해서 DOM도 필요 
        "lib": ["ES6"],
        "strict": true,
        "esModuleInterop": true,
        "module": "CommonJS" // 브라우저앱을 위해선 UMD 모듈이 필요
    }
}
```

그런데 모듈을 추가했는데 정의파일이 없다는 에러가 난 경우는 어떻게 할까?
`.d.ts`을 만들어 주면 되지만 긴 코드를 가진 파일을 일일히 분석해서 만들어 주기에는 한계가 있다. 

아래 경로에서 타입스크립트 타입 정의를 모아 놓았다. 이것을 다운 받으면 별도 정의파일을 만들 필요 없이 거의 모든 타입스트립트 타입을 임포트할 수 있다.  
[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)


원하는 모듈을 설치 한 후 해당 타입도 설치해주면 된다. 
```
npm i axon

npm i -D @type/axon
```

`nodejs`에서 사용하는 모든 타입을 설치 하고 싶을 때는 아래처럼 명령하면 된다. 

```
PS C:\typechain> npm i -D @types/node
```
