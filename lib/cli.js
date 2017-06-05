// CLI tool to generate component files
const path = require('path')
const t = require('./templates')

function CLI(defaults){
  defaults = defaults || {}
  const styled = defaults.styled ? defaults.styled : false
  const { name } = defaults;
  const type = defaults.type ? defaults.type : 'functional'

  const opts = Object.assign({}, defaults, { name, type })

  console.log('initd', opts);

  this._build = function(cb){
    if (!name) throw Error(`a name must be provided to the CLI build method`)

    let data = [];
    const properties = ['imports', 'type', 'proptypes', 'export']

    properties.forEach((prop) => {
      data.push(matcher(prop, opts));
    })

    cb(null, data);
  }

  function matcher(prop, opts){
    let str = '';
    switch(prop){
      case 'imports':
        str = t.imports(opts.name)
        break
      case 'proptypes':
        str = t.proptypes(opts.name)
        break
      case 'export':
        str = t.componentExport(opts.name)
        break
      case 'type':
        str = componentType(opts.type, opts.name)
        break
    }
    return str;
  }

  // default to a functional component
  // fuck es6 classes
  function componentType(type, name){
    let comp = '';
    switch(type){
      case 'class':
        comp = t.classComponent(name)
        break
      default:
        comp = t.functionalComponent(name)
        break
    }
    return comp;
  }
}

CLI.prototype.build = function(cb){
  this._build(cb)
}

module.exports = CLI
