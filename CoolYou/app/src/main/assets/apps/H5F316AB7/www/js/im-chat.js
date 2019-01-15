var footer_bb=0;
if (o_bodyheight == 812) {
	footer_bb=25;
	$('footer').css({
		'height':(footer_bb+50)+'px',
		'border-bottom': footer_bb+'px solid #e3e8eb'
	});
	$('#face-box').addClass('inX');
	$('.mui-content').css('padding-top',(Number($('.mui-content').css('padding-top').replace('px', ''))+10)+'px');
	$('.mui-content').css('padding-bottom',(Number($('.mui-content').css('padding-bottom').replace('px', ''))+footer_bb)+'px');
	
}

//表情功能 -- start

var faceboxheight = 170;
$('#centercover').width($('.footer-center').width());
$('#centercover').hide();

$('#face-box').height(faceboxheight)
mui('.indexslider-small').slider({
	interval: 4000
});

var faceready = 0;
function face_open() {

	var footer_h = Number($('footer').css('height').replace('px', ''));

	$('#msg-text').blur();
	$('#msg-face,.footer-left.btnMsgsend').hide();
	
	if (!mui.os.ios&&faceready == 0) {
		$('#face-box').css('opacity',0);
	}
	
	$('.footer-left .msg-keyboard').css('display', 'block');
	$('#face-box,#centercover').show();

	$('.mui-content').css('padding-bottom', (faceboxheight + footer_h) + 'px');
	
	$('footer').css({
		'bottom': (faceboxheight + footer_bb) + 'px',
		'border':'none',
		'height':(footer_h-footer_bb)+'px'
	});

	$('.footer-right .msg-keyboard').hide();
	$('#msg-type').show();
	
	ui.boxMsgSound.style.display = 'none';
	ui.boxMsgText.style.display = 'block';

	if (faceready == 0) {
		faceready = 1;

		var face_item_width = $('.mui-slider-item').width();
		var face_item_height = $('.mui-slider-item').height();

		$('.mui-slider-item').append('<i class="face"></i>');
		var face_icon_width = $('.mui-slider-item .face').width();
		var face_icon_height = $('.mui-slider-item .face').height();

		$('.mui-slider-item .face').remove();
		var face_num_max = ((face_item_width / face_icon_width).toFixed()) * ((face_item_height / face_icon_height).toFixed()) -
			5;
		var face_item_length = 0;
		var count = 0;
		$.each(facebook, function(i, v) {
			count++;
			$('#face-box .mui-slider-item').eq(face_item_length).find('.face_del').before('<i class="face" facename="[' + i +
				']" style="background-image: url(img/emoji/' + v + '.png);"></i>');
			if (count == face_num_max) {
				face_num_max += face_num_max;
				face_item_length++;
				$('#face-box .mui-slider-group').append('<div class="mui-slider-item"><i class="face_del"></i></div>');
				$('#face-box .mui-slider-indicator').append('<div class="mui-indicator"></div>');
			}

		});
		
		setTimeout(()=>{
			$('#face-box').css('opacity',1);
		},200)
		
	}

	scrolltoend();

}

function face_close() {

	var footer_h = Number($('footer').css('height').replace('px', ''));

	$('.mui-content').css('padding-bottom', footer_h + 'px');
	$('footer').css({
		'height': footer_h + 'px',
		'border-bottom': footer_bb + 'px solid #e3e8eb',
		'bottom':'0px',
	});
	
	$('#face-box,.footer-left .msg-keyboard,#centercover').hide();
	$('#msg-face').show();
	
	if(mui.os.ios){
		moveEnd($('#msg-text')[0]);
		scrolltoend();	
	}else{
		setTimeout(()=>{
			moveEnd($('#msg-text')[0]);
			scrolltoend();		
		},50)		
	}

}

mui('body').on('tap', '#msg-face', function() {
	face_open();
});

mui('body').on('tap', '.footer-left .msg-keyboard,#centercover', function() {
	face_close()
});

mui('body').on('tap', '.face', function() {
	$('#msg-text').val($('#msg-text').val() + $(this).attr('facename'));
	resetfooter();
});

function resetfooter() {

	var footerPadding = Number($('.footer-center').css('padding-top').replace('px', '')) + Number($('.footer-center').css(
		'padding-bottom').replace('px', ''));
	ui.h.innerText = ui.boxMsgText.value.replace(new RegExp('\n', 'gm'), '\n-') || '-';

	var newheight = (ui.h.offsetHeight + footerPadding);
	if (newheight <= 105) {
		ui.footer.style.height = newheight + 'px';
	}

	var footer_h = Number($('footer').css('height').replace('px', ''));
	if($('#face-box').is(':visible')){
		$('.mui-content').css('padding-bottom', (faceboxheight+footer_h+footer_bb) + 'px');
	}else{
		$('.mui-content').css('padding-bottom', (footer_h + footer_bb)+'px');
	}
	
}

