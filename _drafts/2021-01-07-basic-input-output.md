---
layout: post
date: 2021-01-08 09:49:00 +0900
title: '[java] 자바 입/출력 Basic I/O '
categories:
  - java
tags:
  - I/O
---

* Kramdown table of contents
{:toc .toc}

## 참고
[Java Tutorials: Essential Classes > Basic I/O](https://docs.oracle.com/javase/tutorial/essential/io/index.html)

## 입출력 스트림 I/O Streams

스트림은 입출력 장치와 프로그램 사이의 중개자 역할을 한다. 키보드에서 입력을 하면 그 데이터는 스트림에 기록되고 프로그램은 스트림에 기록된 데이터를 읽어들인다. 또한 출력도 마찬가지로 스트림을 거쳐 특정 장치로 출력이 되도록 한다.
스트림은 바이트, 원시데이터타입, 로컬문자들, 객체 같은 다양한 데이터도 지원하고 단순히 데이터를 전달하기도 하고 데이터를 조작하거나 변환하기도 한다.  
즉, 스트림은 일련의 데이터라고 볼수 있는데 프로그램은 입력 스트림으로 한 번에 한 항목씩 소스에서 데이터를 읽고 출력 스트림으로 한 번에 한 항목씩 대상에 데이터를 쓴다.

자바에서는 `java.io` 패키지에 포함되어 있다.

`InputStream/ OutputStream`을 상속하면 바이트 타입 스트림, `Reader/Writer`를 상송하면 문자 타입 스트림으로 간단하게 구분할 수 있다.

### 바이트 스트림 Byte Streams

8비트 데이터 기반의 바이트 입/출력을 수행하기 위해 바이트 스트림을 사용한다. 모든 바이트 스트림 클래스는 `InputStream`과 `OutputStream`의 자손이다. 실제로 바이트 스트림은 가장 원시적인 형태라서 거의 사용되지는 않지만 모든 스트림의 기초다.  
바이트 스트림은 한 번에 하나씩 읽고 쓰기를 반복하고 더 이상 필요로 하지 않을 때는 꼭 스트림을 닫아서 리소스가 새는 것을 방지해야 한다.  
아래는 `HELLO`라는 단어 하나가 있는 `input.txt` 파일을 읽어 `output.txt`파일을 만드는 로직이다.  

```java
FileInputStream fi = null;
FileOutputStream fo = null;

try {
    fi = new FileInputStream("C://dev/input.txt"); // HELLO
    fo = new FileOutputStream("C://dev/output.txt");
    int cnt;

    while ((cnt = fi.read()) != -1) { // input.txt 파일을 바이트 단위로 하나씩 읽는다.
        fo.write(cnt); // 읽어온 바이트 값을 output.txt에 하나씩 써 넣는다.
        logger.debug("{}", cnt); // 72  69  76  76  79 -> 아스키코드값이 하나씩 돌면서 출력됨
    }
} finally {
    if(fi != null) {
        fi.close(); // 스트림은 사용이 끝나면 꼭 닫아야 한다.
    }
    if(fo != null) {
        fo.close(); // 스트림은 사용이 끝나면 꼭 닫아야 한다.
    }
}
```

![byte-stream](/images/byte-stream.jpg)

### 문자 스트림 Character Streams

자바는 유니코드 규칙을 사용해 문자를 저장한다. 문자 스트림 입출력은 내부 형식을 로컬문자집합으로 자동 변환한다. 서양로케일은 8비트 아스키코드를 사용한다. 모든 문자 스트림 클래스는 `Reader`와 `Writer`의 자손이다. 파일 입출력으로 `FileReader`와 `FileWirter`가 있다. 바이트 스트림과 마찬가지로 `int` 변수를 사용해 읽고 쓸 수 있는데 문자 스트림은 16 `bit`에 문자 값을 가지는 것이 다르다. 문자 스트림에서는 `InputStreamReader`와 `OutputStreamWriter`로 바이트 스트림도 사용할 수 있다.

```java
FileReader fr = null;
FileWriter fw = null;

try {
    fr = new FileReader("C://dev/input.txt");
    fw = new FileWriter("C://dev/character-output.txt");
    int cnt;

    while ((cnt = fr.read()) != -1) {
        fw.write(cnt);
        logger.debug("{}", cnt);
    }
} finally {
    if(fr != null) {
        fr.close();
    }
    if(fw != null) {
        fw.close();
    }
}
```

### 버퍼 스트림 Buffered Streams

버퍼링되지 않는 입출력 요청은 기본 OS에서 직접 처리하게 되는데 비용이 많이 드는 작업이 동반되기 때문에 프로그램 효율성을 훨씬 떨어뜨린다. 그래서 나온 것이 버퍼 입출력 스트림이다. 입력스트림은 버퍼라는 메모리 영역에서 데이터를 읽는다. 기본 입력 API는 버퍼가 비어 있을때만 호출이 된다. 마찬가지로 버퍼링이 된 출력 스트림 버퍼에 데이터를 쓰고 기본 출력 API는 버퍼가 가득 찬 경우에만 호출이 된다. `Reader`와 `Writer`의 자손이다.

`BufferedInputStream` 및 `BufferedOutputStream`은 버퍼 된 바이트 스트림을 생성하고 `BufferedReader` 및 `BufferedWriter`는 버퍼링 된 문자 스트림을 생성합니다.

```java
BufferedReader br = null;
BufferedWriter bw = null;

try {
    br = new BufferedReader(new FileReader("C://dev/input.txt"));
    bw = new BufferedWriter(new FileWriter("C://dev/buffer-output.txt"));
    int cnt;

    while ((cnt = br.read()) != -1) {
        bw.write(cnt);
        logger.debug("{}", cnt);
    }
} finally {
    if(br != null) {
        br.close();
    }
    if(bw != null) {
        bw.close();
    }
}
```

#### 플러시 버퍼 스트림  Flushing Buffered Streams

버퍼가 채워질때까지 기다리지 않고 중요한 지점에서 버퍼를 작성하는 것이다. 플러시를 하는 방법은 자동과 수동이 있다.
`flush()`메서드로 수동으로 플러시를 할 수 있는데 모든 출력 스트림에서 유효하지만 스트림이 버퍼링이 되지 않으면 효과가 없다.

### 스캐닝 Scanning

`Scanner` 유형의 객체는 형식화 된 입력을 토큰으로 분해하고 데이터 타입에 따라 개별 토큰을 변환하는 데 유용하다.  
스캐너는 빈칸, 탭, 라인 종결자를 포함한 공백으로 토큰을 나눈다. 특정한 구분자를 넣고 싶다면, `useDelimiter()`를 사용할 수 있다. 아래는 자바에서 공백으로 인식하는 것이다.  

```
유니코드 공백문자 (SPACE_SEPARATOR, LINE_SEPARATOR, or PARAGRAPH_SEPARATOR)
탭 '\t', U+0009 HORIZONTAL TABULATION.
줄바꿈 '\n', U+000A LINE FEED.
'\u000B', U+000B VERTICAL TABULATION.
'\f', U+000C FORM FEED.
'\r', U+000D CARRIAGE RETURN.
'\u001C', U+001C FILE SEPARATOR.
'\u001D', U+001D GROUP SEPARATOR.
'\u001E', U+001E RECORD SEPARATOR.
'\u001F', U+001F UNIT SEPARATOR.
```

```java
Scanner s = null;
try {
    s = new Scanner(new BufferedReader(new FileReader("C://dev/input.txt")));

    while(s.hasNext()) {
        logger.debug("{}", s.next());
        /* 아래와 같이 공백, 탭, 줄바꿈 등으로 구분되어 출력이 된다.
            HELLO,
            This
            is
            speaking.
            Who
            are
            you?
            I'm
            Java.
            How
            are
            you?
            Good.
         */
    }
} finally {
    if(s != null) {
        s.close(); // 스트림은 아니지만 스캐너가 완료되었음 나타내기 위해 필요
    }
}
```

스캐너는 `char` 를 제외한 자바 원시 데이터 타입과 `BigInteger`와 `BigDecimal`을 지원한다. 숫자 값은 천 단위 구분 기호도 사용할 수 있다.   


### 포맷팅 Formatting

`Formatting`을 구현하는 스트림 객체는 문자 스트림 클래스인 `PrintWriter` 또는 바이트 스트림 클래스 인 `PrintStream`의 인스턴스다.

#### print(), println()

`print(), println()`으로 결과값을 출력할 수 있는데 자바컴파일러가 자동으로 결과값을 문자열로 변환해 준다.  
`print()` 는 개행문자가 포함되지 않아 계속 덧붙여서 출력이 되는 반면 `println()`는 개행이 되는 메서드다.  

#### format()

형식 문자열은 형식지정자가 포함된 정적 텍스트다. 형식 지정자를 기존의 정해진 형식대로 변경해서 출력해 준다.  
자세한 내용은 https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html#syntax 참고

`%[출력의 종류를 지정할 문자]`

```java
int i = 100;
String s = "백";				
System.out.format("숫자 %d은 한글로는 %s라고 쓴다.%n", i, s);// 숫자 100은 한글로는 백라고 쓴다. (줄바꿈 있음)
```

`%d`은 10진수값, `%s`는 문자열, `%n`은 개행을 뜻하는데 이런 형식 지정자를  `format()` 메서드와 같이 쓰면 정해진 형식으로 변경이 된다.

### 표준 스트림 Standard Streams

커맨드 라인에서 사용할 수 있는 표준 입력과 출력을 위한 3개의 표준 스트림이 있다. `System.in` 은 표준 입력을 다룰 수 있는 객체로 키보드로부터 입력을 담당하는 객체이고 `System.out, System.err`은 출력을 담당하며 콘솔로 데이터를 출력할 수 있는 기능을 가지고 있다. 표준 스트림은 객체가 자동으로 생기므로 따로 정의할 필요 없다.   
모두 바이트 스트림이지만 출력을 위한 `System.out, System.err`는 문자열도 출력이 가능하다. 표준 입력을 문자 스트림으로 사용하려면 `InputStreamReader`에서 `System.in`을 래핑한다.

```
System.in
System.out
System.err
```

`Console`클래스를 이용해서 표준 스트림을 사용하는 것이 더 나은 선택이다.  
프로그램이 콘솔을 사용하려면 먼저 `System.console()`을 호출하여 콘솔 객체를 검색 해야 한다. `Console`객체를 사용할 수있는 경우이 메서드는 이를 리턴하는데 `System.console`이 `NULL`을 리턴하면 콘솔 작업도 허용되지 않는다.  


### 데이터 스트림 Data Streams

데이터 타입별 구분이 가능하여 타입별로 읽을 수도 있고 출력을 할 수도 있다. 안 좋은 점은 정확한 값에 부적합한 부동 소수점을 사용해 금전적 가치를 나타낸다. 통화 값에 사용할 올바른 유형은 `java.math.BigDecimal`입니다. 불행히도 `BigDecimal`은 객체 유형이므로 데이터 스트림에서 작동하지 않는다.

```
DataInputStream
DataOutputStream
```
### 객체 스트림 Object Streams

원시데이터타입만 지원하던 데이터 스트림과는 달리 객체 스트림은 원시 데이터타입도 포함하고 객체 입출력도 지원한다. 대부분의 표준 클래스는 객체의 직렬화를 지원하므로 사용이 가능하다.
데이터 스트림과 차이는 통화를 위한 `BigDecimal`객체를 사용한다는 것이다. 이것은 분수값을 더 잘 표현할 수 있다. 그리고 `Calendar` 객체를 이용할 수 있다.

```
 ObjectInputStream
 ObjectOutputStream
 ```
