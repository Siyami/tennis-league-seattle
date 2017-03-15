import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './Home';
import App from './App';
import SearchCourts from './SearchCourts';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="/courts" component={SearchCourts} />
  </Route>
);
