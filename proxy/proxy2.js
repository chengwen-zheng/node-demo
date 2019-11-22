function Person() {
  this.name = "zhou"
  this.say = function () {
    console.log(`hello world,I'm ${this.name}`)
  }
  this._say = function () {
    console.log('before say')
  }
  this.say_ = function () {
    console.log('after say')
  }
}

const handler = {
  construct(target, argArray, newTarget) {
    console.log('proxy constructor called');
    let obj = new target(...argArray);
    for(let i in obj){
      if(obj[i] instanceof Function){
        if((!i.startsWith('_'))&&(!i.endsWith('_'))) {
          obj[i] = new Proxy(obj[i], {
            apply: function (target, thisArg, argumentsList) {
              if(obj['_'+i] instanceof Function){
                obj['_'+i](...argumentsList)
              }
              let ret = target(...argumentsList)
              if(obj[i + '_'] instanceof Function) {
                obj[i + '_'](...argumentsList)
              }
              return ret
            }
          })
        }
      }
    }
    return obj
  }
}

Person = new Proxy(Person,handler)

let person = new Person()
person.say()
