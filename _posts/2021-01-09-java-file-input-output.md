---
layout: post
date: 2021-01-09 14:00:00 +0900
title: '[java] 파일 입출력 File I/O'
categories:
  - java
tags:
  - file
  - I/O
---

* Kramdown table of contents
{:toc .toc}

## 참고
[Java Tutorials : Basic I/O > File I/O (Featuring NIO.2)](https://docs.oracle.com/javase/tutorial/essential/io/fileio.html)  


## File I/O (Featuring NIO.2 - jdk 7)

### Path 개요

1) Path 란  

`root node`로부터 디렉토리를 거쳐 파일이 있는 위치를 가리키는 것. 맥OS는 `/`로  윈도우OS는 `\`로 디렉토리를 구분한다.  

2) 상대적, 절대적 경로  

절대적 경로는 `/root node/directory/subdirectory/file` 과 같이 항상 `root node`가 먼저 나오고 모든 거치는 디렉토리가 다 나오는 것을 말한다. 반면 상대적 경로는 원하는 파일에 접근하기 위해 다른 경로와 조합이 필요하다. `/subdirectory/file`과 같이 일부정보만 있으므로 더 많은 추가 정보가 필요하다.  

3) 심볼릭 링크 `Symbolic Links `

심볼릭 링크는 겉으로 보기엔 그냥 파일명이지만 다는 경로에 있는 파일을 참조하는 특수한 파일이다. 다른 파일과 동일하게 일거나 쓸 수 있다. `resolving a link`라는 문구는 심볼릭 링크가 가리키는 실제 파일의 위치을 의미한다. 심볼릭 링크를 잘못 사용하게 되면 순환참조가 발생하게 되므로 주의 해야 한다.  

## Path Class

자바 7 이상 사용할 수 있다. `java.nio.file`패키지에 포함되어 있다. 자바 7이전은 `java.io.File` 클래스를 이용할 수 있다.
이름에서 알수 있듯이 `Path`클래스는 파일 시스템상에서 경로를 나타내고 `Path` 객체는 파일이름과 경로를 구성하는데 사용하는 디렉토리목록을 포함하고 있고 파일검사, 찾기, 조작하는데 사용된다.  

### Path 생성

`Path` 인스턴스를 생성할때 인자에 따라 루트 혹은 파일이름 혹은 디렉토리를 포함할 수 있다.
 `Paths` 보조 클래스의 `get()`메서드로 `Path` 인스턴스를 생성한다.

```java
// 절대 경로
Path p1 = Paths.get("C:/dev/test-files/input.txt"); // \\(역슬래시 2개)를 /(슬래시)로 변경해도 인식한다.
Path p2 = FileSystems.getDefault().getPath("C:\\dev\\test-files\\input.txt"); // 위 인스턴스 생성은 실제로는 이렇게 하는 것과 같다.
// 상대 경로
Path p3 = Paths.get("test-files/input.txt");
```

### 경로 검색

디렉토리구조에서 가장 높은 곳은 인덱스 0이다. 반대로 가장 낮은 곳은 인덱스 `[n-1]`로 정해져 있어 경로를 검색하는 데 사용할 수 있다.  

```java
Path p1 = Paths.get("C:/dev/test-files/input.txt");

logger.debug("toString: {}", p1.toString()); // C:\dev\test files\input.txt
logger.debug("getFileName: {}", p1.getFileName()); // iput.txt
logger.debug("getName(0) : {}", p1.getName(0)); // dev
logger.debug("getNameCount: {}", p1.getNameCount()); // 3
logger.debug("subpath(0,2): {}", p1.subpath(0,2)); // dev\test files
logger.debug("getParent: {}", p1.getParent()); // C:\dev\test files
logger.debug("getRoot: {}", p1.getRoot()); // C:\
```

| Method  Invoked                            | Returns in the Solaris OS | Returns in Microsoft Windows | Comment                                                                                                    |
|---                                         |---                        |---                           |---                                                                                                         |
| String toString()                          | /dev/test-files/input.txt | C:\dev\test-files\input.txt  | 경로를 문자열로 리턴. Path 인스턴스를 통해 경로를 생성했다면 문자열 `//`를 자동으로 `/`로 바꿔주기도 한다. |
| Path getFileName()                         | input.txt                 | input.txt                    | 파일 이름 혹은 마지막 이름 요소(디렉토리 등)를 리턴                                                        |
| Path getName(int index)                    | dev                       | dev                          | 지정한 인덱스의 요소를 리턴한다. 0번째는 루트와 가장 가까운 요소다.                                        |
| int getNameCount()                         | 3                         | 3                            | 요소의 개수. 즉, 루트를 제외한 디렉토리부터 파일이름까지 요소의 개수                                       |
| Path subpath(int beginIndex, int endIndex) | dev/test-files            | dev\test-files               | 루트를 제외한 지정한 구간의 경로를 리턴, 종료인덱스는 미포함                                               |
| Path getParent()                           | /dev/test-files           | C:\dev\test-files            | 부모 디렉토리 리턴                                                                                         |
| Path getRoot()                             | /                         | C:\                          | 루트 리턴                                                                                                  |

### 불필요한 중복 경로 제거

현재 디렉토리는 `.`, 부모 디렉토리는 `..`으로 표시한다.

