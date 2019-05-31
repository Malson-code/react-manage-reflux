/**
 *   Create by Malson on 2018/6/1
 */
import React from 'react';
import {Table,Select,Button,Modal} from 'antd';
// data
import MainActions from '../actions/MainActions';
const confirm = Modal.confirm;
class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentDidMount() {
  
  }
  remove = (record)=>{
    confirm({
      title: '是否确定删除【'+ record.name +'】？',
      onOk() {
        MainActions.remove({uuid:record.id});
      },
    });
  };
  onChange = (pagination, filters, sort)=>{
    this.props.pageChange(pagination);
  };
  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key:'name',
        width:160
      },
      {
        title: '年龄（岁）',
        dataIndex: 'age',
        key:'age',
        width:100
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key:'phone',
        width:180
      },
      {
        title: '工作职位',
        dataIndex: 'job',
        key:'job',
        width:180
      },
      {
        title: '地址',
        dataIndex: 'address',
        key:'address',
        width:360
      },
    ];
    let operaCol = {
      title:'操作',
      dataIndex:'operaCol',
      key:'operaCol',
      width:200,
      render:(text,record)=>{
        return (
            <div style={{textAlign:'center'}}>
              <Button size='small' onClick={()=>this.props.check(record)} title='查看'>查看</Button>
              <Button size='small' onClick={()=>this.props.edit(record)} className="btn-margin" title='修改'>修改</Button>
              <Button size='small' onClick={()=>this.remove(record)} className="btn-margin" title='删除' type='danger'>删除</Button>
            </div>
            )
      }
    };
    columns.push(operaCol);
    let pageSet = {
      pagination:{
        showQuickJumper:true,
        showSizeChanger:true,
        pageSizeOptions:['10','30','50','100','300'],
        size:'large',
        total:this.props.totalPage,
        current:this.props.currentPage
      }
    };
    return (
        <Table  {...this.props} columns={columns}  size='middle' {...pageSet} onChange={this.onChange}/>
    )
  }
}

export default TablePage;