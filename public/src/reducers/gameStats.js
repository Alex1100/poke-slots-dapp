import {
  INCREASE_BET_REQ,
  INCREASE_BET_SUC,
  INCREASE_BET_ERR,
  DECREASE_BET_REQ,
  DECREASE_BET_SUC,
  DECREASE_BET_ERR,
  PLACE_BET_REQ,
  PLACE_BET_SUC,
  PLACE_BET_ERR,
  SHOW_EARNINGS_REQ,
  SHOW_EARNINGS_SUC,
  SHOW_EARNINGS_ERR,
  BUY_PSTTOKENS_REQ,
  BUY_PSTTOKENS_SUC,
  BUY_PSTTOKENS_ERR
} from '../actions/gameStats';

const gameStats = (state = {
  wagerPlaced: 0,
  sufficientFunds: false,
  fundsErrorMessage: '',
}, action) => {
  switch(action.type) {
    case INCREASE_BET_REQ:
      return {
        ...state,
      };
    case INCREASE_BET_SUC:
      return {
        ...state
      };
    case INCREASE_BET_ERR:
      return {
        ...state,
      };
    case DECREASE_BET_REQ:
      return {
        ...state,
      };
    case DECREASE_BET_SUC:
      return {
        ...state
      };
    case DECREASE_BET_ERR:
      return {
        ...state,
      };
    case PLACE_BET_REQ:
      return {
        ...state,
      };
    case PLACE_BET_SUC:
      return {
        ...state
      };
    case PLACE_BET_ERR:
      return {
        ...state,
      };
    case SHOW_EARNINGS_REQ:
      return {
        ...state,
      };
    case SHOW_EARNINGS_SUC:
      return {
        ...state
      };
    case SHOW_EARNINGS_ERR:
      return {
        ...state,
      };
    case BUY_PSTTOKENS_REQ:
      return {
        ...state,
      };
    case BUY_PSTTOKENS_SUC:
      return {
        ...state
      };
    case BUY_PSTTOKENS_ERR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default gameStats
