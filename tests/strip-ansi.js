const ansiEscapes = require('ansi-escapes');
const chalk = require('chalk');
const ansiRegex = require('ansi-regex');
const strip = require('../lib/stripAnsiExceptStyle.js');

const testString = ansiEscapes.eraseLine + ansiEscapes.cursorForward(5) + ansiEscapes.beep + ansiEscapes.cursorUp(2) + chalk.bold.bgYellow.blue('abc') + ansiEscapes.cursorForward(5) + 'hello, ' + `${chalk.magenta('world')}`;

process.stdout.write(strip(testString));
