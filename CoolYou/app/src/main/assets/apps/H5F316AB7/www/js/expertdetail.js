mui('body').on('tap', '.needct', function(e) {
	if (loginIf() == 0) {
		return
	};
	$('.addevaluate .startlist li i').removeClass('set');
	$('.addevaluate').show();
	checkevaluate();
	scrollToEnd()
});

function scrollToEnd() { //滚动到底部
	var h = $(document).height() - $(window).height();
	$(document).scrollTop(h);
}

mui('body').on('tap', '.addevaluate .startlist li', function(e) {
	var thisindex = $(this).index();
	$('.addevaluate .startlist li i').removeClass('set');
	$('.addevaluate .startlist li i').each(function(i) {
		if (i <= thisindex) {
			$(this).addClass('set');
		}
	})
});

mui('body').on('tap', '.subevaluate', function(e) {

	var starlength = $('.addevaluate .startlist li i.set').length;
	if (starlength == 0) {
		mui.toast('请设置星级评价');
		return;
	}

	var textval = $('.addevaluate textarea').val();
	if (textval.length <= 3) {
		mui.toast('评价内容太短');
		return;
	}

	$('input,textarea').blur();

	textval = textval.replace(new RegExp('\n', 'gm'), '<br/>');
	starlength;
	var subjson = {
		'is_ajax': 1,
		'cid': gdata.uid,
		'type': '200',
		'content': textval,
		'star': starlength
	}

	showcssWaiting();
	$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/comment", subjson, function(map) {

		if (map.code == 1) {
			deleli(evaluateid)
			evaluateid = '';
			$('.addevaluate').slideUp();
			cannext = true;
			nowpage = 1;
			$('.evaluate-list .eli').remove();
			getevaluate();
		}

		mui.toast(map.msg);
		closecssWaiting();

	}, 'json').fail(function() {
		closecssWaiting();
		mui.toast('提交失败');
	});

});

//获取 年月日格式的日期
function getDateFormat(date) {
	var timestamp = Number(date);
	var newDate = new Date();
	newDate.setTime(timestamp * 1000);
	return newDate.format('yyyy.MM.dd hh:mm');
}

var evaluatetotel = 0;
var evaluateid = '';

function checkevaluate() {
	$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/iscomment", {
		'is_ajax': 1,
		'cid': gdata.uid,
		'type': '200'
	}, function(map) {
		if (map.err == 0) {
			$('.addevaluate textarea').val(map.info.content);
			evaluateid = map.info.id;
			$('.addevaluate .startlist li i').each(function(i) {
				var thisindex = Number(map.info.star) - 1;
				if (i <= thisindex) {
					$(this).addClass('set');
				}
			})
		}
	}, 'json').fail(function() {
		closecssWaiting();
		mui.toast('检查失败');
	});
}

mui('body').on('tap', '.evaluate-more', function(e) {
	if (cannext == false) {
		mui.toast('当前已无更多');
	} else {
		getevaluate();
	}
});

var cannext = true;
var nowpage = 1;

function getevaluate() {
	showcssWaiting();
	$.get(localStorage.getItem('ajaxlinkhead') + "/user/member/member_comment", {
		'is_ajax': 1,
		'cid': gdata.uid,
		'type': '200',
		page: nowpage
	}, function(map) {

		if (map.err == 0) {
			$('.evaluate-list .listhead span').text('/ ' + map.page.total || '/ 0');
			$('#service-data-num').text(map.page.total);
			evaluatetotel = Number(map.page.total);
			$.each(map.list, function(a, b) {
				var starli = '';
				for (var i = 1; i < 6; i++) {
					var color = '';
					if (i > Number(b.star)) {
						color = 'style="color:#ddd;"';
					}
					starli += '<li><i class="fa fa-star" ' + color + '></i></li>';
				}

				var del = '';
				if (b.uid == plus.storage.getItem('user_uid')) {
					del = '<i class="fa fa-trash-o del-eli"> 删除</i>';
				}

				var nickname = b.nickname || '匿名';
				var eli = '<li class="eli" uid="' + b.uid + '" eid="' + b.id +
					'"><div class="left"><img class="headimg" src="' + localStorage.getItem('ajaxlinkhead') + b.avatar +
					'"/></div><div class="right"><h2>' + nickname + del + '</h2><p>' + b.content + '</p><span>' + getDateFormat(b
						.create_time) + '</span><ul>' + starli + '</ul></div></li>';
				$('.evaluate-list .evaluate-more').before(eli);
			});

			if ($('.evaluate-list li.eli').length > 0) {
				$('#noevaluate').hide();
			} else {
				$('#noevaluate').show();
			}

			if (map.page.last_page > map.page.current_page) {
				$('.evaluate-more').show();
				cannext = true;
				nowpage++;
			} else {
				cannext = false;
			}

		} else {
			mui.toast(map.msg);
		}
		closecssWaiting();
	}, 'json').fail(function() {
		closecssWaiting();
		mui.toast('获取评价失败');
		console.log('当前 sessid：' + plus.navigator.getCookie(localStorage.getItem('ajaxlinkhead')));
	});
}

