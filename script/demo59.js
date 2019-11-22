var nums1 = [1, 2, 2, 1, 5, 5];
var nums2 = [2, 2, 6, 78];


function mergeArray(arr1, arr2) {
    let newArr = [];
    for (let i in arr1) {
        if (arr2.includes(nums1[i])) {
            newArr.push(nums1[i])
        }
    }
    return newArr
}

console.log(mergeArray(nums1, nums2));


function mergeArray2(arr1, arr2) {
    return arr1.filter(item => {
        let idx = arr2.indexOf(item)
        if (idx !== -1) {
            arr2 = arr2.splice(idx, 1);
            return item
        }
    })
}

console.log(mergeArray2(nums1, nums2));


function isExsitWith(numGroup1, numGroup2) {

    let betterArray = [];

    let eachCode = []
    numGroup1.forEach(val=>{
        eachCode.push(val);
        if(numGroup2.toString().indexOf(eachCode.toString()) == -1) {
            eachCode.pop()
            eachCode.length > 1 && betterArray.push(eachCode)
            eachCode = []
        }

    })

    return betterArray;
}

console.log(
    isExsitWith([1, 2, 2, 1, 1, 9, 9, 6, 1, 1, 2, 3, 3], [2, 2, 9, 9, 6,])
)
