/**
 * Created by lxy on 16/8/10.
 */
import '../common/styles/global.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM,{ render as _render,unmountComponentAtNode } from 'react-dom';
import createStore from '../common/store';
import { Router, Route, browserHistory } from 'react-router';
//import _history from '../common/src/history.js';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider.js';

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const elem = document.getElementById('app');
let render = () => {
    unmountComponentAtNode(elem);
    _render(
          <MuiThemeProvider>
              <Provider store={store}>
                  {require('../common/routes')(history)}
              </Provider>
          </MuiThemeProvider>,
          elem
    )
};

if (module.hot) {
    const renderNormally = render;
    const renderException = error => {
        const RedBox = require('redbox-react').default;
        _render(<RedBox error={error}></RedBox>, elem)
    };

    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    }

    module.hot.accept('../common/routes', () => {
        render();
    });
}

render();



