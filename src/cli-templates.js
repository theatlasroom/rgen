const imports = (name) =>
`
import React from 'react'
// import PropTypes from 'react-proptypes'
`

const importStyles = (name) =>
`import Styled${name}from './styles'`

const classComponent = (name) =>
`
class ${name} extends React.Component {
  render(){
    <div>
      // render your component here
    </div>
  }
}
`

const functionalComponent = (name) =>
`
const ${name} = ({ }) =>
  // render your component here
`

const proptypes = (name) =>
`
${name}.PropTypes = {

}
`

const componentExport = (name) =>
`
export default ${name}
`
// default to a functional component
// fuck es6 classes
function build(opts){
  if (!opts.name) throw Error(`a name must be provided`)
  const name = opts.name
  const styled = opts.styled ? opts.styled : false
  const type = opts.type ? opts.type : 'functional'

  let component = [];

  component.push(imports(name))
  switch(type){
    case 'class':
      component.push(classComponent(name))
    default:
      component.push(functionalComponent(name))
  }
  // write the new component to a new file
}

module.exports = {
  build,
}
