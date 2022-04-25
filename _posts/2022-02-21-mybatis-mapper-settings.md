---
layout: post
date: 2022-02-22 07:59:00 +0900
title: '[mybatis] 매퍼설정'
categories:
  - mybatis
tags:
  - mybatis
---

* Kramdown table of contents
{:toc .toc}


## 참조

[마이바티스 공식](https://mybatis.org/mybatis-3/ko/index.html)


## 마이바티스란?

자바 퍼시스턴스 프레임워크의 하나로 XML 서술자나 어노테이션을 사용하여 저장 프로시저나 SQL문으로 객체를 연결시킨다.
마이바티스는 ibatis 3.0의 포크임. 버전이 다르지만 같은 식구란 뜻

마이바티스는 SQL, 저장프로시저 그리고 몇가지 고급 매핑을 지원하는 퍼시스턴스 프레임워크로 JDBC로 처리하는 상당부분의 코드와 파라미터 설정 및 결과 매핑을 대신해준다.
마이바티스는 데이터베이스 레코드에 원시타입과 Map 인터페이스 그리고 자바 POJO 를 설정해서 매핑하기 위해 XML과 애노테이션을 사용할 수 있다.


### 지속성 프레임워크(Persistence Framework)

지속성 프레임워크(Persistence Framework)는 데이터의 저장, 조회, 변경, 삭제를 다루는 클래스 및 설정 파일들의 집합이다.
지속성 프레임워크를 사용하면 JDBC 프로그래밍의 복잡함이나 번거로움 없이 간단한 작업만으로 데이터베이스와 연동되는 시스템을 빠르게 개발할 수 있으며 안정적인 구동도 보장한다.



## 마이바티스 설정

메이븐에서 마이바티스를 받아 세팅하는듯...

### properties

db 접속 정보 설정파일 `config.properties`

```
xxx.mysql.DriverClassName=net.sf.log4jdbc.DriverSpy
xxx.mysql.Url=jdbc:log4jdbc:mysql://128.00.0.000:3306/ourdb
xxx.mysql.UserName = ourdb
xxx.mysql.Password = 1234!
```

별도 properties 파일에 설정되어 있는 db 접속 정보값으로 대체하여 사용 할 수 있다. `context-datasource.xml`

```
<bean id="xxx.dataSource" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${xxx.mysql.DriverClassName}"/>
    <property name="url" value="${xxx.mysql.Url}"/>
    <property name="username" value="${xxx.mysql.UserName}"/>
    <property name="password" value="${xxx.mysql.Password}"/>
</bean>
```

sql 매핑 설정 `context-mapper.xml`

```
<bean id="xxx.sqlSession" class="org.mybatis.spring.SqlSessionFactoryBean">
  <property name="dataSource" ref="xxx.dataSource"/>
  <property name="configLocation" value="classpath:/egovframework/mapper/config/mapper-config.xml" />

  <property name="mapperLocations">
    <list>
      <value>classpath:/egovframework/mapper/com/**/*.xml</value>
    </list>
  </property>
</bean>
```

#### 속성 로드 순서

properties 엘리먼트에 명시된 속성을 가장 먼저 읽는다.  
properties 엘리먼트의 클래스패스 자원이나 url 속성으로 부터 로드된 속성을 두번째로 읽는다. 그래서 이미 읽은 값이 있다면 덮어쓴다.  
마지막으로 메소드 파라미터로 전달된 속성을 읽는다. 앞서 로드된 값을 덮어쓴다.  
그래서 가장 우선순위가 높은 속성은 메소드의 파라미터로 전달된 값이고 그 다음은 자원 및 url 속성이고 마지막은 properties 엘리먼트에 명시된 값이다.


### settings

런타임시 마이바티스의 행위를 조정하기 위한 세팅값
더 많은 값들은 [공식문서](https://mybatis.org/mybatis-3/ko/configuration.html) 참조

`egovframework/mapper/config/mapper-config.xml`

```
<settings>
  <setting name="mapUnderscoreToCamelCase" value="true"></setting>
  <setting name="jdbcTypeForNull" value="VARCHAR"></setting>
  <setting name="logImpl" value="LOG4J2"/>
</settings>
```

### typeAliases

자바타입에 대한 별칭

```
 <select id="getInfo" parameterType="string" resultType="long">
```

| 별칭       | 매핑된 타입 |
|------------|-------------|
| _byte      | byte        |
| _long      | long        |
| _short     | short       |
| _int       | int         |
| _integer   | int         |
| _double    | double      |
| _float     | float       |
| _boolean   | boolean     |
| string     | String      |
| byte       | Byte        |
| long       | Long        |
| short      | Short       |
| int        | Integer     |
| integer    | Integer     |
| double     | Double      |
| float      | Float       |
| boolean    | Boolean     |
| date       | Date        |
| decimal    | BigDecimal  |
| bigdecimal | BigDecimal  |
| object     | Object      |
| map        | Map         |
| hashmap    | HashMap     |
| list       | List        |
| arraylist  | ArrayList   |
| collection | Collection  |
| iterator   | Iterator    |


### typeHandlers

마이바티스가 PrepareStatement 파라미터를 설정하고 ResultSet에서 값을 가져올때마다 TypeHandler는 적절한 자바 타입의 값을 가져오기 위해 사용된다.
아래에 명시되지 않은 타입은 사용자가 따로 정의하여 사용 할 수 있다.


| 타입 핸들러                | 자바 타입                     | JDBC 타입                                                                      |
|----------------------------|-------------------------------|------------------------------------------------------------------------------|
| BooleanTypeHandler         | java.lang.Boolean, boolean    | 어떤 호환가능한 BOOLEAN                                                       |
| ByteTypeHandler            | java.lang.Byte, byte          | 어떤 호환가능한 NUMERIC 또는 BYTE                                              |
| ShortTypeHandler           | java.lang.Short, short        | 어떤 호환가능한 NUMERIC 또는 SMALLINT                                          |
| IntegerTypeHandler         | java.lang.Integer, int        | 어떤 호환가능한 NUMERIC 또는 INTEGER                                           |
| LongTypeHandler            | java.lang.Long, long          | 어떤 호환가능한 NUMERIC 또는 BIGINT                                            |
| FloatTypeHandler           | java.lang.Float, float        | 어떤 호환가능한 NUMERIC 또는 FLOAT                                             |
| DoubleTypeHandler          | java.lang.Double, double      | 어떤 호환가능한 NUMERIC 또는 DOUBLE                                            |
| BigDecimalTypeHandler      | java.math.BigDecimal          | 어떤 호환가능한 NUMERIC 또는 DECIMAL                                           |
| StringTypeHandler          | java.lang.String              | CHAR, VARCHAR                                                                |
| ClobReaderTypeHandler      | java.io.Reader                | -                                                                            |
| ClobTypeHandler            | java.lang.String              | CLOB, LONGVARCHAR                                                            |
| NStringTypeHandler         | java.lang.String              | NVARCHAR, NCHAR                                                              |
| NClobTypeHandler           | java.lang.String              | NCLOB                                                                        |
| BlobInputStreamTypeHandler | java.io.InputStream           | -                                                                            |
| ByteArrayTypeHandler       | byte[]                        | 어떤 호환가능한 byte 스트림 타입                                               |
| BlobTypeHandler            | byte[]                        | BLOB, LONGVARBINARY                                                          |
| DateTypeHandler            | java.util.Date                | TIMESTAMP                                                                    |
| DateOnlyTypeHandler        | java.util.Date                | DATE                                                                         |
| TimeOnlyTypeHandler        | java.util.Date                | TIME                                                                         |
| SqlTimestampTypeHandler    | java.sql.Timestamp            | TIMESTAMP                                                                    |
| SqlDateTypeHandler         | java.sql.Date                 | DATE                                                                         |
| SqlTimeTypeHandler         | java.sql.Time                 | TIME                                                                         |
| ObjectTypeHandler          | Any                           | OTHER, 또는   명시하지 않는                                                    |
| EnumTypeHandler            | Enumeration Type              | VARCHAR –   문자열 호환타입.                                                  |
| EnumOrdinalTypeHandler     | 열거형(Enumeration) 타입      | 코드자체가 아니라 위치를 저장할수 있는 NUMERIC 또는 DOUBLE와 호환가능한 타입       |
| SqlxmlTypeHandler          | java.lang.String              | SQLXML                                                                       |
| InstantTypeHandler         | java.time.Instant             | TIMESTAMP                                                                    |
| LocalDateTimeTypeHandler   | java.time.LocalDateTime       | TIMESTAMP                                                                    |
| LocalDateTypeHandler       | java.time.LocalDate           | DATE                                                                         |
| LocalTimeTypeHandler       | java.time.LocalTime           | TIME                                                                         |
| OffsetDateTimeTypeHandler  | java.time.OffsetDateTime      | TIMESTAMP                                                                    |
| OffsetTimeTypeHandler      | java.time.OffsetTime          | TIME                                                                         |
| ZonedDateTimeTypeHandler   | java.time.ZonedDateTime       | TIMESTAMP                                                                    |
| YearTypeHandler            | java.time.Year                | INTEGER                                                                      |
| MonthTypeHandler           | java.time.Month               | INTEGER                                                                      |
| YearMonthTypeHandler       | java.time.YearMonth           | VARCHAR or LONGVARCHAR                                                       |
| JapaneseDateTypeHandler    | java.time.chrono.JapaneseDate | DATE                                                                         |


### objectFactory

마이바티스가 결과 객체의 인스턴스를 만들기 위해 사용한다.


### plugins

인터셉터를 위한 기능을 추가할 수 있다. ?

### environments

여러 개의 스키마의 DBMS 제품을 사용하거나 개발, 테스트, 리얼환경을 위한 별도 설정을 할 수 있다.
중요한 점은 데이터베이스별로 하나의 SqlSessionFactory를 사용할 수 있다는 점이다.