```
/home/./joe/foo
/home/sally/../joe/foo
```
정규화 메서드는 `.` 또는  `directory / ..`를 포함하는 모든 중복 요소를 제거한다.  앞의 두 예는 모두 `/home/joe/foo`로 정규화된다. 여기서 문제는 `sally`가 만약 특정한 경로를 참조하는 심볼릭 링크라고 한다면 그 경로는 더 이상 사용할 수가 없게되버리는 문제가 생긴다. 이를 방지하기 위해 `toRealPath()` 메소드를 사용할수 있다. 상세는 아래에

### 경로 변환

브라우저에 바로 띄울 경로가 필요하면 `toUri()` 메서드를 절대경로가 필요하면 `toAbsolutePath()` 메서드를 이용해 사용자 입력을 변환하고 쿼리시 유용한 값을 리턴한다. 이 방법이 작동하기 위해 파일이 존재하지 않아도 된다.  
`toRealPath()` 메서드는 기존 파일의 실제 경로를 리턴하는데 이 방법은 한 번에 여러 작업을 수행한다. 매개변수로 `true`가 전달되고 파일 시스템이 기호 링크를 지원하는 경우 경로에 있는 모든 기호 링크를 확인한다. 경로가 상대 경로이면 절대 경로를 리턴하고 경로에 중복 요소가 포함되어 있으면 해당 요소가 제거 된 경로를 리턴한다. 실제 파일이 없는경우에는 `IOException`이 발생한다.  

```
URI toUri()
Path toAbsolutePath()
Path toRealPath(LinkOption... options)
```

```java
Path p1 = Paths.get("kakao.com");
Path p2 = Paths.get("C:/dev/test-files/input.txt");

logger.debug("{}", p1.toUri()); // file:///C:/dev/git/labs/kakao.com
logger.debug("{}", p1.toAbsolutePath()); // C:\dev\git\labs\kakao.com - C:/dev/git/labs 현재 내 위치가 알아서 덧붙여진다. 실제 파일이 없어도 상관없다.
//logger.debug("{}", p1.toRealPath()); // 없는 파일인 경우 java.nio.file.NoSuchFileException
logger.debug("{}", p2.toRealPath()); // C:\dev\test-files\input.txt
```

### 경로 조합

`resolve()`메서드로 부분적인 경로를 조합하여 사용할 수 있다. 자식 혹은 형제위치로 조합이 가능하고 매개변수로 절대경로를 주게 되면 그 절대경로를 리턴하게 되므로 확인하자.  

```
Path resolve(String other)
Path resolve(Path other)
Path resolveSibling(String other)
Path resolveSibling(Path other)
```

```java
Path p1 = Paths.get("C:/dev/test-files");
logger.debug("{}", p1.resolve("input.txt")); // C:\dev\test-files\input.txt
logger.debug("{}", p1.resolveSibling("input.txt")); // C:\dev\input.txt - 자식이 아닌 형제위치로 조합

Path p2 = Paths.get("input.txt");
logger.debug("{}", p2.resolve("C:/dev/test-files")); // C:\dev\test-files - 절대 경로를 전달하면 전달된 경로만 리턴
```

### 상대 경로 만들기

`relativize()`메서드로 한 위치에서 다른 위치로의 경로를 구성 할 수 있다. 이 메서드는 원래 경로에서 시작되고 전달 된 경로에 지정된 위치에서 끝나는 경로를 구성하고 새 경로는 원래 경로에 상대적이다. 경로 중 하나에만 루트요소가 포함되면 상대경로를 구성할 수 없다.

`Path relativize(Path other)`

```java
Path p1 = Paths.get("home");
Path p3 = Paths.get("home/sally/bar");
logger.debug("{}", p1.relativize(p3)); // sally\bar -> home에서 home/sally/bar를 가기 위해서
logger.debug("{}", p3.relativize(p1)); // ..\.. -> 부모(sally)를 찾기 위해 `..` -> 또 그 위 부모(home)을 찾기 위해 `..`
```

### 경로 비교

`equals()`, `startsWith()`, `endsWith()`로 경로를 서로 비교할 수 있다.  

```
boolean equals(Object other)
boolean startsWith(Path other)
boolean startsWith(String other)
boolean endsWith(Path other)
boolean endsWith(String other)
```

```java
Path p = Paths.get("C:/dev/test-files/input.txt");
Path p1 = Paths.get("C:/dev/test-files/input.txt");
Path b = Paths.get("C:/");
Path e = Paths.get("input.txt");

Assert.assertTrue(p.equals(p1));
Assert.assertTrue(p.startsWith(b));
Assert.assertTrue(p.endsWith(e));
```

또한 `Path` 클래스에서는 `Iterable`인터페이스를 구현하여 `iterator`는 `path` 인스턴스의 요소를 반복하여 리턴해 준다.  

```java
Path p = Paths.get("C:/dev/test-files/input.txt");
for (Path name : p) {
    logger.debug("{}", name); // 루트를 제외한 요소(디렉토리, 파일명)을 반복해서 리턴
}
```

`Path` 클래스에서는 `Comparable`인터페이스를 구현하여 `compareTo()`를 사용하여 사전순서대로 비교를 하여 정렬하는데 사용할 수 있다.

