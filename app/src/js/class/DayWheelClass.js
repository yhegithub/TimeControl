"use strict";
var WheelClass=require('./WheelClass.js');
var QEvent = require('../util/EventManage.js').QEvent;
var em = require('../util/EventManage.js').EventManager;
var DateUtil = require('../util/DateUtil.js');
var DayWheelClass = WheelClass.extend({
    itemClassName:"car-time-minu",
    minTime:null,
    maxTime:null,
    timeStep:null,
    ctrler:null,//父级控制组件
    currentTime:"",
    ctor:function(ctrl){
        this.ctrler = ctrl;
        this._super("carTimeControlMinu");
    },
    resetTextList:function(minTime,maxTime,currentTime){
        this.currentTime=currentTime;
        var textList = this.produceTextList();
        this._super(textList);
        this.initDefault();
    },
    produceTextList:function(){
        var textList = [];
        var begin = 1;
        while(begin<32){
            if(begin<10){
                textList.push("0"+begin);
            }else{
                textList.push(begin);
            }
            begin++;
        }
        return textList;
    },
    initDefault:function(){
        var currentTime = this.currentTime;
        if(currentTime!=""){
            var currentDate = currentTime.getDate()-1;
            this.resetPosByMinu(currentDate);
        }
    },
    getSelect:function(){
        var currentIndex = this.currentIndex;
        return currentIndex+1;
    },
    onCurrentIndexChange:function(){
        var event = new QEvent(QEvent.EventName.ON_Day_CHANGE);
        em.postMsg(event);
    },
    resetPosByMinu:function(dayindex){
             this.currentIndex = dayindex;
             this.resetPos();
             this.onCurrentIndexChange();//当滚轮变化时触发；
    }
});
module.exports = DayWheelClass;