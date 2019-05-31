/**
 *   Create by Malson on 2018/1/27
 */

export const ValidRegExp = {
  notEmpty : /^.+$/,// 合法字符
  notSpecialChar : /^[A-Za-z0-9_-]+$/,// 合法字符
  number : /^\d+$/,// 数字
  endlish : /^[A-Za-z]+$/,// 纯英文
  numberEnglish : /^[A-Za-z0-9]+$/,// 英文和数字
  float : /^[+]?\d+(\.\d+)?$/,// 浮点型
  chinese : /^[\u4e00-\u9fa5]+$/,// 纯中文
  mobile : /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/,// 手机号
  tel : /^(\d{3,4}-?)?\d{7,9}$/g,// 电话
  zipCode : /^[0-9]{6}$/,// 邮政编码
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  positive:/^[1-9][0-9]+$/,//大于0的数字
  password:/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/,//6~16位字母、数字、特殊字符至少二者组合
}

export const ValidMsg = {
  notEmpty : "不能为空",
  notSpecialChar : "请输入合法字符",// 合法字符
  number : "请输入数字",// 数字
  endlish : "请输入英文",// 纯英文
  numberEnglish : "请输入英文或数字",// 英文和数字
  float : "请输入浮点数",// 浮点型
  chinese : "请输入中文",// 纯中文
  mobile : "请输入正确手机号",// 手机号
  tel : "请输入正确电话号",// 电话
  email : "请输入正确的邮箱",// 邮箱
  zipCode :"请输入正确的邮编",// 邮政编码
  password:"密码须为6~16位字母、数字、特殊字符至少二者组合!"
}