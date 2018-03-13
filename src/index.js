import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import {
  AUTH_USER
} from './actions/types';
import App from './components/app';
import Welcome from './components/welcome';
import SignIn from './components/auth/signin';
import Signout from './components/auth/signout';
import SignUp from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import Feature from './components/feature';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// if we have token dispatch action that will say, hey you are authenticated, you have token saved in LS
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Welcome} />
        <Route path='/signin' component={SignIn} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={SignUp} />
        <Route path='/feature' component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
