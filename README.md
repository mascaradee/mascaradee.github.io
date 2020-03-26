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

2. git 폴더가 생성되면 Atom에서 해당 폴더를 열기

3. Atom > `GitHub` 에서 gitHub 로그인 정보를 연결  
`initialize ~~` 클릭하면 github사이트에서 인증키를 주고 해당 키를 atom에 입력

### 마크다운 프리뷰 설정

- `Settings`(<kbd>ctrl + ,</kbd>) > `Packages` > `install packages` > 'markdown' 검색  
 `Markdown Preview` > `Settings` > `Open Preview in Split Pane` 비활성화

## 지킬 설정
