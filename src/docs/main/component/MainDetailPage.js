/**
 *   Create by Malson on 2018/6/27
 */

import React from 'react';
import {Icon, Modal, Form, Input, Button,Row, Col,Spin} from 'antd';
import {BrowserRouter, Route, Link, Switch,Redirect,Router,HashRouter,withRouter} from 'react-router-dom';
import Animate from '../../components/Animate';
import Common from '@/common/common'
const FormItem = Form.Item;


class MainDetailPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      data:{
        name:'',
        age:'',
        phone:'',
      },
      hints:{}
    }
  }
  componentDidMount(){
    let a = setTimeout(()=>{
      this.setState({loading:false});
    },500);
    this.state.validRules = [
      {
        id: 'name',//id
        desc: '姓名',//显示的字段名
        required: true,
        max: 20,
      },
      {
        id:'age',
        desc: '年龄',//显示的字段名
      },
      {
        id:'phone',
        desc: '手机号',//显示的字段名
        required: true,
        other:['mobile']
      }
    ];
  }
  componentWillUnmount(){
  }
  goBack = ()=>{
    // history.push('/home');
  };
  submit = ()=>{
    if(Common.formValidate(this,this.state.data)){
      alert('成功！')
    }
    
  };
  render(){
    let spinProps = {
      spinning:this.state.loading,
      tip:'加载中...',
    };
    let { data,hints} = this.state;
    const colNum = 24;
    return(
        <Animate type='right'>
            <Spin {...spinProps} key={1}  >
              <div>
                <Button icon='rollback' onClick={this.goBack} type='primary'>返回</Button>
                <Form>
                  <Row>
                    <Col span={colNum}>
                      <FormItem {...Common.formProps(hints,'name','姓名')}>
                        <Input {...Common.formInputProps(data,'name','姓名')}
                               onChange={(e)=>Common.handleInputChange(this,data,e)}
                        />
                      </FormItem>
                    </Col>
                    <Col span={colNum}>
                      <FormItem {...Common.formProps(hints,'age','年龄')}>
                        <Input {...Common.formInputProps(data,'age','年龄')}
                               onChange={(e)=>Common.handleInputChange(this,data,e)}
                        />
                      </FormItem>
                    </Col>
                    <Col span={colNum}>
                      <FormItem {...Common.formProps(hints,'phone','手机号')}>
                        <Input onChange={(e)=>Common.handleInputChange(this,data,e)}
                               {...Common.formInputProps(data,'phone','手机号')}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
              <Button type='primary' onClick={this.submit}>确定</Button>
            </Spin>
        </Animate>
    )
  }
}
export default MainDetailPage;