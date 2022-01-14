//

const fetchUserToken = async () => {
  const returnedData = {
    data: {},
    error: '',
  };

  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();

    returnedData.data = response;

    return returnedData;
  } catch (error) {
    returnedData.error = error;

    return returnedData;
  }
};

export default fetchUserToken;
