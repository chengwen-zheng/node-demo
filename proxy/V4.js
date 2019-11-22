class ScriptConfig{
  constructor() {
    this.enable = true
    this.params = []
    this.conditions = undefined
    this.preprocess = undefined
    this.children = []
    this.ret = undefined
  }
  genScript(){
    if(!this.enable){
      return ''
    }
    let script = ''
    for(let i in this.params){
      script += this.params[i] + '\n'
    }
    if(this.conditions !== undefined) {
      script += 'if (' + this.conditions + '){\n'
    }
    if(this.preprocess !== undefined) {
      script += this.preprocess + '\n'
    }
    for(let i in this.children){
      script += this.children[i].genScript()
    }
    if(this.ret !== undefined) {
      script += '   return ' + this.ret + '\n'
    }
    if(this.conditions !== undefined) {
      script += '}\n'
    }
    return script
  }

  genRunfunc() {
    let func = '(function (){\n'
    func += this.genScript()
    func += '})'
    return func
  }
}

let child = new ScriptConfig()
// child.enable = false
child.params.push('let a= 100')
child.params.push('let b= 100')
child.conditions = 'a >=1 && b>= 100'
child.preprocess = 'console.log("a="+a+",b="+b)'
child.ret = 'a + b'

let root = new ScriptConfig()
root.preprocess = 'console.log("root")'
// root.params.push('let a= 100')
// root.params.push('let b= 100')
// root.conditions = 'a >=1 && b>= 100'
root.children.push(child)

console.log(JSON.stringify(root, null, 2))
console.log(root.genRunfunc())
console.log(eval(root.genRunfunc())())


