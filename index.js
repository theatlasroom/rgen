const fs = require('fs')
const path = require('path')
const CLI = require('./lib/CLI')
const pkg = require('./package.json')
const chalk = require('chalk')
const constants = require('./lib/utils').constants
const mkdirr = require('mkdirr')

const ArgumentParser = require('argparse').ArgumentParser
const parser = new ArgumentParser({
  version: pkg.version,
  addHelp: true,
  description: pkg.description
})

parser.addArgument(
  ['-n', '--name'],
  {
    help: 'the name of the component'
  }
)

parser.addArgument(
  ['-t', '--type'],
  {
    help: 'the type of component to create (functional|class)'
  }
)

parser.addArgument(
  ['-d', '--dir'],
  {
    help: 'the target directory to output the file into',
    defaultValue: './'
  }
)

parser.addArgument(
  ['-e', '--ext'],
  {
    help: 'file extension to use (defaults to jsx)',
    defaultValue: '.jsx'
  }
)

parser.addArgument(
  ['-w', '--with'],
  {
    help: 'additional files to be generated ie (stories|scss)',
    action: 'append',
    choices: ['stories', 'scss']
  }
)


const args = parser.parseArgs()
const defaults = {
  type: 'functional',
  ext: 'jsx',
  dir: __dirname
}
// console.dir(args);
try {
  prepareOptions(args)
} catch (e) {
  error(e.toString())
  bail()
}

function prepareOptions (args) {
  let { name, ext, dir, type, with: withArgs } = args

  if (!name) throw Error(`a name must be provided`)
  information('Generating your component')
  dir = dir || defaults.dir
  ext = (ext && ext.charAt(0) === '.') ? ext.slice(1) : defaults.ext
  type = type || defaults.types

  const opts = {
    name,
    type,
    withArgs,
    ext
  }

  // TODO: do i want to first construct this obj, then call run?
  // or be able to just invoke run...
  const cli = new CLI(opts)
  cli.build((err, res) => {
    if (err) error('ERROR:', err)
    res.forEach((item) => {
      const _file = targetFile(dir, name, item.file, item.type, ext)
      serializer(_file, item.data.join('\n'), (serializeErr) => {
        if (err) throw Error(serializeErr)
      })
    })
  })
}

function targetFile(dir, name, file, type, ext = ''){
  // urgggh gross
  const fileExt = {
    'TYPE_COMPONENT_JSX': constants.EXT_JSX,
    'TYPE_COMPONENT_JS': constants.EXT_JS,
    'TYPE_STORY': constants.EXT_JS
  }
  const _dir = path.join(dir, name)
  if (!fs.existsSync(_dir)) mkdirr.build(_dir)
  return path.join(_dir, `${file}.${fileExt[type]}`)
}

function serializer (file, data, cb) {
  fs.writeFile(file, data, (err) => {
    if (err) throw Error(`There was a problem creating ${file}`)
    success(`Created file ${file}`)
  })
}

function information (msg) { console.info(chalk.yellow(msg)) }
function error (msg) { console.error(chalk.red(msg)) }
function success (msg) { console.log(chalk.green(msg)) }
function bail () {
  process.exit(0)
}
