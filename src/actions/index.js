export const CHANGE_TOKEN = 'CHANGE_TOKEN';

export const saveTokenInStore = (token) => ({
  type: CHANGE_TOKEN,
  payload: token,
});
