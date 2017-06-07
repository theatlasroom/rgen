# RCLI
React component generator

## Installation
Using npm
```
npm install -g rcli
```

Using yarn
```
yarn global add rcli
```

## Usage
`rcli -n MyNewComponent -e jsx -w story -t stateless`

## Options
* `-n | --name <name-of-component>` - the name for the component / file to generate, by default the component name will be a directory that an index.js(x) file gets written to.
* `-e | --ext <file-extension-for-component>`
  - jsx - (default)
  - js
* `-d | --dir` - output directory
* `-t | --type <component-type>` - type of component to create
  - stateless - (default) [functional stateless component](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc)
  - stateful
* `-w | --with <space-separated-options>` - generate additional files, currently supports
  - story - [Storybook for react](https://github.com/storybooks/storybook/tree/master/app/react) story
  - scss (soon)

## TODO
* [x] Classes / functional components
* [x] Stories (storybook)
<!-- * [ ] Forms / redux containers? -->
* [ ] (S)CSS
* [ ] Configure output folder (Each option can have a separate folder, default to class folder)
* [ ] Styled component
* [ ] Jest / enzyme
* [ ] Snapshots
* [ ] Read .rcli file for configs (optional)
