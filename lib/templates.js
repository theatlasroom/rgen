// TODO: could be seperate repo...
const imports = (name) =>
`import React from 'react'
import PropTypes from 'prop-types'
`

const importStyles = (name) =>
`import Styled${name}from './styles'`

const classComponent = (name) =>
`class ${name} extends React.Component {
  render(){
    return (
      <div>
        // render your component here
      </div>
    )
  }
}
`

const functionalComponent = (name) =>
`const ${name} = ({ }) =>
  // render your component here
`

const proptypes = (name) =>
`${name}.PropTypes = {
}
`

const componentExport = (name) =>
`export default ${name}`


module.exports = {
  imports,
  importStyles,
  proptypes,
  componentExport,
  functionalComponent,
  classComponent
}
