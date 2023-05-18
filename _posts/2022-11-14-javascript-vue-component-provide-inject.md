---
layout: post
date: 2022-11-14 09:05:00 +0900
title: '[javascript] vue component provide and inject'
categories:
  - javascript
tags:
  - vue
  - component
  - provide
  - inject
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue provide and inject](https://vuejs.org/guide/components/provide-inject.html)


## `provide`와 `inject`, 부모에서 데이터가 필요한 자식에게만 데이터 전달

보통은 데이터는 `props`를 이용해 부모로부터 자식에게 전달된다. 하지만 수많은 자식들이 있을 때 부모로부터 하나씩 타고내려가 자식에게 전달되는 상황이 생길 수도 있다. 이때 데이터가 필요없는 중간 자식들도 있을 것이다. 데이터가 계속 부모에서 자식에게 또 그 자식에게 차례대로 전달이 되는 것을 `props drilling`이라고 한다.   
불필요한 데이터 전달을 해결하기 위해 `provide`와 `inject`를 사용한다.  
부모 컴포넌트는 모든 자손을 위해 `의존성 제공자, dependency provider`가 된다. 깊이에 상관없이 하위 트리의 모든 컴포넌트는 상위 체인의 컴포넌트에서 제공하는 종속성을 주입, `inject` 할 수있다.


## Provide

후손 컴포넌트에 데이터를 제공하기 위해 `provide` 옵션을 사용한다. 

`provide: { 키:'값' }`   
`provide() { return { 키:'값'} }`


`message`는 의존성을 주입 받는 모든 후손 컴포넌트에서 사용할 수 있다. 

```js
export default {
  provide: {
    message: 'hello!'
  }
}
```

`data()` 선언과 함께 사용해야 한다면 `provide()`함수로 사용해야 한다. 단, 이것은 `reactive`도 주입되는 것은 아닌 값만 전달되는 것이다. 수정불가.

```js
export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      message: this.message
    }
  }
}
```

## App-level Provide

플러그인과 같이 앱 전체 레벨에 데이터를 전달해야 하는 경우 `App-level provide`를 사용할 수 있다. 


## inject

자식 컴포넌트에서 데이터를 받을 때는 `inject` 옵션을 사용한다. 컴포넌트 렌더링 시 주입이 먼저 이루어지므로 부모로부터 전달 된 데이터를 `data()`에서 접근할 수 있게 된다.  

`inject: ['키']`   


```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // injected value
  }
}
```

### 주입 로컬 키 설정

`inject: { 로컬키: { from: '키'}}`   

```js
export default {
  inject: {
    /* local key */ localMessage: {
      from: /* injection key */ 'message'
    }
  }
}
```

### 주입 기본 값 설정

보통 `inject`는 부모체인 중 어딘가에서 키를 제공한다는 가정하에 만들어진다. 만약 키가 제공되지 않는다면 런타임 시 경고가 뜬다.  

`inject: { 로컬키: { from: '키', default: '기본값'}}`  

TBD

```js
export default {
  // object syntax is required
  // when declaring default values for injections
  inject: {
    message: {
      from: 'message', // this is optional if using the same key for injection
      default: 'default value'
    },
    user: {
      // use a factory function for non-primitive values that are expensive
      // to create, or ones that should be unique per component instance.
      default: () => ({ name: 'John' })
    }
  }
}
```


## 반응성으로 작업하기

반응성까지 주입을 하기 위해서는 `computed()`함수를 사용한다. 

```js
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // explicitly provide a computed property
      message: computed(() => this.message)
    }
  }
}
```

 `computed()`함수는 보통 Compostion API에서 사용하지만 Option API에서도 사용할 수 있다. 뷰 3.3 이하 버전에서는 `app.config.unwrapInjectedRef = true` 설정을 해야 된다.  

## Symbol 키로 설정하기 

많은 의존성이 있는 큰 앱이나 다른 개발자들이 사용해야 하는 컴포넌트를 만들게 될때 충돌울 피하기 위해 주입 키는 `Symbol`로 만드든 것이 가장 좋다.  

TBD

```js
// keys.js
export const myInjectionKey = Symbol()
```

```js
// in provider component
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* data to provide */
      }
    }
  }
}
```

```js
// in injector component
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```