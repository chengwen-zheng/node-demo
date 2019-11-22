/*
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
示例:
    输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
复制代码说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。
*/

let arr = [0, 1, 0, 0, 12, 0, 0, 1, 0, 0];

function moveZero(arr) {
    let i = 0;
    let k = 0;
    let j = arr.length - 1;
    while (k < (arr.length - 1)) {
        if (arr[i] == 0) {
            arr.push(arr[i]);
            arr.splice(i, 1);
            j--;
        } else {
            i++;
        }
        k++;
    }
    return arr;
}


function displacement(arr) {
    let i = 0;
    for (let j = 0, len = arr.length; j < len; j++) {
        if (arr[j] !== 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++;
        }
    }
    return arr;
}

console.log(displacement(arr));

console.log(moveZero(arr));
