/*
* 第 81 题：打印出 1 - 10000 之间的所有对称数 例如：121、1331 等 #131
*/

console.log([...Array(10000).keys()].filter((x) => {
    return x.toString().length > 1 && x === Number(x.toString().split('').reverse().join(''));
}));

