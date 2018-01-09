const log = require('../lib');
const chalk = require('chalk');

const progressLog = log.transform(chalk.bold);
const title = progressLog.transform(chalk.bold.green);
const logX = progressLog.group('X').transform(chalk.blue);
const logY = progressLog.group('Y').transform(chalk.blue);
const logZ = progressLog.group('Z').transform(chalk.blue);

title('Calc XYZ');

let x = 0;
let y = 0;
let z = 0;
const interval = setInterval(() => {
  logX(`${x}%`);
  logY(`${y}%`);
  logZ(`${z}%`);

  if (x >= 100) {
    logX.done('OK');
  }
  if (y >= 100) {
    logY.done('OK');
  }
  if (z >= 100) {
    logZ.done('OK');
  }

  x += 1;
  y += 2;
  z += 4;

  if (x > 100 && y > 100 && z > 100) {
    clearInterval(interval);
  }
}, 10);
