// TODO: could be seperate repo...
// TODO: should this be @storybook/react?
const imports = (name) =>
`import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ${name} from './'`

const skeleton = (name) =>
`storiesOf('${name}', module)
  .add('default', () => (
    const props = {}
    <${Button} {...props} />
  ))
`

module.exports = {
  imports,
  skeleton
}
