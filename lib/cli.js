// CLI tool to generate component files
const path = require('path')
const t = require('./templates')
const constants = require('./utils').constants

function CLI(defaults){
  defaults = defaults || {}
  const styled = defaults.styled ? defaults.styled : false
  const { name } = defaults;
  const type = defaults.type ? defaults.type : 'functional'

  const opts = Object.assign({}, defaults, { name, type })

  console.log('initd', opts);

  this._build = function(cb){
    if (!name) throw Error(`a name must be provided to the CLI build method`)

    const component = buildComponent(opts)
    const story = buildStory(opts)

    const data = []
    data.push(component)
    data.push(story)

    cb(null, data);
  }

  function builder(properties, opts, matcher){
    let data = []
    properties.forEach((prop) => {
      data.push(matcher(prop, opts));
    })
    return data
  }

  function buildComponent(opts){
    const properties = ['imports', 'type', 'proptypes', 'export']
    const data = builder(properties, opts, componentMatcher)
    return { type: opts.ext === 'jsx' ? constants.TYPE_COMPONENT_JSX : constants.TYPE_COMPONENT_JS , data }
  }

  function buildStory(opts){
    let story = [];
    const properties = ['imports', 'skeleton']
    const data = builder(properties, opts, storyMatcher)
    return { type: constants.TYPE_STORY, data }
  }

  function storyMatcher(prop, opts){
    let str = '';
    switch(prop){
      case 'imports':
        str = t.STORYBOOK.imports(opts.name)
        break
      case 'skeleton':
        str = t.STORYBOOK.skeleton(opts.name)
        break
    }
    return str;
  }

  function componentMatcher(prop, opts){
    let str = '';
    switch(prop){
      case 'imports':
        str = t.REACT.imports(opts.name)
        break
      case 'proptypes':
        str = t.REACT.proptypes(opts.name)
        break
      case 'export':
        str = t.REACT.componentExport(opts.name)
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
        comp = t.REACT.classComponent(name)
        break
      default:
        comp = t.REACT.functionalComponent(name)
        break
    }
    return comp;
  }
}

CLI.prototype.build = function(cb){
  this._build(cb)
}

module.exports = CLI
