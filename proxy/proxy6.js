function before(thisArg,argumentsList) {
  console.log(`before say,I'm ${thisArg.name}.${argumentsList}`)
}

function after(ret,thisArg,argumentsList) {
  console.log(`before say,I'm ${thisArg.name}.${argumentsList}`)
}

class Person {
  constructor(){
    this.name = 'zhou'
    this.say = watch(this.say,before,after)
  }
  say(message){
    console.log(`hello world,I'm ${this.name}.${message}`)
  }
}

function watch(source,before,after) {
  let handlers = {
    function: {
      apply: function (target, thisArg, argumentsList) {
        if(before !== undefined && before !== null) {
          before(thisArg, argumentsList)
        }
        let ret =  Reflect.apply(target, thisArg, argumentsList)
        if(after !== undefined && after !== null) {
          after(ret, thisArg, argumentsList)
        }
        return ret
      }
    }
  }
  let handler = handlers[typeof source]
  if(handler !== undefined && handler !== null) {
    return new Proxy(source, handler)
  }else {
    return source
  }
}


let person = new Person()
person.say('nice to meet you!')
