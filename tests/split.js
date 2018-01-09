const log = require('../lib');
const chalk = require('chalk');

const a = log.transform(chalk.red);
const b = log.transform(chalk.green);
const c = log.transform(chalk.blue);

a('A');
b('B');
c('C');
