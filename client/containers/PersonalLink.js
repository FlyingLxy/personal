/**
 * Created by lxy on 16/8/12.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Card,CardHeader,CardTitle,CardText,CardActions } from 'material-ui/Card';
import { Step, Stepper,StepButton,StepContent } from 'material-ui/Stepper';
import { cyan50,cyan100,cyan200,cyan300,cyan500,cyan700 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './personal.scss';

import { updateStepAction } from '../actions/personalAction.js';
const styles = {
    CardHeaderTitle: {
        color: cyan500,
        fontSize: 24,
        paddingBottom: 6
    },
    subTitle: {
        color: cyan100
    },
    cardHeader: {
        paddingLeft: 26,
        paddingRight: 26,
        paddingTop: 20,
        paddingBottom: 20
    },
    cardText: {
        paddingLeft: 26,
        paddingRight: 26,
        paddingTop: 0
    }
}
class Personal extends Component {
    _method() {
        return ['renderStepActions', 'nextHandle', 'prevHandle', 'stepHandle']
    }

    constructor(props) {
        super(props);
        this._method = this._method.bind(this);
        this._method().forEach(item => {
            this[item] = this[item].bind(this);
        })
        console.log(this);
    }

    nextHandle() {
        if (this.props.personal.step < 3) {
            this.props.dispatch(updateStepAction(this.props.personal.step + 1));
        }
    }

    prevHandle() {
        this.props.dispatch(updateStepAction(this.props.personal.step - 1));
    }

    stepHandle(step) {
        this.props.dispatch(updateStepAction(step))
    }

    renderStepActions(step) {
        return (
              <div style={{margin: '12px 0'}}>
                  {
                      step < 3 && <RaisedButton
                            label='Next'
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            onTouchTap={this.nextHandle}
                            style={{marginRight: 10}}
                            />
                  }
                  {
                      step > 0 && (
                            <FlatButton
                                  label='Black'
                                  disableTouchRipple={true}
                                  disableFocusRipple={true}
                                  onTouchTap={this.prevHandle}
                                  />
                      )
                  }
              </div>
        )

    }

    render() {
        return (
              <div className='personal_inner'>
                  <Card>
                      <CardHeader title='Resume'
                                  titleStyle={styles.CardHeaderTitle}
                                  subtitle={`TEL:${this.props.personal.tel}`}
                                  subtitleStyle={styles.subTitle}
                                  style={styles.cardHeader}
                            />
                      <CardText style={styles.cardText}>
                          <Stepper activeStep={this.props.personal.step} orientation='vertical' linear={false}>
                              <Step>
                                  <StepButton onTouchTap={() => this.stepHandle(0)}>
                                      介绍
                                  </StepButton>
                                  <StepContent>
                                      <div className='personal_content'>
                                          <h3>
                                              {this.props.personal.name}
                                          </h3>

                                          <p>
                                              {this.props.personal.introduction}
                                          </p>
                                      </div>
                                      {this.renderStepActions(this.props.personal.step)}
                                  </StepContent>
                              </Step>
                              <Step>
                                  <StepButton onTouchTap={() => this.stepHandle(1)}>
                                      技能
                                  </StepButton>
                                  <StepContent>
                                      <div className='personal_content'>
                                          <ul>
                                              {
                                                  this.props.personal.skills.map((item, index)=> {
                                                      return (<li key={index}>{`${index + 1}. ${item}`}</li>)
                                                  })
                                              }
                                          </ul>
                                      </div>
                                      {this.renderStepActions(this.props.personal.step)}
                                  </StepContent>
                              </Step>
                              <Step>
                                  <StepButton onTouchTap={() => this.stepHandle(2)}>
                                      工作
                                  </StepButton>
                                  <StepContent>
                                      <div className='personal_content'>
                                          {
                                              this.props.personal.workExperience.map((item, index) => {
                                                  return (
                                                        <div key={index}>
                                                            <div style={{marginBottom: 14}}>
                                                                <span style={{fontSize:18,fontWeight:900,marginRight:6}}>{item.companyName}</span>
                                                                <span style={{fontSize: 12,color: '#999'}}>{`${item.cycle[0]} - ${item.cycle[1]}`}</span>
                                                            </div>
                                                            {
                                                                item.project.map((item, index) => {
                                                                    return (
                                                                          <ul key={'_' + index}>
                                                                              <li style={{fontWeight:900}}>{item.name}</li>
                                                                              <li>{item.content}</li>
                                                                          </ul>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                  )
                                              })
                                          }
                                      </div>
                                      {this.renderStepActions(this.props.personal.step)}
                                  </StepContent>
                              </Step>
                              <Step>
                                  <StepButton onTouchTap={() => this.stepHandle(3)}>
                                      教育
                                  </StepButton>
                                  <StepContent>
                                      <div className='personal_content'>
                                          {
                                              this.props.personal.educationExperience.map((item, index) => {
                                                  return (
                                                        <div key={index}>
                                                            <div style={{marginBottom: 14}}>
                                                                <span style={{fontSize:18,fontWeight:900,marginRight:6}}>{item.name}</span>
                                                                <span style={{fontSize: 12,color: '#999'}}>{`${item.graduationTime[0]} - ${item.graduationTime[1]}`}</span>
                                                            </div>
                                                            <div>{`${item.level} | ${item.major}`}</div>
                                                        </div>
                                                  )
                                              })
                                          }
                                      </div>
                                      {this.renderStepActions(this.props.personal.step)}
                                  </StepContent>
                              </Step>
                          </Stepper>
                      </CardText>
                  </Card>
              </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        personal: state.personal
    }
}

const PersonalLink = connect(mapStateToProps)(Personal);

export default PersonalLink;