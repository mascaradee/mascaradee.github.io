---
layout: post
date: 2022-10-20 09:05:00 +0900
title: '[vue] watchers'
categories:
  - vue
tags:
  - watchers
---

* Kramdown table of contents
{:toc .toc}

## 참고

[vue 왓쳐](https://vuejs.org/guide/essentials/watchers.html)


# watchers

DOM을 변경시킨다거나 비동기 조작 결과에 따라 상태를 변화시켜야 하는 경우와 같이, 상태 변화에 맞춰 추가적인 기능이 필요할 때 `watch` 옵션을 사용한다. 
기본 사용법은 `computed`옵션과 같이 `data()` 내 선언된 변수명과 동일한 함수명으로 함수를 정의하여 사용한다. 


## 기본 사용법

`watch`옵션의 `question`함수는 `question`프로퍼티의 값이 변경될때마다 실행이 된다. 질문에 `?`가 있으면  `getAnswer`함수가 호출되고 비동기 통신 후 결과값을 `p`태그에 바인딩되어 있는 `answer`프로퍼티에 넣는다. 

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  watch: {
    question(newQuestion, oldQuestion) { // 'some.nested.key(newValue) {}' 와 같이 '.'으로 연결된 경로로도 된다고 하는데 잘???
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
```

```html
<p>
  Ask a yes/no question:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

## Deep Watchers

`watch`는 기본적으로 중첩문의 프로퍼티까지 감시하진 않는다. 중첩 프로퍼티의 값변화까지 감시하려면  `Deep Watcher`를 사용해야 한다. `deep: true` 옵션을 추가하면 된다. 추가로 더 알아봐야할듯...

비용이 많이 드니 꼭 필요한 경우에만 사용할 것.

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true
    }
  }
}
```

## Eager Watchers

`watch`는 기본적으로 프로퍼티의 변화가 있을때만 호출이 되는데, 컴포넌트가 생성되자 마자 첫 실행을 하고 이후 값 변화가 있을 때마다 추가 호출이 되게 하고 싶으면  `Eager Watcher`를 쓰면 된다. `handler()`함수와  `immediate: true` 옵션을 추가하면 된다. 

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // this will be run immediately on component creation.
      },
      // force eager callback execution
      immediate: true
    }
  }
  // ...
}
```

## Callback Flush Timing

`watch`에 정의한 콜백함수는 뷰 컴포넌트가 업데이트 되기 전에 호출이 된다. 따라서 콜백에서 DOM에 접근을 한다면 업데이트 전의 상태로 접근을 한다는 의미이다. 만약 뷰 컴포넌트가 업데이트 되고 난 이후에 watcher 콜백에서 DOM에 접근하고 싶다면 `flush: 'post'`을 사용하면 된다. 

```js
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

## this.$watch()

`$watch()`로 함수를 만들 수 있다. 이거은 조건에 따라 watcher를 세팅하고 싶을때나 사용자 반응에 따라 뭔가를 감시하고싶을 때 유용하다. 또한 watcher를 일찍 중단할 때도 사용할 수 있다.

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```


## Watcher 중단

Watcher는 `watch`옵션이나 `$watch()`인스턴스 메소드로 선언할 수 있는데 이것은 소유자 컴포넌트가 unmounted 되었을 때 자동적으로 중단된다. 따라서 대부분의 경우에는 중단할 필요가 없다. 하지만 드문 경우로 강제로 중단을 해야 할 필요가 있는데 이때는 `$watch()`메소드의 리턴값을 이용하면 된다. 


```js
const unwatch = this.$watch('foo', callback)

// ...when the watcher is no longer needed:
unwatch()
```