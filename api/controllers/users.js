const axios = require('axios');

const getUserHistory = async (req, res) => {
  const url = `https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=${process.env.CADDRESS_POKE_SLOTS_TEST}&address=${req.params.address}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`;
  const result = await axios.get(url);
  const r = result.data.result;
  r.forEach(tx => tx.confirmations = 1);
  res.status(200);
  res.json({userHistory: r});
};

const getAllTransactions = async (req, res) => {
  const url = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${req.params.address}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`
  const result = await axios.get(url);
  const r = result.data.result;
  r.forEach(tx => tx.confirmations = 1);
  res.status(200);
  res.json({txList: r});
};



module.exports = {
  getUserHistory,
  getAllTransactions
};
