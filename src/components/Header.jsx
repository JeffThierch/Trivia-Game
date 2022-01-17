import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Header.css'

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
      className="
      d-flex
      flex-row
      justify-content-between
      align-items-center
      "
    >
      <div
        className="
        d-flex
        flex-row
        align-items-center
        ms-3
        "
      >
        <img
          className="
          border
          border-3
          rounded-circle
          my-0
          me-3
          playerImg
          "
          src={ picture }
          alt=""
          data-testid="header-profile-picture"
        />
        <p
        className=""
        data-testid="header-player-name"
        >
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
