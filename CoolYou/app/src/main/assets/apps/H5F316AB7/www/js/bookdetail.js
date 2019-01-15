var scrolltarget = {};

if (o_bodyheight == 812) {
	$('.menu-bottom').css({
		'padding-bottom': '20px'
	});
	$('.comment_box').css({
		'padding-bottom': '30px'
	});
	$('.chevron').css({
		'bottom': '100px'
	});
}

$(function() {
	//滑动初始化
	$('.mui-scroll-wrapper').css({
		'height': o_bodyheight
	});
	$('.mui-scroll-wrapper .mui-scroll').css({
		'min-height': o_bodyheight + 1
	});
	mui('.mui-scroll-wrapper').scroll({
		indicators: false,
		deceleration: mui.os.ios ? 0.005 : 0.003
	});
	scrolllistener();
})

mui('body').on('tap', '.w-netaddr p', function(e) {
	var thistext = $(this).text();
	if (thistext != '' && thistext != '-') {
		openWeb(thistext)
	}
});

mui('body').on('tap', '.preview li', function(e) {

	$('.now-recommend').hide();
	$('.all-recommend').show();
	$('.previewbox.traffic ul li').show();

	var showtype = $(this).attr('showtype');
	if (showtype == 'hotel') {
		$.each(wordbardata.hotels, function(i, v) {
			if (!v.moredata) {
				$.get(localStorage.getItem('ajaxlinkhead') + "/wordbar/detail-" + v.barid, {
					'is_ajax': 1
				}, function(result) {
					var r = result.info;
					wordbardata.hotels[v.barid].moredata = r;
					setpreview_hotel(wordbardata.hotels[v.barid]);
				});
			}
		});
	}

	if (showtype == 'restaurant') {
		$.each(wordbardata.restaurants, function(i, v) {
			if (!v.moredata) {
				$.get(localStorage.getItem('ajaxlinkhead') + "/wordbar/detail-" + v.barid, {
					'is_ajax': 1
				}, function(result) {
					var r = result.info;
					wordbardata.restaurants[v.barid].moredata = result.info;
					setpreview_restaurant(wordbardata.restaurants[v.barid]);
				});
			}
		});
	}

	$('.previewbox.' + showtype).fadeIn('fast');

	setTimeout(function() {
		$('.previewbox.' + showtype).find('.closepreview').fadeIn()
	}, 200);
	setTimeout(function() {
		$('body').css('overflow-y', 'hidden');
	}, 500);
});

var bookplayDate = '';

function setpreview_hotel(data) {

	var endtime = '';
	var hstart = '';

	if (data.start != 'undefined') {
		hstart = Number(data.start) - 1;
		hstart = hstart * 86400;
		if (data.nights != 'undefined') {
			endtime = Number(data.nights) * 86400 + bookplayDate + hstart;
			endtime = '<b>-</b>' + sbackstr(endtime);
		}
		hstart = hstart + bookplayDate;
		hstart = sbackstr(hstart);
	}

	var b = data.moredata;
	var hotelli = '<li class="hotelli" barid="' + data.barid + '" wtype="hotels"><span class="cover"></span><h2>' + b.title +
		'</h2><h3>' + b.addr + '</h3><span class="date">' + hstart + endtime + '</span></li>';
	$('.previewbox.hotel ul').append(hotelli);

	var readimg = $('.hotelli[barid="' + data.barid + '"] .cover');

	readimg.addClass('img_cache_bg');
	var wsrc = localStorage.getItem('ajaxlinkhead') + b.cover
	let imgname = wsrc.substr(wsrc.lastIndexOf('/') + 1);

	readimg.attr('imgname', imgname);
	img_cache(wsrc, '_bg', imgname);
}

function setpreview_restaurant(data) {
	var eattime = '';
	var setweekstr = '';
	var bday = '';

	if (data.day != undefined) {
		eattime = Number(data.day) - 1;
		eattime = eattime * 86400 + bookplayDate;
		var dateset = new Date();
		dateset.setTime(eattime * 1000);
		eattime = sbackstr(eattime);
		setweekstr = '，' + weekstr[dateset.getDay()];
		bday = 'D' + data.day;
	}

	b = data.moredata;
	var restaurantsli = '<li class="restaurantsli" barid="' + data.barid +
		'" wtype="restaurants"><span class="cover"></span><h2>' + b.title + '</h2><h3>' + b.addr +
		'</h3><span class="date"><b>' + bday + '</b>' + eattime + setweekstr + '</span></li>';

	$('.previewbox.restaurant ul').append(restaurantsli);

	var readimg = $('.restaurantsli[barid="' + data.barid + '"] .cover');
	readimg.addClass('img_cache_bg');
	var wsrc = localStorage.getItem('ajaxlinkhead') + b.cover
	let imgname = wsrc.substr(wsrc.lastIndexOf('/') + 1);

	readimg.attr('imgname', imgname);
	img_cache(wsrc, '_bg', imgname);
}

mui('body').on('tap', '.closepreview', function(e) {
	$(this).hide();
	$('body').css('overflow-y', 'auto');
	$('.previewbox').fadeOut('fast');
});

var commentPid = '';
var gdata = GetRequest();

// 判断扩展API是否准备，否则监听'plusready'事件
if (window.plus) {
	plusReady()
} else {
	document.addEventListener('plusready', plusReady, false)
};


function plusReady() {
	getdetail();
	getGeocode();
	plus.webview.currentWebview().setStyle({
		softinputMode: "adjustResize"
	});
};

mui('body').on('tap', '#headact', function(e) {
	$('input').blur();
	onshare();
});

$(function() {

	if (gdata.tdata) {
		gdata.tdata = JSON.parse(gdata.tdata);
		var avatar = localStorage.getItem('ajaxlinkhead') + gdata.tdata.avatar;
		$('.detaildesc .d-head h1 b').text(gdata.tdata.nickname);
		$('.detaildesc .d-head img').attr({
			'src': avatar
		});
		$('.detaildesc .d-head h1 b,.detaildesc .d-head img').attr({
			'hsrc': avatar
		});
	}

})

