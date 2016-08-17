/**
 * Created by lxy on 16/8/11.
 */
import { sessionToggle ,errorInfo,emailErr,pwErr,signup } from '../constants/signupConst.js';
import { auth } from '../constants/userConst.js';
import request from '../common/request.js';
import { errorAction } from './errorAction.js';
import { setLocalAction } from './userAction.js';
import history from '../store/history.js';
//session toggle
//export const sessionAction = (toggle) => {
//    return {
//        type: sessionToggle,
//        toggle: toggle.sessionToggle
//    }
//}
// 邮箱错误提示开关
export const emailErrAction = (result = {status: false, text: ''}) => {
    return {
        type: emailErr,
        email: result
    }
}
// 服务端验证邮箱
export const emailRegAction = (email) => {
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
export const pwErrAction = (result = {status: false, text: ''}) => {
    return {
        type: pwErr,
        pw: result
    }
}
// 注册验证
export const signupAction = (userInfo) => {
    return (dispatch, getState) => {
        request.post({path: '/api/account/signup', data: {email: userInfo.email, password: userInfo.pw}})
              .then(json => {
                  if (json.msg === 'ok') {
                      history.push('/flyingfox');
                      dispatch(setLocalAction(json.result));
                  } else {
                      dispatch(errorAction({status: true, msg: json.err}));
                  }
              })
              .catch(err =>  dispatch(errorAction({status: true, msg: err})));
    }
}