```java
Path p = Paths.get("C:/a");
Path p1 = Paths.get("C:/b");

logger.debug("{}", p.compareTo(p1)); // -1 : p가 사전순으로 더 앞
logger.debug("{}", p1.compareTo(p)); // 1 : p1이 사전순으로 더 뒤
```


## Files Class

### 파일 개요

1) 시스템 리소스 닫기  

스트림이나 채널과 같은 자원을 사용하는데 사용 후에는 리소스 낭비 및 성능에 부정적인 영향을 피하기 위해서 닫는 단계가 필요하다.  
파일 `I/O`를 사용하면서 파일이 없거나, 접근이 불가하거나 기능 지원을 하지 않는 등 예상치 못한 오류가 발생할 수 있다. 이런 모든 오류는 `IOException`을 던진다. `try-catch`문은 컴파일러가 더 이상 필요하지 않을 때 리소스를 닫는 코드를 자동으로 생성하는 장점이 있어 예외를 잡을 때 사용하는 방법 중 가장 좋다.  
`try`블록 파일 I/O 메서드를 넣고 `catch`블록에서 모든 예외를 잡을 수 있으면 `finally`블록에서는 리소스를 닫는 코드를 넣으면 된다.  

 `IOException`은 `FileSystemException`을 확장하는데 그 클래스에는 유요한 메서드들이 있다.  
- `getFile()` : 관련된 파일 리턴  
- `getMessage()` : 자세한 메시지 문자열 리턴  
- `getReason()` : 파일 시스템 작업이 실패한 이유 리턴  
- `getOtherFile()` : 관련된 "기타"파일 리턴  

```java
try (...) {
    ...    
} catch (NoSuchFileException x) {
    System.err.format("%s does not exist\n", x.getFile());
}
```
2) 가변 인수  

아래 예시의 `CopyOption...` 부분의 `...`은 가변인수를 나타낸다. 메서드가 가변인수를 허용하면 쉼표로 구분된 값 목록이나 배열을 전달할 수 있다.  

```java
Path Files.move(Path, Path, CopyOption...)
```

```java
Files.move(source, target, REPLACE_EXISTING, ATOMIC_MOVE);
```

3) 원자 작업 Atomic Operations  

부분적으로 수행될 수 없는 전체 작업이 수행되거나 아님 실패하는 작업이다. 예를 들면 `move()` 같은 작업이다. 파일의 일부만 옮겨지는건 의미가 없다.  

4) 메서드 체이닝 Method Chaining  

메서드를 호출하여 리턴받은 객체를 바로 다른 메서드를 호출할 때 사용하는 기술이다. 코드도 짧아지고 불필요한 변수를 선언할 필요가 없어진다.  

```java
String value = Charset.defaultCharset().decode(buf).toString();
```

5) `Glob`이란  

`glob` 구문을 사용하여 패턴을 이용해 동작을 지정할 수 있다. 일종의 정규표현식인가?  

- `*` : 모든 문자  
- `**` : `*`처럼 작동하지만 디렉토리 경계를 넘는다. 이 구문은 일반적으로 전체 경로를 일치시키는 데 사용  
- `?` : 한 글자  
- `{}` : 하위 패턴 모음  `e.g. {sun, moon, stars}` - 세 단어 중 하나와 맞는 것  
- `[]` : 문자 범위 `e.g. [0-9]` 숫자 모두 , `[A-Z]` 영어대문자  
- `\` : 특수문자를 일치시킬 때 쓰는 이스케이프 문자 `e.g \\ -> \ , \? -> ?`  

6) 링크 인식  

`Files` 클래스는 링크를 인식힌다. 모든 `Files` 메소드는 기호 링크가 발견 될 때 수행 할 작업을 감지하거나 기호 링크가 발견 될 때 동작을 구성 할 수있는 옵션을 제공한다.  


### 파일 또는 디렉토리의 존재 확인

파일 시스템에 접근해서 실제 파일이나 디렉토리가 있는지 확인하기 위해서 `exist()` 메서드를 사용한다. 파일이 존재, 미존재, 파일상태를 알 수 없음(파일에 액세스 불가)를 결과로 리턴한다.  

```
static boolean exists(Path path, LinkOption... options)
static boolean notExists(Path path, LinkOption... options)
```

```java
Path path = Paths.get("C:/dev/test-files/input.txt");
Path path1 = Paths.get("C:/kakao.com");
Assert.assertTrue(Files.exists(path));
Assert.assertFalse(Files.exists(path1));
Assert.assertFalse(Files.notExists(path));
Assert.assertTrue(Files.notExists(path1));
```

### 파일 접근성 확인

파일에 접근 할 수 있는지 확인하려면 `isReadable (Path), isWritable (Path), isExecutable (Path)` 메서드를 사용할 수 있다.  

```
static boolean isReadable(Path path)
static boolean isWritable(Path path)
static boolean isExecutable(Path path)
```

```java
Path path = Paths.get("C:/dev/test-files/input.txt");
Path path1 = Paths.get("C:/kakao.com");
Assert.assertTrue(Files.isReadable(path));
Assert.assertTrue(Files.isWritable(path));
Assert.assertTrue(Files.isExecutable(path));
Assert.assertFalse(Files.isReadable(path1));
Assert.assertFalse(Files.isWritable(path1));
Assert.assertFalse(Files.isExecutable(path1));
```

### 두 경로가 동일한 파일을 찾는 지 확인

심볼릭 링크를 사용하는 파일 시스템의 경우 동일한 파일을 찾는 두 개의 다른 경로가 있을 수 있다. `isSameFile (Path, Path)` 메서드는 두 경로를 비교하여 파일 시스템에서 동일한 파일을 찾는 지 확인한다.  

`static boolean isSameFile(Path path, Path path2)`

```java
Path p1 = ...;
Path p2 = ...;
if (Files.isSameFile(p1, p2)) {
    // Logic when the paths locate the same file
}
```

### 파일, 디렉토리 삭제

파일, 디렉토리, 링크 모두 삭제할 수 있다. 다만, 심볼릭 링크가 삭제되면 링크 대상이 아니게 되고 디렉토리를 삭제하려면 디렉토리가 비어 있어야하는데 그렇지 않으면 삭제에 실패한다. `delete()` 메서드는 파일을 삭제고 만약 실패하면 예외를 발생시킨다. 예를 들어, 파일이 존재하지 않으면 `NoSuchFileException`이 발생한다. `try-catch` 문으로 예외를 포착해 삭제 실패 이유를 알 수 있다. `deleteIfExists()` 메서드는 파일이 있는 경우만 삭제를 하기 때문에 파일이 없어 실패한 경우 예외가 발생하지 않는다. 이것 파일을 삭제하는 여러 스레드가 있고 하나의 스레드가 먼저 예외를 던지고 싶지 않을 때 유용합니다.

```
static void delete(Path path)
static boolean deleteIfExists(Path path)
```

```java
Path path = Paths.get("C:/dev/test-files/input.txt");
Path path1 = Paths.get("C:/kakao.com");

