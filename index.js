const fs = require('fs')
const path = require('path')
const CLI = require('./lib/CLI')
const pkg = require('./package.json')
const chalk = require('chalk')

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
    defaultValue: '.jsx'
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
  let { name, ext, dir, type } = args

  if (!name) throw Error(`a name must be provided`)
  information('Generating your component')
  dir = dir || defaults.dir
  ext = (ext && ext.charAt(0) === '.') ? ext.slice(1) : defaults.ext
  type = type || defaults.types

  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  const targetFile = path.join(dir, `${name}.${ext}`)

  const opts = {
    name,
    type
  }

  // TODO: do i want to first construct this obj, then call run?
  // or be able to just invoke run...
  const cli = new CLI(opts)
  cli.build((err, data) => {
    if (err) error('ERROR:', err)
    serializer(targetFile, data.join('\n'), (err) => {
      if (err) throw Error(err)
    })
  })
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
