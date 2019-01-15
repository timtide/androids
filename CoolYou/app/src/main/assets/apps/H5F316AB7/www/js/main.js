//url传参
//$('.link').each(function(){
// var thislink=encodeURI(encodeURI(thislink));//中文编码转换
// $(this).attr('href',thislink);
//})

//隐藏滚动条
mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		'scrollIndicator': 'none'
	});
})

var o_bodyheight = window.screen.height;
if (o_bodyheight == 812) {
	$('.defaulthead.headfixed').css('padding-top', '35px');
}

//url接参函数
function GetRequest() {
	var gurl = location.search; //获取url中"?"符后的字串
	gurl = decodeURI(decodeURI(gurl)); //中文编码解码
	var theRequest = new Object();
	if (gurl.indexOf("?") != -1) {
		var str = gurl.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//获取url中"?"符后的字串
function GetRequests(slocation) {
	var url = slocation.split('?')[1];
	url = "?" + url;
	url = decodeURI(url); //中文编码解码
	url = decodeURI(url); //中文编码解码
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//时间戳函数
Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
				date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
}

//获取 年月日格式的日期
function getDateFormat(date) {
	var timestamp = Number(date);
	var newDate = new Date();
	newDate.setTime(timestamp * 1000);
	return newDate.format('yyyy-MM-dd hh:mm:ss');
}

//var timestamp = 1403058804;
//var newDate = new Date();
//newDate.setTime(timestamp * 1000);
//console.log(newDate.format('yyyy-MM-dd h:m:s'));

//正则去除所有空格
function removeAllSpace(str) {
	return str.replace(/\s+/g, "");
}

//修改电池栏
function setbcolor(sbcolor) {
	plus.navigator.setStatusBarStyle(sbcolor);
}

var svgppath =
	'M511.840925 1023.996556A512.051567 512.051567 0 0 1 12.941797 625.867643C-49.506694 354.218101 120.367351 79.273468 391.141925 14.833029 521.688965-16.24694 645.906452 1.773671 763.375518 66.577129c15.358475 8.470432 21.818343 23.028405 17.275958 38.256566-4.26314 14.288036-17.797215 24.145385-32.718207 22.553688-5.919994-0.632955-11.979611-3.071695-17.257341-6.003768-46.605991-25.858088-96.041666-43.841466-148.744507-51.632401-120.196359-17.778599-230.963544 7.26037-329.881433 78.09552C153.811595 218.169934 92.843102 313.7555 71.536708 432.723181 28.802914 671.32873 180.200248 892.472158 406.360778 947.390343c238.186682 57.840949 478.244305-85.877147 539.20349-323.319176 29.599971-115.309571 14.474199-225.723046-42.826876-330.179295-3.900122-7.102131-7.148672-14.260112-6.208547-22.581613 1.638237-14.427659 11.467662-25.485761 24.992428-28.296827 14.288036-2.969305 27.403243 2.764526 34.877701 15.730802a496.739633 496.739633 0 0 1 37.82839 82.340044c100.602667 284.169026-63.733019 592.427588-355.776754 667.246633a504.279248 504.279248 0 0 1-126.609685 15.665645z m-63.760943-426.853916c2.708677-3.90943 3.825657-6.162006 5.510434-7.846785 74.986592-75.088982 150.038342-150.094191 224.987702-225.211097 9.047538-9.066155 19.184132-13.96225 32.169024-11.039486 23.475197 5.277731 32.950911 33.323237 17.452813 51.734792-1.563772 1.861633-3.332324 3.537103-5.054334 5.259114-82.982308 83.01954-165.964615 166.03908-248.965539 249.049312-17.220109 17.210801-34.747387 17.26665-51.893031 0.139623-41.309645-41.235179-82.684446-82.386585-123.863776-123.733462-18.085768-18.150925-10.983637-47.332028 13.096591-54.015292 12.566025-3.490563 23.437964 0.093082 32.671665 9.317475 32.792672 32.857829 65.687734 65.622576 98.480406 98.480405 1.694086 1.694086 2.79245 4.002512 5.398737 7.865401z';

//播放支付完成动画
function playpaydone() {

	$('body').append(
		'<div id="paydone"><svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="' +
		svgppath + '"></path></svg>提交成功！</div>');

	playsound();

	setTimeout(function() {
		plus.device.vibrate(100);
		$('#paydone').slideDown('fast');
	}, 300);

	setTimeout(function() {
		$('#paydone').slideUp('fast');
		setTimeout(function() {
			$('#paydone').remove();
		}, 500);
	}, 3000);

}

function playOnce(src) {
	if (window.plus) {
		var s = plus.audio.createPlayer(src);
		s.play(function() {
			//setTimeout(function(){
			delete s;
			s = null;
			//},300);
		});
	}
}

//播放等待动画
var showcsswait = 0;

function showcssWaiting() {
	if (showcsswait == 1) {
		return
	};
	showcsswait = 1;
	//	$('body').append('<div class="csswait"><div class="rotation"><div class="rectangle"></div></div></div>');
	$('body').append(
		'<div class="csswait"><div class="circle"><i class="i_1"></i><i class="i_2"></i><i class="i_3"></i><i class="i_4"></i></div></div>'
	);

	$('.csswait').fadeIn('fast');
}

function closecssWaiting() {
	$('.csswait').fadeOut('fast', function() {
		$('.csswait').remove();
		showcsswait = 0
	})
}

//显示 CSS提示文字
function showtoast(inoftext) {
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	$('body').append('<div class="resulttoast" rtid="' + timestamp +
		'"><i class="fa fa-info-circle"></i><span class="resultinfo">' + inoftext + '</span></div>')
	var thistoast = $('.resulttoast[rtid="' + timestamp + '"]');
	thistoast.fadeIn('fast');
	setTimeout(function() {
		thistoast.fadeOut('fast');
		setTimeout(function() {
			thistoast.remove()
		}, 500)
	}, 1200)
}

//判断是否登录
function loginIf(showptip) {
	if (!plus.storage.getItem("user_login")) {
		if (showptip != 0) {
			plus.nativeUI.toast('请先登录！');
		}
		mui.openWindow({
			url: 'login.html?act=login',
			id: 'login.html'
		})
		return 0;
	} else {
		return 1;
	}
}

//打开网页窗口--start

var havetopbar = 1; //是否包含电池栏
function openWeb(a, isplus) {

	if (!isplus) {
		isplus = '';
	}

	//阻止反复打开链接
	if (plus.webview.getWebviewById('webpagebox' + isplus + '.html')) {
		return
	};
	if (plus.webview.getWebviewById('webpage' + isplus + '.html')) {
		return
	};
	if (plus.webview.getWebviewById('inpage' + isplus)) {
		return
	};

	//创建窗口
	var ctrpagetop = (havetopbar == 0) ? 50 : 75;
	var ctrpagebt = (o_bodyheight == 812) ? 25 : 0;

	mui.openWindow({
		url: 'webpagebox.html?isplus=' + isplus,
		id: 'webpagebox' + isplus + '.html',
		styles: {
			top: 0,
			bottom: 0
		}
	})
	var boxpage = plus.webview.getWebviewById('webpagebox' + isplus + '.html');

	var inembed = plus.webview.create(a, 'inpage' + isplus, {
		top: ctrpagetop,
		bottom: ctrpagebt
	});
	boxpage.append(inembed);
	var webshow = plus.webview.getWebviewById('inpage' + isplus);

	ctrpagetop += 15;
	var ctrembed = plus.webview.create('webpage.html?isplus=' + isplus, 'webpage' + isplus + '.html', {
		top: 0,
		height: ctrpagetop,
		position: 'absolute',
		scrollIndicator: 'none',
		background: 'transparent'
	});
	boxpage.append(ctrembed);
	var wps = plus.webview.getWebviewById('webpage' + isplus + '.html');

	//载入完成显示
	var openindex = '';
	var openindextitle = '';

	webshow.addEventListener('loading', function() {
		wps.evalJS("loadingst();");
	})

	webshow.addEventListener('loaded', function() {
		var thisurl = webshow.getURL();
		var linktitle = webshow.getTitle();
		webshow.evalJS(
			"if(window.plus){alertReady()}else{document.addEventListener('plusready',alertReady,false)};function alertReady(){var _alert=window.alert;window.alert=function(){plus.nativeUI.alert(arguments[0])}};"
		);

		if (linktitle && linktitle != null) {

			if (openindex == '') {
				openindex = webshow.getURL();
				openindextitle = linktitle;
			};

			if (linktitle.length < 8) {
				setTimeout(function() {
					wps.evalJS("$('#title').text('" + linktitle + "');window.clearTimeout(closerotation);")
				}, 200)
			};

		}
	})

};

//打开网页窗口--end

//分享--start
function onshare() {
	if (!document.getElementById('sharebox')) {
		$('body').append(
			'<div id="sharebox"><ul><li><i class="shareico-1"></i><span>微信好友</span></li><li><i class="shareico-2"></i><span>朋友圈</span></li><li><i class="shareico-3"></i><span>新浪微博</span></li></ul><div class="cancel">取消</div></div>'
		);
	}

	if (!document.getElementById('sharecover')) {
		$('body').append('<div id="sharecover" class="coverbox"></div>');
	}

	$('#sharecover').fadeIn();
	$('#sharebox').slideDown();

}

mui('body').on('tap', '#sharecover,#sharebox .cancel', function(e) {
	$('#sharecover').fadeOut();
	$('#sharebox').slideUp();
});

mui('body').on('tap', '#sharebox li', function(e) {
	mui.toast('功能完善中...');
});

//分享--end

//在线加载缓存背景
function ready_bg(jQdom, bgsrc) {
	var background = new Image();
	background.src = bgsrc;
	background.onload = function() {
		jQdom.addClass('ready_bg');
		jQdom.css('backgroundImage', 'url(' + bgsrc + ')');
		jQdom.each(function() {
			this.style.animationName = 'bg_fadein';
			setTimeout(function() {
				jQdom.removeClass('ready_bg');
			}, 500)
		})
	}
}

//缓存图片--start
var imgnamearr = [];

function isInArray(arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (value === arr[i]) {
			return true;
		}
	}
	return false;
}

function img_cache(imagesrc, imgtype, imgname) {

	//imgname 为图片的文件名，不能带路径
	var img_cache_dom = $('.img_cache' + imgtype + '[imgname="' + imgname + '"]');
	var relativePath = '_www/img/destination/' + imgname;
	plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
		back_cache(relativePath, img_cache_dom, imgtype);
	}, function(e) {
		if (isInArray(imgnamearr, imgname)) {
			return
		}
		var relativePath = '_downloads/' + imgname;
		plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
			back_cache(relativePath, img_cache_dom, imgtype);
		}, function(e) {
			if (isInArray(imgnamearr, imgname)) {
				return
			}
			var dtask = plus.downloader.createDownload(imagesrc, {}, function(d, status) {
				if (status == 200) {
					back_cache(d.filename, img_cache_dom, imgtype)
				};
			});
			imgnamearr.push(imgname);
			dtask.start();
		});
	});

}

function back_cache(gurl, dom, type) {
	var furl = plus.io.convertLocalFileSystemURL(gurl);
	if (dom) {
		if (type == '_bg') {
			ready_bg(dom, furl);
		};
		if (type == '_src') {
			dom.attr('src', furl)
		};
	}
}

//缓存图片--end

//iOS 强制显示键盘
function showSoftInput(item) {
	if (mui.os.ios) {
		plus.webview.currentWebview().nativeInstanceObject().plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": false
		});
		$(item).focus();
	}
};