var saying = 0;
var nowbcolor = 'light';
var nowscroll = 0;
var nowshowday = 0,
	showdaylength = 0,
	loadCD = 0,
	loadwbCD = 0;

function scrolllistener() {
	document.getElementById('scrollbox').addEventListener('scroll', function(e) {

		if (e.detail.y > -300) {
			if (saying == 0) {
				$('#defaulthead').addClass('airhead');
				$('#defaulthead h1 span').hide();
				$('#headact').css('color', '#fff');
				if (window.plus) {
					setbcolor('light');
					nowbcolor = 'light';
				}
				$('.chevron').fadeOut();
			}
		} else {
			if (saying == 0) {
				$('#defaulthead').removeClass('airhead');
				$('#defaulthead h1 span').show();
				$('#headact').css('color', '#b8c4ca');
				if (window.plus) {
					setbcolor('dark');
					nowbcolor = 'dark';
				}
				$('.chevron').fadeIn();
			}
		}

		if (e.detail.y <= e.detail.maxScrollY + 300) {

			//滚动到底部
			if (showdaylength > nowshowday) {
				if (loadCD == 0) {
					loadCD = 1;
					nowshowday++;
					$('.dayline[dayline="' + nowshowday + '"]').show();
					$('.dayline[dayline="' + nowshowday + '"].w_detail_li').each(function() {
						var barid = $(this).attr('barid');
						if (scrolltarget['wordbar_' + barid]) {
							if (!scrolltarget['wordbar_' + barid].ft) {
								scrolltarget['wordbar_' + barid].visible = 1;
								scrolltarget['wordbar_' + barid].ft = (-e.detail.y) - $(window).height() + $(this).offset().top - 800;
							}
						}
					});
					setTimeout(function() {
						loadCD = 0;
					}, 100);
				}
			} else {
				if (loadCD == 0) {
					$('.isend').show();
					loadCD = 1;
				}
			}
		}

		$.each(scrolltarget, function(i, v) {
			if (v.act == 'loadtips') {
				if (-i > e.detail.y) {
					var vdata = v.data;
					delete scrolltarget[i];
					loadtip(vdata)
				}
			}

			if (v.act == 'loadwordbar') {
				if (v.visible == 1) {
					if (-v.ft > e.detail.y) {
						var vbarid = v.barid;
						delete scrolltarget[i];
						loadwordbar(vbarid)
					}
				}
			}
		})

	});

}

function loadtip(tips) {

	var li = '';
	tips = tips || '';
	if (tips == '') {
		tips = []
	} else {
		tips = JSON.parse(tips)
	}
	$.each(tips, function(a, b) {
		var ishide = '';
		if (a > 5) {
			ishide = ' style="display:none;" ';
		}

		$.get(localStorage.getItem('ajaxlinkhead') + "/wordbar/detail-" + b.barid, {
			'is_ajax': 1
		}, function(result) {
			var r = result.info;
			if (r) {
				var bdesc = r.desc || r.link || '';
				li = '<li barid="' + b.barid + '" desc="' + bdesc + '" ' + ishide + '><div class="cover" cover="' +
					localStorage.getItem('ajaxlinkhead') + r.cover + '"></div><p>' + r.title + '</p></li>';
				$('.tips').prepend(li);

				var readimg = $('.tips li[barid="' + b.barid + '"] .cover');
				var wsrc = localStorage.getItem('ajaxlinkhead') + r.cover;
				var imgname = wsrc.substr(wsrc.lastIndexOf('/') + 1);
				readimg.addClass('img_cache_bg');
				readimg.attr('imgname', imgname);
				img_cache(wsrc, '_bg', imgname);

			}

		});

	});

	if (tips.length > 0) {
		$('.tipstitle').show()
	};

	if (tips.length > 6) {
		$('.tips-more').show();
	} else {
		$('.tips-more').hide();
	}

}

function loadwordbar(d) {

	var w_detail_li = $(".w_detail_li[barid='" + d + "']");
	var hassave = 0;
	$.each(wordbardata, function(w_index, w_val) {
		if (w_val[d] && w_val[d].moredata) {
			hassave = 1;
			setdayplan(w_detail_li, w_val[d].moredata, w_index);
			return false;
		}
	})
	if (hassave == 0) {
		showcssWaiting();
		$.get(localStorage.getItem('ajaxlinkhead') + "/wordbar/detail-" + d, {
			'is_ajax': 1
		}, function(result) {
			var r = result.info;
			if (r) {
				var rtype = 'morebar';
				switch (r.type) {
					case '6':
						rtype = 'hotels';
						break;
					case '7':
						rtype = 'restaurants';
						break;
				}
				wordbardata[rtype][d].moredata = r;
				setdayplan(w_detail_li, r, rtype);
				if (rtype == 'hotels') {
					setpreview_hotel(wordbardata[rtype][d])
				}
				if (rtype == 'restaurants') {
					setpreview_restaurant(wordbardata[rtype][d])
				}
			}
			closecssWaiting();
		}).fail(function() {
			w_detail_li.attr('loaded', '0');
			closecssWaiting();
		});
	}
}
mui('body').on('tap', '#headback', function(e) {
	$('input').blur();
	setbcolor('dark');
	plus.webview.currentWebview().close();
})

var commmentdata = {};
var wordbardata = {
	'hotels': {},
	'morebar': {},
	'restaurants': {},
}

//获取星期几的英文字符
var weekstr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