//{"err":0,"msg":"获取成功","type":200,"cid":13,"list":{"total":1,"per_page":5,"current_page":1,"last_page":1,"data":[{"id":"251","cid":"13","type":"200","pid":"0","uid":"53","star":"5","content":"弟弟妹妹的孩子","create_time":"1534910183","id_msg":"0"}]},"page":null}

mui('body').on('tap', '#onshare', function(e) {
	onshare();
});

mui('body').on('tap', '.del-eli', function(e) {
	var thisparentdom = $(this).parent().parent().parent();
	plus.nativeUI.confirm("确定要删除吗?", function(e) {
		if (e.index == 0) {
			deleli(thisparentdom.attr('eid'), thisparentdom);
		}
	});
});

function deleli(eid, removedom) {
	if (eid == '') {
		return
	}
	$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/delete_comment.html", {
		is_ajax: 1,
		act: 'del',
		id: eid
	}, function(data) {

		if (data.code == 1) {
			if (removedom) {
				removedom.remove();
				mui.toast(data.msg);
			}
			evaluatetotel--;
			$('.evaluate-list .listhead span').text('/ ' + evaluatetotel);
			$('#service-data-num').text(evaluatetotel);
			if (evaluatetotel == 0) {
				$('#noevaluate').show();
			}
		}
	}, 'json').fail(function(data) {
		mui.toast('删除失败，发生错误');
	});
}

var gdata = GetRequest();
$('.e-exper,.e-cust').hide();

