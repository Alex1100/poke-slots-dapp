import {
  UPDATE_ETHER_ADDR,
  UPDATE_USER_HANDLE,
  UPDATE_USER_FOUND
} from '../actions/usersIntro';


const usersIntro = (state = {
  ethrAddr: '',
  userHandle: '',
  userFound: false
}, action) => {
  switch(action.type) {
    case UPDATE_ETHER_ADDR:
      return {
        ...state,
        ethrAddr: action.ethrAddr
      };
    case UPDATE_USER_HANDLE:
      return {
        ...state,
        userHandle: action.userHandle
      };

    case UPDATE_USER_FOUND:
      return {
        ...state,
        userFound: action.userFound
      };
    default:
      return state;
  }
};

export default usersIntro
