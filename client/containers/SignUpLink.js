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
import './sign.scss';
import styles from './signStyle.js';
import { checkemail,checkpw } from '../common/check.js';
import { sessionAction,emailErrAction,emailRegAction,pwErrAction,signupAction } from '../actions/signupAction.js';
import { captchaAction,checkCaptchaAction } from '../actions/captchaAction.js';
import { errorAction } from '../actions/errorAction.js';

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
        if (this.props.user.token) {
            this.context.router.push('/flyingfox');
            return;
        }
        this.props.dispatch(captchaAction());
        //console.log(this);
    }

    //sessionToggle() {
    //    // 更改 保持登录 状态
    //    this.props.dispatch(sessionAction({sessionToggle: !this.props.signup.session}));
    //    console.log(this);
    //}

    componentWillUnmount() {
        this.props.dispatch(checkCaptchaAction(false));
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
            if (this.refs.captchaInput.input.value.toLowerCase() === this.props.captcha.text.toLowerCase()) {
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
        let email = this.refs['email'].input;
        let pw = this.refs['pw'].input;
        let captcha = this.refs['captchaInput'].input;
        this.emailBlurHandle();
        this.pwBlurHandle();
        this.checkCaptcha();
        if (email.value !== '' && pw.value !== '' && captcha.value !== '') {
            this.props.dispatch(signupAction({
                email: email.value.toString(),
                pw: pw.value.toString()
            }));
            this.props.dispatch(captchaAction());
            captcha.value = '';
        } else {
            this.props.dispatch(errorAction({status: true, msg: '请输入格式正确的邮箱 | 密码 |验证码'}))
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
                                hintStyle={styles.fontCyan100}
                                floatingLabelFocusStyle={styles.fontCyan500}
                                floatingLabelStyle={styles.fontCyan100}
                                underlineFocusStyle={styles.borderCyan500}
                                underlineStyle={styles.borderCyan100}
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
                                hintStyle={styles.fontCyan100}
                                floatingLabelFocusStyle={styles.fontCyan500}
                                floatingLabelStyle={styles.fontCyan100}
                                underlineFocusStyle={styles.borderCyan500}
                                underlineStyle={styles.borderCyan100}
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
                                    hintStyle={styles.fontCyan100}
                                    floatingLabelFocusStyle={styles.fontCyan500}
                                    floatingLabelStyle={styles.fontCyan100}
                                    underlineFocusStyle={styles.borderCyan500}
                                    underlineStyle={styles.borderCyan100}
                                    inputStyle={styles.input}
                                    style={{width:'80%'}}
                                    fullWidth={false}
                                    autoComplete='off'
                                    errorText={this.props.captcha.checkCaptcha === 0 ? '验证码错误':''}
                                    onFocus={this.reCaptcha}
                                    onBlur={this.checkCaptcha}
                                    />
                              <RaisedButton className='captcha_img' style={styles.captcha}
                                            onTouchTap={this.updateCaptcha}>
                                  <div style={styles.captchaMask}></div>
                                  <img src={this.props.captcha.img} alt="captcha"
                                       style={styles.captchaImg}/>
                              </RaisedButton>
                          </div>

                      </CardText>
                      <CardActions style={styles.cardAction}>
                          <RaisedButton label='Sign Up' secondary={true} onTouchTap={this.signupHandle}></RaisedButton>
                      </CardActions>
                      <Snackbar
                            open={this.props.error.status}
                            message={this.props.error.msg}
                            autoHideDuration={5000}
                            onRequestClose={(open) => { this.props.error.status ? this.props.dispatch(errorAction({status: false, msg: ''})) : false }}
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
        user: state.user,
        captcha: state.captcha,
        error: state.error
    }
}
const SignUpLink = connect(mapStateToProps)(SignUp);
export default SignUpLink;