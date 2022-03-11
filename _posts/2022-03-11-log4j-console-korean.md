---
layout: post
date: 2022-03-11 14:05:00 +0900
title: '[java] log4j 콘솔에서 한글 깨짐 수정'
categories:
  - java
tags:
  - log4j2
  - console
  - korean
---

* Kramdown table of contents
{:toc .toc}

## log4j2 한글 출력 인코딩 설정

`log4j2.xml` 설정파일에서 콘솔의 `<PatternLayout>` 에 `charset="UTF-8"` 설정 추가하면 끝

```
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="console" target="SYSTEM_OUT">
            <PatternLayout charset="UTF-8" pattern="[log4j]%d %5p [%c] %m%n" />
        </Console>
    </Appenders>
</xml>
```
