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

async function Leerage(exchange){//calculates leverage
    let tBalance = await exchange.fetchTotalBalance();
    if(tBalance.USD < tBalance.DAI){
   let leverage = (tBalance.USD/(tBalance.USD + (tBalance.DAI * 0.9)));
return leverage
 }
  else{
    let tBalance = await exchange.fetchTotalBalance();
    let Leverage = (tBalance.DAI/(tBalance.DAI + (tBalance.USD * 0.9)));
    return Leverage;
}

  }

async function createLimitOrder(symbol, amount, price, side,){// create limit orders
    if(side === 'Buy'){
       let bOrder = await exchange.createLimitBuyOrder(symbol,amount,price,);
        console.log(`You created a limit ${side} order with the pair ${symbol}`);
        console.log(bOrder.id);
    }
    else{
        console.log(await exchange.createLimitSellOrder(symbol,amount,price,));
        console.log(`You created a limit ${side} order with the pair ${symbol}`);
    }
}

async function Bot(exchange,symbol, amount){// Bot algorithm
    let orderbook = await exchange.fetchOrderBook(symbol);
    let takerFees = exchange.markets[symbol].taker;
    let makerFees = exchange.markets[symbol].maker;
   let Leverage = await Leerage(exchange);
    let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined;
    let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined;
    let spread = ask - bid;
    let commission = makerFees + takerFees;
    console.log(commission);
    while(commission < spread && Leverage <= 4){
createLimitOrder(symbol, amount, bid + 0.0001, 'Buy');
createLimitOrder(symbol, amount, ask - 0.0001, 'Sell');
setTimeout(() => {
    exchange.cancelOrder(bOrder); 
    exchange.cancelOrder(sOrder); 
    Bot(exchange , symbol, 10);
    }, 300000); 
        }
console.log('Leverage is too high or the commission is larger than the spread.')
//initiate on event return;
}

     
    
     //initiation
     
  
     Bot(exchange , exchange.token , 10);
   