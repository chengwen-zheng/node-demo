/*
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
*/

let arr = [1, 2, 3, 4, 5, 6, 7];


function moveArray(arr) {
    let temp = [];

    for (let i in arr) {
        temp[i] = i == 0 ? arr[arr.length - 1] : arr[parseInt(i) - 1];
    }

    return temp;
}

function moveArrayWithNumber(arr, number) {
    let j = 0;
    while (j < number) {
        arr = moveArray(arr);
        j++;
    }
    return arr;
}

console.log(moveArrayWithNumber(arr, 3))