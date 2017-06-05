const fs = require('fs')
const path = require('path')
const CLI = require('./lib/CLI');
const pkg = require('./package.json');
const chalk = require('chalk')

const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({
  version: pkg.version,
  addHelp: true,
  description: pkg.description
});

parser.addArgument(
  ['-n', '--name'],
  {
    help: 'the name of the component'
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

const args = parser.parseArgs();
// console.dir(args);
prepareOptions(args)

function prepareOptions(args){
  information('Generating your component')
  let { name, ext, dir } = args;

  if (!name) throw Error(`a name must be provided`)
  dir = dir ? dir : __dirname
  ext = (ext && ext.charAt(0) === '.') ? ext.slice(1) : 'jsx'

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const targetFile = path.join(dir, `${name}.${ext}`)

  const opts = {
    name,
  }

  // TODO: do i want to first construct this obj, then call run?
  // or be able to just invoke run...
  const cli = new CLI(opts);
  cli.build((err, data) => {
    if (err) error('ERROR:', err);
    serializer(targetFile, data.join('\n'), (err) => {
      if (err) throw Error(err);
    });
  });
}

function serializer(file, data, cb){
  fs.writeFile(file, data, (err) => {
    if (err) throw Error(`There was a problem creating ${file}`)
    success(`Created file ${file}`);
  })
}

function information(msg){ console.error(chalk.yellow(msg)) }
function error(msg){ console.error(chalk.red(msg)) }
function success(msg){ console.error(chalk.green(msg)) }
