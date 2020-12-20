---
layout: post
date: 2017-11-20 14:40:00 +0900
title: '[java] POI API'
categories:
  - java
tags:
  - POI API
---

* Kramdown table of contents
{:toc .toc}

## 참고
- [POI API1](https://ko.wikipedia.org/wiki/%EC%95%84%ED%8C%8C%EC%B9%98_POI)
- [POI API2](http://poi.apache.org/spreadsheet/quick-guide.html)


## 요청사항

1. 컬럼추가항목: 정상/이월(FORMAL_GB), 택배사명(DELIVERY_ENTR_NM), 구매경로 (WM_GB, ATTR_C3)
2. 헤더텍스트변경항목: 상품명(->상품코드), 출고처명(<->출고처코드), 결재수단(-> 결제수단)
3. 스타일변경항목: 질문 제목, 질문 내용  
- 엑셀 기능 기준 '텍스트 왼쪽 맞춤' = 현재 가운데 정렬
- 열 너비 60 고정 = 현재 254
- 텍스트 줄 바꿈 적용 = 현재 미적용
- 줄 바꿈 (엔터) 표시 삭제 = 텍스트 입력시 사용한 줄 바꿈 표시가 텍스트에 포함 되어 있어 제외 필요
4. 노출형식변경항목: 답변구분(코드값노출로)
5. 반영 취소: 입점 업체명 -> 출고처명으로 대체로 미반영대상


## 소스 분석 및 수정사항

### 특정 열 너비고정

```java
public static final String CHAR_LEFT_WRAP_TEXT_FIXED_WIDTH = "CHAR_LEFT_WRAP_TEXT_FIXED_WIDTH"; // 문자 왼쪽 정렬 + 자동 줄바꿈 기능 + 고정너비

private void createHSSFWorkbook(String excelFile
            , List<LSMap> dataList
            , String title
            , String[] listTitles
            , String[] cellNames
            , String[] cellTypes
            , String sheetName) throws Exception {
    (중략)

    // Adjusts the column width to fit the contents
    for (int k = 0; k < cellCount; k++) {
        //sheet.autoSizeColumn(k);
        if (cellTypes[k].equals(IMG_CENTER)) {
            //sheet.setColumnWidth(k, (short)15);
            sheet.setDefaultColumnWidth((short)13);
        } else {
            sheet.autoSizeColumn(k);
        }
        // 질의제목, 질의내용 너비고정(엑셀셀너비기준 60)
        if(cellTypes[k].equals(CHAR_LEFT_WRAP_TEXT_FIXED_WIDTH)){
            sheet.setColumnWidth(k, (short)15550);
        }
    }
    (중략)
}
```

###  왼쪽정렬, 줄바꿈 세팅

```java
private Map<String, CellStyle> createStyles(Workbook wb) {
     (중략)
    // Character type and left alignment style and Wrap Text
    style = createBorderedStyle(wb);
    style.setAlignment(CellStyle.ALIGN_LEFT); // 왼쪽정렬
    style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
    style.setWrapText(true); // 줄바꿈
    style.setFont(defaultFont);
    styles.put(CHAR_LEFT_WRAP_TEXT_FIXED_WIDTH, style);
     (중략)
}
```

### 데이터 행높이고정 취소 (대량 텍스트용)

```java
private void createDataRow(Sheet sheet
        , List<LSMap> dataList
        , int listCount
        , int pos
        , int cellCount
        , String[] cellNames
        , String[] cellTypes
        , Map<String, CellStyle> styles) throws Exception {
    (중략)
    boolean hasLongText = false;
    if (listCount > 0){
        for (int z = 0; z < cellCount; z++) {
            // 장문의 텍스트가 들어간 컬럼은 행높이 고정취소
            if (cellTypes[z].equals(CHAR_LEFT_WRAP_TEXT_FIXED_WIDTH) ){
                hasLongText = true;
                break;
            }
        }
    }

    for (int j = 0; j < listCount; j++) {
        LSMap dataMap = (LSMap)dataList.get(j);
        Row row = sheet.createRow(j + (pos + 1));

        if (hasImage) // 이미지가 있는 경우 row 크기 조정
            row.setHeightInPoints(50.5f);
        else if(hasLongText) // 장문의 텍스트가 들어간 컬럼은 행높이 고정취소
            row.setHeightInPoints(-1);
        else
            row.setHeightInPoints(16.5f);

          (중략)
      }
}
```

### 신규스타일에 DB조회값 세팅 추가

```java
for (int k = 0; k < cellCount; k++) {
    Cell cell = row.createCell(k);

    if (cellTypes[k].equals(CHAR_LEFT) ||
        cellTypes[k].equals(CHAR_CENTER) ||
        cellTypes[k].equals(CHAR_RIGHT) ||
        cellTypes[k].equals(CHAR_LEFT_WRAP_TEXT)||
        cellTypes[k].equals(CHAR_CENTER_WRAP_TEXT)||
        cellTypes[k].equals(CHAR_RIGHT_WRAP_TEXT) ||
        cellTypes[k].equals(CHAR_LEFT_WRAP_TEXT_FIXED_WIDTH)){ // =======> CHAR_LEFT_WRAP_TEXT_FIXED_WIDTH 추가
        cell.setCellValue(dataMap.getString(cellNames[k]));
    } else if (cellTypes[k].equals(INT_RIGHT)) {
        cell.setCellValue(StringUtil.getAddComma(dataMap.getInt(cellNames[k])));
    }

(중략)
}
```

### 줄 바꿈 (엔터) 표시 삭제 = 텍스트 입력시 사용한 줄 바꿈 표시가 텍스트에 포함 되어 있어 제외 필요

DB에서 아래와 같이 변경하여 조회한다.

```sql
REPLACE(DBMS_LOB.SUBSTR (A.QUESTION ,1500,1), CHR(13), '') AS QUESTION  --엑셀에 엔터표시(음표) 제거
```
