import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Header.css';

export default function Header() {
  const { id } = useSelector((state) => state.player);

  const getRankingFromLocalStorage = (playerID) => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const playerRanking = ranking.filter((player) => player.id === playerID);
    return playerRanking[0];
  };

  const { name, score, picture } = getRankingFromLocalStorage(id);

  return (
    <header
      className="d-flex flex-row justify-content-between align-items-center
      bg-primary text-white main-header main-box-header"
    >
      <div
        className="d-flex flex-row align-items-center ms-2 bg-light
        rounded-pill player-profile justify-content-center"
      >
        <img
          className="border border-3 rounded-circle my-0 player-img"
          src={ picture }
          alt=""
          data-testid="header-profile-picture"
        />
        <p
          className="text-dark h-100 player-name"
          data-testid="header-player-name"
        >
          { name }
        </p>
      </div>
      <div
        className="d-flex flex-row align-items-center bg-light rounded-pill
        me-2 box-player-score"
      >
        <p
          className="text-dark h-100 player-score"
        >
          Score
        </p>
        <p
          data-testid="header-score"
          className="text-dark h-100 score"
        >
          { score }
        </p>
      </div>
    </header>
  );
}
