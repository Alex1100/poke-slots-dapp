const purchasePSTToken = async (req, res) => {
  try {
    if (req.txSent) {
      res.status(200);
      res.json({confirmationMessage: `Purchase of ${req.body.value} PSTT Tokens Went through`});
    console.log("GOT HERE")
    } else {
      throw Error(`Purchase Didn't Go Through.`);
    }
  } catch (e) {
    console.log(e.message);
    res.status(404);
  }
};

module.exports = {
  purchasePSTToken
};