mui('body').on('tap', '.face_del', function() {
	var msgval = ui.boxMsgText.value;
	face_del(msgval)
});

//删除键
$(document).keyup(function(event){
	if(event.keyCode ==8){
		var msgval = ui.boxMsgText.value;
		msgval=msgval+']';
		face_del(msgval)
	}
});

function face_del(msgval){
	mlength = msgval.length;
	var last_r = msgval.lastIndexOf(']') + 1;
	var last_l = msgval.lastIndexOf('[');

	if (msgval.length > 2 && mlength == last_r && last_l != -1) {

		var getfaceval = msgval.substr(last_l, last_r);
		getfaceval = getfaceval.replace('[', '');
		getfaceval = getfaceval.replace(']', '');
		if (getfaceval.length > 0 && facebook[getfaceval]) {
			ui.boxMsgText.value = msgval.substr(0, last_l);
		} else {
			ui.boxMsgText.value = msgval.substr(0, msgval.length - 1);
		}

	} else {
		ui.boxMsgText.value = msgval.substr(0, msgval.length - 1);
	}
	
	resetfooter();

}

function moveEnd(obj) {
	obj.focus();
	var len = obj.value.length;
	if (document.selection) {
		var sel = obj.createTextRange();
		sel.moveStart('character', len); //设置开头的位置
		sel.collapse();
		sel.select();
	} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
		obj.selectionStart = obj.selectionEnd = len;
	}
}

//表情功能 -- end 

var filelinkhead = 'https://' + localStorage.getItem('chatlinkhead') + ':8800/';
mui('.mui-scroll-wrapper').scroll({
	indicators: false,
	bounce: true,
	deceleration: 0.002
});

var MIN_SOUND_TIME = 800;
var MAX_SOUND_TIME = 60000;
mui.init({
	gestureConfig: {
		tap: true, //默认为true
		doubletap: true, //默认为false
		longtap: true, //默认为false
		swipe: true, //默认为true
		drag: true, //默认为true
		hold: true, //默认为false，不监听
		release: true //默认为false，不监听
	}
});

mui('body').on('tap', '#headback', function(e) {
	$('input,textarea').blur();
	//	var inpage=plus.webview.getWebviewById('resetdata.html');
	//	if(inpage){
	//		inpage.close('none');
	//	}
	$('.mitem-more').fadeOut('fast');
	plus.webview.currentWebview().close('slide-out-right', 200);
})

var ui = {
	body: document.querySelector('body'),
	footer: document.querySelector('footer'),
	footerRight: document.querySelector('.footer-right'),
	footerLeft: document.querySelector('.btnMsgImage'),
	btnMsgType: document.querySelector('#msg-type'),
	boxMsgText: document.querySelector('#msg-text'),
	boxMsgSound: document.querySelector('#msg-sound'),
	btnMsgImage: document.querySelector('#msg-image'),
	areaMsgList: document.querySelector('#msg-list'),
	boxSoundAlert: document.querySelector('#sound-alert'),
	h: document.querySelector('#h'),
	content: document.querySelector('.mui-content')
};

var imageViewer = new mui.ImageViewer('.msg-content-image', {
	dbl: false
});

var msgItemnum = 0;
mui('body').on('tap', '.msg-content', function(e) {
	$('.mitem-more').fadeOut('fast');

	var msgItem = $(this).parent();

	msgItem.attr('id', 'msgItem' + msgItemnum);
	var msgType = msgItem.attr('msg-type');
	var msgContent = msgItem.attr('msg-content');

	msgItem = $(this).find('.play-state');

	msgItemnum++;
	if (msgType == 'sound') {
		var relativePath = msgContent;
		relativePath = '_downloads/' + relativePath.substr(relativePath.lastIndexOf('/') + 1);
		plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
			playsound(relativePath, msgItem);
		}, function(e) {
			createDownload(msgContent, msgItem, 'sound');
		});
	}
});

var player = '';
var playState = '';
var playerList={}

function playsound(Path, Item) {
	var volume = Item.siblings('.volume');
	if (player != '') {
		player.stop();
		volume.removeClass('talking');
		player = null;
	}

	player = plus.audio.createPlayer(Path);
	volume.addClass('talking');
	player.play(function() {
		volume.removeClass('talking');
	}, function(e) {
		volume.removeClass('talking');
		mui.toast('播放失败:' + e.message);
	});
}

function createDownload(micurl, item, ctype) {
	var dtask = plus.downloader.createDownload(micurl, {}, function(d, status) {
		// 下载完成
		if (status == 200) {
			switch(ctype){
				case 'sound':
					var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
					getduration(sd_path,micurl);
					break;
				case 'image':
					var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
					item.attr('src', sd_path);
					break;
				case 'imagenew':
					var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
					$(item).attr('src', sd_path);
					break;
			}
		} else {
			switch(ctype){
				case 'sound':
					mui.toast('录音下载失败:' + status);
					break;
				case 'image':
					mui.toast('图像下载失败:' + status);
					break;
				case 'imagenew':
					mui.toast('图像下载失败:' + status);
					break;
			}
			console.log("Download failed: " + status);
			console.log('下载失败:' + status);
		}
	});
	dtask.start();
}

