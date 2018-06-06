const req = {
  txSent: true,
  body: {
    value: 100
  }
};

const res = {status: () => 404}

const purchasePSTToken = async (req, res) => {
  try {
    if (req.txSent) {
      res.status(200);
      return JSON.stringify({confirmationMessage: `Purchase of ${req.body.value} PSTT Tokens Went through`});
    } else {
      throw Error(`Purchase Didn't Go Through.`);
    }
  } catch (e) {
    console.log(e.message);
    return JSON.stringify({ status: 404, errMsg: e.message });
  }
};

describe('tests the `pokeSlotsTestToken` controller funcs', () => {
  it('tests the `purchasePSTToken` func', async () => {
    const y = await purchasePSTToken(req, res);
    expect(y).toEqual(JSON.stringify({confirmationMessage: `Purchase of 100 PSTT Tokens Went through`}));
  });

  it('tests the `purchasePSTToken` func for a failing response', async () => {
    req.body.value === 0;
    req.txSent = false;
    const y = await purchasePSTToken(req, res);
    expect(y).toEqual(JSON.stringify({status: 404, errMsg: `Purchase Didn't Go Through.`}));
  });
});
