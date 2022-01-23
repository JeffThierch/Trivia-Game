import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/Ranking.css';

export default function Ranking() {
  const history = useHistory();

  // get ranking from localStorage and sort ranking
  const storageRanking = JSON.parse(localStorage.getItem('ranking'));
  storageRanking.sort((scoreA, scoreB) => scoreB.score - scoreA.score);

  const homepageButton = () => {
    history.push('/');
  };

  const MAX_PLAYER_IN_RANKING = 5;

  return (
    <section
      className="d-flex flex-column card mb-5 p-3
      position-relative rounded shadow start-50 top-50
      translate-middle main-box-ranking"
    >
      <h1
        className="ranking-title"
        data-testid="ranking-title"
      >
        Ranking
      </h1>
      { storageRanking.map((player, index) => {
        if ((index + 1) <= MAX_PLAYER_IN_RANKING) {
          return (
            <div
              key={ index + 1 }
              className="d-flex mb-0 p-1 rounded-pill shadow
              align-items-center ranking-player"
            >
              <div className="m-0 ranking-classification">
                <p className="m-0 classification-id">
                  { `${index + 1} - ` }
                </p>
              </div>
              <img
                src={ player.picture }
                alt={ player }
                className="rounded-circle ranking-player-img w-10 mx-1"
              />
              <div
                className="d-flex justify-content-between
                align-items-center ranking-player-profile w-100 h-100"
              >
                <p
                  data-testid={ `player-name-${index}` }
                  className="p-0 m-0 ranking-player-name"
                >
                  { player.name }
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                  className="p-0 m-0 ranking-player-score"
                >
                  { player.score }
                </p>
              </div>
            </div>
          );
        }
        return false;
      })}
      <div
        className="back-to-homepage"
      >
        <button
          className="btn-homepage"
          data-testid="btn-go-home"
          type="button"
          onClick={ homepageButton }
        >
          Homepage
        </button>
      </div>
    </section>
  );
}
