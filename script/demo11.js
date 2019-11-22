// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// let newArr = [];

// let _toString = Object.prototype.toString
// let map = {
//     array: 'Array',
//     object: 'Object',
//     function: 'Function',
//     string: 'String',
//     null: 'Null',
//     undefined: 'Undefined',
//     boolean: 'Boolean',
//     number: 'Number'
// }
// let getType = (item) => {
//     return _toString.call(item).slice(8, -1)
// }
// let isTypeOf = (item, type) => {
//     return map[type] && map[type] === getType(item)
// }

// // 深度搜索
// let deepTraversal1 = (node, nodeList = []) => {
//   if (node !== null) {
//     nodeList.push(node)
//     let children = node.children

//     for (let i = 0; i < children.length; i++) {
//       deepTraversal1(children[i], nodeList)
//     }
//   }
//   return nodeList
// }

// let flatMap = (node, newList = []) =>{
//   if(isTypeOf(node, 'array')){
//    for (let i = 0; i < node.length; i++) {
//      flatMap(node[i],  newList);
//    }
//   }else{
//     if(!newList.includes(node)){
//       newList.push(node)
//     }
//   }
//   return newList.sort((a,b) => a-b);
// }

// let result = flatMap(arr);

// console.log(result);

// 第二种写法
// flat api node只有在11.0.0才加入
var arr2 = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];


var arr3 = [2,[1, 2, 2]];

// let result2 = Array.from(new Set(arr2.flat(Infinity))).sort((a,b)=>{ return a-b});

arr3.flat()