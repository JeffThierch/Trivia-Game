import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Ranking() {
  const history = useHistory();

  // get ranking from localStorage and sort ranking
  const storageRanking = JSON.parse(localStorage.getItem('ranking'));
  storageRanking.sort((scoreA, scoreB) => scoreB.score - scoreA.score);

  const homepageButton = () => {
    history.push('/');
  };

  return (
    <>
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        { storageRanking.map((player, index) => (
          <div key={ index + 1 }>
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            <img src={ player.picture } alt={ player } />
          </div>
        ))}
      </section>
      <section>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ homepageButton }
        >
          Homepage
        </button>
      </section>
    </>
  );
}