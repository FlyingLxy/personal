/**
 * Created by lxy on 16/8/12.
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


import {checkemail,checkpw} from '../common/check.js';

class SignIn extends Component {
    _method() {
        return []
    }

    constructor(props) {
        super(props);
        this._method = this._method.bind(this);
        this._method().forEach(item => {
            this[item] = this[item].bind(this);
        })
    }


    render() {
        return (
              <div className='signip' >
              </div>
        )
    }
}
SignIn.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
const mapStateToProps = state => {
    return {
        signin: state.signin,
        user: state.user
    }
}
const SignInLink = connect(mapStateToProps)(SignIn);
export default SignInLink;