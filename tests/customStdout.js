const log = require('../lib');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const blueLog = log
  .stdout(fs.createWriteStream(path.join(__dirname, 'generic', 'log.txt')))
  .transform([
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
