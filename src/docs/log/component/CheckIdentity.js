/**
 *   Create by Malson on 2018/6/5
 */
/**
 *  身份检验 组件
*/
import React from 'react';
import { Form, Input, Button,Row, Col } from 'antd';
import HandleChange from '../../../common/HandleChange'
const FormItem = Form.Item;

@HandleChange
class CheckIdentity extends React.Component{
  constructor(props){
    super(props);
    this.state={
      btnText:'获取验证码',
      btnDisabled:false
    }
  }
  init = ()=>{
    let totalInput = ['phone', 'code'],
        validRules = [
          {
            id: 'phone',//id
            desc: '手机号',//显示的字段名
            max: 11,
          },
          {
            id:'code',
            desc: '验证码',//显示的字段名
            required: true,
            max: 4,
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
    let setTimeDo  = ()=>{
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
    };
    setTimeDo();
    let Time = setInterval(()=>{
      setTimeDo();
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
                      help={validBackData.phoneHint}
                      validateStatus={validBackData.phoneStatus}
                      label="手机号"
                      {...textLabel}
                  >
                    <Input placeholder="输入手机号"
                           id='phone'
                           onChange={actions.handleInputChange}
                           value={inputVal.phone}
                    />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                      help={validBackData.codeHint}
                      validateStatus={validBackData.codeStatus}
                      label="验证码"
                      {...textLabel}
                  >
                    <Input placeholder="输入验证码"
                           id='code'
                           onChange={actions.handleInputChange}
                           value={inputVal.code}
                           style={{width:'44%'}}
                    />
                    <Button style={{width:'44%',marginLeft:'12%'}}
                            onClick={this.getCode}
                            disabled={this.state.btnDisabled}
                    >{this.state.btnText}</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
        </div>
    )
  }
}
export default CheckIdentity;