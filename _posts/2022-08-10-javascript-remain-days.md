---
layout: post
date: 2022-08-10 19:05:00 +0900
title: '[javascript] d-day까지 남은 날은?'
categories:
  - javascript
tags:
  - date
  - floor
  - padStart
---

* Kramdown table of contents
{:toc .toc}

## d-day까지 남은 날은?

```html
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="style.css">
  <title>Vanilla Challenge</title>
  <meta charset="UTF-8" />
</head>

<body>
  <H1>Time Unitl d-day</H1>
  <h2 id="remainDays"></h2>
  <script>
    const h2 = document.querySelector('#remainDays');

    function getRemainDays() {

      const christmas = new Date(2022, 11, 25).getTime();
      const now = new Date().getTime();
      const remainMilliSecond = christmas - now;

      const seconds = String(Math.floor((remainMilliSecond / 1000) % 60)).padStart(2, "0");
      const minutes = String(Math.floor((remainMilliSecond / 1000 / 60) % 60)).padStart(2, "0");
      const hours = String(Math.floor((remainMilliSecond / 1000 / 60 / 60) % 24)).padStart(2, "0");
      const days = Math.floor(remainMilliSecond / 1000 / 60 / 60 / 24);

      h2.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    getRemainDays();
    setInterval(getRemainDays, 1000);
  </script>
</body>

</html>
```
