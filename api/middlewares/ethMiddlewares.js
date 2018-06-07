const path = require('path');
require('dotenv').load({path: path.join(__dirname, '../../.env')});
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(process.env.ACCOUNT_KEY, process.env.INFURA_RINKEBY);
const web3 = new Web3(provider);
const contractInstance = require('../../main').contractInstance;


const checkWalletFunds = async (req, res, next) => {
  try {
    const {
      ethAddr
    } = req.body;

    const currentBalance = await web3.eth.getBalance(ethAddr);
    req.availableFunds = currentBalance;
    next();
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
    res.status(404);
  }
};

const exchangeEthForPSTToken = async (req, res, next) => {
  try {
    if (req.availableFunds > 0) {
      const tx = await contractInstance.methods.transfer(req.body.toAddr, req.body.value)
                      .call({
                        from: req.body.fromAddr,
                        to: req.body.toAddr,
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
