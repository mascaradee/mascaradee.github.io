---
layout: post
date: 2014-03-11 16:15:00 +0900
title: '[oracle] rownum'
categories:
  - oracle
tags:
  - rownum
---

## 쿼리 실행순서

1. from
2. where
3. select
4. rownum
5. order by

아래의 경우처럼 order by는 맨 마지막에 실행된다???  

```sql
SELECT /* sqlmap.tms.is.prod.isVtAcSql.selectIsVtAcNo */
            A.VT_AC_BK_C                                            /*가상계좌은행코드*/
         , A.VT_AC_NO                                               /*가상계좌번호*/
         , A.VT_AC_STC                                              /*가상계좌상태코드*/
         , A.FS_RG_USR_ID                                           /*최초등록사용자ID*/
         , TO_CHAR(A.FS_RG_DTM, 'YYYYMMDDHH24MISS') AS FS_RG_DTM    /*최초등록일시*/
         , A.LS_CHG_USR_ID                                          /*최종변경사용자ID*/
         , TO_CHAR(A.LS_CHG_DTM, 'YYYYMMDDHH24MISS') AS LS_CHG_DTM  /*최종변경일시*/
         , rownum rn
      FROM   TB_IS_VT_AC A
      WHERE A.VT_AC_BK_C = '004'
      AND   A.VT_AC_STC    = '1'
      ORDER BY LS_CHG_DTM desc;
```
![rownum1](/images/rownum1.jpg)

아래와 같이 한 번 더 감싸면 order by까지 적용이 된 후 rownum이므로 그것을 이용해 추가 활용할 수 있다.  

```sql
SELECT /* sqlmap.tms.is.prod.isVtAcSql.selectIsVtAcNo */
           AA.VT_AC_BK_C    /*가상계좌은행코드*/
         , AA.VT_AC_NO      /*가상계좌번호*/
         , AA.VT_AC_STC     /*가상계좌상태코드*/
         , AA.FS_RG_USR_ID  /*최초등록사용자ID*/
         , AA. FS_RG_DTM    /*최초등록일시*/
         , AA.LS_CHG_USR_ID /*최종변경사용자ID*/
         , AA.LS_CHG_DTM    /*최종변경일시*/
         , ROWNUM RN
         , R
FROM (SELECT A.VT_AC_BK_C                                           /*가상계좌은행코드*/
         , A.VT_AC_NO                                               /*가상계좌번호*/
         , A.VT_AC_STC                                              /*가상계좌상태코드*/
         , A.FS_RG_USR_ID                                           /*최초등록사용자ID*/
         , TO_CHAR(A.FS_RG_DTM, 'YYYYMMDDHH24MISS') AS FS_RG_DTM    /*최초등록일시*/
         , A.LS_CHG_USR_ID                                          /*최종변경사용자ID*/
         , TO_CHAR(A.LS_CHG_DTM, 'YYYYMMDDHH24MISS') AS LS_CHG_DTM  /*최종변경일시*/
        , ROWNUM R
      FROM   TB_IS_VT_AC A
      WHERE A.VT_AC_BK_C = '004'
      AND   A.VT_AC_STC    = '1'
      ORDER BY LS_CHG_DTM desc
      ) AA
WHERE ROWNUM < 10;
```
![rownum2](/images/rownum2.jpg)
