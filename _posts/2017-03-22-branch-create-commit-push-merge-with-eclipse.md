---
layout: post
date: 2017-03-22 17:48:00 +0900
title: '[git] branch create, commit, push, merge with eclipse'
categories:
  - git
tags:
  - branch
  - commit
  - push
  - merge
  - elcipse
---

## branch 생성, 커밋, 푸쉬, 머지

### 로컬

기준이 되는 master로 checkout  

new branch 생성  

![new-branch-in-eclipse](/images/gitImages/new-branch-in-eclipse.jpg)

대화창에 branch 이름을 입력하고 finish  

![branch-name-in-eclipse.jpg](/images/gitImages/branch-name-in-eclipse.jpg)

새로운 branch로 변경된 것을 확인    

![check-the-new-branch-in-eclipse.jpg](/images/gitImages/check-the-new-branch-in-eclipse.jpg)

소스를 수정한 뒤 수정한 소스를  index에 추가하고 commit and push를 눌러 커밋과 저장소에 push까지 한다.  

![add-index-in-eclipse.jpg](/images/gitImages/add-index-in-eclipse.jpg)  

![push-branch-in-eclipse.jpg](/images/gitImages/push-branch-in-eclipse.jpg)

![push-branch-in-eclipse2.jpg](/images/gitImages/push-branch-in-eclipse2.jpg)

![push-branch-in-eclipse3.jpg](/images/gitImages/push-branch-in-eclipse3.jpg)

### 개발  

개발계 브랜치로 checkout    

![checkout-the-branch-in-eclipse.jpg](/images/gitImages/checkout-the-branch-in-eclipse.jpg)

확인    

![checkout-the-branch-in-eclipse1.jpg](/images/gitImages/checkout-the-branch-in-eclipse1.jpg)

다른 사람이 커밋한 것이 있는지 확인 차원에서 저장소의 이력을 가져온다. pull    

![pull-branch-in-eclipse.jpg](/images/gitImages/pull-branch-in-eclipse.jpg)

![pull-branch-in-eclipse1.jpg](/images/gitImages/pull-branch-in-eclipse1.jpg)

개발계에는 내가 push한 소스가 아직 반영 되어 있지 않으므로 저장소에서 가져와 merge    

![merge-branch-in-eclipse.jpg](/images/gitImages/merge-branch-in-eclipse.jpg)

내가 수정한 소스를 선택한 후, merge   

![merge-branch-in-eclipse1.jpg](/images/gitImages/merge-branch-in-eclipse1.jpg)

![merge-branch-in-eclipse2.jpg](/images/gitImages/merge-branch-in-eclipse2.jpg)

개발계 branch push  

![another-push-in-eclipse.jpg](/images/gitImages/another-push-in-eclipse.jpg)

로컬에 있는 development 브랜치를 저장소에 있는 development와 합친다 (/images/gitImages/빨강을 파랑과)    

![push-remote-in-eclipse.jpg](/images/gitImages/push-remote-in-eclipse.jpg)

![push-remote-in-eclipse1.jpg](/images/gitImages/push-remote-in-eclipse1.jpg)

![push-remote-in-eclipse2.jpg](/images/gitImages/push-remote-in-eclipse2.jpg)

jenkins 빌드 배포 후 개발계 테스트    

![jenkins-build.jpg](/images/gitImages/jenkins-build.jpg)

![jenkins-build1.jpg](/images/gitImages/jenkins-build1.jpg)

![jenkins-build2.jpg](/images/gitImages/jenkins-build2.jpg)
