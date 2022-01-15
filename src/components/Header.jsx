import React from 'react';

export default function Header() {
  const getRankingFromLocalStorage = () => {
    const gravatar = JSON.parse(localStorage.getItem('ranking'));
    if (!gravatar) {
      localStorage.setItem(
        'ranking', JSON.stringify(
          {
            name: '',
            score: 0,
            picture: '',
          },
        ),
      );
      return JSON.parse(localStorage.getItem('ranking'));
    }
    return gravatar;
  };

  const { name, score, picture } = getRankingFromLocalStorage();

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
      <hr />
    </header>
  );
}
