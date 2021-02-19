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

// Leverage is bad naming here. It will confuse everyone who will read your code. 
// Leverage is what you have on an exchange: you have 1$ but you can trade on 20$ - leverage = 20. 
// I would call it ratio/curenciesRation/usdDaiRation/etc
// + upcase first letter is not in line with JS naming-convention(google JS naming convention)
async function Leerage(exchange){//calculates leverage
    let tBalance = await exchange.fetchTotalBalance();
    if(tBalance.USD < tBalance.DAI){
   let leverage = (tBalance.USD/(tBalance.USD + (tBalance.DAI * 0.9)));
return leverage
 }
  else{
    // you already have this data(line 22). You are making useless request to the FTX
    // better to use full name like totalBalance. It much more clear and will not take a lot of space
    let tBalance = await exchange.fetchTotalBalance();
    // naming convention
    let Leverage = (tBalance.DAI/(tBalance.DAI + (tBalance.USD * 0.9)));
    return Leverage;
}

  }

async function createLimitOrder(symbol, amount, price, side,){// create limit orders
    if(side === 'Buy'){
         //better to use full name - buyOrder
       let bOrder = await exchange.createLimitBuyOrder(symbol,amount,price,);
        console.log(`You created a limit ${side} order with the pair ${symbol}`);
        console.log(bOrder.id);
    }
    else{
         // here you don't return anything from function
         // So, it shouldn't work
        console.log(await exchange.createLimitSellOrder(symbol,amount,price,));
        console.log(`You created a limit ${side} order with the pair ${symbol}`);
    }
}

async function Bot(exchange,symbol, amount){// Bot algorithm
    let orderbook = await exchange.fetchOrderBook(symbol);
    let takerFees = exchange.markets[symbol].taker;
     // you already have this data(prev line). You are making useless request to the FTX
     // let symbolInfo = exchange.markets[symbol]
     // let takerFee = symbolInfo.taker
     // let makerFee = symbolInfo.maker
    let makerFees = exchange.markets[symbol].maker; 
     //  naming convention
   let Leverage = await Leerage(exchange);
    let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined;
    let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined;
    let spread = ask - bid;
     // you are doing 2 Limit orders - your fee will be makerFee * 2
    let commission = makerFees + takerFees;
    console.log(commission);
     // It's ok for this script but be very really careful with a while loop. It's the most dangerous
     // One mistake and you will endup with endless loop that will 100% load your server.
    while(commission < spread && Leverage <= 4){
createLimitOrder(symbol, amount, bid + 0.0001, 'Buy');
createLimitOrder(symbol, amount, ask - 0.0001, 'Sell');
setTimeout(() => {
     // you don't have bOrder or sOrder variables here. It will fail
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
   
