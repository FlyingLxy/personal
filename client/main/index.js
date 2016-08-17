/**
 * Created by lxy on 16/8/10.
 */

import createStoreWithMiddleware from '../store/configureStore.js';
import rootReducers from '../reducers/rootReducer.js';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM,{render} from 'react-dom';
import { Router,Route,IndexRoute } from 'react-router';
import history from '../store/history.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import IndexLink from '../containers/IndexLink.js';
import Home from '../components/Home.js';
import SignUpLink from '../containers/SignUpLink.js';
import SignInLink from '../containers/SignInLink.js';
import PersonalLink from '../containers/PersonalLink.js';
import BlackhouseLink from '../containers/BlackhouseLink.js';
const store = createStoreWithMiddleware(rootReducers);

render(
      <MuiThemeProvider>
          <Provider store={store}>
              <Router history={history}>
                  <Route path='/flyingfox' component={IndexLink}>
                      <IndexRoute component={Home}/>
                      <Route path='personal' component={PersonalLink}></Route>
                      <Route path='blackhouse' component={BlackhouseLink}></Route>
                      <Route path='signup' component={SignUpLink}></Route>
                      <Route path='signin' component={SignInLink}></Route>
                  </Route>
              </Router>
          </Provider>
      </MuiThemeProvider>,
      document.getElementById('app')
)