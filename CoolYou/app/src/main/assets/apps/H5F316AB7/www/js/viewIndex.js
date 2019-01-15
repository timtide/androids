//原始appid Android H5F316AB7---iOS HBuilder
//本地测试站 localStorage.setItem('ajaxlinkhead','http://192.168.1.120:1981');
//线上测试站 localStorage.setItem('ajaxlinkhead','http://ts.91hlife.com');

//个推账号
//账户 akai1993
//密码 akai1993@123
//appid	 	 ii75ypeljN8JXXr4ptwaw
//appkey	 yzgfOGAdSX7otqt9oc3fRA
//appscerct	 RedAiHAbwv9xqU3BmBdzj3

//设置线上域名
localStorage.setItem('ajaxlinkhead', 'https://qj.kkg222.com');
//设置聊天资源
localStorage.setItem('chatlinkhead', 'msg.kkg222.com');

//安装包链接
let storelink='https://fir.im/WaTravel';
if (mui.os.ios){
	storelink='itms-apps://itunes.apple.com/cn/app/%E9%85%B7%E6%97%85%E7%AE%A1%E5%AE%B6-%E8%AE%A9%E4%BD%A0%E7%9A%84%E6%97%85%E6%B8%B8%E8%A1%8C%E7%A8%8B%E6%9B%B4%E7%AE%80%E5%8D%95/id1281388076?mt=8';
}

// 跳转链接--start

mui('body').on('tap', '#addpost', function(e) {
	if (loginIf() != 0) {
		$('input').blur();
		mui.openWindow({
			url: 'addpost.html',
			id: 'addpost.html'
		})
	};
});

mui('body').on('tap', '#post', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'post.html',
			id: 'post.html'
		})
	};
});

mui('body').on('tap', '#mytravels', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'mytravels.html',
			id: 'mytravels.html'
		})
	};
});

mui('body').on('tap', '#mycompanion', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'mycompanion.html',
			id: 'mycompanion.html'
		})
	};
});

mui('body').on('tap', '#wallet', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'wallet.html',
			id: 'wallet.html'
		})
	};
});

mui('body').on('tap', '#passenger', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'passenger.html',
			id: 'passenger.html'
		})
	};
});

mui('body').on('tap', '#collect', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'collect.html',
			id: 'collect.html'
		})
	};
});

mui('body').on('tap', '#address', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'address.html',
			id: 'address.html'
		})
	};
});

mui('body').on('tap', '#editpw', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'editpw.html',
			id: 'editpw.html'
		})
	};
});

mui('body').on('tap', '#userheadbox,#ouserdata', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'userdata.html',
			id: 'userdata.html'
		})
	};
});

mui('body').on('tap', '#upgrade-8', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'upgrade.html?uptype=8',
			id: 'upgrade.html'
		})
	};
});

mui('body').on('tap', '#upgrade-9', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'upgrade.html?uptype=9',
			id: 'upgrade.html'
		})
	};
});

mui('body').on('tap', '#nearby', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'searchuser.html',
			id: 'searchuser.html'
		})
	};
});

mui('body').on('tap', '#aboutus,#logooutbox', function(e) {
	mui.openWindow({
		url: 'aboutus.html',
		id: 'aboutus.html'
	})
});

mui('body').on('tap', '#navsearch,.searchdest', function(e) {
	mui.openWindow({
		url: 'booksearch.html',
		id: 'booksearch.html'
	})
});

mui('body').on('tap', '.moreline[mtype="book"]', function(e) {
	mui.openWindow({
		url: 'bookslist.html?cid=515&title=更多推荐路书',
		id: 'bookslist.html'
	});
});

mui('body').on('tap', '#moretravels,#totravel', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'moretravels.html',
			id: 'moretravels.html'
		});
		plus.webview.getWebviewById('moretravels.html').addEventListener('close', function() {
			setbcolor('dark')
		});
	};
});

mui('body').on('tap', '#morecusts,.moreline[mtype="cust"]', function(e) {
	if (loginIf() != 0) {
		mui.openWindow({
			url: 'morecusts.html',
			id: 'morecusts.html'
		});
		plus.webview.getWebviewById('morecusts.html').addEventListener('close', function() {
			setbcolor('dark')
		});
	};
});

mui('body').on('tap', '.custbox .terminilist li,.custbox .destli', function(e) {
	if (loginIf() != 0) {
		var thistitle = $(this).find('h2').text() || $(this).find('h1').text();
		mui.openWindow({
			url: 'bookslist.html?cid=' + $(this).attr('cid') + '&title=' + thistitle,
			id: 'bookslist.html'
		});
	};
});

//mui('body').on('tap','.indexslider-big a',function(e){
//	mui.openWindow({url:'linedetail.html',id:'linedetail.html'});
//	plus.webview.getWebviewById('linedetail.html').addEventListener('close',function(){
//		setbcolor('dark');
//	})
//});

// 跳转链接--end

var ajaxlinkhead = localStorage.getItem('ajaxlinkhead');

var appstatus = 'resume';
var checkinfosuccess = 0,
	mblistsuccess = 0,
	bklistsuccess = 0,
	tslistsuccess = 0,
	cglistsuccess = 0;

//发现动态参数
var onshowlist = 'hotspot';

var getstatus = {
	'hotspot': {
		'loading': 0,
		'nextpage': 1,
		'loadfirst': 0,
		'ready': 0,
		'scrollname': 'scroll1',
		'cannext': 0
	},
	'nearby': {
		'loading': 0,
		'nextpage': 1,
		'loadfirst': 0,
		'ready': 0,
		'scrollname': 'scroll2',
		'cannext': 0
	},
	'follow': {
		'loading': 0,
		'nextpage': 1,
		'loadfirst': 0,
		'ready': 0,
		'scrollname': 'scroll3',
		'cannext': 0
	}
}

mui.previewImage();

o_bodyheight = $(window).height();
var bottomoffset = document.getElementById('footermenu').clientHeight;
if (o_bodyheight == 812) {
	$('.indexheader').css('padding-top', '60px');
	$('.indexheaderbottom').css('height', '110px');
	$('.custbox .head,.expertbox .head,.findbox .head').css('padding-top', '50px');
	$('.expertbox .tapboxpush,.custbox .tapboxpush').css('height', '100px');

	$('.findheadpush').css('height', '104px');

	$('#footermenu').css({
		'padding-bottom': '20px',
		'height': '80px'
	});
	$('.travels.isempty').css('margin-bottom', '85px');
}

mui('.indexslider-small').slider({
	interval: 4000
});



$(function() {

	$('.mui-scroll-wrapper-my,.mui-scroll-wrapper-index').css({
		'height': o_bodyheight-2
	});
	$('.mui-scroll-wrapper-my .mui-scroll,.mui-scroll-wrapper-index .mui-scroll').css({
		'min-height': o_bodyheight-1
	});

	var finalheight = o_bodyheight - bottomoffset - document.getElementById('findhead').clientHeight - 160;
	if (o_bodyheight == 812) {
		finalheight += 34;
	}

	$('.mui-scroll-wrapper-find').css({
		'height': finalheight
	});
	$('.mui-scroll-wrapper-find .mui-scroll').css({
		'min-height': finalheight + 1
	});

	//滑动初始化
	mui('.mui-scroll-wrapper-index,.mui-scroll-wrapper-my,.mui-scroll-wrapper-find').scroll({
		indicators: false,
		deceleration: 0.003
	});

	mui('.mui-scroll-wrapper.c-bottom').scroll({
		scrollY: false, //是否竖向滚动
		scrollX: true, //是否横向滚动
		indicators: false
	});
	
	
	document.getElementById('indexwrapper').addEventListener('scroll', function(e) {
		changeheader(e.detail.y);
	});
	
	document.getElementById('indexwrapper').addEventListener('scrollend', function(e) {
		changeheader(e.detail.y);
	});
	
})


//窗口滚动
var oldstop=0;
var ride = (o_bodyheight == 812)? 1.5 : 1;

 function changeheader(sTop) {
	sTop=-sTop;
	
	if(sTop==0&&oldstop>50){
		return
	}
	
	oldstop=sTop;
	if (sTop <= 0){
		$('#logobox,#navsearch').css('transform', 'scale(1,1)');
		$('#logooutbox').css('transform', 'translate(0px,0px)');
		$('.indexheader').css('transform', 'translateY(0px)');
		$('.navsearchbox').css('transform', 'translate(0px,0px)');	
	}else{
		
		sTop =sTop/ 8;
		
		if ( sTop > 0 && sTop <= 20 ) {
			
			var h1 = (44 - sTop) / 44;
			var h2 = sTop / 4;
			var h3 = sTop / 1.5;
			var h4 = sTop * 1.5;
			
			$('#logobox,#navsearch').css('transform', 'scale(' + h1 + ',' + h1 + ')');
			$('#logooutbox').css('transform', 'translate(' + -h4 + 'px,' + h2 + 'px)');
			$('.indexheader').css('transform', 'translateY(' + -sTop * ride + 'px)');
			$('.navsearchbox').css('transform', 'translate(' + h2 + 'px,' + h2 + 'px)');

		}else if (sTop > 20) {
			
			$('#logobox,#navsearch').css('transform', 'scale(' + 6 / 11 + ',' + 6 / 11 + ')');
			$('#logooutbox').css('transform', 'translate(-30px,5px)');
			$('.indexheader').css('transform', 'translateY(' + (-20 * ride) + 'px)');
			$('.navsearchbox').css('transform', 'translate(5px,5px)');

		}

	}

}


