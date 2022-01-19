const getQuestions = async (
  token,
  userSettings = { category: '', dificulty: '', type: '' },
) => {
  const { category, dificulty, type } = userSettings;
  console.log(category, dificulty, type);
  const URL = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${dificulty}&type=${type}&token=`;

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
