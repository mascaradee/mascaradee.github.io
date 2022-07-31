---
layout: post
date: 2022-07-31 19:05:00 +0900
title: '[jQuery] jQuery() 로 새로운 html 요소 만들기 '
categories:
  - jQuery
tags:
  - jQuery
---

* Kramdown table of contents
{:toc .toc}

## 참고

[jQuery()](https://api.jquery.com/jQuery/)


### jQuery 메서드로 html 요소 추가하기

`$()`에 매개변수로 문자열이 전달될때, 문자열에 `html`태그(`<>`)가 들어 있으면 `jQuery`는 
`DOM요소`를 생성해준다. 당연히 `<>`없이 문자열이 전달되면 셀렉터로 인식을 한다. 

`jQuery( html, attributes )`  
`$(html, attributes)`  
- `html`: `string`, `<>`로 둘러싸인 태그
- `attributes`: `object`, 태그가 가지는 속성을 모두 사용할수 있다. `id, class(className), type...`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="iamparent"></div>
    <script>
        let parent = $('#iamparent');
        let child = $('<div>', {
            id: 'child',
            text: 'i am child'
        });
        let grandchild = $('<input>', {
            id: 'grandchild',
            type: 'checkbox',
            checked: 'checked',
            'data-customAttrbute': '😍'
        });
        child.append(grandchild);
        parent.append(child);

        /* 위 결과는 아래처럼 된다. 
        <div id="iamparent">
          <div id="child">i am child
            <input id="grandchild" type="checkbox" checked="checked" data-customattrbute="😍">
          </div>
        </div>
        */
    </script>
</body>
</html>
````

실전에서는 주로 `$.ajax()`의 결과를 받아 추가 DOM요소를 구성할 때 쓰일 수 있다. 
