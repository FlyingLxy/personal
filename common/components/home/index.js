/**
 * Created by lxy on 16/8/11.
 */
import React,{ Component } from 'react';
import style from './style.css';
import flyingfox from '../../assets/img/flyingfox.png';
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <div className={style.home_wrapper}>
                  <div id='home_inner' ref='home_inner' className={style.home_inner}>
                      <span className={style.home_logo}>
                          <img className={style.img} src={flyingfox} alt="flyingfox"/>
                          <p className={style.p}>
                              webdeveloperfox@gmail.com
                          </p>
                     </span>

                  </div>
              </div>
        )
    }
}
export default Home