try {
    Files.delete(path);
} catch (NoSuchFileException x) {
    logger.error("{} : no such file or directory", path);
} catch (DirectoryNotEmptyException x) {
    logger.error("{} : not empty", path);
} catch (IOException x) {
    // File permission problems are caught here.
    logger.error("{} : not empty", x);
}

try {
    Files.deleteIfExists(path1);
} catch (IOException x) {
    // File permission problems are caught here.
    logger.error("{} : not empty", x);
}
```

### 파일, 디렉토리 복사

`copy(Path, Path, CopyOption...)` 메서드를 사용하여 파일 또는 디렉토리를 복사 할 수 있다. 디렉토리의 경우 그 내부의 파일까지 복사가 되지는 않아 복사한 디렉토리는 비어있는 디렉토리가 된다. 심볼릭 링크를 복사 할 때 링크 대상이 복사되는데 링크의 내용을 복사한다.가변인수로  `StandardCopyOption` 클래스의 `enums`을 지원하고 그에 따라 다른 추가 기능을 제공한다.  

- `REPLACE_EXISTING` : 대상 파일이 이미 존재해도 복사 수행, 대상이 심볼릭 링크인 경우 링크 자체가 복사(링크 대상이 아님). 대상이 비어 ​​있지 않은 디렉토리이면 `FileAlreadyExistsException` 예외와 함께 복사가 실패  
- `COPY_ATTRIBUTES` : 파일과 연관된 파일 속성을 대상 파일에 복사, 지원되는 속성은 파일 시스템에 따라 다르지만 보통 마지막 수정시간은 여러곳에서 지원한다.
- `NOFOLLOW_LINKS` : 링크 자체를 복사(링크 대상이 아님)  

`copy(InputStream, Path, CopyOptions ...)` 메서드는 입력 스트림의 모든 바이트를 파일로 복사하고, `copy (Path, OutputStream)` 메서드는 파일의 모든 바이트를 출력 스트림으로 복사한다.  

```
static Path copy(Path source, Path target, CopyOption... options)
static long copy(InputStream in, Path target, CopyOption... options)
static long copy(Path source, OutputStream out)
```

```java
import static java.nio.file.StandardCopyOption.*; // 옵셔을 쓸 수 있도록 임포트 필요

// 이미 파일이 있는 경우
Path source = Paths.get("C:/dev/test-files/input.txt");
Path target = Paths.get("C:/dev/test-files");

try {
    Files.copy(source, target);
} catch(FileAlreadyExistsException e) {
    logger.debug("{}가 복사할 곳에 이미 존재함", source); // 예외 발생
}
catch (IOException e) {
    e.printStackTrace();
}

// 복사대상의 디렉토리가 비어 있지 않은 경우
Path source1 = Paths.get("C:/dev/test-files/input.txt");
Path target1 = Paths.get("C:/dev/test-files/");

try {
    Files.copy(source1, target1, REPLACE_EXISTING);
} catch(DirectoryNotEmptyException e) {
    logger.error("{}에 복사불가: 복사할 곳의 디렉토리가 비어있지 않음 ", target1); // REPLACE_EXISTING 옵션으로 동일 파일이 있어도 복사가 되지만 이번엔 디렉토리가 비어있지 않아 파일복사를 할 수 없다.
} catch (IOException e) {
    e.printStackTrace();
}

// 디렉토리 복사는 내부 파일까지는 복사가 안된다. 아래는 마치 새 디렉토리를 만드는것과 다름 없다.
Path source2 = Paths.get("C:/dev/test-files/");
Path target2 = Paths.get("C:/dev/test-files-new/"); // 현재는 존재하지 않으나 copy를 통해 생성된다.

