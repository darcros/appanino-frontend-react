import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'typeface-roboto';
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
      </div>
    </Router>
  );
};

export default App;
