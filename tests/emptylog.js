const log = require('../lib');
const chalk = require('chalk');

const blackLog = log.transform([
  str => ` ${str} `,
  chalk.whiteBright,
  chalk.bgBlack,
  str => `${str}`
]);

const logdockLog = blackLog
  .group('Logdock')
  .transform(chalk.cyan);

const always = logdockLog
  .transform(chalk.red);

always('Static message');

const pureLog = logdockLog
  .config({
    hideEmpty: true,
  })
  .transform(chalk.green);

const unpureLog = logdockLog
  .config({
    hideEmpty: false,
  })
  .transform(chalk.blue);

pureLog('Hello');
unpureLog('Hello');

setTimeout(() => {
  pureLog('');
  unpureLog('');

  setTimeout(() => {
    pureLog('Hello, again');
    unpureLog('Hello, again');
  }, 1000);
}, 2000);
