const cine = require('cine');
const chalk = require('chalk');
const log = require('../../lib');
const cp = require('cli-spinners');

const spinner = cine(cp.dots.frames, cp.dots.interval);

const ebev = cine([
  'eniki',
  'beniki',
  'eli',
  'vareniki'
], 50);

const firstLog = log.group('Alfa', chalk.red);
const secondLog = log.group('Beta');

setInterval(() => {
  firstLog(`${spinner()} ${ebev()}`);
  secondLog('Hello');
}, 50);
