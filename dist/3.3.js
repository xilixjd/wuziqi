webpackJsonp([3],{767:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(76),u=r(a),s=n(79);t.default={namespace:"indexPage",state:{},subscriptions:{setup:function(e){var t=e.dispatch,n=e.history;n.listen(function(e){"/"===e.pathname&&t({type:"redirect"})})}},effects:{redirect:u.default.mark(function e(t,n){var r=(t.payload,n.call,n.put);return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(s.routerRedux.push("/login"));case 2:case"end":return e.stop()}},e,this)})}},e.exports=t.default}});