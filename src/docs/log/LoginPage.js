/**
 *   Create by Malson on 2018/5/29
 */
import React from 'react';
import {Icon, Checkbox, Form, Input, Button,Alert} from 'antd';
import './log.scss';
import '../../style/common.scss';
import common from '../../common/common';
import { withRouter } from 'react-router-dom';
import MD5 from 'md5';

//请求
import LogActions from './actions/LogActions';
import LogStore from './store/LogStore';

const FormItem = Form.Item;


@withRouter
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      errMsg:'',
      loading:false,
      formData:{},
      formTipsData:{},//存放提示信息，
      validRules:[],
    };
    /*
        可输字段详见common/Validate
    */
    this.state.validRules = [
      {
        id: 'account',//id
        defaultVal:'1',//初始默认值，没有为''
        desc: '账号',//显示的字段名
        required: true,
        max: 20,
        maxFlag: true,
      },
      {
        id: 'password',
        desc: '密码',
        required: true,
        max: 300,
      },
    ];
    common.initFormData(this.state.formData,this.state.validRules);
    this.handleInputChange = common.handleInputChange.bind(this,this.state.formData);
  }
  componentDidMount() {
    this.loginAjax = LogStore.listen(this.onSeverChange);
    //键盘登录
    document.addEventListener('keydown',(e)=>{
      let code = e.keyCode;
      if(code===13){
        this.onSure()
      }
    })
  }
  componentWillUnmount() {
    this.loginAjax();
  }
  onSeverChange = (data)=>{
    this.setState({loading:false});
    if(data.errMsg) {
      this.setState({errMsg:data.errMsg});
      return;
    }
    //登录成功
    if(data.operation==="login"){
      this.loginSuccess();
    }
  };
  onSure = () => {
    this.loginSuccess();
    
    if (common.formValidate(this,this.state.formData)) {
      let {account,password} = this.state.formData;
      password = MD5(password);
      password =  MD5(password.substring(0,3)) + password;
      let params = {
        account,
        password
      };
      this.setState({loading:true});
      LogActions.login(params);
    }
  };
  loginSuccess(){
    window.localStorage.account = this.state.formData.account;
    window.localStorage.password = this.state.formData.password;
    let home = common.homeUrl || '/home';
    this.props.history.push(home);
  }
  handleCheckChange = (e) => {
    this.setState({checked: e.target.checked});
  };
  forgetPsw = ()=>{
    this.props.history.push('/forgetPsw');
  };
  handleCloseAlert = ()=>{
    this.setState({errMsg:''});
  };
  render() {
    const {formTipsData, formData} = this.state;
    let errMsg = this.state.errMsg;
    return (
        <div className='login-bg'>
          <div className='mal-login-wrap'>
            <div className='login-title'>
              啊哈哈，我要登录！
            </div>
            <Form layout='horizontal'>
              <FormItem
                  help={formTipsData.accountHint}
                  validateStatus={formTipsData.accountStatus}
                  style={{height: 74, marginBottom: 0}}
              >
                <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="请输入账号admin/zhangqiang"
                    id='account'
                    className='login-input'
                    onChange={this.handleInputChange}
                    value={formData.account}
                    size='large'
                    autoComplete = 'username'
                />
              </FormItem>
              <FormItem
                  help={formTipsData.passwordHint}
                  validateStatus={formTipsData.passwordStatus}
                  style={{height: 74, marginBottom: 0}}
              >
                <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    autosize={{minRows: 4, maxRows: 4}}
                    type='password'
                    placeholder="请输入密码123456/zhangqiang"
                    id='password'
                    size='large'
                    className='login-input'
                    onChange={this.handleInputChange}
                    value={formData.password}
                    autoComplete = 'current-password'
                />
              </FormItem>
              {
                errMsg?<Alert message={ errMsg } type="error" closable  style={{marginTop:-10,marginBottom:15}} onClose={this.handleCloseAlert}/>:''
              }
              <div style={{marginTop: 0}}>
                <Checkbox checked={this.state.checked} onChange={this.handleCheckChange}>自动登录</Checkbox>
                <span className='forget-password' onClick={this.forgetPsw}>忘记密码</span>
              </div>
              <Button
                  type="primary"
                  style={{width: '100%', marginTop: '15px'}}
                  onClick={this.onSure}
                  size='large'
                  loading={this.state.loading}
              >
                确 定
              </Button>
              <div style={{marginTop: 15}}>
                <span className='other-style'>其他方式登录</span>
                <Icon type="wechat" className='other-style-icon'/>
                <Icon type="qq" className='other-style-icon' onClick={this.qqLogin}/>
                <Icon type="taobao-circle" className='other-style-icon'/>
                <Icon type="alipay-circle" className='other-style-icon'/>
                {/*<span className='log-register'>注册</span>*/}
              </div>
            </Form>
          </div>
        </div>
    );
  }
}

export default LoginPage;