/**
 *   Create by Malson on 2018/5/29
 */
// import $ from 'jquery';
import {validate,formValidate} from './Validate';
export default  {
  /*
      根据rules初始化页面formData
  */
  initFormData(c,ruleList){
    ruleList.map(item=>{
      c[item.id] = item.defaultVal === undefined ? "" : item.defaultVal;
    })
  },
  /**
   *  遍历配置文件  将fetch获取的到config.json属性加到common
  */
  initConfig(obj){
    for(let i in obj){
      this[i] = obj[i];
    }
  },
  /**
   *  清除所有cookies
  */
  clearAllCookies(){
    let  keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
      for(let  i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  },
  /**
   *  对象深拷贝
  */
  deepCopyValue(source) {
    let sourceCopy = source instanceof Array ? [] : {};
    for ( let item in source) {
      if(source[item]!==null){
        sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopyValue(source[item]) : source[item];
      }
      else{
        sourceCopy[item]=source[item]=null;
      }
    }
    return sourceCopy;
  },
  /**
   *  input 内容修改
   *  record  存储在state数据
   *  e当前dom
  */
  handleInputChange(record,e){
    let $this = this;
    let id = e.target.id,
        val = e.target.value;
    record[id] = val;
    validate($this,record,id);
    //更新UI
    if($this.state.loading!=='undefined'){
      $this.setState({loading:$this.state.loading});
    }else{
      $this.forceUpdate();
    }
  },
  
  /**
   *  form表单校验方法
  */
  validate,
  formValidate,
  
  /**
   *  table公共属性
  */
  tableProps:{
    bordered:true,
    className:'table-header-center',
  },
  /**
   *  form公共属性
   *  state 内 hints 对象
   *  name 当前 form的name
   *  nameLabel 当前显示中文的label名称
  */
  formProps(data,name,label){
    return {
      help:data[name+'Hint'],
      validateStatus:data[name+'Status'],
      label,
      labelCol:{span:6},
      wrapperCol:{span:17}
    }
  },
  /**
   *  专属form Input的简写
   *  data显示 state 中数据
   *  id 当前 form的 id
   *  placeholder 当前显示中文的placeholder名称
   *
  */
  formInputProps(data,id,placeholder){
    return {
      value:data[id],
      id,
      placeholder:'输入' + placeholder,
    }
  },
}