var newimgnum = 0;

function addnew(m, addtype) {
	//{"sender":"self","type":"msg","content":"那你","headimg":"https://qj.kkg222.com/uploads/avatar/000/00/00/53/avatar_middle.png"}
	var sender = '';
	var content = '';
	var contenttype = '';
	if (m.sender == 'self') {
		sender = 'msg-item-self';
		m.headimg = plus.storage.getItem("user_headimg");
	}
	if (m.type == 'msg') {
		content = m.content;

		if (content.length > 2) {
			$.each(facebook, function(f_i,f_v) {
				var f = '[' + f_i + ']';
				while (content.indexOf(f) > -1) {
					content = content.replace(f, '<i class="faceico" style="background-image:url(img/emoji/' + f_v + '.png)"></i>');
				}
			})
		}
	}
	if (m.type == 'image') {
		contenttype = 'content-img';

		var thisdom = '.msg-content-image[newimgnum="' + newimgnum + '"]';
		var imgsrc = 'img/nochatimg.jpg';
		var msgContent = m.content;
		var relativePath = msgContent;
		relativePath = '_downloads/' + relativePath.substr(relativePath.lastIndexOf('/') + 1);
		plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
			imgsrc = plus.io.convertLocalFileSystemURL(relativePath);
			$(thisdom) && $(thisdom).attr('src', imgsrc);
		}, function(e) {
			createDownload(msgContent, thisdom, 'imagenew');
		});

		content = '<img class="msg-content-image" newimgnum="' + newimgnum + '"  onerror="nofind()" src="' + imgsrc + '" />';
		newimgnum++;
	}
	if (m.type == 'sound') {
		content = ' <span class="volume"></span> &nbsp; <span class="play-state"> <span class="mui-icon mui-icon-spinner-cycle rotation"></span> </span>&nbsp;';

		var relativePath = m.content;
		relativePath = '_downloads/' + relativePath.substr(relativePath.lastIndexOf('/') + 1);
		plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
			var audioSrc = plus.io.convertLocalFileSystemURL(relativePath);
			getduration(audioSrc,m.content);
		}, function(e) {
			createDownload(m.content,'', 'sound');
		});
	}

	var newmsg = '<div class="msg-item ' + sender + '" msg-time="' + m.time + '"  msg-sender="' + m.sender +
		'" msg-type="' + m.type + '" msg-content="' + m.content + '"><img class="msg-user" src="' + m.headimg +
		'" alt="" /><div class="msg-content ' + contenttype + '"><div class="msg-content-inner">' + content +
		'</div><div class="msg-content-arrow"></div></div><div class="mui-item-clear"></div></div>';

	if (addtype == 'new') {
		if (plus.navigator.checkPermission("RECORD") == 'denied' && m.type == 'sound') {
			return
		}
		$('#msg-list').append(newmsg);
	} else {
		$('#msg-list').prepend(newmsg);
		var NmsglistH = document.querySelector('#msg-list').offsetHeight;
		NmsglistH = OmsglistH - NmsglistH;
		mui('#scroll1').scroll().scrollTo(0, NmsglistH, 0);
	}

	if (m.type == 'image') {
		imageViewer.findAllImage();
	}

	if (addtype == 'new') {
		scrolltoend(200);
	}

	closecssWaiting();
}

//获取音频时长
function getduration(audioSrc,mark){

	var newAudio=document.createElement('audio');
	newAudio.src=audioSrc;
	var wtime=setInterval(function (){
		var A_duration=newAudio.duration.toFixed(1);
		if(A_duration!='NaN'){
			clearInterval(wtime);
			$('.msg-item[msg-type="sound"][msg-content="'+mark+'"] .play-state').text(A_duration+'"');
		}
	},400);
}

var Launch;
var tid = '';
var msg_data_list;
var user_headimg;
var t_headimg;
var shownerbymax = 0;
var shownerbymin = 0;
var canloded = 0;
var lodednum = 20;

function gdata(json) {
	canloded = 0;
	tid = json.tid;
	Launch.evalJS('Socket_Data.tid="' + tid + '";closecssWaiting();');
	t_headimg = json.avatar;
	$('.defaulthead h1').empty();
	$('.defaulthead h1').html('<span class="mui-icon mui-icon-spinner-cycle rotation"></span>');
	$('.msg-text').val('');
	msg_data_list = plus.storage.getItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + tid);

	if (msg_data_list) {
		msg_data_list = JSON.parse(msg_data_list);

		if (msg_data_list != "") {
			shownerbymax = msg_data_list.length - 1;
			shownerbymin = msg_data_list.length - 1 - lodednum;
			if (shownerbymin < 0) {
				shownerbymin = 0;
			}

			for (var i = shownerbymin; i <= shownerbymax; i++) {
				if (msg_data_list[i].sender != 'self') {
					msg_data_list[i].headimg = t_headimg;
				} else {
					msg_data_list[i].headimg = plus.storage.getItem("user_headimg");
				}
			}

			gethistoryMsg();
			imageViewer.findAllImage();
			scrolltoend();
			scrolllistener();
			plus.webview.currentWebview().show('slide-in-right');
		}
	} else {
		plus.webview.currentWebview().show('fade-in', 200);
	}
	//	console.log(json.signature);
}


