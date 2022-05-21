// 基于准备好的dom，初始化echarts实例
var initEcharts = function initEcharts(leds, datas, rate1, rate2) {
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
        grid: {
            show: true,

            left: 0,
            right: 0,
            top: 10,
            bottom: 10,
            backgroundColor: "rgb(250, 250, 250)",
            borderColor: "rgb(250, 250, 250)",
        },
        xAxis: {
            type: "category",
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ["rgb(242,244,247)"],
                    width: 2,
                },
            },
            data: leds,
        },
        yAxis: {
            show: false,
            type: "value",
            scale: true,
        },
        series: [
            {
                data: datas,
                name: '融合账户ARPU',
                type: "line",
                smooth: true,
                lineStyle: {
                    color: "rgb(72,172,155)",
                    width: 3,
                },
                itemStyle: {
                    color: "rgb(64, 136, 255)",
                },
                symbolSize: 14
            },
        ],
        tooltip: {
            show: true,
            formatter: "{a}<br/>{b}:{c}(元)",
        },
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    var rightRateValue = rate1,
        leftRateValue = rate2;

    var styleLeft = document.createElement("style");
    if (0 < rightRateValue && rightRateValue < 50) {
        var leftDeg = parseInt(3.6 * (50 - rightRateValue));
        styleLeft.innerHTML =
            ".loading-left .right:after{transform:rotateZ(180deg)} .loading-left .left:after{transform:rotateZ(" +
            leftDeg +
            "deg)} ";
        document.head.appendChild(styleLeft);
    } else if (rightRateValue == 0 || rightRateValue == 0.0) {
        styleLeft.innerHTML =
            ".loading-left .left:after, .loading-left .right:after{background-color:#E6E6E6 !important;}";
        document.head.appendChild(styleLeft);
    } else {
        var rightDeg = parseInt(3.6 * (100 - rightRateValue));
        styleLeft.innerHTML =
            ".loading-left .right:after{transform:rotateZ(" + rightDeg + "deg)} ";
        document.head.appendChild(styleLeft);
    }
    var styleRight = document.createElement("style");
    if (0 < leftRateValue && leftRateValue < 50) {
        var leftDeg = parseInt(3.6 * (50 - leftRateValue));
        styleRight.innerHTML =
            ".loading-right .right:after{transform:rotateZ(180deg)} .loading-right .left:after{transform:rotateZ(" +
            leftDeg +
            "deg)} ";
        document.head.appendChild(styleRight);
    } else if (leftRateValue == 0 || leftRateValue == 0.0) {
        styleRight.innerHTML =
            ".loading-right .left:after,.loading-right .right:after{background-color:#E6E6E6 !important;}";
        document.head.appendChild(styleRight);
    } else {
        var rightDeg = parseInt(3.6 * (100 - leftRateValue));
        styleRight.innerHTML =
            ".loading-right .right:after{transform:rotateZ(" +
            rightDeg +
            "deg)} ";
        document.head.appendChild(styleRight);
    }
}


      
var iconClick2 = function iconClick2(type, fee, sName) {
    var mask = $(".mask");
    mask.show();
    // 上门营销
    addResLog("H5001002007");
    if (type === "doorSale") {
        $.ajax({
            type: "POST",
            url: "getDoorSaleToken",
            data: {
                phoneNo: $("#strategySearchHid").val(),
                sceneId: fee,
                sceneName: sName
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == '1') {
                    window.location.href = 'https://gzt.hebdigital.com.cn:8486/woApp/pages/business/toutiao/redirect_smwx.html?info=' + data.token;
                } else {
                    mui.toast('上门营销拉起失败！');
                    return;
                }
            }
        });
    }
};
var iconClick3 = function iconClick3(type, sceneId) {
    // 发送短信
    var mask = $(".mask");
    mask.show();
    addResLog("H5001002008");
    if (type === "msgSend") {
        $.ajax({
            type: "POST",
            url: "getSmsContentList",
            data: {
                sceneId: sceneId,
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == '1') {
                    var htm = '';
                    var len = data.contents.length;
                    if (len == 0) {
                        mui.alert('该策略暂无短信模板，请联系管理员！', '提示');
                        $('.mix-list2').html(htm);
                        mask.hide();
                        return;
                    }
                    $('#messageDrawer').show();

                    var phoneNo = $("#strategySearchHid").val();
                    htm = htm + '<div class="info-list2">';
                    htm = htm + '<div class="info-title"><span>业务号码</span>：' + phoneNo + '</div>';
                    htm = htm + '<div class="info-title"><span>短信内容</span>：</div>';
                    for (var i = 0; i < len; i++) {
                        htm = htm + '<div class="list-body">';
                        htm = htm + '<input name="sms-radio" value="' + data.contents[i] + '" type="radio" class="mgc mgc-primary" />';
                        htm = htm + '<span>' + data.contents[i] + '</span></div>';
                    }
                    htm = htm + '</div>';
                    $('.mix-list2').html(htm);
                    $("#feedBackHid").val(sceneId);
                    console.log(data)
                } else {
                    mui.toast('短信发送拉起失败！');
                    return;
                }
            }
        });
    }
};
var msgOk = function msgOk(obj) {
    var arr = '';
    var smsContent = $('.info-list2 .list-body input:checked').val();
    console.log(arr);
    $.ajax({
        type: "POST",
        url: "insertSmsContent",
        data: {
            phoneNo: $("#strategySearchHid").val(),
            smsMsg: smsContent,
            sceneId: $("#feedBackHid").val(),
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                mui.alert("短信发送成功");
            } else {
                mui.alert("短信发送失败");
            }
        }

    });
};
var addResLog = function addResLog(resId, resParam) {
    resParam = !resParam ? "" : resParam;
    $.ajax({
        type: "post",
        url: "addResLog",
        data: {
            resId: resId,
            resParam: resParam
        }
    })
};
// 按钮点击事件
var iconClick = function iconClick(type, fee) {
    var mask = $(".mask");
    mask.show();
    // 收入预演
    if (type === "income") {
        $('.desc-green').html('');
        $('.desc-orange').html('' + fee);
        $('.desc-yellow').html('');
        $("#incomeDrawer").show();
        addResLog("H5001002004");
    }
    // 呼叫营销
    if (type === "call") {
        $("#callDrawer").show();
        $("#feedBackHid").val(fee);
        addResLog("H5001002005");
    }
    // 推荐反馈
    if (type === "feedback") {
        $("#feedBackHid").val(fee);
        $("#feedBackDrawer").show();
        $(".feedback-pop").show();
        addResLog("H5001002006");
        $.ajax({
            type: 'post',
            url: 'getTouchResult',
            data: {
                phoneNo: $("#strategySearchHid").val(),
                sceneId: $("#feedBackHid").val(),
            },
            success: function (res) {
                if (res == '00') {
                    mui.toast("接口异常");
                } else if (res == 'null') {
                    // mui.toast("数据不存在");
                } else {
                    var data = JSON.parse(res);
                    $("#touchStaff").text(data.DEAL_USER);
                    $("#touchTime").text(data.DEAL_TIME);
                    $("#userRefer").text(data.MARKETING_RESULT);
                    $("#remarkInfo").text(data.REMARK);
                }
            }
        })
    }

};

