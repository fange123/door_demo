function securityCheck() {
	jQuery("#errorInfoDiv").html("");
	var u = jQuery("#userName2").val();
	var p = jQuery("#password2").val();
	if (null == u || "" == u || null == p || "" == p ) {
		alert("用户名、密码不能为空！");
		return false;
	}
	p=hex_md5(p).toUpperCase();
	var url = "securityCheck";
	var d = {
		"userName" : u,
		"password" : p
	};
	/*jQuery.post(url, d, function(data) {
		if ("success" == data) {
			go("charge");
		} else{
			alert(data);
			document.getElementById("loginForm2").reset();
		}
	});*/
	$.ajax({
        type: "POST",
        url: url,
        data: d,
        async:false,
        //dataType: "json",
        success: function(data){
		        	if ("success" == data) {
		    			go("charge");
		    		} else{
		    			alert(data);
		    			document.getElementById("loginForm2").reset();
		    		}
                 }
    });
}
function fnreset(){
	document.getElementById("loginForm").reset();
}
function keyLogin() {
	if (13 == event.keyCode)
		securityCheck();
}
function go(u) {
	if (document.all) {
		alert(2);
		document.write("<a id='goa' href='" + u
				+ "' style='display:none;'>a</a>");
		document.getElementById("goa").click();
	} else
		window.location = u;
}
