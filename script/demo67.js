/*
*第 67 题：随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
*/

let arr = [2, 10, 3, 4, 5, 11, 10, 11, 20];

function groupArr(arr) {
    const sortArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    const map = new Map()
    sortArr.forEach((v) => {
        const key = Math.floor(v / 10);
        const group = map.get(key) || [];
        group.push(v);

        map.set(key, group);
    });

    return [...map.values()];
}

console.log(groupArr(arr))