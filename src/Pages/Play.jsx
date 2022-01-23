import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import getQuestions from '../services/getQuestions';
import getToken from '../services/getToken';
import '../styles/Play.css';
import { changeScoreInStore, submitNumbOfCorrectAnswers } from '../actions';
import Header from '../components/Header';
import difficultyModifier from '../helpers/data';
import NotFound from '../components/NotFound';
import Ampola from '../img/ampola.png';
import 'react-circular-progressbar/dist/styles.css';

export default function Play() {
  const NUMBER_OF_ANSWERS = 5;
  const EXPIRED_TOKEN_CODE = 3;
  const MAXIMUN_SECONDS_TIMER = 30;
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, changeQuestion] = useState(0);
  const [numbOfCorrectAnswers, increaseNumbOfCorrectAnswers] = useState(0);
  const [showCorrectAnswers, changeShowCorrectAnswers] = useState(false);
  const [answerRandomized, changeAnswers] = useState([]);
  const [wasFetched, setWasFetched] = useState(false);
  const [timer, changeTimer] = useState(MAXIMUN_SECONDS_TIMER);
  const { token } = useSelector((state) => state);
  const settings = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getResults = async () => {
      let results = await getQuestions(token, settings);

      if (results.responseCode === EXPIRED_TOKEN_CODE) {
        const {
          data: { token: newToken },
        } = await getToken();
        results = await getQuestions(newToken, settings);
      }
      setQuiz(results.dataResults);
      setWasFetched(true);
    };
    getResults();
  }, [token, settings]);

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

  useEffect(() => {
    const ONE_SECOND = 1000;
    let timerInterval;
    if (timer === 0) {
      changeShowCorrectAnswers(true);
    }
    if (!showCorrectAnswers) {
      timerInterval = setInterval(() => {
        changeTimer((prevTimer) => prevTimer - 1);
      }, ONE_SECOND);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [showCorrectAnswers, timer]);

  useEffect(() => {
    if (currentQuestion === NUMBER_OF_ANSWERS) {
      dispatch(submitNumbOfCorrectAnswers(numbOfCorrectAnswers));
      history.push('/feedback');
    }
  }, [currentQuestion, history, numbOfCorrectAnswers, dispatch]);

  const nextQuestionClick = () => {
    changeShowCorrectAnswers(false);
    changeTimer(MAXIMUN_SECONDS_TIMER);
    changeQuestion(currentQuestion + 1);
  };
  const calculateRank = () => {
    const BASE_POINTS = 10;
    const { difficulty } = quiz[currentQuestion];
    const modPoints = difficultyModifier[difficulty];
    const pointsGain = BASE_POINTS + (timer * modPoints);
    return pointsGain;
  };

  const attRankPoins = () => {
    const totalQuestionPoint = calculateRank();
    const storage = JSON.parse(localStorage.getItem('ranking'));
    const playerStorage = storage.filter((player) => player.id === id);
    playerStorage[0].score += totalQuestionPoint;
    dispatch(changeScoreInStore(storage[0].score));
    const newStorage = storage.map((player) => {
      if (player.id === playerStorage[0].id) {
        return playerStorage[0];
      }
      return player;
    });
    localStorage.setItem('ranking', JSON.stringify(newStorage));
  };

  const selectAnswer = (target) => {
    if (target.id === 'correct-answer') {
      attRankPoins();
      increaseNumbOfCorrectAnswers(numbOfCorrectAnswers + 1);
    }
    changeShowCorrectAnswers(true);
  };
  /* Os elementos com as alternativas incorretas devem possuir o atributo data-testid
  com o valor wrong-answer-${index}, com ${index} iniciando com o valor 0 */
  let indexOfWrongQuestions = 0;
  return (
    <>
      <Header />
      {quiz.length === 0 && wasFetched && <NotFound />}
      {quiz.length === NUMBER_OF_ANSWERS && currentQuestion < NUMBER_OF_ANSWERS && (
        <section
          className="main-box-play"
        >
          {/* Categoria */}
          <div
            className="question-container"
          >
            <h1
              data-testid="question-category"
              className="question-category"
            >
              {quiz[currentQuestion].category}
            </h1>
          </div>
          <div
            className="timer-container"
          >
            <img
              src={ Ampola }
              alt="timer-ampola"
              className="timer-ampola"
            />
            <CircularProgressbar
              className="timer-progress-bar"
              minValue={ 0 }
              maxValue={ 30 }
              value={ timer }
              text={ `${timer}s` }
              styles={ buildStyles({
                rotation: 90,
                textSize: '200%',
                pathTransitionDuration: 1,
                textColor: '#1e1e1e',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              }) }
            />
            {/* <p>{timer}</p> */}
          </div>
          {/* Perguntas que vem da API */}
          <div
            className="quiz-container"
          >
            <h3 className="question-title">
              Question
            </h3>
            <p data-testid="question-text">{quiz[currentQuestion].question}</p>
          </div>
          {/* Alternativas da API */}
          <div
            id="answer-div"
            data-testid="answer-options"
            className="answers-container"
          >
            {answerRandomized.map((answer, index) => {
              if (answer.isCorrect) {
              // Resposta correta
                return (
                  <button
                    data-testid="correct-answer"
                    key={ index }
                    type="button"
                    id="correct-answer"
                    onClick={ ({ target }) => selectAnswer(target) }
                    disabled={ showCorrectAnswers }
                    className={
                      `${showCorrectAnswers ? 'correct-answer' : ''} btn-option`
                    }
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
                  onClick={ ({ target }) => selectAnswer(target) }
                  disabled={ showCorrectAnswers }
                  className={
                    `${showCorrectAnswers ? 'wrong-answer' : ''} btn-option`
                  }
                >
                  { answer.answer }
                </button>
              );
            })}
          </div>
          {showCorrectAnswers && (
            <div
              className="btn-next-container"
            >
              <button
                type="button"
                className="btn-next"
                onClick={ nextQuestionClick }
                data-testid="btn-next"
              >
                Next Question
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
