/**
 * Created by lxy on 16/8/11.
 */
import React,{ Component } from 'react';
import './home.scss';
import flying from '../assets/img/flyingfox.png';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //改变图片位置
        let elem = this.refs['home_inner'];
        let height = elem.offsetHeight;
        elem.style.marginTop = -(height/2 - 20) + 'px';
    }
    render() {
        return (
              <div className='home_wrapper'>
                  <div ref='home_inner' className='home_inner'>
                      <div className='home_logo'>
                          <img src={flying} alt="flyingfox"/>
                      </div>
                      <p>
                          webdeveloperfox@gmail.com
                      </p>
                  </div>
              </div>
        )
    }
}
export default Home
