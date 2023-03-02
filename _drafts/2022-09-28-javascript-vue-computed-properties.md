---
layout: post
date: 2022-09-28 09:05:00 +0900
title: '[javascript] computed properties'
categories:
  - javascript
tags:
  - vue
  - properties
  - computed
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 프로퍼티 계산](https://vuejs.org/guide/essentials/computed.html#basic-example)


# 프로퍼티 계산

## computed 

computed 속성은 반은성을 가진 프로퍼티를 계산할 때 사용한다. 템플릿 내에서 `{{}}` 내부에 표현식으로 계산을 할 수는 있으나 가독성면에서나 관리면에서 효율이 떨어지는 데 이걸 대신 할 수 있는 속성이다. 

## computed vs method

computed는 method내의 함수의 기능과 동일하다. 차이점은 computed는 반응성 프로퍼티가 변경이 없을 경우 캐시된 데이터를 사용한다는 점이다. 
method는 변경 여부에 상관없이 계산을 또 하는데 반해 computed는 자원활용을 더 효율적으로 하는 듯. 간단한 계산이면 이걸로 사용하는게 이득

단, 반응성 프로퍼티가 아니면 computed로는 값을 변경할 수 없다는 점도 유의해야 한다. 



## computed는 원래 쓰기는 안되는데...

computed는 기본적으로 쓰기는 안된다. 런타임씨 warning을 받는다. 

```
[Vue warn]: Write operation failed: computed property "fullName" is readonly. 
```

근데 굳이 써야 한다면 getter와 setter를 모두 가지고 있으면 경고가 뜨지 않는다. 


## 사이드 이펙트는 피할 것 

getter 내에서 사이드 이팩트는 피해야 한다. 

예를 들어 computed getter 내에서 비동기 요청이나 DOM을 변경하면 안된다. 

computed는 다른 값을 기반으로 간단한 계산만 할 수 있도록만 해야 한다. 


## computed 값을 변경하는 것은 피할 것 

computed는 반응성 프로퍼티로부터 파생된 값으로 프로퍼티 값은 계속 변경이 되므로 계산된 결과 값인 computed 값을 변경하는 것은 이치에 맞지 않다.





## computed와 watch의 차이점

watch는 단순히 프로퍼티가 변했을 경우 호출되는 콜백함수이고

computed 비슷해보여도 새로운 결과를 리턴해주는 차이점이 있다. 새로운 값을 만들어주는 역할인데....