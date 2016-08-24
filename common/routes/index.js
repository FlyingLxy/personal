/**
 * Created by lxy on 16/8/21.
 */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Wrapper from '../containers/wrapper';
import Home from '../components/home';
import SignUp from '../containers/signup';
import SignIn from '../containers/signin';
import Personal from '../containers/personal';
import Blackhouse from '../containers/blackhouse';

export default history => (
      <Router history={history}>
          <Route path='/flyingfox' component={Wrapper}>
              <IndexRoute component={Home}/>
              <Route path='personal' component={Personal}></Route>
              <Route path='blackhouse' component={Blackhouse}></Route>
              <Route path='signup' component={SignUp}></Route>
              <Route path='signin' component={SignIn}></Route>
          </Route>
      </Router>
)