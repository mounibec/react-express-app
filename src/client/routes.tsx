import * as React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import App from "./components/app";
import Home from "./components/home";

export default () => (
  <Router>
    <App>
      <Route exact path="/" component={Home}/>
    </App>
  </Router>
);