//菜单切换
var appRuntime = '',
	custready = 0,
	custliready = 0,
	expertready = 0,
	findready = 0,
	nowindex = 0;

mui('#footermenu').on('tap', 'a', function(e) {
	if (appRuntime == 'Android') {
		plus.device.vibrate(20)
	};

	$(this).siblings('a').removeClass('mui-active');
	var thisIndex = $(this).index();
	var thisvshow = $(this).attr('vshow');
	nowindex = thisIndex;

	if (thisvshow == '0') {
		var showindex = $('#footermenu a[vshow="1"]').index();
		$(this).attr('vshow', '1');
		$('#footermenu a').eq(showindex).attr('vshow', '0');
		$('.viewcontent').eq(thisIndex).siblings('.viewcontent').hide();
		$('.viewcontent').eq(thisIndex).attr('style', '');
	}

	if (thisIndex == 1 ) {
		
		if(custready == 0 && cglistsuccess == 0){
			custready=1;
			showcssWaiting();
			setTimeout(function() {
				getcategory();
			}, 10)
		} 
		
		if(custliready==1){
			var l = document.getElementsByClassName('custbox-content');
			var a = window.innerHeight - document.getElementById('tapboxpush').clientHeight - document.getElementById(
				'footermenu').clientHeight;
			var h = a + 'px';
			for (var i = 0; i < l.length; i++) {
				l[i].style.height = h;
			}
			var d = a + 1 + 'px';
			$('.custbox .mui-scroll-wrapper .mui-scroll').css('min-height', d);
	
			mui('.custslider').slider({
				interval: 0
			});
			mui('.custbox .mui-scroll-wrapper').scroll({
				indicators: false,
				deceleration: 0.003
			});
			custliready=0;
		}

	}

	if (thisIndex == 2 && expertready == 0) {
		expertready = 1;
		var l = document.getElementsByClassName('expertbox-content');
		var a = window.innerHeight - document.getElementById('expertpush').clientHeight - document.getElementById(
			'footermenu').clientHeight;
		var h = a + 'px';
		for (var i = 0; i < l.length; i++) {
			l[i].style.height = h;
		}
		var d = a + 1 + 'px';

		$('.expertbox .mui-scroll-wrapper .mui-scroll').css('min-height', d);

		mui('.expertslider').slider({
			interval: 0
		});
		mui('.expertbox .mui-scroll-wrapper').scroll({
			indicators: false,
			deceleration: 0.003
		});
		getlist('hotspot');
		scrollendlistener('hotspot');
	}

	if (thisIndex == 3 && findready == 0) {
		findready = 1;
		//getfindlist();
		scrolllistenerfind();
	}

})

var findloadfirst = 0;

function scrolllistenerfind() {
	document.getElementById('findbox').addEventListener('scroll', function(e) {
		if (e.detail.y > 70) {
			findloadfirst = 1;
		}
	});
	document.getElementById('findbox').addEventListener('scrollend', function(e) {
		if (findloadfirst == 1 && e.detail.y == 0) {
			$('#findbox .postloading').slideDown();
			setTimeout(function() {
				checklogin();
				change_nickname();
				findloadfirst = 0;
				setTimeout(function() {
					$('#findbox .postloading').slideUp();
				}, 500)
				timereset();
			}, 500)
		}
	});
}

//监听 动态 类型切换
var sbts = ['hotspot', 'nearby', 'follow'];
document.getElementById('slider1').addEventListener('slide', function(e) {
	$('input').blur();

	var lname = sbts[e.detail.slideNumber];
	if (lname == 'follow') {
		if (loginIf() == 0) {
			$('#scroll3 .isempty').show();
			return;
		};
	}

	if (getstatus[lname].ready == 0) {
		getstatus[lname].nextpage = 1;
		getlist(lname);
		scrollendlistener(lname);
	}
	onshowlist = lname;
});

//监听 目的地 区域切换
// document.getElementById('slider2').addEventListener('slide', function(e) {
// 	var destlist = '.destlist[destid="' + e.detail.slideNumber + '"]';
// 	var isload = $(destlist).attr('isload');
// 	if (isload == '0') {
// 		$(destlist).attr('isload', '1');
// 		$(destlist + ' .destli').each(function() {
// 			var imgname = $(this).attr('imgname');
// 			if (imgname != '') {
// 				var cover_image = $(this).attr('cover_image');
// 				img_cache(cover_image, '_bg', imgname);
// 			}
// 		})
// 	}
// });

var oldsessid;
var createchatting = 0;

function createchat() {
	createchatting = 1;
	var imchat = plus.webview.create('im-chat.html', 'im-chat.html', {
		top: '0px',
		bottom: '0px'
	});
	imchat.addEventListener('close', function() {
		createchat();
	})
	setTimeout(function() {
		createchatting = 0;
	}, 500)
}

document.addEventListener('plusready', function() {

	checkVersion();
	createchat();

	nownetstatus = plus.networkinfo.getCurrentType();

	//锁定屏幕方向为竖屏
	plus.screen.lockOrientation("portrait");
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize"
	});

	//设置电池栏颜色
	setbcolor('dark');
	oldsessid = plus.storage.getItem("sessid");
	if (oldsessid) {
		plus.navigator.setCookie(ajaxlinkhead, oldsessid);
	}

	if (plus.os.name == 'Android') {
		appRuntime = 'Android';
	}

	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		$('.version-num').text(inf.version);
	})

	checklogin();
	getSelected_list();
	getbooks_list();

	//运行环境从后台切换到前台事件
	document.addEventListener("resume", function() {
		appstatus = "resume";
		checklogin();
		change_nickname();

		if (cglistsuccess == 0) {
			getcategory();
		}

		if (tslistsuccess == 0) {
			getSelected_list();
		}

		if (bklistsuccess == 0) {
			getbooks_list();
		}

		if (mblistsuccess == 0) {
			memberlist();
		}

		if (plus.storage.getItem("user_login") == 1) {
			timereset();
		}

		checkVersion();
		reloaddata();
	}, false);

	//运行环境从前台切换到后台事件
	document.addEventListener("pause", function() {
		appstatus = 'pause';
	}, false);

	//检查网络变化
	document.addEventListener("netchange", function() {
		nownetstatus = plus.networkinfo.getCurrentType();

		if (cglistsuccess == 0) {
			getcategory();
		}

		if (tslistsuccess == 0) {
			getSelected_list();
		}

		if (bklistsuccess == 0) {
			getbooks_list();
		}

		if (mblistsuccess == 0) {
			memberlist();
		}

		if (plus.storage.getItem("user_login") == 1) {
			if (checkinfosuccess == 0) {
				checklogin();
			}
		}

	});

	plus.push.addEventListener("click", function(msg) {
		var launchview = plus.webview.getLaunchWebview().id;
		var allwebview = plus.webview.all();
		$.each(allwebview, function(i, v) {
			if (launchview != v.id && v.id != 'im-chat.html') {
				v.close('none');
			}
		})

		var thisIndex = 3;
		var thisvshow = $('#footermenu a').eq(thisIndex).attr('vshow');
		nowindex = thisIndex;

		if (thisvshow == '0') {
			var showindex = $('.mui-bar-tab .mui-tab-item[vshow="1"]').index();
			$('#footermenu a').eq(thisIndex).attr('vshow', '1').addClass('mui-active');
			$('#footermenu a').eq(showindex).attr('vshow', '0').removeClass('mui-active');
			$('.mui-content').eq(thisIndex).siblings('.mui-content').hide();
			$('.mui-content').eq(thisIndex).attr('style', '');
		}

		if (findready == 0) {
			findready = 1;
			scrolllistenerfind();
		}

	}, false);

});

var reloadtime = 60000 * 3;
var reloadwait = 1;
setTimeout(function() {
	reloadwait = 0;
}, reloadtime);

function reloaddata() {
	if (reloadwait == 1) {
		return
	}
	reloadwait = 1;
	setTimeout(function() {
		reloadwait = 0;
	}, reloadtime);

	getSelected_list();
	getbooks_list();
	memberlist();
}

// 读取图片失败事件
function nofind() {
	var img = event.srcElement;
	img.src = "img/my-head.png";
	img.onerror = null;
}

