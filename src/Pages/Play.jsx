import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getQuestions from '../services/getQuestions';
import getToken from '../services/getToken';
// import { saveTokenInStore } from '../actions';
import Header from '../components/Header';

export default function Play() {
  const [quiz, setQuiz] = useState([]);
  const { token } = useSelector((state) => state);
  // const dispatch = useDispatch();

  useEffect(() => {
    const getResults = async () => {
      let results = await getQuestions(token);
      const EXPIRED_TOKEN_CODE = 3;
      if (results.responseCode === EXPIRED_TOKEN_CODE) {
        const { data: { token: newToken } } = await getToken();
        results = await getQuestions(newToken);
      }
      setQuiz(results.dataResults);
    };
    getResults();
  }, [token]);

  return (
    <>
      <Header />
      <section>
         {/* Categoria */}
      <div>
        <h1 data-testid="question-category">{quiz.category}</h1>
      </div>
      {/* Perguntas que vem da API */}
      <div>
        <h3 data-testid="question-text">perguntas</h3>
      </div>
      {/* Alternativas da API */}
      <div>
        <ul>
          <li>
            teste
          </li>
        </ul>
      </div>
      </section>
    </>
  );
}
