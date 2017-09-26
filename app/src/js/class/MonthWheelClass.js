"use strict";
var WheelClass=require('./WheelClass.js');
var QEvent = require('../util/EventManage.js').QEvent;
var em = require('../util/EventManage.js').EventManager;
var DateUtil = require('../util/DateUtil.js');
var MonthWheelClass = WheelClass.extend({
    itemClassName:"car-time-hour",
    minTime:null,
    maxTime:null,
    ctrler:null,//父级控制组件
    currentTime:"",
    ctor:function(ctrl){
        this.ctrler = ctrl;
        this._super("carTimeControlHour");
    },
    resetTextList:function(minTime,maxTime,currentTime){
        this.currentTime = currentTime;
        var textList = this.produceTextList();
        this._super(textList);
        this.initDefault();
    },
    produceTextList:function(){
        var textList = [];
        for(var i=1;i<13;i++){
            if(i<10){
                textList.push("0"+i);
            }else{
                textList.push(i);
            }
        }
        return textList;
    },
    initDefault:function(){
        var currentTime = this.currentTime;
        if(currentTime!=""){
            var currentMonth = currentTime.getMonth();
            this.resetPosByMonth(currentMonth);
        }
    },
    getSelect:function(){
        var currentIndex = this.currentIndex;
        return currentIndex+1;
    },
    onCurrentIndexChange:function(){
        var event = new QEvent(QEvent.EventName.ON_Month_CHANGE);
        em.postMsg(event);
    },
    resetPosByMonth:function(currentMonth){
            this.currentIndex = currentMonth;
            this.resetPos();
            this.onCurrentIndexChange();//当滚轮变化时触发；
    }
});
module.exports = MonthWheelClass;