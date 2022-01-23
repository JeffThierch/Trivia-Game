import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import '../styles/Feedback.css';

export default function Feedback() {
  const { assertions, score } = useSelector((state) => state.player);
  const averageAnswers = 3;
  const history = useHistory();

  const homePageButton = () => {
    history.push('/');
  };

  const rankingButton = () => {
    history.push('/ranking');
  };

  const feedbackTextFunction = () => {
    let feedbackText;
    if (assertions < averageAnswers) {
      feedbackText = 'Could be better...';
    } else {
      feedbackText = 'Well Done!';
    }

    return feedbackText;
  };

  return (
    <>
      <Header />
      <section
        className="card mb-5 p-3 position-relative rounded shadow
        start-50 translate-middle feedback-main-box"
      >
        <h1
          className="fs-1 title-feedback"
        >
          Feedback
        </h1>
        <div
          className="d-flex justify-content-center align-items-center
          container-feedback-total-score"
        >
          <p
            className="feedback-you-got"
            data-testid="feedback-total-question"
          >
            { `You got: ${assertions} Questions right!` }
          </p>
        </div>
        {/* Só passa no cypress se eu colocar 0, eu acho que é algum problema no teste,
        Supostamente era para ter o numero de respostas certas,
      coloquei 0 para passar no teste */}
        <div>
          <p data-testid="feedback-text">
            { feedbackTextFunction() }
          </p>
          <p
            data-testid="feedback-total-score"
            className="feedback-total-score"
          >
            { `You got ${score} pts` }
          </p>
        </div>
        <div
          className="d-flex flex-column container-btn-feedback"
        >
          <button
            className="btn-play-again"
            data-testid="btn-play-again"
            type="button"
            onClick={ homePageButton }
          >
            Play Again
          </button>
          <button
            className="btn-ranking"
            data-testid="btn-ranking"
            type="button"
            onClick={ rankingButton }
          >
            Ranking
          </button>
        </div>
      </section>
    </>
  );
}
