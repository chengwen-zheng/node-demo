// const s = new Set();
// [1, 2, 3, 4, 3, 2, 1].forEach(x => s.add(x));

// for (let i of s) {
//     console.log(i)	// 1 2 3 4
// }

// // 去重数组的重复对象
// let arr = [1, 2, 3, 2, 1, 1];
// console.log([...new Set(arr)])	// [1, 2, 3]





// let set = new Set([1, 2, 3,'df'])
// console.log(set.keys())	// SetIterator {1, 2, 3}
// console.log(set.values())	// SetIterator {1, 2, 3}
// console.log(set.entries())	// SetIterator {1, 2, 3}

// for (let item of set.keys()) {
//   console.log(item);
// }	// 1	2	 3
// for (let item of set.entries()) {
//   console.log(item);
// }	// [1, 1]	[2, 2]	[3, 3]

// set.forEach((value, key) => {
//     console.log(key + ' : ' + value)
// })	// 1 : 1	2 : 2	3 : 3
// console.log([...set])	// [1, 2, 3]




// map: 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数;

// const set = new Set([
//   ['foo', 1],
//   ['bar', 2]
// ]);
// const m1 = new Map(set);
// console.log(m1.get('foo')); // 1

// const m2 = new Map([['baz', 3]]);
// const m3 = new Map(m2);
// console.log(m3.get('baz')) // 3


let map = new Map();

console.log(map.set(-0, 123));
console.log(map.get(+0)) // 123
console.log(map.set(true, 1));
console.log(map.set('true', 2));
console.log(map.get(true)) // 1
console.log(map.set(undefined, 3));
console.log(map.set(null, 4));
console.log(map.get(undefined)) // 3
console.log(map.set(NaN, 123));
console.log(map.get(NaN)) // 123

console.log(map.get('true')); // 4

console.log([...map])