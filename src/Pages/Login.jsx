import React from 'react';

export default function Login() {
  return (
    <form action="">
      {/* INPUT EMAIL */}
      <div>
        <label
          htmlFor="inputEmaill"
        >
          Email address
          <input
            data-testid="input-gravatar-email"
            id="inputEmaill"
            placeholder="Enter your email"
            type="email"
          />
        </label>
      </div>
      {/* INOPUT NickName */}
      <div>
        <label 
          htmlFor="playerName"
        >
          NickName
          <input
            type="text"
            id="playerName"
            data-testid="input-player-name"
            placeholder="Enter your player name"
          />
        </label>
      </div>
      {/* BTN PLAY */}
      <div>
        <button 
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    </form>
  );
}
