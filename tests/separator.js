const log = require('../lib');

const summLog = log
  .config({
    separator: ' + '
  })
  .group('1')
  .config({
    separator: ' = '
  })
  .group('2');

summLog('3'); // 1 + 2 = 3
