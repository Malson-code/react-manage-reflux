/**
 *   Create by Malson on 2018/5/30
 */

import React from 'react';
import './error.scss';
import { Button  } from 'antd';
import {Link} from 'react-router-dom';
import Animate from './Animate';
import common from '../../common/common';

class page extends React.Component{
  constructor(props){
    super(props);
    this.state={
    
    }
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  render(){
    let homeUrl = common.homeUrl || '/home';
    return(
        <Animate>
          <div key='1'>
            <div className='error-wrap'>
              <div className='error-icon'/>
              <div className='error-text'>
                <h1 className='error-title'>404</h1>
                <div >您访问的页面不存在！</div>
                <Button type='primary' style={{marginTop:20}}><Link to={homeUrl}>返回首页</Link></Button>
              </div>
            </div>
          </div>
        </Animate>
    )
  }
}
export default page;