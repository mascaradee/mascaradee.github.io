---
layout: post
date: 2021-01-17 15:35:00 +0900
title: '[java] maven'
categories:
  - java
tags:
  - maven
---

* Kramdown table of contents
{:toc .toc}

## 참고
[https://maven.apache.org/pom.html#What_is_the_POM](https://maven.apache.org/pom.html#What_is_the_POM)

## 메이븐 Maven

빌드와 라이브러리 관리
빌드 - 라이프 사이클

플러그인

메이븐 프로젝트 구조
.settings / .classpath/ .projet 파일은 이클립스 설정파일인데 메이븐 프로젝트일 경우에는 pom.xml을 바탕으로 해서 구성하게 된다.

pom.xml은 메이븐 설정파일인데

수정이 될때 마다 자동으로 메이븐 서버에 접속해서 업데이트가 되거나 프로젝트>우클릭>Maven> update project 로 수동으로 업데이트를 해 준다.

spring mvc maven

oracle ojdbc6 maven

검색하면 repository가 나오는데 위 2개가 서로 다르다. 스프링처럼 메이븐이 제공하는 공식사이트, Central에 해당 라이브러리가 올라가 있으면 굳이 추가로 <repository></repository> 설정을 하지 않아도 자동으로 설정된다. 하지만 ojdbc6 처럼 별도 서버에 있는 라이브러리인 경우 원격 저장소를 설정해 주어야만 해당 라이브러리를 가져다 쓸 수 있따.  


`%userprofile%\.m2` 폴더

## 폼파일 pom.xml

`POM`은 `Project Object Model`의 약자로, 메이븐 프로젝트의 빌드 과정에 사용되는 플러그인 설정뿐 아니라 프로젝트에 대한 모든 필수적인 정보로 구성되어 있다.  

```
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>mascaradee</groupId>
    <artifactId>Apple</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>war</packaging>

    <properties>
        <encoding>UTF-8</encoding>
        <java-version>1.8</java-version>
        <project.build.sourceEncoding>${encoding}</project.build.sourceEncoding>
        <project.reporting.outputEncoding>${encoding}</project.reporting.outputEncoding>
        <org.aspectj-version>1.8.0</org.aspectj-version>
        <logback-version>1.2.3</logback-version>
    </properties>

    <!-- 빌드 -->
    <build>
        <finalName>laboratory</finalName>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>${java-version}</source>
                    <target>${java-version}</target>
                    <encoding>${encoding}</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.2.3</version>
                <configuration>
                    <warSourceDirectory>src/main/webapp</warSourceDirectory>
                    <!-- <warSourceExcludes>api/**, css/**, error/**, guide/**, js/**, img/**,
                        pub/**, pub/**, template/**</warSourceExcludes> -->
                    <webXml>src/main/webapp/WEB-INF/web.xml</webXml>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <!-- 원격 저장소 설정 -->
    <repositories>
        <repository>
            <id>Datanucleus</id>
            <url>http://www.datanucleus.org/downloads/maven2/</url>
        </repository>
    </repositories>

    <!-- 라이브러리 -->
    <dependencies>
        <!-- unit test -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <!-- <version>LATEST</version> -->
            <scope>test</scope>
        </dependency>

        <!-- JDBC -->
        <!-- https://mvnrepository.com/artifact/oracle/ojdbc6 -->
        <dependency>
            <groupId>oracle</groupId>
            <artifactId>ojdbc6</artifactId>
            <version>11.2.0.3</version>
        </dependency>
    </dependencies>
</project>
```

## 프로젝트 설정 project

```
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>mascaradee</groupId>
    <artifactId>Apple</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</projet>
```
위는 메이븐 프로젝트를 위해 최소한으로 정의되어야하는 부분이다.  
`modelVersion`은 `POM` 모델 버전으로 현재는 4.0.0만 지원되고 필수요소이다.
`groupId, artifactId, version` 는 메이븐 프로젝트를 식별하는 정보로 필수요소이나 부모로부터 상속된 경우는 명시할 필요는 없다.

- groupId: 조직이나 프로젝트를 식별한다.
- artifactId: 보통 프로젝트명을 기술한다. 이클립스 프로젝트명과 동일하다.  
- version: 프로그램 버전이다. 기본적으로 `1.0-SNAPSHOT`이다.






### packaging
### properties

#### encoding
#### java-version
#### project.build.sourceEncoding
#### project.reporting.outputEncoding
#### org.aspectj-version
#### logback-version

### build
#### finalName
#### plugins
- plugin: kjlhkjhkj
    - artifactId
    - version
    - configuration

        - source
        - target
        - encoding

        - warSourceDirectory
        - webXml

### repositories
#### repository
- id
- url

### dependencies
#### dependency
- groupId
- artifactId
- version
- scope: compile, runtiem, provided, ... 생략하면
