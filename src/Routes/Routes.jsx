import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
