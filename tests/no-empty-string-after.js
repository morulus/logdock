const logUpdate = require('log-update');
const cine = require('cine');


const animation = cine(['H', 'He', 'Hel', 'Hell', 'Hello'], 100);

debugger; // eslint-disable-line
logUpdate(animation());