function getdetail() {

	var currentW = plus.webview.currentWebview();
	var opener = currentW.opener();

	var subjson = {
		'is_ajax': 1
	};
	showcssWaiting();
	$.get(localStorage.getItem('ajaxlinkhead') + "/books/detail-" + gdata.tid, subjson, function(result) {

		var v = result.info;
		var l = result.list;

		//设置category_id
		$('.companion').attr('category_id', v.category_id);
		if (v && l) {

			$('.headinfo h1,.defaulthead h1 span').text(v.title);

			var description = v.description || '';
			if (description != '') {
				$('.introtitle').show();
			}
			$('.intro').html(description);

			$('.travelcontent img').each(function(i) {
				var thissrc = $(this).attr('src');
				$(this).attr('src', localStorage.getItem('ajaxlinkhead') + thissrc);
			})

			$('.backimg').css('backgroundImage', 'url(' + localStorage.getItem('ajaxlinkhead') + v.cover_image + ')');

			let wsrc = localStorage.getItem('ajaxlinkhead') + v.cover_image;
			$('.coverimg').addClass('img_cache_bg');
			let imgname = wsrc.substr(wsrc.lastIndexOf('/') + 1);

			$('.coverimg').attr('imgname', imgname);
			img_cache(wsrc, '_bg', imgname);

			var playDate = v.playDate;
			if (playDate != '' && playDate != '0' && playDate != 0) {
				$('#playDate').text(sbackstr(playDate));
			};

			var create_time = v.create_time;
			if (create_time != '' && create_time != '0' && create_time != 0) {
				$('#create_time').text(sbackstr(create_time) + ' 创建');
			} else {
				create_time = v.update_time;
				if (create_time != '' && create_time != '0' && create_time != 0) {
					$('#create_time').text(sbackstr(create_time) + ' 更新');
				}
			}

			if (v.playDays && v.playDays != '') {
				$('#playDays').text(v.playDays + '天')
			};
			if (v.consume && v.consume != '') {
				$('#consume').text(v.consume + '元')
			};
			if (v.city && v.city != '') {
				$('#city').text(v.city)
			};
			if (v.view && v.view != '') {
				$('#view').text(v.view)
			};
			if (l.numType && l.numType != '') {
				$('#numType').text(l.numType)
			};
			if (l.numlike && l.numlike != '') {
				$('#numlike').text(l.numlike)
			};

			if (l.isfavorite == 1) {
				$('#isfavorite').addClass('fa-star favorite');
				$('.do_favorite').find('span').text('已收藏');
				$('#isfavorite').removeClass('fa-star-o');
			}

			if (l.islike == 1) {
				$('#islike').addClass('fa-heart like');
				$('#islike').removeClass('fa-heart-o');
			}

			if (v.city != '' && v.city && v.city != undefined && v.city != 'undefined') {
				var s = ',' + v.city;
				s = s.substring(1, s.length);
				s = s.split(",");
				$('#d-city').text(s[0]);
			};

			var numcomment = l.numcomment;
			if (numcomment != '' && numcomment != '0' && numcomment != 0) {
				$('.numcomment').text(numcomment);
			}

			$('.detaildesc .d-head img,.detaildesc .d-head h1 b').attr({
				uid: v.uid
			});

			if (v.uid == plus.storage.getItem("user_uid")) {
				var uname = plus.storage.getItem("user_nickname");
				var uimg = plus.storage.getItem("user_headimg");
				if (uname == '' || !uname) {
					uname = plus.storage.getItem("user_username");
				};
				$('.detaildesc .d-head h1 b').text(uname);
				$('.detaildesc .d-head img').attr({
					'src': uimg
				});
				$('.detaildesc .d-head h1 b,.detaildesc .d-head img').attr({
					'hsrc': uimg
				});
			} else {
				memberinfo(v.uid);
			}

			if (v.feature != '' && v.feature && v.feature != undefined && v.feature != 'undefined') {
				$('.featuretitle').show();
				var f = ',' + v.feature;
				f = f.substring(1, f.length);
				f = f.split(",");
				if (f.length > 0) {
					$('.feature').show();
				}
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
							if (coverString('.jpeg', datapicurl) || coverString('.jpg', datapicurl) || coverString('.png', datapicurl)) {
								$('.feature').append('<li><img src="' + datapicurl +
									'" onload="clip(this);"  data-preview-src="" data-preview-group="1"//></li>')
							}
						}
					});
				})
			};

			if (l.comment != '') {
				$('.isempty').hide();
				$.each(l.comment, function(a, b) {
					commmentdata[b.id] = b;
				})

				$.each(l.comment, function(a, b) {

					var del = '';
					if (b.uid == plus.storage.getItem("user_uid")) {
						del = '<b class="link_del" lid="' + b.id + '">删除</b>';
					}

					var li = '<li><div class="d-head"><img src="' + localStorage.getItem('ajaxlinkhead') + b.picurl + '" /><h1>' +
						b.nickname + '</h1>' + del + '<p class="d-head-bottom">' + sbackstrmm(b.create_time) +
						'</p></div><p class="c-l-content" uid="' + b.uid + '" pid="' + b.id + '">' + b.content + '</p>';

					if (b.pid && b.pid != '0' && commmentdata[b.pid]) {
						li += '<div class="c-l-back"><h2>引用 @ ' + commmentdata[b.pid].nickname + ' 的回复</h2><p>' + commmentdata[b.pid]
							.content + '</p></div>';
					}

					li += '</li>';

					$('.comment_list ul').append(li);
				});
			}

			// 载入行前事项 -- start --
			var tips = v.tips || '';

			var ft = $(".tips").offset().top - 400; //指定元素距离文档顶部高度

			scrolltarget[ft] = {
				'act': 'loadtips',
				'data': tips
			};


			// 载入行前事项 -- end --
			bookplayDate = Number(v.playDate);
			var hotels = [];
			if (v.hotel && v.hotel != '') {
				hotels = JSON.parse(v.hotel);
				$('.cons ul.preview li.icon2 .num,.previewbox.hotel h1 span').text(hotels.length);
				var firsthotel_bid = hotels[0].barid;
				wordbardata.hotels[firsthotel_bid] = hotels[0];
				$.get(localStorage.getItem('ajaxlinkhead') + "/wordbar/detail-" + firsthotel_bid, {
					'is_ajax': 1
				}, function(result) {
					//console.log(JSON.stringify(result));
					if (result.info) {
						wordbardata.hotels[firsthotel_bid].moredata = result.info;
						$('.cons ul.preview li.icon2 .first').text(result.info.title || '');
						setpreview_hotel(wordbardata.hotels[firsthotel_bid]);
					}
				});
				$('.cons ul.preview li.icon2').show();
			}

			$.each(hotels, function(a, b) {
				if (a != 0) {
					wordbardata.hotels[b.barid] = b
				};
			});

			var restaurants = [];
			if (v.restaurant && v.restaurant != '') {
				restaurants = JSON.parse(v.restaurant);
				$('.cons ul.preview li.icon3 .num,.previewbox.restaurant h1 span').text(restaurants.length);
				var firstrestaurant_bid = restaurants[0].barid;
				wordbardata.restaurants[firstrestaurant_bid] = restaurants[0];
				$.get(localStorage.getItem('ajaxlinkhead') + "/wordbar/detail-" + firstrestaurant_bid, {
					'is_ajax': 1
				}, function(result) {
					if (result.info) {
						wordbardata.restaurants[firstrestaurant_bid].moredata = result.info;
						$('.cons ul.preview li.icon3 .first').text(result.info.title || '');
						setpreview_restaurant(wordbardata.restaurants[firstrestaurant_bid]);
					}
				});
				$('.cons ul.preview li.icon3').show();
			};

			$.each(restaurants, function(a, b) {
				if (a != 0) {
					wordbardata.restaurants[b.barid] = b
				}
			});

			var traffics = [];
			if (v.traffic && v.traffic != '') {
				traffics = JSON.parse(v.traffic);
				$('.cons ul.preview li.icon1 .num,.previewbox.traffic h1 span').text(traffics.length);
				$('.cons ul.preview li.icon1 .first').text(traffics[0].title);
				$('.cons ul.preview li.icon1').show();
			}

			var trafficsli = '';
			var startime = Number(v.playDate);
			var usetime = 0;

			$.each(traffics, function(a, b) {

				usetime = (Number(b.day) - 1) * 86400 + startime;

				var fatype = '';
				switch (b.type) {
					case '飞机':
						fatype = 'fa-plane';
						break;
					case '火车':
						fatype = 'fa-train';
						break;
					case '驾车':
						fatype = 'fa-bus';
						break;
					case '汽车':
						fatype = 'fa-bus';
						break;
					case '客船':
						fatype = 'fa-ship';
						break;
					case '公交':
						fatype = 'fa-bus';
						break;
					case '租车':
						fatype = 'fa-cab';
						break;
					case '步行':
						fatype = 'fa-blind';
						break;
				}

				var timesarr = setreplace(b.timesarr, 'get');
				timesarr = JSON.parse(timesarr);
				var thistimeli = '';

				$.each(timesarr, function(ta_i, ta_v) {
					var dayplus = '';
					if (Number(ta_v.addr_end_time_plus) > 0) {
						dayplus = '<span class="plus">+' + ta_v.addr_end_time_plus + '</span>';
					}

					if (ta_i == 0) {
						var posstart = '';
						var posend = '';
						if (timesarr.length > 1) {
							posstart = '<span class="posname">' + ta_v.addr_start + '</span>';
							posend = '<span class="posname">' + ta_v.addr_end + '</span>';
						}
						thistimeli = '<li><div class="top"><span class="type">' + b.type +
							'</span><span class="line"><b>' + ta_v.addr_start +
							'</b><i class="fa fa-long-arrow-right"></i><b>' + timesarr[timesarr.length - 1].addr_end +
							'</b></span></div><div class="bottom"><div class="dateinfo"><span>' + sbackstr(usetime) +
							'</span><span class="linename">' + b.title +
							'</span></div><div><div class="start">' + posstart + '<span class="posname">' + ta_v.addr_start_exact +
							'</span><b class="time">' + ta_v.addr_start_time +
							'</b></div><i class="mid fa ' + fatype +
							'"></i><div class="end">' + posend + '<span class="posname">' + ta_v.addr_end_exact +
							'</span><b class="time">' + ta_v.addr_end_time + dayplus +
							'</b></div></div></div>';
					} else {
						thistimeli = thistimeli +
							'<div class="bottom"><div class="waitpoint">- 经停 -</div><div><div class="start"><span class="posname">' +
							ta_v.addr_start + '</span><span class="posname">' +
							ta_v.addr_start_exact + '</span><b class="time">' +
							ta_v.addr_start_time + '</b></div><i class="mid fa ' +
							fatype + '"></i><div class="end"><span class="posname">' +
							ta_v.addr_end + '</span><span class="posname">' +
							ta_v.addr_end_exact + '</span><b class="time">' +
							ta_v.addr_end_time + dayplus + '</b></div></div></div>';
					}
				})

				trafficsli = trafficsli + thistimeli + '</li>'

			});

			$('.previewbox.traffic ul').append(trafficsli);

			var startime = Number(v.playDate);
			var usetime = 0;
			var content = [];
			if (v.content && v.content != '') {
				content = JSON.parse(v.content);
			}

			var dayli = '';

			var morebar = [];
			if (v.morebar && v.morebar != '') {
				morebar = JSON.parse(v.morebar);
			}

			$.each(morebar, function(a, b) {
				wordbardata.morebar[b.barid] = b || ''
			});

			$.each(content, function(a, b) {

				var content_addr = b.content_addr.split("-");
				var addr = '';
				$.each(content_addr, function(c, d) {
					if (c == 0) {
						addr = d
					} else {
						addr = addr + '<i class="fa fa-long-arrow-right"></i>' + d
					}
				});

				usetime = a * 86400 + startime;
				var dateset = new Date();
				dateset.setTime(usetime * 1000);

				var ulhide = '';
				if (a != 0) {
					ulhide = 'style="display:none;"'
				} else {
					$('.dayplan .innerbox').addClass('showing')
				}
				dayli = dayli + '<ul class="dayline" dayline="' + a + '" ' + ulhide + '><div class="descinfo"><b>Day  ' + (a +
						1) + '</b><span>' + sbackstr(usetime) + '，' + weekstr[dateset.getDay()] + '</span><span>' + addr +
					'</span><p>' + b.content_desc + '</p></div></ul>';

				var content_addr_exact = b.content_addr_exact.split("-");
				var addr_exact = '';
				var trafficsdom = '<div class="linkmid dayline" dayline="' + a + '" ' + ulhide +
					'><i></i><b> &nbsp; </b><span> &nbsp; </span></div>';
				var addrdom = '';
				var addr_str = b.addr_str || '';
				addr_str = addr_str.split('-');
				var last_exact = content_addr_exact.length - 1;

				$.each(content_addr_exact, function(c, d) {

					var bottomtime = '';
					var bottomdesc = '';
					var dtrafficsdom = trafficsdom;

					$.each(b.content_addr_data, function(cad_index, cad_val) {

						if (cad_val.bid == d && c == cad_index) {

							if (cad_val.time && cad_val.time != '') {
								bottomtime = '<div class="bottom" style="color:#777">预计到达：' + cad_val.time + '</div>';
							}

							if (cad_val.desc && cad_val.desc != '') {
								bottomdesc =
									'<div class="bottom" style="padding-top:0;padding-bottom:20px;color:#777;font-size:12px">定制师备注：<span style="font-size:12px;font-weight:normal">' +
									cad_val.desc + '</span></div>';
							}

							var cad_valtype = ' &nbsp; ';
							if (cad_val.type && cad_val.type != '') {
								cad_valtype = '推荐：' + cad_val.type;
							}

							var cad_valdistance = ' &nbsp; ';
							if (cad_val.distance && cad_val.distance != '') {

								if (Number(cad_val.distance) >= 1) {
									cad_valdistance = cad_val.distance + ' km';
								} else {
									cad_valdistance = Number(cad_val.distance) * 1000 + ' m';
								}

							}

							dtrafficsdom = '<div class="linkmid dayline" dayline="' + a + '" ' + ulhide + '><i></i><b>' +
								cad_valdistance + '</b><span>' + cad_valtype + '</span></div>';
							return false;
						}
					})

					if (last_exact == c) {
						dtrafficsdom = ''
					};

					addrdom = addrdom + '<li class="w_detail_li dayline" dayline="' + a + '" ' + ulhide + ' wtype="" barid="' +
						d +
						'" loaded="0"><div class="detail"><h2><i class="fa  left"></i><i class="fa fa-angle-right right"></i></h2><div class="img"></div><div class="descmore"><span>...</span><span class="b">查看更多</span></div>' +
						bottomtime + bottomdesc + '</div></li>' + dtrafficsdom;

					var addr_str_c = addr_str[c] || '';
					if (c == 0) {
						addr_exact = '<span>' + addr_str[c] + '</span>'
					} else {
						addr_exact = addr_exact + '<i class="fa fa-caret-right"></i><span>' + setreplace(addr_str_c, 'get') +
							'</span>'
					}

				});

				$('.daylinelist').append('<li><h1 class="dl-title"><b>D' + (a + 1) + '</b><span>' + sbackstr(usetime) + '‘' +
					weekstr[dateset.getDay()] + '</span></h1><b class="addr">' + addr + '</b><div class="addrlist">' + addr_exact +
					'</div></li>');

				dayli += addrdom;

			})

			$('.dayplan .innerbox').append(dayli);

			$('.w_detail_li').each(function() {
				var d = $(this).attr('barid')

				if (!scrolltarget['wordbar_' + d]) {

					scrolltarget['wordbar_' + d] = {};
					scrolltarget['wordbar_' + d].barid = d;
					scrolltarget['wordbar_' + d].act = 'loadwordbar';
					var svisible = $(this).is(':visible') ? 1 : 0;
					scrolltarget['wordbar_' + d].visible = svisible;

					if (svisible == 1) {
						if (!scrolltarget['wordbar_' + d].ft) {
							scrolltarget['wordbar_' + d].ft = $(this).offset().top - $(window).height() - 500;
						}
					}
				}
			})

			showdaylength = content.length;

		} else {
			mui.toast('获取数据失败');
		}

		setTimeout(function() {
			setbcolor('light');
			currentW.show('slide-in-right');
			if (opener) {
				opener.evalJS('closecssWaiting()')
			};
		}, 100)

		closecssWaiting();

	}, 'json').fail(function() {
		closecssWaiting();
		if (opener) {
			opener.evalJS('closecssWaiting()')
		};
		mui.toast('获取数据失败，发生错误');
	});
};

