var boncget = function() {
	/**ajax异步请求  带加载动画***/
	var boncAjax = function(urlKey, JsonParam, successFunction) {
		if(jQuery('#loading').length > 0) {
			var mask = mui.createMask(function() {
				jQuery('#loading').addClass("loading-hide");
			}); //遮罩层
			mask.show();
			jQuery('#loading').removeClass("loading-hide");
		}
		jQuery.ajax({
			url: getAccessAddressUrl(urlKey),
			type: 'post',
			data: {
				'JsonParam': JSON.stringify(JsonParam)
			},
			dataType: 'json',
			success: function(data) {
				if(data.code == '-1234'){
					mui.alert('用户身份验证失效,请重新登录');
					return false;
				}
				if (data && data.msg){
					// window.location.replace("/woApp/pages/card_uncontent.html?msg="+data.msg);
				}
				successFunction(data);
			},
			error: function() {
				//mui.toast('网络异常/接口异常！');
				// window.location.replace("/woApp/pages/card_uncontent.html?msg=未知错误,请联系管理");
			},
			complete: function() {
				jQuery('#loading').addClass("loading-hide");
				jQuery(".mui-backdrop").remove();
			}
		});
	}
	/**ajax异步请求***/
	var bonc_Ajax = function(urlKey, JsonParam, successFunction) {
		jQuery.ajax({
			url: getAccessAddressUrl(urlKey),
			type: 'post',
			data: {
				'JsonParam': JSON.stringify(JsonParam)
			},
			dataType: 'json',
			success: function(data) {
				if(data.code == '-1234'){
					mui.alert('用户身份验证失效,请重新登录');
					return false;
				}
				if (data && data.msg){
					// window.location.replace("/woApp/pages/card_uncontent.html?msg="+data.msg);
				}
				successFunction(data);
			},
			error: function() {
				//mui.toast('网络异常/接口异常！');
				// window.location.replace("/woApp/pages/card_uncontent.html?msg=未知错误,请联系管理");
			}
		});
	}

	/**ajax异步请求***/
	var new_Ajax = function(urlKey, JsonParam, successFunction) {
		if(jQuery('#loading').length > 0) {
			var mask = mui.createMask(function() {
				jQuery('#loading').addClass("loading-hide");
			}); //遮罩层
			mask.show();
			jQuery('#loading').removeClass("loading-hide");
		}
		jQuery.ajax({
			url: domainNameWWW() + urlKey,
			type: 'post',
			data: {
				'JsonParam': JSON.stringify(JsonParam)
			},
			dataType: 'json',
			success: function(data) {
				if(data.code == '-1234'){
					mui.alert('用户身份验证失效,请重新登录');
					return false;
				}
				if (data && data.msg){
					// window.location.replace("/woApp/pages/card_uncontent.html?msg="+data.msg);
				}
				successFunction(data);
			},
			error: function() {
				//mui.toast('网络异常/接口异常！');
				// window.location.replace("/woApp/pages/card_uncontent.html?msg=未知错误,请联系管理");
			}
			,
						complete: function() {
							jQuery('#loading').addClass("loading-hide");
							jQuery(".mui-backdrop").remove();
						}
		});
	}
	var new_Ajax_Aysnc = function(urlKey, JsonParam, successFunction) {
		if(jQuery('#loading').length > 0) {
		    var mask = mui.createMask(function() {
		        jQuery('#loading').addClass("loading-hide");
		    }); //遮罩层
		    mask.show();
		    jQuery('#loading').removeClass("loading-hide");
		}
		jQuery.ajax({
			url: domainNameWWW() + urlKey,
			type: 'post',
			data: {
				'JsonParam': JSON.stringify(JsonParam)
			},
			async: false,
			dataType: 'json',
			success: function(data) {
				if(data.code == '-1234'){
					mui.alert('用户身份验证失效,请重新登录');
					return false;
				}
				if (data && data.msg){
					// window.location.replace("/woApp/pages/card_uncontent.html?msg="+data.msg);
				}
				successFunction(data);
			},
			error: function() {
				//mui.toast('网络异常/接口异常！');
				// window.location.replace("/woApp/pages/card_uncontent.html?msg=未知错误,请联系管理");
			}
			,
						complete: function() {
							jQuery('#loading').addClass("loading-hide");
							jQuery(".mui-backdrop").remove();
						}
		});
	}
	var new_Ajax1 = function(urlKey, JsonParam, successFunction) {
		if(jQuery('#loading').length > 0) {
			var mask = mui.createMask(function() {
				jQuery('#loading').addClass("loading-hide");
			}); //遮罩层
			mask.show();
			jQuery('#loading').removeClass("loading-hide");
		}
		jQuery.ajax({
			url: domainNameWWW() + urlKey,
			type: 'post',
			data: {
				'JsonParam': JSON.stringify(JsonParam)
			},
			dataType: 'json',
			success: function(data) {
				if(data.code == '-1234'){
					mui.alert('用户身份验证失效,请重新登录');
					return false;
				}
				if (data && data.msg){
					// window.location.replace("/woApp/pages/card_uncontent.html?msg="+data.msg);
				}
				successFunction(data);
			},
			error: function() {
				//mui.toast('网络异常/接口异常！');
				// window.location.replace("/woApp/pages/card_uncontent.html?msg=未知错误,请联系管理");
			},
			complete: function() {
				jQuery('#loading').addClass("loading-hide");
				jQuery(".mui-backdrop").remove();
			}
		});
	}
	/**ajax异步请求***/ //需要完整的url，试用于本机调试
	var Allurl_Ajax = function(urlKey, JsonParam, successFunction) {
		/*if(jQuery('#loading').length > 0) {
			var mask = mui.createMask(function() {
				jQuery('#loading').addClass("loading-hide");
			}); //遮罩层
			mask.show();
			jQuery('#loading').removeClass("loading-hide");
		}*/
		jQuery.ajax({
			url: urlKey,
			type: 'post',
			data: {
				'JsonParam': JSON.stringify(JsonParam)
			},
			dataType: 'json',
			success: function(data) {
				if(data.code == '-1234'){
					mui.alert('用户身份验证失效,请重新登录');
					return false;
				}
				if (data && data.msg){
					// window.location.replace("/woApp/pages/card_uncontent.html?msg="+data.msg);
				}
				successFunction(data);
			},
			error: function() {
				//mui.toast('网络异常/接口异常！');
				// window.location.replace("/woApp/pages/card_uncontent.html?msg=未知错误,请联系管理");
			},
			/*complete: function() {
				jQuery('#loading').addClass("loading-hide");
				jQuery(".mui-backdrop").remove();
			}*/
		});
	}

	/**域名***/
	var domainNameWWW = function() {
				// return "http://192.168.1.137:12345/";//局域网测试
		// 		return "http://10.48.46.175:8486/SSPMobileServer/"; //内网开发环境地址
		// 		 return "https://221.192.1.84:8486/SSPMobileServer/"; //正式环境
				return "https://221.192.1.84:8486/SSPMobileServerTest/"; //准生产环境
	}
    //跳转用
    var domainNameWWW2 = function(){
		// return "http://10.48.46.175:8486/woapp/";//内网开发环境地址
//		return "http://localhost:12345";//本地测试地址
// 		return "https://221.192.1.84:8486/woApp/"; //正式环境
        return "https://221.192.1.84:8486/woAppTest/"; //准生产环境
    }
    var domainNameWWW3 = function(){
//		return "http://10.48.46.175:8486/";//内网开发环境地址
//		return "http://localhost:12345";//本地测试地址
// 		return "https://221.192.1.84:8486/"; //正式环境
        return "https://221.192.1.84:8486/"; //准生产环境
    }
	/**接口访问地址***/
	var getAccessAddressUrl = function(key) {
		var jsonUrl = {
			'myDevelopment': 'myDevelopment/index', //上级要求-我的发展卡片
			'dayDevelopment': 'myDevelopment/changeym', //上级要求-日发展
			'monDevelopment': 'myDevelopment/userDevelopmentMonInfo', //上级要求-月发展
			'dayDevelopmentOrder': 'myDevelopment/changeorderbyym', // 上级要求-日发展排序
			'DevelopmentMonOrder': 'myDevelopment/userDevelopmentMonOrder', //上级要求 - 月发展排序
			'userOnlineDay': 'myCustomer/userOnlineDay', //我的客户卡片 -日
			'userOnlineMon': 'myCustomer/userOnlineMon', //我的客户卡片 -月
			'onlinedayDevelopment': 'myCustomer/userOnlineDayInfo', //我的客户-用户在网  日
			'userOnlineDayOrder': 'myCustomer/userOnlineDayOrder', //我的客户-用户在网   日 排序
			'userOnlineMonInfo': 'myCustomer/userOnlineMonInfo', //我的客户-用户在网 月
			'userOnlineMonInfoOrder': 'myCustomer/userOnlineMonInfoOrder', //我的客户-用户在网 月 排序
			'userOutlineMonthInfo': 'myCustomer/userOutlineMonthInfo', //我的客户 - 用户离网 月
			'userOutlineDayInfo': 'myCustomer/userOutlineDayInfo', //我的客户-用户离网 日
			'userOutlineDayOrder': 'myCustomer/userOutlineDayOrder', //我的客户-用户离网 日 排序
			'userNetincDayInfo': 'myCustomer/userNetincDayInfo', //我的客户- 用户净增 日
			'userNetincMonthInfo': 'myCustomer/userNetincMonthInfo', //我的客户-净增月
			'userDevDayInfo': 'myCustomer/userDevDayInfo', //我的客户- 员工发展 日
			'userDevMonInfo': 'myCustomer/userDevMonInfo', //我的客户-员工发展 月
			'MywarningCard': 'myWarning/myWarningDay', //我的预警 首页卡片
			'myWarningDayInfo': 'myWarning/myWarningDayInfo', //我的预警 列表
			'WarningDayInfo1': 'myWarning/myWarningDayInfo1', // 我的预警 下钻
			'rowingmatchInfo': 'rowingmatch/rowingmatchInfo', //划配轨迹
			'getUserView': 'user360View/getUser360View', //用户视图详情
			'getUserList': 'myCustomer/getUserList', //用户视图 列表
			'dataAnnounce': 'dataAnnounce/indexCard', // 数据通报 卡片
			'dataAnnounceList': 'dataAnnounce/dataAnnounceList', //数据通报列表
			'dataAnnounceInfo': 'dataAnnounce/dataAnnounceInfo', // 数据通报详情
			'myHumanResourceTeam': 'myHumanResource/myHumanResourceTeam', //我的人力 团队成员列表
			'myHumanResourceTeamDetails': 'myHumanResource/myHumanResourceTeamDetails', // 我的人力 团队成员 详情
			'myHumanResourceTeamDetailsExtend': 'myHumanResource/myHumanResourceTeamDetailsExtend', //我的人力 团队成员 扩展信息 
			'myHumanResourceTeamDetailsEdit': 'myHumanResource/myHumanResourceTeamDetailsEdit', //我的人力 团队成员 编辑
			'myHumanResourceView': 'myHumanResource/myHumanResourceView', //我的人力 360视图
			'changeym': 'MyIncome/changeym', //我的收益 下钻
			'changeym2': 'MyIncome/changeym2',
			'changeorderbyym': 'MyIncome/changeorderbyym', // 我的收益排序
			'MyChannelArpu': 'MyChannel/MyChannelArpu', //渠道佣金
			'MyChannelArpuOrder': 'MyChannel/MyChannelArpuOrder', //渠道佣金排序
			'saleSearch': 'encourage/saleSearch', //销售清单
			'saleSum': 'encourage/saleSum', //销售汇总
			'indexCard': 'myDevelopment/indexCard', //日发展 月发展 首页卡片
			'myIndexCard': 'encourage/myIndexCard', //即时激励首页卡片
			'getIncomeCard': 'MyIncome/getIncomeCard', //我的收入 首页卡片
			'MyChannelCard': 'MyChannel/MyChannelCard', // 我的渠道首页卡片
			'cardList': 'rank/cardList', //员工排行首页卡片
			'myWarninglist': 'myWarning/myWarninglist', //我的预警下钻到清单列表
			'mixDevDayInfo': 'myCustomer/mixDevDayInfo', //我的客户- 融合发展 日
			'mixDevMonInfo': 'myCustomer/mixDevMonInfo' //我的客户- 融合发展 月
		};
		return domainNameWWW() + jsonUrl[key];
	}

	return {
		getUrl: function(key) {
			return getAccessAddressUrl(key);
		},
		getWWW: function() {
			return domainNameWWW();
		},
        getWWW2:function(){//跳转用
            return domainNameWWW2();
        },
        getWWW3:function(){//跳转用
            return domainNameWWW3();
        },
		boncAjax: function(urlKey, JsonParam, successFunction) {
			boncAjax(urlKey, JsonParam, successFunction);
		},
		bonc_Ajax: function(urlKey, JsonParam, successFunction) {
			bonc_Ajax(urlKey, JsonParam, successFunction);
		},
		new_Ajax: function(urlKey, JsonParam, successFunction) {
			new_Ajax(urlKey, JsonParam, successFunction);
		},
		new_Ajax_Async: function(urlKey, JsonParam, successFunction) {
			new_Ajax_Aysnc(urlKey, JsonParam, successFunction);
		},
		new_Ajax1: function(urlKey, JsonParam, successFunction) {
			new_Ajax1(urlKey, JsonParam, successFunction);
		},
		Allurl_Ajax: function(urlKey, JsonParam, successFunction) {
			Allurl_Ajax(urlKey, JsonParam, successFunction);
		},
	};
}();

