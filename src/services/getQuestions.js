const getQuestions = async (token) => {
  const URL = 'https://opentdb.com/api.php?amount=5&token=';

  const returnedData = {
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
