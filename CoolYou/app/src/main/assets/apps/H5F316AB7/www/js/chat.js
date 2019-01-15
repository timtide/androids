mui('body').on('tap', '.findbox .findlist li', function(e) {
	showcssWaiting();
	var thisdom = $(this);
	if (createchatting == 0) {
		openimchat(thisdom);
	} else {
		setTimeout(function() {
			openimchat(thisdom);
		}, 500)
		return
	}
});

function openimchat(dom) {
	var thisdom = dom;
	var tid = thisdom.attr('uid');
	var nickname = thisdom.find('h1').text();
	var avatar = thisdom.find('img').attr('src');
	var signature = thisdom.find('p').text();

	var tdata = {
		'tid': tid,
		'nickname': nickname,
		'avatar': avatar,
		'signature': signature
	};

	get_userinfo(tid)

	tdata = JSON.stringify(tdata);

	msg_user_list[tid].newmsg = '0';
	msg_user_list[tid].shownum = 0;
	plus.storage.setItem('msg_user_list_' + plus.storage.getItem('user_uid'), JSON.stringify(msg_user_list));

	thisdom.find('i').removeClass('show');

	resetnumshow();
	var chatpage = plus.webview.getWebviewById('im-chat.html');
	chatpage.evalJS('gdata(' + tdata + ');');
}

mui('body').on('tap', '.findbox .findlist li .mui-btn', function(e) {
	var thispdom = $(this).parents('li');
	var thisuid = $(this).parents('li').attr('uid');
	plus.nativeUI.confirm("要删除该聊天对象吗？", function(e) {
		if (e.index == 0) {
			thispdom.remove();
			$.each(msg_user_list_sort, function(i, v) {
				if (v == thisuid || v == undefined || v == null || v == 'undefined' || v == 'null' || v == '' || !v) {
					msg_user_list_sort.splice(i, 1);
				};
			});
			plus.storage.setItem('msg_user_list_sort_' + plus.storage.getItem('user_uid'), JSON.stringify(msg_user_list_sort));
			plus.storage.removeItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + thisuid);

			msg_user_list[thisuid].newmsg = '0';
			msg_user_list[thisuid].shownum = 0;
			plus.storage.setItem('msg_user_list_' + plus.storage.getItem('user_uid'), JSON.stringify(msg_user_list));

			resetnumshow();
		}
	});
});

//Socket_Data
var Socket = '';
var Socket_Data = {
	'sessid': '',
	'token': '',
	'time': '',
	'nickname': '',
	'message': '',
	'msg': '',
	'tid': ''
};

var checkreadyState = '';
var msg_user_list = {};
var msg_user_list_sort = [];
var loadmsglistdone = 0;

function loadmsglist() {
	$('.findlist li').remove();
	var nowuid = plus.storage.getItem('user_uid');
	msg_user_list = plus.storage.getItem('msg_user_list_' + nowuid) || '{}';
	msg_user_list_sort = plus.storage.getItem('msg_user_list_sort_' + nowuid) || '[]';

	if (msg_user_list_sort) {
		msg_user_list_sort = JSON.parse(msg_user_list_sort);
		if (msg_user_list) {
			msg_user_list = JSON.parse(msg_user_list);
			$.each(msg_user_list_sort, function(i, v) {

				var li;
				if (msg_user_list[v].user_info) {
					a = msg_user_list[v].user_info;

					var nickname;
					if (a.nickname != '') {
						nickname = a.nickname;
					} else {
						nickname = a.username;
					}

					var avatar;

					if (a.avatar != '') {
						avatar = ajaxlinkhead + a.avatar;
					} else if (a.headimgurl != '') {
						avatar = a.headimgurl;
					} else {
						avatar = "img/my-head.png";
					}

					var content;
					var lmtime;
					var msg_data_list = plus.storage.getItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + v);
					if (!msg_data_list) {
						msg_data_list = {}
						content = ' &nbsp; ';
						lmtime = 0;
					} else {
						msg_data_list = JSON.parse(msg_data_list);
						content = msg_data_list[msg_data_list.length - 1].content;

						if (msg_data_list[msg_data_list.length - 1].type == 'image') {
							content = '[ 图片 ]';
						}

						if (msg_data_list[msg_data_list.length - 1].type == 'sound') {
							content = '[ 语音 ]';
						}
						lmtime = msg_data_list[msg_data_list.length - 1].time || 0;
					}

					var show = '';
					var shownum = 0;
					if (msg_user_list[v].newmsg) {
						if (msg_user_list[v].newmsg == '1') {
							show = 'show';
							$('#footermenu b.newmsg').show();
						}
					}
					if (msg_user_list[v].shownum) {
						shownum = msg_user_list[v].shownum;
					}

					if (content != '[ 语音 ]' && content != '[ 图片 ]') {
						content = content.replace(/<br\s*\/?>/gi, "\r\n");
						if (content.length > 2) {
							$.each(facebook, function(f_i,f_v) {
								var f = '[' + f_i + ']';
								while (content.indexOf(f) > -1) {
									content = content.replace(f, '<i class="faceico" style="background-image:url(img/emoji/' + f_v +
										'.png)"></i>');
								}
							})
						}
					}

					li = '<li class="mui-table-view-cell"  uid="' + v +
						'"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><i class="newmsg ' +
						show + '">' + shownum + '</i><img src="' + avatar + '" onerror="nofind()" /><h1 lmtime="' + lmtime + '">' +
						nickname + '</h1><p>' + content + '</p></div></li>';

					if (nickname) {
						$('.findlist').append(li);
					}

				}

			})

			if ($('.findlist li').length > 0) {
				$('#findbox .isempty').eq(0).hide();
			}

			resetnumshow();

		} else {
			$('#findbox .isempty').eq(0).show();
			msg_user_list = {};
		}

		timereset();
	} else {
		msg_user_list_sort = [];
	}
	loadmsglistdone = 1;
}

