const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const log = require('../lib');

const childLog1 = log.group('Child Process 1', chalk.blue).transform(chalk.reset);

const childLog2 = log.group('Child Process 2', chalk.green).transform(chalk.reset);

const child = spawn('node',  [path.join(__dirname, 'stuff/child-process.js')], {
  stdio: [process.stdin, 'pipe', 'inherit']
});

child.stdout.pipe(childLog1.stream);

const child2 = spawn('node',  [path.join(__dirname, 'stuff/child-process-2.js')], {
  stdio: [process.stdin, 'pipe', 'inherit']
});

child2.stdout.pipe(childLog2.stream);
