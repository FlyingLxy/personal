/**
 * Created by lxy on 16/8/10.
 */
import { connect } from 'react-redux';
import React,{Component} from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew.js';
import { drawerAction } from '../actions/indexAction.js';
import {deepOrange600,deepOrange300} from 'material-ui/styles/colors';
import './index.scss';

import { signoutAction } from '../actions/userAction.js';
const styles = {
    menuIcon: {
        width: 30,
        height: 30,
    },
    menu: {
        width: 40,
        height: 50,
        marginRight: 10,
        padding: '10px 5px',
        verticalAlign: 'middle',
        textAlign: 'center'
    },
    gitIcon: {
        width: 30,
        height: 30,
        marginTop: 2
    },
    git: {
        width: 40,
        height: 50,
        padding: '10px 5px',
        verticalAlign: 'middle',
        textAlign: 'center'
    },
    btnColor: '#ffffff'
}
class Index extends Component {
    _method() {
        return ['drawerClose', 'requestChange', 'drawerOpen']
    }

    constructor(props) {
        super(props);
        this._method.bind(this);
        this._method().forEach(item => {
            this[item] = this[item].bind(this);
        })
        //console.log(this);
    }

    drawerOpen(e) {
        this.props.dispatch(drawerAction(true));
    }

    drawerClose(path) {
        this.props.dispatch(drawerAction(false));
        if (path === '/flyingfox/signout') {
            this.props.dispatch(signoutAction());
            this.context.router.push('/flyingfox/signin');
        } else {
            this.context.router.push(path);
        }

    }

    requestChange(open) {
        this.props.dispatch(drawerAction(open));
    }

    render() {
        return (
              <div className='wrapper'>
                  <div className='user_email'>{this.props.user.email || ''}</div>
                  <div className='menu_btn'>
                      <IconButton iconStyle={styles.gitIcon} style={styles.git} href='https://github.com/FlyingLxy/personal' target='_blank'>
                          <FontIcon className='iconfont' hoverColor={styles.btnColor} color={styles.btnColor}>
                              &#xe735;
                          </FontIcon>
                      </IconButton>
                      <IconButton iconStyle={styles.menuIcon} style={styles.menu}
                                  onTouchTap={this.drawerOpen}>
                          <NavigationMenu hoverColor={styles.btnColor} color={styles.btnColor}/>
                      </IconButton>
                  </div>
                  <Drawer containerClassName='drawer' docked={false} width={260} openSecondary={true}
                          open={this.props.index.drawer}
                          onRequestChange={this.requestChange}>
                      <AppBar
                            iconElementLeft={<IconButton onClick={this.drawerClose}><NavigationClose /></IconButton>}
                            zDepth={0}
                            />
                      {
                          this.props.index.tab.map((item, index) => {
                              if (this.props.user.token) {
                                  if (item.name !== '注册' && item.name !== '登录') {
                                      return (
                                            <MenuItem className='drawer_item' key={index}
                                                      onTouchTap={this.drawerClose.bind(this,item.path)}>
                                                {item.name}
                                            </MenuItem>
                                      )
                                  }
                              } else {
                                  if (item.name !== '退出登录') {
                                      return (
                                            <MenuItem className='drawer_item' key={index}
                                                      onTouchTap={this.drawerClose.bind(this,item.path)}>
                                                {item.name}
                                            </MenuItem>
                                      )
                                  }
                              }

                          })
                      }
                  </Drawer>
                  {this.props.children}
              </div>
        )
    }
}
Index.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        index: state.index,
        user: state.user
    };
};
const IndexLink = connect(mapStateToProps)(Index);
export default IndexLink;