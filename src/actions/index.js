export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const SUBMIT_CORRECT_ANSWERS = 'SUBMIT_CORRECT_ANSWERS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

export const saveTokenInStore = (token) => ({
  type: CHANGE_TOKEN,
  payload: token,
});

export const savePlayerInfo = (infos) => ({
  type: SAVE_PLAYER_INFO,
  payload: infos,
});

export const changeScoreInStore = (score) => ({
  type: CHANGE_SCORE,
  payload: score,
});

export const submitNumbOfCorrectAnswers = (correcAnswers) => ({
  type: SUBMIT_CORRECT_ANSWERS,
  payload: correcAnswers,
});

export const saveUserSettings = (settings) => ({
  type: SAVE_SETTINGS,
  payload: settings,
});
