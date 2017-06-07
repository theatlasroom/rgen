// TODO: could be seperate repo...
// TODO: should this be @storybook/react?
const imports = (name, componentPath = './') =>
`import React from 'react'
import { storiesOf } from '@kadira/storybook'

import ${name} from '${componentPath}'
`

const skeleton = (name) =>
`storiesOf('${name}', module)
  .add('default', () => {
    const props = {}
    return (
      <${name} {...props} />
    )
  })
`

module.exports = {
  imports,
  skeleton
}
