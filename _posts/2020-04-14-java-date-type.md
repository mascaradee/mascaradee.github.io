---
layout: post
date: 2020-04-14 00:00:00 +0900
title: '[java] date type'
categories:
  - java
tags:
  - date type
  - Calendar
  - GregorianCalendar
---

## Date & SimpleDateFormat

```java
import java.util.Date;

Date date = new Date();
System.out.println("현재날짜 Date : "+ date);

SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
System.out.println("현재날짜 SimpleDateFormat(format) : "+ sdf.format(date)); // date -> text
System.out.println("현재날짜 SimpleDateFormat(parse) : "+ sdf.parse("2019-01-01")); // text -> date

// 현재날짜 Date : Tue May 28 09:52:08 KST 2019
// 현재날짜 SimpleDateFormat(format) : 2019-05-28
// 현재날짜 SimpleDateFormat(parse) : Tue Jan 01 00:00:00 KST 2019

```

## Calendar

- 추상클래스이므로 getInstance()로 생성

#### Calendar 상수

```java

import java.util.Calendar;

Calendar cal = Calendar.getInstance();
System.out.println("현재날짜 : "+ cal); // 오늘 2019-05-28

/*
java.util.GregorianCalendar
[time=1559005659003 // 1970년 1월 1일, 0:00:00 GMT 기준 밀리세컨
,areFieldsSet=true // 현재 시각과 맞는지 안 맞는지
,areAllFieldsSet=true // 타임존 설정과 관련 있는듯
,lenient=true // lenient모드이면 MONTH == JANUARY, DAY_OF_MONTH == 32 as February 1.로 해석됨
,zone=sun.util.calendar.ZoneInfo[id="Asia/Seoul",offset=32400000,dstSavings=0,useDaylight=false,transitions=14,lastRule=null]
,firstDayOfWeek=1 // 첫요일을 일요일로 할 건지 월요일로 할 건지 지정 -> 일요일로 지정
,minimalDaysInFirstWeek=1 //??
,ERA=1 // AD or BC in the Julian calendar
,YEAR=2019 // 올해 연도
,MONTH=4 // 1월은 0
,WEEK_OF_YEAR=22 // 년 기준 22번째 주
,WEEK_OF_MONTH=5 // 월 기준 5번째 주
,DAY_OF_MONTH=28 // 월 기준 28번째 일 = 오늘일자
,DAY_OF_YEAR=148 // 년 기준 148번째 일
,DAY_OF_WEEK=3 // 일요일 1이므로 화요일
,DAY_OF_WEEK_IN_MONTH=4 // 이번 달 4번째 화요일
,AM_PM=0 // 0:오전, 1:오후
,HOUR=10 // 현재시각(12시간제)
,HOUR_OF_DAY=10 // 현재시각(24시간제)
,MINUTE=7 // 현재 분
,SECOND=39 // 현재 초
,MILLISECOND=3 // 현재 밀리초
,ZONE_OFFSET=32400000 // 시차를 밀리세컨으로
,DST_OFFSET=0] // ??
*/

int day = cal.get(Calendar.DAY_OF_MONTH) ;
System.out.println("Calendar.DATE: "+ Calendar.DATE); // 5 -> DAY_OF_MONTH필드 (DAY_OF_MONTH = DATE)
System.out.println("Calendar.DAY_OF_MONTH : "+ Calendar.DAY_OF_MONTH); // 5 -> DAY_OF_MONTH필드
System.out.println("현재날짜 Calendar.DAY_OF_MONTH : "+ cal.get(Calendar.DAY_OF_MONTH)); // 28 (오늘) -> DAY_OF_MONTH필드의 상수값

```

#### Calendar 내장 메소드

```java

// Calendar 내장 메소드
Calendar cal = Calendar.getInstance();
Calendar cal1 = Calendar.getInstance();

// 1. get(), set(), add()
cal.get(Calendar.DAY_OF_MONTH)); // 오늘, 일
System.out.println("cal.getTime(); : "+ cal.getTime()); // Tue May 28 13:31:15 KST 2019
cal.set(Calendar.DAY_OF_MONTH, 7); // 7일로 세팅
System.out.println("cal.getTime(); : "+ cal.getTime()); // Tue May 07 13:31:15 KST 2019
cal.set(1970,1, 1, 1, 1); // set(년,월,일, 시, 분)
System.out.println("cal.getTime(); : "+ cal.getTime()); // Sun Feb 01 01:01:26 KST 1970
cal1.add(Calendar.DAY_OF_MONTH, 7); // 오늘 + 7일 계산
System.out.println("cal.getTime(); : "+ cal.getTime()); // Tue Jun 04 13:31:15 KST 2019

// 2. getTime(), setTime()
cal.getTime(); // 현재일시를 data타입으로 반환
System.out.println("cal.getTime(); : "+ cal.getTime()); // Tue May 21 13:12:39 KST 2019
cal.setTime(sdf.parse("2019-01-01")); // 원하는 일자로 세팅하여 date타입으로 반환
System.out.println("cal.setTime(): "+ cal.getTime()); // Tue Jan 01 00:00:00 KST 2019

```


#### GregorianCalendar

```java

GregorianCalendar gc = new GregorianCalendar(TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREA);
SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm00");
param.put("endDate", sdf.format(gc.getTime())); // 종료일세팅
gc.add(Calendar.DATE, -1);
param.put("startDate", sdf.format(gc.getTime())); // 시작일세팅

```
