var a = {
  i: 1,
  // toString() {
  //   return a.i++;
  // }
}

// 因为==会进行隐式类型转换 所以我们重写toString方法就可以了
Object.defineProperty(window, 'a', {
  get: function() {
      return this.value += 1;
  }
});

if( a == 1 && a == 2 && a == 3 ) {
  console.log(1);
}