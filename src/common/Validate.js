/**
 *   Create by Malson on 2018/10/15
 */

/*
    this.state.validRules=[{
      可选字段如下
    }]
    必须写上所有字段，名称为id,
    可选字段
    fields     type      params   other
  * id         string    --       必须
    validator  function  value    检验规则
    required   boolean   --       是否必须
    max        number    --       最大（默认超出截取）
      maxValue string    --       超出最大时显示文案 eg. '不能超过$value'
    min        number    --       最少
      minValue string    --       超出最大时显示文案 eg. '不能低于$value'
    min        number    --       最少
    other      string    --       内置的格式，如notEmpty，其他详见validRegExp文件


*/
import {ValidRegExp,ValidMsg} from './ValidRegExp';
import React from 'react';
//公共方法
let _check = (matchRule, value='') =>{
  let m = matchRule;
  if(m.validator){
    let msg = m.validator(value);
    if(msg){
      return msg;
    }
  };
  if(m.required === true && value ===''){ 
    return `请输入${m.desc}` 
  };
  if(m.max && value.length > m.max){
    return m.maxVal?m.maxVal.replace('$value',m.max):`【${m.desc}】最多输入【${m.max}】个字符`;
  };
  if(m.min&&value.length < m.min){
    return m.minVal?m.minVal.replace('$value',m.min):`【${m.desc}】最多输入【${m.min}】个字符`;
  };
  let r = m.other;
  if(r && r instanceof Array && r.length){
    let ms;
    for(let i of r){
      if(ValidRegExp[i]&&!ValidRegExp[i].test(value)){
        ms = ValidMsg[i];
        break;
      }
    }
    if(ms){
      return ms;
    }
  }
  return '';
};

/**
 *  页面展示错误处理
 */
let _setError = ($this,id,errMsg) =>{
  if(!errMsg){
    $this.state.formTipsData[id+'Status'] = '';
    $this.state.formTipsData[id+'Hint'] = '';
  }else{
    $this.state.formTipsData[id+'Status'] = 'error';
    $this.state.formTipsData[id+'Hint'] = <span className='errorHint'>{ errMsg }</span>;
  }
};

/**
 *  校验方法
 *  $this   上下文环境
 *  record  当前state存储表单数据的对象值
 *  id      当前需要校验的表单id(如果不传id则为全部校验)
*/
let validate = ($this,record={},id) =>{
  //页面定义的校验规则
  let validRules = $this.state.validRules || [];
  if(!validRules.length){return true;}
  let flag = true;
  
  if (!id) {
    //存放错误提示的容器   固定字段hints
    $this.state.hints = {};
    validRules.map((rule, i) => {
      let value = record[rule.id];
      //去除首尾空格s
      if (value) {
        value = value.toString().replace(/(^\s*)|(\s*$)/g, "");
        record[rule.id] = value;
      }
      
      let errMsg = _check(rule, value);
      if (errMsg) {
        //含有最多这个字段的时候截取字段
        if(errMsg.indexOf('最多')!==-1 && rule['max']){
          record[rule.id] = value.substring(0,rule['max'])
        }
        _setError($this, rule.id, errMsg);
        flag = false;
      }
    });
  }
  else {
    for (let x = validRules.length - 1; x >= 0; x--) {
      let rule = validRules[x];
      if (rule.id === id) {
        let value = record[id];
        let errMsg = _check(rule, value);
        _setError($this, id, errMsg);
        if (errMsg) {
          flag = false;
          //含有最多这个字段的时候截取字段
          if(errMsg.indexOf('最多')!==-1&&rule['max']){
            record[rule.id] = value.substring(0,rule['max'])
          }
        }
        else if (rule.dataType === 'number' && value !== '') {
          record[id] = '' + parseInt(value);
        }
        break;
      }
    }
  }
  //强制刷新下UI
  $this.forceUpdate();
  return flag;
};
//全部表单校验
const formValidate = ($this,record)=>validate($this,record);


export {validate,formValidate};