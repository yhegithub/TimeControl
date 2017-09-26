"use strict";
var WheelClass=require('./WheelClass.js');
var QEvent = require('../util/EventManage.js').QEvent;
var em = require('../util/EventManage.js').EventManager;
var DateUtil = require('../util/DateUtil.js');
var MinuWheelClass = WheelClass.extend({
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
    resetTextList:function(minTime,maxTime,step,currentTime){
        this.minTime = minTime;
        this.maxTime = maxTime;
        this.timeStep = step;
        this.currentTime=currentTime;
        var textList = this.produceTextList(step);
        this._super(textList);
        this.initDefault();
    },
    produceTextList:function(step){
        var textList = [];
        var begin = 0;
        while(begin<60){
            if(begin<10){
                textList.push("0"+begin+"分");
            }else{
                textList.push(begin+"分");
            }
            begin+=step;
        }
        return textList;
    },
    initDefault:function(){
        var currentTime = this.currentTime;
        if(currentTime!=""){
            var currentDate = DateUtil.parseStrToDate(currentTime);
            this.resetPosByMinu(currentDate,true);
        }
    },
    getSelect:function(){
        var currentIndex = this.currentIndex;
        var step = this.timeStep;
        return currentIndex*step;
    },
    onCurrentIndexChange:function(){
        var event = new QEvent(QEvent.EventName.ON_MINU_CHANGE);
        em.postMsg(event);
    },
    resetPosByMinu:function(date,noExcuteChange){
        var minu = date.getMinutes();
        var index = Math.floor(minu/this.timeStep);
        if(this.currentIndex!=index){
            this.currentIndex = index;
            this.resetPos();
            if(!noExcuteChange){
                this.onCurrentIndexChange();//当滚轮变化时触发；
            }
        }
    },
    resetMinPos:function(){
        this.resetPosByMinu(this.minTime);
    },
    resetMaxPos:function(){
        this.resetPosByMinu(this.maxTime);
    },
    initListener:function(){
        this._super();
        var _this = this;
        var ctrl = this.ctrler;
        em.addEventListener(QEvent.EventName.ON_TIME_CHANGE,function(e){
            var nowSelect = ctrl.getSelectDate();
            if(nowSelect==-1){
                //立即用车
                //将当前wheel 隐藏
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
module.exports = MinuWheelClass;