function setdayplan(w_detail_li, data, w_index) {

	var ddesc = data.desc || '';
	if (ddesc != '') {
		ddesc = '<b>简介：</b><p>' + ddesc + '</p>'
	};
	w_detail_li.find('.descmore').before(ddesc);

	if (ddesc != '' && isEllipsis(w_detail_li.find('p')[0]) == true) {
		w_detail_li.find('p').siblings('.descmore').show()
	}

	var dtitle = data.title || data.title || '';
	if (data.enname && data.enname != '') {
		dtitle = '<span class="zh">' + dtitle + '</span><span class="en">' + data.enname + '</span>';
	}

	w_detail_li.find('.detail i.right').after(dtitle);

	var dtype = 'fa-map-signs';
	if (data.type && data.type != '') {
		switch (data.type) {
			case '1':
				dtype = 'fa-map-signs';
				break;
			case '2':
				dtype = 'fa-image';
				break;
			case '3':
				dtype = 'fa-life-ring';
				break;
			case '4':
				dtype = 'fa-info-circle';
				break;
			case '5':
				dtype = 'fa-paper-plane-o';
				break;
			case '6':
				dtype = 'fa-bed';
				break;
			case '7':
				dtype = 'fa-cutlery';
				break;
		}
	}

	w_detail_li.find('.detail i.left').addClass(dtype);

	var coverurl = data.cover || '';
	if (coverurl != '') {
		coverurl = localStorage.getItem('ajaxlinkhead') + coverurl;
		var readimg = w_detail_li.find('.img');
		//w_detail_li.find('.img').css('background-image','url('+coverurl+')');
		readimg.addClass('img_cache_bg');
		let imgname = coverurl.substr(coverurl.lastIndexOf('/') + 1);

		readimg.attr('imgname', imgname);
		img_cache(coverurl, '_bg', imgname);
	}

	w_detail_li.attr('wtype', w_index);
}

