import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

import 'semantic-ui-css/semantic.min.css';

import "./stylesheets/style.scss";

import reducers from './reducers/index';
import Routes from './routes';

declare let process: any;
declare let document: any;

const configureStore = () => {
  let middleWares: any[] = [];

  middleWares.push(thunk);

  if (process.env.NODE_ENV !== 'production') {
    middleWares.push(createLogger());
  }

  return createStore(
    reducers,
    applyMiddleware(...middleWares)
  );
};

const Root = () => (
  <Provider store={configureStore()}>
    <Routes/>
  </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
