import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
