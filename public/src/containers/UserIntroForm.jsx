import React,
{
  Component,
  Fragment
} from 'react';

import { connect } from 'react-redux';

import {
  updateEthrAddr,
  updateUserHandle,
  findUser
} from '../actions/usersIntro';


class UserIntroForm extends Component {
  constructor(props) {
    super(props);

    this.handleEthrAddrInput = this.handleEthrAddrInput.bind(this);
    this.handleUserHandleInput = this.handleUserHandleInput.bind(this);
    this.verifyUserAddress = this.verifyUserAddress.bind(this);
  }

  handleEthrAddrInput(e) {
    const {
      dispatch,
      history
    } = this.props;

    dispatch(updateEthrAddr(e.target.value, history));
  }

  handleUserHandleInput(e) {
    const {
      dispatch,
      history
    } = this.props;

    dispatch(updateUserHandle(e.target.value, history));
  }

  verifyUserAddress() {
    const {
      dispatch,
      ethrAddr
    } = this.props;

    dispatch(findUser(ethrAddr));
  }

  render() {
    const {
      ethrAddr,
      userHandle
    } = this.props;

    return (
      <div
        className="outerpage-intro">
        <div
          className="userInputIntroContainers">
          <input
            className="ethrAddrInput"
            type="text"
            name="ethrAddr"
            value={ethrAddr}
            onChange={(e) => this.handleEthrAddrInput(e)}
          />
          <input
            className="userHandleInput"
            type="text"
            name="userHandle"
            value={userHandle}
            onChange={(e) => this.handleUserHandleInput(e)}
          />
        </div>
        <div
          className="submit-userIntro">
          <button
            className="sbmt-btn"
            onClick={(e) => {e.preventDefault(); this.verifyUserAddress()}}>
            Add Info
          </button>
        </div>
      </div>
    );
  };
};

export default  UserIntroForm;
