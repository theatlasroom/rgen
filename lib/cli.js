// CLI tool to generate component files
const fs = require('fs')
const path = require('path')
const t = require('./templates')

const dirs = {
  components: path.join(__dirname, 'src/components')
}

function CLI(defaults){
  defaults = defaults || {}
  const styled = defaults.styled ? defaults.styled : false
  const name = defaults.name ? defaults.name : 'Lawwwwwl'
  const type = defaults.type ? defaults.type : 'functional'
  const ext = defaults.ext ? defaults.ext : 'jsx'

  const opts = Object.assign({}, defaults, { name, type })

  this._build = function(){
    if (!name) throw Error(`a name must be provided`)

    let data = [];
    data.push(matcher('imports', opts));
    data.push(matcher('type', opts));
    data.push(matcher('proptypes', opts));
    data.push(matcher('export', opts));
    serialize(path.join('./', `${name}.${ext}`), data.join('\n'));
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

  function serialize(file, data){
    fs.writeFile(file, data, (err) => {
      if (err) throw Error(`There was a problem creating ${file}`)
      done(file);
    })
  }

  function done(file){
    console.info(`Done! Created file ${file}`);
  }
}

CLI.prototype.build = function(){
  this._build()
}

module.exports = new CLI()
