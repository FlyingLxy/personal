/**
 * Created by lxy on 16/8/10.
 */
import { applyMiddleware, compose, createStore as _createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default (history,initialState = {}) => {
    //const createStore = applyMiddleware(thunk)(_createStore);
    //const store = createStore(reducers);
    const store = _createStore(
          reducers,
          compose(
                applyMiddleware(routerMiddleware(history),thunk)
          )
    )
    module.hot && module.hot.accept('../reducers', () => {
        store.replaceReducer(require('../reducers'));
    });
    return store;
}