/* 为了实现可迭代，一个对象必须实现 @@iterator 方法，这意味着这个对象（或其原型链中的任意一个对象）必须具有一个带 Symbol.iterator 键（key）的属性。*/

var myIteratorObject = {
    * [Symbol.iterator]() {
        yield 'first';
        yield 'second';
        yield 'three';
    }
}

for (let value of myIteratorObject) {
    console.log(value);
}

/*
* String、Array、TypedArray、Map 和 Set 都是内置可迭代对象，因为它们的原型对象都拥有一个 Symbol.iterator 方法。
* 一些语句和表达式专用于可迭代对象，例如 for-of 循环，展开语法，yield* 和 解构赋值。
* */

// for-of
for (let value of ['a', 'b', 'c']) {
    console.log(value);
}
// "a"
// "b"
// "c"

[...'abc']; // ["a", "b", "c"]

// yield* 生成迭代器。
function* gen() {
    yield* ['a', 'b', 'c', 'd'];
}

let iterator = gen();
let next = iterator.next();
while (!next.done) {
    console.log(next.value);
    next = iterator.next();
}

// set对象
[a, b, c] = new Set(['a', 'b', 'c']);
a; // "a"