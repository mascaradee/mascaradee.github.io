# mascaradee.github.io

## 글 작성 시 주의 사항

 - 파일명과 카테고리, 태그는 반드시 소문자로 작성할 것. 파일명과 카테고리는 파일 시스템에 영향을 주기 때문이고 태그는 대소문자 혼용하면 같은 태그인데도 이원화됨.
 - 태그는 띄어쓰지 않는다. 구분이 필요하면 - 사용.
 - 카테고리는 하나만 작성한다. 여러 깊이의 분류를 구성하는것보다 태그를 여러개 두는 게 낫다.
 - 아톰에서 마크다운 syntax가 깨지는 것처럼 보일 때는 반드시 이유가 있다. 정규식이나 언더바 등을 확인할 것.

## git 설정

1. [github 로그인](https://github.com/mascaradee/)

2. 블로그용 프로젝트(mascaradee.github.io) 생성 후 'Clone or download' 버튼으로 url 복사  
`https://github.com/mascaradee/mascaradee.github.io.git`

4. 로컬에 git 폴더 생성
`C:\dev\git`

5. 해당 폴더 우클릭 'Git Bash Here'로 git터미널을 열고 github에서 복사한 url 이용 git repository clone  
`git clone https://github.com/mascaradee/mascaradee.github.io.git`


## 아톰 설정

### git연동

1. [Atom](https://atom.io/) 에디터 설치  

2. git 폴더가 생성되면 Atom에서 해당 폴더를 열기(New Folder)

3. Atom > `GitHub` 에서 gitHub 로그인 정보를 연결  
`Login` 버튼 클릭하면 github사이트(github.atom.io/login)에서 인증키를 주고 해당 키를 atom에 입력

### 마크다운 프리뷰 설정

- `Settings`(<kbd>ctrl + ,</kbd>) > `Packages` > `install packages` > 'markdown' 검색  
 `Markdown Preview` > `Settings` > `Open Preview in Split Pane` 비활성화

## 지킬 설정

## 지킬 빌드 디버깅 로그

### bundler 실행 시 'find_spec_for_exe': can't find gem bundler (>= 0.a) with executable bundle (Gem::GemNotFoundException)

https://github.com/rbenv/rbenv/issues/1138  
아래처럼 `Gemfile.lock`에 있는 버전을 강제로 지정해서 해결함.

```bash
$ cat Gemfile.lock | grep -A 1 "BUNDLED WITH"
BUNDLED WITH
   1.17.3

$ gem install bundler -v '1.17.3'
```

### on 태그는 빌드 불가

```bash
      Remote Theme: Using theme yizeng/jekyll-theme-simple-texture
  Liquid Exception: Liquid error (line 40): comparison of TrueClass with String failed in /_layouts/post.html
             Error: Liquid error (line 40): comparison of TrueClass with String failed
             Error: Run jekyll build --trace for more information.
```

### Error:  No source of timezone data could be found.

윈도우에서 `tzinfo-data` gem 사용 시 발생할 수 있다고 함. `Gemfile` 파일에 아래 추가:

```bash
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
```

###  Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss': Invalid CP949 character "\xE2"

지킬 빌드나 서버 구동 시 다국어 관련 에러가 발생할 수 있다. 쉘에서 `chcp 65001` 입력 후 다시 실행한다.



---

## package 설치

### Settings(ctrl + , ) 열어 원하는 package 찾기

왼쪽 밑에 `install >  String case(camel type 변환 패키지) 찾아 install`

### keybinding

#### 사용자 keybinng 파일 열기

`keymap.cson` : 사용자 키 매핑 파일로 시스템 키 매핑보다 우선한다.

- `Settings > Keybings > your keymap file` 를 클릭하거나

- `ctrl + shift + p > open your keymap` (혹은 keymap만 검색해도 무방)을 열어 원하는 키로 바인딩한다.


#### keybinding 변경
- `Settings > Keybings > 검색`으로 설치한 package별로  keybinding을 볼수있고 단축키 왼쪽에 복사키가 있으므로 복사 후 사용자 파일에 복붙한 뒤 원하는 키로 변경한다.