// 关闭遮罩 同时关闭抽屉
var closeMask = function closeMask() {
    $('.mask').hide();
    $(".drawer").hide();
};

// 列表展开折叠事件
var changeFold = function changeFold(obj) {
    if ($(obj).children(".arrow.arrow-down").length > 0) {
        $(obj).parent().children(".info-list").hide();
        $(obj)
            .children(".arrow")
            .removeClass("arrow-down")
            .addClass("arrow-up");
    } else {
        $(obj).parent().children(".info-list").show();
        $(obj)
            .children(".arrow")
            .removeClass("arrow-up")
            .addClass("arrow-down");
    }
};

// 推荐反馈 确定
var feedBackSubmit = function feedBackSubmit() {
    $('.feedback-mask').show();
    $(".feedback-pop").show();
}
var addIncludeDiv = function addIncludeDiv() {
    var len = $(".include-list input.addInp").length;
    if (len > 7) {
        return;
    }
    var htm = '<div class="list-item list-input"><input type="checkbox" class="mgc mgc-primary" /><input type="text" class="addInp" value="" /></div>';
    $('.include-list').append(htm);
}
var checkboxOnclick = function checkboxOnclick(flag) {
    $("#feedBackFlagHid").val(flag);
}
var talkPlusCall = function talkPlusCall() {
    $.ajax({
        type: "POST",
        url: "talkPlusCall",
        data: {
            called_number: $('#callNumber').val(),
            phoneNo: $("#strategySearch").val(),
            sceneId: $('#feedBackHid').val(),
            display_number: '10016'
        },
        success: function (data) {
            if (data == '1') {
                mui.toast('话+外呼已成功发起！');
            } else if (data == '-1') {
                mui.toast('该工号未预留联系号码，请联系APP管理员!');
            } else {
                mui.toast('话+外呼发起失败！失败原因:' + data);
            }
        }
    });
}
var selfCall = function selfCall() {
    $.ajax({
        type: "POST",
        url: "selfCall",
        data: {
            called_number: $('#callNumber').val(),
            phoneNo: $("#strategySearch").val(),
            sceneId: $('#feedBackHid').val()
        },
        success: function (data) {

        }
    });
}
var outerCall = function outerCall(number) {
    $.ajax({
        type: "POST",
        url: "talkPlusCall",
        data: {
            called_number: $('#callNumber').val(),
            phoneNo: $("#strategySearch").val(),
            sceneId: $('#feedBackHid').val(),
            display_number: number
        },
        success: function (data) {
            if (data == '1') {
                mui.toast('外呼已成功发起！');
            } else if (data == '-1') {
                mui.toast('该工号未预留联系号码，请联系APP管理员!');
            } else {
                mui.toast('外呼发起失败！失败原因:' + data);
            }
        }
    });
}
var feedCallBackOk = function feedCallBackOk() {
    var aa = '';
    $('input[name="result_tj"]:checked').each(function () {
        aa = $(this).val();
    });
    if (aa == '') {
        mui.toast('请先选择推荐结果！');
    } else {
        $.ajax({
            type: "POST",
            url: "h5SceneResult",
            data: {
                phoneNo: $("#strategySearchHid").val(),
                sceneId: $("#feedBackHid").val(),
                flag: aa,
                remark: $("#remark2").val()
            },
            success: function (data) {
                if (data == '01') {
                    mui.toast('OK!提交成功！');
                    closeFeedbackMask();
                    closeMask();
                    return;
                } else {
                    mui.toast(data);
                    return;
                }
            }
        });
    }
}
var feedBackOk = function feedBackOk() {
    if ($("#feedBackFlagHid").val() == '-1') {
        mui.toast('请先选择推荐结果！');
        return;
    }
    $.ajax({
        type: "POST",
        url: "h5SceneResult",
        data: {
            phoneNo: $("#strategySearchHid").val(),
            sceneId: $("#feedBackHid").val(),
            flag: $("#feedBackFlagHid").val(),
            remark: $("#remark").val()
        },
        success: function (data) {
            if (data == '01') {
                mui.toast('OK!提交成功！');
                closeCallPopMask();
                $("#feedBackDrawer").hide();
                $(".mask").hide();
                return;
            } else {
                mui.toast(data);
                return;
            }

        }
    });

}
var closeFeedbackMask = function closeFeedbackMask() {
    $('.feedback-mask').hide();
    $(".feedback-pop").hide();
}
// 拨打电话
var handleCallFn = function handleCallFn(number) {
    var html = '<input id="callNumber" type="hidden" value="' + number + '" />';
          html +='<div onclick="talkPlusCall();">10016拨打</div>';
          html +='<div onclick="selfCall();"><a id="mycallA" href="tel:' + number + '">本机拨打</a></div>';
    $('.call-pop').html(html); // 防止这个请求加载慢，本机拨打点不动
    //console.log('handleCallFn==' + number);
    $.ajax({
        url: 'getOuterCallNo',
        success: function (data) {
            if (data == null || data == undefined || data == '') {
                return;
            } else {
                var numbers = JSON.parse(data);
                html = '<input id="callNumber" type="hidden" value="' + number + '" />';
                for (var i = 0; i < numbers.length; i++) {
                    html += '<div onclick="outerCall(\'' + numbers[i] + '\');" class="outerCall"> ' + numbers[i] + '拨打</div>'
                }
                html +='<div onclick="talkPlusCall();">10016拨打</div>';
                html +='<div onclick="selfCall();"><a id="mycallA" href="tel:' + number + '">本机拨打</a></div>';
                $('.call-pop').html(html);
            }
        }
    });
    $(".call-pop-mask").show();
    $(".call-pop").show();
};
var sryy = function sryy(obj) {
    var arr = '';
    $('.info-list .list-body input:checked').each(function () {
        arr = arr + $(this).attr("id") + ',';
    });
    $('.include-list input:checked').each(function () {
        var vs = $($($(this).parent()).find('input.addInp')).val();
        if (vs != '') {
            var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
            if (!(telStr.test(vs))) {
                mui.toast('纳入号码不规范哦！');
                return;
            }
            arr = arr + vs + ',';
        }

    });
    arr = arr.substring(0, arr.lastIndexOf(','));
    console.log(arr);
    $.ajax({
        type: "POST",
        url: "caclPhoneArpu",
        data: {
            phones: arr
        },
        success: function (data) {
            if (data) {
                if (data.split('&')[0] == '0') {
                    mui.toast(data.split('&')[1]);
                } else {
                    $('#nowIncome').html(data.split('&')[1]);
                    $('#addIncome').html($('.desc-orange').text() - data.split('&')[1]);
                }
            }

        }
    });
}
var closeCallPopMask = function closeCallPopMask() {
    $(".call-pop-mask").hide();
    $(".call-pop").hide();
}
function getMaximin(arr, maximin) {
    if (maximin == "max") {
        return Math.max.apply(Math, arr);
    } else if (maximin == "min") {
        return Math.min.apply(Math, arr);
    }
}
var initAll = function initAll() {
    initStrategy();
    //initCustomer();
    initCallList();
    var phoneNo = $("#strategySearch").val();
    checkUser(phoneNo);
    //initArpuChart(['202101','202102','202103','202104','202105','202106'],['10','20','30','40','50','60'],'30元');
}
$("#strategySearch").keypress(function (event) {
    if (event.which === 13) {
        //点击回车要执行的事件
        initStrategy();
        //initCustomer();
        initCallList();
    }
})
function initArpuChart(eleds, eArpu, avgArpu) {
    var a = eArpu;
    var ma = getMaximin(a, "max");
    var mi = getMaximin(a, "min");
    if (ma == mi) {
        ma += 5;
        mi -= 5;
    }
    var avgXaxis = [];
    var avgData = [];
    var avg = avgArpu;//均值
    for (var i = 0; i < a.length; i++) {
        avgXaxis.push('平均值');
        avgData.push(parseFloat(avg).toFixed(2));
    }
    var option = {
        grid: {
            bottom: '20%',//距离下边的距离
            top: '12%' //距离上边的距离
        },
        xAxis: [{
            show: false,
            splitLine: {//去除网格线
                show: false
            },
            splitArea: {show: false},//去除网格区域
            data: eleds
        },
            {
                show: false,
                splitLine: {//去除网格线
                    show: false
                },
                splitArea: {show: false},//去除网格区域
                data: avgXaxis
            }],
        itemStyle: {
            normal: {
                color: "#fff"//坐标圆点的颜色
            }
        },
        lineStyle: {
            color: '#fff' //改变折线颜色
        },
        yAxis: {
            min: mi,
            max: ma,
            show: false,
            splitLine: {//去除网格线
                show: false
            },
            splitArea: {show: false}//去除网格区域

        },

        label: {//线条上的数字提示信息
            normal: {
                show: true,
                position: 'top'
            }
        },
        series: [{
            type: 'line',
            data: eArpu,
            symbol: 'circle', //折线点设置为实心点
            smooth: true,
            symbolSize: 6, //折线点的大小
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,0)', //折线点的颜色
                    borderColor: '#fff',
                    borderWidth: 1,
                    lineStyle: {
                        color: "#fff" //折线的颜色
                    }
                }
            }
            ,
            markLine: {
                symbol: 'none',//去掉箭头
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#fff',
                            type: 'dotted'
                        },

                        label: {
                            formatter: ''
                        }
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'middle',
                        formatter: function (params) {
                            return params.data[0];
                        }
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }
        ]
    };
    var myChart = echarts.init(document.getElementById('per-arpu'));
    myChart.setOption(option);
}



