const log = require('../lib');
const chalk = require('chalk');

const blueLog = log.transform([
  str => typeof str,
  chalk.blue,
]);

blueLog({ a: 'hello' });
