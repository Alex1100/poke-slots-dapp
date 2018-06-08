import {
  UPDATE_REELS_ORDER
} from '../actions/game';

const reelState = (state = {
  reels: ['poke0', 'poke0', 'poke0', 'poke0', 'poke0', 'poke0', 'poke0', 'poke0', 'poke0'],
  pokes: ['poke0', 'poke1', 'poke2', 'poke3', 'poke4', 'poke5'],
  bulbs: [
          'empty_bulb.png',
          'lit_bulb_0_a.png',
          'lit_bulb_0_b.png',
           'lit_bulb_1_a.png',
           'lit_bulb_1_b.png',
           'lit_bulb_2_a.png',
           'lit_bulb_2_b.png',
           'lit_bulb_3_a.png',
           'lit_bulb_4_b.png',
           'lit_bulb_4_a.png',
           'lit_bulb_4_b.png',
           'lit_bulb_5_a.png',
           'lit_bulb_5_b.png'
         ],

}, action) => {
  switch(action.type) {
    case UPDATE_REELS_ORDER:
      return {
        ...state,
        reels: action.reels
      }
    default:
      return state;
  }
};

export default reelState;
