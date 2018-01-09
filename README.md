logdock (0.0.1 beta)
==

More advanced tool for creating updatable CLI log, including loaders, spinners, progress bars, groups, etc.

## Usage

```js
const log = require('logdock');
```

The function works simiar to `console.log`, but unlike `console.log` it replaces the previous output. Thus you always will see only one output.

```js
log('Hello')
log('World')

// Output: World
```

With synchronous writing it has no point, but try to add some delay to the next log...

```js
log('Hello')
setTimeout(() => log('World'), 1000);

```
...and you will see the animation effect.

![Hello](assets/gifs/hello-world.gif)

Now I'll explain how you can show up different app log in the single output.

Function `log` has own API: [transform](#transform), [group](#group), [create](#create), etc (See all in [API reference](#API-Reference) section). Each of them creates new log and own place in output.

For example, imagine, you has an app, which reports about CPU temperature and Fan speed. And will be nice if we will have two different log for displaying this information.

```js
const log = require('logdock');

const cpuTemperature = log.transform(str => `Temperature: ${str} C`);
const cpuFanSpeed = log.transform(str => `Fan speed: ${str} %`);
```

Now, you can connect the tool, which provides needed information about CPU and log each of required stats in the own string.

```js
const cpuInformation = require('give_me_my_cpu_info');

cpuInformation.on('change', function(info) {
  cpuTemperature(info.temperature);
  cpuFanSpeed(info.fanSpeed);
});
```

![Cpu report](assets/gifs/cpu-report.gif)

Let talk about `transform` method. It accepts string transformer and affect to provided log. It can be [chalk](https://www.npmjs.com/package/chalk), for example.

```js
const cpuTemperature = log
  .transform(chalk.blue)
  .group('Temperature')
  .transform([
    str => `${Math.round(str)} C`
  ]);
```

![Cpu report colored](assets/gifs/cpu-report-colored-2.gif)

With *transform* you can colorize input, modify or stringify. Each log functions, created by `transform`, becomes unique. And it does not change style of the origin `log`.

But this would not be so useful without groups. To understand groups, imagine two compilers for your website code. The first compiler handle CSS files, second - JS files. Both has own file watcher, they do the job separately but must send reports into the same output.

To solve the situation create styled groups.

```js
const log = require('logdock');
const chalk = require('chalk');
const cssCompiler = require('./cssCompiler');
const jsCompiler = require('./jsCompiler');

// First, create styled log
const titleLog = log.transform([
  str => ` ${str} `,
  chalk.bgYellow.whiteBright
]);

// Then created groups based on titleLog
const cssLog = titleLog
  .group('PostCss')
  .transform(chalk.reset);

const jsLog = titleLog
  .group('Babel')
  .transform(chalk.reset);

cssCompiler.on('log', cssLog);
jsCompiler.on('log', jsLog);
```

Now, we have log function for each of compilers.

![compilers](assets/gifs/two-compilers.gif)

And, if one of the compilers has done its task, we'd like to persist report.

```js
cssLog.persist();
```

Method removes the message from the updatable list and keeps it in the normal log. But if css compiler sends next log message, it will be displayed in updatable list again.

Or we can finish the report.

```js
cssLog.done();
```

Or destroy without persisting.

```js
cssLog.destroy();
```

**Groups are nested.**

```js
const log = require('logdock')

const myAppLog = log.group('My app:');
const bundlerLog = myAppLog.group('bundle:');
const sizeLog = bundlerLog
  .group('size:')
  .transform(str => `${str}kb`)
const timeLog = bundlerLog
  .group('time:')
  .transform(str => `${str}ms`)

sizeLog(56);
timeLog(250);

// My app: bundle: size: 56kb
// My app: bundle: time: 250ms
```

Persisting, finishing, destroying one of the child group won't affects any parents. While removing one of the parents affects a child.

See the [examples](examples/) to get more use-cases.

## API Reference

Each API method is a factory, which returns new log function, enhanced with the same API as the previous and inheriting configuration of parents.

```js
const log = require('logdock')
const log2 = log.config({});

log !== log2; // true
```

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
