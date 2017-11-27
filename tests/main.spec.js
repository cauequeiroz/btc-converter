import { expect } from 'chai';

const exec = require('child_process').exec;
const pkg  = require('../package.json');
const cli  = './src/main.js';

describe('Main CLI', () => {
  it('should return version when `btc-converter --version`', (done) => {
    exec(`${cli} --version`, (err, stdout, stderr) => {
      if (err) throw err;

      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });
  it('should return description when `btc-converter --help`', (done) => {
    exec(`${cli} --help`, (err, stdout, stderr) => {
      if (err) throw err;

      expect(stdout.includes(pkg.description)).to.be.true;
      done();
    });
  });
});
