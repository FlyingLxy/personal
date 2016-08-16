/**
 * Created by lxy on 16/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
const styles = {
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-22px',
        marginLeft: '-60px',
        fontSize: 30,
        color: '#ffffff',
    }
}
class Blackhouse extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
              <span style={styles.wrapper}>
                     建设中...!
              </span>
        )
    }
}

const BlackhouseLink = connect()(Blackhouse);

export default BlackhouseLink;
