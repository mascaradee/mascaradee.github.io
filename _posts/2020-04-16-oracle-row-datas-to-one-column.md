---
layout: post
date: 2020-04-16 00:00:00 +0900
title: '[oracle] row datas to one column'
categories:
  - oracle
tags:
  - array
  - string
  - array to string
---

## WM_CONCAT
정렬없이 구분자(,)로 합칠수 있음, CLOB 리턴, 하지만 오라클 버전에 따라 CLOB이 되지 않는 경우 있음. 그런데 오라클 버전은 11.2.0.3.0인데 가능하기도 함;

## LISTAGG
정렬하여 구분자(,)로 합칠수 있음, VARCHAR2 리턴, 4000byte 제한

## XMLAGG
정렬하여 구분자(,)로 합칠수 있음, VARCHAR2(4000byte 제한) 혹은 CLOB 리턴
