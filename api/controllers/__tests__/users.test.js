const axios = require('axios');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../../.env')})

const getUserHistory = async (req, res) => {
  const url = `https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=${process.env.CADDRESS_POKE_SLOTS_TEST}&address=${req.params.address}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`;
  const result = await axios.get(url);
  const r = result.data.result;
  r.forEach(tx => tx.confirmations = 1);
  return JSON.stringify({userHistory: r});
};

const getAllTransactions = async (req, res) => {
  const url = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${req.params.address}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`
  const result = await axios.get(url);
  const r = result.data.result;
  r.forEach(tx => tx.confirmations = 1);
  return JSON.stringify({txList: r});
};


describe('users controller', () => {
  it('tests the `getUserHistory` func', async () => {
    const res = await getUserHistory({ params: { address: process.env.OWNER_ADDR } }, {});
    expect(res).toMatchSnapshot();
  });

  it('tests the `getAllTransactions` func', async () => {
    const res = await getAllTransactions({ params: { address: process.env.OWNER_ADDR } }, {})
    expect(res).toMatchSnapshot();
  });
});
