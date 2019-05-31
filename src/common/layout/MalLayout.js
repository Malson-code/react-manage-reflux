/**
 *   Create by Malson on 2018/5/29
 */
import './layout.scss';
import React from 'react';
import { Layout  } from 'antd';



import Header from './header/Header';
import LeftMenu from './leftMenu/LeftMenu';
import BreadcrumbCom from './header/Breadcrumb';
const { Content } = Layout;




class MalLayout extends React.Component{
  constructor(props){
    super(props);
    this.state={
    
    }
  }
  componentDidMount(){
  }
  render(){
    let { children } = this.props;
    return(
        <Layout style={{height:'100%',width:'100%'}}>
          <Header className="header" />
          <Layout>
            <LeftMenu />
            <Layout className='mal-content-layout'>
              <div style={{overflow:'auto',height:'100%',width:'100%',backgroundColor:'#fff',position:'relative'}}>
                <BreadcrumbCom />
                <Content  className='mal-content'>
                  { children }
                </Content>
              </div>
            </Layout>
          </Layout>
        </Layout>
    )
  }
}
export default MalLayout;