/**
 *   Create by Malson on 2018/5/30
 */
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {BrowserRouter, Route, Link, Switch,Redirect,Router,HashRouter,withRouter} from 'react-router-dom';
import common from '../../common';
import LeftMenuParams from '../../menus/LeftMenuParams';

@withRouter
class BreadcrumbCom extends React.Component{
  constructor(props){
    super(props);
    this.state={
       menus:[]
    }
  }
  initBreadcrumbCom = ()=>{
    let AllPath = [],AllMenus = [];
    let getAllPath = (Arr = [])=>{
      Arr.map(item=>{
        AllPath.push(item);
        if(item.children){
          getAllPath(item.children);
        }
      })
    };
    getAllPath(LeftMenuParams);
    
    let path = this.props.match.path.slice(1).split("/");
    let newPathArr = [] , newPathStr = '' ;
    for(let i=0;i<path.length;i++){
      newPathStr += "/"+path[i];
      newPathArr.push(newPathStr)
    }
    
    AllPath.map(item=>{
      newPathArr.map(jtem=>{
        if(jtem===item.to){
          AllMenus.push(item)
        }
      })
     return item.to === path.path;
    });
    this.setState({menus:AllMenus});
  }
  componentWillMount(){
    this.initBreadcrumbCom();
  }
  getNameByPathname = ()=>{
  
  };
  handleClick = (path)=>{
    //相同已在主页不执行
    if(this.props.match.path===path) return;
    this.props.history.push({
      pathname:path
    })
  }
  render(){
    //根据配置文件觉得是否展示
    let menus = this.state.menus;
    return common.breadcrumb
        ? <Breadcrumb className='mal-breadcrumb'>
          <Breadcrumb.Item className='bread-cp' title='主页' key='/home' onClick = {()=>this.handleClick('/home')} ><Icon type='home' /></Breadcrumb.Item>
          {
            menus.length>1
              ?menus.map((item,i)=>{
                  return <Breadcrumb.Item className='bread-none' key={item.to}  ><Icon type={item.icon} />{item.name}</Breadcrumb.Item>;
              })
              :''
          }
          </Breadcrumb>
        :''
  }
}
export default BreadcrumbCom;