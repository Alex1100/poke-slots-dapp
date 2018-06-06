const path = require('path');
require('dotenv').load({path: path.join(__dirname, '../../../.env')});
const abi = require('../../../contracts/abi.js');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const contractAddress = process.env.CADDRESS_POKE_SLOTS_TEST;
const provider = new HDWalletProvider(process.env.ACCOUNT_KEY, process.env.INFURA_RINKEBY);
const web3 = new Web3(provider);
const ownerAddress = process.env.OWNER_ADDR;
const contractInstance = new web3.eth.Contract(abi, contractAddress);

const checkUsersPSTTokenFunds = async (req, res) => {
  try {
    let balanceOfOwner = await contractInstance.methods.balanceOf(req.body.userAddr).call({ from: req.body.userAddr });
    if (balanceOfOwner > 0) {
      req.balanceOfOwner = balanceOfOwner;
      req.couldPlay = true;
      return { couldPlay: req.couldPlay, balanceOfOwner: req.balanceOfOwner}
    }

    req.balanceOfOwner = 0;
    req.couldPlay = false;
    return { couldPlay: req.couldPlay, balanceOfOwner: req.balanceOfOwner}
    next();
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};


describe('Tests contract middleware functions', () => {
  it(`tests to see if user's balance is greater than 0`, async () => {
    const { couldPlay, balanceOfOwner } = await checkUsersPSTTokenFunds({ body: { userAddr: ownerAddress } }, {});
    expect(couldPlay).toEqual(true);
    expect(parseInt(balanceOfOwner)).toBeGreaterThan(0);
  });
});
