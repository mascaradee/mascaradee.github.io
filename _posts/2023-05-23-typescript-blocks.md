---
layout: post
date: 2023-05-23 09:05:00 +0900
title: '[typescript] blocks
'
categories:
  - typescript
tags:
  - blocks
---

* Kramdown table of contents
{:toc .toc}

# 블록체인 만들기


- 모듈 추가 시 에러 나면 정의파일이 있는 확인하기 
- 없으면 커뮤니티에서 제공하는 타입스크립트 타입을 내려받아 설치하면 쉽게 해결
- 그럼 외부 패키지도 손쉽게 가져다 쓸 수 있다. 


```ts
import crypto from "crypto"; // 모듈 추가, 정의파일 확인하기

interface BlockShape { // 객체 정의
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor( // 인터페이스의 모든 프로퍼티는 초기화가 필요
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calHash(prevHash, height, data); // hash는 여기서 초기화 
  }
  static calHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash} ${height} ${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex"); // 모듈은 임포트 후 사용 가능
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    //return this.blocks; // !! 이걸 받아서 누구나 블록을 생성할 수 있음. 보안이슈!!
    return [...this.blocks]; // 전재구문은 this.blocks을 주는게 아닌 인스턴스를 리턴하므로 this.blocks에는 영향력을 미칠 수 없다. 
  }
}



const blockchain = new Blockchain();

blockchain.addBlock("1st Block");
blockchain.addBlock("2nd Block");
blockchain.addBlock("3rd Block");

console.log(blockchain);

/*
Blockchain {
  blocks: [
    Block {
      prevHash: '',
      height: 1,
      data: '1st Block',
      hash: '24ac2bcd89f73fab4667a66fab4dae843388dd2d7fc8d37370e77d119636b949'
    },
    Block {
      prevHash: '24ac2bcd89f73fab4667a66fab4dae843388dd2d7fc8d37370e77d119636b949',
      height: 2,
      data: '2nd Block',
      hash: 'b153b5ca29ffe10caabe0282bfb265d41d15c04ccb72cdaeaf7cd4e67f70609a'
    },
    Block {
      prevHash: 'b153b5ca29ffe10caabe0282bfb265d41d15c04ccb72cdaeaf7cd4e67f70609a',
      height: 3,
      data: '3rd Block',
      hash: '78e38d8cac960f26c1380267700b7e144f7a8fce8d1cb6733e69419c4e062a85'
    }
  ]
}
*/

blockchain.getBlocks().push(new Block("xxxx", 1111, "HACKED")); // 이전 블록과 연결이 끊길 수 있다. 
console.log(blockchain.getBlocks());

/*
[
  Block {
    prevHash: '',
    height: 1,
    data: '1st Block',
    hash: '24ac2bcd89f73fab4667a66fab4dae843388dd2d7fc8d37370e77d119636b949'
  },
  Block {
    prevHash: '24ac2bcd89f73fab4667a66fab4dae843388dd2d7fc8d37370e77d119636b949',
    height: 2,
    data: '2nd Block',
    hash: 'b153b5ca29ffe10caabe0282bfb265d41d15c04ccb72cdaeaf7cd4e67f70609a'
  },
  Block {
    prevHash: 'b153b5ca29ffe10caabe0282bfb265d41d15c04ccb72cdaeaf7cd4e67f70609a',
    height: 3,
    data: '3rd Block',
    hash: '78e38d8cac960f26c1380267700b7e144f7a8fce8d1cb6733e69419c4e062a85'
  },
  Block {
    prevHash: 'xxxx',
    height: 1111,
    data: 'HACKED',
    hash: 'e592ae3f6955a958695d4c8db5187e97a2b36cf713332756b6b95465971652d1'
  }
]
*/
```


## 전개구문 참고 

```js
const o = [1, 2, 3] // 배열 정의
const oo = [...o] // 배열을 전개구문으로 새 배열 정의

console.log(o); // [1, 2, 3]
console.log(oo); // [1, 2, 3]

o.push(4); 
console.log(o); // [1, 2, 3, 4]
console.log(oo); // [1, 2, 3] -> o와 oo는 다른 객체이므로 o의 변화는 oo에 영향을 미치지 않는다. 
```