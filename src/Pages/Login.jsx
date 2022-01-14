import React, { useState, useEffect } from 'react';
import getQuestions from '../services/getQuestions';

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginNickName, setLoginNickName] = useState('');
  const [isDisabled, setisDisabled] = useState(true);

  useEffect(() => {
    const validForms = () => {
      const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isvalid = regex.test(loginEmail);
      return !(isvalid && (loginNickName.length > 0));
    };
    setisDisabled(validForms());
  }, [loginEmail, loginNickName]);

  async function playButton() {
    const returnedData = await getQuestions();
    console.log(returnedData);
    
    //Adiciona o token ao localStorage
    localStorage.setItem('token', returnedData.token);

    //Adiciona o ranking ao localStorage
    localStorage.setItem(
      'ranking',
      [{
        name: loginNickName,
        score: 0,
        picture: 'as'
      }]
    )
  }

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
            onChange={ ({ target }) => setLoginEmail(target.value) }
            placeholder="Enter your email"
            type="email"
            value={ loginEmail }
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
            data-testid="input-player-name"
            id="playerName"
            value={ loginNickName }
            onChange={ ({ target }) => setLoginNickName(target.value) }
            placeholder="Enter your player name"
            type="text"
          />
        </label>
      </div>
      {/* BTN PLAY */}
      <div>
        <button
          data-testid="btn-play"
          disabled={ isDisabled }
          type="button"
          onClick={ playButton() }
        >
          Play
        </button>
      </div>
    </form>
  );
}
