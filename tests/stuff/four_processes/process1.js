const cine = require('cine');
const chalk = require('chalk');
const logdock = require('../../../lib');

const animation = cine(['A', 'B', 'C', 'D']);
logdock(() => `${chalk.red('Process')} I: ${animation()}`).interval(250);