try {
    Files.copy(source2, target2);
} catch (IOException e) {
    e.printStackTrace();
}


// 비어 있는 디렉토리에 파일 복사
Path source3 = Paths.get("C:/dev/test-files/input.txt");
Path target3 = Paths.get("C:/dev/test-files-new/input.txt");

try {
    Files.copy(source3, target3); // 복사됨.
} catch (IOException e) {
    e.printStackTrace();
}
```

### 파일, 디렉토리 이동

`move()` 메서드를 사용하여 파일 또는 디렉터리를 이동할 수 있다. `REPLACE_EXISTING` 옵션을 지정하지 않으면 대상 파일이 있으면 이동이 실패한다. 비어있는 디렉토리를 이동할 수 있는데 디렉토리가 비어 있지 않은 경우 해당 디렉토리의 내용을 이동하지 않고 디렉토리를 이동할 수있을 때 이동이 허용된다. `UNIX` 시스템에서 동일한 파티션 내에서 디렉토리 이동은 일반적으로 디렉토리 이름이 변경 된다. 이 경우 디렉토리에 파일이 포함되어 있는 경우에도 작동한다. 가변인수로  `StandardCopyOption` 클래스의 `enums`을 지원하고 그에 따라 다른 추가 기능을 제공한다.  

- `REPLACE_EXISTING` : 대상 파일이 이미 존재하는 경우에도 이동한다. 대상이 심볼릭 링크인 경우 심볼릭 링크가 대체되지만 가리키는 것은 영향 받지 않는다.
- `ATOMIC_MOVE` : `atomic file system` 조작으로 파일을 이동한다. 파일 시스템이 원자 이동을 지원하지 않으면 예외가 발생. `ATOMIC_MOVE`를 사용하면 파일을 디렉토리로 이동할 수 있으며 디렉토리를 감시하는 모든 프로세스가 완전한 파일에 접근할 수 있다.

`static Path move(Path source, Path target, CopyOption... options)`

```java
// 대상에도 동일 파일이 존재할 때
Path source = Paths.get("C:/dev/test-files/input.txt");
Path target = Paths.get("C:/dev/test-files-new/input.txt");

try {
    Files.move(source, target);
} catch(FileAlreadyExistsException e) {
    logger.debug("{}에 이미 파일이 존재해 이동할 수 없다. ", target);
} catch(NoSuchFileException e) {
    logger.debug("{}은 없는 파일이다 ", source);
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}

// 대상에도 동일 파일이 존재할 때
Path source1 = Paths.get("C:/dev/test-files/input.txt");
Path target1 = Paths.get("C:/dev/test-files-new/input.txt");

try {
    Files.move(source1, target1, REPLACE_EXISTING); // 대상에 이미 같은 파일이 있더라도 이동한다. source1은 삭제된다.
} catch(NoSuchFileException e) {
    logger.debug("{}은 없는 파일이다 ", source1);
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}

// 파일 있는 디렉토리를 옮길 때
Path source2 = Paths.get("C:/dev/test-files-new");
Path target2 = Paths.get("C:/dev/test-files-new1");

try {
    Files.move(source2, target2);  // 새로운 디렉토리 target2 를 만들어서 위 source2 경로의 모든 파일이 이동된다.  source2는 삭제된다. 옵션이 없어도 되는데;;;
} catch(AccessDeniedException e) {
    logger.debug("{}와 {}는 접근 불가", source2, target2);
}catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}		

// 비어있는 디렉토리를 옮길 때
Path source3 = Paths.get("C:/dev/test-files-empty");
Path target3 = Paths.get("C:/dev/test-files-new2");

