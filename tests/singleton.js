const log = require('../lib');

log.animate([1, 2, 3, 4, 5], 250);
setInterval(() => {
  console.log(Math.random());
  process.stdout.write('process.stdout.write');
}, 420);
