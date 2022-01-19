const getCategorys = async () => {
  const returnedData = {
    data: [],
    error: '',
  };

  try {
    const request = await fetch('https://opentdb.com/api_category.php');
    const { trivia_categories: response } = await request.json();
    // console.log(response);

    returnedData.data = response;

    return returnedData;
  } catch (error) {
    returnedData.error = error;

    return returnedData;
  }
};

export default getCategorys;
