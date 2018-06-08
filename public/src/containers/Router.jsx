import React,
{
  Component,
  Fragment
} from 'react';

import { connect } from 'react-redux';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import {
  withDisplay
} from '../higher_order_components/withDisplay';

import GameContainer from './GameContainer';
import UserIntroForm from './UserIntroForm';

class Router extends Component {

  componentDidMount() {
    this.displayPage();
  }

  displayPage() {
    const {
      userFound
    } = this.props;

    let selectedComponent;

    userFound === false ?
      selectedComponent = UserIntroForm : selectedComponent = GameContainer;

    return withDisplay(selectedComponent, {...this.props});
  }


  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Fragment>
            {this.displayPage()}
          </Fragment>
        </Route>
      </Switch>
    );
  }
};

const mapStateToProps = (state) => {
  const {
    usersIntro
  } = state;

  const {
    ethrAddr,
    userHandle,
    userFound
  } = usersIntro;

  return {
    ethrAddr,
    userHandle,
    userFound
  };
}



export default withRouter(connect(mapStateToProps)(Router))
