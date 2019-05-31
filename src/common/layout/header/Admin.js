/**
 *   Create by Malson on 2018/5/29
 */
/**
 *  个人信息
 */
import React from 'react';
import { Menu, Dropdown, Icon,Modal,Button,Form,Row,Col,Input,Alert} from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import {withRouter} from 'react-router-dom';
import common from '../../common';
import MD5 from 'md5';
import HandleChange from '../../../common/HandleChange';
const FormItem = Form.Item;

@withRouter
@HandleChange
class Admin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      personModal:false,
      resetPswModal:false,
      errText:''
    }
  }
  componentDidMount(){
    this.init();
  }
  init = ()=>{
    let totalInput = ['oldPsw', 'newPsw', 'conNewPsw'],
        validRules = [
          {
            id: 'oldPsw',//id
            desc: '原密码',//显示的字段名
            required: true,
            max: 20,
          },
          {
            id:'newPsw',
            desc: '新密码',//显示的字段名
            required: true
          },
          {
            id:'conNewPsw',
            desc: '确认新密码',//显示的字段名
            required: true
          }
        ];
    let {actions} = this.props;
    actions.initField(totalInput, validRules);
    this.setState({errText:''});
  };
  handleMenu = (params)=>{
    switch (params.key){
      //个人信息
      case '1':
        this.setState({personModal:true});
        break;
      case '2':
        Modal.info({
          title: '我是XXX',
          content: '我是XXX',
        });
        break;
      case "3":
        window.sessionStorage.clear();
        common.clearAllCookies();
        console.log('清除缓存数据');
        this.props.history.push(
            {
              pathname:'/login'
            }
        )
        break;
    }
  };
  hideModal = ()=>{
    this.setState({personModal:false});
  };
  resetPsw = ()=>{
    //不去除之前的MODAL  personModal:false,
    this.setState({resetPswModal:true});
  };
  hideResetModal = ()=>{
    this.setState({resetPswModal:false});
    this.init();
  };
  resetPswOk = ()=>{
    const {formValidate} = this.props.actions;
    let {oldPsw,newPsw,conNewPsw} = this.props.state.inputVal;
    if (formValidate()) {
      if(newPsw!==conNewPsw){
        this.setState({errText:'两次输入新密码不一致！'});
        //自动取消报错信息
        // let cancelErr = setTimeout(()=>{
        //   this.setState({errText:''});
        // },4000);
        return;
      }
      console.log(MD5(oldPsw),MD5(newPsw));
      this.setState({resetPswModal:false});
      this.init();
    }
  };
  onCloseErr = ()=>{
    this.setState({errText:""});
  };
  render(){
    const menu = (
        <Menu onClick={this.handleMenu}>
          <Menu.Item key='1'>
            <span className='admin-drop'>个人信息</span>
          </Menu.Item>
          {/*<Menu.Item key='2'>*/}
            {/*<span className='admin-drop'>哈哈哈</span>*/}
          {/*</Menu.Item>*/}
          <Menu.Item key='3'>
            <span className='admin-drop'>退出登录</span>
          </Menu.Item>
        </Menu>
    );
    const formLayout = 'horizontal';
    const textLabel = {
      labelCol:{span:6},
      wrapperCol:{span:18}
    };
    const {validBackData,inputVal} = this.props.state;
    const {actions} = this.props;
    let {errText} = this.state;
    return(
        <div className='header-setting-col cp'>
          <Dropdown overlay={menu} placement="bottomCenter">
            <span style={{display:'block',height:55}}>
              <Icon type="user"  style={{marginRight:2,fontSize:18,verticalAlign:'middle'}}/>
              <Ellipsis length={80} style={{display:'inline',verticalAlign:'middle'}}>{window.localStorage.account}</Ellipsis>
            </span>
          </Dropdown>
          <Modal
              title="个人信息"
              visible={this.state.personModal}
              wrapClassName="vertical-center-modal"
              footer={null}
              maskClosable={true}
              closable={true}
              onCancel={this.hideModal}
              width={400}
          >
            <div className='person-info' style={{paddingLeft:64,paddingBottom:10}}>
              <p>
                <span style={{fontSize:24,color:'#333',marginRight:'8px',fontFamily:'cursive'}}>欢迎回来!</span><span>{window.localStorage.account}</span>
              </p>
              <p>
                <span style={{width:100,color:'#aaa'}}>账号：</span>
                <span>188****3652</span>
                <Button size="small" style={{marginLeft:'8px'}} onClick={this.resetPsw}>修改密码</Button>
              </p>
              <p>
                <span style={{width:100,color:'#aaa'}}>其他信息：</span>
                <span >学如逆水行舟，不进则退！</span>
              </p>
            </div>
          </Modal>
          <Modal
              title="修改密码"
              visible={this.state.resetPswModal}
              wrapClassName="vertical-center-modal"
              maskClosable={true}
              closable={true}
              onCancel={this.hideResetModal}
              onOk={this.resetPswOk}
              width={420}
              mask={false}
          >
            <div style={{padding:'0 20px'}}>
              <Form layout={formLayout}>
                <FormItem
                    help={validBackData.oldPswHint}
                    validateStatus={validBackData.oldPswStatus}
                    label="原密码"
                    {...textLabel}
                >
                  <Input placeholder="输入原密码"
                         id='oldPsw'
                         onChange={actions.handleInputChange}
                         value={inputVal.oldPsw}
                         type='password'
                  />
                </FormItem>
                <FormItem
                    help={validBackData.newPswHint}
                    validateStatus={validBackData.newPswStatus}
                    label="新密码"
                    {...textLabel}
                >
                  <Input placeholder="输入新密码"
                         id='newPsw'
                         onChange={actions.handleInputChange}
                         value={inputVal.newPsw}
                         type='password'
                  />
                </FormItem>
                <FormItem
                    help={validBackData.conNewPswHint}
                    validateStatus={validBackData.conNewPswStatus}
                    label="确认新密码"
                    {...textLabel}
                >
                  <Input placeholder="输入确认新密码"
                         id='conNewPsw'
                         onChange={actions.handleInputChange}
                         value={inputVal.conNewPsw}
                         type='password'
                  />
                </FormItem>
              </Form>
              {
                errText?<Alert
                    message={errText}
                    type="error"
                    closable
                    showIcon
                    onClose={this.onCloseErr}
                />:''
              }
            </div>
          </Modal>
        </div>
    )
  }
}
export default Admin;