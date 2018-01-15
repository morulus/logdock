const path = require('path');
const log = require('../lib');
const { spawn } = require('child_process');

const p1 = spawn('node', [
  path.join(__dirname, 'stuff/four_processes/process1.js'),
  '--color'
], {
  stdio      : [process.stdin, 'pipe', 'pipe'],
  FORCE_COLOR: true,
  shell      : true
}, {
  encoding : 'utf8',
  maxBuffer: 500 * 1024
});

const p2 = spawn('node', [
  path.join(__dirname, 'stuff/four_processes/process2.js'),
  '--color'
], {
  stdio: [process.stdin, 'pipe', 'pipe']
});

const p3 = spawn('node', [
  path.join(__dirname, 'stuff/four_processes/process3.js'),
  '--color'
], {
  stdio: [process.stdin, 'pipe', 'pipe']
});

const p4 = spawn('node', [
  path.join(__dirname, 'stuff/four_processes/process4.js')
], {
  stdio: [process.stdin, 'pipe', 'inherit']
});

p1.stdout.pipe(log.create().stream);
p2.stdout.pipe(log.create().stream);
p3.stdout.pipe(log.create().stream);
p4.stdout.pipe(log.create().stream);
