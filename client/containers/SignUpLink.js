/**
 * Created by lxy on 16/8/11.
 */
import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card,CardHeader,CardTitle,CardText,CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import { cyan50,cyan100,cyan200,cyan300,cyan500,cyan700 } from 'material-ui/styles/colors';
import './signup.scss';

import {checkemail,checkpw} from '../common/check.js';
import { captchaAction,sessionAction,checkCaptchaAction,emailErrAction,emailRegAction,pwErrAction,signupAction } from '../actions/signupAction.js';
const styles = {
    cardHeaderTitle: {
        color: cyan500,
        fontSize: 24,
        paddingBottom: 6
    },
    subTitle: {
        color: cyan100
    },
    cardHeader: {
        paddingLeft: 26,
        paddingRight: 26,
        paddingTop: 20,
        paddingBottom: 20
    },
    cardText: {
        paddingLeft: 26,
        paddingRight: 26,
        paddingTop: 0
    },
    cardAction: {
        marginTop: 10,
        paddingLeft: 26,
        paddingRight: 26,
        paddingBottom: 20
    },
    toggleTable: {
        color: cyan500,
    },
    toggle: {
        marginTop: 20
    },
    input: {
        color: cyan500,
        fontWeight: 900,
        outline: 'none',
        WebkitBoxShadow: '0 0 0px 1000px white inset'
    },
    captcha: {
        position: 'relative',
        marginTop: 22,
        marginLeft: '2%',
        width: '18%',
        height: 40,
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'top'
    },
    cpatchaMask: {
        width: '100%',
        height: '100%',
        background: 'rgba(0,188,211,.4)',
        position: 'absolute'
    }
}
class SignUp extends Component {
    _method() {
        return ['updateCaptcha', 'checkCaptcha', 'reCaptcha', 'emailBlurHandle', 'pwBlurHandle', 'signupHandle']
    }

    constructor(props) {
        super(props);
        this._method = this._method.bind(this);
        this._method().forEach(item => {
            this[item] = this[item].bind(this);
        })
    }

    componentWillMount() {
        this.props.dispatch(captchaAction());
        console.log(this);
    }