//检查登录
function checklogin() {

	if (plus.storage.getItem("user_login")) {
		$('#notlogin').hide();

		var nickname = plus.storage.getItem("user_nickname") || plus.storage.getItem("user_name") || '';
		$('#userdata h1 a').text(nickname);

		$('#userdata span').text(plus.storage.getItem("user_signature") || ' - ');
		$('#userhead').attr('src', plus.storage.getItem("user_headimg") || 'img/my-head.png');

		var usergroup_id = plus.storage.getItem("user_usergroup_id");
		switch (usergroup_id) {
			case '8':
				$('#upgrade-8').hide();
				$('#upgrade-9').show();
				break;
			case '9':
				$('#upgrade-8,#upgrade-9').hide();
				break;
			default:
				$('#upgrade-8,#upgrade-9').show();
				break;
		}

		$('#userdata h1 #level').text(plus.storage.getItem("user_usergroup_title") || ' - ');
		$('#userdata h1 #level').show();

		getUserInfo();

		var sessid = GetRequests('sessid?' + plus.storage.getItem("sessid"));
		Socket_Data.sessid = sessid.PHPSESSID;

		Socket_Data.nickname = nickname;
		starSocket();

		if (loadmsglistdone == 0) {
			loadmsglist()
		};

		if (mblistsuccess == 0) {
			memberlist()
		};

	} else {
		checkinfosuccess = 0;

		if (Socket && Socket != '') {
			Socket.close();
		}

		$('#userdata h1 b,#notready,#connecting').hide();
		$('#userdata h1 b').text(' - ');

		$('#notlogin').show();

		$('.findlist li').remove();
		$('#findbox .isempty').eq(0).show();

		$('#userdata h1 a').text('登录或注册');
		$('#userdata span').text('请先登录');
		$('#userhead').attr('src', 'img/my-head.png');

	}
}

//获取用户信息
var getInfodone = 0;

function getUserInfo() {
	if (getInfodone == 1) {
		return
	};
	getInfodone = 1;
	$.ajax({
		url: ajaxlinkhead + "/user/index?is_ajax=1",
		method: "get",
		data: {
			is_ajax: 1
		},
		dataType: "json",
		success: function(res) {

			//console.log('当前 sessid - ' + plus.navigator.getCookie(localStorage.getItem('ajaxlinkhead')));
			if (res.err && res.err == 1) {
				//mui.toast(res.msg);
				
				if (plus.storage.getItem("sessid") && res.msg == '未登录') {
					
					var waittime = plus.storage.getItem('waittime_restart');
					var nowtime = (new Date().getTime()) / 60000;
					if (waittime && (Number(waittime) + 5) > nowtime) {
						mui.toast('获取用户信息失败')
						return
					};
					plus.storage.setItem('waittime_restart', String(nowtime));
					
					plus.runtime.restart();
				}
				//				setTimeout(function(){
				//					checklogin();
				//					change_nickname();
				//				},5000)
			} else {

				plus.storage.setItem("user_nickname", res.user.nickname); //用户名
				plus.storage.setItem("user_mobile", res.user.mobile); //用户手机号
				plus.storage.setItem("user_sex", res.user.sex); //用户性别
				plus.storage.setItem("user_email", res.user.email); //用户邮箱
				plus.storage.setItem("user_birthday", String(res.user.birthday)); //用户生日
				plus.storage.setItem("user_qq", res.user.qq); //用户QQ
				plus.storage.setItem("user_signature", res.user.signature); //用户签名

				if (res.user.image) {
					plus.storage.setItem("user_image", res.user.image)
				} else {
					plus.storage.removeItem("user_image")
				};

				//个人形象
				plus.storage.setItem("money", res.user.money); //余额

				$('#userdata h1 a').text(res.user.nickname || res.user.username || '');
				$('#userdata span').text(res.user.signature || '未设置签名');

				$('#userhead').attr('src', ajaxlinkhead + res.avatar);
				plus.storage.setItem("user_headimg", ajaxlinkhead + res.avatar);

				plus.storage.setItem("user_height", res.user.height); //身高
				plus.storage.setItem("user_weight", res.user.weight); //体重
				plus.storage.setItem("user_pos_city", res.user.pos_city); //用户常驻地
				plus.storage.setItem("user_pos_province", res.user.pos_province); //用户常驻省份

				plus.storage.setItem("user_usergroup_id", res.user.group_id); //用户组ID
				switch (res.user.group_id) {
					case '8':
						$('#upgrade-8').hide();
						$('#upgrade-9').show();
						break;
					case '9':
						$('#upgrade-8,#upgrade-9').hide();
						break;
					default:
						$('#upgrade-8,#upgrade-9').show();
						break;
				}

				plus.storage.setItem("user_usergroup_module", res.user.group_module); //字段
				plus.storage.setItem("user_usergroup_title", res.user.group_title); //描述

				$('#userdata h1 #level').text(res.user.group_title);
				$('#userdata h1 #level').show();

				$('#post b').text(res.CountNote || 0);
				$('#mytravels b').text(res.CountTravels || 0);
				var CountsInvite = res.CountsInvite || 0;
				$('#mycompanion b').text(CountsInvite);

				//isNote:true
				//isLine:false
				//isTravels:false
				//countmsg:0
				//countfollows:0
				//countfans:0

				//view:0
				//order:0
				//accept:0
				//total:0
				//response:0
				//roPercent:0%
				//rpPercent:0%
				//apPercent:0%

				//pos_district:0
				//pos_community:0
				//headimgurl:
				//salt:Zjhfva
				//login:50
				//reg_ip:0
				//reg_time:1527652204
				//last_login_ip:3232235884
				//last_login_time:2018-06-01 17:52:39
				//status:1

				checkinfosuccess = 1;
			}
			getInfodone = 0;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			checkinfosuccess = 0;
			getInfodone = 0;
			mui.toast('检查信息失败');
			console.log('当前 sessid - ' + plus.navigator.getCookie(localStorage.getItem('ajaxlinkhead')));
			/*弹出jqXHR对象的信息*/
			console.log(jqXHR.responseText);
			console.log(jqXHR.status);
			console.log(jqXHR.readyState);
			console.log(jqXHR.statusText);
			/*弹出其他两个参数的信息*/
			console.log(textStatus);
			console.log(errorThrown);
		}
	})

}

function checkVersion() {
	//console.log('检查更新中---');
	//获取本地应用资源版本号

	var wgtVer = null;
	var hot_update = plus.storage.getItem("hot_update")||'开启';
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		wgtVer = inf.version;
		//console.log('当前版本:'+wgtVer+'---');
		$.get(ajaxlinkhead + '/api/index/appupd?version=' + wgtVer, function(result) {
			//console.log('最新版本:'+result.version+'---');
			var uplog='';
			$.each(result.url_list, function(i, e) {
				uplog+=e.name+'<br>'+e.desc+'<br>';
			})

			console.log(uplog);
			if (result.version != wgtVer && result.version != null && result.version != '') {
				$('.version-isnew').hide();
				$('.version-new').text('最新版本 '+result.version);
				$('.version-new').show();
				
				console.log("检测更新成功！");
				var updownfirst = 0;
				
				$.each(result.url_list, function(i, e) {
					if (updownfirst == 0) {
						updownfirst = 1;
						if (e.url == '') {
							
							var waittime = plus.storage.getItem('waittime_updata');
							var nowtime = (new Date().getTime()) / 60000;
							if (waittime && (Number(waittime) + 30) > nowtime) {
								return
							};
							
							plus.storage.setItem('waittime_updata', String(nowtime));
							
							plus.nativeUI.confirm("APP当前有新的版本，下载更新", function(e) {
								if (e.index == 0) {
									plus.runtime.openURL(storelink);
								}
							}, {
								"title": "提示",
								"buttons": ["前往", "稍后"]
							});
							
						} else {
							if(hot_update=='开启'){
								downWgtu(e.url);
							}
						}
					}
				});
				$('.version-new').hide();
			} else {
				$('.version-new').hide();
				$('.version-isnew').show();
				console.log("无可更新的版本");
			};

		}, 'json').fail(function() {
			if (appstatus == 'resume') {
				mui.toast('获取更新失败，请检查网络');
			};
		});
	});
};

//下载差量更新包并更新
function downWgtu(url) {
	//console.log("升级中...");
	mui.toast('应用更新中......');
	showcssWaiting();

	var dtask = plus.downloader.createDownload(url, {
		method: "GET"
	}, function(d, status) {
		if (status == 200) {
			//console.log( "下载更新包成功: " + d.filename );
			plus.runtime.install(d.filename, {}, function() {
				showcssWaiting();
				plus.runtime.restart();
			}, function(e) {
				mui.toast('升级更新失败，请重新安装应用');
				//console.log("安装更新包失败: "+e.message);
			});
		} else {
			mui.toast('获取更新失败')
			//console.log("下载更新包失败: " + status );
		};
	});
	dtask.addEventListener('statechanged', function(d, status) {
		//console.log("statechanged: "+d.state);
	});
	dtask.start();
}

