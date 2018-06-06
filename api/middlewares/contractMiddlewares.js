const infuraEndpoint = process.env.INFURA_RINKEBY;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));
const contractInstance = require('../../main').contractInstance;

const checkUsersPSTTokenFunds = async (req, res, next) => {
  try {
    let balanceOfOwner = await contractInstance.methods.balanceOf(req.body.userAddr).call({ from: req.body.userAddr });
    if (balanceOfOwner > 0) {
      req.balanceOfOwner = balanceOfOwner;
      req.couldPlay = true;
      next();
    }

    req.balanceOfOwner = 0;
    req.couldPlay = false;
    next();
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

module.exports = {
  checkUsersPSTTokenFunds
};
