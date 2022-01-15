import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getQuestions from '../services/getQuestions';
import getToken from '../services/getToken';
import '../styles/Play.css';
// import { saveTokenInStore } from '../actions';
import Header from '../components/Header';

export default function Play() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, changeQuestion] = useState(0);
  const [showCorrectAnswers, changeShowCorrectAnswers] = useState(false);
  const { token } = useSelector((state) => state);
  // const dispatch = useDispatch();

  useEffect(() => {
    const getResults = async () => {
      let results = await getQuestions(token);
      const EXPIRED_TOKEN_CODE = 3;
      if (results.responseCode === EXPIRED_TOKEN_CODE) {
        const {
          data: { token: newToken },
        } = await getToken();
        results = await getQuestions(newToken);
      }
      setQuiz(results.dataResults);
    };
    getResults();
  }, [token]);

  const selectAnswer = () => {
    changeShowCorrectAnswers(true);
    /* changeQuestion(currentQuestion + 1); */


  const numbOfQuestions = 5;

  // Create array of answers
  const answers = [];
  if (quiz.length === numbOfQuestions && currentQuestion < numbOfQuestions) {
    const correctanswer = {
      answer: quiz[currentQuestion].correct_answer,
      correctanswer: true,
    };
    answers.push(correctanswer);
    quiz[currentQuestion].incorrect_answers.forEach((incAnswer) => {
      answers.push({ answer: incAnswer });
    });
  }

  // Embaralhar array
  const magicNumber = 0.5;
  answers.sort(() => magicNumber - Math.random());

  /* Os elementos com as alternativas incorretas devem possuir o atributo data-testid
  com o valor wrong-answer-${index}, com ${index} iniciando com o valor 0 */
  let indexOfWrongQuestions = 0;

  return (
    <>
      <Header />
      {quiz.length === numbOfQuestions && currentQuestion < numbOfQuestions && (
        <section data-testid="uiui aiai">
          {/* Categoria */}
          <div>
            <h1 data-testid="question-category">
              {quiz[currentQuestion].category}
            </h1>
          </div>
          {/* Perguntas que vem da API */}
          <div>
            <h3>Pergunta</h3>
            <p data-testid="question-text">{quiz[currentQuestion].question}</p>
          </div>
          {/* Alternativas da API */}
          <div
            id="answer-div"
            data-testid="answer-options"
          >
            {answers.map((answer, index) => {
              if (answer.correctanswer) {
              // Pergunta correta
                return (
                  <button
                    data-testid="correct-answer"
                    key={ index }
                    type="button"
                    onClick={ selectAnswer }
                    className={ showCorrectAnswers ? 'correct-answer' : '' }
                  >
                    { answer.answer }
                  </button>
                );
              }
              indexOfWrongQuestions += 1;
              // Perguntas erradas
              return (
                <button
                  data-testid={ `wrong-answer-${indexOfWrongQuestions - 1}` }
                  key={ index }
                  type="button"
                  onClick={ selectAnswer }
                  className={ showCorrectAnswers ? 'wrong-answer' : '' }

                >
                  { answer.answer }
                </button>);
            })}
          </div>
        </section>
      )}
    </>
  );
}
