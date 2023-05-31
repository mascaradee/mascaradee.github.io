---
layout: post
date: 2023-05-31 09:05:00 +0900
title: '[vue] setting
'
categories:
  - vue
tags:
  - setting
---

* Kramdown table of contents
{:toc .toc}


# 파일 수정 시 바로 빌드

`package.json`의 스크립트 명령어에  `--watch` 옵션을 추가한다. 

```json
  "scripts": {
    "build": "vite build --watch"
  },
```