//判断这个文本是否有多余的文本
function isEllipsis(dom) {
	var checkDom = dom.cloneNode(),
		parent, flag;
	checkDom.style.width = dom.offsetWidth + 'px';
	checkDom.style.maxHeight = '100%';
	checkDom.style.overflow = 'auto';
	checkDom.style.position = 'absolute';
	checkDom.style.zIndex = -1;
	checkDom.style.opacity = 0;
	checkDom.innerHTML = dom.innerHTML;
	parent = dom.parentNode;
	parent.appendChild(checkDom);
	flag = checkDom.offsetHeight > dom.offsetHeight;
	parent.removeChild(checkDom);
	return flag;
};

//阅读更多
mui('body').on('tap', '.readeall', function(e) {
	var ostatu = $(this).attr('ostatu');
	if (ostatu == '0') {
		$(this).siblings('.content').addClass('showing');
		$(this).attr('ostatu', '1').text('收起');
	} else {
		$(this).siblings('.content').removeClass('showing');
		$(this).attr('ostatu', '0').text('展开全部');
	}
});


//-----动态列表-----
function getlist(listsindex) {

	if (getstatus[listsindex].loading == 1) {
		return
	};
	getstatus[listsindex].loading = 1;
	$('.' + listsindex + ' .isempty').hide();
	$('.' + listsindex + ' .postloading').slideDown();
	$('.' + listsindex + ' .listloading').show();
	$.get(localStorage.getItem('ajaxlinkhead') + '/index/master/' + listsindex + '?is_ajax=1&page=' + getstatus[listsindex]
		.nextpage,
		function(result) {

			if (result.list) {

				if (getstatus[listsindex].nextpage == 1) {
					$('.' + listsindex + ' .expert-list li').remove();
				}

				if (result.list.data == '') {

					getstatus[listsindex].loading = 0;
					getstatus[listsindex].ready = 0;
					setTimeout(function() {
						$('.' + listsindex + ' .listloading').fadeOut();
					}, 500)
					setTimeout(function() {
						$('.' + listsindex + ' .isempty').show();
					}, 800)

				} else if (result.list.data) {

					getstatus[listsindex].ready = 1;
					$('.' + listsindex + ' .listloading').fadeOut();
					$('.' + listsindex + ' .isempty').hide();

					$.each(result.list.data, function(i, v) {

						var releasesite = '';
						if (v.release_site) {
							releasesite = '<span class="left"><i class="fa fa-map-marker"></i>' + v.release_site + '</span>';
						}

						var member_focus = '';
						var focustext = '';
						if (String(result.others[v.id].isfocus) == '1') {
							member_focus = 'fa-check-circle-o member_focus';
							focustext = ' 已关注';
						} else {
							member_focus = 'fa-user-plus';
						}

						var uname = result.others[v.id].username;
						var uhead = localStorage.getItem('ajaxlinkhead') + result.others[v.id].avatar;
						var vuid = plus.storage.getItem("user_uid");
						var trash = '';
						var ufollow = '';
						if (v.uid == plus.storage.getItem("user_uid")) {
							trash = '<i class="fa fa-trash-o del_note"></i>';
						} else {
							ufollow = '<i class="fa add_btn ' + member_focus + '" uid="' + v.uid + '">' + focustext + '</i>';
						}

						var showcomment = '';
						if (result.others[v.id].comment > 0 || result.others[v.id].like > 0) {
							showcomment = 'style="display:block;"';
						} else {
							showcomment = 'style="display:none;"';
						}

						var commentnum = '';
						if (result.others[v.id].comment > 0) {
							commentnum = '（' + result.others[v.id].comment + '）';
						}

						var coverlist = '';
						if (v.cover_id != '' && v.cover_id && v.cover_id != undefined && v.cover_id != 'undefined') {
							var coverdata = '[' + v.cover_id + ']';

							if (!isContains(coverdata, 'undefined')) {
								coverdata = JSON.parse(coverdata);
								$.each(coverdata, function(a, b) {
									coverlist = coverlist + '<dd><span class="msgimg"><img onload="clip(this)" coverid="' + b +
										'" src="img/noimg.jpg" data-preview-src="" data-preview-group="' + v.id + '"/></span></dd>';
								});
								coverlist = '<dl class="photolist">' + coverlist + '</dl>';
							}
						};

						var vcontent = v.content;
						if (vcontent != '') {
							if (vcontent) {
								vcontent = '<p class="content"  id="pcontent' + v.id + listsindex + '">' + vcontent + '</p>';
							}
						};

						var member_like = '';

						if (String(result.others[v.id].islike) == '1') {
							member_like = 'fa-thumbs-up member_like';
						} else {
							member_like = 'fa-thumbs-o-up';
						};

						if (uname == '') {
							uname = ' unknow ';
						}

						var li = '<li pid="' + v.id + '" class="liparent" hsrc="' + uhead + '" uid="' + v.uid +
							'"><div class="expertinfo"><img class="headimg headimgs" src="' + uhead + '"/><h1 class="headname">' + uname +
							'</h1><span>' + sbackstr(v.create_time) + '</span><div class="etcctr">' + ufollow + trash +
							'<i class="fa  love_num ' + member_like + '" pid="' + v.id + '">' + result.others[v.id].like +
							'</i></div></div>' + vcontent + '<span class="readeall" ostatu="0">展开全部</span>' + coverlist +
							'<div class="footer"><span class="right  comment_num" pid="' + v.id +
							'"><i class="fa fa-commenting-o"></i>评论</span>' + releasesite + '<span class="left commentctn" ' +
							showcomment + '><div class="check-comment" cid="' + v.id + '"  pnum="' + result.others[v.id].comment +
							'">查看评价' + commentnum +
							' <i class="fa fa-angle-down"></i></div><div class="close-comment">收起评价 <i class="fa fa-angle-up"></i></div></span></div><div class="comment_list" cid="' +
							v.id + '"><div class="thumbs" pid="' + v.id + '"><i class="fa fa-thumbs-o-up"></i></div></div></li>';

						$('.' + listsindex + ' .expert-list').append(li);

						$('.msgimg img[data-preview-group="' + v.id + '"]').each(function() {
							var vcoverid = $(this).attr('coverid');
							$.ajax({
								url: localStorage.getItem('ajaxlinkhead') + '/index/img',
								type: "post",
								data: {
									is_ajax: 1,
									id: vcoverid
								},
								dataType: "json",
								success: function(map) {
									var cover_image = localStorage.getItem('ajaxlinkhead') + map.pic_url;
									var imgname = cover_image.substr(cover_image.lastIndexOf('/') + 1);
									$('.msgimg img[coverid="' + vcoverid + '"]').attr({
										'imgname': imgname
									}).addClass('img_cache_src');
									img_cache(cover_image, '_src', imgname);
								}
							});
						});

						if (v.content != '' && document.querySelector('#pcontent' + v.id + listsindex)) {
							if (isEllipsis(document.querySelector('#pcontent' + v.id + listsindex)) == true) {
								$('#pcontent' + v.id + listsindex).siblings('.readeall').addClass('ready');
							}
						}

					});

					if (Number(result.list.last_page) == getstatus[listsindex].nextpage && $('.' + listsindex + ' .expert-list li').length != 0) {
						$('.' + listsindex + ' .isend').show();
					} else {
						$('.' + listsindex + ' .isend').hide();
					}

					if (Number(result.list.last_page) > getstatus[listsindex].nextpage) {
						getstatus[listsindex].nextpage++;
						getstatus[listsindex].cannext = 1;
						getstatus[listsindex].loading = 0;
					} else {
						getstatus[listsindex].cannext = 0;
					}
				}

			} else {

				setTimeout(function() {
					$('.' + listsindex + ' .listloading').fadeOut();
				}, 500);

				setTimeout(function() {
					if ($('.' + listsindex + ' .expert-list li').length == 0) {
						getstatus[listsindex].ready = 0;
						$('.' + listsindex + ' .isempty').show();
					}
				}, 1000);

				mui.toast('获取失败');
			};
			setTimeout(function() {
				$('.' + listsindex + ' .postloading').slideUp()
			}, 800);
			scrolllistener(listsindex);

		}, 'json').fail(function() {

		setTimeout(function() {
			$('.' + listsindex + ' .listloading').fadeOut();
		}, 500);

		setTimeout(function() {
			if ($('.' + listsindex + ' .expert-list li').length == 0) {
				getstatus[listsindex].ready = 0;
				$('.' + listsindex + ' .isempty').show();
			}
			getstatus[listsindex].loading = 0;
		}, 1000);

		setTimeout(function() {
			$('.' + listsindex + ' .postloading').slideUp()
		}, 800);
		scrolllistener(listsindex);
		mui.toast('获取失败');

	});
};

