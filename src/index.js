import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import { Router, browserHistory } from 'react-router';
import Routes from './components/Routes';
import './index.css';


ReactDOM.render(
  <Router history={browserHistory} routes={Routes} />,
  document.getElementById('root')
);
