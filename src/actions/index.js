export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';
export const CHANGE_SCORE = 'CHANGE_SCORE';

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
