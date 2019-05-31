/**
 *   Create by Malson on 2018/5/29
 */

import React from 'react';
import { Layout } from 'antd';
import Setting from './Setting';
import Events from './Events';
import Admin from './Admin';
import TopMenus from './TopMenus';
import common from '../../common';
import {withRouter} from 'react-router-dom';
const { Header } = Layout;

@withRouter
class MalHeader extends React.Component{
  constructor(props){
    super(props);
    this.state={
    
    }
  }
  goHome = ()=>{
    let path = this.props.location.pathname;
    if(path!=='/home'){
      this.props.history.push('/home');
    }
  };
  componentDidMount(){
  }
  render(){
    return(
        <Header className="mal-header">
          <div className="mal-logo" onClick={this.goHome}>开发云平台</div>
          <TopMenus />
          <div style={{float:'right'}}>
            <Setting />
            { common.topMessage ? <Events /> : ''}
            <Admin />
          </div>
        </Header>
    )
  }
}
export default MalHeader;