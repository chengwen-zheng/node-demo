class Animal {
  constructor(name) {
    this.name=name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    // 注入this对象
    super(name)
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

let d=new Dog('Mitzie');
d.speak(); // Mitzie barks.; 


function cls() {
  this.a=100;

  return {
    getValue: ()=> this.a
  }
}

var o = new cls();
console.log(o.getValue()); //100//a在外面永远无法访问到