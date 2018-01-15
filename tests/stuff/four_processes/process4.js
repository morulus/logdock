const cine = require('cine');
const logdock = require('../../../lib');

const animation = cine(['A', 'B', 'C', 'D']);
logdock(() => `Process IIII: ${animation()}`).interval(250);