mui('body').on('tap', '.tips-more', function(e) {
	$(this).hide();
	$('.tips li').show();
});

if (o_bodyheight == 812) {
	$('.wordbar-detail h1').css('padding-top', '50px');
	$('.wordbar-detail .tipimg').css('margin-top', '106px');
}

function memberinfo(vuid) {
	var subjson = {
		'is_ajax': 1,
		'id': vuid
	};
	showcssWaiting();
	$.post(localStorage.getItem('ajaxlinkhead') + '/user/member/index', subjson, function(result) {

		var r = result.userInfo;
		$('.detaildesc .d-head h1 b').text(r.nickname || r.username || '-');
		var uimg = r.avatar || r.image || r.headimgurl;
		uimg = localStorage.getItem('ajaxlinkhead') + uimg;
		$('.detaildesc .d-head img').attr({
			'src': uimg
		});
		$('.detaildesc .d-head h1 b,.detaildesc .d-head img').attr({
			'hsrc': uimg
		});

		closecssWaiting();
	}, 'json').fail(function() {
		closecssWaiting();
	});
}

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

function sbackstrmm(num) {
	var timestamp = Number(num);
	var newDate = new Date();
	newDate.setTime(timestamp * 1000);
	var backstr = newDate.format('yyyy-MM-dd hh:mm');
	return backstr;
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

$('.comment_list ul').css('height', o_bodyheight - 135 + 'px');
window.onresize = function() {
	var bodyheight = $(window).height();
	$('.comment_list ul').css('height', bodyheight - 135 + 'px');
	$('.comment_box').css('top', bodyheight - 60 + 'px');
};

var keyingtype = 1;

//评论按钮事件
mui('body').on('tap', '.isempty,.c-l-addnew', function() {
	$('#keyingval').val('');
	$('#keyingval').attr('placeholder', '评论');
	$('#keyingval').focus();
	keyingtype = 1;
});

mui('body').on('tap', '.headimgs,.headname', function(e) {
	showcssWaiting();
	var olddetail = plus.webview.getWebviewById('expertdetail.html');
	if (olddetail) {
		olddetail.close('none')
	};
	var open_url = 'expertdetail.html?uid=' + $(this).attr('uid') + '&hsrc=' + $(this).attr('hsrc');
	plus.webview.create(open_url, 'expertdetail.html', {
		top: 0,
		bottom: 0
	});
});

//收藏按钮事件
mui('body').on('tap', '.do_favorite', function() {
	var that = this;
	if ($(that).find('i').hasClass('favorite')) {
		$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/unfavorite", {
			is_ajax: 1,
			id: gdata.tid,
			type: '26'
		}, function(data) {
			$(that).find('i').removeClass('fa-star favorite').addClass('fa-star-o');
			$(that).find('span').text('收藏');
			mui.toast('取消收藏');
		});
	} else {
		$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/favorite", {
			is_ajax: 1,
			id: gdata.tid,
			type: '26'
		}, function(data) {
			$(that).find('i').removeClass('fa-star-o').addClass('fa-star favorite');
			$(that).find('span').text('已收藏');
			mui.toast('收藏成功');
		});
	}
});

