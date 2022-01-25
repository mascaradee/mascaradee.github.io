---
layout: post
date: 2021-12-17 17:33:00 +0900
title: '[reactJS] create react app'
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


### nodejs 설치

옛 버전이 설치되어 있었지만 웹사이트에서 다운 받은 설치파일을 실행하니 자동으로 업그레이드가 되는듯하다.

신규 버전 설치 전

```
PS C:\dev\reactjs> node -v
v12.18.2
```

신규 버전 설치 후

```
PS C:\dev\reactjs> node -v
v16.13.1
PS C:\dev\reactjs> npm -v
8.1.2
```
npx 확인
```
PS C:\dev\reactjs> npx

Entering npm script environment at location:
C:\dev\reactjs
Type 'exit' or ^D when finished

Microsoft Windows [Version 10.0.19043.1415]
(c) Microsoft Corporation. All rights reserved.
```

create react app  설치

일종의 패키지 인듯. react, react-DOM, react-scripts 등을 미리 세팅해줌

```
PS C:\dev\reactjs> npx create-react-app mulberry
Need to install the following packages:
  create-react-app
Ok to proceed? (y) y
npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.

Creating a new React app in C:\dev\reactjs\mulberry.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template...


added 1369 packages in 2m

163 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...

added 33 packages in 3s

163 packages are looking for funding
  run `npm fund` for details
Removing template package using npm...


removed 1 package, and audited 1402 packages in 2s

163 packages are looking for funding
  run `npm fund` for details

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

Created git commit.

Success! Created mulberry at C:\dev\reactjs\mulberry
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd mulberry
  npm start

Happy hacking!
```

mulberry 폴더가 만들어지고 npm을 시작하면 패키지에 포함되어 있는 화면이 출력된다.

```
PS C:\dev\reactjs\mulberry> npm start

> mulberry@0.1.0 start
> react-scripts start
Starting the development server...
Compiled successfully!

You can now view mulberry in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.30.1.7:3000
```

또 장점은 auto reload

prop-type 사용하려면 아래와 같이 설치

```
PS C:\dev\reactjs\mulberry> npm i prop-types

up to date, audited 1402 packages in 3s

163 packages are looking for funding
  run `npm fund` for details

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

라우터 설치
```
PS C:\dev\reactjs\mulberry> npm install react-router-dom
```


```
PS C:\dev\reactjs\mulberry> npm install react-router-dom


163 packages are looking for funding
  run `npm fund` for details

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\dev\reactjs\mulberry> npm i react-router-dom@5.3.0

added 10 packages, changed 3 packages, and audited 1415 packages in 6s

163 packages are looking for funding
  run `npm fund` for details

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```


## gh-pages 설치

github page를 배포할 수 있는 패키지이다.
아래 명령어로 설치한 후에

```
PS C:\dev\reactjs\mulberry> npm i gh-pages

added 16 packages, and audited 1431 packages in 3s

164 packages are looking for funding
  run `npm fund` for details

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

개발폴더에서 아래 파일을 확인한다.

/package.json

build 시 출력되는 문구를 찾을 수 있다.

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  (...)
}
```

이제 터밀널에서 빌드 명령어를 쳐보자

```
PS C:\dev\reactjs\mulberry> npm run build

> mulberry@0.1.0 build
> react-scripts build // 위에서 확인한 문구

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  54.31 kB (+3 B)  build\static\js\main.587a7a09.js

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment

PS C:\dev\reactjs\mulberry>
```

빌드가 끝나면
/build/static/js에 빌드한 결과가 나타난다. 이 파일들이 바로 브라우저가 이해할 수 있는 파일들임


배포를 하기 위해서는 추가 작업이 필요하다. 아래 파일에 배포 명령어와 홈페이지 주소를 추가한다.

/package.json


```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  (...)
  "deploy": "gh-pages -d build", // git 배포 관룐
  "predeploy": "npm run build" // git 배포 전 빌드가 안되어 있음 미리 한 번 더 실행 하도록
}

// 배포할 github 추가
"homepage": "https://mascaradee.github.io/mulberry"

```
그 다음 배포를 실행해 보자
```
PS C:\dev\reactjs\mulberry> npm run deploy

> mulberry@0.1.0 predeploy
> npm run build


> mulberry@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  54.31 kB  build\static\js\main.587a7a09.js

The project was built assuming it is hosted at /mulberry/.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.

Find out more about deployment here:

  https://cra.link/deployment


> mulberry@0.1.0 deploy
> gh-pages -d build

Published
```




### 참고  

[노드JS](https://nodejs.org/ko/)
[create-react-app](https://create-react-app.dev/)
[라우터](https://reactrouter.com/docs/en/v6/getting-started/tutorial#connect-the-url)
