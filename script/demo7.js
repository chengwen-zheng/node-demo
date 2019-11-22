// 第 7 期：ES5/ES6 的继承除了写法以外还有什么区别？ #20


// // 1. class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
// const bar = new Bar(); // it's ok
// function Bar() {
//   this.bar = 42;
// }

// const foo = new Foo(); // ReferenceError: Foo is not defined
// class Foo {
//   constructor() {
//     this.foo = 42;
//   }
// }

// //2. class 声明内部会启用严格模式。
// // 引用一个未声明的变量
// function Bar() {
//   baz = 42; // it's ok
// }
// const bar = new Bar();

// class Foo {
//   constructor() {
//     fol = 42; // ReferenceError: fol is not defined
//   }
// }
// const foo = new Foo();

// 3. class 的所有方法（包括静态方法和实例方法）都是不可枚举的。

// 引用一个未声明的变量
// function Bar() {
//   this.bar = 42;
// }
// Bar.answer = function() {
//   return 42;
// };
// Bar.prototype.print = function() {
//   console.log(this.bar);
// };
// const barKeys = Object.keys(Bar); // ['answer']
// const barProtoKeys = Object.keys(Bar.prototype); // ['print']

// console.log(barKeys);
// console.log(barProtoKeys);

// class Foo {
//   constructor() {
//     this.foo = 42;
//   }
//   static answer() {
//     return 42;
//   }
//   print() {
//     console.log(this.foo);
//   }
// }
// const fooKeys = Object.keys(Foo); // []
// const fooProtoKeys = Object.keys(Foo.prototype); // []
// console.log(fooKeys);
// console.log(fooProtoKeys);

// let bar = new Bar();
// bar.print();
// console.log(bar.bar);

// 4. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。

// function Bar() {
//   this.bar = 42;
// }
// Bar.prototype.print = function() {
//   console.log(this.bar);
// };

// const bar = new Bar();
// const barPrint = new bar.print(); // it's ok

// class Foo {
//   constructor() {
//     this.foo = 42;
//   }
//   print() {
//     console.log(this.foo);
//   }
// }
// const foo = new Foo();
// const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor

// // 5 必须使用 new 调用 class。

// function Bar() {
//   this.bar = 42;
// }
// const bar = Bar(); // it's ok

// class Foo {
//   constructor() {
//     this.foo = 42;
//   }
// }
// const foo = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'

// 6. class 内部无法重写类名。
// function Bar() {
//   Bar = 'Baz'; // it's ok
//   this.bar = 42;
// }
// const bar = new Bar();
// // Bar: 'Baz'
// // bar: Bar {bar: 42}  

// class Foo {
//   constructor() {
//     this.foo = 42;
//     // Foo = 'Fol'; // TypeError: Assignment to constant variable
//   }
// }
// const foo = new Foo();
// Foo = 'Fol'; // it's ok


// function Parent(name){
//   this.name = name;
// }

// Parent.prototype.getName = function() {
//   return this.name;
// };

//    // 定义子类
// function Children() {
//     this.age = 24;
// }

// // 通过Children的prototype属性和Parent进行关联继承

// Children.prototype = new Parent('陈先生');

// // Children.prototype.constructor === Parent.prototype.constructor = Parent

// var test = new Children();

// test.constructor === Children.prototype.constructor === Parent

// console.log(test.age) // 24
// console.log(test.getName()); // 陈先生



// 2.构造函数继承
// 定义父类
function Parent(value) {
  this.language = ['javascript', 'react', 'node.js'];
  this.value = value;
}

// 定义子类
function Children() {
Parent.apply(this, arguments);
}

const test = new Children(666);

console.log(test.language) // ['javascript', 'react', 'node.js']
console.log(test.value) // 666