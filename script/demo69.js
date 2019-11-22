/*
第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
*/

let string = 'AbC';
let stringArray = string.split('')

let newString = stringArray.map((item) => {
    return /[A-Z]/.test(item) ? item.toLowerCase() : item.toUpperCase()
}).join('')
console.log(newString);