const request = require('request');
const chalk = require('chalk');

function convertBTC(currency = 'USD', amount = 1) {
  const apiURL = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  request(apiURL, (error, response, body) => {
    let apiResponse;

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      return parseError;
    }

    console.log(`${chalk.cyan(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.green(apiResponse.price)}`);
  });
}

module.exports = convertBTC;
