---
layout: post
date: 2023-06-05 00:00:00 +0900
title: '[javascript] new things in 2023'
categories:
  - javascript
tags:
  - what'snew
---


# 자바스크립트 2023

1. 배열의 마지막 요소 찾기 

`Array.findLast()`는 배열을 역순으로 반복하여 조건에 맞는 첫번째 요소 값을 반환한다. 만족하는 요소가 없다면 `undefined` 반환
`Array.findLastIndex()`는 배열을 역순으로 반복하여 조건에 맞는 첫번째 요소의 인덱스를 반환한다. 만족하는 요소가 없다면 `-1`을 반환



```js
const array = [{a: 1, b: 1}, {a: 2, b: 2}, {a: 3, b: 3}, {a: 4, b: 4}]

console.log(array.findLast(n => n)); // {a: 4,b: 4}

console.log(array.findLast(n => n.a * 5 === 20)); //  {a:4,b:4} as the condition is true so it returns the last element.

console.log(array.findLast(n => n.a * 5 === 21)); // undefined as the condition is false so return undefined instead of {a:4,b:4}.

console.log(array.findLastIndex(n => n.a * 5 === 21)); //  -1 as the condition is not justified for returning the last element.

console.log(array.findLastIndex(n => n.a * 5 === 20)); //  3 which is the index of the last element as the condition is true.
```

2. 특별 주석, hashbang comment

`//`주석과 다를바 없지만, 스크립트나 모듈의 절대 시작부분에서만 공백없이 `#!` 로 시작하는 것만 다르다. 스크립트를 실행할 때 사용할 인터프리터를 운영 체제에 알려주는 스크립트 시작 부분의 특수 행이다. `#!/usr/bin/env node`는 자체실행파일로  `Node.js`소스 파일을 직접 호출한다.

```js
#!/usr/bin/env node
// in the Script Goal
'use strict';
console.log(2*3);

#!/usr/bin/env node
// in the Module Goal
export {};
console.log(2*2);
```

3. WeakMap의 키로 사용하는 심볼

현재 WeakMap의 객체만 키로 허용하지만 원시타입 중 심볼은 유니크한 값만을 가지고 다시 생성할 수 없으므로 객체 대신 WeakMap의 키로 사용 할 수 있다. 

```js
const weak = new WeakMap();

const key = Symbol('my ref');
const someObject = { a:1 };

weak.set(key, someObject);
console.log(weak.get(key));
```

4. 복사로 배열 변경

기존 배열에 변경을 하는 대신 복사한 새 배열에 변경을 적용해 반환한다. 

- `Array.prototype.toReversed()`
  - 배열의 요소를 뒤집힌 순서대로 새 배열로 반환 
  - `Array.prototype.reverse()` 이건 기존 배열을 변환해서 반환
- `Array.prototype.toSorted(compareFn)`
  - 요소의 정렬을 조건에 맞춰 새 배열로 반환
  - `Array.prototype.sort(compareFn)` 이건 기존 배열 변환해서 반환

- `Array.prototype.with(index, value)`
  - 배열의 원하는 index의 값을 변경하여 새 배열로 돌려준다. 원본은 유지

- `Array.prototype.toSpliced(start, deleteCount, ...items)`
  - `toSpliced(시작인덱스, 시작인덱스부터 삭제할 요소 수)`로 새 배열로 반환 
  - `slice(시작인덱스, 종료인덱스(미포함))` 역시 새 배열을 반환, 원본은 유지되므로 참고
 