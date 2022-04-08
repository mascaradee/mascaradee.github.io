---
layout: post
date: 2022-04-08 08:22:00 +0900
title: '[javascript] switch'
categories:
  - javascript
tags:
  - switch
---

* Kramdown table of contents
{:toc .toc}

## 참고

[switch](https://javascript.info/switch)


## Switch 문

다중 `if`를 대체할 수 있다. `case`문은 값과 타입의 일치여부를 판단하는 **일치연산**을 한 결과와 같고 `break`를 만날때까지 비교를 계속하고 같은 값이 없다면 `default`를 수행한다.

```
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

그런데 `break`가 없다면, 같은 조건은 만난 이후 모든 `case`를 수행해 버린다. 알고 그랬다면 모르겠다는데 실수로 `break`를 빼면 엉뚱한 결과가 나올지도

```js
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
  case 4:
    alert( 'Exactly!' ); // case 조건에 맞아 수행
  case 5:
    alert( 'Too big' ); // break가 없으므로 수행
  default:
    alert( "I don't know such values" ); // break가 없으므로 수행
}
```

같은 결과를 수행해야 할때, `case`문을 묶어서 사용할 수 있다. 이건 위 특징을 이용한 편법이다.

```js
let fruits = 'grape';

switch (fruits) {
  case 'apple':
  case 'grape': // if(fruits === 'apple' || fruits === 'grape')
    alert('My favorite!')
    break;
  default:
    alert('soso');
}
```

`switch/case`에는 모든 표현식을 쓸 수 있다. `+`를 문자 앞에 쓰면 숫자로 변환되므로 `+a`는 숫자 1이 된다.

```js
let a = "1";
let b = 0;

switch (+a) {
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;

  default:
    alert("this doesn't run");
}
```