    //sessionToggle() {
    //    // 更改 保持登录 状态
    //    this.props.dispatch(sessionAction({sessionToggle: !this.props.signup.session}));
    //    console.log(this);
    //}
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.user.token !== this.props.user.token) {
            this.context.router.push({},'/');
            return false;
        }
        return true;
    }
    updateCaptcha() {
        // 更新验证码 并重置 验证码 input
        this.props.dispatch(captchaAction());
        this.refs.captchaInput.input.value = '';
        this.props.dispatch(checkCaptchaAction(false));

    }

    checkCaptcha() {
        // 检查验证码输入是否正确
        if (this.refs.captchaInput.input.value !== '') {
            if (this.refs.captchaInput.input.value.toLowerCase() === this.props.signup.captcha.text.toLowerCase()) {
                this.props.dispatch(checkCaptchaAction(1));
            } else {
                this.props.dispatch(checkCaptchaAction(0));
            }
        }
    }

    reCaptcha() {
        this.props.dispatch(checkCaptchaAction(false));
    }

    emailBlurHandle() {
        let email = this.refs.email.input.value;
        if (email) {
            if (checkemail(email)) {
                this.props.dispatch(emailRegAction(email));
            } else {
                this.props.dispatch(emailErrAction({status: 0, text: '邮箱格式错误'}));
            }
        } else {
            this.props.dispatch(emailErrAction({status: false}));
        }
    }

    pwBlurHandle() {
        let pw = this.refs.pw.input.value;
        if (pw) {
            if (checkpw(pw)) {
                this.props.dispatch(pwErrAction({status: 1}));
            } else {
                this.props.dispatch(pwErrAction({status: 0, text: '密码格式错误'}));
            }
        } else {
            this.props.dispatch(pwErrAction({status: false}));
        }
    }

    signupHandle() {
        console.log(this.props.signup);
        let signupInfo = this.props.signup;
        if (signupInfo.checkCaptcha === 1 && signupInfo.email.status === 1 && signupInfo.pw.status === 1) {
            this.props.dispatch(signupAction({
                email: this.refs.email.input.value,
                pw: this.refs.pw.input.value
            }));
        }
    }

    render() {
        return (
              <div className='signup_card'>
                  <Card>
                      <CardHeader
                            title='Sign Up'
                            titleStyle={styles.cardHeaderTitle}
                            subtitle='Welcome to flyingfox'
                            subtitleStyle={styles.subTitle}
                            style={styles.cardHeader}
                            />
                      <CardText style={styles.cardText}>
                          <TextField
                                ref='email'
                                hintText='注意区分大小写'
                                floatingLabelText='请输入您的邮箱'
                                hintStyle={{color:cyan100}}
                                floatingLabelFocusStyle={{color:cyan500}}
                                floatingLabelStyle={{color:cyan100}}
                                underlineFocusStyle={{borderColor:cyan500}}
                                underlineStyle={{borderColor:cyan100}}
                                inputStyle={styles.input}
                                fullWidth={true}
                                autoComplete='off'
                                errorText={this.props.signup.email.status === 0 ? this.props.signup.email.text:''}
                                onBlur={this.emailBlurHandle}
                                onFocus={() => this.props.dispatch(emailErrAction({status:false}))}
                                />
                          <TextField
                                ref='pw'
                                hintText='8 - 20位'
                                floatingLabelText='请输入您的密码'
                                hintStyle={{color:cyan100}}
                                floatingLabelFocusStyle={{color:cyan500}}
                                floatingLabelStyle={{color:cyan100}}
                                underlineFocusStyle={{borderColor:cyan500}}
                                underlineStyle={{borderColor:cyan100}}
                                inputStyle={styles.input}
                                fullWidth={true}
                                type='password'
                                errorText={this.props.signup.pw.status === 0 ? this.props.signup.pw.text:''}
                                onFocus={() => this.props.dispatch(pwErrAction({status: false}))}
                                onBlur={this.pwBlurHandle}
                                />

                          <div className='captcha'>
                              <TextField
                                    ref='captchaInput'
                                    className='captcha_input'
                                    hintText='点击图片更换验证码'
                                    floatingLabelText='验证码'
                                    hintStyle={{color:cyan100}}
                                    floatingLabelFocusStyle={{color:cyan500}}
                                    floatingLabelStyle={{color:cyan100}}
                                    underlineFocusStyle={{borderColor:cyan500}}
                                    underlineStyle={{borderColor:cyan100}}
                                    inputStyle={styles.input}
                                    style={{width:'80%'}}
                                    fullWidth={false}
                                    autoComplete='off'
                                    errorText={this.props.signup.checkCaptcha === 0 ? '验证码错误':''}
                                    onFocus={this.reCaptcha}
                                    onBlur={this.checkCaptcha}
                                    />
                              <RaisedButton className='captcha_img' style={styles.captcha}
                                            onTouchTap={this.updateCaptcha}>
                                  <div style={styles.cpatchaMask}></div>
                                  <img src={this.props.signup.captcha.img} alt="captcha"
                                       style={{width:'100%',height:'100%'}}/>
                              </RaisedButton>
                          </div>

                      </CardText>
                      <CardActions style={styles.cardAction}>
                          <RaisedButton label='Sign Up' secondary={true} onTouchTap={this.signupHandle}></RaisedButton>
                      </CardActions>
                      <Snackbar
                            open={this.props.signup.error.status}
                            message={this.props.signup.error.msg}
                            autoHideDuration={5000}
                            />
                  </Card>
              </div>
        )
    }
}
SignUp.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired,
}
const mapStateToProps = state => {
    return {
        signup: state.signup,
        user: state.user
    }
}
const SignUpLink = connect(mapStateToProps)(SignUp);
export default SignUpLink;