/**
 * Created by lxy on 16/8/12.
 */
import style from './style.css';
import mui from './mui.js';
import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card,CardHeader,CardTitle,CardText,CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { checkemail,checkpw } from '../../middleware/check.js';
import { signin,user,captcha,error,router } from '../../actions';


class _SignIn extends Component {
    _method() {
        return ['updateCaptcha', 'emailBlurHandle', 'pwBlurHandle', 'checkCaptcha', 'signupHandle', 'signinHandle', 'dialogClose']
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
            this.props.dispatch(router.push('/flyingfox'));
            return;
        }
        this.props.dispatch(signin.sessionAction(false));
    }

    componentDidMount() {
        this.props.dispatch(captcha.captchaAction());
    }

    componentWillUnmount() {
        this.props.dispatch(captcha.checkCaptchaAction(false));
    }

    emailBlurHandle() {
        let email = this.refs.email.input.value;
        if (email) {
            if (checkemail(email)) {
                this.props.dispatch(signin.emailErrAction({status: 1}))
            } else {
                this.props.dispatch(signin.emailErrAction({status: 0, text: '邮箱格式错误'}))
            }
        } else {
            this.props.dispatch(signin.emailErrAction({status: false}))
        }
    }

    pwBlurHandle() {
        let pw = this.refs['pw'].input.value;
        if (pw) {
            if (checkpw(pw)) {
                this.props.dispatch(signin.pwErrAction({status: 1}));
            } else {
                this.props.dispatch(signin.pwErrAction({status: 0, text: '密码不能小于8位或大于20位'}));
            }
        } else {
            this.props.dispatch(signin.pwErrAction({status: false}));
        }
    }

    updateCaptcha() {
        // 更新验证码 并重置 验证码 input
        this.props.dispatch(captcha.captchaAction());
        this.refs.captchaInput.input.value = '';
        this.props.dispatch(captcha.checkCaptchaAction(false));

    }

    checkCaptcha() {
        // 检查验证码输入是否正确
        if (this.refs['captchaInput'].input.value !== '') {
            if (this.refs['captchaInput'].input.value.toLowerCase() === this.props.captcha.text.toLowerCase()) {
                this.props.dispatch(captcha.checkCaptchaAction(1));
            } else {
                this.props.dispatch(captcha.checkCaptchaAction(0));
            }
        }
    }

    signinHandle() {
        let email = this.refs['email'].input;
        let pw = this.refs['pw'].input;
        let captchaInput = this.refs['captchaInput'].input;
        if (checkemail(email.value) && checkpw(pw.value) && captchaInput.value.toLowerCase() === this.props.captcha.text.toLowerCase()) {
            this.props.dispatch(signin.signinAction({
                email: email.value.toString(),
                pw: pw.value.toString()
            }));
            this.props.dispatch(captcha.captchaAction());
            captchaInput.value = '';
        } else {
            this.props.dispatch(error.errorAction({status: true, msg: '请输入格式正确的邮箱 | 密码 |验证码'}))
        }
    }

    dialogClose() {
        this.props.dispatch(user.userErrAction(''));
    }

    signupHandle() {
        this.props.dispatch(router.push('/flyingfox/signup'));
    }

    render() {
        const actions = [
            <FlatButton
                  label="OK"
                  primary={true}
                  onTouchTap={this.dialogClose}
                  />
        ]
        return (
              <div className={style.signin_card}>
                  <Card>
                      <CardHeader
                            title='Sign In'
                            titleStyle={mui.cardHeaderTitle}
                            subtitle='Welcome to flyingfox'
                            subtitleStyle={mui.subTitle}
                            style={mui.cardHeader}
                            />
                      <CardText style={mui.cardText}>
                          <TextField
                                ref='email'
                                hintText='注意区分大小写'
                                floatingLabelText='请输入您的邮箱'
                                hintStyle={mui.fontCyan100}
                                floatingLabelFocusStyle={mui.fontCyan500}
                                floatingLabelStyle={mui.fontCyan100}
                                underlineFocusStyle={mui.borderCyan500}
                                underlineStyle={mui.borderCyan100}
                                inputStyle={mui.input}
                                fullWidth={true}
                                autoComplete='off'
                                errorText={this.props.signin.email.status === 0 ? this.props.signin.email.text:''}
                                onFocus={() => this.props.dispatch(signin.emailErrAction({status: false}))}
                                onBlur={this.emailBlurHandle}
                                />
                          <TextField
                                ref='pw'
                                hintText='8 - 20位'
                                floatingLabelText='请输入您的密码'
                                hintStyle={mui.fontCyan100}
                                floatingLabelFocusStyle={mui.fontCyan500}
                                floatingLabelStyle={mui.fontCyan100}
                                underlineFocusStyle={mui.borderCyan500}
                                underlineStyle={mui.borderCyan100}
                                inputStyle={mui.input}
                                fullWidth={true}
                                type='password'
                                errorText={this.props.signin.pw.status === 0 ? this.props.signin.pw.text:''}
                                onFocus={() => this.props.dispatch(signin.pwErrAction({status: false}))}
                                onBlur={this.pwBlurHandle}
                                />

                          <div className={style.captcha}>
                              <TextField
                                    ref='captchaInput'
                                    className={style.captcha_input}
                                    hintText='点击图片更换验证码'
                                    floatingLabelText='验证码'
                                    hintStyle={mui.fontCyan100}
                                    floatingLabelFocusStyle={mui.fontCyan500}
                                    floatingLabelStyle={mui.fontCyan100}
                                    underlineFocusStyle={mui.borderCyan500}
                                    underlineStyle={mui.borderCyan100}
                                    inputStyle={mui.input}
                                    style={{width:'80%'}}
                                    fullWidth={false}
                                    autoComplete='off'
                                    errorText={this.props.captcha.checkCaptcha === 0 ? '验证码错误':''}
                                    onFocus={() => this.props.dispatch(captcha.checkCaptchaAction(false))}
                                    onBlur={this.checkCaptcha}
                                    />
                              <RaisedButton className={style.captcha_img} style={mui.captcha}
                                            onTouchTap={this.updateCaptcha}>
                                  <div style={mui.captchaMask}></div>
                                  <img src={this.props.captcha.img} alt="captcha"
                                       style={mui.captchaImg}/>
                              </RaisedButton>
                          </div>
                          <Toggle
                                label='自动登录'
                                labelStyle={this.props.signin.session ? mui.toggleLableTrue : mui.toggleLabelFalse}
                                style={mui.toggle}
                                defaultToggled={this.props.signin.session}
                                onToggle={() => this.props.dispatch(signin.sessionAction(!this.props.signin.session))}
                                />
                      </CardText>
                      <CardActions style={mui.cardAction}>
                          <RaisedButton label='Sign In' primary={true} onTouchTap={this.signinHandle}></RaisedButton>
                          <RaisedButton label='Sign Up' secondary={true} onTouchTap={this.signupHandle}
                                        style={mui.btn}></RaisedButton>
                      </CardActions>
                      <Snackbar
                            open={this.props.error.status}
                            message={this.props.error.msg}
                            autoHideDuration={3000}
                            onRequestClose={(open) => {
                                        this.props.error.status ? this.props.dispatch(error.errorAction({status: false, msg: ''})) : false
                                    }}
                            />
                      <Dialog
                            actions={actions}
                            modal={false}
                            open={this.props.user.err != ''}
                            >
                          {this.props.user.err}
                      </Dialog>
                  </Card>
              </div>
        )
    }
}
_SignIn.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
const mapStateToProps = state => {
    return {
        signin: state.signin,
        user: state.user,
        captcha: state.captcha,
        error: state.error
    }
}
const SignIn = connect(mapStateToProps)(_SignIn);
export default SignIn;