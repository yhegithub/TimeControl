"use strict";
//var TimerControl = require('./TimeControl.js');
require('./TimeControl.js');
require('./BirthdayControl.js');
$(document).ready(function(){
//    console.log();
    //TimeControl.init();
     BirthdayControl.init();
    $(".test-btn").on("click",function(){
        BirthdayControl.selectDate({
            min:0,
            max:129600,
            currentShowTime:"2016-10-01 00:00",//"2016-10-28 13:29",
            pickupTime:"",//"2016-10-28 13:29",
            dropoffTime:"",//"2016-10-28 13:29",
            minAviableTime:"2010-10-28 10:00",
            maxAviableTime:"2019-10-28 10:00",
            showImmeButton:false,//是否显示立即用车
            title:"请选择出发时间",//控件提示title
            type:4,   //取还车标志1取2还3纯时间控件4生日选择
            success:function(res){
                console.log(res);
            }
        });
    });
});

