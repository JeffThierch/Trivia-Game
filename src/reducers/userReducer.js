// import { SUBMIT_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  // const { name, assertions, gravatarEmail } = action.payload;
  switch (action.type) {
  /* case SUBMIT_PLAYER:
    return {
      ...state,
      name,
      assertions,
      gravatarEmail,
    } */
  default:
    return state;
  }
};

export default userReducer;
