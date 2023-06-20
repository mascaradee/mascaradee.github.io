---
layout: post
date: 2022-10-27 09:05:00 +0900
title: '[vue] component props'
categories:
  - javascript
tags:
  - vue
  - props
---

* Kramdown table of contents
{:toc .toc}


# mave dependencies error

![에러](/images/maven-dependencies-error.png)

## 현상

- 깃커밋에서 새로 프로젝트를 클론한 후 메이븐 업데이트를 시도했으나 ht-common 이 넥서스에 등록되지 않아 제대로 디펜던시가 받아 지지 않음
- .m2 폴더에 일부만 다운로드 됨

## 해결

- .m2 폴더 제거
  => 다시 maven 다운로드를 했으나 계속 일부만 받아짐
- .m2 폴더에 기존에 깃랩에서 받아 사용하던 repository폴더 내용을 복사해서 넣음
  => 더 많은 디펜던시가 생성되나 3~4개 정도는 여전히 오류
- 깃커밋에서 ht_common 패키지 클론한 후 인텔리제이 모듈로 추가한후 maven-clean과 install 진행하니 모든 디펜던시가 받아짐
  => 이후 ht_common은 모듈에서 제거함. 원래 maven에 올라가 있는것을 참조해야 함.