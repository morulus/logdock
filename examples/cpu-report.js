const log = require('../lib');
const Emmiter = require('events');
const cpuInformation = new Emmiter();

cpuInformation.on('change', info => {
  cpuTemperature(info.temperature);
  cpuFanSpeed(info.fanSpeed);
});

const cpuTemperature = log.transform(str => `Temperature: ${Math.round(str)} C`);
const cpuFanSpeed = log.transform(str => `Fan speed: ${Math.round(str)} %`);

const mockCpu = {
  temperature: 35,
  fanSpeed   : 15
};
setInterval(() => {
  mockCpu.temperature += 0.44;
  mockCpu.fanSpeed = (mockCpu.temperature / 71) * 65;
  cpuInformation.emit('change', mockCpu);
}, 250);
