import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Invitation from './components/Invitation';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:nombre" component={Invitation} />
      </Switch>
    </Router>
  );
}

export default App;