var looplogin;

function timereset() {
	var nowtime = new Date();
	nowtime = nowtime.getTime();
	$('.findlist li h1').each(function(i) {
		var lmtime = $(this).attr('lmtime');
		var oldtext = $(this).find('span');
		var newtime = timeresetnum(lmtime, nowtime);
		if (lmtime == '0') {
			newtime = '';
		}
		if (oldtext.text() != '') {
			oldtext.text(newtime);
		} else {
			var newtext = $(this).text() + '<span class="time">' + newtime + '</span>';
			$(this).html(newtext)
		}
	})
}

function timeresetnum(num, nt) {
	var newDate = new Date();
	newDate.setTime(nt);
	var now_y = Number(newDate.format('YYYY'));
	var now_h = Number(newDate.format('hh'));

	var timestamp = Number(num);
	nt = ((nt / 1000 - timestamp) / 60).toFixed();
	if (nt <= 10) {
		return '刚刚';
	}
	if (nt <= 60) {
		return nt + '分钟前';
	}

	nt = (nt / 60).toFixed();


	if (nt < now_h) {
		return nt + '小时前';
	}

	nt = nt - now_h
	if (nt <= 24) {
		nt = '昨天';
	}

	var newDate = new Date();
	newDate.setTime(timestamp * 1000);
	if (nt == '昨天') {
		var backstr = newDate.format('hh:mm');
		return nt + ' ' + backstr;
	}

	var backstr = newDate.format('MM-dd hh:mm');

	var now_m = Number(newDate.format('YYYY'));
	if (now_m < now_y) {
		backstr = now_m + '-' + backstr;
	}

	return backstr;
}

function resetnumshow() {
	var numshow = 0;
	$('.findbox .findlist li i.show').each(function(i) {
		numshow += Number($(this).text());
	})
	if (numshow == 0) {
		$('#footermenu b.newmsg').hide();
	} else {
		$('#footermenu b.newmsg').text(numshow);
		$('#footermenu b.newmsg').show();
	}
}

function msg_history_clear(gtid) {
	$('.findlist li[uid="' + gtid + '"] p').html(' &nbsp; ');
}

function createLocalPushMsg(str) {
	plus.push.createMessage(str, "", {
		cover: true
	});
}

