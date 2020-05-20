alert('operator start');

// let x = 5;
// x = -x;
// alert(x); // -5
//
// let y = 10, z = 39;
// alert( z - y ); // 29
//
// alert( 10 % 3 ); // 1 -> 10/3은 몫 3, 나머지 1인데 %는 나머지를 리턴한다.
//
// alert( 2 ** 10); // 1024 -> 2*2*2*2*2*2*2*2*2*2
//
// alert( 4 ** (1/2)); // 2
// alert( 8 ** (1/3)); // 2

// let s = "my" + "javascript";
// alert(s); // myjavascript
//
// alert( '3' + 9 ); // 39
// alert( 3 + '9' ); // 39
// alert( 2 + 1 + '9') // 39 -> 왼쪽부터 순차적으로 진행되므로 2+1 = 3 후에 30 + '9'

// alert('10' - 2); // 8
// alert('10' / '2'); // 5

// let x = 1;
// alert(+x); // 1
//
// let y = -2;
// alert(+y); // -2
//
// alert(+true); // 1 -> Number(true)와 같은 결과
// alert(Number(true));// 1
// alert(+''); // 0 -> Number('')와 같은 결과
// alert(Number('')); // 0

// alert(+'123a ');
// alert(typeof(+'123a '));

// let first = '3';
// let last = '9';
// alert(first + last); // 39 -> 이항연산자 +는 문자열 연결
//
// first = '30';
// last = '9';
// alert(+first + +last); // 30 + 9 = 39

// let a = 20 * 2 - 1
// alert(a); // 39

// let a = 1;
// let b = 2;
// let c = 3 - ( a = b + 1); // 1) b+1, 2) a = b + 1, 3) 3 - (a = b + 1), 4) c = 3 - (a = b + 1)
// alert(a); // 3
// alert(c); // 0
//
// let a, b, c;
// a = b = c = 2 + 2; // 1) 2+2, 2) c=2+2, 3) b=c, 4) a=b
// alert(a);// 4
// alert(b);// 4
// alert(c);// 4
//
// let n = 15;
// n *= 2; // 15 * 2 = 30를 한 후 n에 할당
// n += 9; // 30 + 9 = 39를 한 후 n에 할당
// alert(n); // 39
//
// let n = 2;
// n *= 3 + 5;
// alert (n); // 2 * ( 3 + 5) = 16 -> n *= 8

// let counter = 2;
// counter++; // counter = counter + 1;
// alert(counter); // 3
//
// counter = 2;
// counter--; // counter = counter - 1;
// alert(counter); // 1
//
// 5++; // SyntaxError: invalid increment/decrement operand

// let counter = 1;
// let a = ++counter; // ++수행 -> 할당 =
// alert(a); // 2
//
// counter = 1;
// let b = counter++; // 할당 = -> ++ 수행
// alert(b); // 1
//
// counter = 0;
// counter++; // counter = 1
// ++counter; // counter = 2
// alert(counter); // 2

// let a = (1 + 2, 3 + 4);
// alert(a); // `()` 안이 먼저 연산, 그 안의 1+2=3, 3+4=7 표현식중 마지막 3+4=7만 반환, 3은 무시
//
// a = 1 + 2, 3 + 4
// alert(a); // a = 3, 7로 `+`가 먼저 연산되어  a = 3, 7, `,`보다 `=`의 우선순위가 높아  a=3 반환되고 7은 무시


// let a = 1, b = 1;
// let c = ++a; // 2
// let d = b++; // 1

//
// let a = 2;
// let x = 1 + (a *= 2); // a = 4, x = 5
// alert(a);
// alert(x);

// '' + 1 + 0 // 1 -> 10 --> ''이 `+` 로 엮일때는 문자열로 인식
// '' - 1 + 0 // -1 --> `-`는 숫자만 받으므로 ''를 0으로 인식
// true + false // 1
// 6 / '3' // 2
// '2' * '3' // 6
// 4 + 5 + 'px' // 9px
// '$' + 4 + 5 // $45
// '4' - 2 // 2
// '4px' - 2 // 4px2 -> NaN  --> `-`는 숫자만 받는데 '4px'는 숫자로 변환불가
// 7/0 // infinity
// '   -9   ' + 5 //-4 -> '   -9   5' -->  `+`는 문자열을 그대로 받는다
// '   -9   ' - 5 // -14 ** `-`는 숫자만 인수로 받기때문에 형변환한다.
// null + 1 // 1
// undefined + 1 // NaN
// ' \t \n' - 2 // NaN -> -2 --> `\t\n` 은 공백을 뜻한다.

// let a = prompt('First number?', 1);
// let b = prompt('Second number?', 2);
// // alert(a + b); // 12
// alert(+a + +b); // 3


// alert(5 > 4); // true
// alert('apple' > 'pineapple'); // false, 문자열은 사전순으로 비교
// alert('2' > '12'); // false, 비교연산자는 숫자형으로 자동변환하여 비교
// alert(undefined == null); // true, 예외로 같은 취급
// alert(undefined === null); // false, 자동형변환 되지 않아 다름
// alert(null == '\n0\n'); // true, 숫자형으로 변환 0 == 0
// alert(null === +'\n0\n'); // false, null === 0

let a = prompt('첫번째 숫자?');
let b = prompt('두번째 숫자?');
let result = (+a + +b < 4) ? '미만' : '이상';
alert(result);
