const log = require('../lib');
const chalk = require('chalk');

const blackLog = log.transform([
  str => ` ${str} `,
  chalk.whiteBright,
  chalk.bgBlack,
  str => `${str}`
]);

const number = blackLog
  .group('number')
  .transform(chalk.red);

const info = blackLog
  .group('info')
  .transform(chalk.blue);

info('hello');

let i = 1;
setInterval(() => {
  number(i);
  info(`hello ${i}`);
  if (i === 10) {
    number.done();
  }
  if (i === 20) {
    info.done();
    console.log('Completed');
    process.exit(0);
  }
  i++;
}, 100);
