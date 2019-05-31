/**
 *   Create by Malson on 2018/4/25
 */
let common = require('@/common/common');
let http = require('@/common/http');
let Reflux = require('reflux');
let MainActions = require('../actions/MainActions');
let MainStore = Reflux.createStore({
  listenables: [MainActions],
  
  /**
   * $this 调用的this环境
   * operation  操作标记
   * 返回参数  result
   * errMsg  报错信息
   *
  */
  fireEvent: function ($this,operation,result) {
    $this.trigger({
      operation: operation,
      errMsg: result.errMsg,
      params: result.object,
    });
  },

  onRetrieve: function (params,startPage,pageSize) {
    let $this = this;
    let url = 'main/retrieve';
    // http.httpRequest()
    // common.doReteieveAjax(url, params,startPage,pageSize).then((result) => {
    //   $this.fireEvent($this,'retrieve', result);
    // }, () => {
    //   $this.fireEvent($this,'retrieve', { errMsg:'调用服务错误！'});
    // });
  },
  onRemove: function (params) {
    let $this = this;
    let url = 'main/remove';
    common.doAjax(url, params).then((result) => {
      $this.fireEvent($this,'remove', result);
    }, () => {
      $this.fireEvent($this,'remove', {errMsg:'调用服务错误！'});
    });
  },
  onAdd: function (params) {
    let $this = this;
    let url = 'main/addMain';
    common.doAjax(url, params).then((result) => {
      $this.fireEvent($this,'addMain', result);
    }, (result) => {
      $this.fireEvent($this,'addMain', {errMsg:'调用服务错误！'});
    });
  },
  onUpdate: function (params) {
    let $this = this;
    let url = 'main/update';
    common.doAjax(url, params).then((result) => {
      $this.fireEvent($this,'update', result);
    }, () => {
      $this.fireEvent($this,'update', {errMsg:'调用服务错误！'});
    });
  },
});

export default MainStore;
