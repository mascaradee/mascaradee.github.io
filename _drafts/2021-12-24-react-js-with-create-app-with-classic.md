---
layout: post
date: 2021-12-24 11:43:00 +0900
title: '[reactJS] create react app with classic'
categories:
  - reactJS
tags:
  - reactJS
  - create
---

* Kramdown table of contents
{:toc .toc}


## 크리에이트 리액트 앱
리액트JS를 좀 더 손 쉽게 사용할 수 있도록 하는 모음집?


## nodejs 설치

## npm 설치

## npx 설치

클래식 버전 수업할때 필요
```
PS C:\dev\reactjs\mulberry> npm install npx -g

added 3 packages, and audited 362 packages in 14s

37 vulnerabilities (1 low, 18 moderate, 11 high, 7 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\dev\reactjs\mulberry> npm audit
# npm audit report

nth-check  <2.0.1
Severity: moderate
Inefficient Regular Expression Complexity in nth-check - https://github.com/advisories/GHSA-rp65-9cf3-cjxr
fix available via `npm audit fix --force`
Will install react-scripts@2.1.3, which is a breaking change
node_modules/svgo/node_modules/nth-check
  css-select  <=3.1.0
  Depends on vulnerable versions of nth-check
  node_modules/svgo/node_modules/css-select
    svgo  1.0.0 - 1.3.2
    Depends on vulnerable versions of css-select
    node_modules/svgo
      @svgr/plugin-svgo  <=5.5.0
      Depends on vulnerable versions of svgo
      node_modules/@svgr/plugin-svgo
        @svgr/webpack  4.0.0 - 5.5.0
        Depends on vulnerable versions of @svgr/plugin-svgo
        node_modules/@svgr/webpack
          react-scripts  >=2.1.4
          Depends on vulnerable versions of @svgr/webpack
          node_modules/react-scripts

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force
```

## git 설치

## create react app 설치

```
PS C:\dev\reactjs> npx create-react-app blackberry

Happy hacking!
```

## prop-types 설치
```
PS C:\dev\reactjs\blackberry> npm i prop-types
```

## axios 설치
fetch()를 감싸고 있는 것

```
PS C:\dev\reactjs\blackberry> npm i axios
```

## gh-pages 설치

깃허브 페이지에 배포 할 수 있도록 해준다

```
PS C:\dev\reactjs\blackberry> npm i gh-pages
```

## packge.json 수정

배포 스크립트 추가

```
"scripts": {
(...)
  "deploy": "gh-pages -d build",
  "predeploy": "npm run build"
},
```

깃허브 페이지 주소 추가

```
 "homepage": "https://mascaradee.github.io/blackberry"
```

배포 명령어를 치면 자동으로 predeploy 부터 실행. predeploy에 빌드 실행명령을 넣어놨기 때문에 먼저 빌드 그리고 배포까지 연결됨.

```
PS C:\dev\reactjs\blackberry> npm run deploy

> blackberry@0.1.0 predeploy
> npm run build


> blackberry@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  51.38 kB  build\static\js\main.f417745c.js
  536 B     build\static\css\main.124c55c9.css

The project was built assuming it is hosted at /blackberry/.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.

Find out more about deployment here:

  https://cra.link/deployment


> blackberry@0.1.0 deploy
> gh-pages -d build

Published
```


## react-router-dom 설치
네비게이션을 해 주는 역할

```
PS C:\dev\reactjs\blackberry> npm install react-router-dom
```


## 영화 api 참조
https://yts.mx/api



### 참고  

[노드JS](https://nodejs.org/ko/)
[create-react-app](https://create-react-app.dev/)
[라우터](https://reactrouter.com/docs/en/v6/getting-started/tutorial#connect-the-url)
[prop types](https://ko.reactjs.org/docs/typechecking-with-proptypes.html)
