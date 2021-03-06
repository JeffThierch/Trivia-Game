import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveTokenInStore, savePlayerInfo } from '../actions';
import getToken from '../services/getToken';
import generateHash from '../services/generateHash';
import Logo from '../img/trivia.png';
import '../styles/Login.css';

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

    const hashGravatar = generateHash(loginEmail);

    // Envia o token para a store
    dispatch(saveTokenInStore(token));

    // Adiciona o token ao localStorage
    localStorage.setItem('token', token);

    // Adiciona o ranking ao localStorage
    const newUserObj = {
      name: loginNickName,
      score: 0,
      picture: `https://www.gravatar.com/avatar/${hashGravatar}`,
    };

    if (JSON.parse(localStorage.getItem('ranking'))) {
      const storage = JSON.parse(localStorage.getItem('ranking'));

      newUserObj.id = (storage[storage.length - 1].id + 1);

      localStorage.setItem('ranking', JSON.stringify([...storage, newUserObj]));
    } else {
      newUserObj.id = 0;

      localStorage.setItem(
        'ranking', JSON.stringify(
          [newUserObj],
        ),
      );
    }

    newUserObj.email = loginEmail;

    dispatch(savePlayerInfo(newUserObj));

    history.push('/play');
  };

  const settingsButton = () => {
    history.push('/settings');
  };

  return (
    <div
      className="card mb-5 p-3 position-relative rounded shadow
      start-50 top-50 translate-middle login-main-box"
    >
      <div
        className="align-items-center d-flex justify-content-center mx-auto "
      >
        <img
          src={ Logo }
          className="image-trivia"
          alt="trivia-logo"
        />
      </div>
      <form
        className="align-items-center d-flex flex-column justify-content-center
        p-2"
      >
        {/* INPUT EMAIL */}
        <div
          className="align-items-center d-flex justify-content-center mb-3
          p-0 w-75"
        >
          <label
            className="d-flex flex-column align-items-center p-0
            justify-content-center label-email-address"
            htmlFor="inputEmaill"
          >
            Email address
            <input
              className="form-control p-1 input-email-address"
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
        <div
          className="align-items-center d-flex align-items-center
          justify-content-center mb-3 p-0 w-100"
        >
          <label
            className="d-flex flex-column align-items-center p-0
            justify-content-center label-nickname"
            htmlFor="playerName"
          >
            NickName
            <input
              className="form-control p-1 input-nickname"
              data-testid="input-player-name"
              id="playerName"
              onChange={ ({ target }) => setLoginNickName(target.value) }
              placeholder="Enter your player name"
              type="text"
              value={ loginNickName }
            />
          </label>
        </div>
        {/* BTN PLAY */}
        <div
          className="mb-2 bg-light rounded-3"
        >
          <button
            className="btn border-3 btn-play"
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
            className="active btn btn-config"
            data-testid="btn-settings"
            type="button"
            onClick={ settingsButton }
          >
            Settings
          </button>
        </div>
      </form>
    </div>
  );
}
