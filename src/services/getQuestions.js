import getToken from './getToken';

const getQuestions = async () => {
  const USER_TOKEN = await getToken();

  const { data: { token } } = USER_TOKEN;

  const URL = 'https://opentdb.com/api.php?amount=5&token=';

  const returnedData = {
    token,
    dataResults: [],
    responseCode: 0,
    error: '',
  };

  try {
    const request = await fetch(`${URL}${token}`);
    const { results, response_code: code } = await request.json();

    returnedData.dataResults = results;
    returnedData.responseCode = code;

    return returnedData;
  } catch (error) {
    returnedData.error = error;

    return returnedData;
  }
};

export default getQuestions;
