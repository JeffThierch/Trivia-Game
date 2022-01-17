import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Ranking() {
  const history = useHistory();

  const homepageButton = () => {
    history.push('/');
  };

  return (
    <>
      <h1 data-testid="ranking-title">Ranking</h1>
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