mui('body').on('tap', '.headimgs,.headname', function(e) {
	showcssWaiting();
	var olddetail = plus.webview.getWebviewById('expertdetail.html');
	if (olddetail) {
		olddetail.close('none')
	};

	var open_url = 'expertdetail.html?uid=' + $(this).parents('li.liparent').attr('uid') + '&hsrc=' + $(this).parents(
		'li.liparent').attr('hsrc');
	var expertdetail = plus.webview.create(open_url, 'expertdetail.html', {
		top: 0,
		bottom: 0
	});

	expertdetail.addEventListener('close', function() {
		setbcolor('dark');
	})

});

function scrolllistener(listsindexs) {
	document.getElementById(getstatus[listsindexs].scrollname).addEventListener('scroll', function(e) {
		if (e.detail.y > 70) {
			getstatus[listsindexs].loadfirst = 1;
		}
		var maxY = e.detail.maxScrollY + 300;
		if (e.detail.y <= maxY) {
			if (getstatus[listsindexs].loading == 0 && getstatus[listsindexs].cannext == 1) {
				getlist(listsindexs);
			};
		};
	});
}

function scrollendlistener(listsindexss) {
	document.getElementById(getstatus[listsindexss].scrollname).addEventListener('scrollend', function(e) {
		if (getstatus[listsindexss].loadfirst == 1 && e.detail.y == 0) {
			getstatus[listsindexss].loading = 0
			getstatus[listsindexss].nextpage = 1;
			getlist(listsindexss);
			getstatus[listsindexss].loadfirst = 0;
		}
	});
}

//忽略大小写判断是否包含子字符串
function coverString(subStr, str) {
	var reg = eval("/" + subStr + "/ig");
	return reg.test(str);
}

//判断字符串是否包含一个子串
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
};

function sbackstr(num) {
	var timestamp = Number(num);
	var newDate = new Date();
	newDate.setTime(timestamp * 1000);
	var backstr = newDate.format('yyyy-MM-dd hh:mm');
	return backstr;
}

//打开会员详情
var userinfobtc = {};
mui('body').on('tap', '.thumbshead,.c-head,.c-author', function(e) {

	showcssWaiting();
	var olddetail = plus.webview.getWebviewById('expertdetail.html');
	if (olddetail) {
		olddetail.close('none')
	};

	var open_url = 'expertdetail.html?uid=' + $(this).attr('uid') + '&hsrc=' + localStorage.getItem('ajaxlinkhead') +
		userinfobtc[uid].avatar;
	var expertdetail = plus.webview.create(open_url, 'expertdetail.html', {
		top: 0,
		bottom: 0
	});

	expertdetail.addEventListener('close', function() {
		setbcolor('dark');
	})

});

//获取评论
function getcomment(noteid) {
	if (loginIf() == 0) {
		return
	};
	showcssWaiting();
	$.get(localStorage.getItem('ajaxlinkhead') + '/master/detail', {
		is_ajax: 1,
		id: noteid
	}, function(data) {

		$('.comment_list[cid="' + noteid + '"] .c-info').remove();
		var uid = plus.storage.getItem("user_uid");

		var commentdata = {};
		var clength = 0;

		$.each(data.comment, function(i, v) {

			userinfobtc[v.uid] = v;
			commentdata[v.id] = v;

			var del = '';
			var nickname = '';
			if (uid == v.uid) {
				del = '<div class="c-del link_del" pid="' + v.id + '">删除</div>';
				nickname = '我';
			} else {
				nickname = v.nickname;
			}

			clength++;

			var authormore = '';
			if (v.pid != '0') {
				var authorname = '';
				if (uid == commentdata[v.pid].uid) {
					authorname = '我';
				} else {
					if (commentdata[v.pid].nickname) {
						authorname = commentdata[v.pid].nickname;
					}
				}
				authormore = '<span class="c-and">回复</span><h1 class="c-author" uid="' + commentdata[v.pid].uid + '">' +
					authorname + '</h1>';
			}

			$('.comment_list[cid="' + noteid + '"]').append('<div class="c-info"><img class="c-head" src="' + localStorage.getItem(
					'ajaxlinkhead') + v.avatar + '"  uid="' + v.uid + '"/><h1 class="c-author"  uid="' + v.uid + '">' + nickname +
				'</h1>' + authormore + del + '<span class="c-time">' + sbackstr(v.create_time) +
				'</span><p class="c-content" nickname="' + nickname + '" cid="' + noteid + '" pid="' + v.id + '" uid="' + v.uid +
				'">' + v.content + '</p></div>');

		})

		var clength_str = (clength > 0) ? '（' + clength + '）' : '';
		$('.check-comment[cid="' + noteid + '"]').attr('pnum', clength).html('查看评价 ' + clength_str +
			'<i class="fa fa-angle-down"></i>');

		var likelength = 0;
		var thumbsdom = $('.thumbs[pid="' + noteid + '"]');
		$('.thumbs[pid="' + noteid + '"] img').remove();
		$.each(data.like, function(i, v) {
			likelength++;
			$('.thumbs[pid="' + noteid + '"] .fa').after('<img class="thumbshead" uid="' + v.uid + '" src="' + localStorage.getItem(
				'ajaxlinkhead') + v.avatar + '">');
		})

		if (likelength > 0) {
			thumbsdom.show();
		} else {
			thumbsdom.hide();
		}

		$('.love_num[pid="' + noteid + '"]').text(likelength);

		$('.check-comment[cid="' + noteid + '"]').hide();
		$('.check-comment[cid="' + noteid + '"]').parents('li').find('.close-comment,.comment_list').show();

		closecssWaiting();
	}, 'json').fail(function() {
		closecssWaiting();
		mui.toast('获取评论失败');
	});
}

mui('body').on('tap', '.check-comment', function(e) {
	getcomment($(this).attr('cid'));
});

mui('body').on('tap', '.close-comment', function(e) {
	$(this).hide();
	$(this).parents('li').find('.comment_list').hide();
	$(this).parents('li').find('.check-comment').show();
});

//删除评论
mui('body').on('tap', '.link_del', function(e) {
	if (loginIf() == 0) {
		return
	};
	var thisid = $(this).attr('pid');
	var thisnoteid = $(this).parents('li').attr('pid');
	var thisparent = $(this).parents('.c-info');
	plus.nativeUI.confirm("确定要删除这条评论？", function(e) {
		if (e.index == 0) {
			$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/delete_comment.html", {
				is_ajax: '1',
				id: thisid
			}, function(data) {
				mui.toast(data.msg);
				if (data.code == 1) {
					var checkbtn = $('.check-comment[cid="' + thisnoteid + '"]');
					var punm = Number(checkbtn.attr('pnum')) - 1;
					checkbtn.attr('pnum', punm).html('查看评价（' + punm + '） <i class="fa fa-angle-down"></i>');
					if (thisparent.siblings('.c-info').length > 0) {} else {
						thisparent.parents('li').find('.commentctn,.comment_list,.check-comment,.close-comment').hide();
					}
					thisparent.remove();
				}
			}, 'json').fail(function() {
				mui.toast('删除失败');
			});
		}
	});
})

var vid_note = '';
var keyingtype = 1;
var notebackid = '';

//评论按钮事件
mui('body').on('tap', '.comment_num', function() {
	if (loginIf() == 0) {
		return
	};
	$('#footermenu').hide();
	$('.comment_box').show();
	$('#keyingval').val('');
	$('#keyingval').attr('placeholder', '评论');
	$('#keyingval').focus();
	vid_note = $(this).attr('pid');
	keyingtype = 1;
});

var keyingsubing = 0;
mui('body').on('tap', '#subeval', function(e) {
	var vreplyTxt = $('#keyingval').val();
	if (vreplyTxt == '') {
		mui.toast('评论内容不能为空');
		$('#keyingval').focus();
	} else {
		if (keyingsubing == 1) {
			mui.toast('评论发送中');
			return
		}

		keyingsubing = 1;
		showcssWaiting();
		var subjson = {
			'is_ajax': '1',
			'cid': vid_note,
			'content': vreplyTxt,
			'type': '24'
		}

		if (keyingtype == 2) {
			subjson.pid = notebackid;
		}

		$.post(localStorage.getItem('ajaxlinkhead') + '/user/center/comment', subjson, function(data) {
			closecssWaiting();
			if (data.code == 1) {
				getcomment(vid_note);
				setTimeout(function() {
					$('input').blur();
					$('.comment_box').hide();
					var checkbtn = $('.check-comment[cid="' + vid_note + '"]');
					checkbtn.hide();
					checkbtn.parents('li').find('.commentctn,.close-comment,.comment_list').show();
					$('#keyingval').val('');

					keyingsubing = 0;

				}, 1000)
			} else {
				keyingsubing = 0;
				mui.toast(data.msg);
			}
		}, 'json').fail(function() {
			keyingsubing = 0;
			closecssWaiting();
			mui.toast('评论失败');
		});
	}
});

$('#keyingval').blur(function() {
	$('.comment_box').hide();
})

