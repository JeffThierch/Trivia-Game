import {
  CHANGE_TOKEN,
  CHANGE_SCORE,
  SAVE_PLAYER_INFO,
  SUBMIT_CORRECT_ANSWERS,
  SAVE_SETTINGS,
} from '../actions';

// Cypress da erro caso tenha mais de um reducer, entao irei juntar todos eles nesse reducer

const INITIAL_STATE = {
  player: {
    id: 0,
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  data: [],
  settings: {
    category: '',
    dificulty: '',
    type: '',
  },
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER_INFO:
    return {
      ...state,
      player: {
        ...state.player,
        id: action.payload.id,
        name: action.payload.name,
        score: action.payload.score,
        gravatarEmail: action.payload.email,
      },

    };
  case CHANGE_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.payload,
      },
    };
  case CHANGE_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case SUBMIT_CORRECT_ANSWERS:
    return {
      ...state,
      player: {
        ...state.player,
        assertions: action.payload,
      },
    };
  case SAVE_SETTINGS:
    return {
      ...state,
      settings: {
        ...state.settings,
        category: action.payload.category,
        dificulty: action.payload.dificulty,
        type: action.payload.type,
      },
    };
  default:
    return state;
  }
};

export default rootReducer;
