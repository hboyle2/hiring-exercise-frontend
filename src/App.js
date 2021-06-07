import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login'
import Home from './pages/Home'
import User from './pages/User'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Login} path="/login" />
        <Route component={User} path='/:id' />
      </Switch>

    </div>
  );
}

export default App;
