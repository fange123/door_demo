$(function() {

});
function showFullAddr(that){
    var isOwn = $("#isOwn").val();
    // var intalled = $(that).attr("data-val");
    var intalled2 = $(that).attr("data-val2");
    if(isOwn==1){
        $(that).text(intalled2);
    }
}
function hideFullAddr(that){
    var isOwn = $("#isOwn").val();
    var intalled = $(that).attr("data-val");
    if(isOwn==1){
        $(that).text(intalled);
    }
}
function getLinkedPhoneInfo(that){
    var deviceNo = $(that).attr("data");
    if(deviceNo != ''){
        console.log(deviceNo)
        var gdFlag = $("#gdFlagHid",parent.document).val();
        var packageId = $("#packageIdHid",parent.document).val();
        var url = "SceneH5Strategy?phoneNo="+deviceNo;
        parent.location.href="SceneH5Strategy?phoneNo="+deviceNo+"&gdFlag="+gdFlag+"&packageId="+packageId;
    }
}
var yyEchart,llEchart;
function switchTab(that) {
    var index = $(".q-tabs-li").index($(that));
    $(".q-tabs-li").removeClass("q-tabs-active");
    $(that).addClass("q-tabs-active");
    $(".q-panels-pal").hide().eq(index).show();
    var echartsData = {};
    if($("#echartsData").val()){
        echartsData = JSON.parse($("#echartsData").val());
    }
    var xdata = [];
    var v_min = [];
    var f_min = [];
    var  v_rate=[];
    var  f_rate=[];
    var maxMin = 0;
    var maxRate = 0;
    var maxFmin = 0;
    if($(that).hasClass("rhTab") || $(that).hasClass("userTab")){
        // console.log(echartData,"echartData");
        for(var i=0;i<echartsData.length;i++){
            xdata.push(echartsData[i].ACCT_MON);
            v_min.push(echartsData[i].TOTAL_FEE);
            f_min.push(echartsData[i].WO_ARPU);
        }
        if($(that).hasClass("rhTab")){
            initRhEchart(xdata,f_min);
            $("#rhEchart").resize();
        }
        if($(that).hasClass("userTab")){
            initUserEchart(xdata,v_min);
            $("#userEchart").resize();
        }
    }
    if($(that).hasClass("yyCard") || $(that).hasClass("llCard")){
        var userType = $("#userType").val();
        for (var i = 0;i<v_min.length;i++){
            if(maxMin<v_min[i]){
                maxMin = v_min[i];
            }
        }
        if (userType == 1) {
            //  移网
            for (var i = 0; i < echartsData.length; i++) {
                xdata.push(echartsData[i].ACCT_MON);
                v_min.push(echartsData[i].WO_MOU);
                v_rate.push(echartsData[i].WO_CALL_RATE);
                f_min.push(echartsData[i].WO_DOU);
                f_rate.push(echartsData[i].WO_GPRS_RATE);
            }
        }else if(userType == 2){
            for (var i = 0; i < echartsData.length; i++) {
                xdata.push(echartsData[i].ACCT_MON);
                v_min.push(echartsData[i].KD_NET_DAY);
                f_min.push(echartsData[i].USE_GPRS_M);
            }
        }
        for (var i = 0;i<f_min.length;i++){
            if(maxFmin<f_min[i]){
                maxFmin = f_min[i];
            }
        }
        for (var i = 0;i<v_min.length;i++){
            if(maxMin<v_min[i]){
                maxMin = v_min[i];
            }
        }
        for (var i = 0;i<v_rate.length;i++){
            if(maxRate<v_rate[i]){
                maxRate = v_rate[i];
            }
        }
        if($(that).hasClass("yyCard")){
            initYyEchart(xdata,v_min,v_rate,userType);
            $("#yyEchart").resize();
        }
        if($(that).hasClass("llCard")){
            initLlEchart(xdata,f_min,f_rate,maxFmin,userType);
            $("#llEchart").resize();
        }
    }
}
var initRhEchart = function(xdata,f_min){
    var self = this;
    self.rhEchart = echarts.init(document.getElementById('rhEchart'), 'walden');
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'18%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xdata,
                axisTick: {
                    alignWithLabel: true,
                    show:false
                },
                axisLabel:{
                    color:'rgb(153,153,153)',
                },
                axisLine:{
                    lineStyle:{
                        color:'rgb(229,229,229)',
                    }
                }

            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'(元)',
                nameTextStyle:{
                    padding: [0,0,-5,-30],
                },
                axisLabel:{
                    color:'rgb(153,153,153)',
                }
            }
        ],
        series: [
            {
                name: '融合账户ARPU',
                type: 'bar',
                barWidth: '25%',
                data: f_min,
                itemStyle:{
                    color: 'rgb(255,169,20)',
                    barBorderRadius: 10
                }
            }
        ]
    };
    self.rhEchart.setOption(option);
    self.rhEchart.resize();
};
var initUserEchart = function(xdata,v_min){
    var self = this;
    self.userEchart = echarts.init(document.getElementById('userEchart'), 'walden');
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'18%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xdata,
                axisTick: {
                    alignWithLabel: true,
                    show:false
                },
                axisLabel:{
                    color:'rgb(153,153,153)',
                },
                axisLine:{
                    lineStyle:{
                        color:'rgb(229,229,229)',
                    }
                }

            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'(元)',
                nameTextStyle:{
                    padding: [0,0,-5,-30],
                },
                axisLabel:{
                    color:'rgb(153,153,153)',
                }
            }
        ],
        series: [
            {
                name: '用户ARPU',
                type: 'bar',
                barWidth: '25%',
                data: v_min,
                itemStyle:{
                    color: 'rgb(255,169,20)',
                    barBorderRadius: 10
                }
            }
        ]
    };
    self.userEchart.setOption(option);
    self.userEchart.resize();
};


