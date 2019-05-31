/**
 *   Create by Malson on 2018/6/5
 */
/**
 *  身份检验 组件
*/
import React from 'react';
import { Form, Input, Button,Row, Col } from 'antd';
import HandleChange from '../../../common/HandleChange';

const FormItem = Form.Item;

@HandleChange
class ResetPsw extends React.Component{
  constructor(props){
    super(props);
    this.state={
      newPsw:'',
      newPsw2:''
    }
  }
  init = ()=>{
    let totalInput = ['newPsw', 'newPsw2'],
        validRules = [
          {
            id: 'newPsw',//id
            desc: '密码',//显示的字段名
            max: 20,
            required:true
          },
          {
            id:'newPsw2',
            desc: '重复密码',//显示的字段名
            required: true,
            max: 20,
          }
        ];
    let {actions} = this.props;
    actions.initField(totalInput, validRules);
  };
  componentDidMount(){
    this.init();
  }
  /**
   *  获取验证码
  */
  getCode = ()=>{
    let phoneCode = 10;
    let Time = setInterval(()=>{
      let btnText = this.state.btnText;
      if(btnText===0){
        clearInterval(Time);
        this.setState({btnText:'获取验证码',btnDisabled:false});
        return;
      }
      this.setState(()=>{
        let obj = {};
        if(typeof btnText === 'string'){
          obj.btnText = phoneCode
        }else{
          obj.btnText = btnText - 1;
        }
        return obj;
      });
    },1000);
    this.setState({btnDisabled:true});
  };
  render(){
    const formLayout = 'horizontal';
    const textLabel = {
      labelCol:{span:8},
      wrapperCol:{span:16}
    };
    const {validBackData,inputVal} = this.props.state;
    const {actions} = this.props;
    return(
        <div style={{width:340,margin:'0 auto'}}>
            <Form layout={formLayout}>
              <Row>
                <Col span={24}>
                  <FormItem
                      help={validBackData.newPswHint}
                      validateStatus={validBackData.newPswStatus}
                      label="密码"
                      {...textLabel}
                  >
                    <Input placeholder="输入密码"
                           id='newPsw'
                           onChange={actions.handleInputChange}
                           value={inputVal.newPsw}
                    />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                      help={validBackData.newPsw2Hint}
                      validateStatus={validBackData.newPsw2Status}
                      label="重复密码"
                      {...textLabel}
                  >
                    <Input placeholder="输入重复密码"
                           id='newPsw'
                           onChange={actions.handleInputChange}
                           value={inputVal.newPsw}
                    />
                  </FormItem>
                </Col>
              </Row>
            </Form>
        </div>
    )
  }
}
export default ResetPsw;