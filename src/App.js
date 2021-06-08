import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login'
import Home from './pages/Home'
import User from './pages/User'
import ResetPassword from './pages/ResetPassword'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Login} path="/login" />
        <Route component={ResetPassword} path='/reset-password' />
        <Route component={User} path='/:id' />

      </Switch>

    </div>
  );
}

export default App;
