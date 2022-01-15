import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const { id } = useSelector((state) => state.player);

  const getRankingFromLocalStorage = (playerID) => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const playerRanking = ranking.filter((player) => player.id === playerID);
    return playerRanking[0];
  };

  const { name, score, picture } = getRankingFromLocalStorage(id);

  return (
    <header>
      <img
        src={ picture }
        alt=""
        data-testid="header-profile-picture"
      />
      <div>
        <p>Nickname</p>
        <p data-testid="header-player-name">
          { name }
        </p>
      </div>
      <div>
        <p>Pontuação</p>
        <p data-testid="header-score">
          { score }
        </p>
      </div>
    </header>
  );
}