/**
 * 获取屏幕高度
 */
function getClientHeight() {
	var clientHeight = 0;
	if(document.body.clientHeight && document.documentElement.clientHeight) {
		var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	} else {
		var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	}
	return clientHeight;
}

/**
 * 获取屏幕宽度
 */
function getClientWidth() {
	var clientHeight = 0;
	if(document.body.clientWidth && document.documentElement.clientWidth) {
		var clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
	} else {
		var clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
	}
	return clientWidth;
}
//url参数解析
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) {
		return decodeURI(r[2]);
	} else {
		return null; //返回参数值
	}
}
// 解析原生传的参数
function getJsonParam(name) {
	var urlParam = getUrlParam(name);
	var jsonpa = eval('(' + urlParam + ')');
	return jsonpa;
}

//格式化数字
function  number_format(number, decimals, dec_point, thousands_sep, roundtag) {
	number = (number  + '').replace(/[^0-9+-Ee.]/g, '');
	roundtag  =  roundtag  ||  "ceil";  //"ceil","floor","round"
	var  n  =  !isFinite(+number)  ?  0  :  +number,
		prec  =  !isFinite(+decimals)  ?  0  :  Math.abs(decimals),
		sep  =   (typeof  thousands_sep  ===  'undefined')  ?  ','  :  thousands_sep,
		dec  =   (typeof  dec_point  ===  'undefined')  ?  '.'  :  dec_point,
		s  =  '',
		toFixedFix  =   function (n,  prec)  {
			var  k  =  Math.pow(10,  prec);
			return  ''  +  parseFloat(Math[roundtag](parseFloat((n  *  k).toFixed(prec * 2))).toFixed(prec * 2))  /  k;
		};
	s  =   (prec  ?  toFixedFix(n,  prec)  :  ''  +  Math.round(n)).split('.');
	var  re  =  /(-?\d+)(\d{3})/;
	while (re.test(s[0]))  {
		s[0]  =  s[0].replace(re,  "$1"  +  sep  +  "$2");
	}
	if ((s[1]  ||  '').length  <  prec)  {
		s[1]  =  s[1]  ||  '';
		s[1]  +=  new  Array(prec  -  s[1].length  +  1).join('0');
	}
	return  s.join(dec);
}

