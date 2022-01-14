import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getQuestions from '../services/getQuestions';
import generateHash from '../services/generateHash';

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginNickName, setLoginNickName] = useState('');
  const [isDisabled, setisDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const validForms = () => {
      const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isvalid = regex.test(loginEmail);
      return !(isvalid && (loginNickName.length > 0));
    };
    setisDisabled(validForms());
  }, [loginEmail, loginNickName]);

  async function handleClick() {
    const returnedData = await getQuestions();
    const gravatar = generateHash();
    console.log(returnedData);
    console.log(gravatar);

    // Adiciona o token ao localStorage
    localStorage.setItem('token', returnedData.token);

    // Adiciona o ranking ao localStorage
    localStorage.setItem(
      'ranking', JSON.stringify(
        {
          name: loginNickName,
          score: 0,
          picture: gravatar,
        },
      ),
    );
    console.log(localStorage.getItem('ranking'));

    history.push('/jefferson');
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
          onClick={ handleClick }
        >
          Play
        </button>
      </div>
    </form>
  );
}
