"use strict";
//var TimerControl = require('./TimeControl.js');
require('./TimeControl.js');
$(document).ready(function(){
//    console.log();
    TimeControl.init();

    $(".test-btn").on("click",function(){
        TimeControl.selectDate({
            min:0,
            max:129600,
            currentShowTime:"2017-11-08 13:30",//"2016-10-28 13:29",
            pickupTime:"",//"2016-10-28 13:29",
            dropoffTime:"",//"2016-10-28 13:29",
            showImmeButton:false,//是否显示立即用车
            title:"请选择出发时间",//控件提示title
            type:3,   //取还车标志1取2还
            success:function(res){
                console.log(res);
            }
        });
    });
});