function starSocket() {
	if (Socket != '') {
		return
	}

	clearInterval(looplogin);
	looplogin = null;
	plus.storage.setItem('chatready', '0');
	$('#connecting').hide();
	$('#notready').show();
	Socket = new WebSocket('wss://' + localStorage.getItem('chatlinkhead') + ':8000/chat');

	Socket.onopen = function() {
		//console.log('Socket connected.');
		change_nickname();
		$('#notready').hide();
	}

	Socket.onclose = function(event) {
		console.log('Socket disconnected.');
		plus.storage.setItem('chatready', '0');
	};

	Socket.onmessage = function(msg_event) {
		$('#connecting').hide();

		clearInterval(looplogin);
		looplogin = null;
		looplogin = setInterval(function() {
			if (appstatus = 'resume') {
				change_nickname();
			}
		}, 180000);

		//console.log(msg_event.data);
		var data = $.parseJSON(msg_event.data);
		//$('.sessid').val(data.sessid)
		Socket_Data.token = data.token;
		Socket_Data.time = data.time;

		if (data.content) {
			//console.log(data.content.msg);
		}

		if (data.msg_type == 'message') {
			//console.log(data.nickname);
			//console.log(data.message);
		} else if (data.msg_type == 'update_clients') {
			//	    	var allnick='';
			//	        data.clients.forEach(function(nick) {
			//				allnick+=nick+' , ';
			//	        });
			//console.log(allnick);
		} else if (data.msg_type == 'msg') {

			var msgjson = {
				time: data.time,
				sender: data.fid,
				type: data.msg.type,
				content: data.msg.text
			};

			var imchat = plus.webview.getWebviewById('im-chat.html');
			if (imchat && data.fid == Socket_Data.tid) {
				imchat.evalJS('getmsg("' + data.msg.type + '","' + data.msg.text + '","' + data.msg.time + '");');
			}

			var msg_data_list = plus.storage.getItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + data.fid);
			msg_data_list = JSON.parse(msg_data_list);

			if (!msg_data_list) {
				msg_data_list = [];
			}

			msg_data_list.push(msgjson);
			plus.storage.setItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + data.fid, JSON.stringify(
				msg_data_list));
			//plus.device.vibrate(200);//消息震动

			var sendtext = '';
			if (data.msg.type == 'image') {
				sendtext = '[ 图片 ]';
			} else if (data.msg.type == 'sound') {
				sendtext = '[ 语音 ]';
			} else {
				sendtext = data.msg.text;
				sendtext = sendtext.replace(/<br\s*\/?>/gi, "\r\n");

				var old_sendtext = data.msg.text;
				old_sendtext = old_sendtext.replace(/<br\s*\/?>/gi, "\r\n");

				if (sendtext.length > 2) {
					$.each(facebook, function(f_i,f_v) {
						var f = '[' + f_i + ']';
						while (sendtext.indexOf(f) > -1) {
							sendtext = sendtext.replace(f, '<i class="faceico" style="background-image:url(img/emoji/' + f_v +
								'.png)"></i>');
						}
					})
				}

			}

			var objdom;

			if ($('.findlist li[uid="' + data.fid + '"]').html()) {

				objdom = $('.findlist li[uid="' + data.fid + '"]');
				objdom.find('h1').attr('lmtime', data.time);
				objdom.find('p').html(sendtext);

				if (Socket_Data.tid == data.fid && plus.webview.getWebviewById('im-chat.html').isVisible()) {} else {
					$('.findlist li[uid="' + data.fid + '"] i.newmsg').addClass('show');
					msg_user_list[data.fid].newmsg = '1';
					if (msg_user_list[data.fid].shownum) {
						msg_user_list[data.fid].shownum++
					} else {
						msg_user_list[data.fid].shownum = 1
					};
					$('.findlist li[uid="' + data.fid + '"] i.newmsg').text(msg_user_list[data.fid].shownum);
					$('#footermenu b.newmsg').show();
				}

				objdom.remove();

				$('.findlist').prepend(objdom);
				newlist(data.fid);

			} else {

				var nickname = '-';
				var avatar = 'img/my-head.png';

				if (msg_user_list && msg_user_list[data.fid]) {

					v = msg_user_list[data.fid].user_info;

					if (v.nickname && v.nickname != '') {
						nickname = v.nickname;
					} else if (v.username && v.username != '') {
						nickname = v.username;
					}

					if (v.avatar != '') {
						avatar = ajaxlinkhead + v.avatar;
					} else if (v.headimgurl != '') {
						avatar = v.headimgurl;
					}
				}

				var show = '';
				if (Socket_Data.tid == data.fid && plus.webview.getWebviewById('im-chat.html').isVisible()) {} else {
					show = 'show';
					if (msg_user_list[data.fid]) {
						msg_user_list[data.fid].newmsg = '1';
						if (msg_user_list[data.fid].shownum) {
							msg_user_list[data.fid].shownum++
						} else {
							msg_user_list[data.fid].shownum = 1
						};
					} else {
						msg_user_list[data.fid] = {
							newmsg: '1',
							shownum: 1
						};
					}
					$('#footermenu b.newmsg').show();
				}

				objdom = '<li class="mui-table-view-cell"  uid="' + data.fid +
					'"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><i class="newmsg ' +
					show + '">' + msg_user_list[data.fid].shownum + '</i><img src="' + avatar + '" onerror="nofind()" /><h1 lmtime="' +
					data.time + '">' + nickname + '</h1><p>' + sendtext + '</p></div></li>';

				$('.findlist').prepend(objdom);
				newlist(data.fid);

				if (nickname == '-' && avatar == 'img/my-head.png') {
					get_userinfo(data.fid);
				}

				$('#findbox .isempty').eq(0).hide();

			}

			if (appstatus != 'resume') {
				var postname = msg_user_list[data.fid].user_info.nickname || msg_user_list[data.fid].user_info.username || '新消息';
				createLocalPushMsg(postname + '：' + old_sendtext);
			}

			timereset();
			resetnumshow();

		} else if (data.msg_type == 'update_info_rp') {

			if (data.user_info) {

				$.each(data.user_info, function(i, v) {

					if (!msg_user_list[i]) {
						msg_user_list[i] = {
							user_info: ''
						};
					}

					msg_user_list[i].user_info = v;

					plus.storage.setItem('msg_user_list_' + plus.storage.getItem('user_uid'), JSON.stringify(msg_user_list));

					var objdom = $('.findlist li[uid="' + i + '"]');
					var objname = v.nickname || v.username;
					objdom.find('h1').text(objname);
					timereset();
					if (v.avatar != '') {
						objdom.find('img').attr('src', ajaxlinkhead + v.avatar);
					} else if (v.headimgurl != '') {
						objdom.find('img').attr('src', v.headimgurl);
					}

					var imchat = plus.webview.getWebviewById('im-chat.html');
					if (imchat) {
						imchat.evalJS('$(".defaulthead h1").text("' + objname + '");');
					}

				})
			}

		} else if (data.msg_type == 'msg_rp') {

			if (data.content.status == 0 || data.content.status == 30) {

				var msg_data_list = plus.storage.getItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + Socket_Data.tid);
				msg_data_list = JSON.parse(msg_data_list);

				var msgjson = {
					time: data.time,
					sender: 'self',
					type: senddingtype,
					content: Socket_Data.msg,
					headimg: plus.storage.getItem("user_headimg")
				};

				if (!msg_data_list) {
					msg_data_list = [];
				}

				msg_data_list.push(msgjson);

				plus.storage.setItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + Socket_Data.tid, JSON.stringify(
					msg_data_list));
				var imchat = plus.webview.getWebviewById('im-chat.html');
				if (imchat) {
					imchat.evalJS('getmsg("' + msgjson.type + '","' + msgjson.content + '","' + msgjson.time + '","' + Socket_Data.tid +
						'");');
				}
			}

			imscloseWait();

		} else if (data.msg_type == 'login_rp') {

			if (data.content.status == 0) {
				plus.storage.setItem('chatready', '1');
				$('#notready,#connecting').hide();
			} else if (data.content.status == 22) {
				var wvs = plus.webview.all();
				var Launchname = plus.webview.getLaunchWebview().id;
				for (var i = 0; i < wvs.length; i++) {
					if (wvs[i].id != Launchname) {
						plus.webview.getWebviewById(wvs[i].id).close('none');
					}
				}
				mui.toast(data.content.msg);
				logout();
			}
		}
	}

	checkreadyState = setInterval(function() {
		if (plus.storage.getItem("user_login")) {
			if (Socket.readyState == 3 && appstatus == 'resume') {
				Socket = '';
				clearInterval(checkreadyState);
				starSocket();
			}
		}
	}, 10000)

}

