---
layout: post
date: 2020-09-14 22:00:00 +0900
title: '[javascript] strict mode'
categories:
  - javascript
tags:
  - strict mode
---

* Kramdown table of contents
{:toc .toc}

## 참고
[더 많음 엄격 모드 예시 참고](https://noritersand.github.io/javascript/javascript-%EC%97%84%EA%B2%A9-%EB%AA%A8%EB%93%9C-strict-mode/)

## 엄격 모드

로컬변수 `a`는 함수 스코프를 벗어나서 호출이 되었으므로 `undefined`이지만  
`var` 없이 정의되고 값이 할당된 `b`는 자동으로 전역변수로 생성이 되므로 함수 밖에서도 사용할 수 있다.  

```js
(function() { // non-strict mode
	var a = 1;
	b = 2; // var를 생략해서 일종의 전역변수가 생성됨.
})();

console.log(typeof a); // undifined
console.log(typeof b); // number
```

하지만 `strict mode` 를 적용하면 `var`없이 변수를 정의 하는 것은 금지된다.

```js
'use strict';

(function() {
	var a = 1;
	b = 2; //  Uncaught ReferenceError: b is not defined
})();
````

엄근진 모드는 페이지 상단에 있으면 페이지 전체에 영향을 주지만,  
함수 내부에 있으면 해당 함수에만 영향을 준다.

```js
(function() {
	c = 1;
})();
console.log(typeof c); // number

(function() {
		'use strict';
		x = 1; // Uncaught ReferenceError: x is not defined
	})();
````

전역 함수의 `this`는 소유주를 의미한다. `supportStrictMode()`가 엄격 모드가 아니었다면  
`this` 는 `window`를 의미하지만 엄격 모드일 경우에는 `undefined`가 된다.  
단, 로컬 함수일 경우에는 엄격 모드일지라도 `this`는 소유주인 `obj`를 가리킨다.  

```js
(function supportStrictMode() {
	'use strict';
	console.log(1, this); // 엄격 모드에서 전역 함수의 this는 undefined
})();

var obj = {
	fn: function() {
		'use strict';
		console.log(2, this); // obj가 출력된다. 전역 함수가 아니므로
	}
}
obj.fn();
```
