/**
 * Created by lxy on 16/8/16.
 */
import { signin } from '../constants';
import { setLocalAction } from './user.js';
import { errorAction } from './error.js';
import request from '../middleware/request.js';
import { router } from './router.js';
//import history from '../routes/history.js';
const sessionAction = session => {
    return {
        type: signin.sessionToggle,
        session
    }
}

// 邮箱错误提示开关
const emailErrAction = (result = {status: false, text: ''}) => {
    return {
        type: signin.emailErr,
        email: result
    }
}

// 密码错误提示开关
const pwErrAction = (result = {status: false, text: ''}) => {
    return {
        type: signin.pwErr,
        pw: result
    }
}


// 登录
const signinAction = info => {
    return (dispatch, getState) => {
        // 请求
        request.post({path: '/api/account/signin', data: {email: info.email, password: info.pw, session: getState().signin.session}})
              .then(json => {
                  if (json.msg === 'ok') {
                      dispatch(setLocalAction(json.result));
                      dispatch(router.push('/flyingfox'));
                  } else if (json.msg === '1') {
                      // 密码错误
                      dispatch(pwErrAction({status: 0, text: json.result}));
                  } else if (json.msg === '0') {
                      // 邮箱错误
                      dispatch(emailErrAction({status: 0, text: json.result}));
                  }
              })
              .catch(err => {
                  dispatch(errorAction({status: true, text: '请检查网络连接'}));
                  console.log(err);
              })

    }
}

export default {
    sessionAction,
    emailErrAction,
    pwErrAction,
    signinAction
}