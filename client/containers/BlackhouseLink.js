/**
 * Created by lxy on 16/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Blackhouse extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
              <div>
                 建设中...!
              </div>
        )
    }
}

const BlackhouseLink = connect()(Blackhouse);

export default BlackhouseLink;
