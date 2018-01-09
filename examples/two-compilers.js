const log = require('../lib');
const cine = require('cine');
const chalk = require('chalk');
const Events = require('events');
const cssCompiler = new Events();
const jsCompiler = new Events();

// First, create styled log
const logInfo = log.transform([
  chalk.yellowBright
]);

const logSuccess = log
  .transform([
    chalk.greenBright
  ])
  .group('OK')
  .transform(chalk.reset.gray);

const logError = log
  .transform([
    chalk.redBright
  ])
  .group('ERROR')
  .transform(chalk.reset.gray);

// Then created groups based on titleLog
const cssLog = logInfo
  .group('PostCss')
  .transform(chalk.reset);

const jsLog = logInfo
  .group('Babel')
  .transform(chalk.reset);

cssCompiler.on('log', cssLog);
jsCompiler.on('log', jsLog);

const cliSpinners = require('cli-spinners');

const watchingAnimation = cine(cliSpinners.dots.frames, 50);

const processingAnimation = cine(cliSpinners.triangle.frames, 50);

const mockScenario1 = cine([
  () => `Watching Css files ${watchingAnimation()}`,
  '5 files has changed',
  () => `Processing ${processingAnimation()}`
], 1500, () => {
  logSuccess('PostCss completed in 1.5s').persist();
});

let i = 0;
const mockScenario2 = cine([
  () => `Watching Js files ${watchingAnimation()}`,
  '3 files has changed',
  () => `Processing ${processingAnimation()}`,
], 2500, () => {
  if (++i === 2) {
    logError('Syntax error').persist();
  } else {
    logSuccess('Babel completed in 2.5s').persist();
  }
});

setInterval(() => {
  cssCompiler.emit('log', mockScenario1());
  jsCompiler.emit('log', mockScenario2());
}, 50);