function getmsg(type, text, gtime, gtid) {
	var sender = tid;
	if (gtid) {
		if (gtid != tid) {
			return
		} else {
			sender = 'self';
		}
	}
	var msg_data = {
		headimg: t_headimg,
		sender: sender,
		type: type,
		content: text,
		time: gtime
	}
	addnew(msg_data, 'new');
}

var OmsglistH = 0;
var getting = 0;

function gethistoryMsg() {

	if (getting == 1) {
		return
	}
	getting = 1;
	showcssWaiting()

	var newarr = [];

	for (var i = shownerbymin; i <= shownerbymax; i++) {
		if (msg_data_list[i].sender != 'self') {
			msg_data_list[i].headimg = t_headimg;
		} else {
			msg_data_list[i].headimg = plus.storage.getItem("user_headimg");
		}
		newarr.push(msg_data_list[i]);
	}
	OmsglistH = document.querySelector('#msg-list').offsetHeight;

	newarr = newarr.reverse();

	$.each(newarr, function(i, v) {
		addnew(v, 'old');
	})

	setTimeout(function() {
		if (shownerbymin != 0) {
			getting = 0;
		}

		closecssWaiting();
	}, 500)

	shownerbymax = shownerbymin - 1;
	shownerbymin = shownerbymin - 1 - lodednum;
	if (shownerbymin < 0) {
		shownerbymin = 0;
		//mui.toast('已无更多历史消息')
	}

}

function scrolltoend(speed) {
	var msglistH = $('#scroll1').height() - document.querySelector('#msg-list').offsetHeight;
	mui('#scroll1').scroll().reLayout();
	mui('#scroll1').scroll().scrollTo(0, msglistH, speed || 0);
}

var loadfirst = 0;

function scrolllistener() {
	document.getElementById('scroll1').addEventListener('scroll', function(e) {
		if (e.detail.y > -70) {
			if (shownerbymin > 0) {
				loadfirst = 1;
			}
		};
		if ($('.coglist').is(':visible')) {
			$('.coglist').fadeOut();
		};
		$('.mitem-more').fadeOut('fast');
	});
	document.getElementById('scroll1').addEventListener('scrollend', function(e) {
		if (loadfirst == 1) {
			gethistoryMsg();
			loadfirst = 0;
		}
	});
}

