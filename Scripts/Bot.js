const ccxt = require('ccxt');
const exchange = new ccxt.ftx ({
     'enableRateLimit': true,
     'fetchOrders' : true
    }); 
//Config, do later 
exchange.apiKey = 'PEv4-isKcySiAM2oWo-vEBkdipOPa934Meo-AUZ2';
exchange.secret = 'mfCWPd0QU60IVoDZKoUk6QTJEeZslxUH1Ec3f5tr';
exchange.uid = 'ANTONSIU@GMAIL.COM';
exchange.login = 'antonsiu@gmail.com';
exchange.password = 'Keytomacbook0009083!';
exchange.twofa = 'SMS';
exchange.privateKey = 'tbd';
exchange.walletAddress = '0xAAAD27c5C7c15a97AEe626c476D0a6633c1901F4';
exchange.token = 'DAI/USD';
//Config end

async function ratio(exchange){//calculates currency ratio
    var totalBalance = await exchange.fetchTotalBalance();
    if(totalBalance.USD < totalBalance.DAI){
   var rratio = (totalBalance.USD/(totalBalance.USD + (totalBalance.DAI * 0.9)));
 }
  else{
    var rratio = (totalBalance.DAI/(totalBalance.DAI + (totalBalance.USD * 0.9)));
}
return Math.abs(rratio);
  }

async function createLimitOrder(symbol, amount, price, side,){// create limit orders
    if(side === 'Buy'){
       var buyOrder = await exchange.createLimitBuyOrder(symbol,amount,price,);
        console.log(`You created a limit ${side} order with the pair ${symbol}`);
        }
    else{
       var sellOrder = await exchange.createLimitSellOrder(symbol,amount,price);
        console.log(`You created a limit ${side} order with the pair ${symbol}`);
    }
    return side === 'Buy' ? buyOrder : sellOrder;
}

async function Bot(exchange,symbol, amount){// Bot algorithm
    var orderbook = await exchange.fetchOrderBook(symbol);
    var makerFees = exchange.markets[symbol].maker;
   var rRatio = await ratio(exchange);
    var bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined;
    var ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined;
    var spread = ask - bid;
    var commission = makerFees * 2;
    while(commission < spread && rRatio <= 4){
createLimitOrder(symbol, amount, bid + 0.0001, 'Buy');
createLimitOrder(symbol, amount, ask - 0.0001, 'Sell');
setTimeout(() => {
    exchange.cancelOrder(buyOrders); 
    exchange.cancelOrder(sellOrder); 
    Bot(exchange , symbol, 10);
    }, 300000); 
        }
console.log('Leverage is too high or the commission is larger than the spread.')
//initiate on event return;
return;
}

     
    
     //initiation
     Bot(exchange , exchange.token , 10);
  

   