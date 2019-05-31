/*
    http请求
*/
import axios from 'axios';

export default {
  /**
   *  ajax请求  封装
   *  主要分为  doAjax(正常ajax  Post 请求)
   *            doRetrieveAjax  (分页查询)
  */
 requestBody(params){
    let paramsBody = {
      term:'17ESDje12',//标志号
      object:params
    };
    return JSON.stringify(paramsBody);
  },
  initrequestUrl(url){
    //参数检验
    let pre = window.location.origin;
      return pre+'/manage_s/'+url;
  },
  /**
   *  ajax请求
  */
  httpRequest(url,params){
    let promise = new Promise((resolve,reject)=>{
      let requestParams = this.requestBody(params);
      let requestUrl = this.initrequestUrl(url);
    /*
        利用fetch进行数据请求
    */
    //   let options = {
    //     method:'POST',
    //     credentials: 'include',//带cookie
    //     body:requestParams
    //   };
    //   fetch(requestUrl,options).then(response=>{
    //     if(response.ok) {
    //       return response.json();
    //     }
    //     throw new Error();
    //   }).then(data=>resolve(data)).catch(()=>{
    //     reject('调用服务错误！')
    //   });
      axios({
          url:requestUrl,
          method:'post',
          data:requestParams,
      }).then(res=>{
        console.log(res);
      })
    });
    return promise;
  },
}