(function() {
	var loadingTemplate = '<div id="loading" class="loading-box loading-hide">\n' +
		'<div class="spinner">\n' +
		'<div class="rect1"></div>\n' +
		'<div class="rect2"></div>\n' +
		'<div class="rect3"></div>\n' +
		'<div class="rect4"></div>\n' +
		'<div class="rect5"></div>\n' +
		'</div>\n' +
		'</div>';
	jQuery('html').append(loadingTemplate);
})()
//加水印标记方法  字体大小 22px
function addWaterMarker(str, div, width, height) {
	var can = document.createElement('canvas');
	var body = jQuery(div);
	//body.append(can);
	can.width = width;
	can.height = height;
	can.style.display = 'none';
	var cans = can.getContext('2d');
	cans.rotate(-20 * Math.PI / 180);
	cans.font = "22px Microsoft JhengHei";
	cans.fillStyle = "#DDDDDD";
	cans.textAlign = 'left';
	cans.textBaseline = 'Middle';
	cans.fillText(str, can.width / 15, can.height / 1);
	//	body.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
	body.css("background-image", "url(" + can.toDataURL("image/png") + ")");
	//	$("body").css("background","url(" + can.toDataURL("image/png") + ")")
}

//加水印标记方法 字体大小13px
function addWaterMarkermore(str, div, width, height) {
	var can = document.createElement('canvas');
	var body = jQuery(div);
	//body.append(can);
	can.width = width;
	can.height = height;
	can.style.display = 'none';
	var cans = can.getContext('2d');
	cans.rotate(-20 * Math.PI / 180);
	cans.font = "13px Microsoft JhengHei";
	cans.fillStyle = "#DDDDDD";
	cans.textAlign = 'left';
	cans.textBaseline = 'Middle';
	cans.fillText(str, can.width / 15, can.height / 1);
	//	body.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
	body.css("background-image", "url(" + can.toDataURL("image/png") + ")");
	//	$("body").css("background","url(" + can.toDataURL("image/png") + ")")
}

