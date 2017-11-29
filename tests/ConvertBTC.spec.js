import chai, { expect } from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import convertBTC from '../src/ConvertBTC';
import chalk from 'chalk';

chai.use(sinonChai);

describe('ConvertBTC', () => {
  let consoleStub;

  const responseMock = {
    "price": 10866.97,
    "success": true,
    "time": "2017-11-29 17:19:00"
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });
  afterEach(() => {
    console.log.restore();
  });

  it('should use currency USD and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.cyan('1')} BTC to ${chalk.cyan('USD')} = ${chalk.green('10866.97')}`);
      done();
    }, 200);
  });

  it('should use currency USD and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    convertBTC('USD', 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.cyan('10')} BTC to ${chalk.cyan('USD')} = ${chalk.green('10866.97')}`);
      done();
    }, 200);
  });

  it('should use currency BRL and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.cyan('1')} BTC to ${chalk.cyan('BRL')} = ${chalk.green('10866.97')}`);
      done();
    }, 200);
  });

  it('should show message when api return error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      done();
    }, 200);
  });
});
