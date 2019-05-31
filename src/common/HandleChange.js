/**
 *   Create by Malson on 2018/1/26
 */

import React from 'react';
import common from './common';
import {ValidRegExp,ValidMsg} from './ValidRegExp';
let maxF = false;//最大长度做截断处理
// 基础组件作为高阶组件的参数传入
/**
 *  处理antd事件的高阶组件
 *  使用方法：
 *  在componentWillMount里初始化校验规则,如下方法 !!注意先传入所有Input字段 然后再传入校验规则
 *  let  {actions} = this.props;actions.initField(totalInput,validRules);
 *  totalInput = ['id1','id2',......];
 *  validRules = [ {
                                  id: 'step',//id
                                  desc: '阶段',//显示的字段名
                                  required: true,
                                  max: 20,
                                  other:['notSpecialChar','mobile'],
                                  validator:stepValidata,
                                  pattern:/^[\u4e00-\u9fa5]+$/,
                                  patternPrompt:'请输入中文'
                               } ........
                              ];
 在相应的render定义
                             const formLayout = 'horizontal';//可不要
                             const {validBackData,inputVal} = this.props.state;
                             const {actions} = this.props;
 
 在相应的form上添加属性
                             help={validBackData.xxxHint}
                             validateStatus={validBackData.xxxStatus}
 
 在form内的Input或其他上添加
                            onChange={actions.handleInputChange}
                            value={inputVal.(id)}
 OK时校验                   const {formValidate} = this.props.action
                           if (formValidate()) {xxxx}
*/
function HandleChange(Container) {
  
  // 创建一个中间组件，该中间组件会在添加了逻辑之后返回
  return class Validate extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        inputVal:{},
        validBackData:{},//存放报错信息的  包括hint 和  status
        validRules: [],//存放校验规则的
      }
    }
    /**
     *  blur触发校验
    */
    handleInputChangeBlur = (e)=>{
      const id = e.target.id, val = e.target.value;
      this.setState({inputVal:Object.assign({},this.state.inputVal,{[id]:val})});
    }
    handleInputBlur = (e) =>{
      const $this = this,
          id = e.target.id,
          val = e.target.value;
      let obj = $this.state.inputVal;obj[id] = val;
      //校验
      this.validate($this,obj,e.target.id);
      $this.forceUpdate();
    }
    handleInputChange = (e) =>{
      const id = e.target.id,
            val = e.target.value;
      let obj = {[id]:val};
      //校验
      this.validate(obj,id);
      if(!maxF){
        this.setState({inputVal:Object.assign({},this.state.inputVal,obj)});
      }
      maxF = false;
    }
    /**
     *  输入的时候不进行校验
    */
    handleInputChangeNo = (e) =>{
      let id = e.target.id,
          val = e.target.value,
          {validBackData} = this.state;
      if(validBackData[e.target.id+'Status']){
        validBackData[e.target.id+'Status']='';
        validBackData[e.target.id+'Hint']='';
      }
      this.setState({inputVal:Object.assign({},this.state.inputVal,{[id]:val})});
    }
    /**
     *
     */
    formValidate = ()=>{
      let {inputVal} = this.state;
      return this.validate(inputVal);
    }
    /**
     *self  当前模块实例
     * inputVal  如果是单个校验传入当前的{id:val}  如果是全体校验  传入的是this.state.inputVal
     * id 当前输入的input id
    */
    validate = (inputVal,id)=>{
      let rules = this.state.validRules||[];
      if(!rules.length) return false;
      let flag = true;
      //有id  做单个检验
      if(id){
        //找出对应的rule
        let matchRule = rules.filter(item=>item.id===id);
        if(!matchRule) return flag;
        let msg = this._check(matchRule,inputVal[id],id);
        this._editError(id,msg);
        if(msg&&msg!==''){
          flag = false;
        }
      }
      //无单个id  则为当前模块设置的所有输入框校验
      else{
        rules.map(item=>{
          let msg = this._check(item,inputVal[item.id],id);
          this._editError(item.id,msg);
          if(msg&&msg!==''){
            flag = false;
          }
        });
        this.forceUpdate();
      }
      return flag;
    }
    /**
     *  rule 校验规则  数组里对象
     *  value 当前input的值
    */
    _check = (matchRule, value) =>{
      let m = matchRule;
      if((m.required === true||m.required === 'true')&&value===''){
        return '请输入【' + m.desc + '】';
      }
      if(m.max&&value.length > m.max){
        if(m.maxFlag){
          maxF = true ;
          let o = {[m.id]:this.state.inputVal[m.id].substring(0,m.max)};
          this.setState({inputVal:Object.assign({},this.state.inputVal,o)});
        }
        return '【' + m.desc + '】最多输入【' + m.max + '】个字符';
      }
      if(m.min&&value.length < m.min){
        return '【' + m.desc + '】最少输入【' + m.max + '】个字符';
      }
      if(m.specialChar){
        let specialChar = /[/*`~!@#$%^&*()_+<>?:|?<>"{},.\/\\;'[\]]/im;
        if (specialChar.test(value)){
          return '不能输入特殊符号';
        }
      }
      if(m.pattern){
        if(!m.pattern.test(value)){
          if(m.patternPrompt){
            return m.patternPrompt;
          }
          else {
            return '请输入正确内容'
          }
        }
      }
      if(m.validator){
        let msg = m.validator(value);
        if(msg){
          return msg;
        }
      }
      let r = m.other;
      if(r&&r instanceof Array&&r.length){
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
    }
    /**
     *  页面展示错误处理
    */
    _editError = (id,msg) =>{
      let { validBackData } = this.state;
      if(msg===''){
        validBackData[id+'Status'] = '';
        validBackData[id+'Hint'] = '';
      }else{
        validBackData[id+'Status'] = 'error';
        validBackData[id+'Hint'] = <span className='errorHint'>{msg}</span>;
      }
    };
    /**
     *  初始化页面form以及其他数据的初始值   默认为 ''
     *  有初始值的 通过addition传进来，addition格式为 [{key:'',defaultVal:''},{key:'',defaultVal:''},...]
    */
    validRules = (totalField,validRules=[],addition=[])=>{
      if(validRules instanceof Array&&validRules instanceof Array){
        totalField.map(item=>{
          this.state.inputVal[item] = '';
          if(addition.length){
            addition.map(jtem=>{
              if(item===jtem.key){
                this.state.inputVal[item] = jtem.defaultVal;
              }
            })
          }
        });
        this.setState({validBackData:{},validRules});
      }
      else{
        console.warn('初始化数据错误！');
      }
    };
    /**
     *  初始化更新数据
    */
    initUpdataField = (data)=>{
      //先进行深拷贝
      let inputVal = common.deepCopyValue(data);
      this.setState({inputVal});
    };
    /**
     *  获取子组件的实例
     */
    getChildRef = ()=>this.clildCom;
    render() {
      const actions = {
        handleInputChange:this.handleInputChange,
        handleInputChangeNo:this.handleInputChangeNo,
        handleInputChangeBlur:this.handleInputChangeBlur,
        handleInputBlur:this.handleInputBlur,
        formValidate:this.formValidate,
        validate:this.validate,
        initField:this.validRules,
        initUpdataField:this.initUpdataField
      };
      return (
          // 高阶组件往基础组件中传入了一个各个属性，这是高阶组件赋予基础组件的新能力，当然，根据实际需求还可以添加更为复杂的新能力
          <Container
              ref={ref=>this.clildCom=ref}
              { ...this.props }
              actions={actions}
              state={this.state}
          >
            { this.props.children }
          </Container>
      );
    }
  };
}

export default HandleChange;