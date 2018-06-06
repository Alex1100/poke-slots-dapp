const infuraEndpoint = process.env.INFURA_RINKEBY;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));
const contractInstance = require('../../main').contractInstance;

const checkWalletFunds = async (req, res, next) => {
  try {
    const {
      ethAddr
    } = req.body;

    const currentBalance = await web3.eth.getBalance(fromAddr);
    req.availableFunds = currentBalance;
    next();
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

const exchangeEthForPSTToken = async (req, res, next) => {
  try {
    if (req.availableFunds > 0) {
      const tx = await contractInstance.methods.transfer(req.body.toAddr, req.body.value)
                      .call({
                        from: req.body.fromAddr,
                        to: toAddr,
                        value: req.body.value
                      });
      console.log("Transaction is: ", tx);
      req.txSent = tx;
      next();
    } else {
      throw Error('Insufficient Funds');
    }
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
}


module.exports = {
  checkWalletFunds,
  exchangeEthForPSTToken
}
