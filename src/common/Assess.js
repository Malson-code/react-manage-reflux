/**
 *   Create by Malson on 2018/5/29
 */
import React from 'react';
import {Redirect,withRouter} from 'react-router-dom';
import common from './common';

@withRouter
class Assess extends React.Component{
  check = ()=>{
    // let SSOTOKEN,
    //     userId ,
    //     f,location;
    // let a = window.location.href.lastIndexOf('/'),
    //     b = window.location.href.substring(a);
    // location = b==='/login';
    // f = !SSOTOKEN && !location &&!userId;
    // if(f){
    //   this.props.history.push('/login');
    // }
  }
  componentWillMount(){
    //获取全局配置文件
    fetch('config.json',{
      type:'get',
    }).then(data=>data.json()).then(result=>{
      common.initConfig(result)
    }).catch(error=>{
      // alert('数据初始化失败，请刷新再试！')
    });
    this.check()
  }
  componentWillReceiveProps(){
    this.check()
  }
  render(){
    return '';
  }
}
export default Assess;