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
