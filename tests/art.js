const log = require('../lib');
const animate = require('../lib/animate');
const chalk = require('chalk');
const style = require('ansi-styles');
const cliSpinners = require('cli-spinners');

const blackLog = log.transform([
  str => ` ${str} `,
  chalk.whiteBright,
  chalk.bgBlack,
  str => `${str}`
]);

const logdockLog = blackLog
  .transform(chalk.cyan);

const justLog = log.create();

const consoleLog = blackLog
  .group('Console')
  .transform(chalk.reset);

console.log = consoleLog;

/* ============ Countdown ============ */
const countdownLog = logdockLog
  .transform(chalk.blue)
  .group('Loading');
let countdown = 0;
const countDownTimer = setInterval(() => {
  countdown++;
  countdownLog(`${style.color.ansi256.rgb(120, Math.round(1.2 * (countdown / 10)), 72)}${countdown}%${style.color.close}`);
  if (countdown === 100) {
    clearInterval(countDownTimer);
    countdownLog.getContext().write('Loaded');
  }
}, 25);

/* =========== Random Log =========== */
const randomLog = logdockLog
  .transform(chalk.green.bold)
  .group('')
  .transform(chalk.magentaBright);

const weatherLog = logdockLog
  .group('Weather today', chalk.bgYellow.black)
  .transform(chalk.yellow);

/* =========== Animations =========== */
const spinner = animate(['|', '/', '-', '\\'], 100);
const volume = animate(cliSpinners.shark.frames, 200);
const sova = animate(['@_@', '@v@', '-v-', '@v@', '-v-', '@v@', '@^@', '@v@', '@^@', '@v@'], 750);
const enikiFrames = ['Eniki', 'beniki', 'eli', 'vareniki'];
const crazyDot = animate([
  '.',
  ' .',
  '  .',
  '   .',
  '    .',
  '     .',
  '      .',
  '       .',
  '        .',
  '         .',
  '          .',
  '           .',
  '            .',
  '             .',
  '              .',
  '             .',
  '            .',
  '           .',
  '          .',
  '         .',
  '        .',
  '       .',
  '      .',
  '     .',
  '    .',
  '   .',
  '  .',
  ' .',
], 50);
const weatherPic = animate(cliSpinners.weather.frames, 250);

setInterval(() => {
  randomLog.getContext().write(`Random ${chalk.magentaBright(spinner())}`);
  randomLog(Math.random());
  justLog(`${crazyDot()} ${crazyDot()}`);
  weatherLog(weatherPic());
}, 25);

setTimeout(() => {
  const enikikLog = logdockLog.group(sova());
  const eniki = animate(enikiFrames, 2000, () => {
    enikikLog.destroy();
  });
  setInterval(() => {
    enikikLog.getContext().write(`${eniki()} ${sova()}`);
    enikikLog(`${volume()}`);
  }, 25);
}, 3000);

console.log('Hello, world');
