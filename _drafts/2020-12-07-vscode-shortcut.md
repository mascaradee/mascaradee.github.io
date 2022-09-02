---
layout: post
date: 2020-12-07 00:00:00 +0900
title: '[etc] vscode shortcut'
categories:
  - etc
tags:
  - vscode shortcut
  - vscode extension
---

## 편집

- 라인 복사 : `shift + alt + up` 혹은 `down`
- 라인 이동 : `alt + up` 혹은 `down`
- 같은 단어 찾기 : `ctrl + d`
- 멀티커서 선택1 : `alt + click`
- 멀티커서 선택2 : `alt + shift + drag`

## 개발환경 동기화

- `ctrl + shift + p`로 팔레트를 열어 `sync turn on` 명령어로 현재 세팅 중 어떤 부분을 동기화할 것인지 선택한다. 그리고 `github` 아이디나 기타 다른 로그인 정보를 연결해  그 인증정보를 기준으로 세팅을 저장해 놓는다.  
- 다른 PC에서도 같은 세팅을 가져다가 쓸 수 있다.  

## vs extension

- 색상, 테마 : `Material theme`
- 아이콘 이쁘게 : `Material icon theme`
- 괄호끼리 색깔로 연결 : `bracket pair colorizer` -> vscode 내장으로 변경
- 들여쓰기별로 색깔 : `Indent-rainbow`
- `html`에서 앞에 태그를 변경하면 짝궁 `end` 태그도 같이 바뀜 : `Auto rename tag`
- `ctrl + 원하는 css`를 누름 정의된 `css` 파일로 찾아감 : `CSS PEEK`
- `css`파일에서 정의된 것을 `html` 클래스로 자동완성 : `HTML CSS SUPPORT`
- 실시간 서버 : `LIVE SERVER`
- `html`에서 먼저 클래스 정의한 다음 `css` 파일에서 자동 완성 가능 : `html to css autocompletion`
- 포맷터 : `Prettier`
- Numbering: 멀티캐럿으로 일련번호 넣을 수 있음 `ctrl+shif+alt+n`
  - [Numbering](https://marketplace.visualstudio.com/items?itemName=faressoft.numbering)
- vim: vscode 내에서 vi 명령어를 사용할 수 있음.


- 세팅    
  1) `Editor`: `Format On Save` - 파일 저장 시 포맷체크
  2) `Prettier`: `Tab Width` - 탭키 = 스페이스 2로(소스 길어지면 가독성 떨어지므로 )
  3) `JavaScript> Preferences`: `Quote Style - Single`로 변경
  4) `TypeScript> Preferences`: `Quote Style - Single`로 변경
