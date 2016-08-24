/**
 * Created by lxy on 16/8/10.
 */
import style from './style.css';
import { connect } from 'react-redux';
import React,{Component} from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionGetApp from 'material-ui/svg-icons/action/get-app';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew.js';
import {deepOrange600,deepOrange300} from 'material-ui/styles/colors';
import mui from './mui.js';
import { wrapper,user,router } from '../../actions';

class _Wrapper extends Component {
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

    componentDidMount() {
        this.props.dispatch(user.getLocalAction());
    }

    drawerOpen(e) {
        this.props.dispatch(wrapper.drawerAction(true));
    }

    drawerClose(path) {
        this.props.dispatch(wrapper.drawerAction(false));
        if (path === '/flyingfox/signout') {
            this.props.dispatch(user.signoutAction());
            this.props.dispatch(router.push('/flyingfox/signin'));
        } else {
            this.props.dispatch(router.push(path));
        }

    }

    requestChange(open) {
        this.props.dispatch(wrapper.drawerAction(open));
    }


    render() {
        return (
              <div className={style.wrapper_inner}>
                  <div className={style.user_email}>{this.props.user.email || ''}</div>
                  <div className={style.menu_btn}>
                      <IconButton iconStyle={mui.getAppIcon} style={mui.getApp} href='/api/account/download'>
                          <ActionGetApp hoverColor={mui.btnColor} color={mui.btnColor}/>
                      </IconButton>
                      <IconButton iconStyle={mui.gitIcon} style={mui.git} href='https://github.com/FlyingLxy/personal'
                                  target='_blank'>
                          <FontIcon className='iconfont' hoverColor={mui.btnColor} color={mui.btnColor}>
                              &#xe735;
                          </FontIcon>
                      </IconButton>
                      <IconButton iconStyle={mui.menuIcon} style={mui.menu}
                                  onTouchTap={this.drawerOpen}>
                          <NavigationMenu hoverColor={mui.btnColor} color={mui.btnColor}/>
                      </IconButton>
                  </div>
                  <Drawer containerClassName={style.drawer} docked={false} width={260} openSecondary={true}
                          open={this.props.wrapper.drawer}
                          onRequestChange={this.requestChange}>
                      <AppBar
                            iconElementLeft={<IconButton onClick={this.drawerClose}><NavigationClose /></IconButton>}
                            zDepth={0}
                            />
                      {
                          this.props.wrapper.tab.map((item, index) => {
                              if (this.props.user.token) {
                                  if (item.name !== '注册' && item.name !== '登录') {
                                      return (
                                            <MenuItem className={style.drawer_item} key={index}
                                                      onTouchTap={this.drawerClose.bind(this,item.path)}>
                                                {item.name}
                                            </MenuItem>
                                      )
                                  }
                              } else {
                                  if (item.name !== '退出登录') {
                                      return (
                                            <MenuItem className={style.drawer_item} key={index}
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
_Wrapper.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        wrapper: state.wrapper,
        user: state.user
    };
};
const Wrapper = connect(mapStateToProps)(_Wrapper);
export default Wrapper;