var initYyEchart = function(xdata,v_min,v_rate,userType) {
    self.yyEchart = echarts.init(document.getElementById('yyEchart'), 'walden');

    if (userType == 1) {
        //  移网
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                top: 10,
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
                data: ['语音(分钟)', '语音饱和度(%)'],
            },
            xAxis: [{
                type: 'category',
                data: xdata,
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLabel: {
                    color: 'rgb(153,153,153)',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(229,229,229)',
                    }
                }

            }],
            yAxis: [{
                type: 'value',
                splitLine: {show: false},
                name: '(分钟)',
                nameTextStyle: {
                    padding: [0, 0, -5, -30],
                },
                axisLabel: {
                    color: 'rgb(153,153,153)',
                }
            },
                {
                    type: 'value',
                    splitLine: {show: false},
                    name: '(%)',
                    nameTextStyle: {
                        padding: [0, 0, -5, 30],
                    },
                    axisLabel: {
                        color: 'rgb(153,153,153)',
                    }
                }],
            series: [{
                yAxisIndex: 0,
                name: '语音(分钟)',
                type: 'bar',
                barWidth: '18%',
                data: v_min,
                itemStyle: {
                    color: 'rgb(255,169,20)',
                    barBorderRadius: 10
                }
            },
                {
                    yAxisIndex: 1,
                    symbol: 'none',
                    name: '语音饱和度(%)',
                    smooth: true,
                    type: 'line',
                    data: v_rate,
                    itemStyle: {
                        color: 'rgb(50,208,180)',
                    }
                }]
        };
    } else if (userType == 2) {
        //  固话
        var option = {
            tooltip: {trigger: 'axis'},
            legend: {
                data: ['上网天数(天)'],
                top: 10,
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                data: xdata,
                axisLabel: {
                    color: 'rgb(153,153,153)',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(229,229,229)',
                    }
                }
            },
            yAxis: [
                {
                    max: 31,
                    min: 0,
                    interval: 6,
                    // splitNumber:5,//坐标轴的分割段数
                    axisLabel: {
                        color: 'rgb(153,153,153)'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#1F71A7"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#1F71A7"
                        }
                    }
                }
            ],
            series: [{
                name: '上网天数(天)',
                type: 'bar',
                itemStyle: {
                    color: 'rgb(255,169,20)',
                    barBorderRadius: 10
                },
                barWidth: 12,
                data: v_min
            }
            ]
        };
    }
    yyEchart.setOption(option);
    yyEchart.resize();
}
var initLlEchart = function(xdata,f_min,f_rate,maxFmin,userType) {
    if(llEchart!=null && llEchart !="" && llEchart !=undefined){
        llEchart.dispose();
    }
    llEchart = echarts.init(document.getElementById('llEchart'), 'walden');
    if (userType == 1) {
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                top: 10,
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
                data: ['流量(GB)', '流量饱和度(%)'],
            },
            xAxis: [{
                type: 'category',
                data: xdata,
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLabel: {
                    color: 'rgb(153,153,153)',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(229,229,229)',
                    }
                }

            }],
            yAxis: [{
                type: 'value',
                splitLine: {show: false},
                name: '(GB)',
                nameTextStyle: {
                    padding: [0, 0, -5, -30],
                },
                axisLabel: {
                    color: 'rgb(153,153,153)',
                }
            },
                {
                    type: 'value',
                    splitLine: {show: false},
                    name: '(%)',
                    nameTextStyle: {
                        padding: [0, 0, -5, 30],
                    },
                    axisLabel: {
                        color: 'rgb(153,153,153)',
                    }
                }],
            series: [{
                yAxisIndex: 0,
                name: '流量(GB)',
                type: 'bar',
                barWidth: '18%',
                data: f_min,
                itemStyle: {
                    color: 'rgb(255,169,20)',
                    barBorderRadius: 10
                }
            },
                {
                    yAxisIndex: 1,
                    symbol: 'none',
                    name: '流量饱和度(%)',
                    smooth: true,
                    type: 'line',
                    data: f_rate,
                    itemStyle: {
                        color: 'rgb(50,208,180)',
                    }
                }]
        };
    } else if (userType == 2) {

        var option = {
            tooltip: {trigger: 'axis'},
            legend: {
                data: ['流量(GB)'],
                top: 10,
                itemWidth: 8,
                itemHeight: 8,
                icon: 'circle',
            },
            grid: {
                containLabel: true,
                top: 35,
                left: 20,
                bottom: 20,
                right: 30
                // left:'center'
                // width:"90%"
            },
            xAxis: {
                data: xdata,
                axisLabel: {
                    color: 'rgb(153,153,153)',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(229,229,229)',
                    }
                }
            },
            yAxis: [
                {
                    max: Math.ceil(maxFmin / 100) * 100,
                    min: 0,
                    interval: Math.ceil(maxFmin / 100) * 20,
                    // splitNumber:5,//坐标轴的分割段数
                    axisLabel: {
                        color: 'rgb(153,153,153)'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#1F71A7"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#1F71A7"
                        }
                    }
                }
            ],
            series: [{
                name: '流量(GB)',
                type: 'bar',
                itemStyle: {
                    color: 'rgb(255,169,20)',
                    barBorderRadius: 10
                },
                barWidth: 12,
                data: f_min
            }
            ]
        };

    }
    llEchart.setOption(option);
    llEchart.resize();
}



