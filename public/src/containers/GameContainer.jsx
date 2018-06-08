import React,
{
  Component,
  Fragment
} from 'react';

import {
  connect
} from 'react-redux'

import {
  increaseWager,
  decreaseWager,
  setCoinsToZero,
  changeReelsOrder,
  setWagerToCoins,
  updateMultiplier,
  decrementCoinCount,
  incrementCoinCount
} from '../actions/game';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashing: false
    };

    this.placeMaxWager = this.placeMaxWager.bind(this);
    this.decreaseBet = this.decreaseBet.bind(this);
    this.increaseBet = this.increaseBet.bind(this);
    this.changeMaxBetStylesLive = this.changeMaxBetStylesLive.bind(this);
    this.changeMaxBetStylesFade = this.changeMaxBetStylesFade.bind(this);
    this.changeBetStylesLive = this.changeBetStylesLive.bind(this);
    this.changeBetStylesFade = this.changeBetStylesFade.bind(this);
    this.changeWheelStylesLive = this.changeWheelStylesLive.bind(this);
    this.changeWheelStylesFade = this.changeWheelStylesFade.bind(this);
    this.spinWheel = this.spinWheel.bind(this);
    this.startFlashing = this.startFlashing.bind(this);
    this.changeLight = this.changeLight.bind(this);
    this.selectPokemons = this.selectPokemons.bind(this);
    this.checkBetAmount = this.checkBetAmount.bind(this);
    this.checkWinningConditions = this.checkWinningConditions.bind(this);
    this.countCoins = this.countCoins.bind(this);
    this.getRndUpTo = this.getRndUpTo.bind(this);
  }

  componentDidMount() {
    this.startFlashing();
  }

  placeMaxWager(e) {
    e.preventDefault();
    const {
      wagerPlaced,
      coins,
      dispatch,
      history
    } = this.props;

    let maxBetDiv =
      document
      .body
      .getElementsByClassName('max_bet')[0];

    maxBetDiv['style']['color'] = 'gold';

    if (wagerPlaced === 0) {
      dispatch(increaseWager(wagerPlaced, coins, coins, history));
    } else if (wagerPlaced >= 10 && wagerPlaced <= 2000000000) {
      dispatch(increaseWager(wagerPlaced, coins, coins, history));
    }
    alert('Max Wager Placed!');
  }

  decreaseBet(e) {
    const {
      wagerPlaced,
      coins,
      dispatch,
      history
    } = this.props;

    let betDiv =
      document
      .body
      .getElementsByClassName('decrease')[0];

    betDiv['style']['color'] = 'gold';

    if (wagerPlaced > 0) {
      if (coins || coins !== undefined) {
        dispatch(decreaseWager(wagerPlaced, coins, 10, history));
      }
    } else {
      alert('Minimum bet is 10 PSTT Tokens');
    }
  }

  increaseBet(e) {
    const {
      wagerPlaced,
      coins,
      dispatch,
      history
    } = this.props;

    let betDiv =
      document
      .body
      .getElementsByClassName('increase')[0];

    betDiv['style']['color'] = 'gold';

    if (wagerPlaced < 1999999990 && coins > 0) {
      if (coins) {
        dispatch(increaseWager(wagerPlaced, coins, 10, history));
      }
    }

    if (wagerPlaced === 2000000000 && coins > 0) {
      alert('You own all PSTT Tokens in existence.');
    }

    if (wagerPlaced === 0 && coins  <= 0) {
      alert('Insufficient Funds. Minimum bet is 10 coins');
    }
  }

  changeMaxBetStylesLive(e) {
    let maxBetDiv =
      document
      .body
      .getElementsByClassName('max_bet')[0];

    maxBetDiv['style']['color'] = 'red';
    maxBetDiv['style']['backgroundColor'] = 'black';
  }

  changeMaxBetStylesFade(e) {
    let maxBetDiv =
      document
      .body
      .getElementsByClassName('max_bet')[0];

    maxBetDiv['style']['color'] = 'black';
    maxBetDiv['style']['backgroundColor'] = 'lightgrey';
  }

  changeBetStylesLive(e) {
    let betDiv =
      document
      .body
      .getElementsByClassName(e)[0];

    betDiv['style']['color'] = 'red';
    betDiv['style']['backgroundColor'] = 'black';
  }

  changeBetStylesFade(e) {
    let betDiv =
      document
      .body
      .getElementsByClassName(e)[0];

    betDiv['style']['color'] = 'black';
    betDiv['style']['backgroundColor'] = 'lightgrey';
  }

  changeWheelStylesLive(e) {
    let wheelDiv =
      document
      .body
      .getElementsByClassName('spin_wheel')[0];

      wheelDiv['style']['color'] = 'red';
      wheelDiv['style']['backgroundColor'] = 'black';
  }

  changeWheelStylesFade(e) {
    let wheelDiv =
      document
      .body
      .getElementsByClassName('spin_wheel')[0];

    wheelDiv['style']['color'] = 'black';
    wheelDiv['style']['backgroundColor'] = 'lightgrey';
  }

  spinWheel(e) {
    const {
      coins,
      dispatch,
      wagerPlaced
    } = this.props;

    if(coins <= 0 && wagerPlaced <= 0){
      dispatch(setCoinsToZero());
    } else {
      let wheelDiv = document.body.getElementsByClassName('spin_wheel')[0]
      wheelDiv['style']['color'] = 'gold';

      if (wagerPlaced > 0 && coins >= 0) {
        this.selectPokemons();
        this.checkWinningConditions();
      }
    }
  }

  startFlashing() {
    for (let i = 0; i < 6; i++) {
      let l = this.changeLight;
      (function(j, d) {
        setInterval(function() {
          d(j);
        }, 275);
      })(i, l);
    }
  }

  changeLight(lightNum) {
    const {
      bulbs
    } = this.props;

    let light = document.body.getElementsByClassName(`light-${lightNum}`);
    let rnd = Math.floor(Math.random() * 12) + 1;
    light[0]['style']['backgroundImage'] = `url("../../assets/${bulbs[rnd]}")`;
  }

  selectPokemons() {
    const {
      pokes,
      dispatch,
      history
    } = this.props;

    let temp = [];
    for (let i = 0; i < 9; i++) {
      let randNum = this.getRndUpTo(pokes.length);
      temp.push(pokes[randNum]);
    }

    dispatch(changeReelsOrder(temp, history));
  }

  checkBetAmount(){
    const {
      wagerPlaced,
      coins,
      dispatch,
      history
    } = this.props;

    if(
        (wagerPlaced > coins && coins < Infinity) &&
        wagerPlaced < Infinity
      ){
        if (coins < 0) {
          dispatch(setCoinsToZero());
        } else {
          dispatch(setWagerToCoins(coins));
        }

    } else {
      dispatch(decrementCoinCount(wagerPlaced, coins, history));
    }
  }

  checkWinningConditions() {
    const {
      dispatch,
      wagerPlaced,
      multiplier,
      reels
    } = this.props;

    if((wagerPlaced >= 100) && (reels[0] === reels[1]) && reels[0] === reels[2]){
      dispatch(updateMultiplier(10));
      this.countCoins(reels[0]);
      return true;
    }

    if((wagerPlaced <= 100) && (reels[3] === reels[4]) && reels[3] === reels[5]){
      dispatch(updateMultiplier(10));
      this.countCoins(reels[3]);
      return true;
    }

    if((wagerPlaced >= 100) && (reels[6] === reels[7]) && reels[6] === reels[8]){
      dispatch(updateMultiplier(10));
      this.countCoins(reels[6]);
      return true;
    }

    if((wagerPlaced >= 400) && (reels[0] === reels[4]) && reels[0] === reels[8]){
      dispatch(updateMultiplier(3));
      this.countCoins(reels[0]);
      return true;
    }

    if((wagerPlaced >= 400) &&(reels[2] === reels[4]) && reels[2] === reels[6]){
      dispatch(updateMultiplier(3));
      this.countCoins(reels[2]);
      return true;
    }

    if((wagerPlaced >= 400) && (reels[0] === reels[2]) && reels[0] === reels[4]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[0]);
    }

    if((wagerPlaced >= 400) && (reels[3] === reels[1]) && reels[3] === reels[2]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[3]);
    }

    if((wagerPlaced >= 400) && (reels[3] === reels[1]) && reels[3] === reels[5]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[3]);
    }

    if((wagerPlaced >= 400) && (reels[0] === reels[1]) && reels[0] === reels[5]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[0]);
    }

    if((wagerPlaced >= 400) && (reels[2] === reels[4]) && reels[2] === reels[3]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[0]);
    }

    if((wagerPlaced >= 400) && (reels[5] === reels[4]) && reels[5] === reels[0]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[0]);
    }

    if((wagerPlaced >= 400) && (reels[3] === reels[7]) && reels[3] === reels[8]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[0]);
    }

    if((wagerPlaced >= 400) && (reels[6] === reels[4]) && reels[6] === reels[8]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[0]);
    }

    if((wagerPlaced >= 400) && (reels[6] === reels[7]) && reels[6] === reels[5]){
      dispatch(updateMultiplier(2));
      this.countCoins(reels[0]);
    } else{
      this.checkBetAmount();
    }
  }


  countCoins(pokemon) {
    const {
      Pikachu,
      Torchik,
      Flareon,
      Vaporeon,
      Leafeon,
      Sevens,
      multiplier,
      dispatch,
      history,
      wagerPlaced,
      coins
    } = this.props;

    let val;

    switch(pokemon) {
      case 'poke0':
        val = (Pikachu * multiplier);
        dispatch(incrementCoinCount(wagerPlaced, coins, val, history));
        break;
      case 'poke1':
        val = (Torchik * multiplier);
        dispatch(incrementCoinCount(wagerPlaced, coins, val, history));
        break;
      case 'poke2':
        val = (Flareon * multiplier);
        dispatch(incrementCoinCount(wagerPlaced, coins, val, history));
        break;
      case 'poke3':
        val = (Vaporeon * multiplier);
        dispatch(incrementCoinCount(wagerPlaced, coins, val, history));
        break;
      case 'poke4':
        val = (Leafeon * multiplier);
        dispatch(incrementCoinCount(wagerPlaced, coins, val, history));
        break;
      case 'poke5':
        val = (Sevens * multiplier);
        dispatch(incrementCoinCount(wagerPlaced, coins, val, history));
        break;
      default:
        dispatch(decrementCoinCount(wagerPlaced, coins, history));
        break;
    }
  }

  getRndUpTo(upTo) {
    return Math.floor(Math.random() * upTo);
  }


  render() {
    const {
      wagerPlaced,
      sufficientFunds,
      fundsErrorMessage,
      coins,
      reels
    } = this.props;

    return (
      <div className="machine">
        <div className="top_info">
          <u>
            <h1 className="machine-title">Poke Slots</h1>
          </u>
        </div>
        <div className="lights">
          <div className={`light light-0`} />
          <div className={`light light-1`} />
          <div className={`light light-2`} />
          <div className={`light light-3`} />
          <div className={`light light-4`} />
          <div className={`light light-5`} />
        </div>
        <div className="machine_mid">
          <div className="money">
            <p className="amount"><u>COINS:</u></p>
            <div className="coins">{coins}</div>
          </div>
          <div className="display_body">
            {
              reels.map((pok, i) => (
                <div className={`poke ${pok}`} />
              ))
            }
          </div>
        </div>
        <div className="machine_bottom">
          <Fragment>
            <button
              className="increase"
              onMouseEnter={e => this.changeBetStylesLive('increase')}
              onMouseLeave={e => this.changeBetStylesFade('increase')}
              onClick={e => this.increaseBet(e)}
            >
              Increase Bet
            </button>
          </Fragment>
          <Fragment>
            <button
              className="decrease"
              onMouseEnter={e => this.changeBetStylesLive('decrease')}
              onMouseLeave={e => this.changeBetStylesFade('decrease')}
              onClick={e => this.decreaseBet(e)}
            >
              Decrease Bet
            </button>
          </Fragment>
          <div className="amount">
            <p className="bet_coins">
              {wagerPlaced}
            </p>
          </div>
          <Fragment>
            <button
              className="max_bet"
              onMouseEnter={e => this.changeMaxBetStylesLive(e)}
              onMouseLeave={e => this.changeMaxBetStylesFade(e)}
              onClick={e => this.decreaseBet(e)}
            >
              Max Bet
            </button>
          </Fragment>
          <Fragment>
            <button
              className="spin_wheel"
              onClick={(e) => this.spinWheel(e)}
              onMouseEnter={e => this.changeWheelStylesLive(e)}
              onMouseLeave={e => this.changeWheelStylesFade(e)}
            >
              Spin
            </button>
          </Fragment>
        </div>
        <br/>
        {sufficientFunds ? 'Buy some more PSTT Tokens with Ether': null}
        {fundsErrorMessage && fundErrorMessage !== "" ? fundsErrorMessage : null}
      </div>
    );
  }
}

GameContainer.defaultProps = {
  Pikachu: 5,
  Torchik: 25,
  Flareon: 30,
  Vaporeon: 40,
  Leafeon: 50,
  Sevens: 150
};

const mapStateToProps = (state) => {
  const {
    gameStats,
    reelState
  } = state;

  const {
    wagerPlaced,
    sufficientFunds,
    fundsErrorMessage,
    coins,
    multiplier
  } = gameStats;

  const {
    bulbs,
    reels,
    pokes
  } = reelState;

  return {
    wagerPlaced,
    sufficientFunds,
    fundsErrorMessage,
    coins,
    bulbs,
    reels,
    pokes,
    multiplier
  };

};

export default connect(mapStateToProps)(GameContainer);
