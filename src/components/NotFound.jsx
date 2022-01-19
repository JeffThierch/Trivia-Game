import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();
  const redirect = () => {
    history.push('/settings');
  };

  return (
    <section>
      <div>
        <h1>No Results Found!!</h1>
      </div>
      <div>
        <button
          className="active btn btn-lg px-4 py-1 btnConfig"
          data-testid="btn-settings"
          type="button"
          onClick={ redirect }
        >
          Settings
        </button>
      </div>
    </section>);
}
