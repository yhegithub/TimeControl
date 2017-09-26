"use strict";
(function(global, factory) {
    var fa = factory();
    if (typeof define === "function") { // AMD || CMD
        if (define.amd) {
            define(function() {
                return fa;
            });
        } else if (define.cmd) {
            define(function(require, exports, module) {
                module.exports = fa;
            });
        } 
    } else if (typeof module === "object" && typeof module.exports === "object") { // commonJS
        module.exports = fa;
    } else { // global

    }
    window.BirthdayControl = fa;
}(typeof window !== "undefined" ? window : this, function() {
    require('../css/timer.less');
    var timerHtml = require('./tpl/timer.html')({});

    var DateUtil = require('./util/DateUtil.js');

    var DateWheelClass = require('./class/DateWheelClass.js');
    var HourWheelClass = require('./class/HourWheelClass.js');
    var MinuWheelClass = require('./class/MinuWheelClass.js');

    var YearWheelClass = require('./class/YearWheelClass.js');
    var MonthWheelClass = require('./class/MonthWheelClass.js');
    var DayWheelClass = require('./class/DayWheelClass.js');

    var QEvent = require('./util/EventManage.js').QEvent;
    var em = require('./util/EventManage.js').EventManager;

    var timeControlInitFlag = false;
    var BirthdayControl = {
        id:"carTimer",
        ele:null,

        options:null,
        minTime:null,//最小时间限
        maxTime:null,//最大时间限
        minAviableTime:null,//最小可选时间
        maxAviableTime:null,//最大可选时间
        step:0,//最小时间刻度分钟
        currentShowTime:"",
        pickupTime:"",
        dropoffTime:"",
        tempPickupTime:"",
        tempDropoffTime:"",
        showImmeButton:true,//是否显示马上用车
        onSelectDate:null,  //选择时间之后的回调
        type:1,
        dateControl:null,
        hourControl:null,
        minuControl:null,
        init:function(options){
            if(timeControlInitFlag){
                return;
            }
            timeControlInitFlag = true;
            this.initHtml();
            this.ele = $("#"+this.id);
            this.initListener();
        },
        initHtml:function(){
            $("body").append(timerHtml);
        },
        postTimeChangeMsg:function(){
            var event = new QEvent(QEvent.EventName.ON_TIME_CHANGE);
            em.postMsg(event);
            //this.timeChangeEvent();
        },
        initListener:function(){
            var _this = this;
            //添加对滚轮的侦听
            em.addEventListener(QEvent.EventName.ON_Year_CHANGE,function(e){
                _this.postTimeChangeMsg();
            });
            em.addEventListener(QEvent.EventName.ON_Month_CHANGE,function(e){
                _this.postTimeChangeMsg();
            });
            em.addEventListener(QEvent.EventName.ON_Day_CHANGE,function(e){
                _this.postTimeChangeMsg();
            });
            //添加对 取消 确定按钮的侦听
            $("#carTimeSure").on("click",function(){
                //隐藏当前控件 并调用传入的回调
                _this.hide();
                if(_this.onSelectDate){
                    var select = _this.getSelectDate();
                    var returnObj = {};
                    returnObj["selectUserTime"]=DateUtil.dateFormat('yyyy-MM-dd hh:mm',select);
                    _this.onSelectDate(returnObj);
                }
            });
            $("#carTimeCansel,#carTimerMask").on("click",function(){
                //直接隐藏当前控件
                _this.hide();
            });
        },

        timeChangeEvent:function(){
            var _this=this;
            var selectDate = _this.getSelectDate();
            var ptime=$('.modify-time-list .ptime');
            var rtime=$('.modify-time-list .rtime');
            var select=_this.type==1?ptime:rtime;
            var selectDateStr=DateUtil.dateFormat('yyyy-MM-dd hh:mm',selectDate);
            if(_this.type==1)
            {
             _this.tempPickupTime= selectDateStr;  
             if(selectDate.getTime()>=(DateUtil.parseStrToDate(_this.tempDropoffTime)).getTime()){
                var addedDate=DateUtil.dateAdd(selectDate,2*24*60*60*1000);
               _this.tempDropoffTime=DateUtil.dateFormat('yyyy-MM-dd hh:mm',addedDate);
              _this.updateText(rtime,addedDate);
            }
            }else{
                _this.tempDropoffTime= selectDateStr; 
            }
             _this.updateText(select,selectDate);
        },
        updateText:function(dom,date){
          dom.attr('data-time',date).find('.rtime-text')
         .text(DateUtil.dateFormat('MM月dd日 hh:mm',date));
        },
        hide:function(){
            this.ele.hide();
        },
        show:function(){
            this.ele.show();
        },

        selectDate:function(options){
            this.initOption(options);
            this.initYear();
            this.initMonth();
            this.initDay();
            this.postTimeChangeMsg();//用来调整初始化时间
            this.show();
        },
        initYear:function(){
            if(!this.yearControl){
                this.yearControl = new YearWheelClass(this);
            }
            this.yearControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.currentShowTime);
        },
        initMonth:function(){
            if(!this.monthControl){
                this.monthControl = new MonthWheelClass(this);
            }
            this.monthControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.currentShowTime);
        },
        initDay:function(){
            if(!this.dayControl){
                this.dayControl = new DayWheelClass(this);
            }
            this.dayControl.resetTextList(this.minAviableTime,this.maxAviableTime,this.currentShowTime);
        },
        initOption:function(options){
            var _this=this;
            //options min 是距离当前时间的最短可用时间 默认是0
            //max 是具体当前时间的最长可用时间 默认是1年 单位是分钟
            this.options = $.extend({
                min:5,
                max:525600,
                minDate:"",//"yyyy-MM-dd hh:mm",
                maxDate:"",
                currentShowTime:"",//"2016-10-28 13:29",
                showImmeButton:false,//是否显示立即用车
                title:"请选择时间",//控件提示title
                success:function(){},
                step:24*60//最小时间刻度
            },options);
            this.initPickupType();
            this.initCurrentShow();
           // this.initAviableDateRange();
            this.initCallBack();
             $('.modify-time-list').hide();
             $('#carTimeTile').hide();
             $('.car-title').addClass('borderbottom');
             $('.car-timer').height(210);
             $('.car-time-show>div').css('width','30%');
        },
        initPickupType:function(){
            this.type=this.options.type;
        },

        initCallBack:function(){
            this.onSelectDate = this.options.success;
        },
        initCurrentShow:function(){
            this.currentShowTime =  DateUtil.parseStrToDate(this.options.currentShowTime);
            this.minAviableTime = DateUtil.parseStrToDate(this.options.minAviableTime||'1900-01-01 00:00');
            this.maxAviableTime = DateUtil.parseStrToDate(this.options.maxAviableTime||DateUtil.dateFormat('yyyy-MM-dd hh:mm',new Date()));
            if(DateUtil.comparerDate(this.minAviableTime,this.currentShowTime)){
             this.currentShowTime =this.minAviableTime
            }
            if(DateUtil.comparerDate(this.currentShowTime,this.maxAviableTime)){
             this.currentShowTime =this.maxAviableTime
            }
        },
        getSelectDate:function(){
            //返回当前时间控件 选取的时间
            var selectYear= this.yearControl.getSelect();
            var selectMonth = this.monthControl.getSelect();
            var selectDay = this.dayControl.getSelect();
            var select = selectYear+"-"+selectMonth+"-"+selectDay+" 00:00";
            return DateUtil.parseStrToDate(select);
        }

    }

    return {
        init:function(){
            BirthdayControl.init();
        },
        selectDate:function(options){
            BirthdayControl.selectDate(options);
        },
        getSelectDate:function(){
            return BirthdayControl.getSelectDate();
        }
    };

}));