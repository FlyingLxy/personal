/**
 * Created by lxy on 16/8/16.
 */
import { sessionToggle, emailErr, pwErr } from '../constants/signinConst.js';
import { setSessionAction,setLocalAction } from './userAction.js';
import { errorAction } from './errorAction.js';
import request from '../common/request.js';
export const sessionAction = session => {
    return {
        type: sessionToggle,
        session
    }
}
// 邮箱错误提示开关
export const emailErrAction = (result = {status: false, text: ''}) => {
    return {
        type: emailErr,
        email: result
    }
}

// 密码错误提示开关
export const pwErrAction = (result = {status: false, text: ''}) => {
    return {
        type: pwErr,
        pw: result
    }
}


// 登录
export const signinAction = info => {
    return (dispatch, getState) => {
        // 请求
        request.post({path: '/api/account/signin', data: {email: info.email, password: info.pw, session: info.session}})
        .then(json => {
                  if (json.msg === 'ok') {
                      if (info.session) {
                          // 自动登录
                          dispatch(setLocalAction(json.result));
                      }else {
                          // 临时登录
                          dispatch(setSessionAction(json.result));
                      }
                  }else if (json.msg === '1') {
                      // 密码错误
                      dispatch(pwErrAction({status: 0,text: json.result}))
                  }else if (json.msg === '0') {
                      // 邮箱错误
                      dispatch(emailErrAction({status: 0,text: json.result}));
                  }
              })
              .catch(err => {
                  dispatch(errorAction({status: true, text: '请检查网络连接'}));
                  console.log(err);
              })
    }
}