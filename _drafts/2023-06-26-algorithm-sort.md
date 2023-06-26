---
layout: post
date: 2023-06-26 19:05:00 +0900
title: '[algorithm] sort'
categories:
  - algorithm
tags:
  - bubble-sort
  - selection-sort
---

* Kramdown table of contents
{:toc .toc}

## 참고

[버블정렬](https://ko.wikipedia.org/wiki/%EB%B2%84%EB%B8%94_%EC%A0%95%EB%A0%AC)


## 정렬

검색, 데이터 분석 등을 위한 알고리즘

## 버블정렬

버블이 수면으로 올라오는 듯한 모양으로 정렬의 양상이 보여지기 때문에 버블정렬이라고 불리운다. 복잡도가 높지만 코드가 단순해서 교육용으로는 많이 사용되지만 실제로는 많이 사용되지 않는다. 최악의 경우 모든 항목을 바꿔야 하므로 효과적인 정렬 방법은 아니고 시간복잡도도 높다. O(n^2)  

오름차순 정렬을 한다고 하면, 배열의 인덱스만큼 루프를 돌면서 첫번째 값과 두번째 값을 비교하여 첫번째(기준) 값이 크면 자리변경을 한다. 이러면 큰 값이 뒤로 가게 된다. 단, 한 루프당 마지막 항목은 정렬이 완성된 상태라고 보고 마지막 항목은 비교에서 제외한다.  


```js
function bubbleSort(arr) {
  let index = arr.length - 1;
  for (let loop = index; loop > 0; --loop) { // arr.length -1: 기준 제외한 비교대상의 개수만큼 루프
    console.log('loop: ', loop);
    for (let comp = 0; comp < loop; ++comp) { // comp < loop: 한 루프당 마지막 항목은 정렬이 완성되므로 제외
      console.log('comp:', comp);
      if (arr[comp] > arr[comp + 1]) { // 최소인덱스와 다음인덱스값을 비교해서 최소인덱스가 크면 자리 바꿈
        [arr[comp], arr[comp + 1]] = [arr[comp + 1], arr[comp]];
        console.log('changed arr: ', arr);
      }
    }
  }


}

const arr = [4, 3, 2, 1];
bubbleSort(arr);

/*
비교 6회, 변경 6회
loop:  3
comp: 0
changed arr:  (4) [3, 4, 2, 1]
comp: 1
changed arr:  (4) [3, 2, 4, 1]
comp: 2
changed arr:  (4) [3, 2, 1, 4]
loop:  2
comp: 0
changed arr:  (4) [2, 3, 1, 4]
comp: 1
changed arr:  (4) [2, 1, 3, 4]
loop:  1
comp: 0
changed arr:  (4) [1, 2, 3, 4]
*/
```


## 선택정렬

버블정렬과 비슷하게 비교를 하나 자리바꿈이 더 적다.  하지만 시간복잡도는 역시 높다. O(n^2)  

오름차순 정렬을 한다고 하면, 배열의 인덱스만큼 루프를 도는데 그 전에 기준이 되는 인덱스를 저장해 놓는다. 첫번째 값과 두번째 값을 비교하여 더 작은 값의 인덱스로 기준 인덱스를 대체한다. 그리고 한 루프가 끝난 후에만 기준 인덱스의 변경 여부를 판단하여 값의 위치를 변경한다. 

```js
function selectionSort(arr) {
  for (let loop = 0; loop < arr.length - 1; ++loop) { // arr.length -1: 기준 제외한 비교대상의 개수만큼 루프
    let minIndex = loop; // 비교기준
    console.log('loop: ', loop);
    console.log('minIndex: ', minIndex);
    for (let comp = loop + 1; comp < arr.length; ++comp) { // comp = loop + 1 : 한 루프당 첫 항목은 정렬이 완성되므로 제외
      console.log('comp: ', comp);
      if (arr[minIndex] > arr[comp]) {
        minIndex = comp;
      }
    }
    console.log('changed minIndex: ', minIndex);

    if (loop != minIndex) { // 최소값의 인덱스가 변경된 경우만
      [arr[minIndex], arr[loop]] = [arr[loop], arr[minIndex]]; // 루프당 한번만 자리를 바꾼다. 
      console.log('changed arr: ', arr);
    }

  }

}

const arr = [4, 3, 2, 1];
selectionSort(arr);

/*
비교 6회, 변경 2회
loop:  0
minIndex:  0
comp:  1
comp:  2
comp:  3
changed minIndex:  3
changed arr:  (4) [1, 3, 2, 4]
loop:  1
minIndex:  1
comp:  2
comp:  3
changed minIndex:  2
changed arr:  (4) [1, 2, 3, 4]
loop:  2
minIndex:  2
comp:  3
changed minIndex:  2
 */
```

 ## 삽입정렬

 오름차순 정렬일떄, 1번 인덱스부터 시작하여 왼쪽 인덱스값(첫 비교시, 0번 인덱스)와 오른쪽 인덱스 값을 비교하여 왼쪽값이 더 크면 자리 바꾸고 다음 루프로 간다. 계속 반복비교하고 왼쪽값이 계속 작을때까지 비교를 하여 정렬을 한다.  셋 중 가장 빠르지만 역시 시간복잡도는 높다.  O(n^2)

