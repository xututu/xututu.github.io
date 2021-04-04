(function(r) {
	var a = [],
		o = ["http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-1.png",
			"http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-2.png",
			"http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-3.png",
			"http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-4.png",
			"http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-5.png",
			"http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-6.png",
			"http://activity.hdslb.com/zzjs/cartoon/errorPage-manga-7.png"
		];
	var t = false;
	r.ajax({
		url: "//www.bilibili.com/activity/web/view/data/31",
		type: "get",
		dataType: "json",
		async: false,
		timeout: 3e3,
		success: function(r) {
			var o = r.data && r.data.list;
			for (var e in o) {
				a.push((o[e].data && o[e].data.img).replace(/^http:/, ""))
			}
			t = true
		}
	});
	var e = function(r) {
		var i = t ? a : o;
		d = parseInt(Math.random() * i.length);
		var n = i[d];
		if (n != r) {
			return n
		} else {
			return e(r)
		}
	};
	var i = function() {
		rec_rp("event", "errorpage_btnback_click");
		if (history.length > 2) {
			history.back()
		} else {
			location.href = document.referrer || "/"
		}
	};
	if (history.length > 2 || document.referrer) {
		var n = "返回上一页"
	} else {
		var n = "返回首页"
	}
	var c = r(".error-container");
	var s = c.find(".error-panel");
	var l = c.find(".error-manga");
	var p;
	var d, g = e();
	var f = 0;
	window.rec_rp = window.rec_rp || function() {
		(rec_rp.q = rec_rp.q || []).push(arguments)
	};
	rec_rp("event", "errorpage_pageshow", {
		pic: g,
		url: window.location.href,
		errorType: options.type
	});
	r.getScript("//data.bilibili.com/rec.js");
	if (window.options && options.type == "defaultError") {
		var b = r('<img src=""/><div></div>');
		s.addClass("error-404");
		s.find(".panel");
		r("a.rollback-btn", s).click(function() {
			i()
		})
	} else if (window.options && window.options.type == "articleError") {
		var m = window.options && window.options.data && window.options.data.code;
		switch (parseInt(m)) {
			case 701:
				(function() {
					var r = 3;
					s.css("background-image", "url(//static.hdslb.com/images/error/video_conflict.png)");
					s.html('<div class="rollback-btn">' + r + "秒后自动跳转</div>");
					if (window.options && options.data && options.data.url) {
						s.find(".rollback-btn").click(function() {
							rec_rp("event", "errorpage_btnback_click");
							location.href = options.data.url
						});
						setInterval(function() {
							s.find(".rollback-btn").text(r + "秒后自动跳转");
							r--;
							if (r < 0) {
								location.href = options.data.url
							}
						}, 1e3)
					}
				})();
				break;
			case 702:
				(function() {
					s.css("background-image", "url(//static.hdslb.com/images/error/no_video.png)");
					s.append(r('<div class="rollback-btn">' + n + "</div>").click(function() {
						i()
					}))
				})();
				break;
			case 703:
				(function() {
					s.css("background-image", "url(//static.hdslb.com/images/error/wait_for_release.png)");
					s.append(r('<div class="rollback-btn">' + n + "</div>").click(function() {
						i()
					}))
				})();
				break;
			case 704:
				(function() {
					s.css("background-image", "url(//static.hdslb.com/images/error/wait_for_review.png)");
					s.append(r('<div class="rollback-btn">' + n + "</div>").click(function() {
						i()
					}))
				})();
				break;
			case 705:
				(function() {
					s.css("background-image", "url(//static.hdslb.com/images/error/no_video_login.png)");
					s.append(r('<div class="rollback-btn login-btn">登录</div>').click(function() {
						rec_rp("event", "errorpage_btnback_click");
						window.location.href = "https://passport.bilibili.com/login"
					}))
				})();
				break;
			default:
				break
		}
	}
	l.html("<img src=" + g + '><a class="change-img-btn">换一张<a/>');
	r(window).on("scroll.errorpage_tobottm", function() {
		var a = r(".change-img-btn", l);
		var o = r(window).scrollTop() + r(window).height();
		if (o > a.offset().top) {
			rec_rp("event", "errorpage_tobottm");
			r(window).off("scroll.errorpage_tobottm")
		}
	});
	r("a.change-img-btn", l).click(function(o) {
		if (r("a.change-img-btn", l).hasClass("off")) {
			return
		}
		var t = r("img", l).attr("src");
		rec_rp("event", "errorPage_btnrefresh_click", {
			pic: t,
			url: window.location.href,
			errorType: options.type
		});
		r("img", l).attr("src", e(t)).one("load", function() {
			r("a.change-img-btn", l).removeClass("off");
			clearTimeout(p);
			rec_rp("event", "errorpage_pageshow", {
				pic: r("img", l).attr("src"),
				url: window.location.href,
				errorType: options.type
			})
		});
		r(this).addClass("off");
		p = setTimeout(function() {
			r("a.change-img-btn", l).removeClass("off")
		}, 3e3);
		f++;
		if (f == 100) {
			(new MessageBox).show(r(this), "别刷了，其实一共就" + (a.length + 1) + "张(笑)", 3e3)
		} else if (f == 200) {
			(new MessageBox).show(r(this), "好吧骗你的，其实一共就" + a.length + "张(笑)", 3e3)
		}
	});
	r(".error-split").attr("id", "up");
	r(".change-img-btn").attr("href", "#up");
	var h = '<div class="msg-text">' + (options && options.data && options.data.message || "") + "</div>";
	r(h).appendTo(r(".article-error"))
})(jQuery);