// 新增方法
var initPopup1 = function () {
    var phoneNo = $("#strategySearch").val();
    if (phoneNo == "") {
        return;
    }
    $("iframe").hide();
    $("#second_popup1").attr("src", "productInfoPopup?phoneNo=" + phoneNo).show();

}

var initPopup2 = function () {
    var phoneNo = $("#strategySearch").val();
    if (phoneNo == "") {
        return;
    }
    $("iframe").hide();
    $("#second_popup2").attr("src", "billInfoPopup?phoneNo=" + phoneNo).show();
}

var initPopup3 = function () {
    var phoneNo = $("#strategySearch").val();
    if (phoneNo == "") {
        return;
    }
    $("iframe").hide();
    $("#second_popup3").attr("src", "busiInfoPopup?phoneNo=" + phoneNo).show();

}

var checkUser = function (phoneNo) {
    if (phoneNo == "") {
        return;
    }
    $.ajax({
        url: "checkUserExist",
        type: "post",
        data: {
            phoneNo: phoneNo
        },
        async: false,
        dataType: "text",
        success: function (result) {
            if (result == "-1") {
                mui.toast("数据异常");
                return;
            }
            if (result == "0") {
                mui.toast("用户不存在");
                return;
            }
            // if (result == "2") {
            //     $(".title-card-device").removeAttr("onclick");
            // } else {
            //     $(".title-card-device").attr("onclick", "initPopup4()");
            // }
            // title-card-device
        }
    })
}
// -------新增方法结束
var changeTab = function (id, obj) {
    $(obj).parent().parent().find('span').removeClass('active-line');
    $(obj).addClass('active-line');
    $("#tabCard1 .tab-info").removeClass('tab-active');
    $("#tabCard1 #" + id).addClass('tab-active');
}
var initTab = function (datas) {
    if (datas.tcList) {
        var len = datas.tcList.length;
        var htm = '';
        for (var i = 0; i < len; i++) {
            htm = htm + '<div><span class="tab-span-first">' + datas.tcList[i].WO_PORDUCT_NAME + '</span><div class="tc-info">';
            var len2 = datas.tcList[i].phoneList.length;
            for (var j = 0; j < len2; j++) {
                htm = htm + '<span>● &nbsp;</span><span>' + datas.tcList[i].phoneList[j].DEVICE_NUMBER1 + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>状态：' + datas.tcList[i].phoneList[j].USER_STATUS_DESC + '</span><br/>';
            }
            htm = htm + '</div></div>';
        }
        $('#tcCard').html(htm);
    }

}
var initStrategy = function initStrategy() {
    if ($("#strategySearch").val() == '') {
        addResLog("H5001002"); // 初始加载，直接记录日志，查询参数为空
    }
    if ($("#strategySearch").val() && $("#strategySearch").val() != 'undefined') {
        $("#strategySearchHid").val($("#strategySearch").val());
        var phoneNo = $("#strategySearch").val();
        // $("#second_popup1").attr("src","productInfoPopup?phoneNo="+phoneNo);
        // $("#second_popup2").attr("src","billInfoPopup?phoneNo="+phoneNo);
        // $("#second_popup3").attr("src","busiInfoPopup?phoneNo="+phoneNo);
        // $("#second_popup4").attr("src","strategyPopup4?phoneNo="+phoneNo);
        $.ajax({
            type: "POST",
            url: "h5SceneInfo",
            data: {
                phoneNo: $("#strategySearch").val(),
                gdFlag: $("#gdFlagHid").val(),
                packageId: $("#packageIdHid").val()
            },
            success: function (data) {
                $('.item-four').html("");
                $('.item-five').html("");
                $('.item-six').html("");

                if (data == '接口异常') {
                    //mui.toast('当前用户不存在！');
                    //todo 跳转页面
                    window.location.href = "SceneH5Probe?certId=" + $("#strategySearch").val();
                    // return;
                }
                $('.title-user-smz').hide();
                var a = eval("(" + data + ")");
                if (a.notices != '1') {
                    $('#newsSpan').html(a.notices);
                    $('#newsDiv').show();
                } else {
                    $('#newsDiv').hide();
                }
                initArpuChart(a.legends, a.echartsArpu, a.custInfo.GPRS_AVG_L6);


                $('.title-user-name').html(a.custInfo.CUST_NAME);
                $('.ss_div').html('');
                if (a.custInfo.PRODUCT_NAME_NEW != null) {
                    $('.ss_div').html(a.custInfo.PRODUCT_NAME_NEW);
                    var s = '1';
                    setInterval(function () {
                        if (s == '1') {
                            $(".ss_div").animate({opacity: '0.4'}, "slow");
                            s = '2';
                        } else {
                            $(".ss_div").animate({opacity: '1'}, "slow");
                            s = '1';
                        }

                    }, 2000);
                }

                if (a.custInfo.IS_SMZ == '1') {
                    $('.title-user-smz').show();
                }
                $('.title-product-div').html('<marquee>' + a.custInfo.PRODUCT_NAME + '</marquee>');
                if ($("#strategySearch").val().startsWith("1")) {
                    $('#three-top').hide();
                    $('#qzgm').hide();
                    $('#userGprs').html(a.custInfo.USE_GPRS_D);
                    $('#userGprs-d').show();
                    $('#userGprsRate').html(a.custInfo.GPRS_USED_RATE + '%');
                    $('#userGprsB').html('<div class="progress-bar" style="width:' + a.custInfo.GPRS_USED_RATE + '%"></div>');
                    $('#userCallB').html('<div class="progress-bar" style="width:' + a.custInfo.CALL_USED_RATE + '%"></div>');
                    $('#userGprsB').show();
                    $('#userCallB').show();
                    $('#userCallRate').html(a.custInfo.CALL_USED_RATE + '%');
                    $('#userCall').html(a.custInfo.USE_CALL_D);
                    $('#userCall-d').show();
                    $('.title-card-row2').show();
                    if (a.custInfo.TERMINAL_MODE) {
                        $('#termName').html(a.custInfo.TERMINAL_MODE);
                        $('#termName').attr('title', a.custInfo.TERMINAL_MODE);
                    } else {
                        $('#termName').html('--');
                    }

                    $('#termName').css("width", "45%");
                    $('#termName').css("text-align", "left");
                    $('#termAge').html(a.custInfo.TERMINAL_TIME);
                    $('#termDWY').html(a.custInfo.TLT_TYPE);
                    if (a.custInfo.USER_HJ_GL != '' && a.custInfo.USER_HJ_GL != 'null') {
                        $('#termGgl').html(a.custInfo.USER_HJ_GL);
                        $('#termGgl').css("width", "45%");
                        $('#termGgl').css("text-align", "left");
                        $('#termHj').html(a.custInfo.USER_HJ_GL_1);
                        $('#termPrice').html('偏好：' + a.custInfo.MODEL_A);
                    } else {
                        $('#termGgl').html('--');
                        $('#termGgl').css("width", "80%");
                        $('#termGgl').css("text-align", "center");
                        $('#termHj').html('');
                        $('#termPrice').html('--');
                    }

                    if (a.custInfo.MODEL_FLAG == '1') {
                        $('#stockDiv').html('<div class="push-term-dn">暂无终端推荐</div>');
                    } else {
                        var ht = '';
                        ht = ht + '<div class="push-term-d"><span class="push-term-pot">●&nbsp;';
                        ht = ht + '<span title="' + a.custInfo.MODEL_NAME_HS_A + '">' + a.custInfo.MODEL_NAME_HS_A + '</span></span>';
                        ht = ht + '<span class="push-term-stock">' + a.custInfo.stockNumA + '</span></div>';
                        ht = ht + '<div class="push-term-d"><span class="push-term-pot">●&nbsp;';
                        ht = ht + '<span title="' + a.custInfo.MODEL_NAME_HS_B + '">' + a.custInfo.MODEL_NAME_HS_B + '</span></span>';
                        ht = ht + '<span class="push-term-stock">' + a.custInfo.stockNumB + '</span></div>';
                        ht = ht + '<div class="push-term-d"><span class="push-term-pot">●&nbsp;';
                        ht = ht + '<span title="' + a.custInfo.MODEL_NAME_HS_C + '">' + a.custInfo.MODEL_NAME_HS_C + '</span></span>';
                        ht = ht + '<span class="push-term-stock">' + a.custInfo.stockNumC + '</span></div>';
                        $('#stockDiv').html(ht);
                    }
                } else {
                    if (a.custInfo.NET_TYPE == '3') {
                        $('#qzgm').html('当月流量' + a.custInfo.USE_GPRS_D + 'GB');

                        $('#kdNet').html('当月上网' + a.custInfo.KD_NET_D + '天');
                        $('#kdNet').css("float", "none");
                        $('#kdNet').css("text-align", "center");
                        $('#avgGprs3').html('');
                        if (a.custInfo.RATE_VALUE) {
                            $('#termName').html('宽带速率' + a.custInfo.RATE_VALUE);
                        } else {
                            $('#termName').html('--');
                        }

                        $('#termName').css("width", "80%");
                        $('#termName').css("text-align", "center");
                        $('#termAge').html('');
                        $('#termDWY').html(a.custInfo.IS_KD_ZC);
                        if (a.custInfo.GM_MODEL != '' && a.custInfo.GM_MODEL != null) {
                            $('#termGgl').html(a.custInfo.GM_MODEL);
                            $('#termGgl').css("width", "80%");
                            $('#termGgl').css("text-align", "center");
                            $('#termHj').html('');
                            $('#termPrice').html(a.custInfo.IS_QZGM);
                        } else {
                            $('#termGgl').html('--');
                            $('#termGgl').css("width", "80%");
                            $('#termGgl').css("text-align", "center");
                            $('#termHj').html('');
                            $('#termPrice').html('--');
                        }
                        var ht = '';
                        ht = ht + '<div class="push-term-d" style="margin-top:10px;"><span class="push-term-pot" style="width:99%;text-align:center;">';
                        if (a.custInfo.VILLAGE_NAME != 'null' && a.custInfo.VILLAGE_NAME != '') {
                            ht = ht + '<span>' + a.custInfo.VILLAGE_NAME + '</span></span></div>';
                            ht = ht + '<div class="push-term-d" style="margin-top:13px;"><span class="push-term-pot" style="width:99%;text-align:center;">';
                            ht = ht + '<span>' + a.custInfo.IS_QZ_VILLAGE + '</span></span></div>';
                        } else {
                            ht = ht + '<span>--</span></span></div>';
                            ht = ht + '<div class="push-term-d" style="margin-top:13px;"><span class="push-term-pot" style="width:99%;text-align:center;">';
                            ht = ht + '<span>--</span></span></div>';
                        }

                        $('#stockDiv').html(ht);

                        $('#three-top').show();
                        $('#qzgm').show();
                        $('.title-card-row2').show();
                    } else {
                        $('#kdNet').html(a.custInfo.CALL_AVG_L6 + '分钟');
                        $('#kdNet').css("float", "left");
                        $('#kdNet').css("text-align", "left");
                        $('#avgGprs3').html(a.custInfo.AVG_USE_CALL_BJ + '分钟');
                        $('#three-top').show();
                        $('#qzgm').hide();
                        $('.title-card-row2').hide();
                    }

                    $('#userGprs').html("");
                    $('#userGprs-d').hide();
                    $('#userGprsRate').html("");
                    $('#userGprsB').html("");
                    $('#userCallB').html("");
                    $('#userGprsB').hide();
                    $('#userCallB').hide();
                    $('#userCallRate').html("");
                    $('#userCall').html("");
                    $('#userCall-d').hide();
                }

                $('.rong_he').html(a.custInfo.USER_ARPU_TC + '元');


                if (a.perferenceMap) {
                    console.log(a)
                    var TXZL_TYPE1, TXZL_TYPE2, TXZL_TYPE3;
                    if (a.channel != '01' && a.channel != '001' && a.perferenceMap.IS_JT_TXZL == '1') {
                        TXZL_TYPE1 = a.perferenceMap.TXZL_TYPE3;
                        TXZL_TYPE2 = a.perferenceMap.TXZL_TYPE4;
                        TXZL_TYPE3 = a.perferenceMap.TXZL_TYPE5;
                    } else {
                        TXZL_TYPE1 = a.perferenceMap.TXZL_TYPE1;
                        TXZL_TYPE2 = a.perferenceMap.TXZL_TYPE2;
                        TXZL_TYPE3 = a.perferenceMap.TXZL_TYPE3;
                    }
                    if (TXZL_TYPE1 && TXZL_TYPE1.length > 9) {
                        $('.item-four').html('<marquee>' + TXZL_TYPE1 + '</marquee>');
                    } else {
                        $('.item-four').html(TXZL_TYPE1);
                    }
                    if (TXZL_TYPE2 && TXZL_TYPE2.length > 9) {
                        $('.item-five').html('<marquee>' + TXZL_TYPE2 + '</marquee>');
                    } else {
                        $('.item-five').html(TXZL_TYPE2);
                    }
                    if (TXZL_TYPE3 && TXZL_TYPE3.length > 9) {
                        $('.item-six').html('<marquee>' + TXZL_TYPE3 + '</marquee>');
                    } else {
                        $('.item-six').html(TXZL_TYPE3);
                    }
                }
                $('#sceneBody').html("");
                if (a.sceneList && a.sceneList.length > 0) {
                    console.log("sceneList1");
                    var htm = '';
                    var len = a.sceneList.length;
                    for (var i = 0; i < len; i++) {
                        htm = htm + '<div class="info">';
                        htm = htm + '<div class="sceneTitleD"><span class="left-line">l</span><span class="jb_label">' + a.sceneList[i].JB_LABEL + '</span><span class="left_arrow"></span>' + a.sceneList[i].SCENE_NAME + '';
                        if (a.sceneList[i].IS_GDQD == 1) {
                            htm = htm + '<span class="gdqdLabel"></span>';
                        }
                        htm = htm + '</div>';
                        htm = htm + '<div class="mui-segmented-control mui-segmented-control-primary">';
                        htm = htm + '<a id="" class="mui-control-item mui-active" href="#point_' + a.sceneList[i].SCENE_ID + '">';
                        htm = htm + '<span class="select-control-span"> 关键卖点 </span></a>';
                        htm = htm + '<a id="" class="mui-control-item" href="#words_' + a.sceneList[i].SCENE_ID + '">';
                        htm = htm + '<span class="select-control-span"> 营销话术 </span></a>';
                        htm = htm + '<a id="" class="mui-control-item" href="#product_' + a.sceneList[i].SCENE_ID + '">';
                        htm = htm + '<span class="select-control-span"> 产品信息 </span></a></div>';

                        htm = htm + '<div id="point_' + a.sceneList[i].SCENE_ID + '" class="mui-control-content mui-active">';
                        htm = htm + '<div class="info-list"><pre>' + a.sceneList[i].SELL_POINT + '</pre></div></div>';

                        htm = htm + '<div id="words_' + a.sceneList[i].SCENE_ID + '" class="mui-control-content"><div class="info-list"><pre>' + a.sceneList[i].MARKETING_WORDS2 + '</pre></div></div>';
                        htm = htm + '<div id="product_' + a.sceneList[i].SCENE_ID + '" class="mui-control-content"><div class="info-list"><pre>' + a.sceneList[i].SELL_TARGET2 + '</pre></div></div>';
                        htm = htm + '<div class="icon-list"><div class="icon-item" onclick="iconClick(\'income\',\'' + a.sceneList[i].OFFER_RENT + '\')">';
                        htm = htm + '<img src="img/strategy/01@2x.png" /><span>收入预演</span></div>';
                        htm = htm + '<div class="icon-item" onclick="iconClick(\'call\',\'' + a.sceneList[i].SCENE_ID + '\')">';
                        htm = htm + '<img src="img/strategy/02@2x.png" /><span>呼叫营销</span></div>';
                        htm = htm + '<div class="icon-item" onclick="iconClick(\'feedback\',\'' + a.sceneList[i].SCENE_ID + '\')">';
                        htm = htm + '<img src="img/strategy/03@2x.png" /><span>推荐反馈</span></div>';
                        htm = htm + '<div class="icon-item" onclick="iconClick2(\'doorSale\',\'' + a.sceneList[i].SCENE_ID + '\',\'' + a.sceneList[i].SCENE_NAME + '\')">';
                        htm = htm + '<img src="img/strategy/44.png" /><span>上门营销</span></div>';
                        htm = htm + '<div class="icon-item" onclick="iconClick3(\'msgSend\',\'' + a.sceneList[i].SCENE_ID + '\')">';
                        htm = htm + '<img src="img/strategy/05@2x.png" /><span>短信发送</span></div>';
                        htm = htm + '</div></div>';
                    }
                    $('#sceneBody').html(htm);
                } else {
                    console.log("sceneList2");
                    if (a.perferenceMap) {
                        console.log("sceneList22");
                        if (a.noSceneMsg) {
                            console.log("sceneList0");
                            var htm = '';
                            htm = htm + '<div class="info">';
                            htm = htm + '<div><span class="left-line"></span></div>';
                            htm = htm + '<div id="point_001" class="mui-control-content mui-active">';
                            htm = htm + '<div class="info-list"><pre>' + a.noSceneMsg + '</pre></div></div></div>';
                            $('#sceneBody').html(htm);
                        } else {
                            console.log("sceneList00");
                            var htm = '';
                            htm = htm + '<div class="info">';
                            htm = htm + '<div><span class="left-line"></span></div>';
                            htm = htm + '<div id="point_001" class="mui-control-content mui-active">';
                            htm = htm + '<div class="info-list"><pre>该用户当前已执行最优推荐方案，关怀用户使用体验，提升服务满意度！</pre></div></div></div>';
                            $('#sceneBody').html(htm);
                        }
                    }

                }
                if (a.rhList) {
                    var htm = '';
                    var len = a.rhList.length;
                    for (var i = 0; i < len; i++) {
                        htm = htm + '<li class="item">';
                        htm = htm + '<div class="title" onclick="changeFold(this)">';
                        htm = htm + '<div class="arrow arrow-down"></div>';
                        htm = htm + '<div>' + a.rhList[i].WO_PRODUCT_NAME + '</div></div><div class="info-list">';
                        var len2 = a.rhList[i].rhInfoList.length;
                        if (a.rhList[i].IS_SEL == '1') {
                            for (var j = 0; j < len2; j++) {
                                htm = htm + '<div class="list-body">';
                                htm = htm + '<input id="' + a.rhList[i].rhInfoList[j].DEVICE_NUMBER + '" type="checkbox" class="mgc mgc-primary" checked="checked" />';
                                htm = htm + '<span>' + a.rhList[i].rhInfoList[j].DEVICE_NUMBER1 + '</span></div>';
                            }
                        } else {
                            for (var j = 0; j < len2; j++) {
                                htm = htm + '<div class="list-body">';
                                htm = htm + '<input id="' + a.rhList[i].rhInfoList[j].DEVICE_NUMBER + '" type="checkbox" class="mgc mgc-primary" />';
                                htm = htm + '<span >' + a.rhList[i].rhInfoList[j].DEVICE_NUMBER1 + '</span></div>';
                            }
                        }
                        htm = htm + '</div></li>';
                    }
                    $('.mix-list').html(htm);
                }
                if (a.dkList) {
                    var htm = '';
                    var len = a.dkList.length;
                    for (var i = 0; i < len; i++) {
                        htm = htm + '<div class="info-list">';
                        if (a.dkList[i].ORDI == '0') {
                            htm = htm + '<div class="list-body">';
                            htm = htm + '<input id="' + a.dkList[i].DEVICE_NUMBER + '" type="checkbox" class="mgc mgc-primary" checked="checked" />';
                            htm = htm + '<span>' + a.dkList[i].DEVICE_NUMBER1 + '</span></div>';
                        } else {
                            htm = htm + '<div class="list-body">';
                            htm = htm + '<input id="' + a.dkList[i].DEVICE_NUMBER + '" type="checkbox" class="mgc mgc-primary" />';
                            htm = htm + '<span>' + a.dkList[i].DEVICE_NUMBER1 + '</span></div>';
                        }
                        htm = htm + '</div>';
                    }
                    $('#single').html(htm);
                }

            }
        });
    }
}
// var initCustomer = function initCustomer() {
//     $.ajax({
//         type: "POST",
//         url: "h5UserView",
//         data: {
//             phoneNo: $("#strategySearch").val()
//         },
//         success: function (data) {
//             var a = eval("(" + data + ")");
//             if (a) {
//                 $("#userNameSpan").html(a.CUST_NAME);
//                 $("#productNameSpan").html(a.PRODUCT_NAME);
//                 $("#familyTypeSpan").html(a.FAMILY_TYPE);
//                 $("#ifRhSpan").html(a.IS_WO);
//                 if (a.PURCHASE_PRODUCT_NAME) {
//                     $("#purchaseSpan").html(a.PURCHASE_PRODUCT_NAME);
//                 } else {
//                     $("#purchaseSpan").html('--');
//                 }
//
//                 $("#woArpuL3").html(a.WO_ARPU_L3 + '(元)');
//                 $("#terminalTimeSpan").html('');
//
//                 $("#lacTypeSpan").html(a.LAC_TYPE_D);
//
//                 $("#terminalSuportSpan").html(a.TERMINAL_SUPPORT_D);
//                 $("#terminalBrand").html(a.TERMINAL_BRAND_D);
//                 if (a.NET_TYPE == '1') {
//                     $("#terminalTimeSpan").html(a.TERMINAL_TIME + '(月)');
//                     $("#left_progress").html('<P>' + a.CALL_USED_RATE + '%</P>');
//                     $("#right_progress").html('<P>' + a.GPRS_USED_RATE + '%</P>');
//                     $("#useCallTitle").html('语音已用');
//                     $("#useCallValue").html(a.USE_CALL_D + '(分钟)');
//                     $("#useGprsTitle").html('流量已用');
//                     $("#useGprsValue").html(a.USE_GPRS_D + '(GB)');
//                     initEcharts(a.leds, a.woArpuData, a.CALL_USED_RATE, a.GPRS_USED_RATE);
//                 }
//                 if (a.NET_TYPE == '2') {
//                     $("#left_progress").html('<P>--</P>');
//                     $("#right_progress").html('<P>--</P>');
//                     $("#useCallTitle").html('近三月平均主叫');
//                     $("#useCallValue").html(a.CALL_AVG_L6 + '(分钟)');
//                     $("#useGprsTitle").html('近三月平均被叫');
//                     $("#useGprsValue").html(a.AVG_USE_CALL_BJ + '(分钟)');
//                     initEcharts(a.leds, a.woArpuData, 0, 0);
//                 }
//                 if (a.NET_TYPE == '3') {
//                     $("#left_progress").html('<P>--</P>');
//                     $("#right_progress").html('<P>--</P>');
//                     $("#useCallTitle").html('近三月平均上网');
//                     $("#useCallValue").html(a.AVG_KD_NET + '(天)');
//                     $("#useGprsTitle").html('近三月流量使用');
//                     $("#useGprsValue").html(a.GPRS_AVG_L6 + '(GB)');
//                     initEcharts(a.leds, a.woArpuData, 0, 0);
//                 }
//
//             } else {
//                 $("#userNameSpan").html("");
//                 $("#productNameSpan").html("");
//                 $("#familyTypeSpan").html("");
//                 $("#ifRhSpan").html("");
//                 $("#purchaseSpan").html("");
//                 $("#useCall").html("");
//                 $("#useGprs").html("");
//                 $("#terminalTimeSpan").html("");
//                 $("#lacTypeSpan").html("");
//                 $("#terminalSuportSpan").html("");
//                 $("#terminalBrandSpan").html("");
//             }
//         }
//     });
// }
var initCallList = function initCallList() {
    $.ajax({
        type: "POST",
        url: "h5CallData",
        data: {
            phoneNo: $("#strategySearch").val()
        },
        success: function (data) {
            var a = eval("(" + data + ")");
            if (a && a.callList) {
                var htm = '';
                var len = a.callList.length;
                for (var i = 0; i < len; i++) {
                    htm = htm + '<div class="call-list-item" >';
                    htm = htm + '<span class="item-number">' + a.callList[i].DEVICE_NUMBER1 + '</span>';
                    htm = htm + '<span class="item-type">' + a.callList[i].PRODUCT_TYPE + '</span>';
                    htm = htm + '<span class="item-btn" onclick="handleCallFn(\'' + a.callList[i].DEVICE_NUMBER + '\')">呼叫</span></div>';
                }
                $('#callDrawerList').html(htm);
            } else {
                $('#callDrawerList').html("");
            }
        }
    });
}
//initStrategy();
//initCustomer();
//initCallList();


