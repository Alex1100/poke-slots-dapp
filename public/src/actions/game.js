
export const INCREMENT_WAGER = 'INCREMENT_WAGER';
export const DECREMENT_WAGER = 'DECREMENT_WAGER';
export const SET_COINS_TO_ZERO = 'SET_COINS_TO_ZERO';
export const SET_WAGER_TO_COINS = 'SET_WAGER_TO_COINS';
export const UPDATE_MULTIPLIER = 'UPDATE_MULTIPLIER';
export const UPDATE_REELS_ORDER = 'UPDATE_REELS_ORDER';
export const INCREMENT_COIN_COUNT = 'INCREMENT_COIN_COUNT';
export const DECREMENT_COIN_COUNT = 'DECREMENT_COIN_COUNT';

const incrementWagerPlaced = (_wager, _coins) => ({
  type: INCREMENT_WAGER,
  wagerPlaced: _wager,
  coins: _coins
});

const decrementWagerPlaced = (_wager, _coins) => ({
  type: DECREMENT_WAGER,
  wagerPlaced: _wager,
  coins: _coins
});


const setCoinsToZero = () => ({
  type: SET_COINS_TO_ZERO,
  coins: 0,
  wagerPlaced: 0
});

const updateReelsOrder = (_reels) => ({
  type: UPDATE_REELS_ORDER,
  reels: _reels
});

const setWagerToCoins = (_coins) => ({
  type: SET_WAGER_TO_COINS,
  wagerPlaced: _coins,
  coins: 0
});

const updateMultiplier = (_num) => ({
  type: UPDATE_MULTIPLIER,
  multiplier: _num
});

const updateCoinCount = (_type, _wager, _coins) => ({
  type: _type,
  wagerPlaced: _wager,
  coins: _coins
});


const decrementCoinCount = (_wager, _coins, _history) => (dispatch) => {
  dispatch(updateCoinCount(DECREMENT_COIN_COUNT, _wager, Math.abs(_coins - _wager)));
  _history.push('/');
};

const incrementCoinCount = (_wager, _coins, _val, _history) => (dispatch) => {
  let c = _coins + _val;
  dispatch(updateCoinCount(INCREMENT_COIN_COUNT, _wager, c));
  _history.push('/');
};

const increaseWager = (_wager, _coins, _amount, _history) => (dispatch) => {
  dispatch(incrementWagerPlaced((_wager + _amount), (_coins - _amount)));
  _history.push('/');
};

const decreaseWager = (_wager, _coins, _amount, _history) => (dispatch) => {
  dispatch(decrementWagerPlaced((_wager - _amount), (_coins + _amount)));
  _history.push('/');
};

const changeReelsOrder = (_reels, _history) => (dispatch) => {
  dispatch(updateReelsOrder(_reels));
  _history.push('/');
}


export {
  increaseWager,
  decreaseWager,
  setCoinsToZero,
  changeReelsOrder,
  setWagerToCoins,
  updateMultiplier,
  decrementCoinCount,
  incrementCoinCount
};
