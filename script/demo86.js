/*
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用
*/

let nums = [11, 15, 11, 15, 11, 15, 89, 6767, 2, 7];

function getTarget(nums, target) {
    let usedArr = [];
    while (nums.length > 0) {
        let item = nums.shift();
        if (usedArr.includes(item)) {
            continue;
        }
        for (let i in nums) {
            if (nums[i] + item === target) {
                return [nums[i], item];
            }
        }
        usedArr.push(item);
    }
}

/*
* 双指针
* */

function getTargetArr(nums, target) {
    // sort
    let start = 0;
    let end = nums.length - 1;
    nums = nums.sort((a, b) => {
        return a > b
    })

    while (start < end) {
        if (nums[start] + nums[end] === target) {
            return [nums[start], nums[end]]
        } else if (nums[start] + nums[end] > target) {
            end--;
        } else {
            start++;
        }
    }
}

console.log(getTargetArr(nums, 9));

console.log(getTarget(nums, 9));