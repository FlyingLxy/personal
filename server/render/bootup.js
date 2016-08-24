/**
 * Created by lxy on 16/8/11.
 */
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import createStore from '../../common/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import jade from 'jade';
//console.log(123);

export default (renderProps, userAgent, store) => {
    if (process.env.NODE_ENV === 'development') {
        webpack_isomorphic_tools.refresh();
    }
    global.navigator = { userAgent: userAgent };
    //const store = createStore();
    const content = renderToString(
          <MuiThemeProvider>
              <Provider store={store}>
                  <RouterContext {...renderProps}/>
              </Provider>
          </MuiThemeProvider>
    );
    return (options) => {
        let html = jade.renderFile(path.resolve(__dirname, '../views/index.jade'), {content, options});
        return html;
    };
}
