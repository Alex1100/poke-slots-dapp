import React,
{
  Component,
  Fragment
} from 'react';

class GameContainer extends Component {
  constructor(props) {
    super(props);
  }


  spinWheel() {
    const {
      coins,
      dispatch,
      wagerPlaced
    } = this.props;

    if (wagerPlaced > 0 && coins >= 0) {
      this.selectPokemons();
      this.checkWinningConditions();
    }
  }

  startFlashing() {
    for (let i = 0; i < 6; i++) {
      (function(j) {
        setInterval(() => {
          this.changeLight(j);
        }, 275);
      })(i);
    }
  }

  changeLight(lightNum) {
    const {
      bulbs
    } = this.props;

    let light = document.body.getElementsByClassName(`light light-${lightNum}`);
    let rnd = Math.floor(Math.random() * 12) + 1;
    light[0]['style']['backgroundImage'] = `url("../../assets/${bulbs[rnd]}")`;
  }

  selectPokemons() {
    const {
      pokes,
      $reels
    } = this.props;

    let temp = [];
    for (let i = 0; i < 10; i++) {
      let randNum = this.getRndUpTo(pokes.length);
      temp.push(pokes[randNum]);
    }

    dispatch(updateReelsOrder(temp));
    $reels.forEach((reel, idx) => {
      $reels['className'] = 'poke' + reels[idx];
    });

    console.log("REELS: ", reels);
  }

  checkBetAmount(){
    const {
      wagerPlaced,
      coins,
      dispatch,
    } = this.props;

    if(
        (wagerPlaced > coins && coins < Infinity) &&
        wagerPlaced < Infinity
      ){
        if (coins < 0) {
          dispatch(setCoinsToZero());
        }

        dispatch(setWagerToCoins(coins));
    } else {
      dispatch(decrementCoinCount(wagerPlaced));
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
      multiplier = 10;
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
      Sevens
    } = this.props;

    let val;

    switch(pokemon) {
      case 'poke0':
        val = (Pikachu * multiplier);
        dispatch(incrementCoinCount(val));
      case 'poke1':
        val = (Torchik * multiplier);
        dispatch(incrementCoinCount(val));
      case 'poke2':
        val = (Flareon * multiplier);
        dispatch(incrementCoinCount(val));
      case 'poke3':
        val = (Vaporeon * multiplier);
        dispatch(incrementCoinCount(val));
      case 'poke4':
        val = (Leafeon * multiplier);
        dispatch(incrementCoinCount(val));
      case 'poke5':
        val = (Sevens * multiplier);
        dispatch(incrementCoinCount(val));
      default:
        return false;
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
      dispatch,
      history
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
            <div className="coins"></div>
          </div>
          <div className="display_body">
            <div className="poke" />
            <div className="poke" />
            <div className="poke" />
            <div className="poke" />
            <div className="poke" />
            <div className="poke" />
            <div className="poke" />
            <div className="poke" />
            <div className="poke" />
          </div>
        </div>
        <div className="machine_bottom">
          <button className="bet"><p>Increase Bet<p></button>
          <button className="decrease"><p>Decrease Bet</p></button>
          <div className="amount"><p className="bet_coins"></p></div>
          <button className="max_bet"><p>Max Bet</p></button>
          <button className="spin_wheel">Spin</button>
        </div>
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
    coins
  } = gameStats;

  const {
    bulbs,
    reels,
    $reels,
    pokes
  } = reelState;

  return {
    wagerPlaced,
    sufficientFunds,
    fundsErrorMessage,
    coins,
    bulbs,
    reels,
    $reels,
    pokes
  };

};

export default connect(mapStateToProps)(GameContainer);
