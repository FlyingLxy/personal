/**
 * Created by lxy on 16/8/10.
 */

import { combineReducers } from 'redux';
import wrapper from './wrapper.js';
import signup from './signup.js';
import signin from './signin.js';
import user from './user.js';
import personal from './personal.js';
import captcha from './captcha.js';
import error from './error.js';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
    wrapper,
    signup,
    signin,
    user,
    personal,
    captcha,
    error,
    routing
});