var recordcheck = '';
mui.plusReady(function() {

	var oldsessid = plus.storage.getItem("sessid");
	if (oldsessid) {
		plus.navigator.setCookie(filelinkhead, oldsessid);
	}

	setTimeout(function() {
		recordcheck = plus.navigator.checkPermission("RECORD");

		if (recordcheck != 'authorized') {
			var r = plus.audio.getRecorder();
			r.record({
				filename: "_doc/audio/"
			}, function() {}, function(e) {});
			setTimeout(function() {
				r.stop()
			}, 200);
		}

	}, 500)

	user_headimg = plus.storage.getItem("user_headimg");
	Launch = plus.webview.getLaunchWebview();

	template.config('escape', false);

	if (mui.os.ios) {
		// 解决在ios上fixed元素focusin时位置出现错误的问题 
		document.addEventListener('DOMContentLoaded', function() {
			var footerDom = document.querySelector('footer');

			document.addEventListener('focusin', function() {
				footerDom.style.position = 'absolute';
			});
			document.addEventListener('focusout', function() {
				footerDom.style.position = 'fixed';
			});
		});
	}

	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize"
	});

	var showKeyboard = function() {
		if (mui.os.ios) {
			var webView = plus.webview.currentWebview().nativeInstanceObject();
			webView.plusCallMethod({
				"setKeyboardDisplayRequiresUserAction": false
			});
		} else {
			var Context = plus.android.importClass("android.content.Context");
			var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			var main = plus.android.runtimeMainActivity();
			var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
			imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
			//var view = ((ViewGroup)main.findViewById(android.R.id.content)).getChildAt(0);
			imm.showSoftInput(main.getWindow().getDecorView(), InputMethodManager.SHOW_IMPLICIT);
		}
	};

	//	var record = [{
	//		sender: 'self',
	//		type: 'text',
	//		content: 'Hi，我是 旅行小管家！'
	//	}];

	ui.h.style.width = ui.boxMsgText.offsetWidth + 'px';
	//alert(ui.boxMsgText.offsetWidth );
	var footerPadding = Number($('.footer-center').css('padding-top').replace('px', '')) + Number($('.footer-center').css(
		'padding-bottom').replace('px', ''));

	window.addEventListener('resize', function() {
		if(o_bodyheight==812){
			if($(window).height()<812){
				ui.footer.style.height=(ui.footer.offsetHeight-footer_bb)+'px';
				$('footer').css('border','none');
			}else{
				ui.footer.style.height=(ui.footer.offsetHeight+footer_bb)+'px';
				$('footer').css({'border-bottom':footer_bb+'px solid #e3e8eb'});
			}
		}
		scrolltoend();
	}, false);

	// 	var toRobot = function(info) {
	// 		var apiUrl = 'http://www.tuling123.com/openapi/api';
	// 		mui.getJSON(apiUrl, {
	// 			"key": 'acfbca724ea1b5db96d2eef88ce677dc',
	// 			"info": info,
	// 			"userid": plus.device.uuid
	// 		}, function(data) {
	// 			//alert(JSON.stringify(data));
	// 			record.push({
	// 				sender: 'zs',
	// 				type: 'msg',
	// 				content: data.text
	// 			});
	// 
	// 		});
	// 	};

	function msgTextFocus() {
		ui.boxMsgText.focus();
		setTimeout(function() {
			ui.boxMsgText.focus();
		}, 150);
	}

	//解决长按“发送”按钮，导致键盘关闭的问题；
	ui.footerRight.addEventListener('touchstart', function(event) {
		if (ui.btnMsgType.classList.contains('mui-icon-paperplane')) {
			msgTextFocus();
			event.preventDefault();
		}
	});

	//解决长按“发送”按钮，导致键盘关闭的问题；
	ui.footerRight.addEventListener('touchmove', function(event) {
		if (ui.btnMsgType.classList.contains('mui-icon-paperplane')) {
			msgTextFocus();
			event.preventDefault();
		}
	});

	//					ui.footerRight.addEventListener('touchcancel', function(event) {
	//						if (ui.btnMsgType.classList.contains('mui-icon-paperplane')) {
	//							msgTextFocus();
	//							event.preventDefault();
	//						}
	//					});
	//					ui.footerRight.addEventListener('touchend', function(event) {
	//						if (ui.btnMsgType.classList.contains('mui-icon-paperplane')) {
	//							msgTextFocus();
	//							event.preventDefault();
	//						}
	//					});

	mui('body').on('tap', '.btnMsgsend', function(e) {
		
		$('.mitem-more').fadeOut('fast');

		if (plus.storage.getItem('chatready') != '1') {
			mui.toast('正在连接服务器');
			Launch.evalJS('checklogin();change_nickname();');
			return
		}

		var finalval = ui.boxMsgText.value;
		finalval = finalval.replace(new RegExp('\n', 'gm'), '');
		finalval = finalval.replace(new RegExp('\r\n', 'gm'), '');
		finalval = $.trim(finalval);

		if (finalval.length > 0) {
			//showKeyboard();

			if ($('.footer-left #msg-face').is(':visible')) {
				ui.boxMsgText.focus();
				setTimeout(function() {
					ui.boxMsgText.focus();
				}, 150);
				//event.detail.gesture.preventDefault();
			}

			var msgval = ui.boxMsgText.value.replace(new RegExp('\n', 'gm'), '<br/>');

			send({
				sender: 'self',
				type: 'msg',
				content: msgval,
				headimg: user_headimg
			});

			ui.boxMsgText.value = '';

			mui.trigger(ui.boxMsgText, 'input', null);

			if ($('.footer-left .msg-keyboard').is(':visible')) {
				resetfooter()
			}
			
            
			showcssWaiting();
			Launch.evalJS('Socket_Data.msg="' + msgval + '";send_msg("msg");');
		} else {
			mui.toast('发送的内容不能为空')
		}

	});

	mui('body').on('tap', '#msg-type', function() {
		face_close()
		$('#msg-type').hide();
		$('.footer-right .msg-keyboard').css('display', 'block');
		ui.boxMsgText.style.display = 'none';
		ui.boxMsgSound.style.display = 'block';
		ui.boxMsgText.blur();
		document.body.focus();
	});

	mui('body').on('tap', '.footer-right .msg-keyboard', function() {
		$('.footer-right .msg-keyboard').hide();
		$('#msg-type').show();
		ui.boxMsgSound.style.display = 'none';
		ui.boxMsgText.style.display = 'block';
		ui.boxMsgText.focus();
		setTimeout(function() {
			ui.boxMsgText.focus();
		}, 150);
	});

	//	ui.footerRight.addEventListener('release', function(event) {
	//		
	//	}, false);

	mui('body').on('tap','.btnMsgImage',function(){
		if($('#face-box').is(':visible')){
			face_close();
		}
		$('textarea').blur();
		$('.mitem-more').hide();
		$('.coverbox,.other').show();
	});

	var setSoundAlertVisable = function(show) {
		if (show) {
			ui.boxSoundAlert.style.display = 'block';
			ui.boxSoundAlert.style.opacity = 1;
		} else {
			ui.boxSoundAlert.style.opacity = 0;
			//fadeOut 完成再真正隐藏
			setTimeout(function() {
				ui.boxSoundAlert.style.display = 'none';
			}, 200);
		}
	};

	var recordCancel = false;
	var recorder = null;
	var audio_tips = document.getElementById("audio_tips");
	var startTimestamp = null;
	var stopTimestamp = null;
	var stopTimer = null;

	ui.boxMsgSound.addEventListener('hold', function(event) {

		if (recordcheck == 'denied') {
			mui.toast('当前无录音权限');
			return
		}

		recordCancel = false;
		if (stopTimer) clearTimeout(stopTimer);
		audio_tips.innerHTML = "手指上划，取消发送";

		ui.boxSoundAlert.classList.remove('rprogress-sigh');
		setSoundAlertVisable(true);
		recorder = plus.audio.getRecorder();

		if (recorder == null) {
			plus.nativeUI.toast("不能获取录音对象");
			return;
		}
		startTimestamp = (new Date()).getTime();
		recorder.record({
			filename: "_doc/audio/",
			format:'mp3'
		}, function(path) {
			if (recordCancel) return;
			uploadfile(path, 'sound');
		}, function(e) {
			plus.nativeUI.toast("录音时出现异常: " + e.message);
		});

	}, false);

	ui.body.addEventListener('drag', function(event) {
		//console.log('drag');
		if (Math.abs(event.detail.deltaY) > 50) {
			if (!recordCancel) {
				recordCancel = true;
				if (!audio_tips.classList.contains("cancel")) {
					audio_tips.classList.add("cancel");
				}
				audio_tips.innerHTML = "松开手指，取消发送";
			}
		} else {
			if (recordCancel) {
				recordCancel = false;
				if (audio_tips.classList.contains("cancel")) {
					audio_tips.classList.remove("cancel");
				}
				audio_tips.innerHTML = "手指上划，取消发送";
			}
		}
	}, false);

	ui.boxMsgSound.addEventListener('release', function(event) {
		//console.log('release');
		if (recordcheck == 'denied') {
			return
		}
		if (audio_tips.classList.contains("cancel")) {
			audio_tips.classList.remove("cancel");
			audio_tips.innerHTML = "手指上划，取消发送";
		}
		//
		stopTimestamp = (new Date()).getTime();
		if (stopTimestamp - startTimestamp < MIN_SOUND_TIME) {
			audio_tips.innerHTML = "录音时间太短";
			ui.boxSoundAlert.classList.add('rprogress-sigh');
			recordCancel = true;
			stopTimer = setTimeout(function() {
				setSoundAlertVisable(false);
			}, 800);
		} else if (stopTimestamp - startTimestamp > MAX_SOUND_TIME){
			audio_tips.innerHTML = "录音时间不能超过60秒";
			ui.boxSoundAlert.classList.add('rprogress-sigh');
			recordCancel = true;
			stopTimer = setTimeout(function() {
				setSoundAlertVisable(false);
			}, 800);
		} else {
			setSoundAlertVisable(false);
		}
		recorder.stop();
	}, false);

	ui.boxMsgSound.addEventListener("touchstart", function(e) {
		//console.log("start....");
		e.preventDefault();
	});

	ui.boxMsgText.addEventListener('input', function(event) {
		if (ui.boxMsgText.value == '') {
			$('.footer-left.btnMsgsend').hide();
		} else {
			$('.footer-left.btnMsgsend').show();
		}
		//ui.btnMsgType.classList[ui.boxMsgText.value == '' ? 'remove' : 'add']('mui-icon-paperplane');

		ui.btnMsgType.setAttribute("for", ui.boxMsgText.value == '' ? '' : 'msg-text');
		ui.h.innerText = ui.boxMsgText.value.replace(new RegExp('\n', 'gm'), '\n-') || '-';
		
		var newheight = (ui.h.offsetHeight + footerPadding);
		if (newheight <= 105) {
			ui.footer.style.height = newheight + 'px';
			ui.content.style.paddingBottom = ui.footer.style.height;
		}

	});

	var focus = false;

	ui.boxMsgText.addEventListener('tap', function(event) {
		$('.mitem-more').fadeOut('fast');
		ui.boxMsgText.focus();
		setTimeout(function() {
			ui.boxMsgText.focus();
		}, 0);
		focus = true;
		setTimeout(function() {
			focus = false;
		}, 1000);
		event.detail.gesture.preventDefault();
	}, false);

	//点击消息列表，关闭键盘
	mui('body').on('tap', '#msg-list', function() {
		$('.mitem-more').fadeOut('fast');

		if (!focus) {
			ui.boxMsgText.blur();
		}
		if ($('#msg-face').is(':visible') == false) {

			var footer_h = Number($('footer').css('height').replace('px', ''));

			var msglistH = $('#scroll1').height() - document.querySelector('#msg-list').offsetHeight;
			var oldy = mui('#scroll1').scroll().y;
			msglistH += faceboxheight + footer_bb;

			$('#face-box,.footer-left .msg-keyboard,#centercover').hide();
			$('#msg-face').show();

			$('.mui-content').css('padding-bottom', footer_h + 'px');

			$('footer').css({
				'height': (footer_h+footer_bb) + 'px',
				'border-bottom': footer_bb+'px solid #e3e8eb',
				'bottom':0
			});

			if (msglistH > oldy) {
				scrolltoend()
			}
		}
	});

});

