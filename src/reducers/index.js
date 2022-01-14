import { CHANGE_TOKEN } from '../actions';

// Cypress da erro caso tenha mais de um reducer, entao irei juntar todos eles nesse reducer

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  data: [],
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default rootReducer;
