!function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){i(1)},function(t,e,i){"use strict";i(2),i(15),$(document).ready(function(){TimeControl.init(),$(".test-btn").on("click",function(){TimeControl.selectDate({min:0,max:129600,currentShowTime:"2016-10-01 00:00",pickupTime:"2017-10-05 10:00",dropoffTime:"2017-10-10 10:00",minAviableTime:"",success:function(t){console.log(t)}})})})},function(t,e,i){var n;!function(r,o){var a=o();n=function(){return a}.call(e,i,e,t),!(void 0!==n&&(t.exports=n)),window.TimeControl=a}("undefined"!=typeof window?window:this,function(){i(3);var t=i(7)({}),e=i(8),n=i(9),r=i(13),o=i(14),a=i(12).QEvent,s=i(12).EventManager,c=!1,m={id:"carTimer",ele:null,options:null,minTime:null,maxTime:null,minAviableTime:null,maxAviableTime:null,step:0,currentShowTime:"",pickupTime:"",dropoffTime:"",tempPickupTime:"",tempDropoffTime:"",showImmeButton:!0,onSelectDate:null,type:1,dateControl:null,hourControl:null,minuControl:null,init:function(t){c||(c=!0,this.initHtml(),this.ele=$("#"+this.id),this.initListener())},initHtml:function(){$("body").append(t)},postTimeChangeMsg:function(){var t=new a(a.EventName.ON_TIME_CHANGE);s.postMsg(t),this.timeChangeEvent()},initListener:function(){var t=this;s.addEventListener(a.EventName.ON_DATE_CHANGE,function(e){t.postTimeChangeMsg()}),s.addEventListener(a.EventName.ON_HOUR_CHANGE,function(e){t.postTimeChangeMsg()}),s.addEventListener(a.EventName.ON_MINU_CHANGE,function(e){t.postTimeChangeMsg()}),$("#carTimeSure").on("click",function(){if(t.hide(),t.onSelectDate){var i=t.getSelectDate(),n={},r=null;i==-1?(n.DateType=-1,r=e.now()):(n.DateType=1,r=t.getSelectDate()),n.selectedTimeInterval=r.getTime()/1e3,n.selectUserTime=e.dateFormat("yyyy-MM-dd hh:mm",r),n.pickupTime=e.dateFormat("yyyy-MM-dd hh:mm",e.parseStrToDate($(".ptime").data("time"))),n.dropoffTime=e.dateFormat("yyyy-MM-dd hh:mm",e.parseStrToDate($(".rtime").data("time"))),t.onSelectDate(n)}}),$("#carTimeCansel,#carTimerMask").on("click",function(){t.hide()}),$(".modify-time-list li").on("click",function(){var i=$(this),n=i.data("type");t.type=n;var r=1==n?t.tempPickupTime:t.tempDropoffTime;1==t.type?t.initAviableDateRange():t.minAviableTime=e.dateAdd(e.parseStrToDate(t.tempPickupTime),36e5),i.addClass("on").siblings().removeClass("on"),t.updateText(i,e.parseStrToDate(r)),t.currentShowTime=e.dateFormat("yyyy-MM-dd hh:mm",e.parseStrToDate(r)),t.initDate(),t.initHour(),t.initMinu(),t.postTimeChangeMsg(),t.show()})},timeChangeEvent:function(){var t=this,i=t.getSelectDate(),n=$(".modify-time-list .ptime"),r=$(".modify-time-list .rtime"),o=1==t.type?n:r,a=e.dateFormat("yyyy-MM-dd hh:mm",i);if(1==t.type){if(t.tempPickupTime=a,i.getTime()>=e.parseStrToDate(t.tempDropoffTime).getTime()){var s=e.dateAdd(i,1728e5);t.tempDropoffTime=e.dateFormat("yyyy-MM-dd hh:mm",s),t.updateText(r,s)}}else t.tempDropoffTime=a;t.updateText(o,i),t.initTitle()},updateText:function(t,i){t.attr("data-time",i).find(".rtime-text").text(e.dateFormat("MM月dd日 hh:mm",i))},hide:function(){this.ele.hide()},show:function(){this.ele.show()},selectDate:function(t){this.initOption(t),this.initDate(),this.initHour(),this.initMinu(),this.postTimeChangeMsg(),this.show()},initDate:function(){this.dateControl||(this.dateControl=new n(this)),this.dateControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.showImmeButton,this.currentShowTime)},initHour:function(){this.hourControl||(this.hourControl=new r(this)),this.hourControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.currentShowTime)},initMinu:function(){this.minuControl||(this.minuControl=new o(this)),this.minuControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.step,this.currentShowTime)},initOption:function(t){var e=this;this.options=$.extend({min:5,max:525600,minDate:"",maxDate:"",currentShowTime:"",showImmeButton:!1,title:"请选择时间",success:function(){},step:30},t),this.initPickupType(),this.initStep(),this.initImmeButtonFlag(),this.initCurrentShow(),this.initDateRange(),this.initAviableDateRange(),this.initCallBack(),3==e.type?($(".modify-time-list").hide(),$("#carTimeTile").hide(),$(".car-title").addClass("borderbottom"),$(".car-timer").height(210)):$(1==e.type?".ptime":".rtime").click().click()},initPickupType:function(){this.type=this.options.type},initCallBack:function(){this.onSelectDate=this.options.success},initTitle:function(){var t=e.parseStrToDate(this.tempDropoffTime).getTime()-e.parseStrToDate(this.tempPickupTime).getTime(),i=Math.ceil(t/864e5),n="<span>共"+i+"天</span>",r="";t%864e5/36e5<=4&&t%864e5/36e5>0&&(r="不满24小时按1天计算"),r?($("#carTimeTile").removeClass("messtip").addClass("messtipred"),n+="不满24小时算为1天"):$("#carTimeTile").addClass("messtip").removeClass("messtipred"),$("#carTimeTile").html(n),this.updateText(this.ele.find(".ptime"),e.parseStrToDate(this.tempPickupTime)),this.updateText(this.ele.find(".rtime"),e.parseStrToDate(this.tempDropoffTime))},initStep:function(){this.step=this.options.step},initImmeButtonFlag:function(){this.showImmeButton=this.options.showImmeButton},initCurrentShow:function(){this.currentShowTime=this.options.currentShowTime;var t=new Date;this.options.pickupTime=this.options.pickupTime?this.options.pickupTime:e.dateFormat("yyyy-MM-dd",e.dateAdd(t,6048e5))+" 10:00",this.tempPickupTime=this.pickupTime=this.pickupTime=this.options.pickupTime,this.tempDropoffTime=this.dropoffTime=this.options.dropoffTime?this.options.dropoffTime:e.dateFormat("yyyy-MM-dd hh:mm",e.dateAdd(e.parseStrToDate(this.options.pickupTime),6048e5)),this.currentShowTime=3==this.options.type?this.options.currentShowTime:1==this.options.type?this.options.pickupTime:this.options.dropoffTime},initDateRange:function(){var t=this.options;if(""!=t.minDate&&""!=t.maxDate)this.maxTime=e.parseStrToDate(t.maxDate),this.minTime=e.parseStrToDate(t.minDate);else{var i=e.now();this.minTime=e.dateAdd(i,6e4*t.min),this.maxTime=e.dateAdd(i,6e4*t.max)}},initAviableDateRange:function(){var t=this.minTime,i=this.step,n=t.getMinutes(),r=(Math.floor((n-1)/i)+1)*i;this.minAviableTime=e.dateAdd(t,6e4*(r-n));var o=this.maxTime,a=o.getMinutes(),s=Math.floor(a/i)*i;this.maxAviableTime=e.dateAdd(o,6e4*(s-a))},getSelectDate:function(){var t=this.dateControl.getSelect();if(t==-1)return-1;var i=this.hourControl.getSelect(),n=this.minuControl.getSelect(),r=t+" "+i+":"+n;return e.parseStrToDate(r)}};return{init:function(){m.init()},selectDate:function(t){m.selectDate(t)},getSelectDate:function(){return m.getSelectDate()}}})},function(t,e,i){var n=i(4);"string"==typeof n&&(n=[[t.id,n,""]]);i(6)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){e=t.exports=i(5)(),e.push([t.id,'* {\n  margin: 0;\n  padding: 0;\n}\n.cart-h-c {\n  display: -webkit-box;\n  display: -moz-box;\n  display: box;\n  box-orient: horizontal;\n  -webkit-box-orient: horizontal;\n  -moz-box-orient: horizontal;\n  -o-box-orient: horizontal;\n  box-pack: center;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -o-box-pack: center;\n  box-align: center;\n  -webkit-box-align: center;\n  -moz-box-align: center;\n  -o-box-align: center;\n}\n.cart-h-u {\n  display: -webkit-box;\n  display: -moz-box;\n  display: box;\n  box-orient: horizontal;\n  -webkit-box-orient: horizontal;\n  -moz-box-orient: horizontal;\n  -o-box-orient: horizontal;\n  box-pack: center;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -o-box-pack: center;\n  box-align: center;\n  -webkit-box-align: start;\n  -moz-box-align: start;\n  -o-box-align: start;\n}\n/*//扭曲\n.rotate3d(@x:1,@y:0,@z:0,@d:0deg){\n  -webkit-transform:rotate3d(@x,@y,@z,@d);\n  -moz-transform:rotate3d(@x,@y,@z,@d);\n  -o-transform:rotate3d(@x,@y,@z,@d);\n  transform:rotate3d(@x,@y,@z,@d);\n}*/\nbody .car-bg {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 98;\n  background: rgba(0, 0, 0, 0.7);\n}\nbody .car-timer {\n  width: 100%;\n  height: 250px;\n  position: fixed;\n  bottom: 0;\n  z-index: 99;\n  background: #fff;\n}\nbody .car-timer .car-title {\n  width: 100%;\n  height: 50px;\n  font-size: 14px;\n  color: #666;\n  position: relative;\n}\nbody .car-timer .car-title:after {\n  content: "";\n  width: 200%;\n  height: 200%;\n  left: 0;\n  top: 0;\n  border-bottom: 1px solid #eee;\n  /*border-top:1px solid #999;*/\n  display: block;\n  position: absolute;\n  -webkit-transform: scale(0.5, 0.5);\n  -moz-transform: scale(0.5, 0.5);\n  -o-transform: scale(0.5, 0.5);\n  transform: scale(0.5, 0.5);\n  z-index: 1;\n  -webkit-transform-origin: 0 0;\n  -moz-transform-origin: 0 0;\n  -o-transform-origin: 0 0;\n  transform-origin: 0 0;\n}\nbody .car-timer .car-title .car-btn-cansel {\n  position: absolute;\n  left: 0;\n  width: 60px;\n  height: 40px;\n  color: #1ba9ba;\n  z-index: 2;\n}\nbody .car-timer .car-title .car-btn-sure {\n  position: absolute;\n  right: 0;\n  width: 60px;\n  height: 40px;\n  color: #1ba9ba;\n  z-index: 2;\n}\nbody .car-timer .car-body {\n  height: 150px;\n}\nbody .car-timer .car-body .car-time-show {\n  width: 90%;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame {\n  height: 150px;\n  overflow: hidden;\n  position: relative;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .mask-up,\nbody .car-timer .car-body .car-time-show .car-time-frame .mask-down {\n  width: 100%;\n  height: 45px;\n  position: absolute;\n  z-index: 1;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .mask-up {\n  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));\n  background: linear-gradient(top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .mask-down {\n  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9));\n  background: linear-gradient(top, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9));\n  bottom: 0;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list {\n  font-size: 18px;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list .car-time-date {\n  height: 30px;\n  margin: 0 10px;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list .car-time-hour {\n  height: 30px;\n  margin: 0 25px;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list .car-time-minu {\n  height: 30px;\n  margin: 0 10px;\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list .car-time-item-currpre1 {\n  -webkit-transform: scale(0.9, 0.9);\n  -moz-transform: scale(0.9, 0.9);\n  -o-transform: scale(0.9, 0.9);\n  transform: scale(0.9, 0.9);\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list .car-time-item-currpre2 {\n  -webkit-transform: scale(0.8, 0.8);\n  -moz-transform: scale(0.8, 0.8);\n  -o-transform: scale(0.8, 0.8);\n  transform: scale(0.8, 0.8);\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list .car-time-item-currnext1 {\n  -webkit-transform: scale(0.9, 0.9);\n  -moz-transform: scale(0.9, 0.9);\n  -o-transform: scale(0.9, 0.9);\n  transform: scale(0.9, 0.9);\n}\nbody .car-timer .car-body .car-time-show .car-time-frame .car-time-list .car-time-item-currnext2 {\n  -webkit-transform: scale(0.8, 0.8);\n  -moz-transform: scale(0.8, 0.8);\n  -o-transform: scale(0.8, 0.8);\n  transform: scale(0.8, 0.8);\n}\n.modify-time-list {\n  height: 50px;\n  overflow: hidden;\n}\n.modify-time-list li {\n  display: inline-block;\n  width: 50%;\n  text-align: center;\n  float: left;\n  height: auto;\n  padding: 8px 0;\n  line-height: 1;\n  background-color: #ececec;\n  color: #848a8f;\n}\n.modify-time-list .hd {\n  font-size: 12px;\n  padding-bottom: 5px;\n}\n.modify-time-list .ptime-text,\n.modify-time-list .rtime-text {\n  font-size: 15px;\n}\n.modify-time-list li.on {\n  background-color: #1ba9ba;\n  color: #F5F5F5;\n}\n.modify-time-list li.on .ptime-text,\n.modify-time-list li.on .rtime-text {\n  color: #f5f5f5;\n}\n.messtipred {\n  color: #ff4646;\n  padding: 7px 0;\n  font-size: 12px;\n  line-height: 12px;\n}\n.messtipred span {\n  display: block;\n  padding-bottom: 5px;\n  font-size: 17px;\n}\n.messtip {\n  color: #1E1D1D;\n  font-size: 17px;\n}\n.borderbottom {\n  border-bottom: 1px #ececec solid;\n}\n',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(n[o]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&n[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="("+a[2]+") and ("+i+")"),t.push(a))}},t}},function(t,e,i){function n(t,e){for(var i=0;i<t.length;i++){var n=t[i],r=d[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(m(n.parts[o],e))}else{for(var a=[],o=0;o<n.parts.length;o++)a.push(m(n.parts[o],e));d[n.id]={id:n.id,refs:1,parts:a}}}}function r(t){for(var e=[],i={},n=0;n<t.length;n++){var r=t[n],o=r[0],a=r[1],s=r[2],c=r[3],m={css:a,media:s,sourceMap:c};i[o]?i[o].parts.push(m):e.push(i[o]={id:o,parts:[m]})}return e}function o(t,e){var i=v(),n=y[y.length-1];if("top"===t.insertAt)n?n.nextSibling?i.insertBefore(e,n.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),y.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");i.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",o(t,e),e}function c(t){var e=document.createElement("link");return e.rel="stylesheet",o(t,e),e}function m(t,e){var i,n,r;if(e.singleton){var o=x++;i=T||(T=s(e)),n=u.bind(null,i,o,!1),r=u.bind(null,i,o,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=c(e),n=l.bind(null,i),r=function(){a(i),i.href&&URL.revokeObjectURL(i.href)}):(i=s(e),n=h.bind(null,i),r=function(){a(i)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else r()}}function u(t,e,i,n){var r=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function h(t,e){var i=e.css,n=e.media;if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}function l(t,e){var i=e.css,n=e.sourceMap;n&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var r=new Blob([i],{type:"text/css"}),o=t.href;t.href=URL.createObjectURL(r),o&&URL.revokeObjectURL(o)}var d={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},f=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=p(function(){return document.head||document.getElementsByTagName("head")[0]}),T=null,x=0,y=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=f()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var i=r(t);return n(i,e),function(t){for(var o=[],a=0;a<i.length;a++){var s=i[a],c=d[s.id];c.refs--,o.push(c)}if(t){var m=r(t);n(m,e)}for(var a=0;a<o.length;a++){var c=o[a];if(0===c.refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete d[c.id]}}}};var g=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e='<div class="car-timer-frame" id="carTimer" style="display:none;"> <div class="car-bg" id="carTimerMask"></div> <div class="car-timer" > <div class="car-title cart-h-c"> <div class="car-btn-cansel cart-h-c" style="font-size: 17px;padding-top:7px;" id="carTimeCansel">取消</div> <div class="car-btn-sure cart-h-c" style="font-size: 17px;padding-top:7px;" id="carTimeSure">确定</div> <p class="messtip" id="carTimeTile" style="width:98%;text-align:center"></p> </div> <ul class="modify-time-list"> <li data-type="1" class="ptime on"> <p class="hd">取车时间</p><p class="rtime-text"></p> </li> <li data-type="2" class="rtime"><p class="hd">还车时间</p><p class="rtime-text"></p> </li> </ul> <div class="car-body cart-h-c"> <div class="car-time-show cart-h-u"> <div class="car-time-frame" id="carTimeControlDate"> <div class="mask-up" style="height:50px"></div> <div class="mask-down" style="height:70px"></div> <div class="car-time-list"> </div> </div> <div class="car-time-frame" id="carTimeControlHour"> <div class="mask-up" style="height:50px"></div> <div class="mask-down" style="height:70px"></div> <div class="car-time-list"> </div> </div> <div class="car-time-frame" id="carTimeControlMinu"> <div class="mask-up" style="height:50px"></div> <div class="mask-down" style="height:70px"></div> <div class="car-time-list"> </div> </div> </div> </div> </div></div>';return e}},function(t,e){var i={now:function(){return new Date},comparerDate:function(t,e){var i=t.getTime(),n=e.getTime();return i>n},getDayDate:function(t){var e=this.dateFormat("yyyy-MM-dd",t);return this.parseStrToDate(e)},parseStrToDate:function(t){var e=new Date(t.replace(/-/g,"/"));return e},dateAdd:function(t,e){if(t){if("Invalid Date"==t)return"";var i=t.getTime(),n=new Date;return n.setTime(i+e),n}},dateWeekDay:function(t){var e=["日","一","二","三","四","五","六"];return e[t.getDay()]},dateFormat:function(t,e){e||(e=this.now());var i={"M+":e.getMonth()+1,"d+":e.getDate(),"D+":this.dateWeekDay(e),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in i)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[n]:("00"+i[n]).substr((""+i[n]).length)));return t}};t.exports=i},function(t,e,i){"use strict";var n=i(10),r=i(8),o=i(12).QEvent,a=i(12).EventManager,s=n.extend({itemClassName:"car-time-date",minTime:null,maxTime:null,ctrler:null,isLiji:!1,currentTime:"",ctor:function(t){this.ctrler=t,this._super("carTimeControlDate")},resetTextList:function(t,e,i,n){this.minTime=t,this.maxTime=e,this.isLiji=i,this.currentTime=n;var r=this.produceTextList(t,e,i);this._super(r),this.initDefault()},produceTextList:function(t,e,i){function n(t,e){var i=r.parseStrToDate(r.dateFormat("yyyy-MM-dd",t)),n=r.parseStrToDate(r.dateFormat("yyyy-MM-dd",e));return r.comparerDate(i,n)}var o=[],a=t;i&&o.push("马上用车");for(var s=0;!n(a,e)&&s<365;s++){var c="MM月dd日 星期D";0==s&&r.dateFormat("yyyy-MM-dd")==r.dateFormat("yyyy-MM-dd",a)&&(c="MM月dd日 今天");var m=r.dateFormat(c,a);o.push(m),a=r.dateAdd(a,864e5)}return o},initDefault:function(){var t=this.currentTime,e=0;if(""!=t){var i=r.parseStrToDate(t),n=r.getDayDate(i),o=r.getDayDate(this.minTime),a=(n.getTime()-o.getTime())/864e5;e=a}this.isLiji&&e++,this.currentIndex=e,this.resetPos()},getSelect:function(){var t=this.currentIndex;if(this.isLiji){if(0==t)return-1;t--}var e=r.dateAdd(this.minTime,24*t*36e5);return r.dateFormat("yyyy-MM-dd",e)},onCurrentIndexChange:function(){var t=new o(o.EventName.ON_DATE_CHANGE);a.postMsg(t)}});t.exports=s},function(t,e,i){"use strict";var n=i(11),r=n.extend({id:null,ele:null,elList:null,textList:[],currentText:"",currentIndex:0,itemClassName:"",step:30,skew:45,stopMoveFlag:!1,ctor:function(t){this.init(t)},init:function(t){if(!t)throw"wheelClass need a dom id";if(this.id=t,this.ele=$("#"+t),0==this.ele.length)throw"the id dom is not exist!";this.elList=this.ele.find(".car-time-list"),this.initListener()},resetTextList:function(t,e){if(!t)throw"wheelClass need a array of text!";this.textList=t,e&&(this.currentText=e),this.initList(),this.resetPos()},initList:function(){var t=this.currentText,e=this.elList,i=this.textList;e.html("");for(var n=i[0],r=0;n;n=i[++r])n==t&&(this.currentIndex=r),e.append('<div class="'+this.itemClassName+' cart-h-c">'+n+"</div>");this.currentText=i[this.currentIndex]},resetPos:function(t,e,i){var n=0;"undefined"==typeof t&&(t=0,n=.3);var r=this;this._cacularNowPos(t,function(o,a){if(r._transLateTo(-o,n),r.adjustStyle(t),e||i&&a){var s=r._cacularNowIndex(t);r.currentIndex=s,r.resetPos(),r.onCurrentIndexChange()}})},adjustStyle:function(t){var e=this._cacularNowIndex(t);this._clearStyle(),this._addClassByIndex(e-1,"car-time-item-currpre1"),this._addClassByIndex(e-2,"car-time-item-currpre2"),this._addClassByIndex(e-3,"car-time-item-currpre2"),this._addClassByIndex(e+1,"car-time-item-currnext1"),this._addClassByIndex(e+2,"car-time-item-currnext2"),this._addClassByIndex(e+3,"car-time-item-currnext2")},_clearStyle:function(){this.ele.find(".car-time-item-currpre1").removeClass("car-time-item-currpre1"),this.ele.find(".car-time-item-currpre2").removeClass("car-time-item-currpre2"),this.ele.find(".car-time-item-currnext1").removeClass("car-time-item-currnext1"),this.ele.find(".car-time-item-currnext2").removeClass("car-time-item-currnext2")},_addClassByIndex:function(t,e){t>=0&&t<this.textList.length&&this.ele.find("."+this.itemClassName).eq(t).addClass(e)},onCurrentIndexChange:function(){},_cacularNowIndex:function(t){var e=this.textList,i=this.currentIndex,n=this.step;return i-=Math.floor(t/n+.5),i<0&&(i=0),i>e.length-1&&(i=e.length-1),i},_cacularNowPos:function(t,e){var i=this.step,n=this.currentIndex,r=n*i-this.skew-t,o=this.textList,a=o.length+2,s=a*i-this.skew,c=!1;r>s&&(r=s,this.stopBufferMove(),c=!0),r<-2*this.skew&&(r=-2*this.skew,this.stopBufferMove(),c=!0),e&&e(r,c)},_transLateTo:function(t,e){var i=this.elList;i.css({"-webkit-transform":"translate3d(0,"+t+"px,0)","-moz-transform":"translate3d(0,"+t+"px,0)","-o-transform":"translate3d(0,"+t+"px,0)",transform:"translate3d(0,"+t+"px,0)","-webkit-transition-duration":e+"s","-moz-transition-duration":e+"s","-o-transition-duration":e+"s","transition-duration":e+"s"})},initListener:function(){var t=this.ele,e=t[0],i={},n={},r={},o=this,a=0,s=0,c=0;e.addEventListener("touchstart",function(t){var e=t.touches[0];i={x:e.pageX,y:e.pageY},a=(new Date).getTime(),t.stopPropagation(),t.preventDefault()},!1),e.addEventListener("touchmove",function(t){var e=t.touches[0],r=n||i;n={x:e.pageX,y:e.pageY};var m=n.y-i.y;o.resetPos(m),s=(new Date).getTime(),c=(n.y-r.y)/(s-a),a=s,t.stopPropagation(),t.preventDefault()},!1),e.addEventListener("touchend",function(t){var e=t.changedTouches[0];r={x:e.pageX,y:e.pageY};var a=r.y-i.y;o.bufferMove(a,c),n=null,i=null,r=null,t.stopPropagation(),t.preventDefault()},!1)},stopBufferMove:function(){this.stopMoveFlag=!0},bufferMove:function(t,e){this.stopMoveFlag=!1,this._move(0,e,t)},_move:function(t,e,i){var n=.005,r=Math.abs(e)-t*n;r<0&&(r=0);var o=(e*e-r*r)/2/n,a=i;0!=e&&(a=i+e/Math.abs(e)*o),this.resetPos(a,0==r,!0);var s=this;0!=r&&(this.stopMoveFlag?this.stopMoveFlag=!1:setTimeout(function(){s._move(t+20,e,i)},20))},hide:function(){this.ele.hide()},show:function(){this.ele.show()}});t.exports=r},function(t,e){var i=function(){},n=/\b_super\b/;i.extend=function(t){function e(){this.ctor&&this.ctor.apply(this,arguments)}var r=this.prototype,o=Object.create(r),a={writable:!0,enumerable:!1,configurable:!0};e.prototype=o;for(var s=0,c=arguments.length;s<c;++s){var m=arguments[s];for(var u in m){var h="function"==typeof m[u],l="function"==typeof r[u],d=n.test(m[u]);h&&l&&d?(a.value=function(t,e){return function(){var i=this._super;this._super=r[t];var n=e.apply(this,arguments);return this._super=i,n}}(u,m[u]),Object.defineProperty(o,u,a)):h?(a.value=m[u],Object.defineProperty(o,u,a)):o[u]=m[u]}}return e.extend=i.extend,e},t.exports=i},function(t,e){"use strict";function i(t){this.name=t}i.prototype={name:null,getName:function(){return this.name}},i.EventName={ON_DATE_CHANGE:"onDateChange",ON_HOUR_CHANGE:"onHourChange",ON_MINU_CHANGE:"onMinuChange",ON_TIME_CHANGE:"onTimeChange",ON_Year_CHANGE:"onYearChange",ON_Month_CHANGE:"onMonthChange",ON_Day_CHANGE:"onDayChange"};var n={eventMap:{},addEventListener:function(t,e){if(e){var i=this.eventMap;i[t]||(i[t]=[]),i[t].push(e)}},postMsg:function(t){var e=t.getName(),i=this.eventMap;if(i[e])for(var n=i[e],r=n[0],o=0;r;r=n[++o])r(t)}};t.exports={EventManager:n,QEvent:i}},function(t,e,i){"use strict";var n=i(10),r=i(12).QEvent,o=i(12).EventManager,a=i(8),s=n.extend({itemClassName:"car-time-hour",minTime:null,maxTime:null,ctrler:null,currentTime:"",ctor:function(t){this.ctrler=t,this._super("carTimeControlHour")},resetTextList:function(t,e,i){this.minTime=t,this.maxTime=e,this.currentTime=i;var n=this.produceTextList();this._super(n),this.initDefault()},produceTextList:function(){for(var t=[],e=0;e<24;e++)e<10?t.push("0"+e+"点"):t.push(e+"点");return t},initDefault:function(){var t=this.currentTime;if(""!=t){var e=a.parseStrToDate(t);this.resetPosByHour(e,!0)}},getSelect:function(){var t=this.currentIndex;return t},onCurrentIndexChange:function(){var t=new r(r.EventName.ON_HOUR_CHANGE);o.postMsg(t)},resetPosByHour:function(t,e){var i=t.getHours();this.currentIndex!=i&&(this.currentIndex=i,this.resetPos(),e||this.onCurrentIndexChange())},resetMinPos:function(){this.resetPosByHour(this.minTime)},resetMaxPos:function(){this.resetPosByHour(this.maxTime)},initListener:function(){this._super();var t=this,e=this.ctrler;o.addEventListener(r.EventName.ON_TIME_CHANGE,function(i){var n=e.getSelectDate();n==-1?t.hide():(t.show(),a.comparerDate(t.minTime,n)&&t.resetMinPos(),a.comparerDate(n,t.maxTime)&&t.resetMaxPos())})}});t.exports=s},function(t,e,i){"use strict";var n=i(10),r=i(12).QEvent,o=i(12).EventManager,a=i(8),s=n.extend({itemClassName:"car-time-minu",minTime:null,maxTime:null,timeStep:null,ctrler:null,currentTime:"",ctor:function(t){this.ctrler=t,this._super("carTimeControlMinu")},resetTextList:function(t,e,i,n){this.minTime=t,this.maxTime=e,this.timeStep=i,this.currentTime=n;var r=this.produceTextList(i);this._super(r),this.initDefault()},produceTextList:function(t){for(var e=[],i=0;i<60;)i<10?e.push("0"+i+"分"):e.push(i+"分"),i+=t;return e},initDefault:function(){var t=this.currentTime;if(""!=t){var e=a.parseStrToDate(t);this.resetPosByMinu(e,!0)}},getSelect:function(){var t=this.currentIndex,e=this.timeStep;return t*e},onCurrentIndexChange:function(){var t=new r(r.EventName.ON_MINU_CHANGE);o.postMsg(t)},resetPosByMinu:function(t,e){var i=t.getMinutes(),n=Math.floor(i/this.timeStep);this.currentIndex!=n&&(this.currentIndex=n,this.resetPos(),e||this.onCurrentIndexChange())},resetMinPos:function(){this.resetPosByMinu(this.minTime)},resetMaxPos:function(){this.resetPosByMinu(this.maxTime)},initListener:function(){this._super();var t=this,e=this.ctrler;o.addEventListener(r.EventName.ON_TIME_CHANGE,function(i){var n=e.getSelectDate();n==-1?t.hide():(t.show(),a.comparerDate(t.minTime,n)&&t.resetMinPos(),a.comparerDate(n,t.maxTime)&&t.resetMaxPos())})}});t.exports=s},function(t,e,i){var n;!function(r,o){var a=o();n=function(){return a}.call(e,i,e,t),!(void 0!==n&&(t.exports=n)),window.BirthdayControl=a}("undefined"!=typeof window?window:this,function(){i(3);var t=i(7)({}),e=i(8),n=(i(9),i(13),i(14),i(16)),r=i(17),o=i(18),a=i(12).QEvent,s=i(12).EventManager,c=!1,m={id:"carTimer",ele:null,options:null,minTime:null,maxTime:null,minAviableTime:null,maxAviableTime:null,step:0,currentShowTime:"",pickupTime:"",dropoffTime:"",tempPickupTime:"",tempDropoffTime:"",showImmeButton:!0,onSelectDate:null,type:1,dateControl:null,hourControl:null,minuControl:null,init:function(t){c||(c=!0,this.initHtml(),this.ele=$("#"+this.id),this.initListener())},initHtml:function(){$("body").append(t)},postTimeChangeMsg:function(){var t=new a(a.EventName.ON_TIME_CHANGE);s.postMsg(t)},initListener:function(){var t=this;s.addEventListener(a.EventName.ON_Year_CHANGE,function(e){t.postTimeChangeMsg()}),s.addEventListener(a.EventName.ON_Month_CHANGE,function(e){t.postTimeChangeMsg()}),s.addEventListener(a.EventName.ON_Day_CHANGE,function(e){t.postTimeChangeMsg()}),$("#carTimeSure").on("click",function(){if(t.hide(),t.onSelectDate){var i=t.getSelectDate(),n={};n.selectUserTime=e.dateFormat("yyyy-MM-dd hh:mm",i),t.onSelectDate(n)}}),$("#carTimeCansel,#carTimerMask").on("click",function(){t.hide()})},timeChangeEvent:function(){var t=this,i=t.getSelectDate(),n=$(".modify-time-list .ptime"),r=$(".modify-time-list .rtime"),o=1==t.type?n:r,a=e.dateFormat("yyyy-MM-dd hh:mm",i);if(1==t.type){if(t.tempPickupTime=a,i.getTime()>=e.parseStrToDate(t.tempDropoffTime).getTime()){var s=e.dateAdd(i,1728e5);t.tempDropoffTime=e.dateFormat("yyyy-MM-dd hh:mm",s),t.updateText(r,s)}}else t.tempDropoffTime=a;t.updateText(o,i)},updateText:function(t,i){t.attr("data-time",i).find(".rtime-text").text(e.dateFormat("MM月dd日 hh:mm",i))},hide:function(){this.ele.hide()},show:function(){this.ele.show()},selectDate:function(t){this.initOption(t),this.initYear(),this.initMonth(),this.initDay(),this.postTimeChangeMsg(),this.show()},initYear:function(){this.yearControl||(this.yearControl=new n(this)),this.yearControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.currentShowTime)},initMonth:function(){this.monthControl||(this.monthControl=new r(this)),this.monthControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.currentShowTime)},initDay:function(){this.dayControl||(this.dayControl=new o(this)),this.dayControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.currentShowTime)},initOption:function(t){this.options=$.extend({min:5,max:525600,minDate:"",maxDate:"",currentShowTime:"",showImmeButton:!1,title:"请选择时间",success:function(){},step:1440},t),this.initPickupType(),this.initCurrentShow(),this.initCallBack(),$(".modify-time-list").hide(),$("#carTimeTile").hide(),$(".car-title").addClass("borderbottom"),$(".car-timer").height(210),$(".car-time-show>div").css("width","30%")},initPickupType:function(){this.type=this.options.type},initCallBack:function(){this.onSelectDate=this.options.success},initCurrentShow:function(){this.currentShowTime=e.parseStrToDate(this.options.currentShowTime),this.minAviableTime=e.parseStrToDate(this.options.minAviableTime||"1900-01-01 00:00"),this.maxAviableTime=e.parseStrToDate(this.options.maxAviableTime||e.dateFormat("yyyy-MM-dd hh:mm",new Date)),e.comparerDate(this.minAviableTime,this.currentShowTime)&&(this.currentShowTime=this.minAviableTime),e.comparerDate(this.currentShowTime,this.maxAviableTime)&&(this.currentShowTime=this.maxAviableTime)},getSelectDate:function(){var t=this.yearControl.getSelect(),i=this.monthControl.getSelect(),n=this.dayControl.getSelect(),r=t+"-"+i+"-"+n+" 00:00";return e.parseStrToDate(r)}};return{init:function(){m.init()},selectDate:function(t){m.selectDate(t)},getSelectDate:function(){return m.getSelectDate()}}})},function(t,e,i){"use strict";var n=i(10),r=(i(8),i(12).QEvent),o=i(12).EventManager,a=n.extend({itemClassName:"car-time-date",minTime:null,maxTime:null,ctrler:null,currentTime:"",ctor:function(t){this.ctrler=t,this._super("carTimeControlDate")},resetTextList:function(t,e,i){this.minTime=t,this.maxTime=e,this.currentTime=i;var n=this.produceTextList(t,e);this._super(n),this.initDefault()},produceTextList:function(t,e){for(var i=[],n=t.getFullYear(),r=e.getFullYear(),o=n;o<=r;o++)i.push(o);return i},initDefault:function(){var t=this.currentTime,e=0;if(""!=t){var i=t.getFullYear(),n=this.minTime.getFullYear(),r=i-n;e=r}this.currentIndex=e,this.resetPos()},getSelect:function(){return this.currentIndex+this.minTime.getFullYear()},onCurrentIndexChange:function(){var t=new r(r.EventName.ON_DATE_CHANGE);o.postMsg(t)}});t.exports=a},function(t,e,i){"use strict";var n=i(10),r=i(12).QEvent,o=i(12).EventManager,a=(i(8),n.extend({itemClassName:"car-time-hour",minTime:null,
maxTime:null,ctrler:null,currentTime:"",ctor:function(t){this.ctrler=t,this._super("carTimeControlHour")},resetTextList:function(t,e,i){this.currentTime=i;var n=this.produceTextList();this._super(n),this.initDefault()},produceTextList:function(){for(var t=[],e=1;e<13;e++)e<10?t.push("0"+e):t.push(e);return t},initDefault:function(){var t=this.currentTime;if(""!=t){var e=t.getMonth();this.resetPosByMonth(e)}},getSelect:function(){var t=this.currentIndex;return t+1},onCurrentIndexChange:function(){var t=new r(r.EventName.ON_Month_CHANGE);o.postMsg(t)},resetPosByMonth:function(t){this.currentIndex=t,this.resetPos(),this.onCurrentIndexChange()}}));t.exports=a},function(t,e,i){"use strict";var n=i(10),r=i(12).QEvent,o=i(12).EventManager,a=(i(8),n.extend({itemClassName:"car-time-minu",minTime:null,maxTime:null,timeStep:null,ctrler:null,currentTime:"",ctor:function(t){this.ctrler=t,this._super("carTimeControlMinu")},resetTextList:function(t,e,i){this.currentTime=i;var n=this.produceTextList();this._super(n),this.initDefault()},produceTextList:function(){for(var t=[],e=1;e<32;)e<10?t.push("0"+e):t.push(e),e++;return t},initDefault:function(){var t=this.currentTime;if(""!=t){var e=t.getDate()-1;this.resetPosByMinu(e)}},getSelect:function(){var t=this.currentIndex;return t+1},onCurrentIndexChange:function(){var t=new r(r.EventName.ON_Day_CHANGE);o.postMsg(t)},resetPosByMinu:function(t){this.currentIndex=t,this.resetPos(),this.onCurrentIndexChange()}}));t.exports=a}]);