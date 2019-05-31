/**
 *   Create by Malson on 2018/4/25
 */
import common from '../../../common/common';
let Reflux = require('reflux');
let LogActions = require('../actions/LogActions');
export default Reflux.createStore({
  listenables: [LogActions],
  
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
    // MsgActions.showError('address', operation, errMsg);
  },

  onLogin: function (params) {
    let $this = this;
    let url = 'login';
    common.doAjax(url, params).then((result) => {
      $this.fireEvent($this,'login', result);
    }, (errMsg) => {
      $this.fireEvent($this,'login', {errMsg});
    });
  },
});