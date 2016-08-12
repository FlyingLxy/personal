/**
 * Created by lxy on 16/8/12.
 */
const initialState = {
    session: false,
    email: {
        status: false,
        text: ''
    },
    pw: {
        status: false,
        text: ''
    },
    checkCaptcha: false,
    captcha: {},
    error: {
        status: false,
        msg: ''
    },
}
const signin = (state = initialState, action = undefined) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default signin;