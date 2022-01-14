import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getQuestions from '../services/getQuestions';

export default function Play() {
  const [quiz, setQuiz] = useState('');
  const { token } = useSelector((state) => state);

  useEffect(() => {
    const getQuiz = async () => {
      const result = await getQuestions(token);
      // console.log(result);
      setQuiz(result);
    };
    getQuiz();
  }, [token]);

  return (
    <section>
      {/* Categoria */}
      <div>
        <h1 data-testid="question-category">category</h1>
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
  );
}