//回复评论
mui('body').on('tap', '.c-content', function(e) {
	if (loginIf() == 0) {
		return
	};
	if ($(this).attr('uid') == plus.storage.getItem("user_uid")) {
		mui.toast('不能给自己回复');
	} else {
		$('.comment_box').show();
		$('#keyingval').val('');
		$('#keyingval').attr('placeholder', '回复 ' + $(this).attr('nickname'));
		$('#keyingval').focus();
		vid_note = $(this).attr('cid');
		notebackid = $(this).attr('pid');
		keyingtype = 2;
	}
});

//点赞按钮事件
mui('body').on('tap', '.love_num', function() {
	if (loginIf() == 0) {
		return
	};
	var that = this;
	var noteid = $(that).parents('li').attr('pid');
	var likeNum = Number($(that).text());
	var uid = plus.storage.getItem("user_uid");
	showcssWaiting();
	if ($(that).hasClass('member_like')) {
		$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/unlike", {
			is_ajax: 1,
			id: noteid,
			type: '24'
		}, function(data) {
			if (data.code == 1) {
				$(that).removeClass('member_like fa-thumbs-up').addClass('fa-thumbs-o-up');
				$(that).text(likeNum - 1);
				likeNum--;
				$('.thumbs img[uid="' + uid + '"]').remove();
				if (likeNum == 0) {
					$('.thumbs[pid="' + noteid + '"]').hide();
					if ($('.comment_list[cid="' + noteid + '"] div.c-info').length == 0) {
						$(that).parents('li').find('.commentctn,.close-comment').hide();
						$('.comment_list[cid="' + noteid + '"]').hide();
						$(that).parents('li').find('.check-comment').show();
					}
				}
			}
			closecssWaiting();
		}, 'json').fail(function() {
			closecssWaiting();
		});
	} else {
		$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/like", {
			is_ajax: 1,
			id: noteid,
			type: '24'
		}, function(data) {
			if (data.code == 1) {
				$(that).removeClass('fa-thumbs-o-up').addClass('member_like fa-thumbs-up');
				$(that).text(likeNum + 1);
				$('.thumbs[pid="' + noteid + '"]').show();
				$('.thumbs[pid="' + noteid + '"] .fa').after('<img uid="' + uid + '" src="' + plus.storage.getItem(
					"user_headimg") + '">');
				$(that).parents('li').find('.commentctn').show();
			}
			closecssWaiting();
		}, 'json').fail(function() {
			closecssWaiting();
		});
	}
});

//删除自己的动态
mui('body').on('tap', '.del_note', function(e) {
	if (loginIf() == 0) {
		return
	};
	var thisnoteid = $(this).parents('li').attr('pid');
	plus.nativeUI.confirm("确定要删除这条动态？", function(e) {
		if (e.index == 0) {
			$.get(localStorage.getItem('ajaxlinkhead') + "/user/note/del.html", {
				is_ajax: '1',
				id: thisnoteid
			}, function(data) {
				mui.toast(data.msg);
				if (data.code == 1) {
					$('li[pid="' + thisnoteid + '"]').remove();
				}
			}, 'json').fail(function() {
				mui.toast('删除失败');
			});
		}
	});
})

mui('body').on('tap', '.photolist img', function(e) {
	$('input').blur();
});

//关注按钮事件
mui('body').on('tap', '.add_btn', function() {
	if (loginIf() == 0) {
		return
	};
	var uid = $(this).attr('uid');
	var that = $('.add_btn[uid="' + uid + '"]');
	if ($(that).hasClass('member_focus')) {
		plus.nativeUI.confirm("您是否要取消对该用户的关注？", function(e) {
			if (e.index == 0) {

				mui.post(localStorage.getItem('ajaxlinkhead') + '/user/member/unfocus', {
					id: uid
				}, function(data) {
					if (data.code == '1') {

						getstatus['follow'].loading = 0;
						if (onshowlist != 'follow') {
							getstatus['follow'].ready = 0;
						} else {
							getstatus['follow'].nextpage = 1;
							getlist('follow');
							mui('#scroll3.mui-scroll-wrapper').scroll().scrollTo(0, 0, 0);
						}

						$('.follow .isempty,.follow .isend').hide();
						that.removeClass('member_focus');
						that.removeClass('fa-check-circle-o');
						that.addClass('fa-user-plus');
						that.text('');
					}
					closecssWaiting();
					mui.toast(data.msg);
				}, 'json');

			}
		})
	} else {
		mui.post(localStorage.getItem('ajaxlinkhead') + '/user/member/focus', {
			id: uid
		}, function(data) {
			if (data.code == '1') {

				getstatus['follow'].ready = 0;
				getstatus['follow'].loading = 0;
				getstatus['follow'].nextpage = 1;
				$('.follow .isempty,.follow .isend').hide();

				that.addClass('member_focus');
				that.addClass('fa-check-circle-o');
				that.removeClass('fa-user-plus');
				that.text(' 已关注');
			}
			closecssWaiting();
			mui.toast(data.msg);
		}, 'json');

	}
});

function resetstatus() {
	$.each(getstatus, function(i, v) {
		v.ready = 0;
		v.loading = 0;
		v.nextpage = 1;
	});
	$('.follow .expert-list li').remove();
	$('.follow .isempty').show();
	var userlogin = plus.storage.getItem("user_login");
	if (userlogin == '1') {} else if (onshowlist != 'follow') {
		getlist(onshowlist);
	}

	mui('#' + getstatus[onshowlist].scrollname + '.mui-scroll-wrapper').scroll().scrollTo(0, 0, 0);
}

window.onresize = function() {
	var bodyheight = $(window).height();

	var l = document.getElementsByClassName('expertbox-content');
	var a = window.innerHeight - document.getElementById('expertpush').clientHeight - document.getElementById(
		'footermenu').clientHeight;
	var h = a + 'px';
	for (var i = 0; i < l.length; i++) {
		l[i].style.height = h;
	}
	var d = a + 1 + 'px';

	$('.expertbox .mui-scroll-wrapper .mui-scroll').css('min-height', d);
	$('.comment_box').css('top', bodyheight - 60 + 'px');

	if (o_bodyheight > bodyheight) {
		$('#footermenu,.expertbox .head').addClass('keying');
	} else {
		$('#footermenu,.expertbox .head').removeClass('keying');
		$('.comment_box').hide();
		$('#keyingval').blur();
		$('#footermenu').show();
	}
}

mui('body').on('tap', '.travels.isempty', function(e) {
	getSelected_list();
});

var getingSelectedlist = 0;
//获取精选游记

function getSelected_list() {
	if (getingSelectedlist == 1) {
		return
	};
	getingSelectedlist = 1;
	var olddata = plus.storage.getItem('travelslist_data') || '';
	if (olddata != '') {
		olddata = JSON.parse(olddata);
		settravelslist(olddata);
	}

	$.get(localStorage.getItem('ajaxlinkhead') + '/travels/list/14?is_ajax=1&page=0', function(result) {

		if (result.list) {

			if (result.list.data == '') {
				mui.toast('精选游记获取失败');
			} else if (result.list.data) {
				plus.storage.setItem('travelslist_data', JSON.stringify(result.list.data))
				settravelslist(result.list.data);
			}

			tslistsuccess = 1;
		} else {
			mui.toast('精选游记获取失败');
		};
		getingSelectedlist = 0;
	}, 'json').fail(function() {
		getingSelectedlist = 0;
		// mui.toast('精选游记获取失败');
	});
};

function settravelslist(tsdata) {
	if (tsdata.length > 0) {
		$('.travels.isempty').hide();
		$('.indexbox .p-line.mui-scroll-wrapper').show();
	} else {
		$('.travels.isempty').show();
		$('.indexbox .p-line.mui-scroll-wrapper').hide();
	}

	$('.test-line li,.p-linelist li').remove();

	$.each(tsdata, function(i, v) {

		var startcity = '';
		if (v.city != '' && v.city && v.city != undefined && v.city != 'undefined') {
			var s = ',' + v.city;
			s = s.substring(1, s.length);
			s = s.split(",");

			if (s[s.length - 1] != s[0]) {
				startcity = s[0] + '/' + s[s.length - 1];
			} else {
				startcity = s[0];
			}

			startcity = s[s.length - 1];
		};

		var cover_image = v.cover_image || '';
		var imgname = ''
		if (cover_image != '') {
			cover_image = localStorage.getItem('ajaxlinkhead') + cover_image;
			imgname = cover_image.substr(cover_image.lastIndexOf('/') + 1);
		}

		var li = '<li class="p-linelist-li img_cache_bg" imgname="' + imgname + '" tid="' + v.id + '"><p>' + v.title +
			'</p><ul><li>&bull; ' + startcity + '</li><li>&bull; ' + v.playDays + '天</li></ul></li>'
		//$('.p-linelist').append(li);

		var li = '<li class="img_cache_bg" imgname="' + imgname + '" tid="' + v.id + '"><span>' + startcity +
			'</span></li>'
		$('.test-line ul').append(li);

		if (imgname != '') img_cache(cover_image, '_bg', imgname);

	});

	$('.p-line .p-linelist').css('width', tsdata.length * 205 + 'px');
	$('.p-line.mui-scroll-wrapper .mui-scroll').css('width', tsdata.length * 165 + 'px');

	mui('.mui-scroll-wrapper.p-line').scroll({
		scrollY: false, //是否竖向滚动
		scrollX: true, //是否横向滚动
		indicators: false
	});
	
	$('.test-line').show();
	$('.test-line .mui-scroll').css('width', tsdata.length * 145 + 'px');
	$('.test-line .mui-scroll ul').css('width', tsdata.length * 140 + 'px');

	mui('.mui-scroll-wrapper.test-line').scroll({
		scrollY: false, //是否竖向滚动
		scrollX: true, //是否横向滚动
		indicators: false
	});

}

