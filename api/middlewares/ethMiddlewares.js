const infuraEndpoint = process.env.INFURA_RINKEBY;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));

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


module.exports = {
  checkWalletFunds
}
