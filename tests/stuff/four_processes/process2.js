const cine = require('cine');
const chalk = require('chalk');
const logdock = require('../../../lib');

const animation = cine(['A', 'B', 'C', 'D']);
logdock(() => `${chalk.blue('Process')} II: ${animation()}`).interval(250);
