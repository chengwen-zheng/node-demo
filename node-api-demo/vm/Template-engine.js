// 利用nodejs的vm模块创建模板引擎，这种模板引擎效率是最高的
const vm = require('vm');
const user = {
  name: '<script>leon</script>'
}

const templateMap = {
  templateA: '`<h1>${_(user.name)}${includes("templateB")}</h1>`',
  templateB: '`<p>hahhha</p>`'
}

const context = {
  _: (markup) => {
    if(!markup) return '';
    return String(markup)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/'/g,'&#39;')
            .replace(/"/g,'&quot');
  },
  includes: (name) => {
    return templateMap[name]();
  }
}

Object.keys(templateMap).forEach((key) => {
  let tempValue = templateMap[key];

  templateMap[key] = vm.runInNewContext(`()=>{
      return ${tempValue}
    }`, {
    ...context,
    user
  });
})

console.log(templateMap['templateA']())