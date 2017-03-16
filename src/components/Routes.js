import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './Home';
import App from './App';
import SearchCourts from './SearchCourts';
import SubmitScore from './SubmitScore';
import Login from './Login';
import SignUp from './SignUp';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="/courts" component={SearchCourts} />
    <Route path="/score" component={SubmitScore} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
  </Route>
);
