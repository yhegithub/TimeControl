var DateUtil = {
    //其实是获取端时间
    now:function(){
        return new Date();
    },
    //两个时间的差（天数）
    /*dateDiff:function(date1，date2){
     var delaysTime = date1.getTime() - date2.getTime();
     return Math.ceil(delaysTime / (1000 * 60 * 60 * 24));
    },*/
    //两个时间作比较 前者>后者返回true
    comparerDate:function(date1,date2){
        var time1 = date1.getTime();
        var time2 = date2.getTime();
        return time1>time2;
    },
    getDayDate:function(date){
        var dateStr = this.dateFormat("yyyy-MM-dd",date);
        return this.parseStrToDate(dateStr);
    },
    //将字符串转为时间类型
    parseStrToDate:function(dateStr){
        var date = new Date(dateStr.replace(/-/g,"/"));
        return date;
    },
    //已当前时间为基准 加减时间
    dateAdd:function(date,nms){
        if(!date)return;
        if(date=="Invalid Date"){
            return "";
        }
        var time = date.getTime();
        var newDate = new Date();
        newDate.setTime(time+nms);
        return newDate;
    },
    //返回周几
    dateWeekDay:function(date){
        var weekDay = ["日","一","二","三","四","五","六"];
        return weekDay[date.getDay()];
    },
    //将时间转为格式化字符串
    dateFormat:function(fmt,date){
        if(!date){
            date = this.now();
        }
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "D+": this.dateWeekDay(date),
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
};
module.exports = DateUtil;