var AcceptOrder = function AcceptOrder() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        //console.log('android');
        window.jsNfcInfo.jsAcceptOrder();
        return;
    }
    if (isiOS) {
        //console.log('ios');
        window.webkit.messageHandlers.jsAcceptOrder.postMessage({body: ""});
        return;
    }
}
var AcceptOrder2=function AcceptOrder2(){
	  var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid){
			//console.log('android');
			window.parent.postMessage({ actionCode: 'order' }, '*');
			return;
		}
		if(isiOS){
			//console.log('ios');
			window.parent.postMessage({ actionCode: 'order' }, '*');
			return;
		}
}

var gotoProbe = function () {
    var certId = $("#strategySearch").val();
    if (certId == 'undefined' || certId == undefined) {
        certId = '';
    }
    if (certId != '') {
        window.location.href = "SceneH5Probe2?certId=" + certId;
    } else {
        mui.alert('请填写用户号码！');
        return;
    }
}

//亲情号开始
function gotoQqh() {
    var tel = $("#strategySearch").val();
    if (!tel) {
        mui.alert('请填写用户号码！');
        return;
    }
    $.ajax({
        type: "POST",
        url: "getUserQqhInfo",
        data: {
            tel: tel
        },
        dataType: 'json',
        success: function (data) {
            // type = data.type;
            // desc = data.desc;
            // activity_id = type;
            // activity_name = desc;
            if (data != null && data.IS_MATCH_COND == '0') {
                $('#Qqh').hide();
                $('.title-card').show();
                mui.toast("该号码不满足亲情号推荐条件！");
                return;
            } else {
                // $("#qqh_type").html(desc);
                $('.title-card').hide();
                getQqhI();
                $('.mask').hide();
                $('.drawer').hide();
                $('#Qqh').show();
            }
        },
        error: function () {
            mui.alert('请稍后再试！');
        }
    });

}

