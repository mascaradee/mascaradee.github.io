---
layout: post
date: 2021-12-21 16:29:00 +0900
title: '[reactJS] Link'
categories:
  - reactJS
tags:
  - link
  - router
  - switch
---

* Kramdown table of contents
{:toc .toc}


## 에러1

```
SyntaxError: C:\dev\reactjs\mulberry\src\routes\Detail.js: Unexpected reserved word 'await'. (7:4)


const getMovie = async(() => {
  const json = await(() => {
    await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .json;
  });
  console.log(json);
});
```
async 구문을 잘못 씀

```
const getMovie = async () => {
  const json = await (
    await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
  ).json();
  console.log(json);
};
```


## 에러 2

setMovie(json.data.movie); 이게 movie의 상태값을 바꿔줬을 거라고 생각했는데 값이 세팅되지 않음
const 변수는 return 문 안에서만 쓸 수 있는건가?

```
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'map')

const [movie, setMovie] = useState({});
const [genres, setGenres] = useState({});
const getMovie = async () => {
  const json = await (
    await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
  ).json();
  setLoading((current) => !current);
  setMovie(json.data.movie);
  setGenres(movie.genres); // 이렇게 쓰면 안됨 왜? -> 아직 렌더링 되지 않은 상태? 위에서 movie 상수에 값이 변경된게 아닌가?
  console.log("2:" + genres); // undefined 왜?
};
useEffect(() => {
  getMovie();
}, []);
console.log("1:" + genres); // 4번째 렌더링? 할때 값이 들어감.
return(
    <ul>
        {genres.map((g) => (
            <li key={g}>{g}</li>
        ))}
    </ul>
);


```



### 참고  

[노드JS](https://nodejs.org/ko/)
[create-react-app](https://create-react-app.dev/)
[라우터](https://reactrouter.com/docs/en/v6/getting-started/tutorial#connect-the-url)