try {
    Files.move(source3, target3); // source3 삭제되고 target3이 생성된다.
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}
```

### 메타데이터 관리 (File and File Store Attributes)

메타데이터는 파일여부, 크기, 생성날짜, 수정날짜, 파일소유자 등 파일의 속성을 의미한다. `Files`클래스는 이러한 속성을 찾거나 설정하는 메서드를 제공한다.  

| Methods                                                                                               | Comment                                  |
|---                                                                                                    |---                                       |
| size(Path)                                                                                            | 파일의 사이즈로 바이트로 리턴            |
| isDirectory(Path, LinkOption)                                                                         | 디렉토리 여부를 리턴                     |
| isRegularFile(Path, LinkOption...)                                                                    | 일반파일 여부를 리턴                     |
| isSymbolicLink(Path)                                                                                  | 심볼릭링트 여부를 리턴                   |
| isHidden(Path)                                                                                        | 파일 시스템이 숨긴 파일인지 여부를 리턴  |
| getLastModifiedTime(Path, LinkOption...), setLastModifiedTime(Path, FileTime)                         | 마지막 수정시각을 리턴하거나 세팅        |
| getOwner(Path, LinkOption...), setOwner(Path, UserPrincipal)                                          | 파일 소유자를 리턴하거나 세팅            |
| getPosixFilePermissions(Path, LinkOption...), setPosixFilePermissions(Path, Set<PosixFilePermission>) | 파일의 POSIX 파일 권한을 리턴하거나 세팅 |
| getAttribute(Path, String, LinkOption...), setAttribute(Path, String, Object, LinkOption...)          | 파일 속성을 리턴하거나 세팅              |

동시에 프로그램의 여러 파일 속성이 필요한 경우 단일 속성을 검색하는 메소드를 사용하여 파일 시스템에 반복적으로 액세스하면 성능이 저하 될 수 있다. 이러한 이유로 `Files` 클래스는 한 번의 대량 작업으로 파일의 속성을 가져 오는 두 개의 `readAttributes` 메서드를 제공한다.

| Method                                        | Comment                                                                            |
|---                                            |---                                                                                 |
| readAttributes(Path, String, LinkOption...)   | String 파라미터로 읽어야할 속성을 전달해 대량 작업으로 속성을 가져온다.            |
| readAttributes(Path, Class<A>, LinkOption...) | Class를 파라미터로 넘겨 대량작업으로 속성을 가져온다. 그 클래스의 객체로 리턴된다. |

기본 파일 속성은 ` BasicFileAttributes.class`, 도스 파일 속성은 `DosFileAttributes.class`, POSIX 파일은 `PosixFileAttributes.class`을 이용해서 대량으로 속성을 얻을 수 있다.  
참고로 `POSIX`는 `UNIX` 용 `Portable Operating System Interface`의 약어이며 다양한 `UNIX` 유형 간의 상호 운용성을 보장하기 위해 설계된 `IEEE` 및 `ISO` 표준 세트다. 파일 소유자, 동일한 그룹의 구성원 및 "기타 모든 사람"에 대한 읽기, 쓰기 및 실행 권한의 9 가지 파일 권한을 지원한다.

```java
Path path = Paths.get("C:/dev/test-files/input.txt");
try {
    BasicFileAttributes attr = Files.readAttributes(path, BasicFileAttributes.class);

    logger.debug("{}", attr.lastModifiedTime()); // 2021-01-09T10:47:32.9575655Z
    logger.debug("{}", attr.creationTime()); // 2021-01-09T12:28:10.3865468Z
    logger.debug("{}", attr.isRegularFile()); // true
    logger.debug("{}", attr.isDirectory()); // false
    logger.debug("{}", attr.isSymbolicLink()); // false
    logger.debug("{}", attr.isOther()); // false
    logger.debug("{}", attr.size()); // 69
    logger.debug("{}", attr.fileKey()); // null
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}
```

#### 파일 또는 그룹 소유자 설정

TODO

```java
Path file = ...;
UserPrincipal owner = file.GetFileSystem().getUserPrincipalLookupService().lookupPrincipalByName("sally");
Files.setOwner(file, owner);
```

#### 사용자 정의 파일 속성

TODO

`UserDefinedFileAttributeView`을 이용해 사용자가 속성을 정의할 수 있다.

```java
// 사용자 정의 속성 세팅
Path path = Paths.get("C:/dev/test-files/input.txt");

try {
    UserDefinedFileAttributeView view = Files.getFileAttributeView(path, UserDefinedFileAttributeView.class);
    view.write("user.mimetype", Charset.defaultCharset().encode("text/html"));
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}

// 사용자 정의 속성 읽기
try {
    UserDefinedFileAttributeView view = Files.getFileAttributeView(path,UserDefinedFileAttributeView.class);
    String name = "user.mimetype";
    ByteBuffer buf = ByteBuffer.allocate(view.size(name));

    view.read(name, buf);
    buf.flip();
    String value = Charset.defaultCharset().decode(buf).toString();

    logger.debug("{}", value); // text/html

} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}
```

#### 파일 저장소 속성

`FileStore` 클래스를 사용하여 파일 저장소 얼마나 많은 공간을 사용할 수 있는지에 대해 알 수 있다.` getFileStore()` 메소드는 지정된 파일에 대한 파일 저장소를 가져온다.

`getTotalSpace()`는 전체 공간을 , `getUnallocatedSpace()`는 할당되지 않은 공간 , `getUsableSpace()`는 사용 가능한 공간을 리턴한다.

```
FileStore.class
static FileStore getFileStore(Path path)
abstract long getTotalSpace()
abstract long getUnallocatedSpace()
abstract long getUsableSpace()
```

```java
Path file = Paths.get("C:/dev/test-files/input.txt");

