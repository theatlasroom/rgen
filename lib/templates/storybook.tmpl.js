// TODO: could be seperate repo...
// TODO: should this be @storybook/react?
const imports = (name) =>
`import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ${name} from './${name}'`

const skeleton = (name) =>
`storiesOf('${name}', module)
  .add('default', () => (
    const props = {}
    <${name} {...props} />
  ))
`

module.exports = {
  imports,
  skeleton
}
