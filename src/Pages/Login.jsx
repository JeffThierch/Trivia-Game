import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveTokenInStore } from '../actions';
import getToken from '../services/getToken';
import generateHash from '../services/generateHash';

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginNickName, setLoginNickName] = useState('');
  const [isDisabled, setisDisabled] = useState(true);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const validForms = () => {
      const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isvalid = regex.test(loginEmail);
      return !(isvalid && (loginNickName.length > 0));
    };

    setisDisabled(validForms());
  }, [loginEmail, loginNickName]);

  const playButton = async () => {
    const USER_TOKEN = await getToken();
    const { data: { token } } = USER_TOKEN;

    const hashGravatar = generateHash();

    // Envia o token para a store
    dispatch(saveTokenInStore(token));

    // Adiciona o token ao localStorage
    localStorage.setItem('token', token);

    // Adiciona o ranking ao localStorage
    localStorage.setItem(
      'ranking', JSON.stringify(
        {
          name: loginNickName,
          score: 0,
          picture: `https://br.gravatar.com/site/implement/${hashGravatar}/`,
        },
      ),
    );

    // Redireciona a página
    history.push('/play');
  };

  const settingsButton = () => {
    history.push('/settings');
  };

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
      {/* INPUT NickName */}
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
          onClick={ playButton }
        >
          Play
        </button>
      </div>
      {/* SettingsButton */}
      <div>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ settingsButton }
        >
          Configurações
        </button>
      </div>
    </form>
  );
}
