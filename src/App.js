import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScoreBoard from './ScoreBoard';

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <ScoreBoard />
  </div>
);

export default App;