//点赞按钮事件
mui('body').on('tap', '.do_like', function() {
	var that = this;
	var likeNum = Number($('#numlike').text());
	if ($(that).find('i').hasClass('like')) {
		$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/unlike", {
			is_ajax: 1,
			id: gdata.tid,
			type: '26'
		}, function(data) {
			$(that).find('i').removeClass('like fa-heart').addClass('fa-heart-o');
			$('#numlike').text(' ' + (likeNum - 1));
			mui.toast('已取消点赞');
		});
	} else {
		$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/like", {
			is_ajax: 1,
			id: gdata.tid,
			type: '26'
		}, function(data) {
			$(that).find('i').removeClass('fa-heart-o').addClass('fa-heart like');
			$('#numlike').text(' ' + (likeNum + 1));
			mui.toast('已点赞');
		});
	}
});

mui('body').on('tap', '.showcomment', function(e) {
	saying = 1;
	$('.comment_list').fadeIn();
	$('.contentbox,.defaulthead').hide();
	setbcolor('dark');
});

mui('body').on('tap', '.showreward', function(e) {
	var hbdom = $('.detaildesc .d-head h1 b');
	var uid = hbdom.attr('uid');
	var hsrc = hbdom.attr('hsrc');
	var text = hbdom.text();
	if (hsrc == undefined) {
		hsrc = '';
	}
	if (text == ' - ') {
		text = '';
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

mui('body').on('tap', '.companion', function(e) {
	var hbdom = $('.detaildesc .d-head h1 b');
	var uid = hbdom.attr('uid');
	var hsrc = hbdom.attr('hsrc');
	var text = hbdom.text();
	if (hsrc == undefined) {
		hsrc = '';
	}
	if (text == ' - ') {
		text = '';
	}
	var nurl = 'companion.html?uid=' + uid + '&hsrc=' + hsrc + '&uname=' + text;
	setbcolor('dark');
	//获取栏目id
	var category_id = $('.companion').attr('category_id');
	if (!category_id) {
		mui.toast('数据加载中,请稍后再尝试');
		return;
	}
	mui.openWindow({
		url: 'companion.html',
		id: 'companion.html',
		extras: {
			category_id: category_id
		}
	});
	if (nowbcolor == 'light') {
		plus.webview.getWebviewById('companion.html').addEventListener('close', function() {
			setbcolor('light');
		})
	}
});

mui('body').on('tap', '.c-l-cancel', function(e) {
	$('.c-l-cancel').addClass('active');
	$('.defaulthead,.contentbox').show();
	$(window).scrollTop(nowscroll);
	setbcolor(nowbcolor);
	$('input').blur();
	saying = 0;
	setTimeout(function() {
		$('.comment_list').hide();
		$('.c-l-cancel').removeClass('active');
	}, 200);
});

//发表按钮点击事件
mui('body').on('tap', '#subeval', function() {
	var comVal = $('#keyingval').val();
	if (comVal != '') {

		if (comVal.length < 2) {
			mui.toast('多写点吧');
			$('#keyingval').focus();
			return;
		}

		var subjson = {
			'is_ajax': 1,
			'cid': gdata.tid,
			'type': '26',
			'content': comVal
		}

		if (keyingtype == 2) {

			if (commentPid == '') {
				mui.toast('引用回复ID为空');
				return false;
			}

			subjson.pid = commentPid;

		}

		$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/comment", subjson, function(map) {

			if (map.code == 1) {

				$('#keyingval').val('');
				$('#keyingval').blur();
				$('.isempty').hide();
				var uname = plus.storage.getItem("user_nickname");

				if (uname == '' || !uname) {
					uname = plus.storage.getItem("user_username");
				};

				var nowdate = new Date();

				var li = '<li><div class="d-head"><img src="' + plus.storage.getItem("user_headimg") + '" /><h1>' + uname +
					'</h1><b>删除</b><p class="d-head-bottom">' + sbackstrmm(nowdate.getTime() / 1000) +
					'</p></div><p class="c-l-content" uid="' + plus.storage.getItem("user_uid") + '">' + comVal + '</p>';

				if (subjson.pid && commmentdata[commentPid]) {
					li += '<div class="c-l-back"><h2>引用@' + commmentdata[commentPid].nickname + '的回复</h2><p>' + commmentdata[
						commentPid].content + '</p></div>';
				}

				li += '</li>';

				if ($('.comment_list ul li').length > 0) {
					$('.comment_list ul li').eq(0).before(li);
				} else {
					$('.comment_list ul').append(li);
				}

				$('.numcomment').text($('.comment_list ul li').length);
				$('.comment_list ul').scrollTop(0);

			}

			mui.toast(map.msg);
		}, 'json').fail(function() {
			plus.nativeUI.toast('提交失败');
		});

	} else {
		$('#keyingval').focus();
		mui.toast('评论内容不能为空');
	}
})

//删除评论
mui('body').on('tap', '.link_del', function(e) {
	var thisid = $(this).attr('lid');
	var thisparent = $(this).parents('li');
	plus.nativeUI.confirm("确定要删除这条评论？", function(e) {
		if (e.index == 0) {
			$.post(localStorage.getItem('ajaxlinkhead') + "/user/center/delete_comment.html", {
				is_ajax: 1,
				act: 'del',
				id: thisid
			}, function(data) {
				mui.toast(data.msg);
				if (data.code == 1) {
					thisparent.remove();

					var llength = $('.comment_list ul li').length;
					$('.numcomment').text(llength);

					if (llength == 0) {
						$('.isempty').show();
					}
				}
			}, 'json').fail(function(data) {
				mui.toast('删除失败，发生错误');
			});
		}
	});
})

mui('body').on('tap', '.c-l-content', function(e) {
	var thisuid = $(this).attr('uid');
	if (thisuid == plus.storage.getItem("user_uid")) {
		mui.toast('不能给自己回复');
	} else {
		$('#keyingval').val('');
		$('#keyingval').attr('placeholder', '回复：' + $(this).parents('li').find('h1').text());
		$('#keyingval').focus();
		keyingtype = 2;
		commentPid = $(this).attr('pid');
	}
});

$('#keyingval').blur(function() {
	$('#keyingval').val('');
	$('#keyingval').attr('placeholder', '评论');
	keyingtype = 1;
})

mui('body').on('tap', '#tatravels', function(e) {
	var hbdom = $('.detaildesc .d-head h1 b');
	setbcolor('dark');
	if (hbdom.attr('uid') == plus.storage.getItem("user_uid")) {
		var pagemytravels = plus.webview.getWebviewById('mytravels.html');
		if (pagemytravels) {
			plus.webview.currentWebview().close();
			if (!pagemytravels.isVisible()) {
				pagemytravels.show();
			}
		} else {
			mui.openWindow({
				url: 'mytravels.html',
				id: 'mytravels.html'
			});
			setTimeout(function() {
				plus.webview.getWebviewById('traveldetail.html').close('none');
			}, 300)
		}
	} else {
		var tatravels = plus.webview.getWebviewById('tatravels.html');
		if (tatravels) {
			tatravels.close('none');
		}
		setTimeout(function() {
			mui.openWindow({
				url: 'tatravels.html?uid=' + hbdom.attr('uid') + '&hsrc=' + hbdom.attr('hsrc') + '&uname=' + hbdom.text(),
				id: 'tatravels.html'
			});
		}, 200)
	};
});

mui('body').on('tap', '.chevron', function(e) {
	mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 0);
});

