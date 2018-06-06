const router = require('express').Router();
const {
  getUserHistory,
  getAllTransactions
} = require('../../api/controllers/users');

const { checkUsersPSTTokenFunds } = require('../../api/middlewares/contractMiddlewares');
const {
  checkWalletFunds,
  exchangeEthForPSTToken
} = require('../../api/middlewares/ethMiddlewares');
const {
  purchasePSTToken
} = require('../../api/controllers/pokeSlotsTestToken');


router.get('/transfer', [checkWalletFunds, exchangeEthForPSTToken], purchasePSTToken);
router.get('/users/:address', getUserHistory);
router.get('/users/:address/tx', getAllTransactions);

module.exports = router;
