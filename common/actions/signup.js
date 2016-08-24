/**
 * Created by lxy on 16/8/11.
 */
import { signup,user } from '../constants';
import { errorAction } from './error.js';
import { setLocalAction } from './user.js';
import request from '../middleware/request.js';
import { router } from './router.js';

// 邮箱错误提示开关
const emailErrAction = (result = {status: false, text: ''}) => {
    return {
        type: signup.emailErr,
        email: result
    }
}
// 服务端验证邮箱
const emailRegAction = (email) => {
    return (dispatch, getState) => {
        request.get({path: '/api/account/email', data: {email: email}})
              .then(json => {
                  if (json.msg === 'ok') {
                      dispatch(emailErrAction({status: 1}))
                  } else {
                      dispatch(emailErrAction({status: 0, text: json.msg}));
                  }
              })
              .catch(err => console.log(err))
    }
}
// 密码错误提示开关
const pwErrAction = (result = {status: false, text: ''}) => {
    return {
        type: signup.pwErr,
        pw: result
    }
}
// 注册验证
const signupAction = (userInfo) => {
    return (dispatch, getState) => {
        request.post({path: '/api/account/signup', data: {email: userInfo.email, password: userInfo.pw}})
              .then(json => {
                  if (json.msg === 'ok') {
                      dispatch(setLocalAction(json.result));
                      dispatch(router.push('/flyingfox'));
                  } else {
                      dispatch(errorAction({status: true, msg: json.err}));
                  }
              })
              .catch(err =>  dispatch(errorAction({status: true, msg: err})));
    }
}

export default {
    emailErrAction,
    emailRegAction,
    pwErrAction,
    signupAction
}


