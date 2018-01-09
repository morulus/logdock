const log = require('../lib');
const chalk = require('chalk');

const blueLog = log.transform([
  str => typeof str === 'string' ? str : '',
  chalk.blue,
]);

blueLog('Hello');
setTimeout(() => {
  blueLog({ hello: 'world' });

  setTimeout(() => {
    blueLog('World');
  }, 500);
}, 500);
