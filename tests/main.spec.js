import { expect } from 'chai';

const exec = require('child_process').exec;
const cli  = './src/main.js';

describe('Main CLI', () => {
  it('should return Hello World', (done) => {
    exec(cli, (err, stdout, stderr) => {
      if (err) throw err;

      expect(stdout.replace('\n', '')).to.be.equal('Hello World');
      done();
    });
  });
});
