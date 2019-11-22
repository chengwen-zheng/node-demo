// 第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？


// var obj = new Proxy({}, {
//   get: function (target, key, receiver) {
//     console.log(`getting ${key}!`);
//     return Reflect.get(target, key, receiver);
//   },
//   set: function (target, key, value, receiver) {
//     console.log(`setting ${key}!`);
//     return Reflect.set(target, key, value, receiver);
//   }
// });


// obj.count =1
// ++obj.count;


// var handler = {
//   get: function(target, name) {
//     if (name === 'prototype') {
//       return Object.prototype;
//     }
//     return 'Hello, ' + name;
//   },

//   apply: function(target, thisBinding, args) {
//     return args[0];
//   },

//   construct: function(target, args) {
//     return {value: args[1]};
//   }
// };

// var fproxy = new Proxy(function(x, y) {
//   return x + y;
// }, handler);

// console.log(fproxy(1, 2)) // 1
// console.log(new fproxy(1, 2)) // {value: 2}
// console.log(fproxy.prototype === Object.prototype) // true
// console.log(fproxy.foo === "Hello, foo") // true


/*  数组 */
// function createArray(...elements) {
//   let handler = {
//     get(target, propKey, receiver) {
//       let index = Number(propKey);
//       if (index < 0) {
//         propKey = String(target.length + index);
//       }
//       return Reflect.get(target, propKey, receiver);
//     }
//   };

//   let target = [];
//   target.push(...elements);
//   return new Proxy(target, handler);
// }

// let arr = createArray('a', 'b', 'c');

// console.log(arr[-1]); // c


var pipe = (function () {
    return function (value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function (pipeObject, fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    }, value);
                }
                funcStack.push(eval(fnName));
                return oproxy;
            }
        });

        return oproxy;
    }
}());

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

console.log(pipe(3).double.pow.reverseInt.get); // 63