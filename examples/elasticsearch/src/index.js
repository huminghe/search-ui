import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import File from './File';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

ReactDOM.render((
  <Router>
    <Switch>
      <Route path="/file" component={File}/>
      <Route path="/" component={App}/>
    </Switch>
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
