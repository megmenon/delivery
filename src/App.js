import React from 'react';
import './App.css';
import Main from './components/Main';
import Restaurant from './components/Restaurant';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Main} />
        <Route path="/restaurant" component={Restaurant} />
      </Router>
    </div>
  );
}

export default App;
