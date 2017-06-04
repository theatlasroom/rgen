const CLI = require('./lib/CLI');
const pkg = require('./package.json');
// console.log('CLI', cli);

// cli.build();

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
    help: 'file extension to use',
    defaultValue: '.jsx'
  }
)

const args = parser.parseArgs();
// console.dir(args);
prepareOptions(args)

function prepareOptions(args){
  let { name, ext, dir } = args;

  ext = (ext.charAt(0) === '.') ? ext.slice(1) : ext

  const opts = {
    name, ext, dir
  }

  // TODO: do i want to first construct this obj, then call run?
  // or be able to just invoke run...
  const cli = new CLI(opts);
  cli.build((err) => {
    if (err) console.error('ERROR:', err);
    console.info('Finished!');
  });
}