//mui('body').on('tap','.linkmid',function(e){
//	$('.all-recommend').hide();
//	$('.now-recommend').show();
//	$('.previewbox.traffic ul li').hide();
//	$('.previewbox.traffic ul li').eq($(this).attr('t_index')).show();
//  $('.previewbox.traffic').slideDown('fast');
//  setTimeout(function(){
//  	$('.previewbox.traffic').find('.closepreview').fadeIn();
//  },200);
//  setTimeout(function(){
//  	$('body').css('overflow-y','hidden');
//  },500);
//});

mui('body').on('tap', '.tips li', function(e) {
	var moredataJson = {};
	moredataJson.cover = $(this).find('.cover').attr('cover');
	moredataJson.title = $(this).find('h2').text() || $(this).find('p').text() || $(this).attr('enname') || '';
	var desc = $(this).attr('desc') || $(this).attr('link') || '';
	moredataJson.desc = setreplace(desc, 'get');
	showWDdetail(moredataJson);
})

mui('body').on('tap', '.hotelli,.restaurantsli', function(e) {
	var thiswddata = wordbardata[$(this).attr('wtype')][$(this).attr('barid')];
	var newmoredataJson = thiswddata;
	newmoredataJson.moredata.enname = setreplace(newmoredataJson.moredata.enname, 'get');
	newmoredataJson.moredata.desc = setreplace(newmoredataJson.moredata.desc, 'get');
	showWDdetail(newmoredataJson.moredata);
})

