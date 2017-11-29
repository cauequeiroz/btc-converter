const request = require('request');

function convertBTC(currency = 'USD', amount = 1) {
  const apiURL = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  request(apiURL, (error, response, body) => {
    let apiResponse;

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log('Something went wrong in the API. Try in a few minutes.');
      return parseError;
    }

    return console.log(`${amount} BTC to ${currency} = ${apiResponse.price}`);
  });
}

module.exports = convertBTC;
