---
layout: post
date: 2020-12-15 16:00:00 +0900
title: '[html] emmet'
categories:
  - html
tags:
  - emmet
  - zen coding
---

* Kramdown table of contents
{:toc .toc}

## Emmet = Zen Coding

```html
<!-- 태그 하나 : div -->
<div></div>

<!-- 태그.클래스속성  '.' : div.test -->
<div class="test"></div>

<!--자식노드 '>':  div>ul>li -->
<div>
   <ul>
       <li></li>
   </ul>
</div>

<!-- 형제노드 '+': div>ul+ol -->
<div>
   <ul></ul>
   <ol></ol>
</div>

<!-- 원하는 개수만큼 '*': ul>li*5 -->
<ul>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
</ul>

<!-- 부모의 형제를 만들고 싶을때 '^' : div>ul>li^ol -->
<div>
   <ul>
       <li></li>
   </ul>
   <ol></ol>
</div>

<!-- 그룹화하기 '()' : div>(header>ul>li*2>a)+footer>p -->
<div>
   <header>
       <ul>
           <li><a href=""></a></li>
           <li><a href=""></a></li>
       </ul>
   </header>
   <footer>
       <p></p>
   </footer>
</div>

<!-- 태그 사이에 텍스트 넣기 '{}' : p{hello}  -->
<P>hello</P>

<!-- 자동숫자 할당 '$' : p.class${item$}*5 -->
<p class="class1">item1</p>
<p class="class2">item2</p>
<p class="class3">item3</p>
<p class="class4">item4</p>
<p class="class5">item5</p>

<!-- 더미용 텍스트, 숫자를 붙이면 그 만큼의 단어개수만큼만 나옴  'lorem' : p>lorem4 -->
<p>Lorem ipsum dolor sit.</p>
```
