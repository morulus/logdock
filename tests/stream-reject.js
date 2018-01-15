const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const log = require('../lib');

const childProcessLog = log.group('Child Process', chalk.blue).transform(chalk.reset);
const childProcessLogInfo = childProcessLog.group('info', chalk.yellow).transform(chalk.reset);
const childProcessLogError = childProcessLog.group('error', chalk.red).transform(chalk.reset);

const child = spawn('node',  [path.join(__dirname, 'stuff/child-process-with-error.js')], {
  stdio: [process.stdin, 'pipe', 'pipe']
});

child.stdout.pipe(childProcessLogInfo.stream);
child.stderr.pipe(childProcessLogError.stream);

child.on('exit', code => {
  childProcessLogInfo.destroy();
  childProcessLogError.destroy();
});
