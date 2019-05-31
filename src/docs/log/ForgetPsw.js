/**
 *   Create by Malson on 2018/6/5
 */

import React from 'react';
import { Steps,Button } from 'antd';
import Animate from '../components/Animate';
import CheckIdentity from './component/CheckIdentity';
import ResetPsw from './component/ResetPsw';
import { withRouter} from 'react-router-dom';
import SuccessPic from '../../imgs/success.svg';
import './log.scss';
const Step = Steps.Step;

@withRouter
class ForgetPsw extends React.Component{
  constructor(props){
    super(props);
    this.state={
      step:0
    }
  }
  componentDidMount(){
  }
  nextStep = ()=>{
    let {step} = this.state;
    step = step + 1;
    this.setState({step});
  };
  preStep = ()=>{
    let {step} = this.state;
    step = step - 1;
    this.setState({step});
  };
  goBack = ()=>{
    this.props.history.push('/login');
  }
  render(){
    let {step} = this.state;
    const stepArr = [
      {
        title:'身份验证',
        content:<CheckIdentity />
      },
      {
        title:'重设密码',
        content:<ResetPsw />
      },
      {
        title:'设置完成',
        content:
            <div style={{textAlign:'center',fontSize:'22px',color:'#42ff96'}}>
                 <img src={SuccessPic} style={{width:24,verticalAlign:'sub',marginRight:10}}/>设置成功！
            </div>
      },
    ];
    return(
          <div style={{height:'100%',width:'100%'}}>
            <div className='forget-psw-top'>
              开发云平台
              <span
                  style={{float:'right','marginRight':'40px',fontSize:'16px',cursor:'pointer',textDecoration:'underline'}}
                  onClick={this.goBack}
              >
                返回登录
              </span>
            </div>
              <div className='forget-psw-wrap' key={1}>
                <div className='step-title'>找回密码</div>
                <Steps current={step}>
                  {stepArr.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className='step-content'>
                  {stepArr[step].content}
                </div>
                {
                  step<2?<Button style={{float:'right'}} onClick={this.nextStep} type='primary' >下一步</Button>:''
                }
                {
                  step!==0?<Button style={{float:'right'}} onClick={this.preStep} className='btn-margin'>上一步</Button>:''
                }
              </div>
          </div>
    )
  }
}
export default ForgetPsw;