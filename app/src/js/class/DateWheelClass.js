"use strict";
var WheelClass=require('./WheelClass.js');
var DateUtil = require('../util/DateUtil.js');
var QEvent = require('../util/EventManage.js').QEvent;
var em = require('../util/EventManage.js').EventManager;
var DateWheelClass = WheelClass.extend({
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
        var now = minTime;
        function _myComparer(date1,date2){//只比较date1 date2的日期
            var maxDate = DateUtil.parseStrToDate(DateUtil.dateFormat("yyyy-MM-dd",date1));
            var nowDate = DateUtil.parseStrToDate(DateUtil.dateFormat("yyyy-MM-dd",date2));
            return DateUtil.comparerDate(maxDate,nowDate);
        }
        for(var i=0;!_myComparer(now,maxTime)&&i<365;i++){
            var fm = "MM月dd日 星期D";
            if(i==0){
                if(DateUtil.dateFormat("yyyy-MM-dd")==DateUtil.dateFormat("yyyy-MM-dd",now)){
                    fm = "MM月dd日 今天";
                }
            }
            var dateText = DateUtil.dateFormat(fm,now);
//            console.log(dateText);
            textList.push(dateText);
            now = DateUtil.dateAdd(now,24*3600*1000);
        }

        return textList;
    },

    initDefault:function(){
        var currentTime = this.currentTime;
        var currentIndex=0;
        if(currentTime!=""){
            var currentTimeDate = DateUtil.parseStrToDate(currentTime);
            var currentDay = DateUtil.getDayDate(currentTimeDate);
            var minDay = DateUtil.getDayDate(this.minTime);
            var days = (currentDay.getTime()-minDay.getTime())/(24*3600000);
            currentIndex = days;
        }
        this.currentIndex=currentIndex;
        this.resetPos();
    },
    getSelect:function(){
        var currentIndex = this.currentIndex;
        var select = DateUtil.dateAdd(this.minTime,currentIndex*24*3600000);
        return DateUtil.dateFormat("yyyy-MM-dd",select);
    },
    onCurrentIndexChange:function(){
        var event = new QEvent(QEvent.EventName.ON_DATE_CHANGE);
        em.postMsg(event);
    }
});
module.exports = DateWheelClass;