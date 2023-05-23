---
layout: post
date: 2023-05-22 09:05:00 +0900
title: '[typescript] polymorphism
'
categories:
  - typescript
tags:
  - polymorphism
---

* Kramdown table of contents
{:toc .toc}

# 다형성

하나의 함수에 다양한 형태의 파라미터를 받을 수 있다. 제네릭을 이용하면 쉽게 구현 가능하다. 
`string`이든 `boolean`을 넘기든 제네릭은 호출 시 넘겨준 파라미터를 이용해 타입을 정의한다. 

```ts
interface MyStorage<T> {
  [key: string]: T
}

class LocalStorage<T> {
  private storage: MyStorage<T> = {}
  set(key:string, value:T) {
    this.storage[key] = value
  }
  get(key:string): T {
    return this.storage[key]
  }
  remove(key:string) {
    delete this.storage[key]
  }
  clear() {
    this.storage = {}
  }
}

const stringStorage = new LocalStorage<string>()
stringStorage.set('test', 'this is test');

const booleanStorage = new LocalStorage<boolean>()
booleanStorage.set('test', true)
```