mui('body').on('tap', '.coverbox,.other .bottom i', function(e) {
	$('.coverbox').fadeOut('fast');
	$('.other').fadeOut('fast');
});

mui('body').on('tap', '#other-ph', function(e) {
	plus.gallery.pick(function(path) {
		checksizeanup(path);
	}, function(err) {}, null);
	$('.coverbox').fadeOut('fast');
	$('.other').fadeOut('fast');
});

mui('body').on('tap', '#other-cam', function(e) {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(path) {
		checksizeanup("file://" + plus.io.convertLocalFileSystemURL(path));
	}, function(err) {});
	$('.coverbox').fadeOut('fast');
	$('.other').fadeOut('fast');
});

var send = function(msg) {
	showcssWaiting();
	//	addnew(msg,'new');
	//	if(msg.type=='image'){
	//		$('.msg-content-image[src="'+msg.content+'"]').attr('onload','scrolltoend()');
	//	}
	//toRobot(msg.content);
};

mui('body').on('tap', '.msg-user-img', function(e) {
	showcssWaiting();
	var olddetail = plus.webview.getWebviewById('expertdetail.html');
	if (olddetail) {
		olddetail.close('none')
	};
	var open_url = 'expertdetail.html?uid=' + tid + '&hsrc=' + $(this).attr('src');
	var expertdetail = plus.webview.create(open_url, 'expertdetail.html', {
		top: 0,
		bottom: 0
	});
	expertdetail.addEventListener('close', function() {
		setbcolor('dark');
	})
})

