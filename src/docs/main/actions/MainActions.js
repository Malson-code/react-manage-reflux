/**
 *   Create by Malson on 2018/4/25
 */

let Reflux = require('reflux');

let MainActions = Reflux.createActions([
    'retrieve',
    'remove',
    'add',
    'update'
]);

module.exports = MainActions;