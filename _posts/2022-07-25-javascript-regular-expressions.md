---
layout: post
date: 2022-07-25 19:05:00 +0900
title: '[javascript] regular expressions, RexExp 정규표현식'
categories:
  - javascript
tags:
  - regular-expressions
  - regexp
---

* Kramdown table of contents
{:toc .toc}

## 참고 
- [정규표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)

- [정규표현식 활용 사이트1](https://regexr.com/)
- [정규표현식 활용 사이트2](https://regex101.com/)

## 정규표현식이란?

정규식은 문자열에서 특정 문자조합을 찾기위한 패턴이다. 
자바스크립트에서 정규 표현식도 객체로써, 유용한 메서드를 사용할 수 있다. 


## 정규표현식 기본 문법

1. 리터럴표현식 사용

`/패턴/[플래그]`

`//`와 같이 2개의 슬래시 사이에 원하는 문자열을 넣어 비교하는 것을 리터럴 표현식이라고 한다. 

`[0-9]`는 0부터 9까지 즉, 모든 숫자를 의미하고 `g`패턴플래그는 `global`을 뜻하며 이를 이용해 비교하는 대상의 전체 문자열을 확인하여 `match()`메서드는 같은 것을 찾아 그 값들을 배열로 반환한다. 

```js
const str = 'a123';
const re = /[0-9]/g; // 숫자만 
str.match(re); // ['1', '2', '3'] // 문자열에서 숫자만 찾아서 배열로 반환한다. 

```


2. RexExp 객체생성자 사용

`new RexExp( 패턴 [, '플래그'])`  
`new RexExp('패턴'[, '플래그'])`

```js
const str = 'a123';
const re = new RegExp('[0-9]', 'g');
str.match(re);
```

## 정규표현식 패턴 작성하기

### 문자 그대로, 단순 패턴 사용하기

`/abc/`는 문자가 그대로 들어 있는 단어를 모두 고를때 사용한다. 아래 2문장은 모두 `abc`문자가 포함되어 있다. 

```
"Hi, do you know your abc's?"
"The latest airplane designs evolved from slabcraft."
````
하지만 아래문장은? `ab c`는 찾을 수 있지만 `abc`는 찾을 수 없다. 
```
"Grab crab"
```

### 패턴에 특수 문자 사용하기

| 표기법                     | 내용                                                                    | 예시                                                                                   |
|---                         |---                                                                     |---                                                                                      |
| [문자열] 혹은 [문자범위]     | 문자나 숫자 특수기호를 일치하는지 찾기                                     | `[abc]`: `a,b,c`가 포함되어 있는지                                                        |
|                            |                                                                         | `[a-z]` : 알파벳 소문자 전체                                                             |
|                            |                                                                         | `[A-Z]` : 알파벳 대문자 전체                                                             |
|                            |                                                                         | `[0-9]` : 숫자 전체                                                                     |
| [^문자열] 혹은 [^문자범위]   | 범위 외, 위와 반대로 부정을 뜻함, 표기된 문자열이 포함되지 않는 것 찾기      | `[^abc], [^a-z]`                                                                       |
| `.`                        | 아무 한 글자                                                             | `.y` : `y`로 끝나는 단어(한 글자 + y 형태 찾기)                                            |
| `\d`                       | 모든 숫자                                                                | `[0-9]` 와 같음                                                                        |
| `\D`                       | 숫자 외, 위와 반대                                                       | `[^0-9]`와 같음                                                                        |
| `\w`                       | 알파벳 대/소문자, 숫자 '_(언더바)'                                        | `[A-Za-z0-9_]`와 같음                                                                  |
| `\W`                       | 위의 반대(알파벳 대/소문자, 숫자, 언더바 외)                               | `[^A-Za-z0-9_]`와 같음                                                                 |
| `\s`                       | 공백, 탭, `form feed`, `line feed`, `unicode space`                      |                                                                                     |
| `\S`                       | 공백, 탭, `form feed`, `line feed`, `unicode space` 외                   |                                                                                     |
| `\t`                       | 탭                                                                      |                                                                                     |
| `\r`                       | `carriage`                                                              |                                                                                     |
| `\n`                       | `line feed`                                                             |                                                                                     |
| `[\b]`                     | 백스페이스                                                               |                                                                                     |
| `\`                        | 특수기호를 찾고 싶을때                                                    | `\,` : 콤마                                                                          |
| `&#124;`                   | `or` 기호를 의미                                                         | `\d&#124;\s` : 숫자나 공백                                                                |
| `^`                        | 입력값의 시작                                                            | `^1` : 1로 시작되는 것 1, 10, 101은 포함 21은 아님                                     |
| `$`                        | 입력값의 마지막                                                          | `t$` : `eat`은 해당 `eater`는 미해당                                                       |
| `\b`                       | 경계값, 공백이라고 생각하면 편할듯                                         | `\bm` : `moon`의 `m`은 해당, `oo\b` : `moon`의 `oo`는 다음에 공백이 아닌 `n`이 따라오므로 미해당|
| `\B`                       | 위와 반대, 문자라고 생각하면 편할듯                                        | `\Bon`: `noon의` `on`이 해당                                                               |
| `()`                       | `()`안과 일치하는 것을 찾고 그것을 기억해 놓는다.                           |                                                                                      |
| `\n`                       | `()`로 캡처된 `n`번째 것을 불러 쓸 수 있음                                 | `/apple(,)\sorange\1/`: `apple, orange, cherry, peach`에서 `apple, orange,`가 해당 된다.   |


### 플래그를 활용한 고급 탐색

| 플래그 | 설명                                | 대응하는 속성                       |
|---     |---                                 |-------------------------------------|
| g      | 전역 탐색. for문을 이용하는 것처럼 전체 탐색| RegExp.prototype.global (en-US)     |
| i      | 대소문자를 구분하지 않음.            | RegExp.prototype.ignoreCase (en-US) |
| m      | 여러 줄에 걸쳐 탐색.                | RegExp.prototype.multiline (en-US)  |
| d      | 부분 문자열 일치에 대해 인덱스 생성. | RegExp.prototype.hasIndices (en-US) |


### 정규표현식 유용한 메서드

```js
RegExp.prototype.exec(); // 일치하는게 있으면 배열로 없음 null 반환
RegExp.prototype.test(); // true, false 반환
str.match(리터럴표기); // 처음으로 일치하는 문자열 배열로 반환
str.matchAll(리터럴표기); // 일치하는 모든 결과를 배열로 반환
str.replace(리터럴표기, 변환할 문자열); // 일치하는 결과를 변환할 문자열로 치환하여 문자열로 반환
str.replaceAll(리터럴표기, 변환할 문자열); // 일치하는 모든 결과를 변환할 문자열로 치환하여 문자열로 반환
str.search(리터럴표기);// 일치하는 결과의 인덱스 반환 없으면 -1
str.split(리터럴표기); // 리터럴표기를 구분자로 삼아 해당 구분자로 나뉘 값을 배열로 반환
```

