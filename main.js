const express = require('express');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./config/routes/index');
const path = require('path');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/', express.static(path.join(__dirname, "public")));
app.use('/api', routes);


require('dotenv').load();
const abi = require('./contracts/abi.js');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const contractAddress = process.env.CADDRESS_POKE_SLOTS_TEST;
const provider = new HDWalletProvider(process.env.ACCOUNT_KEY, process.env.INFURA_RINKEBY);
const web3 = new Web3(provider);
const ownerAddress = process.env.OWNER_ADDR;
const contractInstance = new web3.eth.Contract(abi, contractAddress);

const server = require('http').Server(app);



server.listen(5100, () => {
  console.log("LIVE")
});


module.exports = {
  contractInstance
};
