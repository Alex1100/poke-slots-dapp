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



server.listen(6666, () => {
  console.log(`
888      d8b
888      Y8P
888
888      888 888  888  .d88b.
888      888 888  888 d8P  Y8b
888      888 Y88  88P 88888888
888      888  Y8bd8P  Y8b.
88888888 888   Y88P    "Y8888
 .d88888b.
d88P" "Y88b
888     888
888     888 88888b.
888     888 888 "88b
888     888 888  888
Y88b. .d88P 888  888
 "Y88888P"  888  888
8888888b.                   888
888   Y88b                  888
888    888                  888
888   d88P  .d88b.  888d888 888888 d8b
8888888P"  d88""88b 888P"   888    Y8P
888        888  888 888     888
888        Y88..88P 888     Y88b.  d8b
888         "Y88P"  888      "Y888 Y8P




    .ue~~%u.       .ue~~%u.       .ue~~%u.       .ue~~%u.
  .d88   z88i    .d88   z88i    .d88   z88i    .d88   z88i
 x888E  *8888   x888E  *8888   x888E  *8888   x888E  *8888
:8888E   ^""   :8888E   ^""   :8888E   ^""   :8888E   ^""
98888E.=tWc.   98888E.=tWc.   98888E.=tWc.   98888E.=tWc.
98888N  '888N  98888N  '888N  98888N  '888N  98888N  '888N
98888E   8888E 98888E   8888E 98888E   8888E 98888E   8888E
'8888E   8888E '8888E   8888E '8888E   8888E '8888E   8888E
 ?888E   8888"  ?888E   8888"  ?888E   8888"  ?888E   8888"
  "88&   888"    "88&   888"    "88&   888"    "88&   888"
    ""==*""        ""==*""        ""==*""        ""==*""

`, "\n\n");
})



module.exports = {
  contractInstance
};
