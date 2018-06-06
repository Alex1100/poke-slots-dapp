const router = require('express').Router();
const { checkUsersPSTTokenFunds } = require('../../api/middlewares/contractMiddlewares');
const {
  checkWalletFunds,
  exchangeEthForPSTToken
} = require('../../api/middlewares/ethMiddlewares');
const {
  purchasePSTToken
} = require('../../api/controllers/pokeSlotsTestToken');


router.get('/transfer', checkWalletFunds, exchangeEthForPSTToken, purchasePSTToken);


module.exports = router;