function imscloseWait() {
	var imchat = plus.webview.getWebviewById('im-chat.html');
	if (imchat) {
		imchat.evalJS('closecssWaiting();')
	}
}

var senddingtype = 'msg';

function send_msg(sendtype) {
	var tid = Socket_Data.tid;
	var msg = Socket_Data.msg
	senddingtype = sendtype;
	Socket.send(JSON.stringify({
		msg_type: 'msg',
		nickname: Socket_Data.nickname,
		sessid: Socket_Data.sessid,
		token: Socket_Data.token,
		time: Socket_Data.time,
		message: Socket_Data.message,
		msg: {
			'type': senddingtype,
			'text': msg
		},
		tid: tid,
	}));

	if (senddingtype == 'image') {
		msg = '[ 图片 ]';
	}

	if (senddingtype == 'sound') {
		msg = '[ 语音 ]';
	}

	var nowtime = (new Date().getTime()) / 1000;
	var set_msg = msg.replace(/<br\s*\/?>/gi, "\r\n");

	if (senddingtype == 'msg' && set_msg.length > 2) {
		$.each(facebook, function(f_i,f_v) {
			var f = '[' + f_i + ']';
			while (set_msg.indexOf(f) > -1) {
				set_msg = set_msg.replace(f, '<i class="faceico" style="background-image:url(img/emoji/' + f_v + '.png)"></i>');
			}
		})
	}

	if ($('.findlist li[uid="' + tid + '"]').html()) {
		var objdom = $('.findlist li[uid="' + tid + '"]');
		objdom.find('h1').attr('lmtime', nowtime);
		objdom.find('p').html(set_msg);
		objdom.remove();
		$('.findlist').prepend(objdom);
		newlist(tid);
	} else {
		var li = '';
		if (msg_user_list[tid]) {

			v = msg_user_list[tid].user_info;
			var nickname = v.nickname || v.username || 'unknow';

			var avatar = "img/my-head.png";
			if (v.avatar != '') {
				avatar = ajaxlinkhead + v.avatar;
			} else if (v.headimgurl != '') {
				avatar = v.headimgurl;
			}

			li = '<li class="mui-table-view-cell" uid="' + tid +
				'"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><i class="newmsg"></i><img src="' +
				avatar + '" onerror="nofind()" /><h1 lmtime="' + nowtime + '">' + nickname + '</h1><p>' + set_msg +
				'</p></div></li>';

			$('.findlist').prepend(li);
			newlist(tid);

			if (nickname == 'unknow') {
				get_userinfo(tid);
			}

		} else {

			li = '<li class="mui-table-view-cell" uid="' + tid +
				'"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><i class="newmsg"></i><img src="img/my-head.png" onerror="nofind()" /><h1 lmtime="' +
				nowtime + '">-</h1><p>' + set_msg + '</p></div></li>';

			$('.findlist').prepend(li);
			newlist(tid);

			get_userinfo(tid);
		}

		$('#findbox .isempty').eq(0).hide();
	}

	timereset();

	Socket_Data.message = '';
}

