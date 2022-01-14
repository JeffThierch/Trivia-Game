import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Play from '../Pages/Play';
import Settings from '../Pages/Settings';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/play" component={ Play } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
