// src속성으로 별도 javascript를 추가할수 있다
alert( '이건 별도 자바스크립트!!' )

// 줄바꿈이 세미콜론을 대신할 수 있다.
alert( '이것도 별도 자바스크립트!!' )

// 줄바꿈이 세미콜론을 대신하지 못하는 경우도 있다.
alert(3 +
1
+2);

// 에러 예제
/*
alert ("에러가 발생")
[1,2].forEach(alert)
*/
// 결과: Uncaught TypeError: Cannot read property '2' of undefined

// 정상 예제
alert ("정상");
[1,2].forEach(alert)