//打开精选游记
mui('body').on('tap', '.p-linelist li,.test-line li', function(e) {
	var new_thistid = $(this).attr('tid');
	if (new_thistid) {
		mui.openWindow({
			url: 'traveldetail.html?tid=' + new_thistid,
			id: 'traveldetail.html'
		});
		var traveldetail = plus.webview.getWebviewById('traveldetail.html');
		traveldetail.addEventListener('close', function() {
			setbcolor('dark');
		})
		return
	}
});

mui('body').on('tap', '.mui-slider-item.ready', function(e) {
	getbooks_list();
});

var getingbooks_list = 0;
//获取精选路书
function getbooks_list() {
	if (getingbooks_list == 1) {
		return
	};
	getingbooks_list = 1;

	var olddata = plus.storage.getItem('bookslist_data') || '';
	if (olddata != '') {
		olddata = JSON.parse(olddata);
		setbookslist(olddata);
	}

	$.get(localStorage.getItem('ajaxlinkhead') + '/books/list/515?is_ajax=1&page=1', function(result) {
		if (result.list) {
			if (result.list.data == '') {
				mui.toast('精选路书获取失败');
			} else if (result.list.data) {
				
				
				if (olddata == '') {
					setbookslist(result.list.data)
				}else if(JSON.stringify(result.list.data)!=plus.storage.getItem('bookslist_data')){
					setbookslist(result.list.data)
				}
				
				plus.storage.setItem('bookslist_data', JSON.stringify(result.list.data));
				
			}
			bklistsuccess = 1;
		} else {
			mui.toast('精选路书获取失败');
		};
		getingbooks_list = 0;
	}, 'json').fail(function() {
		getingbooks_list = 0;
		// mui.toast('精选路书获取失败');
	});
};

//载入精选路书
function setbookslist(bookdata) {
	if (bookdata.length > 0) {
		$('.mui-slider-item.ready').remove();
	}

	$('.defaultbookbox').remove();

	$.each(bookdata, function(i, v) {

		var startcity = strarrgetfirst(v.city);
		var startcover = strarrgetfirst(v.cover_id);
		var desc = v.covertitle || '';
		if (desc == '') {
			desc = ' &nbsp; ';
		}

		var title = v.title||'';
		if (title == '') {
			title = ' &nbsp; ';
		}

		var cover_image = localStorage.getItem('ajaxlinkhead') + v.cover_image;
		var imgname = cover_image.substr(cover_image.lastIndexOf('/') + 1);

		var li = '<div class="mui-slider-item defaultbookbox"><a><div class="bannerinfo bannerinfo-1 defaultbook"  tid="' +
			v.id + '"><div class="imgtext"><p>主题精选</p><h1>' + desc + '</h1></div><div class="cover img_cache_bg" imgname="' +
			imgname + '"></div><div class="moreinfo-1"><h1>' + title + '</h1><button>定制此行程</button><ul><li>• 目的地 :  ' +
			startcity + '</li><li>• 天数 :  ' + v.playDays + '天</li></ul></div></div></a></div>';

		$('#aboutusitem').before(li);
		img_cache(cover_image, '_bg', imgname);

	});
}

function strarrgetfirst(strarr) {
	var startcity = strarr;
	if (startcity != null && startcity != 'null' && startcity != '' && startcity && startcity != undefined && startcity !=
		'undefined') {
		var s = ',' + startcity;
		s = s.substring(1, s.length);
		s = s.split(",");

		if (s[s.length - 1] != s[0]) {
			startcity = s[0] + '/' + s[s.length - 1];
		} else {
			startcity = s[0];
		}
	} else {
		startcity = '';
	};
	return startcity;
}

mui('body').on('tap', '.defaultbook', function(e) {
	var tid = $(this).attr('tid');
	var bookdetail = plus.webview.getWebviewById('bookdetail.html');

	if (bookdetail) {
		bookdetail.close('none');
	}

	if (tid && tid != '') {
		var bookdetail = plus.webview.create('bookdetail.html?tid=' + tid, 'bookdetail.html', {
			top: 0,
			bottom: 0
		});
		showcssWaiting();
		$('.csswait').css('position', 'fixed');
		bookdetail.addEventListener('close', function() {
			setbcolor('dark');
		})
	}

});

mui('body').on('tap', '.custbox .isempty', function(e) {
	getcategory();
});

var getcategorying = 0;

function getcategory() {
	if (getcategorying == 1) {
		return
	}
	getcategorying = 1;

	showcssWaiting()
	var olddata = plus.storage.getItem('getcategory_data') || '';
	if (olddata != '') {
		olddata = JSON.parse(olddata);
		setcategory(olddata);
	}

	$.get(localStorage.getItem('ajaxlinkhead') + '/index/index/category.html', {
		model: 'line',
		is_ajax: 1,
		level: 3
	}, function(data) {

		if (data.list) {
			var newlist1 = [];
			var newlist2 = []
			$.each(data.list, function(i, v) {

				if (v.title.indexOf('热门')) {
					if (v.title.indexOf('国外')) {
						newlist1.push(v);
					}
				} else {
					newlist2.push(v);
				}
			})
			
			newlist1 = newlist2.concat(newlist1);
			
			var newlist1_s=JSON.stringify(newlist1);
			plus.storage.setItem('getcategory_data',newlist1_s);
			
			if(olddata==''){
				showcssWaiting();
				setcategory(newlist1);
			}else if(newlist1_s!=plus.storage.getItem('getcategory_data')){
				showcssWaiting();
				setcategory(newlist1);
			}
			
		} else {
			closecssWaiting()
		}

		cglistsuccess = 1;
		getcategorying = 0;
	}, 'json').fail(function() {
		getcategorying = 0;
		$('.custbox .isempty').show();
		//mui.toast('目的地获取失败');
		closecssWaiting()
	})
}

