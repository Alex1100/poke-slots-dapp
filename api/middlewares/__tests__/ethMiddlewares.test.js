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
const secondEthAddress = process.env.ETHADDRESSTWO;


const checkWalletFunds = async (req, res) => {
  try {
    const {
      ethAddr
    } = req.body;

    const currentBalance = await web3.eth.getBalance(ethAddr);
    req.availableFunds = currentBalance;
    return req.availableFunds;
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

const exchangeEthForPSTToken = async (req, res) => {
  try {
    if (req.availableFunds > 0) {
      const tx = await contractInstance
                  .methods
                  .transfer(req.body.toAddr, req.body.value)

      const res = await tx
                  .call({ gasPrice: '51000000000', from: req.body.fromAddr });

      console.log("Transaction is: ", res);
      req.txSent = res;
      return req.txSent;
    } else {
      throw Error('Insufficient Funds');
    }
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
}



describe('Eth Middleware Functions', () => {
  it('tests the `checkWalletFunds` func', async () => {
    const fundsResult = await checkWalletFunds({ body: { ethAddr: ownerAddress } }, {});
    expect(typeof fundsResult).toEqual('string');
    expect(typeof parseInt(fundsResult)).toEqual('number');
    expect(parseInt(fundsResult)).toBeGreaterThan(0);
  });

  it('tests the `exchangeEthForPSTToken` func', async () => {
    const txRes = await exchangeEthForPSTToken({ availableFunds: 1, body: { toAddr: secondEthAddress, fromAddr: ownerAddress, value: 100 } }, {});
    expect(txRes).toMatchSnapshot();
  });
});
