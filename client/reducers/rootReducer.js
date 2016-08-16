/**
 * Created by lxy on 16/8/10.
 */

import { combineReducers } from 'redux';
import index from './indexReducer.js';
import signup from './signupReducer.js';
import signin from './signinReducer.js';
import user from './userReducer.js';
import personal from './personalReducer.js';
import captcha from './captchaReducer.js';
import error from './errorReducer.js';
const rootReducers = combineReducers({
    index,
    signup,
    signin,
    user,
    personal,
    captcha,
    error
});
export default rootReducers
