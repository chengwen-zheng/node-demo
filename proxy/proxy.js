let a = {name:'zhou',_name:'1',name_:'-1'}

a = new Proxy(a,{
  get: function(target, p) {
    console.log('before:'+target['_'+p])
    console.log(target[p])
    console.log('after:'+target[p+'_'])
  }
})

a.name

