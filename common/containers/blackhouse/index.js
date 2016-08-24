/**
 * Created by lxy on 16/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { user,error,router } from '../../actions';
import styles from './style.js';
class _Blackhouse extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.user.token) {
            this.props.dispatch(user.authAction());
        }else {
            this.props.dispatch(router.push('/flyingfox/signin'));
            this.props.dispatch(error.errorAction({status: true, msg: '您还未登录, 小黑屋需要登录后访问!'}))
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
_Blackhouse.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const Blackhouse = connect(mapStateToProps)(_Blackhouse);

export default Blackhouse;
