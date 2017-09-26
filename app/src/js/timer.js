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
            minAviableTime:"",
            success:function(res){
                console.log(res);
            }
        });
    });
});

