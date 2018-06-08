import {
  BUY_PSTTOKENS_REQ,
  BUY_PSTTOKENS_SUC,
  BUY_PSTTOKENS_ERR
} from '../actions/gameStats';

import {
  INCREMENT_WAGER,
  DECREMENT_WAGER,
  SET_COINS_TO_ZERO,
  SET_WAGER_TO_COINS,
  UPDATE_MULTIPLIER,
  DECREMENT_COIN_COUNT,
  INCREMENT_COIN_COUNT
} from '../actions/game';

const gameStats = (state = {
  wagerPlaced: 0,
  sufficientFunds: false,
  coins: 100,
  multiplier: 1,
  fundsErrorMessage: '',
}, action) => {
  switch(action.type) {
    case INCREMENT_WAGER:
      return {
        ...state,
        wagerPlaced: action.wagerPlaced,
        coins: action.coins
      };
    case DECREMENT_WAGER:
      return {
        ...state,
        wagerPlaced: action.wagerPlaced,
        coins: action.coins
      };
    case DECREMENT_COIN_COUNT:
      return {
        ...state,
        wagerPlaced: action.wagerPlaced,
        coins: action.coins
      };
    case INCREMENT_COIN_COUNT:
      return {
        ...state,
        wagerPlaced: action.wagerPlaced,
        coins: action.coins
      };
    case SET_COINS_TO_ZERO:
      return {
        ...state,
        coins: action.coins,
        wagerPlaced: action.wagerPlaced
      };
    case SET_WAGER_TO_COINS:
      return {
        ...state,
        coins: action.coins,
        wagerPlaced: action.wagerPlaced
      };
    case UPDATE_MULTIPLIER:
      return {
        ...state,
        multiplier: action.multiplier
      };
    default:
      return state;
  }
};

export default gameStats
