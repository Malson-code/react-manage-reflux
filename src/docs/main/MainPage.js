/**
 *   Create by Malson on 2018/5/29
 */
import React from 'react';
import classNames from 'classnames';
import {Button,Modal} from 'antd';
import FilterPage from './component/FilterPage';
import TablePage from './component/TablePage';
import Animate from '../components/Animate';
import FormPage from './component/FormPage';
import Common from "../../common/common";

//data
import MainActions from './actions/MainActions';
import MainStore from './store/MainStore';

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tableLoading:false,
      btnLoading:false,
      modalVisible:false,
      modalType:'',
      tableData:[{
        name:'1',
        age:'2',
        phone:"2",
        address:'dd'
      }],
      totalPage:0,
      currentPage:1,
    }
  }
  
  componentDidMount(){
    this.sever = MainStore.listen(this.onSeverChange);
    this.retrieveSever();
  }
  componentWillUnmount() {
    this.sever();
  }
  onSeverChange = (data)=>{
    if(data.errMsg){
      this.setState({errMsg:data.errMsg,tableLoading:false});
      return;
    }
    if(data.operation==='retrieve'){//查询
      let tableData = [];
      if(data.params.object){
        tableData = data.params.object.map(item=>{item.key = item.id;return item});
      }
      this.setState({
        tableData:tableData,
        totalPage:data.params.totalPage,
        tableLoading:false
      });
    }else if(data.operation==='remove'){//删除
      this.retrieveSever();
    }else if(data.operation==='addMain'||data.operation==='update'){//新增
      this.setState({btnLoading:false,modalVisible:false});
      this.retrieveSever();
      this.createFormPage.getChildRef().init();
    }
  };
  retrieveSever = (params={},startPage,pageSize=10)=>{
    if(!startPage){
      startPage = 1;
      this.setState({currentPage:1});
    }
    this.setState({tableLoading:true});
    if(this.filter){
      params = this.filter.state.inputVal;
    }
    MainActions.retrieve(params,startPage,pageSize);
  };
  refresh = ()=>{
    this.retrieveSever({})
  };
  search = (filter)=>{
    this.setState({tableLoading:true});
    this.retrieveSever(filter)
  };
  add = ()=>{
    this.setState({modalType:'add',modalVisible:true});
  };
  edit = (data)=>{
    this.setState({modalType:'edit',modalVisible:true});
    this.createFormPage.getChildRef().initUpdateData(data);
  };
  reset = ()=>{
    this.retrieveSever();
  };
  pageChange = (page)=>{
    this.setState({currentPage:page.current});
    this.retrieveSever({},page.current,page.pageSize)
  };
  check = (data)=>{
    // history.push({
    //   pathname:'/home/'+data.key
    // });
  };
  handleOk = ()=>{
    let type = this.state.modalType;
    let data = Common.deepCopyValue(this.createFormPage.state.inputVal);
    this.setState({btnLoading:true});
    //点击确定  判断是新增还是编辑  调用不同的方法
    if(type==='add'){
      MainActions.add(data)
    }else if(type==='edit'){
      MainActions.update(data)
    }
  };
  handleCancel = ()=>{
    this.setState({modalVisible:false,btnLoading:false});
  };
  render(){
    let filterProps = {
      search:this.search,
      resetFilter:this.resetFilter,
      reset:this.reset
    },
    tableProps = {
      edit:this.edit,
      check:this.check,
      currentPage:this.state.currentPage,
      totalPage:this.state.totalPage,
      pageChange:this.pageChange
    },
    formProps = {
      modalVisible:this.state.modalVisible,
      modalType:this.state.modalType,
      btnLoading:this.state.btnLoading,
      handleOk:this.handleOk,
      handleCancel:this.handleCancel
    };
    let tableData = this.state.tableData;
    return(
        <Animate type='right'>
          <div key='1'>
            <FilterPage {...filterProps} ref={ref=>this.filter=ref}/>
            <div className='table-btns'>
              <Button type='primary' icon='plus' onClick={this.add}>新增</Button>
              <Button icon='sync' onClick={this.refresh} className='btn-margin'>刷新</Button>
            </div>
            <TablePage
                dataSource={tableData}
                loading={this.state.tableLoading}
                {...tableProps}
                {...Common.tableProps}
            />
            <FormPage ref={ref=>this.createFormPage = ref} {...formProps}/>
          </div>
        </Animate>
    )
  }
}
export default MainPage;