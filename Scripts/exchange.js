const ccxt = require ('ccxt');
const ftx = new ccxt.ftx();

console.log(ftx.has);
console.log(ftx.requiredCredentials);