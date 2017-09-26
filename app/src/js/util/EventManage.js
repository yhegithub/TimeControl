"use strict";
/**
 * 小型的事件注册 侦听的manage
 * */
//事件类
function QEvent(name){
    this.name = name;
}
QEvent.prototype={
    name:null,
    getName:function(){
        return this.name;
    }
}
QEvent.EventName={
    "ON_DATE_CHANGE":"onDateChange",
    "ON_HOUR_CHANGE":"onHourChange",
    "ON_MINU_CHANGE":"onMinuChange",
    "ON_TIME_CHANGE":"onTimeChange",
    "ON_Year_CHANGE":"onYearChange",
    "ON_Month_CHANGE":"onMonthChange",
    "ON_Day_CHANGE":"onDayChange"
}


var EventManager = {
    eventMap:{},

    addEventListener:function(eventName,callback){
        if(callback){
            var eventMap = this.eventMap;
            if(!eventMap[eventName]){
                eventMap[eventName] = [];
            }
            eventMap[eventName].push(callback);
        }
    },
    postMsg:function(event){//event 是一个事件对象
        var eventName = event.getName();
        var eventMap = this.eventMap;
        if(eventMap[eventName]){
            var list = eventMap[eventName];
            var itemCall = list[0];
            for(var i=0;itemCall;itemCall=list[++i]){
                itemCall(event);
            }
        }
    }
}

module.exports = {
    EventManager:EventManager,
    QEvent:QEvent
};