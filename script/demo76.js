
/*
对象的键名只能是字符串和 Symbol 类型。
其他类型的键名会被转换成字符串类型。
对象转字符串默认会调用 toString 方法。
*/

// example 1
var a={}, b='123', c=123;
a[b]='b';
a[c]='c';
console.log(a[b]); // c


// example 2
var a={}, b=Symbol('123'), c=Symbol('123');
a[b]='b';
a[c]='c';
console.log(a[b]); // b

// example 3
var a={}, b={key:'123'}, c={key:'456'};
a[b]='b';
a[c]='c';
console.log(a[b]); // c