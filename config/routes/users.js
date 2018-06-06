const router = require('express').Router();
const {
  getUserHistory,
  getAllTransactions,
  getSingleTransaction
} = require('../../api/controllers/users');

router.get('/users/:address', getUserHistory);
router.get('/users/:address/tx', getAllTransactions);
router.get('/users/:address/tx/:txId', getSingleTransaction);

module.exports = router;
