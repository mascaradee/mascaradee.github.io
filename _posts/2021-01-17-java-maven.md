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
[https://mvnrepository.com/](https://mvnrepository.com/)


## 메이븐 Maven

메이븐은 빌드, 패키지, 테스트, 리포트, 배포관리를 쉽게 하기 위해 사용한다. 특히 빌드관리와 의존성 관계에 있는 라이브러리를 쉽게 사용할 수 있는 장점이 있다.


### 이클립스 메이븐 프로젝트 구조

`.settings, .classpath, .projet` 파일은 이클립스 설정파일인데 메이븐 프로젝트일 경우에는 `pom.xml`을 바탕으로 구성한다.  

### 폼파일 라이브러리 추가 add dependency

`spring mvc maven`와 `oracle ojdbc6 maven`을  검색하면 `repository` 항목이 나오는데 각 `Central`과 `Datanucleus`로 서로 다른 서버에서 제공된다. 스프링처럼 메이븐이 제공하는 공식사이트 `Central`에 해당 라이브러리가 올라가 있으면 `pom.xml`파일에 굳이 추가로 `<repository></repository> `설정을 하지 않아도 자동으로 설정된다. 하지만 `ojdbc6` 처럼 별도 서버에 있는 라이브러리인 경우 원격 저장소를 설정해 주어야만 해당 라이브러리를 가져다 쓸 수 있다.  

![maven-spring](/images/maven-spring.jpg)

![maven-ojdbc6](/images/maven-ojdbc6.jpg)

### 라이브러리 실제 경로

`%userprofile%\.m2` 폴더  

## 폼파일 pom.xml

`POM(Project Object Model)`은 메이븐 설정파일로 메이븐 프로젝트의 빌드 과정에 사용되는 플러그인 설정, 빌드 라이프 사이클, 구성 파일뿐만 아니라 관련된 개발자와 이들이 수행하는 역할, 결함 추적 시스템, 조직 및 라이선스, 프로젝트가있는 URL, 프로젝트 의존성(`dependency`) 등의 내용을 포함하고 있다. `pom.xml`이 수정될 때마다 자동으로 메이븐 서버에 접속해서 업데이트가 되거나 `프로젝트 우클릭 > Maven > update project` 로 수동으로 업데이트를 해 준다.  

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

### 프로젝트 설정 project

아래는 메이븐 프로젝트를 위해 최소한으로 있어야 하는 부분으로 `modelVersion`은 `POM` 모델 버전으로 현재는 4.0.0만 지원되고 필수항목이다. `groupId, artifactId, version` 는 메이븐 프로젝트를 식별하는 정보로 필수요소다. 단, `groupId, version`은 부모로부터 상속된 경우는 명시할 필요는 없이 생략이 가능하다.  

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

- `groupId`: 조직이나 프로젝트를 식별한다.   
- `artifactId`: 보통 프로젝트명을 기술한다. 이클립스 프로젝트명과 동일하다.
- `version`: 프로그램 버전이다. 기본적으로 `1.0-SNAPSHOT`이다.
- `packaging`: 패키징 형식을 기술한다. `pom, jar, maven-plugin, ejb, war, ear, rar`를 사용할 수 있다. 생략되어 있으면 기본적으로 `jar`다.
    - 참고: `jar (Java Archive)`와 `war (Web Application Archive)` 모두 자바의 압축 파일의 종류이며 어플리케이션을 쉽게 배포하고 동작시킬 수 있도록 있도록 관련 파일(리소스, 속성파일 등)들을 패키징한다.  


### 프로퍼티 설정 properties

아래 예시에서 `${encoding}`와 같이 `${속성}` 형태로 `POM`파일 내 어디서나 값에 접근할 수 있는 공통적으로 사용할 설정값 정보다. 태그명은 사용자가 지정한다. 필수항목은 아니다.  

```
<properties>
    <encoding>UTF-8</encoding>
    <java-version>1.8</java-version>
    <project.build.sourceEncoding>${encoding}</project.build.sourceEncoding>
    <project.reporting.outputEncoding>${encoding}</project.reporting.outputEncoding>
    <org.aspectj-version>1.8.0</org.aspectj-version>
    <logback-version>1.2.3</logback-version>
</properties>
```

### 빌드 설정 build

프로젝트 디렉토리 구조를 선언하고 플러그인을 관리한다.  

```
<build>
    <finalName>Apple</finalName>
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
```
- `finalName`: 최종 빌드 시 제공되는 프로젝트의 이름으로 파일 확장자는 없다. 기본적으로 `${artifactId}-${version}`으로 표기되므로 여기서는 `Apple-0.0.1-SNAPSHOT.war`를 의미한다.  
- `plugins`: 메이븐은 플러그인을 모아놓은 프레임 워크라고도 할 수 있으며 실제 작업은 플러그인에서 수행한다. `jar`,`war`파일 생성(패키징), 코드 컴파일, 단위 테스트 코드, 프로젝트 문서를 만드는 등 프로젝트에서 수행 할 수있는 거의 모든 작업이 플러그인으로 구현된다.  
    - `plugin`
        - `groupId`: 플러그인 그룹명  
        - `artifactId`: 플러그인명  
        - `version`: 플러그인 버전  
        - `configuration`: 플러그인에 따라 다른데 쉽게 말하면 플러그인의 속성을 지정할 수 있다. 예를 들면 `Bean`의 `getter, setter`를 여기에서 지정할 수 있다. 즉, `POM` 내의 `configuration` 요소로 플러그인 같은 다른 기본 시스템에 값을 전달한다.  
            - `source`: 컴파일 소스 자바 버전  
            - `target`: 컴파일 대상 자바 버전  
            - `encoding`: 컴파일 인코딩  
            - `warSourceDirectory`: `war` 패키징할 웹자원 경로  
            - `webXml`: `web.xml` 파일 경로  

### repositories

메이븐은 의존관계가 생길 때마다 먼저 로컬 라이브러리에서 찾아보고 없을 경우 리모트 저장소에서 다운받는데 기본적으로 메이븐 `central` 리모트 저장소를 이용한다.  
추가로 다른 저장소에서 다운 받아야 할 것이 있다면 `repositories`에 명시하면 된다.  

```
<repositories>
    <repository>
        <id>Datanucleus</id>
        <url>http://www.datanucleus.org/downloads/maven2/</url>
    </repository>
</repositories>
```
- `repository`: 주로 필요한 라이브러리가 메이븐 중앙서버가 아닌 별도 서버에 있을 때 해당 서버 정보를 나타낸다.  
    - `id`: 아이디
    - `url`: 서버 주소


### dependencies

필요한 라이브러리를 추가하거나 의존관계에 있는 라이브러리를 모아 놓은 목록으로 필수항목이다. 만약 추가된 라이브러리가 또 다른 라이브러리와 의존관계라면 그 라이브러리까지도 메이븐이 자동으로 다운받고 연결시켜 준다. 이런 기능을 '의존성 전이'라고 한다.  

```
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
```
- `dependency`: 라이브러리를 추가한다.  
    - `groupId`: 의존성 라이브러리에 추가하기 위한 필수값으로 프로젝트의 의존성을 구분하는데 사용된다.
    - `artifactId`: 의존성 라이브러리에 추가하기 위한 필수값으로 프로젝트의 의존성을 구분하는데 사용된다.
    - `version`: 선언한 곳 혹은 의존성에 따라 같은 라이브러리라도 버전이 다를 수 있으므로 이 버전에 맞춰서 라이브러리를 가져온다.
    - `scope`: 해당 라이브러리가 적용될 범위를 지정한다. 6가지 범위가 있다.
        - `compile`: 기본 범위로 `scope`를 명시하지 않으면 이 범위가 자동으로 지정된다. 모든 프로젝트 및 의존관계 프로젝트까지 사용할 수 있다.
        - `provided`: `JDK`나 톰캣 같은 컨테이너에 의한 런타임에 사용할 수 있다. 예를 들면 이미 자체 라이브러리를 제공하고 있는 어떤 컨테이너에 배포되는 웹어플리케이션에 사용한다. 이미 제공되는 자체 라이브러리를 사용할 것이므로 컴파일 혹은 테스트에서는 사용하지만 런타임 시에는 이 라이브러리를 사용하지 않겠다는 의미.
        - `runtime`: 컴파일 시에는 필요없지만 런타임에만 사용한다.
        - `test`: 테스트 시에만 해당 라이브러리를 사용한다. 테스트 컴파일과 런타임에서만 사용하고, 다른 프로젝트에 영향을 미치지 않는다. `Junit` 추가시 사용할 수 있다.
        - `system`: `provided`와 비슷하나, 저장소에서 관리되지 않고 직접 관리하는 `JAR`를 추가한다. 해당 범위에 있는 라이브러리는 `artifact` 단위에서는 항상 사용할 수 있지만 `repository`에 존재하지 않는다. 이 경우 `dependency` 설정에서 `systempath`를 추가해서 작성해야 한다.
        - `import`: 메이븐 2.0.9 에서 추가되었다. 이것 `<dependencyManagement>` 섹션에서 `pom`의 의존관계에 대해 사용된다. 지정된 `pom`이 해당 `pom`의 `<dependencyManagement>` 영역에 있는 의존관계로 대체됨을 뜻한다.
