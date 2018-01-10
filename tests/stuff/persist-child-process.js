const cine = require('cine');

const ebev = cine([
  'eniki',
  'beniki',
  'eli',
  'vareniki'
], 250);

setInterval(() => console.log(ebev()), 250);
