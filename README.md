logdock
==

**BETA!**

More advanced tool for creating updatable CLI log, including loaders, spinners, progress bars, groups, etc.



Read [Usage](https://github.com/morulus/logdock/blob/master/docs/usage.md) to best understood.

### Api reference

#### **.transform**`(handler : function | array<func>) : func`

Specify message transformer. The function handler accepts a message string and returns transformed message string. To keep together multiple transform logic it provides you to specify an array of transformers, which will be executed as flow.

```js
const log = require('logdock')
const chalk = require('chalk')

const beautyLog = log.transform([
  message => ` ${message} `,
  chalk.bgBlack.white,
]);
```

#### `log.group` (name : string) : func

Create new log function, which already have static left part.

```js
const log = require('logdock')
const chalk = require('chalk')

const appLog = log
  .transform([
    message => ` ${message} `,
    chalk.bgBlack.white,
  ])
  .group('MyApp');
```

You also can to specify transform at second argument.

```js
const appLog = log
  .group('MyApp', [
    message => ` ${message} `,
    chalk.bgBlack.white,
  ]);
```

#### `log.config(name)`

Specify some config.  See [Config](#config) section for ditails.

```js
const log = require('logdock')

const summLog = log
  .config({
    separator: ' + '
  })
  .group('1')
  .config({
    separator: ' = '
  })
  .group('2')

summLog('3'); // 1 + 2 = 3
```

#### `log.stdout(stream)`

Create new log with custom stdout.

```js
const log = require('logdock');

const wstream = fs.createWriteStream('output.txt');

const logToFile = log.stdout(wstream);
```


#### `log.output(handler)`

Specify custom output handler, which overrides internal output, and returns new log instance.

```js
const log = require('logdock');

const myLog = log.output(msg => console.log(msg));
```

Using custom output handler makes `log.stdout` useless.

#### `.done()`

*Works only with default output!*

Release selected unit. After this, the unit message will be added to CLI log and removed from docks. There are no more iteractions with such unit will happends. And trying to pass another message will gives no effect.

```js
const log = require('../lib');
const chalk = require('chalk');

const progressLog = log.transform(chalk.bold);
const title = progressLog.transform(chalk.bold.green);
const logX = progressLog.group('X').transform(chalk.blue);
const logY = progressLog.group('Y').transform(chalk.blue);
const logZ = progressLog.group('Z').transform(chalk.blue);

title('Calc XYZ');

let x = 0;
let y = 0;
let z = 0;
const interval = setInterval(() => {
  logX(`${x}%`);
  logY(`${y}%`);
  logZ(`${z}%`);

  if (x >= 100) {
    logX.done('OK');
  }
  if (y >= 100) {
    logY.done('OK');
  }
  if (z >= 100) {
    logZ.done('OK');
  }

  x += 1;
  y += 2;
  z += 4;

  if (x > 100 && y > 100 && z > 100) {
    clearInterval(interval);
  }
}, 10);
```

## Config

#### `hideEmpty` (default: true)

If log accepts empty string, then its groups will be hidden.

```js
const pure = log
  .group('Pure:')
  .config({
    hideEmpty: false
  })

const unpure = log
  .group('Unpure:')
  .config({
    hideEmpty: true
  })

pure(''); // [Will displays nothing]
unpure(''); // Unpure:
```

#### `separator` (default: ' ')

Specify separator between messages

```js
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
```
