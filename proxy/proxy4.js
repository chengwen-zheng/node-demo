class Person {
  constructor(){
    this.name = 'zhou'
  }
  say(){
    console.log(`hello world,I'm ${this.name}`)
  }
  _say() {
    console.log(`before say,I'm ${this.name}`)
  }
  say_() {
    console.log(`after say,I'm ${this.name}`)
  }
}

function createWatchProxy(func) {
  let handler = {
    construct(target, argArray, newTarget) {
      let obj = new target(...argArray);
      let methodList = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
      for(let i in methodList){
        i = methodList[i]
        if(obj[i] instanceof Function){
          if((!i.startsWith('_'))&&(!i.endsWith('_'))) {
            obj[i] = new Proxy(obj[i], {
              apply: function (target, thisArg, argumentsList) {
                if(obj['_'+i] instanceof Function){
                  obj['_'+i](...argumentsList)
                }
                // let ret = target(...argumentsList)
                let ret = Reflect.apply(target, thisArg, argumentsList)
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
  return new Proxy(func,handler)
}

// eslint-disable-next-line no-func-assign
Person = createWatchProxy(Person)

let person = new Person()
person.say()
