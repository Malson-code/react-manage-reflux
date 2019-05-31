/**
 *   Create by Malson on 2018/5/30
 */

import React from 'react';
import { Menu,Icon } from 'antd';
import { withRouter } from 'react-router-dom';

@withRouter
class TopMenus extends React.Component{
  constructor(props){
    super(props);
    this.state={
    
    }
  }
  componentDidMount(){
  }
  handleTopMenu = (val) =>{
    console.log(val);
  }
  render(){
    let topNenus = [
      {
        name:'主页',
        to:'/docs/main',
        icon:'file',
      },
      {
        name:'菜单2',
        to:'/docs/one',
      },
      {
        name:'菜单3',
        to:'3322',
        icon:'file',
      },
    ];
    let menuArr = topNenus.length
        ?
        topNenus.map(item=>{
          let icon = item.icon ?<Icon type={item.icon}  style={{marginRight:4}}/>:'',
              menu = <Menu.Item key={item.to}>{icon}{item.name}</Menu.Item>;
          return menu;
        })
        :'';
    return '';//暂时先不要了
    // return(
    //     <Menu
    //         theme="dark"
    //         mode="horizontal"
    //         defaultSelectedKeys={['2']}
    //         style={{ lineHeight: '62px',float:'left'}}
    //         onClick={this.handleTopMenu}
    //     >
    //       { menuArr }
    //     </Menu>
    // )
  }
}
export default TopMenus;