mui('body').on('tap', '#headact', function(e) {
	if ($('.coglist').is(':hidden')) {
		$('.coglist').fadeIn('fast');
	} else {
		$('.coglist').fadeOut('fast');
	}
});

mui('body').on('tap', '#clearlist', function(e) {
	$('.coglist').fadeOut('fast');
	plus.nativeUI.confirm("确定要清除历史消息吗？", function(e) {
		if (e.index == 0) {
			plus.storage.removeItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + tid);
			msg_data_list = {};
			shownerbymax = 0;
			shownerbymin = 0;
			$('#msg-list').empty();
			scrolllistener();
			Launch.evalJS('msg_history_clear("' + tid + '")');
		}
	});
});

mui('body').on('tap', '#more', function(e) {
	$('.coglist').fadeOut('fast');
});

function checksizeanup(path) {
	plus.io.resolveLocalFileSystemURL(path, function(entry) {
		entry.file(function(file) {
			var fz = file.size / 1024;
			fz = fz / 1024;
			if (fz >= 1) {
				compressImage(path, 1000);
			} else {
				//上传图片
				uploadfile(path, 'image');
			}
		});
	}, function(e) {
		mui.toast("读取拍照文件错误：" + e.message);
	});
}

// 压缩图片
function compressImage(csrc, widthnum) {
	showcssWaiting();

	var randomx = Math.floor(Math.random() * 10000000000);
	var coption = {
		'src': csrc,
		'dst': "_doc/cm" + randomx + ".jpg",
		'quality': 100,
		'overwrite': true,
		'width': widthnum + 'px',
		'overwrite': true,
		'format': 'jpg'
	}

	plus.zip.compressImage(coption, function(i) {
		var newpath = i.target;
		plus.io.resolveLocalFileSystemURL(newpath, function(entry) {
			entry.file(function(file) {
				var fz = file.size / 1024;
				fz = fz / 1024;
				if (fz >= 1) {
					compressImage(newpath, widthnum - 100);
				} else {
					//上传图片
					uploadfile(newpath, 'image');
				}
			});
		}, function(e) {
			plus.nativeUI.toast("Resolve file URL failed: " + e.message);
		});
	}, function(e) {
		closecssWaiting();
		plus.nativeUI.toast("压缩图片失败");
	});
}

function nofind() {
	var img = event.srcElement;
	img.src = "img/nochatimg.jpg";
	img.onerror = null;
}

