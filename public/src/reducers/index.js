import { combineReducers } from 'redux';
import gameStats from './gameStats';
import usersIntro from './usersIntro';

const RootReducer = combineReducers({
  // gameStats,
  usersIntro
});

export default RootReducer;
