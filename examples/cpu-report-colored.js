const log = require('../lib');
const Emmiter = require('events');
const chalk = require('chalk');
const cpuInformation = new Emmiter();

cpuInformation.on('change', info => {
  cpuTemperature(info.temperature);
  cpuFanSpeed(info.fanSpeed);
});

const cpuTemperature = log
  .group('Temperature', chalk.blue)
  .transform([
    str => `${Math.round(str)} C`
  ]);
const cpuFanSpeed = log
  .group('Fan speed', chalk.blue)
  .transform(str => `${Math.round(str)} %`);

const mockCpu = {
  temperature: 35,
  fanSpeed   : 15
};
setInterval(() => {
  mockCpu.temperature += 0.44;
  mockCpu.fanSpeed = (mockCpu.temperature / 71) * 65;
  cpuInformation.emit('change', mockCpu);
}, 250);
