import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getQuestions from '../services/getQuestions';
import getToken from '../services/getToken';
import '../styles/Play.css';
// import { saveTokenInStore } from '../actions';
import Header from '../components/Header';

export default function Play() {
  const NUMBER_OF_ANSWERS = 5;
  const EXPIRED_TOKEN_CODE = 3;

  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, changeQuestion] = useState(0);
  const [showCorrectAnswers, changeShowCorrectAnswers] = useState(false);
  const [answerRandomized, changeAnswers] = useState([]);
  const { token } = useSelector((state) => state);
  // const dispatch = useDispatch();

  useEffect(() => {
    const getResults = async () => {
      let results = await getQuestions(token);

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
  };

  useEffect(() => {
    if (quiz.length === NUMBER_OF_ANSWERS && currentQuestion < NUMBER_OF_ANSWERS) {
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = quiz[currentQuestion];

      const correctAnswerObj = {
        answer: correctAnswer,
        isCorrect: true,
      };

      const incorrectAnswersArray = incorrectAnswers.map(
        (answer) => ({ answer }),
      );

      const answersArray = [correctAnswerObj, ...incorrectAnswersArray];

      // Essa funcao foi retirada do site : https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
      // E tem como funcao embaralhar o array de forma aleatorio
      const chanceOfMove = 0.5;
      const randomizedAnswers = answersArray.sort(() => chanceOfMove - Math.random());

      changeAnswers(randomizedAnswers);
    }
  }, [currentQuestion, quiz]);

  /* Os elementos com as alternativas incorretas devem possuir o atributo data-testid
  com o valor wrong-answer-${index}, com ${index} iniciando com o valor 0 */
  let indexOfWrongQuestions = 0;

  const nextQuestionClick = () => {
    changeShowCorrectAnswers(false);
    changeQuestion(currentQuestion + 1);
  };

  return (
    <>
      <Header />

      {quiz.length === NUMBER_OF_ANSWERS && currentQuestion < NUMBER_OF_ANSWERS && (
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
            {answerRandomized.map((answer, index) => {
              if (answer.isCorrect) {
              // Resposta correta
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

              // Respostas erradas
              return (
                <button
                  data-testid={ `wrong-answer-${indexOfWrongQuestions - 1}` }
                  key={ index }
                  type="button"
                  onClick={ selectAnswer }
                  className={ showCorrectAnswers ? 'wrong-answer' : '' }

                >
                  { answer.answer }
                </button>
              );
            })}
          </div>
          {showCorrectAnswers && (
            <button
              type="button"
              onClick={ nextQuestionClick }
              data-testid="btn-next"
            >
              Next
            </button>
          )}
        </section>
      )}

    </>
  );
}
