const log = require('../lib');
const chalk = require('chalk');

const blackLog = log.transform([
  str => ` ${str} `,
  chalk.whiteBright,
  chalk.bgBlack,
  str => `${str}`
]);

const erectorLog = blackLog
  .group('Erector')
  .transform(chalk.cyan);

const some = erectorLog
  .transform(chalk.red);

let i = 1;
setInterval(() => {
  some(i);
  i++;
  if (i > 10) {
    i = 1;
    some.persistAll();
  }
}, 100);
