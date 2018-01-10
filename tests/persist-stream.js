const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const log = require('../lib');

const childLog = log.group('Child', chalk.blue).transform(chalk.reset);

debugger; // eslint-disable-line
const child = spawn('node',  [path.join(__dirname, 'stuff/persist-child-process.js')], {
  stdio: [process.stdin, 'pipe', 'inherit']
});

debugger; // eslint-disable-line
child.stdout.pipe(childLog.stream);