mui('body').on('tap', '.w_detail_li', function(e) {
	var thiswddata = wordbardata[$(this).attr('wtype')][$(this).attr('barid')] || '';
	if (thiswddata == '') {
		mui.toast('词条不存在或被删除')
		return
	}
	var newmoredataJson = thiswddata;
	newmoredataJson.moredata.enname = setreplace(newmoredataJson.moredata.enname, 'get');
	newmoredataJson.moredata.desc = setreplace(newmoredataJson.moredata.desc, 'get');
	showWDdetail(newmoredataJson.moredata);
});

mui('body').on('tap', '.wordbar-detail .wordbar-img,.detailbody .coverimg', function() {

	let urls = $(this).css('background-image') || '';
	urls = urls.replace('url(', '');
	urls = urls.replace(/"/g, '');
	urls = urls.replace(/'/g, '');
	urls = urls.replace(')', '');
	if (urls == '') {
		return
	};
	plus.nativeUI.previewImage([urls]);
	console.log(urls);
});

function showWDdetail(wddata) {

	$('.wordbar-detail .wordbar-content').html(wddata.desc);
	$('.wordbar-detail .wordbar-content').hide();

	let wsrc = wddata.cover;
	if (wddata.cover.indexOf(localStorage.getItem('ajaxlinkhead')) == -1) {
		wsrc = localStorage.getItem('ajaxlinkhead') + wddata.cover;
	};

	var readimg = $('.wordbar-detail .wordbar-img')

	readimg.addClass('img_cache_bg');
	let imgname = wsrc.substr(wsrc.lastIndexOf('/') + 1);

	readimg.attr('imgname', imgname);
	img_cache(wsrc, '_bg', imgname);

	$('.wordbar-detail .wordbar-title').text(wddata.title);

	$('.w-moreinfo li,.wordbar-edithistory').hide();
	setbcolor('dark');
	$('.wordbar-detail').fadeIn('fast');

	setTimeout(function() {
		$('.wordbar-detail .wordbar-content').fadeIn();
		$('.wordbar-detail .w-addr p').attr('position', '');
		$('.wordbar-detail .w-addr p').removeClass('haspos');

		$.each(wddata, function(i, v) {

			if (v && v != '') {
				$('.wordbar-detail .w-' + i).fadeIn();
				$('.wordbar-detail .w-' + i + ' p').text(v);
				if (i == 'phone') {
					$('.wordbar-detail .w-phone a').attr('href', 'tel:' + v).text(v);
				}

				if (i == 'position') {
					$('.wordbar-detail .w-addr p').attr('position', v).addClass('haspos');
					$('.wordbar-detail .w-addr p').addClass('haspos');
				}
			}
		})
		var edithistory = wddata.edithistory || '';
		if (edithistory != '') {

			edithistory = JSON.parse(edithistory);

			var readimg = $('.wordbar-edithistory .author .authorhead');
			var wsrc = localStorage.getItem('ajaxlinkhead') + edithistory.author.avatar;
			var imgname = wsrc.substr(wsrc.lastIndexOf('/') + 1);
			readimg.addClass('img_cache_bg');
			readimg.attr('imgname', imgname);
			img_cache(wsrc, '_bg', imgname);

			$('#eh-author-name').text(edithistory.author.name);
			$('#eh-author-time').text(edithistory.author.time);
			$('#eh-count-edittime').text(edithistory.count.edittime);
			$('#eh-count-editernum').text(edithistory.count.editernum);
			$('.wordbar-edithistory').fadeIn('fast');

			$('.wordbar-edithistory .editer').empty();
			$.each(edithistory.editer, function(i, v) {
				var li = '<li><div class="authorhead" style="background-image:url(' + localStorage.getItem('ajaxlinkhead') + v.avatar +
					')"></div><span>' + v.name + '</span></li>';
				$('.wordbar-edithistory .editer').append(li);
			});

		}

	}, 300);
}

mui('body').on('tap', '.close-wordbar-detail', function(e) {
	$('.wordbar-detail').fadeOut('fast');
});

mui('body').on('tap', 'p.haspos', function(e) {
	var getpoint = $(this).attr('position');
	if (getpoint != '') {
		getpoint = getpoint.split(',');
		if (getpoint.length != 2 || getpoint[0] > 180 || getpoint[0] < -180 || getpoint[1] > 180 || getpoint[1] < -180) {
			mui.toast('当前设置的坐标无效');
			return
		}
	} else {
		mui.toast('当前设置的坐标无效');
		return
	}

	if (poslat == '' || poslng == '') {
		mui.toast('获取定位位置信息失败');
		return
	}

	var dst = new plus.maps.Point(getpoint[0], getpoint[1]);

	var lat = $("#lat").attr("value");
	var longt = $("#longt").attr("value");

	var src = new plus.maps.Point(poslng, poslat);

	var maptitle = $('.w-addr p').text()
	plus.maps.openSysMap(dst, maptitle, src);

});

// 通过定位模块获取位置信息
function getGeocode() {
	plus.geolocation.getCurrentPosition(geoInf, function(e) {
		console.log("获取定位位置信息失败：" + e.message);
	}, {
		geocode: true
	});
};

var poslng = '';
var poslat = '';

function geoInf(position) {
	poslng = position.coords.longitude;
	poslat = position.coords.latitude;
}

function setreplace(gstr, settype) {
	if (settype == 'save') {
		gstr = gstr.replace(new RegExp('"', 'gm'), '<syh>');
		gstr = gstr.replace(new RegExp("\'", 'gm'), '<dyh>');
		gstr = gstr.replace(new RegExp('\n', 'gm'), '<br>');
	} else if (settype == 'get') {
		gstr = gstr.replace(/<syh>/gi, '"');
		gstr = gstr.replace(/<dyh>/gi, '\'');
	}
	return gstr;
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