var pageNum = 1; //当前页
var pageSize = 3; //页大小
var resultArray = [];
var totalPage;
var resultType

function getQqhI() {
    var tel = $("#strategySearch").val();
    if (!tel) {
        mui.alert('请填写用户号码！');
        return;
    }
    $("#u1").html('');
    $("#u2").html('');
    $("#u3").html('');
    $("#u4").html('');
    $("#u5").html('');
    $("#u6").html('');

    $.ajax({
        type: "POST",
        url: "getQqhType",
        data: {
            tel: tel,
        },
        dataType: 'json',
        success: function (result) {
            resultArray = [];
            var code = result.code;
            var msg = result.msg;
            var data = result.data;
            if (code == 1) {
                mui.toast(msg);
                return;
            }
            var total = data.length;
            totalPage = Math.ceil(total / pageSize); //页数
            for (var i = 0; i < totalPage; i++) {
                var pageArray = [];
                if ((totalPage - 1) == i) {
                    pageSize = total - (totalPage - 1) * 3
                }
                for (var j = 0; j < pageSize; j++) {
                    pageArray.push(data[(i * pageSize) + j]);
                }
                resultArray.push(pageArray);
            }
            QqhChangePage()
        },
        error: function () {
            //mui.toast('网络异常/接口异常！');
        }
    });
}