function b64DecodeUnicode(str) {
	var check=str||'';
	if(check==''){
		mui.toast('语音功能准备中,请重试');
		plus.webview.currentWebview().close('slide-out-right');
		closecssWaiting();
		return false;
	}

	return decodeURIComponent(atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}

//上传
function uploadfile(gpath, uptype) {

	if (uptype == 'sound') {
		var filename = 'attachment';
	}
	showcssWaiting();

	var uploadUrl = filelinkhead;
	var task = plus.uploader.createUpload(uploadUrl, {
		method: "POST"
	}, function(t, status) { //上传完成
		if (status == 200) {
			var map = JSON.parse(t.responseText);

			var dataurl = b64DecodeUnicode(map.token);
			dataurl = filelinkhead + 'download/' + dataurl;
			//console.log(dataurl);
			//if(uptype=='sound'){dataurl = filelinkhead+'download/'+dataurl}else{dataurl = filelinkhead+'download/'+dataurl};

			send({
				sender: 'self',
				type: uptype,
				content: dataurl,
				headimg: user_headimg,
				time: 0
			});

			Launch.evalJS('Socket_Data.msg="' + dataurl + '";send_msg("' + uptype + '");');
			closecssWaiting();
		} else {
			closecssWaiting();
			mui.toast("上传失败：格式不正确 / 大小不得大于两MB");
		}
	});

	//添加其他参数
	task.addData('flash', '1');
	task.addData('fileType', 'service');
	task.addData('filename', filename);
	task.addFile(gpath, {
		key: "file"
	});
	task.start();
}

mui('body').on('tap', '.msg-user', function(e) {
	if ($(this).parent().hasClass('msg-item-self')) {} else {
		showcssWaiting();
		var olddetail = plus.webview.getWebviewById('expertdetail.html');
		if (olddetail) {
			olddetail.close('none')
		};

		var open_url = 'expertdetail.html?uid=' + tid + '&hsrc=';
		var expertdetail = plus.webview.create(open_url, 'expertdetail.html', {
			top: 0,
			bottom: 0
		});

		expertdetail.addEventListener('close', function() {
			setbcolor('dark');
		})

	}
	$('.mitem-more').fadeOut('fast');
});

mui('body').on('longtap', '.msg-content', function(e) {
	var msgtype = $(this).parents('.msg-item').attr('msg-type');
	$('.mitem-more li').show();
	var offsetLeftbase = 127;
	if (msgtype == 'sound' || msgtype == 'image') {
		$('.mitem-more li.copy,.mitem-more li.forward').hide();
		offsetLeftbase = 68;
	}
	$('.msg-item.longtaping').removeClass('longtaping');
	$(this).parents('.msg-item').addClass('longtaping');
	$('.mitem-more').hide();
	var offsetLeft = this.offsetLeft;
	if (this.offsetLeft > $(window).width() - offsetLeftbase - 57) {
		offsetLeft = $(window).width() - offsetLeftbase - 57;
	}
	var offsetTop = this.offsetTop + 40 + mui('.mui-scroll-wrapper').scroll().y;
	$('.mitem-more').css({
		'top': offsetTop + 'px',
		'left': offsetLeft + 'px'
	});
	$('.mitem-more').fadeIn('fast');

});

mui('body').on('tap', '.mitem-more .del', function(e) {
	var nowdata = plus.storage.getItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + tid);
	nowdata = JSON.parse(nowdata);
	var thisdom = $('.msg-item.longtaping');
	var thistime = thisdom.attr('msg-time');
	var thistype = thisdom.attr('msg-type');
	var thissender = thisdom.attr('msg-sender');
	var thiscontent = thisdom.attr('msg-content');
	var findindex = '';
	$.each(nowdata, function(i, v) {
		if (v.time == thistime && v.type == thistype && v.sender == thissender && v.content == thiscontent) {
			findindex = i
		}
	});

	var lastindex = nowdata.length - 1;

	if (findindex == lastindex) {
		var newlastdom = ".findbox .findlist li[uid='" + tid + "'] p";
		var newlastmsg = nowdata[findindex - 1]
		var content = newlastmsg.content;
		if (newlastmsg.type == 'image') {
			content = '[ 图片 ]'
		};
		if (newlastmsg.type == 'sound') {
			content = '[ 语音 ]'
		};
		Launch.evalJS('$("' + newlastdom + '").text("' + content + '");');
	}
	nowdata.splice(findindex, 1);
	nowdata = JSON.stringify(nowdata);
	plus.storage.setItem('msg_data_list_' + plus.storage.getItem('user_uid') + '_' + tid, nowdata);

	$('.msg-item.longtaping').remove();
	$('.mitem-more').fadeOut('fast');
});

mui('body').on('tap', '.mitem-more .forward', function(e) {
	$('.mitem-more').fadeOut('fast');
	mui.toast('功能完善中');
});

mui('body').on('tap', '.mitem-more .more', function(e) {
	$('.mitem-more').fadeOut('fast');
	mui.toast('暂无更多');
});

mui('body').on('tap', '.mitem-more .copy', function(e) {
	plus.device.vibrate(200);
	copyToClip($('.msg-item.longtaping').attr('msg-content'))
	mui.toast('当前文字已复制到剪贴板');
	$('.mitem-more').fadeOut('fast');
});

function copyToClip(stext) {
	plus.nativeUI.toast('当前文字已复制到剪贴板');
	if (plus.os.name != 'iOS') {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", stext);
	} else {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		generalPasteboard.setValueforPasteboardType(stext, "public.utf8-plain-text");
	}
}
