/**
 *   Create by Malson on 2018/5/29
 */

/**
 *  搜索
*/

import React from 'react';
import { Input } from 'antd';
const Search = Input.Search;


class Setting extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataSource:['我是谁','我来自哪里','我要去哪呢']
    }
  }
  componentDidMount(){
  }
  handleSearch = (val)=>{
    console.log(val);
  };
  handleChange = (e)=>{
    window.sessionStorage.search = e.target.value;
  };
  render(){
    let { dataSource } = this.state;
    return(
        <div className='header-setting-col'>
          <Search
              placeholder="输入搜索内容"
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              defaultValue = {window.sessionStorage.search}
              style={{width:160}}
          />
        </div>
    )
  }
}
export default Setting;