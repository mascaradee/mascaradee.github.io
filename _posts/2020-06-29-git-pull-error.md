---
layout: post
date: 2020-06-29 00:00:00 +0900
title: '[git] pull error'
categories:
  - git
tags:
  - pull error
---

## git pull 에러

```
\Updating 6b5ee21..fe345e8
error: Your local changes to the following files would be overwritten by merge:
	application/config/config.php
	application/config/development/config.php
	application/config/production/config.php
	application/config/stage/config.php
	application/config/yeogi_config.php
	application/controllers/Coupon.php
	application/controllers/Event.php
	application/controllers/Member.php
	application/controllers/User.php
	application/controllers/api/Ipcc.php
	application/controllers/image/AdImageType.php
	application/libraries/Affiliatemigration.php
	application/libraries/Point_api.php
	application/libraries/Point_api_model.php
	application/libraries/image/AdImageTypeModule.php
	application/libraries/image/AdImageTypeService.php
	application/libraries/payment/payco/css/common.css
	application/models/AdImageTypeModel.php
	application/models/Coupons.php
	application/models/Members.php
	application/models/Orders.php
	application/models/Users.php
	application/views/event/categoryEventListView.php
	application/views/event/setCategoryEventView.php
	application/views/image/imageBTypeInfoView.php
	application/views/image/imageBTypePopup.php
	application/views/member/memformedit_step3_1_20151021.php
	application/views/member/memformedit_step5_timeform.php
	application/views/member/memformedit_step_ad.php
	application/views/member/memformedit_step_ad_edit.php
	application/views/member/memformedit_step_ad_form.php
	application/views/member/memformedit_step_ad_reg.php
	application/views/member/virtualAccountPaymentList.php
	application/views/user/userview.php
	public_html/js/cms/image/btype/image.group.service.js
	public_html/js/cms/image/btype/init.view.js
Please, commit your changes or stash them before you can merge.
error: The following untracked working tree files would be overwritten by merge:
	application/libraries/coupon/CouponApiRepository.php
	application/libraries/coupon/CouponApiService.php
	application/views/coupon/couponQuickOperate.php
	application/views/coupon/couponQuickUpdate.php
	application/views/coupon/marketingCoupons.php
	application/views/coupon/saleQuickCoupons.php
Please move or remove them before you can merge.
Aborting
```

`error: Your local changes to the following files would be overwritten by merge:`  
원격지에서 add 된 파일을 로컬에서도 내가 같은 파일을 생성했을때( 이 파일은 add도 안되어 있는 파일) 충돌이 나는 경우임

=> 해결책: 모든 변경사항을 HEAD 기준으로 로컬 초기화
```
git reset --hard
```

`error: The following untracked working tree files would be overwritten by merge:`  
=> 해결책: 내 로컬 파일 삭제, 한번도 add 되지 않은 파일은 git이 추적할수 없어 생기는 문제 내 로컬 파일을 지워서 맞춘다.
```
rm [파일명]
```