//右上角标记按钮 需要引入BoncAppEngine.js
function remark() {
	var navigationSetting = {
		"naviRightBtnList": [{
			"id": "1",
			"isWebHandle": "1",
			"localImageName": "icon_share_btn_ha"
		}]
	};
	boncAppEngine.webNavigation.parentItemHandler = function(id) {
		var jsonId = JSON.parse(JSON.stringify(id));
		if(jsonId.id == "1") {
			boncAppEngine.remarkAndShare();
		}
	};
	boncAppEngine.webNavigation.setNaviagtionShowStyle(navigationSetting);
}

function gettime(n, m) { // m:day 日 mon 月  n:数字 格式2019-04-25
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(month + n <= 0) {
		year = year - 1;
		month = 12 + month + n;
	} else if(month + n > 12) {
		year = year + 1;
		month = month + n - 12;
	} else {
		month = month + n;
	}
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(m == 'day') {
		if(month == '04' || month == '06' || month == '09' || month == 11) {
			if(strDate > 30) {
				strDate = 30;
			}
		} else if(month == '02') {
			if(year % 4 == 0 && year % 100 != 0) {
				if(strDate > 29) {
					strDate = 29;
				}
			} else {
				if(strDate > 28) {
					strDate = 28;
				}
			}
		}
		return year + seperator1 + month + seperator1 + strDate;
	} else {
		return year + seperator1 + month;
	}
}
function getTime(n, m) { // m:day 日 mon 月  n:数字 格式20190425
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if(month + n <= 0) {
        year = year - 1;
        month = 12 + month + n;
    } else if(month + n > 12) {
        year = year + 1;
        month = month + n - 12;
    } else {
        month = month + n;
    }
    if(month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if(m == 'day') {
        if(month == '04' || month == '06' || month == '09' || month == 11) {
            if(strDate > 30) {
                strDate = 30;
            }
        } else if(month == '02') {
            if(year % 4 == 0 && year % 100 != 0) {
                if(strDate > 29) {
                    strDate = 29;
                }
            } else {
                if(strDate > 28) {
                    strDate = 28;
                }
            }
        }
        return year + seperator1 + month + seperator1 + strDate;
    } else {
        return year + seperator1 + month;
    }
}
//nowTime 2018-02-03  获取上月同期 
function getyesDayorMon(nowTime, n, m) { // m:day 日 mon 月   n:num类型  -的就是前 +的是后  返回数据不带'-'
	var date = nowTime;
	var seperator1 = "";
	var year = parseInt(date.substring(0, 4));
	var month = parseInt(date.substring(5, 7));
	var strDate = parseInt(date.substring(8, 10));
	if(m =='mon'){
		if(month + n <= 0) {
			year = year - 1;
			month = 12 + month + n;
		} else if(month + n > 12) {
			year = year + 1;
			month = month + n - 12;
		} else {
			month = month + n;
		}
	}else if(m == 'day'){
		if(strDate + n <= 0) {
			month = month - 1;
			strDate = 31;
			if(month <= 0){
				year = year - 1;
				month = 12 + month;
			}
		}else{
			strDate = strDate + n;
		}
	}
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(month == '04' || month == '06' || month == '09' || month == '11') {
		if(strDate > 30) {
			strDate = 30;
		}
	} else if(month == '02') {
		if(year % 4 == 0 && year % 100 != 0) {
			if(strDate > 29) {
				strDate = 29;
			}
		} else {
			if(strDate > 28) {
				strDate = 28;
			}
		}
	}
	if(strDate>=1 && strDate<=9){
		strDate ='0'+ strDate;
	}
	return year + seperator1 + month + seperator1 + strDate;
}



//获取省份编码方法

function getStaffId() {
	$.ajax({
		type: "POST",
		url: "design/pro_auth",
		success: function(data) {
			console.log(data, '1234557')
			localStorage.setItem('proId', data)
		}
	})
}