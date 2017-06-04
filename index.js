const cli = require('./lib/cli');
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
    help: 'the directory to output the file into',
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
console.dir(args);