function setcategory(datalist) {

	$('.custbox .isempty').hide();
	$('.terminilist li,#slider2 .mui-slider-indicator a,#slider2 .mui-slider-group .custbox-content').remove();

	$.each(datalist, function(i, v) {
		var title = v.title;
		if (title.length > 3) {
			title = title.substring(0, 2);
		}
		var active = '';
		if (i == 0) {
			active = 'mui-active';
		}
		var index = i + 4;

		$('#slider2 .mui-slider-indicator').append('<a  class="mui-control-item ' + active + '" href="#item' + index +
			'mobile">' + title + '</a>');

		if (i == 0) {
			$('#slider2 .mui-slider-group').append('<div destid="' + i + '" isload="1" id="item' + index +
				'mobile" class="destlist mui-slider-item mui-control-content custbox-content"><div id="scroll' + index +
				'" class="mui-scroll-wrapper"><div class="mui-scroll" cid="' + v.id +
				'"><div class="refresh-tip"> &nbsp; </div><div class="refreshpush"></div><button class="termini">请选择目的地</button></div></div></div>'
			);

			$.each(v._child, function(a, b) {
				$('.mui-scroll[cid="' + v.id + '"] .termini').before('<ul class="terminilist" cid="' + b.id + '"><h1>' + b.title +
					'<span>/ ' + b.name + '</span></h1></ul>');
				$.each(b._child, function(c, d) {
					var dicon = d.icon || '';
					if (dicon == '/uploads/picture/20170726/dc4242a9e86fc1c851f50c0c70957c03.jpg' || dicon == '') {
						dicon = ''
					} else {
						dicon = localStorage.getItem('ajaxlinkhead') + dicon;
					}

					var cover_image = '';
					var imgname = '';
					if (dicon != '') {
						cover_image = dicon;
						imgname = cover_image.substr(cover_image.lastIndexOf('/') + 1);
					}

					$('.terminilist[cid="' + b.id + '"]').append('<li cid="' + d.id + '"><div><h2>' + d.title + '</h2><i>' + d.name +
						'</i></div><span class="cover img_cache_bg" imgname="' + imgname + '"></span></li>');

					if (imgname != '') img_cache(cover_image, '_bg', imgname);

				});
			});

		} else {

			var content = '<div destid="' + i + '" isload="0" id="item' + index +
				'mobile" class="destlist mui-slider-item mui-control-content custbox-content box-content ' + active + '">';

			if (v._child) {
				content +=
					'<div class="mui-content mui-row mui-fullscreen"><div class="mui-col-xs-4 leftlist"><div id="segmentedControls' +
					index + '" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical" cid="' +
					v.id + '"></div></div><div id="segmentedControlContents' + index + '" cid="' + v.id +
					'" class="mui-col-xs-8 rightlist"></div></div></div>';
			} else {
				content += '<p style="text-align:center;margin-top:50px;color:#ccc;">没有列表</p></div>';
			}

			$('#slider2 .mui-slider-group').append(content);

			$.each(v._child, function(a, b) {
				var active = '';
				if (a == 0) {
					active = 'mui-active';
				}

				var slength = 0;
				var destbox = '';

				$('.rightlist[cid="' + v.id + '"]').append('<div id="content' + b.id + '" class="mui-control-content ' + active +
					'"><ul class="destbox">' + destbox + '</ul></div>');

				$.each(b._child, function(c, d) {
					slength = c;
					var dicon = d.icon || '';
					if (dicon == '/uploads/picture/20170726/dc4242a9e86fc1c851f50c0c70957c03.jpg' || dicon == '') {
						dicon = ''
					} else {
						dicon = localStorage.getItem('ajaxlinkhead') + dicon;
					}

					var cover_image = '';
					var imgname = '';
					if (dicon != '') {
						cover_image = dicon;
						imgname = cover_image.substr(cover_image.lastIndexOf('/') + 1);
					}

					destbox = '<li class="destli img_cache_bg" imgname="' + imgname + '" cover_image="' + cover_image +
						'" cid="' + d.id + '"><div class="inner"><h1>' + d.title + '</h1><span>' + d.name +
						'</span></div><i class="fa fa-check"></i></li>';

					$('.rightlist[cid="' + v.id + '"] #content' + b.id + ' .destbox').append(destbox);
					
					if (imgname != '') img_cache(cover_image, '_bg', imgname);

				});

				slength = slength + 1;
				$('.mui-segmented-control[cid="' + v.id + '"]').append('<a class="mui-control-item ' + active +
					'" href="#content' + b.id + '">' + b.title + '<span>/ ' + slength + '</span></a>');

			});
		}

	});
	
	custliready = 1;
	if (nowindex == 1) {
		
		var l = document.getElementsByClassName('custbox-content');
		var a = window.innerHeight - document.getElementById('tapboxpush').clientHeight - document.getElementById(
			'footermenu').clientHeight;
		var h = a + 'px';
		for (var i = 0; i < l.length; i++) {
			l[i].style.height = h;
		}
		var d = a + 1 + 'px';
		$('.custbox .mui-scroll-wrapper .mui-scroll').css('min-height', d);

		mui('.custslider').slider({
			interval: 0
		});
		mui('.custbox .mui-scroll-wrapper').scroll({
			indicators: false,
			deceleration: 0.003
		});
		custliready=0;
	}

	closecssWaiting()

}

mui('body').on('tap', '.cust.isempty', function(e) {
	if (loginIf() == 0) {
		return
	};
	memberlist();
});

var getmemberlist = 0;

function memberlist() {
	if (getmemberlist == 1) {
		return
	};
	getmemberlist = 1;

	var olddata = plus.storage.getItem('memberlist_data') || '';
	if (olddata != '') {
		olddata = JSON.parse(olddata);
		setmemberlist(olddata);
	}

	$.get(localStorage.getItem('ajaxlinkhead') + '/user/member/member_list.html', {
		is_ajax: 1,
		gpid: 9,
		page: 1,
		cid: ''
	}, function(result) {
		if (result.list.length > 0) {
			plus.storage.setItem('memberlist_data', result.list);
			setmemberlist(result.list)
		}

		mblistsuccess = 1;
		getmemberlist = 0;
	}, 'json').fail(function() {
		getmemberlist = 0;
		//mui.toast('获取定制师列表失败');
	})
};

function setmemberlist(listdata) {
	var f = listdata[0];
	if (f.image && f.image != '') {
		$('.c-body-leftimg').css('background-image', 'url(' + localStorage.getItem('ajaxlinkhead') + f.image + ')');
	};
	$('.c-body').attr('cid', f.uid);
	$('.c-body h2').text(f.nickname || f.username || f.real_name || 'unknow');

	var evaluatenum = Number(f.AvguComment) * 20;
	evaluatenum = evaluatenum.toFixed();
	if (evaluatenum == 0) {
		evaluatenum = '-';
	}

	$('.indexbox .c-body .evaluate b').text(evaluatenum);

	f.AvguComment--;

	$('.indexbox .c-body ul li i').each(function(i) {
		if (f.AvguComment < i) {
			$(this).css('color', '#ddd');
		}
	})

	$('.c-body p span').text(f.signature || ' - ');
	$('.cust.isempty').hide();
	$('.c-body').show();

	$('.test-cust .custli').remove();

	$.each(listdata, function(i, v) {
		if (i == 4) {
			return false
		};
		var imgname = '';
		if (v.image && v.image != '') {
			var cover_image = localStorage.getItem('ajaxlinkhead') + v.image;
			imgname = cover_image.substr(cover_image.lastIndexOf('/') + 1);
		}
		var vname = v.nickname || v.username || v.real_name || 'unknow';

		var li = '<li class="custli" cid="' + v.uid + '"><div class="image img_cache_bg" imgname="' + imgname +
			'"></div><h1>' + vname + '</h1>	<p>' + (v.signature || ' ') +
			'</p><ul><span>好评率：</span><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li></ul></li>';

		$('.test-cust').append(li);

		cover_image && img_cache(cover_image, '_bg', imgname);
		v.AvguComment--;
		$('.custli[cid="' + v.uid + '"] i').each(function(a, b) {
			if (v.AvguComment < a) {
				$(this).css('color', '#eee');
			} else {
				$(this).css('color', '#ffb539');
			}
		})

	})

	return

	if (listdata.length > 1) {

		$('.c-more li').remove();

		$.each(listdata, function(i, v) {
			if (i > 0) {
				var imgname = ''
				if (v.image && v.image != '') {
					var cover_image = localStorage.getItem('ajaxlinkhead') + v.image;
					imgname = cover_image.substr(cover_image.lastIndexOf('/') + 1);
				}
				var vname = v.nickname || v.username || v.real_name || 'unknow';

				var li = '<li cid="' + v.uid + '"><div class="img_cache_bg" imgname="' + imgname +
					'" style="background-image: url(img/my-head-big.png);"></div><h3>' + vname +
					'</h3><span>◆ <b>路书定制师</b></span></li>';
				$('.c-more').append(li);

				cover_image && img_cache(cover_image, '_bg', imgname);

			}
		});

		$('.c-bottom.mui-scroll-wrapper').show();

		$('.c-more').css('width', $('.c-more li').length * 115 + 'px');
		$('.c-bottom.mui-scroll-wrapper .mui-scroll').css('width', $('.c-more li').length * 115 + 'px');

		mui('.c-bottom.mui-scroll-wrapper').scroll({
			scrollY: false, //是否竖向滚动
			scrollX: true, //是否横向滚动
			indicators: false
		});

	} else {
		$('.c-bottom.mui-scroll-wrapper').hide();
	}

}

mui('body').on('tap', '.c-body,.c-more li,.custli', function(e) {
	showcssWaiting();
	var olddetail = plus.webview.getWebviewById('expertdetail.html');
	if (olddetail) {
		olddetail.close('none')
	};
	$('.csswait').css('position', 'fixed');

	var open_url = 'expertdetail.html?uid=' + $(this).attr('cid') + '&hsrc=';
	var expertdetail = plus.webview.create(open_url, 'expertdetail.html', {
		top: 0,
		bottom: 0
	});
	expertdetail.addEventListener('close', function() {
		setbcolor('dark');
	});
});

mui('body').on('tap', '.version', function() {
	$('.blurbox').addClass('bluring');
	$('.coverbox').show();
	$('.version-desc').fadeIn('fast');
});

mui('body').on('tap', '.coverbox,.version-desc .close', function() {
	$('.blurbox').removeClass('bluring');
	$('.version-desc').hide();
	$('.coverbox').fadeOut('fast');
});

mui('body').on('tap', '.version-desc .new', function() {
	plus.runtime.openURL(storelink);
});

mui('body').on('tap','.version-desc .setting',function(){
	var s=(this.innerText=='关闭热更新')?'开启':'关闭';
	var b=(s=='关闭')?'开启':'关闭';
	this.innerText=s+'热更新';
	mui.toast('已设置为'+b);
	plus.storage.setItem("hot_update",b);
	var waittime = plus.storage.getItem('waittime_Hupdata');
	if(waittime){
		plus.storage.removeItem('waittime_Hupdata');
	}
});
