/**
 * Created by lxy on 16/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authAction } from '../actions/userAction.js';
import { errorAction } from '../actions/errorAction.js';
import styles from './blackhouseStyles.js';
class Blackhouse extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.user.token) {
            this.props.dispatch(authAction());
        }else {
            this.context.router.push('/flyingfox/signin');
            this.props.dispatch(errorAction({status: true, msg: '您还未登录, 小黑屋需要登录后访问!'}))
        }
    }
    render() {
        return (
              <span style={styles.wrapper}>
                     建设中...!
              </span>
        )
    }
}
Blackhouse.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const BlackhouseLink = connect(mapStateToProps)(Blackhouse);

export default BlackhouseLink;