try {
    FileStore store = Files.getFileStore(file);
    long total = store.getTotalSpace() / 1024;
    long used = (store.getTotalSpace() - store.getUnallocatedSpace()) / 1024;
    long avail = store.getUsableSpace() / 1024;

    logger.debug("전체: {}, 사용함: {}, 사용가능함: {}", total, used, avail); // 전체: 498720724, 사용함: 202154312, 사용가능함: 296566412
    logger.debug("{}", store.getUnallocatedSpace() == store.getUsableSpace()); // true

} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}
```

### 파일 읽기, 쓰기, 만들기

다음은 파일 I/O을 복잡도에 따라 정렬했다. 오른쪽으로 갈수록 더 복잡하다.   

| readAllBytes, readAllLines, write | newBufferedReader, newBufferedWriter | newInputStream, newOutputStream | newByteChannel | FileChannel|
|---|---|---|---|---|
| Commonllly used, small files | Text files |streams, unbuffered, use with existing APIs | channels and ByteBuffers | advanced features, file-loccking, memory-mapped I/O|


#### OpenOptions 매개변수

`StandardOpenOptions`은 `enum` 클래스다. 파일을 읽고,쓰기, 만들때 사용하는 메서드의 `옵션`을 매개변수로 넘길때 사용한다. ??

- `WRITE`: 쓰기 액세스를 위해 파일을 연다.
- `APPEND` : 파일 끝에 새 데이터를 추가. 이 옵션은 `WRITE` 또는 `CREATE` 옵션과 함께 사용.
- `TRUNCATE_EXISTING` : 파일을 0 바이트로 자른다. 이 옵션은 `WRITE` 옵션과 함께 사용다.
- `CREATE_NEW` : 새 파일을 만들고 파일이 이미있는 경우 예외를 발생.
- `CREATE` : 파일이있는 경우 열거나 없는 경우 새 파일을 만든다.
- `DELETE_ON_CLOSE` : 스트림이 닫힐 때 파일을 삭제. 이 옵션은 임시 파일에 유용.
- `SPARSE` : 새로 생성 된 파일이 희소하다는 힌트. 이 고급 옵션은 `NTFS`와 같은 일부 파일 시스템에서 적용되며, 여기서 데이터 "틈"이있는 대용량 파일은 이러한 빈 간격이 디스크 공간을 사용하지 않는보다 효율적인 방식으로 저장할 수 있다.
- `SYNC` : 파일 (콘텐츠 및 메타 데이터 모두)을 기본 저장 장치와 동기화 된 상태로 유지.
- `DSYNC` : 파일 내용을 기본 저장 장치와 동기화 된 상태로 유지.

#### 작은 파일  읽고 쓰기

작은 파일에서는 바이트 단위 혹은 라인 기준으로 읽고 쓴다.  

```
static byte[] readAllBytes(Path path)
static List<String> readAllLines(Path path, Charset cs)
static List<String> readAllLines(Path path)
```

```java
Path file = Paths.get("C:/dev/test-files/input.txt");
byte[] fileArray = Files.readAllBytes(file); // 파일을 바이트단위로 읽어서 배열로 리턴한다.
for (byte b : fileArray) {
    logger.debug("{}",  b);
}
```

쓰는 예시는 아래와 같다.  

```
static Path write(Path path, byte[] bytes, OpenOption... options)
static Path write(Path path, Iterable<? extends CharSequence> lines, Charset cs, OpenOption... options)
```

```java
Path file = ...;
byte[] buf = ...;
Files.write(file, buf);
```

#### 텍스트 파일에 대한 버퍼링 된 I/O 방법

`newBufferedReader()` 메서드는 파일을 열고 텍스트를 효율적으로 읽는 데 사용할 수 있는 `BufferedReader`를 리턴한다.

`static BufferedReader newBufferedReader(Path path, Charset cs)`

```java
Path file = Paths.get("C:/dev/test-files/input.txt");
Charset charset = Charset.forName("US-ASCII");
try {
    BufferedReader reader = Files.newBufferedReader(file, charset);
    String line = null;
    while ((line = reader.readLine()) != null) { // 파일을 한 줄씩 읽는다.
        System.out.println(line);
    }
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```

`newBufferedWriter()` 메서드로  `BufferedWriter`를 사용하여 파일에 쓸 수 있다.  

`static BufferedWriter newBufferedWriter(Path path, Charset cs, OpenOption... options)`

```java
import static java.nio.file.StandardOpenOption.*; // OpenOption을 사용하기 위해 임포트

Path file = Paths.get("C:/dev/test-files/input.txt");
Charset charset = Charset.forName("US-ASCII");
String s = "This is Earth.";
try (BufferedWriter writer = Files.newBufferedWriter(file, charset, APPEND)) { // APPEND 옵션이 없으면 이전 파일 내용은 모두 삭제하고 신규 내용이 추가된다.
    writer.write(s, 0, s.length());
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```

#### Unbuffered Streams 및 java.io API와 상호 운용 가능한 메서드

`newInputStream()`를 이용해서 파일을 열고 파일에서 바이트를 읽기 위해 `InputStream`을 리턴한다.

`static InputStream newInputStream(Path path, OpenOption... options)`

```java
Path file = Paths.get("C:/dev/test-files/input.txt");
try {
    InputStream in = Files.newInputStream(file);
    BufferedReader reader = new BufferedReader(new InputStreamReader(in));
    String line = null;
    while ((line = reader.readLine()) != null) { // 파일을 한 줄씩 읽는다.
        System.out.println(line);
    }
} catch (IOException x) {
    System.err.println(x);
}
```

파일을 생성 및 쓰기는 `newOutputStream()`를 이용한다.  

`static OutputStream newOutputStream(Path path, OpenOption... options)`

```java
try {
    String s = "Hello World! ";
    byte data[] = s.getBytes();
    Path p = Paths.get("C:/dev/test-files/logfile.txt");
    OutputStream out = new BufferedOutputStream(Files.newOutputStream(p, CREATE, APPEND));
    out.write(data, 0, data.length); // close를 해 주지 않으면 안 써진다.
    out.close();
} catch (IOException x) {
    System.err.println(x);  
}
```

#### 채널 및 ByteBuffer에 대한 메서드

스트림 I/O가 한 번에 문자 하나를 읽는 동안 채널 I/O는 한 번에 버퍼 하나를 읽는다.   
`ByteChannel` 인터페이스는 기본적인 읽기 및 쓰기 기능을 제공한다. `SeekableByteChannel`은 채널에서 위치를 유지하거나 해당 위치를 변경할 수 있다.  

```
static SeekableByteChannel newByteChannel(Path path, OpenOption... options)
static SeekableByteChannel newByteChannel(Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs)
```
두 `newByteChannel()` 메서드를 사용하면 `newOutputStream()`과 같이 `OpenOption` 옵션 목록을 지정할 수 있다.

```java
try {
    Path file = Paths.get("C:/dev/test-files/logfile.txt");

    SeekableByteChannel sbc = Files.newByteChannel(file);
    ByteBuffer buf = ByteBuffer.allocate(13); // 버퍼 크기 할당

    // Read the bytes with the proper encoding for this platform.
    String encoding = System.getProperty("file.encoding");
    logger.debug("{}", encoding); // UTF-8

    while (sbc.read(buf) > 0) {
        buf.rewind();
        System.out.print(Charset.forName(encoding).decode(buf)); // Hello World!
        buf.flip();
    }
} catch (IOException x) {
    System.out.println("caught exception: " + x);
}
```

#### 일반 및 임시 파일을 만드는 방법

`createFile()`로 속성이 있는 파일을 만들 수 있다. 파일이 이미 존재하면 예외가 발생한다.

`static Path createFile(Path path,
                              FileAttribute<?>... attrs)`

```java
Files.createFile(file);
```

`createTempFile()`로 임시 파일을 만들 수 있다. 첫 번째 메서드는 임시파일에 대한 디렉터리를 지정할 수 있다. 두 번째 메서드는 기본 임시 디렉토리에 파일을 만든다.
메서드 매개변수에 따라 파일이름에 접미사 혹은 접두사도 지정할 수 있다.  

```
static Path createTempFile(Path dir, String prefix, String suffix, FileAttribute<?>... attrs)
static Path createTempFile(String prefix, String suffix, FileAttribute<?>... attrs)
```


```java
Path tempFile = Files.createTempFile(null, ".myapp");
System.out.format("The temporary file has been created: %s%n", tempFile); // The temporary file has been created: C:\Users\masca\AppData\Local\Temp\13677961192636449491.myapp
```


### 디렉토리 만들기, 읽기

#### 파일 시스템의 루트 디렉토리 나열

```
FileSystem.Class
abstract Iterable<Path> getRootDirectories()
```

```java
Iterable<Path> dirs = FileSystems.getDefault().getRootDirectories();
for (Path name: dirs) {
    System.err.println(name);
    /*
     C:\
     D:\
     E:\
     */
}
```

#### 디렉토리 생성

속성을 지정하여 디렉토리를 생성할 수 있다. 지정하지 않으면 기본 속성으로 생성된다.  

`static Path createDirectory(Path dir, FileAttribute<?>... attrs)`

```java
Path dir = Paths.get("C:/dev/test-files-dir/");
try {
    Files.createDirectory(dir);
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}
```

여러 단계의 디렉토리를 한 번에 만들고 싶을때는 `createDirectories()` 메서드를 이용한다. 그런데 단계별로 디렉토리를 만들다가 실패할 가능성도 있다.

`static Path createDirectories(Path dir, FileAttribute<?>... attrs)`

```java
Path dir = Paths.get("C:/dev/test/newDir/newSubDir");
try {
    Files.createDirectories(dir);
} catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}
```

#### 임시 디렉토리 생성

`createTempDirectory()`로 임시 디렉토리를 만들 수 있다. 두 메서드의  위치를 지정하느냐 그렇지 않는냐의 차이가 있다.
```
static Path createTempDirectory(Path dir, String prefix, FileAttribute<?>... attrs)
static Path createTempDirectory(String prefix, FileAttribute<?>... attrs)
```

#### 디렉토리 내용 검색

`newDirectoryStream()`으로 디렉토리 내용을 나열할 수 있다.  `DirectoryStream` 인터페이스를 구현한 객체를 리턴하는데 여기에는 `iterator` 기능도 사용 가능하다. 스트림을 사용하므로 꼭 사용이 끝난 후에는 스트림을 닫아 주는 것을 잊지 말자. 이 메서드는 디렉토리의 숨긴파일을 포함한 전체내용을 리턴한다.  

`static DirectoryStream<Path> newDirectoryStream(Path dir)`

```java
Path dir = Paths.get("C:/dev/test-files");
try {
    DirectoryStream<Path> stream = Files.newDirectoryStream(dir);
    for (Path file: stream) {
        System.out.println(file.getFileName()); // 해당 폴더의 모든 파일명이 반복되면서 나온다.
    }
} catch (IOException | DirectoryIteratorException x) {
    // IOException can never be thrown by the iteration.
    // In this snippet, it can only be thrown by newDirectoryStream.
    System.err.println(x);
}
```

#### 디렉토리 필터링

Glob을 사용해 디렉토리 파일을 필터링 할 수도 있고 `DirectoryStream.Filter<T>`인터페이스를 사용해 직접 필터를 구현할 수도 있다. 인터페이스를 통해 구현한 필더는
`newDirectoryStream(Path, DirectoryStream.Filter<? super Path>)`로 호출하여 사용할 수 있다.


---
아래 내용은 참고 사이트를 참고하라  

### Random Access Files
### Links, Symbolic or Otherwise
### 파일 트리 살펴보기
### 파일 찾기
### 디렉토리에서 변경 사항 확인
### 기타 유요한 메서드
### 레거시 파일 I/O 비교
