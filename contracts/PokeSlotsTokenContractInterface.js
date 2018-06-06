const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const abi = require('./abi.js');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const contractAddress = process.env.CADDRESS_POKE_SLOTS_TEST;
const provider = new HDWalletProvider(process.env.ACCOUNT_KEY, process.env.INFURA_RINKEBY);
const web3 = new Web3(provider);
const ownerAddress = process.env.OWNER_ADDR;
const contractInstance = new web3.eth.Contract(abi, contractAddress);

// const readFromContract = async () => {
//   try {
//     let owner = await contractInstance.methods.owner().call();
//     let balanceOfOwner = await contractInstance.methods.balanceOf(owner).call({ from: ownerAddress });
//     console.log("OWNER IS: ", owner, "\nAND BALANCE IS: ", balanceOfOwner, " POKESLOT TOKENS");
//   } catch (e) {
//     console.log(e.message);
//   }
// }

