/**
 *   Create by Malson on 2018/5/29
 */
import React from 'react';
import { Layout, Menu,Icon} from 'antd';
import LeftMenuParams from '../../menus/LeftMenuParams';
import {BrowserRouter, Route, Link, Switch,Redirect,Router,HashRouter,withRouter} from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


@withRouter
class LeftMenu extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectKey:[],
      openKeys:[],
      collapsed:false
    }
  }
  /**
   *  第一次加载的时候  配置路由
  */
  initData = ()=>{
    let matchId = this.props.match.params.id;
    let path = this.getPathName();
    let openPath = [],param = '';
    path.substring(1).split('/').map(item=>{
      param += '/' + item;
      openPath.push(param);
    });
    if(matchId){
      path = openPath[openPath.length-2];
    }
    if(window.localStorage.leftMenu){
      this.setState({collapsed:true});
    }
    this.setState({selectKey:[path],openKeys:openPath});
  }
  componentWillMount(){
    this.initData();
  }
  /**
   *  运用递归算法  计算出当前的左侧菜单
  */
  getMenus = (params) =>{
    return params.map(item=>{
      let cur;
      if(item.children && item.children.length){
        let newCur = this.getMenus(item.children);
        let icon = item.icon ? item.icon : 'close-circle-o';
        cur = <SubMenu key={item.to} title={<span><Icon type={icon} /><span>{item.name}</span></span>}>{newCur}</SubMenu>;
      }else{
        let icon = item.icon ? item.icon : 'file';
        cur = <MenuItem key={item.to} ><Icon type={ icon } /><span>{item.name}</span></MenuItem>
      }
      return cur;
    });
  };
  /**
   *  点击menu item
  */
  handleMenuClick = (value)=>{
    let key = value.key,
        pathname = this.getPathName();
    /**
     *  相同url返回不处理
    */
    if(pathname===key){
      return ;
    }
    this.props.history.push({
      pathname:key
    });
    this.setState({selectKey:[key]});
  };
  /**
   *  点击展开
  */
  handleOpenChange = (openKeys)=>{
    this.setState({openKeys});
  };
  getPathName = ()=>{
    let pathname = this.props.location.pathname;
    pathname = pathname.substr(-1)==='/'?pathname.substring(0,pathname.length-1):pathname;
    return pathname
  }
  /**
   *  改变左侧菜单拉伸情况
  */
  initWindowResize = ()=>{
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  changeLeftStatus = ()=>{
    //手动触发window resize
    this.initWindowResize();
    let collapsed = this.state.collapsed;
    if(collapsed){
      window.localStorage.removeItem('leftMenu');
    }else{
      window.localStorage.leftMenu = true;
    }
    this.setState({collapsed:!collapsed});
  }
  render(){
    let menuContent = [];
    if( LeftMenuParams instanceof Array && LeftMenuParams.length){
      menuContent = this.getMenus(LeftMenuParams)
    }
    let { selectKey , openKeys ,collapsed} = this.state;
    let iconType = collapsed?'menu-unfold' : 'menu-fold';
    return(
        <Sider width={200}
               className='mal-leftmenu'
               collapsible
               collapsed={ collapsed }
               onCollapse={this.changeLeftStatus}
               trigger = {<div className='left-resize'><Icon type={iconType} /></div>}
        >
          <Menu
              mode="inline"
              theme='light'
              defaultSelectedKeys={selectKey}
              defaultOpenKeys={openKeys}
              // selectedKeys = { selectKey }
              // openKeys = { openKeys }
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleMenuClick}
              // onOpenChange = {this.handleOpenChange}
          >
            { menuContent }
          </Menu>
        </Sider>
    )
  }
}
export default LeftMenu;