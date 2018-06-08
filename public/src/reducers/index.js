import { combineReducers } from 'redux';
import gameStats from './gameStats';
import usersIntro from './usersIntro';
import reelState from './reels';

const RootReducer = combineReducers({
  gameStats,
  reelState,
  usersIntro
});

export default RootReducer;
