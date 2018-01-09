const log = require('../lib');
const animate = require('../lib/animate');
const chalk = require('chalk');
const style = require('ansi-styles');

const blackLog = log.transform([
  str => ` ${str} `,
  chalk.whiteBright,
  chalk.bgBlack,
  str => `${str}`
]);

const erectorLog = blackLog
  .group('Erector')
  .transform(chalk.cyan);

const consoleLog = blackLog
  .group('Console')
  .transform(chalk.reset);

console.log = consoleLog;

/* ============ Countdown ============ */
const countdownLog = erectorLog
  .transform(chalk.blue)
  .group('Timeout ticken');
let countdown = 1000;
const countDownTimer = setInterval(() => {
  countdown--;
  countdownLog(`${style.color.ansi256.rgb(120, Math.round(1.2 * (countdown / 10)), 72)}${countdown || ''}${style.color.close}`);
  if (countdown === 0) {
    clearInterval(countDownTimer);
    countdownLog.getContext().write('Time\'s over');
    let on = true;
    setInterval(() => {
      on = !on;
      countdownLog.getContext().write(
        on ? 'Time\'s over' : ''
      );
    }, 300);
  }
}, 5);

const randomLog = erectorLog
  .transform(chalk.black.bold)
  .group('')
  .transform(chalk.magentaBright);

const spinner = animate(['|', '/', '-', '\\'], 100);
const volume = animate(['|', '||', '|||', '||||', '|||||', '||||||', '|||||||', '|||||||||', '||||||||||', '||||||||||||'], 200);
const sova = animate(['@_@', '@v@', '-v-', '@v@', '-v-', '@v@', '@^@', '@v@', '@^@', '@v@'], 750);

setInterval(() => {
  randomLog.getContext().write(`Randomizer in action ${chalk.magentaBright(spinner())}`);
  randomLog(Math.random());
}, 25);

setTimeout(() => {
  const storybookLog = erectorLog.group(sova());
  setInterval(() => {
    storybookLog.getContext().write(`I can not wait, but ... ${sova()}`);
    storybookLog(`${volume()}`);
  }, 25);
}, 3000);

console.log('Hello, world');
