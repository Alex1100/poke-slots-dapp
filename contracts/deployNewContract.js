const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const fs = require('fs');
const solc = require('solc');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(process.env.ACCOUNT_KEY, process.env.INFURA_RINKEBY);
const Web3 = require('web3');
const web3 = new Web3(provider);
const pokeSlotsTokenPath = path.resolve(__dirname, 'PokeSlotsTokenContract.sol');
const source = fs.readFileSync(pokeSlotsTokenPath, 'utf8');
const { interface, bytecode } = solc.compile(source, 1).contracts[':PokeSlotsTestToken'];
const abi = JSON.parse(interface);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("ATTEMPTING TO DEPLOY FROM ACCOUNT: ", accounts[0]);

  launchedContract = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + bytecode })
    .send({ gasPrice: '51000000000', from: accounts[0] });

  console.log("launchedContract IS: ", launchedContract, "\n\n\n\n");
  console.log("CONTRACT DEPLOYED TO: ", launchedContract.options.address);
  let owner = await launchedContract.methods.owner().call({from: accounts[0]})
  let balanceOfOwner = await launchedContract.methods.balanceOf(owner).call({ from: accounts[0]});
  console.log("OWNER IS: ", owner, "\nAND BALANCE IS: ", balanceOfOwner, " POKESLOT TOKENS");
};

deploy();
