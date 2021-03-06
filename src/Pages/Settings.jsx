import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { settingsDificulty, settingType } from '../helpers/data';
import getCategorys from '../services/getCategorys';
import { saveUserSettings } from '../actions';
import '../styles/Settings.css';

export default function Settings() {
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState('');
  const [dificulty, setDificulty] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state);

  useEffect(() => {
    const fetchCatefory = async () => {
      const { data } = await getCategorys();
      const anyCategory = {
        id: '',
        name: 'Any Category',
      };
      setCategorys([anyCategory, ...data]
        .sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            const n = -1;
            return n;
          }
          return 0;
        }));
    };
    fetchCatefory();
  }, []);

  const saveSettings = () => {
    const userSettings = {
      dificulty,
      category,
      type,
    };
    dispatch(saveUserSettings(userSettings));
    if (token) {
      history.push('/play');
    } else {
      history.push('/');
    }
  };

  return (
    <section
      className="card mb-5 p-3 position-relative
        rounded shadow start-50 top-50 translate-middle setting-main-box"
    >
      <h1 data-testid="settings-title" className="settings-tittle">Settings</h1>
      <form
        className="align-items-center d-flex flex-column
        justify-content-center p-2 form-settings"
      >
        <div
          className="align-items-center d-flex justify-content-center
          mb-3 p-0 category-container"
        >
          <label
            htmlFor="dropdown-category"
            className="d-flex flex-column p-0 w-100 category-label"
          >
            Select Category
            <select
              className="form-select form-select-sm select-category"
              id="dropdown-category"
              value={ category }
              onChange={ ({ target }) => setCategory(target.value) }
            >
              { categorys.map(({ name, id }) => (
                <option key={ id } value={ id }>
                  { name }
                </option>
              )) }
            </select>
          </label>
        </div>
        <div
          className="align-items-center d-flex justify-content-center
          mb-3 p-0 difficulty-container"
        >
          <label
            htmlFor="dropdown-dificulty"
            className="d-flex flex-column p-0 w-100 difficulty-label"
          >
            Select Difficulty
            <select
              id="dropdown-dificulty"
              className="form-select form-select-sm select-difficulty"
              value={ dificulty }
              onChange={ ({ target }) => setDificulty(target.value) }
            >
              { settingsDificulty.map(({
                name: nameDificulty, id: idDificulty,
              }) => (
                <option key={ idDificulty } value={ idDificulty }>
                  { nameDificulty }
                </option>
              )) }
            </select>
          </label>
        </div>
        <div
          className="align-items-center d-flex justify-content-center
          mb-3 p-0 type-conteiner"
        >
          <label
            htmlFor="dropdown-type"
            className="d-flex flex-column p-0 w-100 type-label"
          >
            Select Type
            <select
              id="dropdown-type"
              className="form-select form-select-sm select-type"
              value={ type }
              onChange={ ({ target }) => setType(target.value) }
            >
              { settingType.map(({ name: nameType, id: idType }) => (
                <option key={ idType } value={ idType }>
                  { nameType }
                </option>
              )) }
            </select>
          </label>
        </div>
        <div>
          <button
            className={ `active btn ${token
              ? 'btn-play' : 'btn-config'}` }
            type="button"
            onClick={ saveSettings }
          >
            { token ? 'Play' : 'Save' }
          </button>
        </div>
      </form>
    </section>
  );
}
