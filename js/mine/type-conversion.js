// let value = true;
// alert(typeof value); // boolean
//
// value = String(value); // "true"
// alert(typeof value);  // string
//
// alert('6' * '2'); // 12
// alert(typeof ('6' * '2')); // number

// let str = '123'; // "123"
// alert(str);
// alert(typeof str); // string
//
// str = Number(str);
// alert(str); // 123
// alert(typeof str); // number

// let grade = Number('나는 1학년이야');
// alert(grade); // NaN

// alert(Number(undefined)); // NaN
// alert(Number('undefined')); // NaN
// alert(Number()); // 0
// alert(Number('')); // 0
// alert(Number(null)); // 0
// alert(Number(' ')); // 0
// alert(Number('123 ')); // 123
// alert(Number('123a ')); // NaN
// alert(Number(true)); // 1
// alert(Number(false)); // 0

alert(Boolean(0)); // false
alert(Boolean('')); // false
alert(Boolean(null)); // false
alert(Boolean(undefined)); // false
alert(Boolean(NaN)); // false
alert(Boolean('0')); // true -> 문자열로 인식
alert(Boolean(' ')); // true -> 문자열 공백으로 인식

// alert(Number(' ')); // 0
// alert(Boolean(' ')); // true
// alert(String(' ')); // 공백