if (gdata.hsrc) {
	var hsrc = gdata.hsrc || '/img/my-head.png';
	$('.c-body .c-body-leftimg').attr('src', hsrc);
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

// 判断扩展API是否准备，否则监听'plusready'事件
if (window.plus) {
	plusReady()
} else {
	document.addEventListener('plusready', plusReady, false)
};

function plusReady() {
	if (gdata.uid == plus.storage.getItem('user_uid')) {
		$('#ask').hide()
	}
	memberinfo();
	getevaluate();
};

var saying = 0;
var nowbcolor = 'light';
var nowscroll = 0;

$(window).bind("scroll", function() {
	var sTop = $(window).scrollTop();
	sTop = parseInt(sTop);
	if (saying == 0) {
		nowscroll = sTop;
		if (sTop > 240) {
			$('#defaulthead').removeClass('airhead');
			$('#headact').css('color', '#b8c4ca');
			if (window.plus) {
				setbcolor('dark');
				nowbcolor = 'dark';
			}
		} else {
			$('#defaulthead').addClass('airhead');
			$('#headact').css('color', '#fff');
			if (window.plus) {
				setbcolor('light');
				nowbcolor = 'light';
			}
		}
	}
});

mui.previewImage();

mui('body').on('tap', '#headback', function(e) {
	$('input').blur();
	plus.webview.currentWebview().close();
})

mui('body').on('tap', '#postlist,.moreinfo .bottom', function(e) {
	setbcolor('dark');
	mui.openWindow({
		url: 'postlist.html?uid=' + gdata.uid + '&name=' + $('#nickname').text(),
		id: 'postlist.html'
	})
});

mui('body').on('tap', '#tatravels,.listhead.e-exper', function(e) {
	setbcolor('dark');
	mui.openWindow({
		url: 'tatravels.html?uid=' + gdata.uid + '&name=' + $('#nickname').text(),
		id: 'tatravels.html'
	})
});

mui('body').on('tap', '#books,.listhead.e-cust', function(e) {
	setbcolor('dark');
	mui.openWindow({
		url: 'tabooks.html?uid=' + gdata.uid + '&name=' + $('#nickname').text(),
		id: 'tabooks.html'
	})
});

mui('body').on('tap', '#reward', function(e) {
	var uid = gdata.uid;
	var hsrc = $('#nickname').attr('hsrc');
	var text = $('#nickname').text();
	if (hsrc == undefined) {
		hsrc = '';
	}
	var nurl = 'reward.html?uid=' + uid + '&hsrc=' + hsrc + '&uname=' + text;
	setbcolor('dark');
	mui.openWindow({
		url: nurl,
		id: 'reward.html'
	});
	if (nowbcolor == 'light') {
		plus.webview.getWebviewById('reward.html').addEventListener('close', function() {
			setbcolor('light');
		})
	}
});

var group_id = '';
var sexbtc = ['保密', '男', '女'];
var sexico = ['genderless', 'mars', 'venus']

function memberinfo() {
	var currentW = plus.webview.currentWebview();
	var opener = currentW.opener();

	var subjson = {
		'is_ajax': 1,
		'id': gdata.uid
	};
	showcssWaiting();
	$.post(localStorage.getItem('ajaxlinkhead') + '/user/member/index', subjson, function(result) {
		if (result && result != '') {

			//console.log(JSON.stringify(result));
			uInfo = result.userInfo;
			$('#postlist b').text(result.countNote);
			$('#tatravels b').text(result.CountTravels);
			$('.listhead.e-exper span').text('/ ' + result.CountTravels);
			$('#books b').text(result.CountBooks);
			$('.listhead.e-cust span').text('/ ' + result.CountBooks);

			if (uInfo && uInfo != '') {
				var nickname = uInfo.nickname || uInfo.username;

				$('#nickname').text(nickname);
				$('#username').text(uInfo.username);

				var signature = uInfo.signature || '暂无简介';
				$('#signature').text(signature);

				$('#height').text(uInfo.height + ' cm');
				$('#sex').text(sexbtc[Number(uInfo.sex)]);
				$('.c-body p i').attr('class', 'fa fa-' + sexico[Number(uInfo.sex)])
				$('#birthday').text(sbackstr(uInfo.birthday));

				if (uInfo.avatar) {
					var hsrc = localStorage.getItem('ajaxlinkhead') + uInfo.avatar;
					$('.c-body .c-body-leftimg').attr('src', hsrc);
					$('#nickname').attr('hsrc', hsrc);
				}

				group_id = uInfo.group_id;
				//体验师
				if (uInfo.group_id == '8') {
					$('.e-general').hide();
					$('.e-exper').show();
					get_travelslist();
					$('.expert-bg').attr('src', 'img/expert/expert-bg-2.jpg');
				} else if (uInfo.group_id == '9') { //定制师
					$('.e-general').hide();
					$('.e-cust').show();
					getbooks_list();
					$('.expert-bg').attr('src', 'img/expert/expert-bg-3.jpg');
				} else {
					$('.e-exper,.e-cust').hide();
					$('.e-general').show();
					get_travelslist();
					$('.expert-bg').attr('src', 'img/expert/expert-bg-1.jpg');
				}

			}

			if (result.getNotes) {
				var moreinfo = result.getNotes.data[0];
				if (moreinfo) {
					if (moreinfo.content != '') {
						$('.moreinfo .content').html(moreinfo.content);
						$('.moreinfo .content').show();
					}
					if (moreinfo.cover_id != '') {
						var f = ',' + moreinfo.cover_id;
						f = f.substring(1, f.length);
						f = f.split(",");
						$.each(f, function(a, b) {
							$.ajax({
								url: localStorage.getItem('ajaxlinkhead') + '/index/img',
								type: "post",
								data: {
									is_ajax: 1,
									id: b
								},
								dataType: "json",
								success: function(map) {
									var datapicurl = localStorage.getItem('ajaxlinkhead') + map.pic_url;
									if (coverString('.jpeg', datapicurl) || coverString('.jpg', datapicurl) || coverString('.png',
											datapicurl)) {
										$('.photolist').append('<dd><span class="msgimg"><img  onload="clip(this);" src="' + datapicurl +
											'" data-preview-src="" data-preview-group="1"/></span></dd>');
									}
								}
							});
						})
						$('.photolist').show();
					}
					$('#nonote').hide();
					$('.moreinfo').show();
				}
			}

			var rent_time_str = '';
			$.each(result.rent_time, function(i, v) {
				if (i == 0) {
					rent_time_str = result.renttime[v];
				} else {
					rent_time_str = rent_time_str + '，' + result.renttime[v];
				}
			});

			$('#renttime').text(rent_time_str);

			var skillnum = 0;
			$.each(result.skill.theme, function(i, v) {
				skillnum++;
				$('.skill .listhead').after("<li>◆<p>" + result.renttheme[Number(v)] + "</p><span>¥<b>" + result.skill.data[
					Number(v)] + "</b>/小时</span></li>");
			})

			if (skillnum > 0) {
				$('.skill').show();
				$('#skillnum').text('/ ' + skillnum);
			}

			var AvguComment = result.AvguComment || 0;
			AvguComment = Number(AvguComment);
			var newper = AvguComment * 20;
			newper = newper.toFixed();
			$('.service-data .evaluate b').text(newper);
			AvguComment = AvguComment.toFixed() - 1;

			$('.service-data li i').each(function(i, v) {
				if (i <= AvguComment) {
					$(this).css('color', '#f7b83f');
				}
			})

			var focusStr = '';
			var focusIcon = '';
			if (result.focus == '0') {
				focusStr = ' 关注';
				focusIcon = 'fa fa-plus';
			} else if (result.focus == '1') {
				focusStr = ' 已关注';
				focusIcon = 'fa fa-check';
			} else if (result.focus == '2') {
				focusStr = ' 已互相关注';
				focusIcon = 'fa fa-exchange';
			}

			$('#focus').text(focusStr);
			$('#focus').attr('class', focusIcon);

		} else {
			mui.toast('获取资料失败');
		};

		setbcolor('light');
		currentW.show('slide-in-right');
		if (opener) {
			opener.evalJS('closecssWaiting()')
		};
		closecssWaiting();

	}, 'json').fail(function() {
		if (opener) {
			opener.evalJS('closecssWaiting()')
		};
		closecssWaiting();
		mui.toast('获取资料失败，发生错误');
	});
};

//忽略大小写判断是否包含子字符串
function coverString(subStr, str) {
	var reg = eval("/" + subStr + "/ig");
	return reg.test(str);
}

function sbackstr(num) {
	var timestamp = Number(num);
	var newDate = new Date();
	newDate.setTime(timestamp * 1000);
	var backstr = newDate.format('yyyy-MM-dd');
	return backstr;
}

//关注按钮事件
mui('body').on('tap', '#focus', function() {
	if (loginIf() == 0) {
		return
	};
	var uid = gdata.uid;
	var that = $('#focus');
	if ($(that).hasClass('fa-check') || $(that).hasClass('fa-exchange')) {
		plus.nativeUI.confirm("您是否要取消对该用户的关注？", function(e) {
			if (e.index == 0) {
				mui.post(localStorage.getItem('ajaxlinkhead') + '/user/member/unfocus', {
					id: uid
				}, function(data) {
					if (data.code == '1') {
						$('#focus').attr('class', 'fa fa-plus').text(' 关注');
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
				$('#focus').attr('class', 'fa fa-check').text(' 已关注');
			}
			closecssWaiting();
			mui.toast(data.msg);
		}, 'json');
	}
});

mui('body').on('tap', '#companion', function(e) {
	if (loginIf() == 0) {
		return
	};
	$('input').blur();
	setbcolor('dark');
	mui.openWindow({
		url: 'companion.html',
		id: 'companion.html'
	});
});

mui('body').on('tap', '#chat,#ask', function(e) {
	if (loginIf() == 0) {
		return
	};
	if (gdata.uid == plus.storage.getItem('user_uid')) {
		mui.toast('不能和自己聊天');
		return
	}

	$('input').blur();
	setbcolor('dark');

	var tid = gdata.uid;
	var nickname = $('#nickname').text();
	var avatar = $('.c-body-leftimg').attr('src');
	var signature = $('#signature').text();

	var tdata = {
		'tid': tid,
		'nickname': nickname,
		'avatar': avatar,
		'signature': signature
	};

	plus.webview.getLaunchWebview().evalJS('get_userinfo(' + tid + ');');

	tdata = JSON.stringify(tdata);
	var chatpage = plus.webview.getWebviewById('im-chat.html');
	chatpage.evalJS('gdata(' + tdata + ');');
	chatpage.addEventListener('close', function() {
		setbcolor(nowbcolor)
	})

});

//获取游记
function get_travelslist() {
	showcssWaiting();
	$.get(localStorage.getItem('ajaxlinkhead') + '/user/member/travels/id/' + gdata.uid + '?is_ajax=1&page=0', function(
		result) {

		if (result.list) {
			if (result.list.data != '') {
				$.each(result.list.data, function(i, v) {
					var startcity = strarrgetfirst(v.city);
					var li = '<li class="p-linelist-li" listtype="travels" style="background-image:url(' + localStorage.getItem(
							'ajaxlinkhead') + v.cover_img + ');"  tid="' + v.id + '"><p>' + v.title + '</p><ul><li>&bull; ' + startcity +
						'</li><li>&bull; ' + v.playDays + '天</li></ul></li>';
					$('.p-linelist').append(li);
				});

				$('#nopline').hide();

				$('.p-line.mui-scroll-wrapper').show();

				$('.p-line .p-linelist').css('width', result.list.data.length * 205 + 'px');
				$('.p-line.mui-scroll-wrapper .mui-scroll').css('width', result.list.data.length * 165 + 'px');

				mui('.mui-scroll-wrapper.p-line').scroll({
					scrollY: false, //是否竖向滚动
					scrollX: true, //是否横向滚动
					indicators: false,
					deceleration: 0.003
				});

			} else if (result.list.data == '') {
				$('#nopline').show();
				$('.mui-scroll-wrapper.p-line').hide();
			}
		} else {
			$('.mui-scroll-wrapper.p-line').hide();
			mui.toast('获取失败');
		};
		closecssWaiting();
	}, 'json').fail(function() {
		$('.mui-scroll-wrapper.p-line').hide();
		closecssWaiting();
		mui.toast('获取失败，发生错误');
		console.log('当前 sessid ：' + plus.navigator.getCookie(localStorage.getItem('ajaxlinkhead')));
	});
};

//获取路书
function getbooks_list() {
	showcssWaiting();

	$.get(localStorage.getItem('ajaxlinkhead') + '/books/list/all.html?is_ajax=1&uid=' + gdata.uid, function(result) {

		if (result.list) {

			if (result.list.data == '') {} else if (result.list.data) {
				if (result.list.data.length > 0) {
					$('#nopline').hide();
				}

				$.each(result.list.data, function(i, v) {

					var startcity = strarrgetfirst(v.city);
					var desc = v.description;
					if (desc == '') {
						desc = ' &nbsp; ';
					}

					var title = v.title;
					if (title == '') {
						title = ' &nbsp; ';
					}

					var li = '<li class="p-linelist-li" listtype="books" style="background-image:url(' + localStorage.getItem(
							'ajaxlinkhead') + v.cover_image + ');"  tid="' + v.id + '"><p>' + v.title + '</p><ul><li>&bull; ' +
						startcity + '</li><li>&bull; ' + v.playDays + '天</li></ul></li>';

					$('.p-linelist').append(li);

				});

				$('.p-line.mui-scroll-wrapper').show();

				$('.p-line .p-linelist').css('width', result.list.data.length * 205 + 'px');
				$('.p-line.mui-scroll-wrapper .mui-scroll').css('width', result.list.data.length * 165 + 'px');

				mui('.mui-scroll-wrapper.p-line').scroll({
					scrollY: false, //是否竖向滚动
					scrollX: true, //是否横向滚动
					indicators: false
				});

			}
		} else {
			$('.mui-scroll-wrapper.p-line').hide();

			mui.toast('精选路书获取失败');
		};
		closecssWaiting();
	}, 'json').fail(function() {
		$('.mui-scroll-wrapper.p-line').hide();
		closecssWaiting();
		mui.toast('精选路书获取失败，发生错误');
	});
};

mui('body').on('tap', '.p-linelist li', function(e) {
	var listtype = $(this).attr('listtype') || '';

	if (listtype == '') {
		return
	} else if (listtype == 'travels') {
		listtype = 'traveldetail';
	} else if (listtype == 'books') {
		listtype = 'bookdetail';
	}

	var tid = $(this).attr('tid');

	var olddetail = plus.webview.getWebviewById(listtype + '.html');
	if (olddetail) {
		olddetail.close('none')
	};

	if (listtype == 'bookdetail') {
		plus.webview.create('bookdetail.html?tid=' + tid, 'bookdetail.html', {
			top: 0,
			bottom: 0
		});
		showcssWaiting();
	} else {
		mui.openWindow({
			url: listtype + '.html?tid=' + tid,
			id: listtype + '.html'
		});
	}

	plus.webview.getWebviewById(listtype + '.html').addEventListener('close', function() {
		setbcolor('dark');
	})

});