function QqhChangePage() {
    var tel = $("#strategySearch").val();
    if (tel == 'undefined' || tel == undefined) {
        tel = '';
    }
    if (tel == '') {
        mui.alert('请填写用户号码！');
        return;
    }
    var select_1 = null;
    var select_2 = null;
    var select_3 = null;
    var serial_number_1 = '';
    var select_rule_1 = '';
    var select_rule_name_1 = '';
    var TRANSACTION_ID = '';
    var area_no_1 = '';
    var serial_number_2 = '';
    var select_rule_2 = '';
    var select_rule_name_2 = '';
    var area_no_2 = '';
    var serial_number_3 = '';
    var select_rule_3 = '';
    var select_rule_name_3 = '';
    var area_no_3 = '';
    var numberArray = ['#u1', '#u2', '#u3']
    var typeArray = ['#u4', '#u5', '#u6']

    if (pageNum > totalPage) {
        pageNum = 1;
    }
    if (resultArray.length == 0) {
        return;
    }
    for (var i = 0; i < 3; i++) {
        $(numberArray[i]).html('');
        $(typeArray[i]).html('');
    }

    var result = resultArray[pageNum - 1]
    for (var i = 0; i < result.length; i++) {
        $(numberArray[i]).html(result[i].SERIAL_NUMBER);
        switch (i) {
            case 0 :
                select_1 = result[i]
                break;
            case 1 :
                select_2 = result[i]
                break;
            case 2 :
                select_3 = result[i]
                break;
        }
    }
    for (var i = 0; i < result.length; i++) {
        $(typeArray[i]).html(result[i].SELECT_RULE_NAME);
    }

    if (select_1 != null) {
        serial_number_1 = select_1.SERIAL_NUMBER;
        select_rule_1 = select_1.SELECT_RULE;
        select_rule_name_1 = select_1.SELECT_RULE_NAME;
        TRANSACTION_ID = select_1.TRANSACTION_ID;
        area_no_1 = select_1.CITY_CODE;
    }
    if (select_2 != null) {
        serial_number_2 = select_2.SERIAL_NUMBER;
        select_rule_2 = select_2.SELECT_RULE;
        select_rule_name_2 = select_2.SELECT_RULE_NAME;
        area_no_2 = select_2.CITY_CODE;
    }
    if (select_3 != null) {
        serial_number_3 = select_3.SERIAL_NUMBER;
        select_rule_3 = select_3.SELECT_RULE;
        select_rule_name_3 = select_3.SELECT_RULE_NAME;
        area_no_3 = select_3.CITY_CODE;
    }

    $.ajax({
        type: "POST",
        url: "insertQqhInfo",
        data: {
            tel: tel,
            activity_name: '',
            activity_id: '',
            serial_number_1: serial_number_1,
            serial_number_2: serial_number_2,
            serial_number_3: serial_number_3,
            select_rule_1: select_rule_1,
            select_rule_2: select_rule_2,
            select_rule_3: select_rule_3,
            select_rule_name_1: select_rule_name_1,
            select_rule_name_2: select_rule_name_2,
            select_rule_name_3: select_rule_name_3,
            TRANSACTION_ID: TRANSACTION_ID,
            area_no_1: area_no_1,
            area_no_2: area_no_2,
            area_no_3: area_no_3,
            pageNum: pageNum
        },
        // dataType: 'json',
        success: function (result) {
            // console.log(result);
        },
        error: function () {
            //mui.toast('网络异常/接口异常！');
        }
    });
    pageNum = pageNum + 1;
}

function closeQqh() {
    pageNum = 1;
    $('#Qqh').hide();
    $('.title-card').hide();
    $('.mask').hide();
    $('.drawer').hide();
}

//亲情号结束