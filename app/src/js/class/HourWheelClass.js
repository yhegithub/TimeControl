"use strict";
var WheelClass=require('./WheelClass.js');
var QEvent = require('../util/EventManage.js').QEvent;
var em = require('../util/EventManage.js').EventManager;
var DateUtil = require('../util/DateUtil.js');
var HourWheelClassHour = WheelClass.extend({
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
        this.minTime = minTime;
        this.maxTime = maxTime;
        this.currentTime = currentTime;
        var textList = this.produceTextList();
        this._super(textList);
        this.initDefault();
    },
    produceTextList:function(){
        var textList = [];
        for(var i=0;i<24;i++){
            if(i<10){
                textList.push("0"+i+"点");
            }else{
                textList.push(i+"点");
            }
        }
        return textList;
    },
    initDefault:function(){
        var currentTime = this.currentTime;
        if(currentTime!=""){
            var currentDate = DateUtil.parseStrToDate(currentTime);
            this.resetPosByHour(currentDate,true);
        }
    },
    getSelect:function(){
        var currentIndex = this.currentIndex;
        return currentIndex;
    },
    onCurrentIndexChange:function(){
        var event = new QEvent(QEvent.EventName.ON_HOUR_CHANGE);
        em.postMsg(event);
    },
    resetPosByHour:function(date,noExcuteChange){
        var hour = date.getHours();
        if(this.currentIndex!=hour){
            this.currentIndex = hour;
            this.resetPos();
            if(!noExcuteChange){
                this.onCurrentIndexChange();//当滚轮变化时触发；
            }
        }
    },
    resetMinPos:function(){
        this.resetPosByHour(this.minTime);
    },
    resetMaxPos:function(){
        this.resetPosByHour(this.maxTime);
    },
    initListener:function(){
        this._super();
        var _this = this;
        var ctrl = this.ctrler;
        em.addEventListener(QEvent.EventName.ON_TIME_CHANGE,function(e){
            var nowSelect = ctrl.getSelectDate();
            if(nowSelect==-1){
                //马上用车
                _this.hide();
            }else{
                _this.show();
                //如果当前所选时间小于最小时间 则需要调整
                if(DateUtil.comparerDate(_this.minTime,nowSelect)){
                    //调整小时滚轮 到最小刻度
                    _this.resetMinPos();
                }
                if(DateUtil.comparerDate(nowSelect,_this.maxTime)){
                    //调整小时滚轮 到最小刻度
                    _this.resetMaxPos();
                }
            }

        });
    }
});
module.exports = HourWheelClassHour;