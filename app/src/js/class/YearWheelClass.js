"use strict";
var WheelClass=require('./WheelClass.js');
var DateUtil = require('../util/DateUtil.js');
var QEvent = require('../util/EventManage.js').QEvent;
var em = require('../util/EventManage.js').EventManager;
var YearWheelClass = WheelClass.extend({
    itemClassName:"car-time-date",
    minTime:null,
    maxTime:null,
    ctrler:null,//父级控制组件
    currentTime:"",
    ctor:function(ctrl){
        this.ctrler = ctrl;
        this._super("carTimeControlDate");
    },
    resetTextList:function(minTime,maxTime,currentTime){
        this.minTime = minTime;
        this.maxTime = maxTime;

        this.currentTime = currentTime;
        var textList = this.produceTextList(minTime,maxTime);
        this._super(textList);
        this.initDefault();
    },
    produceTextList:function(minTime,maxTime){
        var textList=[];
        var minYear=minTime.getFullYear();
        var maxYear=maxTime.getFullYear();
        for(var i=minYear;i<=maxYear;i++){
            textList.push(i);
        }
        return textList;
    },

    initDefault:function(){
        var currentTime = this.currentTime;
        var currentIndex=0;
        if(currentTime!=""){
            var currentYear =currentTime.getFullYear();
            var minYear = this.minTime.getFullYear();
            var days =currentYear - minYear;
            currentIndex = days;
        }
        this.currentIndex=currentIndex;
        this.resetPos();
    },
    getSelect:function(){
        return this.currentIndex+this.minTime.getFullYear();
    },
    onCurrentIndexChange:function(){
        var event = new QEvent(QEvent.EventName.ON_DATE_CHANGE);
        em.postMsg(event);
    }
});
module.exports = YearWheelClass;