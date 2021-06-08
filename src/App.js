import './App.css';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login'
import Home from './pages/Home'
import User from './pages/User'
import ResetPassword from './pages/ResetPassword'
import { AppBar, Button, Toolbar } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <AppBar color='secondary' position='static'>
        <Toolbar>
          <Link to='/reset-password' style={{ textDecoration: 'none' }}>
            <Button color='textSecondary' >
              Reset Password
              </Button>
          </Link>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button color="textSecondary">
              Home
              </Button>
          </Link>

        </Toolbar>
      </AppBar>
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
