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


## Link 컴포넌트

<a>와 같이 페이지 이동의 역할이다.
다만, <a>태그와 달리 새로고침을 하지 않는다.
새로고침을 한다는 의미는 기존에 렌더링 되었던 리소스들과 컴포넌트들의 상태값이 초기화 되고
다시 렌더링을 해야 한다는 의미가 된다.
Link는 새로고침 대신 이동할 주소만 변경해 주기 때문에 새로고침이 일어나지 않는다.


App.js

```js
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
```


Home.js
```js
function Home() {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    );
    const json = await response.json();
    setMovies(json.data.movies);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <h1>Movie Selection</h1>
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              coverImg={movie.medium_cover_image}
              url={movie.url}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
    </div>
  );
}
```

title을 클릭하면 /movie와 매칭이 되는 Detail.js가 열리게 되는데 이때, <a>태그를 사용하면 화면이 새로고침이 되어 버린다. 아래 예시에는 js나 css 같은 리소스가 없어 큰 차이가 없지만 만약 페이지에

Movie.js
```js
function Movie({ coverImg, url, title, summary, genres }) {
  return (
    <div>
      <img src={coverImg} alt={title}></img>
      <h1>
        <a href="/movie">{title}</a>
      </h1>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

```

Detail.js
```js
function Detail() {
  return (
    <>
      <h1>Detail</h1>
      <p>123</p>
    </>
  );
}
```



### 참고  

[노드JS](https://nodejs.org/ko/)
[create-react-app](https://create-react-app.dev/)
[라우터](https://reactrouter.com/docs/en/v6/getting-started/tutorial#connect-the-url)