function newlist(stid) {
	var set = new Set(msg_user_list_sort);
	var newArr = Array.from(set);

	$.each(newArr, function(i, v) {
		if (v == stid) {
			newArr.splice(i, 1);
		};
	});

	var newarr = [stid];
	msg_user_list_sort = newarr.concat(newArr);
	plus.storage.setItem('msg_user_list_sort_' + plus.storage.getItem('user_uid'), JSON.stringify(msg_user_list_sort));
	plus.storage.setItem('msg_user_list_' + plus.storage.getItem('user_uid'), JSON.stringify(msg_user_list));

}

function change_nickname() {
	if (Socket.readyState != 1) {
		return
	}
	$('#notready').hide();
	$('#connecting').show();
	Socket.send(JSON.stringify({
		msg_type: 'update_clients',
		sessid: Socket_Data.sessid,
		token: Socket_Data.token,
		time: Socket_Data.time,
		nickname: Socket_Data.nickname
	}));
}

function get_userinfo(fid) {
	var useridarr = new Array;
	useridarr.push(fid);
	Socket.send(JSON.stringify({
		msg_type: 'update',
		sessid: Socket_Data.sessid,
		token: Socket_Data.token,
		time: Socket_Data.time,
		userid: useridarr
	}));
}

function logout() {

	var ajaxlinkhead = localStorage.getItem('ajaxlinkhead');
	var uac = plus.storage.getItem('user_account');
	$.post(ajaxlinkhead + '/logout.html', {
		is_ajax: 1
	}, function(data) {}, 'json').fail(function() {});

	//要移除的数据
	var removeItemnamearr = ['user_birthday', 'user_signature', 'user_headimg', 'user_weight', 'user_login',
		'user_password', 'user_mobile', 'user_pos_city', 'user_uid', 'user_nickname', 'user_name', 'user_sex', 'user_email',
		'user_height', 'user_pos_province', 'user_qq', 'sessid', 'chatready'
	];

	$.each(removeItemnamearr, function(i, v) {
		plus.storage.removeItem(v);
	});

	plus.navigator.removeAllCookie();
	localStorage.setItem('user_account', uac);
	localStorage.setItem('ajaxlinkhead', ajaxlinkhead);

	//重载用户资料
	checklogin();
	resetstatus();
	mui.openWindow({
		url: 'login.html?act=login',
		id: 'login.html',
		styles: {
			top: 0,
			bottom: 0
		}
	});

}

mui('body').on('tap', '#notready', function(e) {
	change_nickname();
});
