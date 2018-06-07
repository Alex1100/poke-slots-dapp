import axios from 'axios';

export const UPDATE_ETHER_ADDR = 'UPDATE_ETHER_ADDR';
export const UPDATE_USER_HANDLE = 'UPDATE_USER_HANDLE';
export const UPDATE_USER_FOUND = 'UPDATE_USER_FOUND';

const updateEthrAddr = (_ethrAddr) => ({
  type: UPDATE_ETHER_ADDR,
  ethrAddr: _ethrAddr
});

const updateUserHandle = (_userHandle) => ({
  type: UPDATE_USER_HANDLE,
  userHandle: _userHandle
});

const updateUserFound = (_userFound) => ({
  type: UPDATE_USER_FOUND,
  userFound: _userFound
});

const findUser = (_ethrAddr) => (dispatch) => {
  axios.post('/api/verifyAddress', { ethAddr: _ethrAddr }, {})
    .then(response => {
      const validEthrAddr = response.data;
      dispatch(updateUserFound(validEthrAddr));
    })
    .catch(err => {
      console.log("ERR: ", err.message);
    });
}


export {
  updateUserHandle,
  updateEthrAddr,
  findUser
};
