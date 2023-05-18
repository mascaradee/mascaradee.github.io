---
layout: post
date: 2023-05-18 09:05:00 +0900
title: '[typescript] class practice'
categories:
  - typescript
tags:
  - hashMap
---

* Kramdown table of contents
{:toc .toc}

# argument 없는 생성자 초기화 

```ts
class Dict1 {
    constructor(private words: Words) { }
    /*
     타입스크립트가 자동으로 아래처럼 변환
     constructor(words) {
         this.words = words;
     }
     */
}

class Dict {
    private words: Words
    constructor() { // argument가 없어도 오류나지 않도록 방지, 수동 초기화
        this.words = {}
    }
}


const dict1 = new Dict1(); // argument가 없으므로 오류
const dict = new Dict1(); // OK

```

# 해시맵

키와 값의 형태인 해시맵은 아래처럼 정의할 수 있다.

```ts
type Words = {
    [key: string]: string // "potato": "food" 형태 = key이름은 모르지만 타입을 알고 있을 때 사용
}
```


# 클래스를 데이터타입으로 사용하기

`add(word: Word)`를 보면 `Word`클래스를 데이터타입으로 사용한 것을 알 수 있다. 

```ts
type Words = {
    [key: string]: string
}

class Dict {
    private words: Words
    constructor() {
        this.words = {}
    }
    add(word: Word) {
       console.log(word)
    }
}
class Word {
    constructor(
        public term: string,
        public def: string
    ) { }
}
```

클래스 내에 메서드를 추가해서 테스트 해 보자 

```ts
type Words = {
    [key: string]: string
}


class Dict {
    private words: Words
    constructor() {
        this.words = {}
    }
    add(word: Word) {
        if(this.words[word.term] === undefined) {
            this.words[word.term] = word.def
        }
    }
    def(term: string) {
        return this.words[term]
    }
    delete(term: string) {
        Object.keys(this.words).forEach(i => {
            if(i === term) {
                delete this.words[i]
            }
        })        
    }
    update(term: string, def: string) {
        if(this.words[term] !== undefined) {
            this.words[term] = def
        }
    }
}

class Word {
    constructor(
        public term: string,
        public def: string
    ) { }
}

const kimchi = new Word('kimchi', '한국의 음식');
const kim = new Word('kim','해산물')
const dict = new Dict()

dict.add(kimchi);
dict.add(kim)
dict.def(kimchi.term);
dict.update('kim', '해조류')
dict.delete('kim')
```


